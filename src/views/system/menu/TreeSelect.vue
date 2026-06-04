<template>
  <Popover v-model:open="popoverOpen">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="popoverOpen"
        class="w-full justify-between font-normal"
      >
        <span v-if="selectedLabel" class="truncate">{{ selectedLabel }}</span>
        <span v-else class="text-muted-foreground">{{ placeholder }}</span>
        <ChevronDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[--reka-popper-anchor-width] p-0" align="start">
      <div class="p-2 border-b">
        <Input v-model="keyword" :placeholder="searchPlaceholder" class="h-8" />
      </div>
      <ScrollArea class="max-h-60">
        <div class="p-1">
          <!-- 顶级菜单选项 -->
          <button
            class="w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-muted transition-colors"
            :class="{ 'bg-primary/10 text-primary font-medium': modelValue === '0' }"
            @click="handleSelect('0')"
          >
            {{ topLevelLabel }}
          </button>
          <!-- 递归树节点 -->
          <MenuTreeNode
            v-for="node in filteredOptions"
            :key="String(node.value)"
            :node="node"
            :keyword="keyword"
            :selected-value="modelValue"
            @select="handleSelect"
          />
        </div>
      </ScrollArea>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronDownIcon } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { OptionItem } from "@/api/common";
import MenuTreeNode from "./MenuTreeNode.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    options: OptionItem[];
    placeholder?: string;
    topLevelLabel?: string;
    searchPlaceholder?: string;
  }>(),
  {
    modelValue: "",
    placeholder: "请选择",
    topLevelLabel: "顶级菜单",
    searchPlaceholder: "搜索...",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const popoverOpen = ref(false);
const keyword = ref("");

/** 递归查找选中项的标签 */
function findLabel(nodes: OptionItem[], value: string): string {
  for (const node of nodes) {
    if (String(node.value) === value) return node.label;
    if (node.children) {
      const found = findLabel(node.children, value);
      if (found) return found;
    }
  }
  return "";
}

const selectedLabel = computed(() => {
  if (!props.modelValue || props.modelValue === "0") return "";
  return findLabel(props.options, props.modelValue);
});

/** 递归过滤选项树 */
function filterTree(nodes: OptionItem[], kw: string): OptionItem[] {
  if (!kw) return nodes;
  return nodes
    .map((node) => {
      if (node.label.toLowerCase().includes(kw.toLowerCase())) return { ...node };
      if (node.children) {
        const filtered = filterTree(node.children, kw);
        if (filtered.length > 0) return { ...node, children: filtered };
      }
      return null;
    })
    .filter(Boolean) as OptionItem[];
}

const filteredOptions = computed(() => filterTree(props.options, keyword.value));

function handleSelect(value: string | number) {
  emit("update:modelValue", String(value));
  popoverOpen.value = false;
}
</script>
