import router from "@/router";
import { useUserStore, usePermissionStore } from "@/stores";
/**
 * 路由权限守卫
 *
 * 处理登录验证、用户信息获取、动态路由加载、404 检测等
 */
export function setupPermissionGuard() {
    const whiteList = ["/login"];
    router.beforeEach(async (to, _from) => {
        try {
            const userStore = useUserStore();
            const permissionStore = usePermissionStore();
            const isLoggedIn = userStore.isLoggedIn();
            // 未登录
            if (!isLoggedIn) {
                if (whiteList.includes(to.path))
                    return;
                return `/login?redirect=${encodeURIComponent(to.fullPath)}`;
            }
            // 已登录访问登录页 → 重定向到首页
            if (to.path === "/login") {
                return { path: "/" };
            }
            // 动态路由未生成：先获取用户信息，再加载路由
            if (!permissionStore.isRouteGenerated) {
                // 获取用户信息（roles, perms）
                if (!userStore.userInfo?.roles?.length) {
                    await userStore.getUserInfo();
                }
                // 生成动态路由并注册
                const dynamicRoutes = await permissionStore.generateRoutes();
                dynamicRoutes.forEach((route) => {
                    router.addRoute(route);
                });
                // 重新导航到目标路由（addRoute 后需要 replace）
                return { ...to, replace: true };
            }
            // 404 检测
            if (to.matched.length === 0) {
                // 从登录页跳转且目标路径无效，回退首页（避免不同用户权限不同导致的 404）
                if (_from.path === "/login") {
                    return { path: "/", replace: true };
                }
                return "/404";
            }
        }
        catch (error) {
            console.error("[Router Guard] 路由守卫错误:", error);
            // 获取用户信息或路由失败 → 重置状态并跳转登录
            await useUserStore().resetAllState();
            return "/login";
        }
    });
}
//# sourceMappingURL=permission.js.map