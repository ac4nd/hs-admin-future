<template>
  <GlassSurface
    v-if="isEnabled"
    preset="text"
    :as="as"
    :class="cn(sizeClasses[size], muted && 'text-muted-foreground', props.class)"
  >
    <slot />
  </GlassSurface>

  <component
    :is="as"
    v-else
    :class="cn(sizeClasses[size], muted && 'text-muted-foreground', props.class)"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
    size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
    muted?: boolean;
  }>(),
  {
    as: "p",
    size: "base",
    muted: false,
  }
);

const { isEnabled } = useGlassFilter("text");

const sizeClasses: Record<string, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};
</script>
