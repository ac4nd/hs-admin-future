<template>
  <div class="p-5 space-y-4">
    <!-- 搜索区域 -->
    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center gap-3 flex-wrap">
          <Input
            v-model="queryParams.keywords"
            :placeholder="t('dept.keywordPlaceholder')"
            class="w-60"
            @keyup.enter="handleQuery"
          />
          <Select v-model="statusFilter" @update:model-value="(v) => queryParams.status = v === 'all' ? undefined : Number(v)">
            <SelectTrigger class="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{{ t('dept.statusAll') }}</SelectItem>
              <SelectItem value="1">{{ t('dept.statusEnabled') }}</SelectItem>
              <SelectItem value="0">{{ t('dept.statusDisabled') }}</SelectItem>
            </SelectContent>
          </Select>
          <Button @click="handleQuery">{{ t('dept.search') }}</Button>
          <Button variant="outline" @click="handleResetQuery">{{ t('dept.reset') }}</Button>
        </div>
      </CardContent>
    </Card>

    <!-- 表格区域 -->
    <Card>
      <CardContent class="pt-6">
        <!-- 工具栏 -->
        <div class="flex items-center gap-2 mb-4">
          <Button @click="handleCreate()">{{ t('dept.add') }}</Button>
          <Button
            variant="destructive"
            :disabled="selectedIds.length === 0"
            @click="handleBatchDelete"
          >
            {{ t('dept.delete') }}
          </Button>
          <div class="flex-1" />
          <Button variant="outline" size="sm" @click="toggleExpandAll">
            {{ allExpanded ? t('dept.collapseAll') : t('dept.expandAll') }}
          </Button>
        </div>

        <!-- 树形表格 -->
        <div class="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-12">
                  <input
                    type="checkbox"
                    :checked="isAllSelected"
                    class="size-4 rounded border-border"
                    @change="toggleSelectAll"
                  />
                </TableHead>
                <TableHead>{{ t('dept.name') }}</TableHead>
                <TableHead class="text-center w-24">{{ t('dept.status') }}</TableHead>
                <TableHead class="text-center w-20">{{ t('dept.sort') }}</TableHead>
                <TableHead class="text-center w-56">{{ t('dept.action') }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="loading">
                <TableCell :colspan="5" class="h-24 text-center text-muted-foreground">
                  {{ t('dept.loading') }}
                </TableCell>
              </TableRow>
              <TableRow v-else-if="deptList.length === 0">
                <TableCell :colspan="5" class="h-24 text-center text-muted-foreground">
                  {{ t('dept.noData') }}
                </TableCell>
              </TableRow>
              <template v-else>
                <DeptTableRow
                  v-for="dept in deptList"
                  :key="dept.id"
                  :dept="dept"
                  :level="0"
                  :expanded-ids="expandedIds"
                  :selected-ids="selectedIds"
                  @toggle-expand="toggleExpand"
                  @toggle-select="toggleSelect"
                  @create="handleCreate"
                  @edit="handleEdit"
                  @delete="handleDelete"
                />
              </template>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>

    <!-- 新增/编辑弹窗 -->
    <Dialog :open="dialogVisible" @update:open="(v) => { if (!v) closeDialog() }">
      <DialogContent class="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{{ dialogTitle }}</DialogTitle>
        </DialogHeader>
        <div class="space-y-4 py-2">
          <div class="space-y-2">
            <Label>{{ t('dept.parentDept') }} <span class="text-destructive">*</span></Label>
            <DeptTreeSelect
              v-model="formData.parentId"
              :options="deptOptions"
              :placeholder="t('dept.parentDeptPlaceholder')"
            />
          </div>
          <div class="space-y-2">
            <Label>{{ t('dept.name') }} <span class="text-destructive">*</span></Label>
            <Input v-model="formData.name" :placeholder="t('dept.namePlaceholder')" />
          </div>
          <div class="space-y-2">
            <Label>{{ t('dept.sortLabel') }}</Label>
            <Input v-model.number="formData.sort" type="number" min="0" class="w-24" />
          </div>
          <div class="space-y-2">
            <Label>{{ t('dept.status') }}</Label>
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input type="radio" :value="1" v-model.number="formData.status" class="accent-primary" />
                {{ t('dept.statusEnabled') }}
              </label>
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input type="radio" :value="0" v-model.number="formData.status" class="accent-primary" />
                {{ t('dept.statusDisabled') }}
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="closeDialog">{{ t('dept.cancel') }}</Button>
          <Button @click="handleSubmit">{{ t('dept.confirm') }}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- 删除确认 -->
    <AlertDialog :open="deleteConfirmVisible" @update:open="(v) => deleteConfirmVisible = v">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{{ t('dept.deleteWarning') }}</AlertDialogTitle>
          <AlertDialogDescription>{{ t('dept.deleteConfirm') }}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="deleteConfirmVisible = false">{{ t('dept.cancel') }}</AlertDialogCancel>
          <AlertDialogAction @click="confirmDelete">{{ t('dept.confirm') }}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  getDeptList, getDeptOptions, getDeptFormData,
  createDept, updateDept, deleteDeptByIds,
} from "@/api/system/dept";
import type { DeptItem, DeptForm, DeptQuery } from "@/api/system/dept/types";
import type { OptionItem } from "@/api/common";
import DeptTreeSelect from "./DeptTreeSelect.vue";
import DeptTableRow from "./DeptTableRow.vue";

const { t } = useI18n();

// ==================== 列表 ====================

const loading = ref(false);
const deptList = ref<DeptItem[]>([]);
const selectedIds = ref<string[]>([]);
const expandedIds = ref<Set<string>>(new Set());
const allExpanded = ref(true);

const queryParams = reactive<DeptQuery>({});
const statusFilter = ref("all");

const isAllSelected = computed(() => {
  const all = flattenAll(deptList.value);
  return all.length > 0 && all.every((d) => selectedIds.value.includes(d.id));
});

function flattenAll(nodes: DeptItem[]): DeptItem[] {
  const result: DeptItem[] = [];
  for (const node of nodes) {
    result.push(node);
    if (node.children) result.push(...flattenAll(node.children));
  }
  return result;
}

function toggleSelectAll() {
  const all = flattenAll(deptList.value);
  if (isAllSelected.value) {
    selectedIds.value = [];
  } else {
    selectedIds.value = all.map((d) => d.id);
  }
}

function toggleSelect(id: string) {
  const idx = selectedIds.value.indexOf(id);
  if (idx >= 0) selectedIds.value.splice(idx, 1);
  else selectedIds.value.push(id);
}

function toggleExpand(id: string) {
  const s = new Set(expandedIds.value);
  if (s.has(id)) s.delete(id);
  else s.add(id);
  expandedIds.value = s;
}

function initExpanded(nodes: DeptItem[]) {
  const s = new Set<string>();
  function walk(list: DeptItem[]) {
    for (const node of list) {
      if (node.children?.length) {
        s.add(node.id);
        walk(node.children);
      }
    }
  }
  walk(nodes);
  expandedIds.value = s;
}

function toggleExpandAll() {
  if (allExpanded.value) {
    expandedIds.value = new Set();
    allExpanded.value = false;
  } else {
    initExpanded(deptList.value);
    allExpanded.value = true;
  }
}

function fetchList() {
  loading.value = true;
  try {
    deptList.value = getDeptList(queryParams);
    initExpanded(deptList.value);
    selectedIds.value = [];
    allExpanded.value = true;
  } finally {
    loading.value = false;
  }
}

function handleQuery() {
  fetchList();
}

function handleResetQuery() {
  queryParams.keywords = "";
  queryParams.status = undefined;
  statusFilter.value = "all";
  fetchList();
}

// ==================== 新增/编辑弹窗 ====================

const dialogVisible = ref(false);
const dialogTitle = ref("");
const deptOptions = ref<OptionItem[]>([]);

const formData = reactive<DeptForm>({
  name: "",
  parentId: "0",
  sort: 1,
  status: 1,
});

function resetForm() {
  formData.id = undefined;
  formData.name = "";
  formData.parentId = "0";
  formData.sort = 1;
  formData.status = 1;
}

function closeDialog() {
  dialogVisible.value = false;
  resetForm();
}

function handleCreate(parentId?: string) {
  dialogTitle.value = t("dept.addTitle");
  deptOptions.value = [
    { value: "0", label: t("dept.topLevel"), children: getDeptOptions() },
  ];
  resetForm();
  if (parentId) formData.parentId = parentId;
  dialogVisible.value = true;
}

function handleEdit(id: string) {
  dialogTitle.value = t("dept.editTitle");
  deptOptions.value = [
    { value: "0", label: t("dept.topLevel"), children: getDeptOptions() },
  ];
  const data = getDeptFormData(id);
  if (data) Object.assign(formData, data);
  dialogVisible.value = true;
}

function handleSubmit() {
  if (!formData.name) { toast.error(t("dept.nameRequired")); return; }
  if (!formData.parentId && formData.parentId !== "0") { toast.error(t("dept.parentRequired")); return; }

  if (formData.id) {
    updateDept(formData.id, formData);
    toast.success(t("dept.editSuccess"));
  } else {
    createDept(formData);
    toast.success(t("dept.addSuccess"));
  }
  closeDialog();
  fetchList();
}

// ==================== 删除 ====================

const deleteConfirmVisible = ref(false);
const pendingDeleteIds = ref("");

function handleDelete(id?: string) {
  const ids = id ?? selectedIds.value.join(",");
  if (!ids) { toast.warning(t("dept.selectDelete")); return; }
  pendingDeleteIds.value = ids;
  deleteConfirmVisible.value = true;
}

function handleBatchDelete() {
  handleDelete();
}

function confirmDelete() {
  deleteDeptByIds(pendingDeleteIds.value);
  toast.success(t("dept.deleteSuccess"));
  deleteConfirmVisible.value = false;
  fetchList();
}

// ==================== 初始化 ====================

onMounted(() => {
  fetchList();
});
</script>
