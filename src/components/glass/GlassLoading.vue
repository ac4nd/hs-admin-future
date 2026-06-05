<template>
  <GlassSurface
    v-if="isEnabled"
    preset="loading"
    :class="cn('inline-flex items-center justify-center gap-2', props.class)"
    :mouse-tracking="false"
    :style="{
      borderRadius: '999px',
      width: text ? 'auto' : `${size}px`,
      height: text ? 'auto' : `${size}px`,
      padding: text ? '8px 16px' : '0',
    }"
  >
    <svg
      :width="text ? 16 : size * 0.5"
      :height="text ? 16 : size * 0.5"
      viewBox="0 0 24 24"
      class="animate-spin"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-20" />
      <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </svg>
    <span v-if="text" class="text-sm text-muted-foreground">{{ text }}</span>
  </GlassSurface>

  <div v-else :class="cn('inline-flex items-center gap-2', props.class)">
    <svg
      :width="size * 0.5"
      :height="size * 0.5"
      viewBox="0 0 24 24"
      class="animate-spin"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-20" />
      <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </svg>
    <span v-if="text" class="text-sm text-muted-foreground">{{ text }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    size?: number;
    text?: string;
  }>(),
  {
    size: 36,
  }
);

const { isEnabled } = useGlassFilter("loading");
</script>
