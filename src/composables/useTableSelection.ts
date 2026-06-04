import { computed, ref } from "vue";

/**
 * 表格行选择 Composable
 * @template T 数据项类型，必须包含 id 属性
 */
export function useTableSelection<T extends { id: string | number }>() {
  const selectedIds = ref<(string | number)[]>([]);

  function handleSelectionChange(selection: T[]): void {
    selectedIds.value = selection.map((item) => item.id);
  }

  function clearSelection(): void {
    selectedIds.value = [];
  }

  function isSelected(id: string | number): boolean {
    return selectedIds.value.includes(id);
  }

  const selectedCount = computed(() => selectedIds.value.length);
  const hasSelection = computed(() => selectedIds.value.length > 0);

  return {
    selectedIds,
    selectedCount,
    hasSelection,
    handleSelectionChange,
    clearSelection,
    isSelected,
  };
}
