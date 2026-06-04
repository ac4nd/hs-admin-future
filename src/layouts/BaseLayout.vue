<template>
  <div class="layout" :class="layoutClass">
    <!-- 玻璃效果背景 — 与登录页一致 -->
    <div v-if="glassEffect" class="layout-glass-bg">
      <!-- 亮色：动态渐变 + 装饰浮动圆 -->
      <template v-if="!isDark">
        <div class="layout-gradient" />
        <div class="layout-deco layout-deco--1" />
        <div class="layout-deco layout-deco--2" />
        <div class="layout-deco layout-deco--3" />
      </template>
      <!-- 暗色：宇宙背景图 -->
      <template v-else>
        <div class="layout-dark-img" :style="{ backgroundImage: `url(${bgDarkUrl})` }" />
        <div class="layout-dark-overlay" />
      </template>
    </div>
    <!-- 移动端遮罩层 -->
    <div v-if="isMobile && isSidebarOpen" class="layout__overlay" @click="closeSidebar" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLayout } from "./useLayout";
import { useSettingsStore } from "@/stores";
import { ThemeMode } from "@/enums/settings";
import bgDarkUrl from "@/assets/images/bg-dark.webp";

const { layoutClass, isSidebarOpen, isMobile, closeSidebar } = useLayout();
const settingsStore = useSettingsStore();
const glassEffect = computed(() => settingsStore.glassEffect);
const isDark = computed(() => settingsStore.resolvedTheme === ThemeMode.DARK);
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
}
.layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  background-color: rgb(0 0 0 / 0.3);
}
</style>
