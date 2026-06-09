<template>
  <div class="p-5 space-y-4">
    <!-- 搜索区域 -->
    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center gap-3 flex-wrap">
          <Input
            v-model.trim="queryParams.keywords"
            :placeholder="t('tenantPlan.keywordPlaceholder')"
            class="w-60"
            @keyup.enter="handleQuery"
          />
          <Select v-model="statusStr" @update:model-value="(v: any) => (queryParams.status = v === 'all' ? undefined : Number(v))">
            <SelectTrigger class="w-32">
              <SelectValue :placeholder="t('tenantPlan.statusAll')" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{{ t("tenantPlan.statusAll") }}</SelectItem>
              <SelectItem value="1">{{ t("tenantPlan.statusEnabled") }}</SelectItem>
              <SelectItem value="0">{{ t("tenantPlan.statusDisabled") }}</SelectItem>
            </SelectContent>
          </Select>
          <Button @click="handleQuery">{{ t("tenantPlan.search") }}</Button>
          <Button variant="outline" @click="handleResetQuery">{{ t("tenantPlan.reset") }}</Button>
        </div>
      </CardContent>
    </Card>

    <!-- 表格区域 -->
    <Card>
      <CardContent class="pt-6">
        <!-- 工具栏 -->
        <div class="flex items-center gap-2 mb-4">
          <Button @click="handleCreate">{{ t("tenantPlan.add") }}</Button>
        </div>

        <!-- 表格 -->
        <div class="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-14 text-center">{{ t("tenantPlan.index") }}</TableHead>
                <TableHead>{{ t("tenantPlan.name") }}</TableHead>
                <TableHead>{{ t("tenantPlan.code") }}</TableHead>
                <TableHead class="text-center">{{ t("tenantPlan.status") }}</TableHead>
                <TableHead class="text-center w-20">{{ t("tenantPlan.sort") }}</TableHead>
                <TableHead>{{ t("tenantPlan.remark") }}</TableHead>
                <TableHead>{{ t("tenantPlan.createTime") }}</TableHead>
                <TableHead class="text-center w-56">{{ t("tenantPlan.action") }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="loading">
                <TableCell :colspan="8" class="h-24 text-center text-muted-foreground">
                  {{ t("tenantPlan.loading") }}
                </TableCell>
              </TableRow>
              <TableRow v-else-if="dataList.length === 0">
                <TableCell :colspan="8" class="h-24 text-center text-muted-foreground">
                  {{ t("tenantPlan.noData") }}
                </TableCell>
              </TableRow>
              <TableRow v-for="(item, idx) in dataList" :key="item.id" class="hover:bg-muted/50">
                <TableCell class="text-center text-muted-foreground">
                  {{ (queryParams.pageNum - 1) * queryParams.pageSize + idx + 1 }}
                </TableCell>
                <TableCell class="font-medium">{{ item.name }}</TableCell>
                <TableCell>
                  <Badge variant="outline">{{ item.code }}</Badge>
                </TableCell>
                <TableCell class="text-center">
                  <Badge :variant="item.status === 1 ? 'default' : 'secondary'">
                    {{ item.status === 1 ? t("tenantPlan.statusEnabled") : t("tenantPlan.statusDisabled") }}
                  </Badge>
                </TableCell>
                <TableCell class="text-center">{{ item.sort }}</TableCell>
                <TableCell class="text-muted-foreground text-sm">{{ item.remark || "-" }}</TableCell>
                <TableCell class="text-muted-foreground text-sm">{{ item.createTime }}</TableCell>
                <TableCell class="text-center">
                  <div class="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      class="h-7 text-xs"
                      @click="handleAssignMenu(item)"
                    >
                      {{ t("tenantPlan.assignMenu") }}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="h-7 text-xs"
                      @click="handleEdit(String(item.id))"
                    >
                      {{ t("tenantPlan.edit") }}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="h-7 text-xs text-destructive hover:text-destructive"
                      @click="handleDelete(item.id)"
                    >
                      {{ t("tenantPlan.delete") }}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <!-- 分页 -->
        <div v-if="total > 0" class="flex items-center justify-between mt-4">
          <p class="text-sm text-muted-foreground">{{ t("tenantPlan.total", { count: total }) }}</p>
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
              {{ t("tenantPlan.name") }}
              <span class="text-destructive">*</span>
            </Label>
            <Input v-model.trim="formData.name" :placeholder="t('tenantPlan.namePlaceholder')" />
          </div>
          <div class="space-y-2">
            <Label>
              {{ t("tenantPlan.code") }}
              <span class="text-destructive">*</span>
            </Label>
            <Input v-model.trim="formData.code" :placeholder="t('tenantPlan.codePlaceholder')" />
          </div>
          <div class="space-y-2">
            <Label>{{ t("tenantPlan.status") }}</Label>
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input v-model.number="formData.status" type="radio" :value="1" class="accent-primary" />
                {{ t("tenantPlan.statusEnabled") }}
              </label>
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input v-model.number="formData.status" type="radio" :value="0" class="accent-primary" />
                {{ t("tenantPlan.statusDisabled") }}
              </label>
            </div>
          </div>
          <div class="space-y-2">
            <Label>{{ t("tenantPlan.sort") }}</Label>
            <Input v-model.number="formData.sort" type="number" min="0" class="w-24" />
          </div>
          <div class="space-y-2">
            <Label>{{ t("tenantPlan.remark") }}</Label>
            <Textarea
              v-model="formData.remark"
              :placeholder="t('tenantPlan.remarkPlaceholder')"
              rows="3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="closeDialog">{{ t("tenantPlan.cancel") }}</Button>
          <Button @click="handleSubmit">{{ t("tenantPlan.confirm") }}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- 分配菜单抽屉 -->
    <Sheet :open="assignVisible" @update:open="(v) => (assignVisible = v)">
      <SheetContent class="sm:max-w-lg overflow-auto">
        <SheetHeader>
          <SheetTitle>{{ t("tenantPlan.assignMenuTitle", { name: checkedPlanName }) }}</SheetTitle>
        </SheetHeader>
        <div class="py-4 space-y-4">
          <div class="flex items-center gap-3 flex-wrap">
            <Input
              v-model="menuKeywords"
              :placeholder="t('tenantPlan.menuSearchPlaceholder')"
              class="w-40"
            />
            <Button variant="outline" size="sm" @click="toggleMenuTree">
              {{ menuExpanded ? t("tenantPlan.collapse") : t("tenantPlan.expand") }}
            </Button>
            <label class="flex items-center gap-1.5 text-sm cursor-pointer">
              <input v-model="parentChildLinked" type="checkbox" class="size-4 rounded" />
              {{ t("tenantPlan.parentChildLinked") }}
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
          <Button variant="outline" @click="assignVisible = false">{{ t("tenantPlan.cancel") }}</Button>
          <Button @click="handleAssignMenuSubmit">{{ t("tenantPlan.confirm") }}</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>

    <!-- 删除确认 -->
    <AlertDialog :open="deleteConfirmVisible" @update:open="(v) => (deleteConfirmVisible = v)">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{{ t("tenantPlan.deleteWarning") }}</AlertDialogTitle>
          <AlertDialogDescription>{{ t("tenantPlan.deleteConfirm") }}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="deleteConfirmVisible = false">
            {{ t("tenantPlan.cancel") }}
          </AlertDialogCancel>
          <AlertDialogAction @click="confirmDelete">{{ t("tenantPlan.confirm") }}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "TenantPlan", inheritAttrs: false });

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
import TenantPlanAPI from "@/api/system/tenant-plan";
import MenuAPI from "@/api/system/menu";
import type { TenantPlanItem, TenantPlanForm, TenantPlanQueryParams } from "@/api/system/tenant-plan/types";
import type { OptionItem } from "@/api/common";
import PermTreeItem from "@/views/system/role/PermTreeItem.vue";

const { t } = useI18n();

// ==================== 列表 ====================

const loading = ref(false);
const dataList = ref<TenantPlanItem[]>([]);
const total = ref(0);

const queryParams = reactive<TenantPlanQueryParams>({
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

function goPage(page: number) {
  queryParams.pageNum = page;
  fetchList();
}

async function fetchList() {
  loading.value = true;
  try {
    const result = await TenantPlanAPI.getPage(queryParams);
    dataList.value = result.list;
    total.value = result.total;
  } catch (error) {
    console.error("[TenantPlan] 获取列表失败:", error);
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
  queryParams.status = undefined;
  statusStr.value = "all";
  handleQuery();
}

// ==================== 新增/编辑弹窗 ====================

const dialogVisible = ref(false);
const dialogTitle = ref("");

const formData = reactive<TenantPlanForm>({
  name: "",
  code: "",
  status: 1,
  sort: 1,
  remark: "",
});

function resetForm() {
  formData.id = undefined;
  formData.name = "";
  formData.code = "";
  formData.status = 1;
  formData.sort = 1;
  formData.remark = "";
}

function closeDialog() {
  dialogVisible.value = false;
  resetForm();
}

function handleCreate() {
  dialogTitle.value = t("tenantPlan.addTitle");
  resetForm();
  dialogVisible.value = true;
}

async function handleEdit(id: string) {
  dialogTitle.value = t("tenantPlan.editTitle");
  const data = await TenantPlanAPI.getFormData(id);
  if (data) Object.assign(formData, data);
  dialogVisible.value = true;
}

async function handleSubmit() {
  if (!formData.name) {
    toast.error(t("tenantPlan.nameRequired"));
    return;
  }
  if (!formData.code) {
    toast.error(t("tenantPlan.codeRequired"));
    return;
  }

  loading.value = true;
  try {
    if (formData.id) {
      await TenantPlanAPI.update(String(formData.id), formData);
      toast.success(t("tenantPlan.editSuccess"));
    } else {
      await TenantPlanAPI.create(formData);
      toast.success(t("tenantPlan.addSuccess"));
    }
    closeDialog();
    handleResetQuery();
  } catch (error) {
    console.error("[TenantPlan] 提交表单失败:", error);
  } finally {
    loading.value = false;
  }
}

// ==================== 删除 ====================

const deleteConfirmVisible = ref(false);
const pendingDeleteId = ref("");

function handleDelete(id?: number) {
  if (!id) return;
  pendingDeleteId.value = String(id);
  deleteConfirmVisible.value = true;
}

async function confirmDelete() {
  loading.value = true;
  try {
    await TenantPlanAPI.deleteByIds(pendingDeleteId.value);
    toast.success(t("tenantPlan.deleteSuccess"));
    deleteConfirmVisible.value = false;
    handleResetQuery();
  } catch (error) {
    console.error("[TenantPlan] 删除失败:", error);
  } finally {
    loading.value = false;
  }
}

// ==================== 分配菜单 ====================

const assignVisible = ref(false);
const checkedPlanId = ref(0);
const checkedPlanName = ref("");
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

async function handleAssignMenu(item: TenantPlanItem) {
  checkedPlanId.value = item.id ?? 0;
  checkedPlanName.value = item.name ?? "";
  menuOptions.value = await MenuAPI.getOptions(false, 2);
  checkedMenuIds.value = (await TenantPlanAPI.getPlanMenuIds(item.id!)).map(String);
  menuKeywords.value = "";
  assignVisible.value = true;
}

async function handleAssignMenuSubmit() {
  loading.value = true;
  try {
    await TenantPlanAPI.updatePlanMenus(checkedPlanId.value, checkedMenuIds.value.map(Number));
    toast.success(t("tenantPlan.assignSuccess"));
    assignVisible.value = false;
    handleResetQuery();
  } catch (error) {
    console.error("[TenantPlan] 分配菜单失败:", error);
  } finally {
    loading.value = false;
  }
}

// ==================== 初始化 ====================

onMounted(() => {
  fetchList();
});
</script>
