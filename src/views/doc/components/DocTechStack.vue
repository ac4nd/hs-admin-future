<template>
  <div>
    <DocSection :title="title" />
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
      <GlassCard v-for="item in items" :key="item.name" class="flex items-center gap-2 px-3.5 py-3">
        <span class="text-sm font-medium">{{ item.name }}</span>
        <span class="text-[11px] text-emerald-400 bg-emerald-400/8 px-2 py-0.5 rounded-md">
          {{ item.version }}
        </span>
      </GlassCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlassCard from "@/components/glass/GlassCard.vue";
import DocSection from "./DocSection.vue";

defineProps<{
  title: string;
  items: Array<{ name: string; version: string }>;
}>();
</script>
