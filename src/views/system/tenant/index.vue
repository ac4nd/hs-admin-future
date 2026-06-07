<template>
  <div class="p-5 space-y-4">
    <!-- 搜索区域 -->
    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center gap-3 flex-wrap">
          <Input
            v-model.trim="queryParams.keywords"
            :placeholder="t('tenant.keywordPlaceholder')"
            class="w-60"
            @keyup.enter="handleQuery"
          />
          <Select v-model="statusStr" @update:model-value="(v: any) => (queryParams.status = v === 'all' ? undefined : Number(v))">
            <SelectTrigger class="w-32">
              <SelectValue :placeholder="t('tenant.statusAll')" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{{ t("tenant.statusAll") }}</SelectItem>
              <SelectItem value="1">{{ t("tenant.statusEnabled") }}</SelectItem>
              <SelectItem value="0">{{ t("tenant.statusDisabled") }}</SelectItem>
            </SelectContent>
          </Select>
          <Button @click="handleQuery">{{ t("tenant.search") }}</Button>
          <Button variant="outline" @click="handleResetQuery">{{ t("tenant.reset") }}</Button>
        </div>
      </CardContent>
    </Card>

    <!-- 表格区域 -->
    <Card>
      <CardContent class="pt-6">
        <!-- 工具栏 -->
        <div class="flex items-center gap-2 mb-4">
          <Button @click="handleCreate">{{ t("tenant.add") }}</Button>
          <Button
            variant="destructive"
            :disabled="selectedIds.length === 0"
            @click="handleBatchDelete"
          >
            {{ t("tenant.batchDelete") }}
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
                <TableHead>{{ t("tenant.name") }}</TableHead>
                <TableHead>{{ t("tenant.code") }}</TableHead>
                <TableHead>{{ t("tenant.contactName") }}</TableHead>
                <TableHead>{{ t("tenant.contactPhone") }}</TableHead>
                <TableHead>{{ t("tenant.plan") }}</TableHead>
                <TableHead>{{ t("tenant.domain") }}</TableHead>
                <TableHead class="text-center">{{ t("tenant.status") }}</TableHead>
                <TableHead>{{ t("tenant.expireTime") }}</TableHead>
                <TableHead class="text-center w-56">{{ t("tenant.action") }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="loading">
                <TableCell :colspan="10" class="h-24 text-center text-muted-foreground">
                  {{ t("tenant.loading") }}
                </TableCell>
              </TableRow>
              <TableRow v-else-if="dataList.length === 0">
                <TableCell :colspan="10" class="h-24 text-center text-muted-foreground">
                  {{ t("tenant.noData") }}
                </TableCell>
              </TableRow>
              <TableRow v-for="item in dataList" :key="item.id" class="hover:bg-muted/50">
                <TableCell>
                  <input
                    type="checkbox"
                    :checked="selectedIds.includes(item.id ?? '')"
                    class="size-4 rounded border-border"
                    @change="toggleSelect(item.id ?? '')"
                  />
                </TableCell>
                <TableCell class="font-medium">{{ item.name }}</TableCell>
                <TableCell>
                  <Badge variant="outline">{{ item.code }}</Badge>
                </TableCell>
                <TableCell>{{ item.contactName || "-" }}</TableCell>
                <TableCell>{{ item.contactPhone || "-" }}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{{ getPlanName(item.planId) }}</Badge>
                </TableCell>
                <TableCell class="text-sm">{{ item.domain || "-" }}</TableCell>
                <TableCell class="text-center">
                  <Badge :variant="item.status === 1 ? 'default' : 'secondary'">
                    {{ item.status === 1 ? t("tenant.statusEnabled") : t("tenant.statusDisabled") }}
                  </Badge>
                </TableCell>
                <TableCell class="text-sm text-muted-foreground">{{ item.expireTime || "-" }}</TableCell>
                <TableCell class="text-center">
                  <div class="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      class="h-7 text-xs"
                      @click="handleAssignMenu(item)"
                    >
                      {{ t("tenant.assignMenu") }}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="h-7 text-xs"
                      @click="handleEdit(item.id ?? '')"
                    >
                      {{ t("tenant.edit") }}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="h-7 text-xs text-destructive hover:text-destructive"
                      @click="handleDelete(item.id)"
                    >
                      {{ t("tenant.delete") }}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <!-- 分页 -->
        <div v-if="total > 0" class="flex items-center justify-between mt-4">
          <p class="text-sm text-muted-foreground">{{ t("tenant.total", { count: total }) }}</p>
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

    <!-- 新增弹窗 -->
    <Dialog
      :open="createDialogVisible"
      @update:open="
        (v) => {
          if (!v) closeCreateDialog();
        }
      "
    >
      <DialogContent class="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{{ t("tenant.addTitle") }}</DialogTitle>
        </DialogHeader>
        <div class="space-y-4 py-2 max-h-[60vh] overflow-y-auto pr-2">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>
                {{ t("tenant.name") }}
                <span class="text-destructive">*</span>
              </Label>
              <Input v-model.trim="createForm.name" :placeholder="t('tenant.namePlaceholder')" />
            </div>
            <div class="space-y-2">
              <Label>
                {{ t("tenant.code") }}
                <span class="text-destructive">*</span>
              </Label>
              <Input v-model.trim="createForm.code" :placeholder="t('tenant.codePlaceholder')" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>{{ t("tenant.contactName") }}</Label>
              <Input v-model.trim="createForm.contactName" :placeholder="t('tenant.contactNamePlaceholder')" />
            </div>
            <div class="space-y-2">
              <Label>{{ t("tenant.contactPhone") }}</Label>
              <Input v-model.trim="createForm.contactPhone" :placeholder="t('tenant.contactPhonePlaceholder')" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>{{ t("tenant.contactEmail") }}</Label>
              <Input v-model.trim="createForm.contactEmail" :placeholder="t('tenant.contactEmailPlaceholder')" />
            </div>
            <div class="space-y-2">
              <Label>{{ t("tenant.domain") }}</Label>
              <Input v-model.trim="createForm.domain" :placeholder="t('tenant.domainPlaceholder')" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>
                {{ t("tenant.plan") }}
                <span class="text-destructive">*</span>
              </Label>
              <Select v-model="planIdStr" @update:model-value="(v: any) => (createForm.planId = Number(v))">
                <SelectTrigger>
                  <SelectValue :placeholder="t('tenant.planPlaceholder')" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="opt in planOptions" :key="String(opt.value)" :value="String(opt.value)">
                    {{ opt.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="space-y-2">
              <Label>{{ t("tenant.adminUsername") }}</Label>
              <Input v-model.trim="createForm.adminUsername" :placeholder="t('tenant.adminUsernamePlaceholder')" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>{{ t("tenant.expireTime") }}</Label>
              <Input v-model.trim="createForm.expireTime" type="datetime-local" />
            </div>
          </div>
          <div class="space-y-2">
            <Label>{{ t("tenant.remark") }}</Label>
            <Textarea
              v-model="createForm.remark"
              :placeholder="t('tenant.remarkPlaceholder')"
              rows="3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="closeCreateDialog">{{ t("tenant.cancel") }}</Button>
          <Button @click="handleCreateSubmit">{{ t("tenant.confirm") }}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- 编辑弹窗 -->
    <Dialog
      :open="editDialogVisible"
      @update:open="
        (v) => {
          if (!v) closeEditDialog();
        }
      "
    >
      <DialogContent class="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{{ t("tenant.editTitle") }}</DialogTitle>
        </DialogHeader>
        <div class="space-y-4 py-2 max-h-[60vh] overflow-y-auto pr-2">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>
                {{ t("tenant.name") }}
                <span class="text-destructive">*</span>
              </Label>
              <Input v-model.trim="editForm.name" :placeholder="t('tenant.namePlaceholder')" />
            </div>
            <div class="space-y-2">
              <Label>
                {{ t("tenant.code") }}
                <span class="text-destructive">*</span>
              </Label>
              <Input v-model.trim="editForm.code" :placeholder="t('tenant.codePlaceholder')" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>{{ t("tenant.contactName") }}</Label>
              <Input v-model.trim="editForm.contactName" :placeholder="t('tenant.contactNamePlaceholder')" />
            </div>
            <div class="space-y-2">
              <Label>{{ t("tenant.contactPhone") }}</Label>
              <Input v-model.trim="editForm.contactPhone" :placeholder="t('tenant.contactPhonePlaceholder')" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>{{ t("tenant.contactEmail") }}</Label>
              <Input v-model.trim="editForm.contactEmail" :placeholder="t('tenant.contactEmailPlaceholder')" />
            </div>
            <div class="space-y-2">
              <Label>{{ t("tenant.domain") }}</Label>
              <Input v-model.trim="editForm.domain" :placeholder="t('tenant.domainPlaceholder')" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>{{ t("tenant.plan") }}</Label>
              <Select v-model="editPlanIdStr" @update:model-value="(v: any) => (editForm.planId = Number(v))">
                <SelectTrigger>
                  <SelectValue :placeholder="t('tenant.planPlaceholder')" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="opt in planOptions" :key="String(opt.value)" :value="String(opt.value)">
                    {{ opt.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="space-y-2">
              <Label>{{ t("tenant.status") }}</Label>
              <div class="flex items-center gap-4 h-9">
                <label class="flex items-center gap-2 cursor-pointer text-sm">
                  <input v-model.number="editForm.status" type="radio" :value="1" class="accent-primary" />
                  {{ t("tenant.statusEnabled") }}
                </label>
                <label class="flex items-center gap-2 cursor-pointer text-sm">
                  <input v-model.number="editForm.status" type="radio" :value="0" class="accent-primary" />
                  {{ t("tenant.statusDisabled") }}
                </label>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>{{ t("tenant.expireTime") }}</Label>
              <Input v-model.trim="editForm.expireTime" type="datetime-local" />
            </div>
          </div>
          <div class="space-y-2">
            <Label>{{ t("tenant.remark") }}</Label>
            <Textarea
              v-model="editForm.remark"
              :placeholder="t('tenant.remarkPlaceholder')"
              rows="3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="closeEditDialog">{{ t("tenant.cancel") }}</Button>
          <Button @click="handleEditSubmit">{{ t("tenant.confirm") }}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- 创建成功结果 -->
    <AlertDialog :open="createResultVisible" @update:open="(v) => (createResultVisible = v)">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{{ t("tenant.createSuccessTitle") }}</AlertDialogTitle>
          <AlertDialogDescription class="text-left space-y-2 pt-2">
            <p>{{ t("tenant.createResultDesc") }}</p>
            <div class="bg-muted rounded-md p-3 text-sm space-y-1 font-mono">
              <p>{{ t("tenant.tenantCode") }}：{{ createResult.tenantCode }}</p>
              <p>{{ t("tenant.adminUsername") }}：{{ createResult.adminUsername }}</p>
              <p>{{ t("tenant.adminPassword") }}：{{ createResult.adminInitialPassword }}</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction @click="createResultVisible = false">{{ t("tenant.confirm") }}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <!-- 分配菜单抽屉 -->
    <Sheet :open="assignVisible" @update:open="(v) => (assignVisible = v)">
      <SheetContent class="sm:max-w-lg overflow-auto">
        <SheetHeader>
          <SheetTitle>{{ t("tenant.assignMenuTitle", { name: checkedTenantName }) }}</SheetTitle>
        </SheetHeader>
        <div class="py-4 space-y-4">
          <div class="flex items-center gap-3 flex-wrap">
            <Input
              v-model="menuKeywords"
              :placeholder="t('tenant.menuSearchPlaceholder')"
              class="w-40"
            />
            <Button variant="outline" size="sm" @click="toggleMenuTree">
              {{ menuExpanded ? t("tenant.collapse") : t("tenant.expand") }}
            </Button>
            <label class="flex items-center gap-1.5 text-sm cursor-pointer">
              <input v-model="parentChildLinked" type="checkbox" class="size-4 rounded" />
              {{ t("tenant.parentChildLinked") }}
            </label>
          </div>
          <div class="border rounded-md p-3 space-y-1">
            <PermTreeItem
              v-for="node in filteredMenuOptions"
              :key="String(node.value)"
              :node="node"
              :level="0"
              :expanded="menuExpanded"
              :checked-ids="checkedMenuIds"
              :parent-linked="parentChildLinked"
              @toggle="toggleMenuCheck"
            />
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline" @click="assignVisible = false">{{ t("tenant.cancel") }}</Button>
          <Button @click="handleAssignMenuSubmit">{{ t("tenant.confirm") }}</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>

    <!-- 删除确认 -->
    <AlertDialog :open="deleteConfirmVisible" @update:open="(v) => (deleteConfirmVisible = v)">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{{ t("tenant.deleteWarning") }}</AlertDialogTitle>
          <AlertDialogDescription>{{ t("tenant.deleteConfirm") }}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="deleteConfirmVisible = false">
            {{ t("tenant.cancel") }}
          </AlertDialogCancel>
          <AlertDialogAction @click="confirmDelete">{{ t("tenant.confirm") }}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "Tenant", inheritAttrs: false });

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
import TenantAPI from "@/api/system/tenant";
import TenantPlanAPI from "@/api/system/tenant-plan";
import MenuAPI from "@/api/system/menu";
import type { TenantItem, TenantForm, TenantCreateForm, TenantCreateResult, TenantQueryParams } from "@/api/system/tenant/types";
import type { OptionItem } from "@/api/common";
import PermTreeItem from "@/views/system/role/PermTreeItem.vue";

const { t } = useI18n();

// ==================== 列表 ====================

const loading = ref(false);
const dataList = ref<TenantItem[]>([]);
const total = ref(0);
const selectedIds = ref<string[]>([]);
const planOptions = ref<OptionItem[]>([]);

const queryParams = reactive<TenantQueryParams>({
  pageNum: 1,
  pageSize: 10,
  keywords: "",
});

const statusStr = ref("");

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
  () => dataList.value.length > 0 && dataList.value.every((r) => selectedIds.value.includes(r.id ?? ""))
);

const isPartialSelected = computed(
  () => !isAllSelected.value && dataList.value.some((r) => selectedIds.value.includes(r.id ?? ""))
);

function toggleSelectAll() {
  selectedIds.value = isAllSelected.value ? [] : dataList.value.map((r) => r.id ?? "");
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

function getPlanName(planId?: number): string {
  if (!planId) return "-";
  const opt = planOptions.value.find((o) => Number(o.value) === planId);
  return opt?.label ?? "-";
}

async function fetchList() {
  loading.value = true;
  try {
    const result = await TenantAPI.getPage(queryParams);
    dataList.value = result.list;
    total.value = result.total;
    selectedIds.value = [];
  } catch (error) {
    console.error("[Tenant] 获取列表失败:", error);
  } finally {
    loading.value = false;
  }
}

async function loadPlanOptions() {
  if (planOptions.value.length === 0) {
    planOptions.value = await TenantPlanAPI.getOptions();
  }
}

function handleQuery() {
  queryParams.pageNum = 1;
  fetchList();
}

function handleResetQuery() {
  queryParams.keywords = "";
  queryParams.status = undefined;
  statusStr.value = "all";
  handleQuery();
}

// ==================== 新增弹窗 ====================

const createDialogVisible = ref(false);
const planIdStr = ref("");

const createForm = reactive<TenantCreateForm>({
  name: "",
  code: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  domain: "",
  planId: undefined,
  adminUsername: "",
  remark: "",
  expireTime: "",
});

/** 将 expireTime 转为后端期望的 "yyyy-MM-dd HH:mm:ss" 格式 */
function formatExpireTime(val: string | undefined): string | undefined {
  if (!val) return undefined;
  // 已经是后端格式 "2024-01-01 12:00:00" → 原样返回
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(val)) return val;
  // datetime-local 格式 "2024-01-01T12:00" → 转换
  if (val.includes("T")) return val.replace("T", " ") + ":00";
  return val;
}

function resetCreateForm() {
  createForm.name = "";
  createForm.code = "";
  createForm.contactName = "";
  createForm.contactPhone = "";
  createForm.contactEmail = "";
  createForm.domain = "";
  createForm.planId = undefined;
  createForm.adminUsername = "";
  createForm.remark = "";
  createForm.expireTime = "";
  planIdStr.value = "";
}

function closeCreateDialog() {
  createDialogVisible.value = false;
  resetCreateForm();
}

async function handleCreate() {
  await loadPlanOptions();
  resetCreateForm();
  createDialogVisible.value = true;
}

const createResultVisible = ref(false);
const createResult = reactive<TenantCreateResult>({});

async function handleCreateSubmit() {
  if (!createForm.name) {
    toast.error(t("tenant.nameRequired"));
    return;
  }
  if (!createForm.code) {
    toast.error(t("tenant.codeRequired"));
    return;
  }
  if (!createForm.planId) {
    toast.error(t("tenant.planRequired"));
    return;
  }

  loading.value = true;
  try {
    const submitData = { ...createForm };
    submitData.expireTime = formatExpireTime(submitData.expireTime);
    const result = await TenantAPI.create(submitData);
    toast.success(t("tenant.addSuccess"));
    createDialogVisible.value = false;

    if (result) {
      Object.assign(createResult, result);
      createResultVisible.value = true;
    }

    handleResetQuery();
  } catch (error) {
    console.error("[Tenant] 新增失败:", error);
  } finally {
    loading.value = false;
  }
}

// ==================== 编辑弹窗 ====================

const editDialogVisible = ref(false);
const editPlanIdStr = ref("");

const editForm = reactive<TenantForm>({
  name: "",
  code: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  domain: "",
  planId: undefined,
  status: 1,
  remark: "",
  expireTime: "",
});

function resetEditForm() {
  editForm.id = undefined;
  editForm.name = "";
  editForm.code = "";
  editForm.contactName = "";
  editForm.contactPhone = "";
  editForm.contactEmail = "";
  editForm.domain = "";
  editForm.planId = undefined;
  editForm.status = 1;
  editForm.remark = "";
  editForm.expireTime = "";
  editPlanIdStr.value = "";
}

function closeEditDialog() {
  editDialogVisible.value = false;
  resetEditForm();
}

async function handleEdit(id: string) {
  await loadPlanOptions();
  const data = await TenantAPI.getFormData(id);
  if (data) {
    Object.assign(editForm, data);
    editPlanIdStr.value = data.planId ? String(data.planId) : "";
  }
  editDialogVisible.value = true;
}

async function handleEditSubmit() {
  if (!editForm.name) {
    toast.error(t("tenant.nameRequired"));
    return;
  }
  if (!editForm.code) {
    toast.error(t("tenant.codeRequired"));
    return;
  }

  loading.value = true;
  try {
    const submitData = { ...editForm };
    submitData.expireTime = formatExpireTime(submitData.expireTime);
    await TenantAPI.update(editForm.id!, submitData);
    toast.success(t("tenant.editSuccess"));
    closeEditDialog();
    handleResetQuery();
  } catch (error) {
    console.error("[Tenant] 编辑失败:", error);
  } finally {
    loading.value = false;
  }
}

// ==================== 删除 ====================

const deleteConfirmVisible = ref(false);
const pendingDeleteIds = ref("");

function handleDelete(id?: string) {
  const ids = id ?? selectedIds.value.join(",");
  if (!ids) {
    toast.warning(t("tenant.selectDelete"));
    return;
  }
  pendingDeleteIds.value = ids;
  deleteConfirmVisible.value = true;
}

function handleBatchDelete() {
  handleDelete();
}

async function confirmDelete() {
  loading.value = true;
  try {
    await TenantAPI.deleteByIds(pendingDeleteIds.value);
    toast.success(t("tenant.deleteSuccess"));
    deleteConfirmVisible.value = false;
    handleResetQuery();
  } catch (error) {
    console.error("[Tenant] 删除失败:", error);
  } finally {
    loading.value = false;
  }
}

// ==================== 分配菜单 ====================

const assignVisible = ref(false);
const checkedTenantId = ref(0);
const checkedTenantName = ref("");
const menuOptions = ref<OptionItem[]>([]);
const checkedMenuIds = ref<string[]>([]);
const menuKeywords = ref("");
const menuExpanded = ref(true);
const parentChildLinked = ref(true);

const filteredMenuOptions = computed(() => {
  if (!menuKeywords.value) return menuOptions.value;
  return filterMenuTree(menuOptions.value, menuKeywords.value.toLowerCase());
});

function filterMenuTree(nodes: OptionItem[], kw: string): OptionItem[] {
  return nodes
    .map((node) => {
      if (node.label.toLowerCase().includes(kw)) return { ...node };
      if (node.children) {
        const filtered = filterMenuTree(node.children, kw);
        if (filtered.length > 0) return { ...node, children: filtered };
      }
      return null;
    })
    .filter(Boolean) as OptionItem[];
}

function toggleMenuTree() {
  menuExpanded.value = !menuExpanded.value;
}

function toggleMenuCheck(id: string) {
  const idx = checkedMenuIds.value.indexOf(id);
  if (idx >= 0) {
    checkedMenuIds.value.splice(idx, 1);
  } else {
    checkedMenuIds.value.push(id);
  }
  if (parentChildLinked.value) {
    const node = findNode(menuOptions.value, id);
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

async function handleAssignMenu(item: TenantItem) {
  checkedTenantId.value = Number(item.id);
  checkedTenantName.value = item.name ?? "";
  menuOptions.value = await MenuAPI.getOptions(false, 2);
  checkedMenuIds.value = (await TenantAPI.getTenantMenuIds(Number(item.id))).map(String);
  menuKeywords.value = "";
  assignVisible.value = true;
}

async function handleAssignMenuSubmit() {
  loading.value = true;
  try {
    await TenantAPI.updateTenantMenus(checkedTenantId.value, checkedMenuIds.value.map(Number));
    toast.success(t("tenant.assignSuccess"));
    assignVisible.value = false;
    handleResetQuery();
  } catch (error) {
    console.error("[Tenant] 分配菜单失败:", error);
  } finally {
    loading.value = false;
  }
}

// ==================== 初始化 ====================

onMounted(async () => {
  await loadPlanOptions();
  fetchList();
});
</script>
