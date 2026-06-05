<template>
  <!-- glassEffect 关闭时直接渲染原生 Button -->
  <Button
    v-if="!isEnabled"
    :variant="variant"
    :size="size"
    :disabled="disabled"
    :type="type"
    :as="as"
    :as-child="asChild"
    :class="cn('cursor-pointer', props.class)"
    @click="handleClick"
  >
    <slot />
  </Button>

  <!-- glassEffect 开启时渲染玻璃壳 + Button -->
  <GlassSurface
    v-else
    preset="button"
    :class="cn('inline-flex', props.class)"
    :on-click="disabled ? undefined : handleClick"
  >
    <Button
      :variant="'ghost'"
      :size="size"
      :disabled="disabled"
      :type="type"
      class="w-full bg-transparent border-0 shadow-none hover:bg-transparent dark:hover:bg-transparent"
    >
      <slot />
    </Button>
  </GlassSurface>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    variant?: NonNullable<Parameters<typeof buttonVariants>[0]>["variant"];
    size?: NonNullable<Parameters<typeof buttonVariants>[0]>["size"];
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    as?: string;
    asChild?: boolean;
  }>(),
  {
    variant: "ghost",
    size: "default",
    disabled: false,
    type: "button",
    as: "button",
    asChild: false,
  }
);

const emit = defineEmits<{
  click: [];
}>();

const { isEnabled } = useGlassFilter("button");

const handleClick = () => {
  if (!props.disabled) emit("click");
};
</script>
