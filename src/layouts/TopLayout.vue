<template>
  <BaseLayout>
    <div class="layout-top">
      <header
        v-show="!appStore.contentFullscreen"
        class="layout-top__header"
        :class="
          glassEffect
            ? 'backdrop-blur-2xl bg-white/10 dark:bg-black/25 border-b border-white/20 dark:border-white/10 shadow-lg shadow-black/5'
            : 'bg-[var(--content-bg)] border-b border-[var(--card-border)]'
        "
      >
        <div
          class="layout-top__header-left"
          :class="{ 'layout-top__header-left--mobile': isMobile }"
        >
          <LayoutLogo :collapse="isMobile" />
        </div>
        <TopMenu />
        <LayoutNavbar :show-sidebar-toggle="false" :show-breadcrumb="false" />
      </header>
      <div class="layout-top__body">
        <LayoutTagsView v-if="showTagsView" />
        <LayoutMain />
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import { useLayout } from "./useLayout";
import { useAppStore, useSettingsStore } from "@/stores";
import BaseLayout from "./BaseLayout.vue";
import LayoutLogo from "./components/LayoutLogo.vue";
import TopMenu from "./components/TopMenu.vue";
import LayoutNavbar from "./components/LayoutNavbar.vue";
import LayoutTagsView from "./components/LayoutTagsView.vue";
import LayoutMain from "./components/LayoutMain.vue";

const { showTagsView } = useLayout();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const glassEffect = computed(() => settingsStore.glassEffect);
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);
</script>

<style scoped>
.layout-top {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.layout-top__header {
  display: flex;
  align-items: center;
  height: var(--navbar-height);
  transition:
    background-color 0.3s,
    backdrop-filter 0.3s;
}
.layout-top__header-left {
  display: flex;
  align-items: center;
  width: var(--sidebar-width);
  padding: 0 16px;
  flex-shrink: 0;
}
.layout-top__header-left--mobile {
  width: var(--sidebar-width-collapsed);
  padding: 0;
  justify-content: center;
}
.layout-top__body {
  flex: 1;
  overflow: hidden;
}
</style>
