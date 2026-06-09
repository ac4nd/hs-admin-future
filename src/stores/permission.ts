import { ref } from "vue";
import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import { constantRoutes } from "@/router";
import router from "@/router";
import MenuAPI from "@/api/system/menu";
import type { RouteItem } from "@/api/system/menu";
import { generateMenus } from "@/utils/menu";
import type { MenuItem } from "@/utils/menu";

// Vite glob 动态导入所有视图组件
const modules = import.meta.glob("../views/**/**.vue");
const Layout = () => import("@/layouts/index.vue");

/**
 * 将后端返回的组件路径解析为 Vite 动态导入函数
 *
 * 支持路径格式：system/role/index, /system/role/index, system/role/index.vue
 */
function resolveViewComponent(componentPath: string) {
  const normalized = componentPath
    .trim()
    .replace(/^\/+/, "")
    .replace(/\.vue$/i, "");
  return (
    modules[`../views/${normalized}.vue`] ||
    modules[`../views/${normalized}/index.vue`] ||
    modules[`../views/error/404.vue`]
  );
}

/**
 * 转换后端路由数据为 Vue Router RouteRecordRaw
 *
 * 处理 Layout 组件映射和嵌套层级的组件解析
 */
function transformRoutes(routes: RouteItem[], isTopLevel = true): RouteRecordRaw[] {
  return routes.map((route) => {
    const { component, children, ...args } = route;

    // 顶层或非 Layout 组件保留原始值，中间层 Layout 设为 undefined
    const processedComponent = isTopLevel || component !== "Layout" ? component : undefined;

    const normalizedRoute = { ...args } as RouteRecordRaw;

    if (!processedComponent) {
      // 多级菜单的父级菜单，不需要组件
      normalizedRoute.component = undefined;
    } else {
      // Layout 特殊处理，其他动态导入
      normalizedRoute.component =
        processedComponent === "Layout" ? Layout : resolveViewComponent(processedComponent);
    }

    // 递归处理子路由
    if (children?.length) {
      normalizedRoute.children = transformRoutes(children, false);
    }

    return normalizedRoute;
  });
}

export const usePermissionStore = defineStore("permission", () => {
  /** 所有路由（静态 + 动态） */
  const routes = ref<RouteRecordRaw[]>([...constantRoutes]);
  /** 动态路由是否已生成 */
  const isRouteGenerated = ref(false);
  /** 混合布局 — 当前激活一级菜单的侧边栏菜单（已解析路径） */
  const mixLayoutSideMenus = ref<MenuItem[]>([]);

  /**
   * 从后端 API 获取菜单路由并转换为动态路由
   */
  async function generateRoutes(): Promise<RouteRecordRaw[]> {
    try {
      const data = await MenuAPI.getRoutes();
      const resolvedRoutes = transformRoutes(data);

      routes.value = [...constantRoutes, ...resolvedRoutes];
      isRouteGenerated.value = true;

      return resolvedRoutes;
    } catch (error) {
      isRouteGenerated.value = false;
      throw error;
    }
  }

  /**
   * 重置路由状态，移除动态路由
   */
  function resetRoutes() {
    // 移除动态添加的路由
    const constantRouteNames = new Set(constantRoutes.map((route) => route.name).filter(Boolean));
    routes.value.forEach((route) => {
      if (route.name && !constantRouteNames.has(route.name)) {
        router.removeRoute(route.name);
      }
    });

    routes.value = [...constantRoutes];
    mixLayoutSideMenus.value = [];
    isRouteGenerated.value = false;
  }

  /** 设置混合布局侧边栏菜单（立即解析完整路径） */
  function setMixLayoutSideMenus(parentPath: string) {
    const parentMenu = routes.value.find((item) => item.path === parentPath);
    if (!parentMenu?.children?.length) {
      mixLayoutSideMenus.value = [];
      return;
    }
    mixLayoutSideMenus.value = generateMenus(parentMenu.children, parentPath);
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

/**
 * 在组件外部使用 PermissionStore 的钩子函数
 */
export function usePermissionStoreHook() {
  return usePermissionStore();
}
