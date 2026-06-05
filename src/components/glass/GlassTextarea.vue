<template>
  <GlassSurface v-if="isEnabled" preset="textarea" :class="cn('w-full', props.class)">
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxlength"
      class="w-full bg-transparent outline-none text-sm px-3 py-2 resize-y placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
  </GlassSurface>

  <textarea
    v-else
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :rows="rows"
    :maxlength="maxlength"
    :class="
      cn(
        'flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    "
    @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    modelValue?: string;
    placeholder?: string;
    disabled?: boolean;
    rows?: number;
    maxlength?: number;
  }>(),
  {
    modelValue: "",
    placeholder: "",
    disabled: false,
    rows: 3,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const { isEnabled } = useGlassFilter("textarea");
</script>
