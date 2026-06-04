import type { RouteRecordRaw } from "vue-router";

/** 菜单项数据结构 */
export interface MenuItem {
  fullPath: string;
  name?: string;
  title: string;
  icon?: string;
  hidden?: boolean;
  affix?: boolean;
  alwaysShow?: boolean;
  /** 路由参数，导航时作为 query 传递 */
  params?: Record<string, string>;
  children?: MenuItem[];
}

/**
 * 从路由配置中递归提取菜单树
 * 过滤 meta.hidden 路由，构建 MenuItem 树
 */
export function generateMenus(routes: RouteRecordRaw[]): MenuItem[] {
  const menus: MenuItem[] = [];
  for (const route of routes) {
    const item = buildMenuItem(route, "");
    if (item) menus.push(item);
  }
  return menus;
}

function buildMenuItem(
  route: RouteRecordRaw,
  basePath: string
): MenuItem | null {
  const meta = route.meta as Record<string, any> | undefined;
  if (meta?.hidden) return null;

  const fullPath = resolveRoutePath(basePath, route.path);
  const item: MenuItem = {
    fullPath,
    name: route.name as string | undefined,
    title: meta?.title ?? "",
    icon: meta?.icon,
    hidden: meta?.hidden,
    affix: meta?.affix,
    alwaysShow: meta?.alwaysShow,
    params: meta?.params as Record<string, string> | undefined,
  };

  if (route.children?.length) {
    const children: MenuItem[] = [];
    for (const child of route.children) {
      const childItem = buildMenuItem(child, fullPath);
      if (childItem) children.push(childItem);
    }

    // 单可见子节点 & 无 alwaysShow → 提升子节点为当前层级
    if (children.length === 1 && !meta?.alwaysShow) {
      const only = children[0];
      return {
        ...only,
        fullPath: only.fullPath,
      };
    }

    if (children.length > 0) item.children = children;
  }

  return item;
}

function resolveRoutePath(basePath: string, routePath: string): string {
  if (routePath.startsWith("/")) return routePath;
  if (routePath.startsWith("http")) return routePath;
  if (basePath.endsWith("/")) return `${basePath}${routePath}`;
  return `${basePath}/${routePath}`;
}
