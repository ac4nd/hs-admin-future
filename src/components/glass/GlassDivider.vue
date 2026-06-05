<template>
  <GlassSurface
    v-if="isEnabled"
    preset="divider"
    :class="
      cn('shrink-0', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', props.class)
    "
    :mouse-tracking="false"
    :style="{
      borderRadius: '0',
      minHeight: orientation === 'horizontal' ? '1px' : undefined,
      minWidth: orientation === 'vertical' ? '1px' : undefined,
    }"
  >
    <span />
  </GlassSurface>

  <Separator v-else :orientation="orientation" :decorative="decorative" :class="props.class" />
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
  }>(),
  {
    orientation: "horizontal",
    decorative: true,
  }
);

const { isEnabled } = useGlassFilter("divider");
</script>
