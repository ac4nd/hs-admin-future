<template>
  <nav class="flex items-center gap-1 h-full min-w-0 flex-1 overflow-hidden">
    <Button
      v-for="item in topMenuItems"
      :key="item.path"
      variant="ghost"
      size="sm"
      class="h-8 gap-1.5 text-sm shrink-0"
      :class="{ 'bg-accent text-accent-foreground': isActive(item.path) }"
      @click="handleSelect(item)"
    >
      <MenuIcon :icon="item.icon" />
      <span>{{ item.title }}</span>
    </Button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { usePermissionStore } from "@/stores";
import { translateRouteTitle } from "@/utils/i18n";
import MenuIcon from "./MenuIcon.vue";

interface TopMenuItem {
  path: string;
  title: string;
  icon: string;
  /** 该一级菜单是否有子菜单 */
  hasChildren: boolean;
}

const route = useRoute();
const router = useRouter();
const permissionStore = usePermissionStore();

/**
 * 从动态路由中提取一级菜单项
 * 单子节点优化：只有一个可见子菜单时，提升子菜单的标题/图标
 */
const topMenuItems = computed<TopMenuItem[]>(() => {
  const dynamicRoutes = permissionStore.routes.filter((r) => !r.meta?.hidden && r.children?.length);

  return dynamicRoutes.map((route) => {
    const meta = route.meta as Record<string, any> | undefined;
    const visibleChildren = (route.children ?? []).filter(
      (c) => !(c.meta as Record<string, any>)?.hidden
    );

    // alwaysShow 或多子节点 → 显示一级菜单自身
    if (meta?.alwaysShow || visibleChildren.length !== 1) {
      return {
        path: route.path,
        title: translateRouteTitle((meta?.title as string) ?? ""),
        icon: (meta?.icon as string) ?? "📄",
        hasChildren: visibleChildren.length > 0,
      };
    }

    // 单子节点 → 提升子菜单标题/图标
    const child = visibleChildren[0];
    const childMeta = child.meta as Record<string, any> | undefined;
    return {
      path: route.path,
      title: translateRouteTitle((childMeta?.title as string) ?? (meta?.title as string) ?? ""),
      icon: (childMeta?.icon as string) ?? (meta?.icon as string) ?? "📄",
      hasChildren: true,
    };
  });
});

/** 判断一级菜单是否激活 */
function isActive(path: string) {
  if (path === "/") {
    // 根路由：仅当前路由实际匹配到根时激活
    return route.matched.some((r) => r.path === "/");
  }
  return route.path === path || route.path.startsWith(path + "/");
}

function handleSelect(item: TopMenuItem) {
  if (!item.hasChildren) {
    // 无子菜单直接导航到一级路径
    router.push(item.path);
    return;
  }

  // 有子菜单：找第一个可访问的叶子节点导航
  const parentRoute = permissionStore.routes.find((r) => r.path === item.path);
  if (!parentRoute?.children?.length) {
    router.push(item.path);
    return;
  }

  const firstVisible = findFirstLeaf(parentRoute.children, item.path);
  router.push(firstVisible ?? item.path);
}

/** 递归查找第一个可见叶子路由的完整路径 */
function findFirstLeaf(
  children: import("vue-router").RouteRecordRaw[],
  basePath: string
): string | null {
  for (const child of children) {
    const meta = child.meta as Record<string, any> | undefined;
    if (meta?.hidden) continue;

    const fullPath = child.path.startsWith("/")
      ? child.path
      : basePath.endsWith("/")
        ? `${basePath}${child.path}`
        : `${basePath}/${child.path}`;

    if (child.children?.length) {
      const leaf = findFirstLeaf(child.children, fullPath);
      if (leaf) return leaf;
    } else {
      return fullPath;
    }
  }
  return null;
}
</script>
