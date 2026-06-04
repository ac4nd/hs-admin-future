<template>
  <Popover v-model:open="popoverOpen">
    <PopoverTrigger as-child>
      <Button variant="outline" class="w-full justify-between font-normal">
        <span v-if="selectedLabel" class="truncate">{{ selectedLabel }}</span>
        <span v-else class="text-muted-foreground">{{ placeholder }}</span>
        <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[--reka-popper-anchor-width] p-2 max-h-60 overflow-auto" align="start">
      <DeptTreeSelectNode
        v-for="opt in options"
        :key="String(opt.value)"
        :option="opt"
        :model-value="modelValue"
        @select="handleSelect"
      />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronDown } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { OptionItem } from "@/api/common";
import DeptTreeSelectNode from "./DeptTreeSelectNode.vue";

const props = defineProps<{
  modelValue: string;
  options: OptionItem[];
  placeholder?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const popoverOpen = ref(false);

const selectedLabel = computed(() => {
  if (!props.modelValue) return "";
  return findLabel(props.options, props.modelValue);
});

function findLabel(nodes: OptionItem[], value: string): string {
  for (const node of nodes) {
    if (String(node.value) === String(value)) return node.label;
    if (node.children) {
      const found = findLabel(node.children, value);
      if (found) return found;
    }
  }
  return "";
}

function handleSelect(value: string | number) {
  emit("update:modelValue", String(value));
  popoverOpen.value = false;
}
</script>
