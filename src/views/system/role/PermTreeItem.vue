<template>
  <div>
    <div
      class="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-muted/50 cursor-pointer select-none"
      :style="{ paddingLeft: `${level * 20 + 8}px` }"
      @click="hasChildren && $emit('toggle', String(node.value))"
    >
      <!-- 展开/折叠图标 -->
      <span v-if="hasChildren" class="text-muted-foreground text-xs w-4 shrink-0">
        {{ expanded ? '▼' : '▶' }}
      </span>
      <span v-else class="w-4 shrink-0" />

      <!-- 复选框 -->
      <input
        type="checkbox"
        :checked="isChecked"
        :indeterminate="isPartial"
        class="size-4 rounded border-border shrink-0"
        @click.stop="$emit('toggle', String(node.value))"
      />

      <!-- 标签 -->
      <span class="text-sm truncate">{{ node.label }}</span>
    </div>

    <!-- 子节点 -->
    <div v-if="hasChildren && expanded">
      <PermTreeItem
        v-for="child in node.children"
        :key="String(child.value)"
        :node="child"
        :level="level + 1"
        :expanded="expanded"
        :checked-ids="checkedIds"
        :parent-linked="parentLinked"
        @toggle="$emit('toggle', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { OptionItem } from "@/api/common";

const props = defineProps<{
  node: OptionItem;
  level: number;
  expanded: boolean;
  checkedIds: string[];
  parentLinked: boolean;
}>();

defineEmits<{
  toggle: [id: string];
}>();

const hasChildren = computed(() => (props.node.children?.length ?? 0) > 0);

const isChecked = computed(() => props.checkedIds.includes(String(props.node.value)));

const isPartial = computed(() => {
  if (!hasChildren.value || !props.parentLinked) return false;
  const childIds = collectChildIds(props.node.children ?? []);
  if (childIds.length === 0) return false;
  const checkedCount = childIds.filter((id) => props.checkedIds.includes(id)).length;
  return checkedCount > 0 && checkedCount < childIds.length;
});

function collectChildIds(nodes: OptionItem[]): string[] {
  const ids: string[] = [];
  for (const node of nodes) {
    ids.push(String(node.value));
    if (node.children) ids.push(...collectChildIds(node.children));
  }
  return ids;
}
</script>
