import router from "@/router";
import { useUserStore, usePermissionStore } from "@/stores";

/**
 * 路由权限守卫
 *
 * 处理登录验证、动态路由加载、已登录禁止访问登录页等
 */
export function setupPermissionGuard() {
  const whiteList = ["/login"];

  router.beforeEach(async (to, _from) => {
    const userStore = useUserStore();
    const permissionStore = usePermissionStore();
    const isLoggedIn = userStore.isLoggedIn();

    // 未登录
    if (!isLoggedIn) {
      if (whiteList.includes(to.path)) {
        return;
      }
      return `/login?redirect=${encodeURIComponent(to.fullPath)}`;
    }

    // 已登录但动态路由未生成
    if (!permissionStore.isRouteGenerated) {
      const dynamicRoutes = await permissionStore.generateRoutes();
      dynamicRoutes.forEach((route) => {
        router.addRoute(route);
      });
      // 重新导航到目标路由（addRoute 后需要 replace）
      return { ...to, replace: true };
    }

    // 已登录访问登录页 → 重定向到首页
    if (to.path === "/login") {
      return { path: "/" };
    }

    // 404 检测
    if (to.matched.length === 0) {
      if (_from.path === "/login") {
        return { path: "/", replace: true };
      }
      return "/404";
    }
  });
}
