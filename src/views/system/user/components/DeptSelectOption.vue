<template>
  <SelectItem :value="option.value" :text-value="option.label">
    <span class="pl-[calc(var(--depth,0)*16px)]">{{ option.label }}</span>
  </SelectItem>
  <template v-if="option.children?.length">
    <DeptSelectOption
      v-for="child in option.children"
      :key="child.value"
      :option="child"
      :depth="depth + 1"
    />
  </template>
</template>

<script setup lang="ts">
import { SelectItem } from "@/components/ui/select";
import type { OptionItem } from "@/api/common";

const props = withDefaults(
  defineProps<{
    option: OptionItem;
    depth?: number;
  }>(),
  { depth: 0 }
);

const { option, depth } = props;
</script>
