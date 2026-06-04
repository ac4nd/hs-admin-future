<template>
  <BaseLayout>
    <div class="layout-mix">
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
        <LayoutNavbar :show-sidebar-toggle="false" />
      </header>

      <div class="layout-mix__body">
        <div
          v-show="!appStore.contentFullscreen"
          class="layout-mix__sidebar"
          :class="[
            isMobile ? 'layout-mix__sidebar--mobile' : '',
            isMobile && !isSidebarOpen ? 'layout-mix__sidebar--hidden' : '',
            glassEffect
              ? 'backdrop-blur-2xl bg-white/10 dark:bg-black/25 border-r border-white/20 dark:border-white/10'
              : 'bg-[var(--menu-bg)] border-r border-[var(--card-border)]',
          ]"
        >
          <LayoutSidebar />
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
import { useAppStore, useSettingsStore } from "@/stores";
import BaseLayout from "./BaseLayout.vue";
import LayoutLogo from "./components/LayoutLogo.vue";
import LayoutNavbar from "./components/LayoutNavbar.vue";
import LayoutTagsView from "./components/LayoutTagsView.vue";
import LayoutMain from "./components/LayoutMain.vue";
import LayoutSidebar from "./components/LayoutSidebar.vue";

const { showTagsView, isMobile, isSidebarOpen } = useLayout();
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
  transition: background-color 0.3s, backdrop-filter 0.3s;
}
.layout-mix__header-logo {
  display: flex;
  align-items: center;
  width: var(--sidebar-width);
  padding: 0 16px;
}
.layout-mix__body {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.layout-mix__sidebar {
  width: var(--sidebar-width);
  overflow-y: auto;
  transition: background-color 0.3s, backdrop-filter 0.3s;
}
.layout-mix__sidebar--mobile {
  position: fixed;
  top: var(--navbar-height);
  bottom: 0;
  left: 0;
  z-index: 1000;
  transition: transform 0.28s, background-color 0.3s, backdrop-filter 0.3s;
}
.layout-mix__sidebar--hidden {
  transform: translateX(calc(-1 * var(--sidebar-width)));
}
.layout-mix__content {
  flex: 1;
  overflow: hidden;
}
</style>
