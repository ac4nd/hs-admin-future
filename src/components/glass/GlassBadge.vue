<template>
  <GlassSurface
    v-if="isEnabled"
    preset="badge"
    :class="cn(sizeClasses[size], props.class)"
    :style="{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '4px',
      fontWeight: 500,
      whiteSpace: 'nowrap',
    }"
  >
    <slot />
  </GlassSurface>

  <Badge v-else variant="secondary" :class="cn(sizeClasses[size], props.class)">
    <slot />
  </Badge>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    size?: "sm" | "default";
  }>(),
  {
    size: "default",
  }
);

const { isEnabled } = useGlassFilter("badge");

const sizeClasses: Record<string, string> = {
  sm: "h-5 min-w-5 px-1.5 text-[10px]",
  default: "h-6 min-w-6 px-2.5 text-xs",
};
</script>
