<template>
  <TableRow class="hover:bg-muted/50">
    <TableCell>
      <input
        type="checkbox"
        :checked="selectedIds.includes(dept.id)"
        class="size-4 rounded border-border"
        @change="$emit('toggleSelect', dept.id)"
      />
    </TableCell>
    <TableCell>
      <div class="flex items-center gap-1.5" :style="{ paddingLeft: `${level * 24}px` }">
        <!-- 展开/折叠 -->
        <button
          v-if="hasChildren"
          class="inline-flex items-center justify-center w-5 h-5 rounded hover:bg-muted text-muted-foreground text-xs shrink-0"
          @click="$emit('toggleExpand', dept.id)"
        >
          {{ isExpanded ? '▼' : '▶' }}
        </button>
        <span v-else class="w-5 shrink-0" />
        <span class="font-medium text-sm">{{ dept.name }}</span>
      </div>
    </TableCell>
    <TableCell class="text-center">
      <Badge :variant="dept.status === 1 ? 'default' : 'secondary'">
        {{ dept.status === 1 ? enabledText : disabledText }}
      </Badge>
    </TableCell>
    <TableCell class="text-center">{{ dept.sort }}</TableCell>
    <TableCell class="text-center">
      <div class="flex items-center justify-center gap-1">
        <Button variant="ghost" size="sm" class="h-7 text-xs" @click="$emit('create', dept.id)">
          {{ addText }}
        </Button>
        <Button variant="ghost" size="sm" class="h-7 text-xs" @click="$emit('edit', dept.id)">
          {{ editText }}
        </Button>
        <Button variant="ghost" size="sm" class="h-7 text-xs text-destructive hover:text-destructive" @click="$emit('delete', dept.id)">
          {{ deleteText }}
        </Button>
      </div>
    </TableCell>
  </TableRow>

  <!-- 子节点 -->
  <template v-if="hasChildren && isExpanded">
    <DeptTableRow
      v-for="child in dept.children"
      :key="child.id"
      :dept="child"
      :level="level + 1"
      :expanded-ids="expandedIds"
      :selected-ids="selectedIds"
      @toggle-expand="$emit('toggleExpand', $event)"
      @toggle-select="$emit('toggleSelect', $event)"
      @create="$emit('create', $event)"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)"
    />
  </template>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { DeptItem } from "@/api/system/dept/types";

const props = defineProps<{
  dept: DeptItem;
  level: number;
  expandedIds: Set<string>;
  selectedIds: string[];
}>();

defineEmits<{
  toggleExpand: [id: string];
  toggleSelect: [id: string];
  create: [parentId: string];
  edit: [id: string];
  delete: [id: string];
}>();

const { t } = useI18n();

const enabledText = t("dept.statusEnabled");
const disabledText = t("dept.statusDisabled");
const addText = t("dept.add");
const editText = t("dept.edit");
const deleteText = t("dept.delete");

const hasChildren = computed(() => (props.dept.children?.length ?? 0) > 0);
const isExpanded = computed(() => props.expandedIds.has(props.dept.id));
</script>
