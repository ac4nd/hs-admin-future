<template>
  <GlassSurface
    v-if="isEnabled"
    preset="slider"
    :class="cn('w-full px-3 py-2', props.class)"
    :mouse-tracking="true"
  >
    <div class="relative w-full h-5 flex items-center">
      <!-- 轨道 -->
      <div class="absolute w-full h-1.5 rounded-full bg-foreground/10">
        <div class="h-full rounded-full bg-primary" :style="{ width: `${percentage}%` }" />
      </div>
      <!-- 滑块 -->
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        :disabled="disabled"
        class="absolute w-full h-5 opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
        @input="handleInput"
      />
      <div
        class="absolute w-4 h-4 rounded-full bg-white shadow-md border-2 border-primary pointer-events-none"
        :style="{
          left: `${percentage}%`,
          transform: 'translateX(-50%)',
          transition: 'left 0.1s ease-out',
        }"
      />
    </div>
  </GlassSurface>

  <div v-else :class="cn('w-full', props.class)">
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      :disabled="disabled"
      class="w-full accent-primary disabled:opacity-50"
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    modelValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
  }>(),
  {
    modelValue: 0,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const { isEnabled } = useGlassFilter("slider");

const percentage = computed(() => {
  const range = props.max - props.min;
  return range === 0 ? 0 : ((props.modelValue - props.min) / range) * 100;
});

function handleInput(e: Event) {
  const value = Number((e.target as HTMLInputElement).value);
  emit("update:modelValue", value);
}
</script>
