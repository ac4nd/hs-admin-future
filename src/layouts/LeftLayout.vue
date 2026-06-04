<template>
  <BaseLayout>
    <!-- 左侧菜单 -->
    <div
      v-show="!appStore.contentFullscreen"
      class="layout-sidebar"
      :class="{ 'layout-sidebar--collapsed': !isSidebarOpen }"
    >
      <div
        class="layout-sidebar__inner"
        :class="[
          { 'has-logo': showLogo },
          glassEffect
            ? 'backdrop-blur-2xl bg-white/10 dark:bg-black/25 border-r border-white/20 dark:border-white/10 shadow-lg shadow-black/5'
            : 'bg-[var(--menu-bg)] border-r border-[var(--card-border)]',
        ]"
      >
        <LayoutLogo v-if="showLogo" :collapse="!isSidebarOpen" />
        <LayoutSidebar :collapse="!isSidebarOpen" />
      </div>
    </div>

    <!-- 主内容区 -->
    <div
      class="layout-main"
      :class="{
        'has-tags-view': showTagsView,
        'layout-main--collapsed': !isSidebarOpen,
        'layout-main--fullscreen': appStore.contentFullscreen,
      }"
    >
      <LayoutNavbar v-show="!appStore.contentFullscreen" />
      <LayoutTagsView v-if="showTagsView" />
      <LayoutMain />
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { DeviceEnum } from "@/enums/settings";
import { useLayout } from "./useLayout";
import { useAppStore, useSettingsStore, useTagsViewStore, usePermissionStore } from "@/stores";
import BaseLayout from "./BaseLayout.vue";
import LayoutLogo from "./components/LayoutLogo.vue";
import LayoutNavbar from "./components/LayoutNavbar.vue";
import LayoutTagsView from "./components/LayoutTagsView.vue";
import LayoutMain from "./components/LayoutMain.vue";
import LayoutSidebar from "./components/LayoutSidebar.vue";

const { showTagsView, showLogo, isSidebarOpen, isMobile } = useLayout();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const route = useRoute();
const glassEffect = computed(() => settingsStore.glassEffect);

/** 移动端路由切换后自动收起侧边栏 */
watch(
  () => route.path,
  () => {
    if (isMobile.value) {
      appStore.closeSidebar();
    }
  },
);

/** 初始化 affix 标签页 */
onMounted(() => {
  const tagsViewStore = useTagsViewStore();
  const permissionStore = usePermissionStore();
  tagsViewStore.initAffixTags(permissionStore.routes);
});
</script>

<style scoped>
.layout-sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: var(--sidebar-width);
  transition: width 0.28s;
}
.layout-sidebar--collapsed {
  width: var(--sidebar-width-collapsed);
}
.layout-sidebar__inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: width 0.28s, background-color 0.3s, backdrop-filter 0.3s;
  position: relative;
  z-index: 1;
}
.layout-main {
  position: relative;
  height: 100%;
  margin-left: var(--sidebar-width);
  overflow-y: auto;
  transition: margin-left 0.28s;
}
.layout-main--collapsed {
  margin-left: var(--sidebar-width-collapsed);
}
.layout-main--fullscreen {
  margin-left: 0 !important;
}
.mobile .layout-sidebar {
  width: var(--sidebar-width) !important;
  transition: transform 0.28s, width 0s;
}
.mobile.hideSidebar .layout-sidebar {
  transform: translateX(calc(-1 * var(--sidebar-width)));
}
.mobile.openSidebar .layout-sidebar {
  transform: translateX(0);
}
.mobile .layout-main {
  margin-left: 0 !important;
}
</style>
