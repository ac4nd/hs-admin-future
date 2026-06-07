import request from "@/utils/request";
const AUTH_BASE_URL = "/api/v1/auth";
const AuthAPI = {
    /** 登录 */
    login(data) {
        const payload = {
            username: data.username,
            password: data.password,
            captchaId: data.captchaId,
            captchaCode: data.captchaCode,
        };
        // tenantId 可选，仅在提供时包含
        if (typeof data.tenantId !== "undefined") {
            payload.tenantId = data.tenantId;
        }
        return request({
            url: `${AUTH_BASE_URL}/login`,
            method: "post",
            data: payload,
        });
    },
    /** 刷新 token */
    refreshToken(refreshToken) {
        return request({
            url: `${AUTH_BASE_URL}/refresh-token`,
            method: "post",
            params: { refreshToken },
            headers: {
                Authorization: "no-auth",
            },
        });
    },
    /** 退出登录 */
    logout() {
        return request({
            url: `${AUTH_BASE_URL}/logout`,
            method: "delete",
        });
    },
    /** 获取验证码 */
    getCaptcha() {
        return request({
            url: `${AUTH_BASE_URL}/captcha`,
            method: "get",
        });
    },
};
export default AuthAPI;
// 重导出类型
export * from "./types";
//# sourceMappingURL=index.js.map