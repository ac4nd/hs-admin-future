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

/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* fade-slide */
.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* fade-scale */
.fade-scale-leave-active,
.fade-scale-enter-active {
  transition: all 0.28s;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(1.2);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
