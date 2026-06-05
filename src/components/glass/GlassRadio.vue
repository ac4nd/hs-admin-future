<template>
  <div :class="cn('flex flex-col gap-2', props.class)">
    <label
      v-for="opt in options"
      :key="opt.value"
      :class="
        cn(
          'inline-flex items-center gap-2 cursor-pointer',
          (opt.disabled || disabled) && 'cursor-not-allowed opacity-50'
        )
      "
    >
      <GlassSurface
        v-if="isEnabled"
        preset="radio"
        :style="{ width: '18px', height: '18px', borderRadius: '999px' }"
        :on-click="
          opt.disabled || disabled ? undefined : () => emit('update:modelValue', opt.value)
        "
      >
        <div class="w-full h-full flex items-center justify-center">
          <div v-if="modelValue === opt.value" class="size-2.5 rounded-full bg-primary" />
        </div>
      </GlassSurface>

      <template v-else>
        <input
          type="radio"
          :checked="modelValue === opt.value"
          :disabled="opt.disabled || disabled"
          class="size-4 accent-primary"
          @change="emit('update:modelValue', opt.value)"
        />
      </template>

      <span class="text-sm">{{ opt.label }}</span>
    </label>
  </div>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  modelValue?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const { isEnabled } = useGlassFilter("radio");
</script>
