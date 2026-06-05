<template>
  <div>
    <button
      class="w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-muted transition-colors flex items-center gap-1"
      :class="{ 'bg-primary/10 text-primary font-medium': String(node.value) === selectedValue }"
      @click="handleClick"
    >
      <span
        v-if="node.children?.length"
        class="shrink-0 transition-transform duration-200"
        :class="{ 'rotate-90': expanded }"
      >
        <ChevronRightIcon class="size-3.5" />
      </span>
      <span v-else class="w-3.5" />
      <span class="truncate">{{ node.label }}</span>
    </button>
    <div v-if="expanded && node.children?.length" class="ml-3">
      <MenuTreeNode
        v-for="child in node.children"
        :key="child.value"
        :node="child"
        :keyword="keyword"
        :selected-value="selectedValue"
        @select="(v: string | number) => emit('select', v)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { ChevronRightIcon } from "@lucide/vue";
import type { OptionItem } from "@/api/common";

const props = defineProps<{
  node: OptionItem;
  keyword: string;
  selectedValue?: string;
}>();

const emit = defineEmits<{
  select: [value: string | number];
}>();

const expanded = ref(false);

// 关键字搜索时自动展开匹配的父节点
watch(
  () => props.keyword,
  (kw) => {
    if (kw && hasMatch(props.node, kw)) {
      expanded.value = true;
    }
  },
  { immediate: true }
);

function hasMatch(node: OptionItem, kw: string): boolean {
  if (node.label.toLowerCase().includes(kw.toLowerCase())) return true;
  return (node.children ?? []).some((child) => hasMatch(child, kw));
}

function handleClick() {
  if (props.node.children?.length) {
    expanded.value = !expanded.value;
  }
  emit("select", props.node.value);
}
</script>
