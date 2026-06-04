<template>
  <Card class="h-full">
    <CardHeader class="pb-3">
      <CardTitle class="text-sm">部门</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="relative mb-3">
        <SearchIcon class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        <Input
          v-model="keyword"
          placeholder="搜索部门"
          class="pl-8 h-8 text-sm"
        />
      </div>
      <ScrollArea class="h-[calc(100vh-260px)]">
        <div class="space-y-0.5">
          <button
            class="w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-muted transition-colors"
            :class="{ 'bg-primary/10 text-primary font-medium': !modelValue }"
            @click="handleSelect(undefined)"
          >
            全部
          </button>
          <DeptTreeNode
            v-for="node in filteredTree"
            :key="node.value"
            :node="node"
            :keyword="keyword"
            :selected-id="modelValue"
            @select="handleSelect"
          />
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { SearchIcon } from "@lucide/vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import DeptAPI from "@/api/system/dept";
import type { OptionItem } from "@/api/common";
import DeptTreeNode from "./DeptTreeNode.vue";

const props = defineProps<{
  modelValue?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value?: string];
  "node-click": [];
}>();

const deptList = ref<OptionItem[]>([]);
const keyword = ref("");

const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

/** 递归过滤部门树 */
function filterTree(nodes: OptionItem[], kw: string): OptionItem[] {
  if (!kw) return nodes;
  return nodes
    .map((node) => {
      const children = node.children ? filterTree(node.children, kw) : [];
      const match = node.label.includes(kw);
      if (match || children.length > 0) {
        return { ...node, children: children.length > 0 ? children : node.children };
      }
      return null;
    })
    .filter(Boolean) as OptionItem[];
}

const filteredTree = computed(() => filterTree(deptList.value, keyword.value));

function handleSelect(value?: string | number) {
  modelValue.value = value ? String(value) : undefined;
  emit("node-click");
}

import { onBeforeMount } from "vue";

onBeforeMount(async () => {
  deptList.value = await DeptAPI.getOptions();
});
</script>
