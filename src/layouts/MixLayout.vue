<template>
  <BaseLayout>
    <div class="layout-mix">
      <!-- 顶部导航栏：Logo + 一级菜单 + 工具栏 -->
      <header
        v-show="!appStore.contentFullscreen"
        class="layout-mix__header"
        :class="
          glassEffect
            ? 'backdrop-blur-2xl bg-white/10 dark:bg-black/25 border-b border-white/20 dark:border-white/10 shadow-lg shadow-black/5'
            : 'bg-[var(--content-bg)] border-b border-[var(--card-border)]'
        "
      >
        <div class="layout-mix__header-logo">
          <LayoutLogo :collapse="false" />
        </div>

        <!-- 一级水平菜单 -->
        <MixTopMenu />

        <!-- 工具栏（隐藏折叠按钮和面包屑） -->
        <LayoutNavbar :show-sidebar-toggle="false" :show-breadcrumb="false" />
      </header>

      <div class="layout-mix__body">
        <!-- 侧边栏：当前激活一级菜单的子菜单 -->
        <div
          v-show="!appStore.contentFullscreen && hasSideMenus"
          class="layout-mix__sidebar"
          :class="[
            isMobile ? 'layout-mix__sidebar--mobile' : '',
            isMobile && !isSidebarOpen ? 'layout-mix__sidebar--hidden' : '',
            glassEffect
              ? 'backdrop-blur-2xl bg-white/10 dark:bg-black/25 border-r border-white/20 dark:border-white/10'
              : 'bg-[var(--menu-bg)] border-r border-[var(--card-border)]',
          ]"
        >
          <MixSidebar />
        </div>
        <div class="layout-mix__content">
          <LayoutTagsView v-if="showTagsView" />
          <LayoutMain />
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useLayout } from "./useLayout";
import { useAppStore, useSettingsStore, usePermissionStore } from "@/stores";
import BaseLayout from "./BaseLayout.vue";
import LayoutLogo from "./components/LayoutLogo.vue";
import LayoutNavbar from "./components/LayoutNavbar.vue";
import LayoutTagsView from "./components/LayoutTagsView.vue";
import LayoutMain from "./components/LayoutMain.vue";
import MixTopMenu from "./components/MixTopMenu.vue";
import MixSidebar from "./components/MixSidebar.vue";

const { showTagsView, isMobile, isSidebarOpen } = useLayout();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();
const route = useRoute();
const glassEffect = computed(() => settingsStore.glassEffect);

/** 当前激活一级菜单是否有子菜单 */
const hasSideMenus = computed(() => permissionStore.mixLayoutSideMenus.length > 0);

/**
 * 从当前路由路径提取一级菜单路径
 * 例: /system/user → /system, /dashboard → /
 */
function extractTopMenuPath(path: string): string {
  // 优先匹配非根的一级路由
  const match = permissionStore.routes.find(
    (r) => r.path !== "/" && (path === r.path || path.startsWith(r.path + "/"))
  );
  if (match) return match.path;

  // 检查是否属于根路由（首页、错误页）
  const rootRoute = permissionStore.routes.find((r) => r.path === "/");
  if (rootRoute?.children?.length) {
    const belongsToRoot = rootRoute.children.some((child) => {
      const childPath = child.path.startsWith("/") ? child.path : `/${child.path}`;
      return path === childPath || path.startsWith(childPath + "/");
    });
    if (belongsToRoot) return "/";
  }

  return "";
}

// 路由变化时同步一级菜单和侧边栏
watch(
  () => route.path,
  (newPath) => {
    const topPath = extractTopMenuPath(newPath);
    if (!topPath) return;

    // 始终设置（确保模式切换后也能初始化侧边栏）
    appStore.setActiveTopMenuPath(topPath);
    permissionStore.setMixLayoutSideMenus(topPath);

    // 移动端自动收起侧边栏
    if (isMobile.value) {
      appStore.closeSidebar();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.layout-mix {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.layout-mix__header {
  display: flex;
  align-items: center;
  height: var(--navbar-height);
  transition:
    background-color 0.3s,
    backdrop-filter 0.3s;
}
.layout-mix__header-logo {
  display: flex;
  align-items: center;
  width: var(--sidebar-width);
  padding: 0 16px;
  flex-shrink: 0;
}
.layout-mix__body {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.layout-mix__sidebar {
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
  transition:
    background-color 0.3s,
    backdrop-filter 0.3s;
}
.layout-mix__sidebar--mobile {
  position: fixed;
  top: var(--navbar-height);
  bottom: 0;
  left: 0;
  z-index: 1000;
  transition:
    transform 0.28s,
    background-color 0.3s,
    backdrop-filter 0.3s;
}
.layout-mix__sidebar--hidden {
  transform: translateX(calc(-1 * var(--sidebar-width)));
}
.layout-mix__content {
  flex: 1;
  overflow: hidden;
}
</style>
