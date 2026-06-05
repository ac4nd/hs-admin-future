<template>
  <label
    :class="
      cn(
        'inline-flex items-center gap-2 cursor-pointer',
        disabled && 'cursor-not-allowed opacity-50',
        props.class
      )
    "
  >
    <GlassSurface
      v-if="isEnabled"
      preset="checkbox"
      :style="{ width: '18px', height: '18px' }"
      :on-click="disabled ? undefined : () => emit('update:modelValue', !modelValue)"
    >
      <div class="w-full h-full flex items-center justify-center">
        <svg
          v-if="modelValue"
          class="size-3.5 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </GlassSurface>

    <input
      v-else
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="size-4 rounded border border-input accent-primary"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />

    <span v-if="label" class="text-sm">{{ label }}</span>
  </label>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  modelValue?: boolean;
  disabled?: boolean;
  label?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const { isEnabled } = useGlassFilter("checkbox");
</script>
