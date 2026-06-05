<template>
  <div class="p-5 space-y-4">
    <!-- 搜索区域 -->
    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center gap-3 flex-wrap">
          <Input
            v-model.trim="queryParams.keywords"
            :placeholder="t('role.keywordPlaceholder')"
            class="w-60"
            @keyup.enter="handleQuery"
          />
          <Button @click="handleQuery">{{ t("role.search") }}</Button>
          <Button variant="outline" @click="handleResetQuery">{{ t("role.reset") }}</Button>
        </div>
      </CardContent>
    </Card>

    <!-- 表格区域 -->
    <Card>
      <CardContent class="pt-6">
        <!-- 工具栏 -->
        <div class="flex items-center gap-2 mb-4">
          <Button @click="handleCreate">{{ t("role.add") }}</Button>
          <Button
            variant="destructive"
            :disabled="selectedIds.length === 0"
            @click="handleBatchDelete"
          >
            {{ t("role.batchDelete") }}
          </Button>
        </div>

        <!-- 表格 -->
        <div class="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-12">
                  <input
                    type="checkbox"
                    :checked="isAllSelected"
                    :indeterminate="isPartialSelected"
                    class="size-4 rounded border-border"
                    @change="toggleSelectAll"
                  />
                </TableHead>
                <TableHead>{{ t("role.name") }}</TableHead>
                <TableHead>{{ t("role.code") }}</TableHead>
                <TableHead class="text-center">{{ t("role.dataScope") }}</TableHead>
                <TableHead class="text-center">{{ t("role.status") }}</TableHead>
                <TableHead class="text-center w-20">{{ t("role.sort") }}</TableHead>
                <TableHead class="text-center w-56">{{ t("role.action") }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="loading">
                <TableCell :colspan="7" class="h-24 text-center text-muted-foreground">
                  加载中...
                </TableCell>
              </TableRow>
              <TableRow v-else-if="roleList.length === 0">
                <TableCell :colspan="7" class="h-24 text-center text-muted-foreground">
                  暂无数据
                </TableCell>
              </TableRow>
              <TableRow v-for="role in roleList" :key="role.id" class="hover:bg-muted/50">
                <TableCell>
                  <input
                    type="checkbox"
                    :checked="selectedIds.includes(role.id)"
                    class="size-4 rounded border-border"
                    @change="toggleSelect(role.id)"
                  />
                </TableCell>
                <TableCell class="font-medium">{{ role.name }}</TableCell>
                <TableCell>
                  <Badge variant="outline">{{ role.code }}</Badge>
                </TableCell>
                <TableCell class="text-center">{{ role.dataScopeLabel }}</TableCell>
                <TableCell class="text-center">
                  <Badge :variant="role.status === 1 ? 'default' : 'secondary'">
                    {{ role.status === 1 ? t("role.statusEnabled") : t("role.statusDisabled") }}
                  </Badge>
                </TableCell>
                <TableCell class="text-center">{{ role.sort }}</TableCell>
                <TableCell class="text-center">
                  <div class="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      class="h-7 text-xs"
                      @click="handleAssignPerm(role)"
                    >
                      {{ t("role.assignPerm") }}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="h-7 text-xs"
                      @click="handleEdit(role.id)"
                    >
                      {{ t("role.edit") }}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="h-7 text-xs text-destructive hover:text-destructive"
                      @click="handleDelete(role.id)"
                    >
                      {{ t("role.delete") }}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <!-- 分页 -->
        <div v-if="total > 0" class="flex items-center justify-between mt-4">
          <p class="text-sm text-muted-foreground">共 {{ total }} 条</p>
          <div class="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              :disabled="queryParams.pageNum <= 1"
              @click="goPage(queryParams.pageNum - 1)"
            >
              &lt;
            </Button>
            <Button
              v-for="page in displayedPages"
              :key="page"
              :variant="page === queryParams.pageNum ? 'default' : 'outline'"
              size="sm"
              class="min-w-8"
              @click="goPage(page)"
            >
              {{ page }}
            </Button>
            <Button
              variant="outline"
              size="sm"
              :disabled="queryParams.pageNum >= totalPages"
              @click="goPage(queryParams.pageNum + 1)"
            >
              &gt;
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 新增/编辑弹窗 -->
    <Dialog
      :open="dialogVisible"
      @update:open="
        (v) => {
          if (!v) closeDialog();
        }
      "
    >
      <DialogContent class="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{{ dialogTitle }}</DialogTitle>
        </DialogHeader>
        <div class="space-y-4 py-2">
          <div class="space-y-2">
            <Label>
              {{ t("role.name") }}
              <span class="text-destructive">*</span>
            </Label>
            <Input v-model.trim="formData.name" :placeholder="t('role.namePlaceholder')" />
          </div>
          <div class="space-y-2">
            <Label>
              {{ t("role.code") }}
              <span class="text-destructive">*</span>
            </Label>
            <Input v-model.trim="formData.code" :placeholder="t('role.codePlaceholder')" />
          </div>
          <div class="space-y-2">
            <Label>
              {{ t("role.dataScope") }}
              <span class="text-destructive">*</span>
            </Label>
            <Select
              v-model="dataScopeStr"
              @update:model-value="(v) => (formData.dataScope = Number(v))"
            >
              <SelectTrigger>
                <SelectValue :placeholder="t('role.dataScopePlaceholder')" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{{ t("role.dataScopeAll") }}</SelectItem>
                <SelectItem value="2">{{ t("role.dataScopeDeptAndSub") }}</SelectItem>
                <SelectItem value="3">{{ t("role.dataScopeDept") }}</SelectItem>
                <SelectItem value="4">{{ t("role.dataScopeSelf") }}</SelectItem>
                <SelectItem value="5">{{ t("role.dataScopeCustom") }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <!-- dataScope=5 自定义部门 -->
          <div v-if="formData.dataScope === 5" class="space-y-2">
            <Label>{{ t("role.deptSelect") }}</Label>
            <div class="border rounded-md p-3 max-h-40 overflow-auto space-y-1">
              <DepartmentTree
                v-for="dept in deptOptions"
                :key="String(dept.value)"
                :option="dept"
                :level="0"
                :checked="formData.deptIds ?? []"
                @toggle="toggleDept"
              />
            </div>
          </div>
          <div class="space-y-2">
            <Label>{{ t("role.status") }}</Label>
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  v-model.number="formData.status"
                  type="radio"
                  :value="1"
                  class="accent-primary"
                />
                {{ t("role.statusEnabled") }}
              </label>
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  v-model.number="formData.status"
                  type="radio"
                  :value="0"
                  class="accent-primary"
                />
                {{ t("role.statusDisabled") }}
              </label>
            </div>
          </div>
          <div class="space-y-2">
            <Label>{{ t("role.sort") }}</Label>
            <Input v-model.number="formData.sort" type="number" min="0" class="w-24" />
          </div>
          <div class="space-y-2">
            <Label>{{ t("role.remark") }}</Label>
            <Textarea
              v-model="formData.remark"
              :placeholder="t('role.remarkPlaceholder')"
              rows="3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="closeDialog">{{ t("role.cancel") }}</Button>
          <Button @click="handleSubmit">{{ t("role.confirm") }}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- 分配权限抽屉 -->
    <Sheet :open="assignVisible" @update:open="(v) => (assignVisible = v)">
      <SheetContent class="sm:max-w-lg overflow-auto">
        <SheetHeader>
          <SheetTitle>{{ t("role.assignPermTitle", { name: checkedRoleName }) }}</SheetTitle>
        </SheetHeader>
        <div class="py-4 space-y-4">
          <div class="flex items-center gap-3 flex-wrap">
            <Input
              v-model="permKeywords"
              :placeholder="t('role.permSearchPlaceholder')"
              class="w-40"
            />
            <Button variant="outline" size="sm" @click="togglePermTree">
              {{ permExpanded ? t("role.collapse") : t("role.expand") }}
            </Button>
            <label class="flex items-center gap-1.5 text-sm cursor-pointer">
              <input v-model="parentChildLinked" type="checkbox" class="size-4 rounded" />
              {{ t("role.parentChildLinked") }}
            </label>
          </div>
          <div class="border rounded-md p-3 space-y-1">
            <PermTreeItem
              v-for="node in filteredPermOptions"
              :key="String(node.value)"
              :node="node"
              :level="0"
              :expanded="permExpanded"
              :checked-ids="checkedMenuIds"
              :parent-linked="parentChildLinked"
              @toggle="togglePermCheck"
            />
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline" @click="assignVisible = false">{{ t("role.cancel") }}</Button>
          <Button @click="handleAssignPermSubmit">{{ t("role.confirm") }}</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>

    <!-- 删除确认 -->
    <AlertDialog :open="deleteConfirmVisible" @update:open="(v) => (deleteConfirmVisible = v)">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{{ t("role.deleteWarning") }}</AlertDialogTitle>
          <AlertDialogDescription>{{ t("role.deleteConfirm") }}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="deleteConfirmVisible = false">
            {{ t("role.cancel") }}
          </AlertDialogCancel>
          <AlertDialogAction @click="confirmDelete">{{ t("role.confirm") }}</AlertDialogAction>
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RoleAPI from "@/api/system/role";
import {
  getPage,
  getFormData,
  create,
  update,
  deleteByIds,
  getRoleMenuIds,
  updateRoleMenus,
  getRoleDeptIds,
} from "@/api/system/role";
import type { RoleItem, RoleForm, RoleQuery } from "@/api/role/types";
import type { OptionItem } from "@/api/common";
import PermTreeItem from "./PermTreeItem.vue";
import DepartmentTree from "./DepartmentTree.vue";
import { Award } from "@lucide/vue";

const { t } = useI18n();

// ==================== 列表 ====================

const loading = ref(false);
const roleList = ref<RoleItem[]>([]);
const total = ref(0);
const selectedIds = ref<string[]>([]);

const queryParams = reactive<RoleQuery>({
  pageNum: 1,
  pageSize: 10,
  keywords: "",
});

const totalPages = computed(() => Math.ceil(total.value / queryParams.pageSize));

const displayedPages = computed(() => {
  const tp = totalPages.value;
  const current = queryParams.pageNum;
  const pages: number[] = [];
  let start = Math.max(1, current - 2);
  const end = Math.min(tp, start + 4);
  start = Math.max(1, end - 4);
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

const isAllSelected = computed(
  () => roleList.value.length > 0 && roleList.value.every((r) => selectedIds.value.includes(r.id))
);

const isPartialSelected = computed(
  () => !isAllSelected.value && roleList.value.some((r) => selectedIds.value.includes(r.id))
);

function toggleSelectAll() {
  selectedIds.value = isAllSelected.value ? [] : roleList.value.map((r) => r.id);
}

function toggleSelect(id: string) {
  const idx = selectedIds.value.indexOf(id);
  if (idx >= 0) selectedIds.value.splice(idx, 1);
  else selectedIds.value.push(id);
}

function goPage(page: number) {
  queryParams.pageNum = page;
  fetchList();
}

async function fetchList() {
  loading.value = true;
  try {
    const result = await RoleAPI.getPage(queryParams);
    roleList.value = result.list;
    total.value = result.total;
    selectedIds.value = [];
  } finally {
    loading.value = false;
  }
}

function handleQuery() {
  queryParams.pageNum = 1;
  fetchList();
}

function handleResetQuery() {
  queryParams.keywords = "";
  handleQuery();
}

// ==================== 新增/编辑弹窗 ====================

const dialogVisible = ref(false);
const dialogTitle = ref("");

const formData = reactive<RoleForm>({
  name: "",
  code: "",
  dataScope: 1,
  status: 1,
  sort: 1,
  remark: "",
});

const dataScopeStr = computed({
  get: () => String(formData.dataScope),
  set: (v: string) => {
    formData.dataScope = Number(v);
  },
});

const deptOptions = ref<OptionItem[]>([]);

function resetForm() {
  formData.id = undefined;
  formData.name = "";
  formData.code = "";
  formData.dataScope = 1;
  formData.status = 1;
  formData.sort = 1;
  formData.remark = "";
  formData.deptIds = undefined;
}

function closeDialog() {
  dialogVisible.value = false;
  resetForm();
}

async function handleCreate() {
  dialogTitle.value = t("role.addTitle");
  if (deptOptions.value.length === 0) deptOptions.value = RoleAPI.getRoleDeptIds();
  resetForm();
  dialogVisible.value = true;
}

async function handleEdit(id: string) {
  dialogTitle.value = t("role.editTitle");
  if (deptOptions.value.length === 0) deptOptions.value = RoleAPI.getRoleDeptIds();
  const data = await RoleAPI.getFormData(id);
  if (data) Object.assign(formData, data);
  dialogVisible.value = true;
}

async function handleSubmit() {
  if (!formData.name) {
    toast.error(t("role.nameRequired"));
    return;
  }
  if (!formData.code) {
    toast.error(t("role.codeRequired"));
    return;
  }

  const submitData = { ...formData };
  if (submitData.dataScope !== 5) submitData.deptIds = undefined;

  if (formData.id) {
    RoleAPI.update(formData.id, submitData);
    toast.success(t("role.editSuccess"));
  } else {
    RoleAPI.create(submitData);
    toast.success(t("role.addSuccess"));
  }
  closeDialog();
  handleQuery();
}

// ==================== 删除 ====================

const deleteConfirmVisible = ref(false);
const pendingDeleteIds = ref("");

function handleDelete(id?: string) {
  const ids = id ?? selectedIds.value.join(",");
  if (!ids) {
    toast.warning(t("role.selectDelete"));
    return;
  }
  pendingDeleteIds.value = ids;
  deleteConfirmVisible.value = true;
}

function handleBatchDelete() {
  handleDelete();
}

async function confirmDelete() {
  RoleAPI.deleteByIds(pendingDeleteIds.value);
  toast.success(t("role.deleteSuccess"));
  deleteConfirmVisible.value = false;
  handleQuery();
}

// ==================== 分配权限 ====================

const assignVisible = ref(false);
const checkedRoleId = ref("");
const checkedRoleName = ref("");
const permOptions = ref<OptionItem[]>([]);
const checkedMenuIds = ref<Number[]>([]);
const permKeywords = ref("");
const permExpanded = ref(true);
const parentChildLinked = ref(true);

const filteredPermOptions = computed(() => {
  if (!permKeywords.value) return permOptions.value;
  return filterPermTree(permOptions.value, permKeywords.value.toLowerCase());
});

function filterPermTree(nodes: OptionItem[], kw: string): OptionItem[] {
  return nodes
    .map((node) => {
      if (node.label.toLowerCase().includes(kw)) return { ...node };
      if (node.children) {
        const filtered = filterPermTree(node.children, kw);
        if (filtered.length > 0) return { ...node, children: filtered };
      }
      return null;
    })
    .filter(Boolean) as OptionItem[];
}

function togglePermTree() {
  permExpanded.value = !permExpanded.value;
}

function togglePermCheck(id: string) {
  const idx = checkedMenuIds.value.indexOf(id);
  if (idx >= 0) {
    checkedMenuIds.value.splice(idx, 1);
  } else {
    checkedMenuIds.value.push(id);
  }
  // 父子联动
  if (parentChildLinked.value) {
    const node = findNode(permOptions.value, id);
    if (node?.children) {
      const childIds = collectIds(node.children);
      if (idx >= 0) {
        checkedMenuIds.value = checkedMenuIds.value.filter((cid) => !childIds.includes(cid));
      } else {
        childIds.forEach((cid) => {
          if (!checkedMenuIds.value.includes(cid)) checkedMenuIds.value.push(cid);
        });
      }
    }
  }
}

function findNode(nodes: OptionItem[], id: string): OptionItem | undefined {
  for (const node of nodes) {
    if (String(node.value) === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

function collectIds(nodes: OptionItem[]): string[] {
  const ids: string[] = [];
  for (const node of nodes) {
    ids.push(String(node.value));
    if (node.children) ids.push(...collectIds(node.children));
  }
  return ids;
}

async function handleAssignPerm(role: RoleItem) {
  checkedRoleId.value = role.id;
  checkedRoleName.value = role.name;
  permOptions.value = await RoleAPI.getRoleMenuIds(role.id);
  checkedMenuIds.value = await RoleAPI.getRoleMenuIds(role.id);
  permKeywords.value = "";
  assignVisible.value = true;
}

async function handleAssignPermSubmit() {
  RoleAPI.updateRoleMenus(checkedRoleId.value, [...checkedMenuIds.value]);
  toast.success(t("role.assignSuccess"));
  assignVisible.value = false;
}

// ==================== 部门选择 ====================

function toggleDept(deptId: string) {
  if (!formData.deptIds) formData.deptIds = [];
  const idx = formData.deptIds.indexOf(deptId);
  if (idx >= 0) formData.deptIds.splice(idx, 1);
  else formData.deptIds.push(deptId);
}

// ==================== 初始化 ====================

onMounted(() => {
  fetchList();
});
</script>
