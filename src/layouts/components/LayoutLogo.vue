<template>
  <div class="flex items-center h-[var(--navbar-height)] w-full" :class="collapse ? 'justify-center' : 'px-4'">
    <div class="w-5 h-5 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
      H
    </div>
    <span v-if="!collapse" class="ml-2.5 text-sm font-bold text-foreground whitespace-nowrap">
      HS Admin Future
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  collapse: boolean;
}>();
</script>
