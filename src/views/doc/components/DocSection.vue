<template>
  <div class="flex items-center gap-2.5 mb-4">
    <span class="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
    <h3 class="text-base font-semibold">{{ title }}</h3>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>
