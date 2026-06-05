import { ref } from "vue";
import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import { constantRoutes } from "@/router";
import { dynamicRoutes } from "@/router/dynamicRoutes";

export const usePermissionStore = defineStore("permission", () => {
  /** 所有路由（静态 + 动态） */
  const routes = ref<RouteRecordRaw[]>([...constantRoutes]);
  /** 动态路由是否已生成 */
  const isRouteGenerated = ref(false);
  /** 混合布局 — 当前激活一级菜单的子路由 */
  const mixLayoutSideMenus = ref<RouteRecordRaw[]>([]);

  /**
   * 生成动态路由
   * 当前从本地 dynamicRoutes 读取，未来替换为 API 调用
   */
  async function generateRoutes(): Promise<RouteRecordRaw[]> {
    // TODO: 替换为 API 调用 const data = await MenuAPI.getRoutes();
    const resolvedRoutes = dynamicRoutes;

    routes.value = [...constantRoutes, ...resolvedRoutes];
    isRouteGenerated.value = true;

    return resolvedRoutes;
  }

  /** 重置路由状态 */
  function resetRoutes() {
    routes.value = [...constantRoutes];
    isRouteGenerated.value = false;
  }

  /** 设置混合布局侧边栏菜单 */
  function setMixLayoutSideMenus(parentPath: string) {
    // 从动态路由（非静态路由）中查找匹配的一级菜单
    const parentMenu = routes.value.find((item) => item.path === parentPath);
    mixLayoutSideMenus.value = parentMenu?.children ?? [];
  }

  return {
    routes,
    isRouteGenerated,
    mixLayoutSideMenus,
    generateRoutes,
    resetRoutes,
    setMixLayoutSideMenus,
  };
});
