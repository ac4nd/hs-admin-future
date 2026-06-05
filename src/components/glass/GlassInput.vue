<template>
  <GlassSurface v-if="isEnabled" preset="input" :class="cn('w-full', props.class)">
    <input
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      class="w-full bg-transparent outline-none text-sm h-8 px-3 placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
      @input="handleInput"
    />
  </GlassSurface>

  <Input
    v-else
    :model-value="String(modelValue)"
    :placeholder="placeholder"
    :disabled="disabled"
    :type="type"
    :class="props.class"
    @update:model-value="(v: string) => emit('update:modelValue', v)"
  />
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    modelValue?: string | number;
    placeholder?: string;
    disabled?: boolean;
    type?: string;
  }>(),
  {
    modelValue: "",
    placeholder: "",
    disabled: false,
    type: "text",
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const { isEnabled } = useGlassFilter("input");

const handleInput = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>
