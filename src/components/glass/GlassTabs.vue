<template>
  <Tabs
    :default-value="defaultValue"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <!-- 玻璃化 TabsList -->
    <GlassSurface
      v-if="isEnabled"
      preset="tabs"
      :class="cn('inline-flex w-fit mb-2', props.class)"
      :mouse-tracking="false"
    >
      <TabsList class="bg-transparent">
        <slot name="triggers" />
      </TabsList>
    </GlassSurface>
    <TabsList v-else :class="props.class">
      <slot name="triggers" />
    </TabsList>

    <!-- 内容区无玻璃效果 -->
    <slot name="contents" />
  </Tabs>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Tabs, TabsList } from "@/components/ui/tabs";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  defaultValue?: string;
  modelValue?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const { isEnabled } = useGlassFilter("tabs");
</script>
