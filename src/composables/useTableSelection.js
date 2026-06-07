import { computed, ref } from "vue";
/**
 * 表格行选择 Composable
 * @template T 数据项类型，必须包含 id 属性
 */
export function useTableSelection() {
    const selectedIds = ref([]);
    function handleSelectionChange(selection) {
        selectedIds.value = selection.map((item) => item.id);
    }
    function clearSelection() {
        selectedIds.value = [];
    }
    function isSelected(id) {
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
//# sourceMappingURL=useTableSelection.js.map