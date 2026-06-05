<template>
  <GlassSurface
    v-if="isEnabled"
    preset="progress"
    :class="cn('w-full h-2', props.class)"
    :mouse-tracking="false"
    :style="{ borderRadius: '999px', padding: '0' }"
  >
    <div
      class="h-full bg-primary transition-all duration-300 ease-in-out"
      :style="{ width: `${modelValue ?? 0}%`, borderRadius: '999px' }"
    />
  </GlassSurface>

  <Progress v-else :model-value="modelValue" :class="props.class" />
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  modelValue?: number;
}>();

const { isEnabled } = useGlassFilter("progress");
</script>
