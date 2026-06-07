import axios from "axios";
import qs from "qs";
import { toast } from "vue-sonner";
import { useUserStoreHook } from "@/stores/user";
import { AuthStorage } from "@/utils/auth";
// 记录已重试的请求，防止无限循环
const retriedConfigs = new WeakSet();
// HTTP 请求实例
const http = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 50000,
    headers: { "Content-Type": "application/json;charset=utf-8" },
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});
// 请求拦截器
http.interceptors.request.use((config) => {
    const token = AuthStorage.getAccessToken();
    if (config.headers.Authorization === "no-auth") {
        delete config.headers.Authorization;
    }
    else if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));
// 响应拦截器
http.interceptors.response.use((response) => {
    const { responseType } = response.config;
    // 二进制数据直接返回
    if (responseType === "blob" || responseType === "arraybuffer") {
        return response;
    }
    const { code, data, msg } = response.data;
    if (code === "00000" /* ApiCodeEnum.SUCCESS */) {
        return data;
    }
    // 业务错误：显示错误消息
    toast.error(msg || "系统出错");
    return Promise.reject(new Error(msg || "系统出错"));
}, async (error) => {
    const { config, response } = error;
    // 网络错误
    if (!response) {
        toast.error("网络连接失败");
        return Promise.reject(error);
    }
    const { code, msg } = response.data;
    // Token 过期：尝试刷新 token 后自动重试一次
    if (code === "A0230" /* ApiCodeEnum.ACCESS_TOKEN_INVALID */) {
        // 已重试过，直接跳登录
        if (retriedConfigs.has(config)) {
            handleTokenExpired();
            return Promise.reject(new Error("Token Invalid"));
        }
        retriedConfigs.add(config);
        try {
            const userStore = useUserStoreHook();
            await userStore.refreshTokenOnce();
            const token = AuthStorage.getAccessToken();
            if (token) {
                config.headers.set("Authorization", `Bearer ${token}`);
            }
            return http(config);
        }
        catch {
            handleTokenExpired();
            return Promise.reject(new Error("Token refresh failed"));
        }
    }
    // Refresh token 失效：无法续期，跳转登录
    if (code === "A0231" /* ApiCodeEnum.REFRESH_TOKEN_INVALID */) {
        handleTokenExpired();
        return Promise.reject(new Error("Token Invalid"));
    }
    // 权限不足
    if (code === "A0301" /* ApiCodeEnum.PERMISSION_DENIED */) {
        toast.error(msg || "权限不足");
        return Promise.reject(new Error(msg || "权限不足"));
    }
    // 其他业务错误
    toast.error(msg || "请求失败");
    return Promise.reject(new Error(msg || "请求失败"));
});
/** Token 过期处理 */
async function handleTokenExpired() {
    const userStore = useUserStoreHook();
    userStore.resetAllState();
    const currentPath = window.location.pathname + window.location.search;
    window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
}
export default http;
//# sourceMappingURL=request.js.map