import { STORAGE_KEYS } from "@/constants";
/**
 * 认证存储工具
 *
 * 根据"记住我"状态在 localStorage / sessionStorage 之间切换。
 */
export const AuthStorage = {
    getAccessToken() {
        const isRememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === "true";
        return isRememberMe
            ? (localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ?? "")
            : (sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ?? "");
    },
    getRefreshToken() {
        const isRememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === "true";
        return isRememberMe
            ? (localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) ?? "")
            : (sessionStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) ?? "");
    },
    setTokens(accessToken, refreshToken, rememberMe) {
        localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, String(rememberMe));
        if (rememberMe) {
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        }
        else {
            sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
            sessionStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
            localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        }
    },
    clearAuth() {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
        sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    },
    getRememberMe() {
        return localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === "true";
    },
};
//# sourceMappingURL=auth.js.map