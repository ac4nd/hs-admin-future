<template>
  <section
    class="app-main"
    :class="glassEffect ? 'bg-transparent' : 'bg-[var(--page-bg)]'"
    :style="{ height: appMainHeight }"
  >
    <router-view v-slot="{ Component, route }">
      <transition :name="transitionName" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSettingsStore } from "@/stores";

const settingsStore = useSettingsStore();
const glassEffect = computed(() => settingsStore.glassEffect);

const appMainHeight = computed(() => {
  const navbar = "var(--navbar-height)";
  const tags = "var(--tags-view-height)";
  return settingsStore.showTagsView
    ? `calc(100vh - ${navbar} - ${tags})`
    : `calc(100vh - ${navbar})`;
});

const transitionName = computed(() => settingsStore.pageSwitchingAnimation ?? "");
</script>

<style scoped>
.app-main {
  position: relative;
  overflow-y: auto;
}
</style>

<!-- transition CSS 必须非 scoped：Vue 的 transition 动态添加的 class 无法被 scoped 的 [data-v-xxx] 匹配 -->
<style>
.app-main .fade-enter-active,
.app-main .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.app-main .fade-enter-from,
.app-main .fade-leave-to {
  opacity: 0;
}

.app-main .fade-slide-enter-active,
.app-main .fade-slide-leave-active {
  transition: all 0.3s;
}
.app-main .fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.app-main .fade-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.app-main .fade-scale-enter-active,
.app-main .fade-scale-leave-active {
  transition: all 0.28s;
}
.app-main .fade-scale-enter-from {
  opacity: 0;
  transform: scale(1.2);
}
.app-main .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
