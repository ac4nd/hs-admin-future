<script setup lang="ts">
import { resolveIcon } from "@/utils/icon";

defineProps<{ icon?: string }>();
</script>

<template>
  <component v-if="resolveIcon(icon)" :is="resolveIcon(icon)" class="size-4 shrink-0" />
  <span v-else class="text-base shrink-0">{{ icon || "📄" }}</span>
</template>
