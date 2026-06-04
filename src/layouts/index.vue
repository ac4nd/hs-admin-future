<template>
  <div class="w-full h-full">
    <component :is="currentLayoutComponent" />
    <LayoutSettings />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { LayoutMode } from "@/enums/settings";
import { useSettingsStore } from "@/stores";
import LeftLayout from "./LeftLayout.vue";
import TopLayout from "./TopLayout.vue";
import MixLayout from "./MixLayout.vue";
import LayoutSettings from "./components/LayoutSettings.vue";

const route = useRoute();
const settingsStore = useSettingsStore();

const currentLayoutComponent = computed(() => {
  const override = route.meta?.layout as LayoutMode | undefined;
  const layout = override ?? settingsStore.layout;

  switch (layout) {
    case LayoutMode.TOP:
      return TopLayout;
    case LayoutMode.MIX:
      return MixLayout;
    default:
      return LeftLayout;
  }
});
</script>
