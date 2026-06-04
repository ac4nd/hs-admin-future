<template>
  <div
    class="navbar"
    :class="
      glassEffect
        ? 'backdrop-blur-2xl bg-white/10 dark:bg-black/25 shadow-lg shadow-black/5'
        : 'bg-[var(--content-bg)]'
    "
  >
    <!-- 左侧：折叠按钮(仅 LeftLayout) + 面包屑 -->
    <div class="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
      <Button v-if="showSidebarToggle" variant="ghost" size="icon" @click="appStore.toggleSidebar()">
        <component :is="isSidebarOpen ? PanelLeftClose : PanelLeft" class="h-4 w-4" />
      </Button>
      <LayoutBreadcrumb v-if="showBreadcrumb" />
    </div>

    <!-- 右侧：工具栏 — shrink-0 防止被挤压 -->
    <div class="flex items-center gap-0.5 h-full shrink-0">
      <template v-if="isDesktop">
        <SearchMenu />
        <FullscreenButton />
        <LangSelect />
        <NoticeDropdown />
        <TenantSwitcher />
      </template>
      <UserDropdown />
      <Button
        variant="ghost"
        size="icon"
        @click="settingsStore.settingsVisible = true"
      >
        <Settings class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { PanelLeft, PanelLeftClose, Settings } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { useAppStore, useSettingsStore } from "@/stores";
import { useLayout } from "../useLayout";
import LayoutBreadcrumb from "./LayoutBreadcrumb.vue";
import SearchMenu from "./toolbar/SearchMenu.vue";
import FullscreenButton from "./toolbar/FullscreenButton.vue";
import LangSelect from "./toolbar/LangSelect.vue";
import NoticeDropdown from "./toolbar/NoticeDropdown.vue";
import TenantSwitcher from "./toolbar/TenantSwitcher.vue";
import UserDropdown from "./toolbar/UserDropdown.vue";

withDefaults(defineProps<{
  showSidebarToggle?: boolean;
  showBreadcrumb?: boolean;
}>(), {
  showSidebarToggle: true,
  showBreadcrumb: true,
});

const appStore = useAppStore();
const settingsStore = useSettingsStore();
const { isSidebarOpen, isDesktop } = useLayout();
const glassEffect = computed(() => settingsStore.glassEffect);
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--navbar-height);
  padding: 0 16px 0 4px;
  position: relative;
  z-index: 10;
  transition: background-color 0.3s, backdrop-filter 0.3s;
}
</style>
