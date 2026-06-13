<!-- LLM计费规则管理 -->
<template>
  <div class="p-5 space-y-4">
    <!-- 搜索区域 -->
    <Card>
      <CardContent class="pt-5 pb-4">
        <div class="flex flex-wrap items-end gap-3">
          <div class="space-y-1.5">
            <Label class="text-xs">关键字</Label>
            <Input
              v-model.trim="queryParams.keywords"
              placeholder="规则名称/模型名称"
              class="w-52 h-8 text-sm"
              @keyup.enter="handleQuery"
            />
          </div>
          <div class="space-y-1.5">
            <Label class="text-xs">厂商</Label>
            <select
              v-model="queryParams.vendorConfigId"
              class="h-8 text-sm border rounded px-2 bg-background"
            >
              <option :value="undefined">全部</option>
              <option v-for="v in vendorOptions" :key="v.id" :value="v.id">
                {{ v.vendorName }}
              </option>
            </select>
          </div>
          <div class="space-y-1.5">
            <Label class="text-xs">状态</Label>
            <select
              v-model="queryParams.status"
              class="h-8 text-sm border rounded px-2 bg-background"
            >
              <option :value="undefined">全部</option>
              <option :value="1">启用</option>
              <option :value="0">禁用</option>
            </select>
          </div>
          <div class="flex gap-2">
            <Button size="sm" @click="handleQuery">
              <SearchIcon class="size-3.5" />
              搜索
            </Button>
            <Button variant="outline" size="sm" @click="handleResetQuery">
              <RotateCcwIcon class="size-3.5" />
              重置
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 表格区域 -->
    <Card>
      <CardHeader class="pb-3">
        <div class="flex items-center justify-between">
          <div class="flex gap-2">
            <Button size="sm" @click="handleCreateClick">
              <PlusIcon class="size-3.5" />
              新增
            </Button>
            <Button
              variant="destructive"
              size="sm"
              :disabled="!hasSelection"
              @click="handleDelete()"
            >
              <TrashIcon class="size-3.5" />
              删除
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-10">
                <Checkbox :checked="isAllSelected" @update:checked="toggleAll" />
              </TableHead>
              <TableHead>规则名称</TableHead>
              <TableHead>厂商名称</TableHead>
              <TableHead>模型名称</TableHead>
              <TableHead class="w-24">输入价格</TableHead>
              <TableHead class="w-24">输出价格</TableHead>
              <TableHead class="w-16">币种</TableHead>
              <TableHead class="w-20">状态</TableHead>
              <TableHead class="w-32 text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="loading">
              <TableRow v-for="i in 5" :key="'skeleton-' + i">
                <TableCell v-for="j in 9" :key="'sk-' + j">
                  <div class="h-4 bg-muted rounded animate-pulse" />
                </TableCell>
              </TableRow>
            </template>

            <TableEmpty v-else-if="tableData.length === 0" :colspan="9">
              <div class="text-muted-foreground text-sm">暂无数据</div>
            </TableEmpty>

            <TableRow
              v-for="row in tableData"
              v-else
              :key="row.id"
              :data-state="isChecked(row.id) ? 'selected' : undefined"
              class="cursor-pointer"
            >
              <TableCell>
                <Checkbox :checked="isChecked(row.id)" @update:checked="toggleRow(row)" />
              </TableCell>
              <TableCell class="font-medium">{{ row.ruleName }}</TableCell>
              <TableCell>{{ row.vendorName || "-" }}</TableCell>
              <TableCell>
                <code class="text-xs bg-muted px-1.5 py-0.5 rounded">{{ row.modelName }}</code>
              </TableCell>
              <TableCell class="text-sm">{{ row.inputPrice }}</TableCell>
              <TableCell class="text-sm">{{ row.outputPrice }}</TableCell>
              <TableCell>
                <Badge variant="outline" class="text-[10px]">{{ row.currency }}</Badge>
              </TableCell>
              <TableCell>
                <Badge :variant="row.status === 1 ? 'default' : 'secondary'" class="text-[10px]">
                  {{ row.status === 1 ? "启用" : "禁用" }}
                </Badge>
              </TableCell>
              <TableCell class="text-right">
                <div class="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="sm" @click.stop="handleEditClick(row.id)">
                    <PencilIcon class="size-3.5 mr-1" />
                    编辑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    class="text-destructive hover:text-destructive"
                    @click.stop="handleDelete(row.id)"
                  >
                    <TrashIcon class="size-3.5 mr-1" />
                    删除
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <!-- 分页 -->
        <div v-if="total > 0" class="flex items-center justify-between mt-4">
          <p class="text-xs text-muted-foreground">共 {{ total }} 条</p>
          <Pagination
            :page="queryParams.pageNum"
            :total="total"
            :items-per-page="queryParams.pageSize"
            @update:page="onPageChange"
          >
            <PaginationContent>
              <PaginationPrevious />
              <PaginationItem v-for="item in paginationItems" :key="item" :value="item" as-child>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  :class="{
                    'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground':
                      item === queryParams.pageNum,
                  }"
                >
                  {{ item }}
                </Button>
              </PaginationItem>
              <PaginationNext />
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>

    <!-- 计费规则表单弹窗 -->
    <Dialog :open="dialogState.visible" @update:open="onDialogOpenChange">
      <DialogContent class="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{{ dialogState.title }}</DialogTitle>
        </DialogHeader>
        <div class="space-y-4 py-2">
          <div class="space-y-1.5">
            <Label>
              规则名称
              <span class="text-destructive">*</span>
            </Label>
            <Input v-model.trim="formData.ruleName" placeholder="如:GLM-4计费规则" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <Label>
                厂商配置
                <span class="text-destructive">*</span>
              </Label>
              <select
                v-model="formData.vendorConfigId"
                class="h-8 w-full text-sm border rounded px-2 bg-background"
              >
                <option :value="undefined" disabled>请选择厂商</option>
                <option v-for="v in vendorOptions" :key="v.id" :value="v.id">
                  {{ v.vendorName }}
                </option>
              </select>
            </div>
            <div class="space-y-1.5">
              <Label>
                模型名称
                <span class="text-destructive">*</span>
              </Label>
              <Input v-model.trim="formData.modelName" placeholder="如:glm-4" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <Label>
                输入价格
                <span class="text-destructive">*</span>
              </Label>
              <Input
                v-model.number="formData.inputPrice"
                type="number"
                placeholder="每百万Token价格"
              />
            </div>
            <div class="space-y-1.5">
              <Label>
                输出价格
                <span class="text-destructive">*</span>
              </Label>
              <Input
                v-model.number="formData.outputPrice"
                type="number"
                placeholder="每百万Token价格"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <Label>计价单位</Label>
              <select
                v-model="formData.priceUnit"
                class="h-8 w-full text-sm border rounded px-2 bg-background"
              >
                <option value="PER_MILLION_TOKENS">每百万Token</option>
                <option value="PER_THOUSAND_TOKENS">每千Token</option>
                <option value="PER_REQUEST">每次请求</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <Label>币种</Label>
              <select
                v-model="formData.currency"
                class="h-8 w-full text-sm border rounded px-2 bg-background"
              >
                <option value="CNY">CNY</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <Label>计费类型</Label>
              <div class="flex items-center gap-3">
                <label class="flex items-center gap-1.5 cursor-pointer text-sm">
                  <input
                    v-model="formData.billingType"
                    type="radio"
                    :value="1"
                    class="accent-primary"
                  />
                  按量
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer text-sm">
                  <input
                    v-model="formData.billingType"
                    type="radio"
                    :value="2"
                    class="accent-primary"
                  />
                  包月
                </label>
              </div>
            </div>
            <div class="space-y-1.5">
              <Label>排序</Label>
              <Input v-model.number="formData.sort" type="number" />
            </div>
          </div>
          <div class="space-y-1.5">
            <Label>状态</Label>
            <div class="flex items-center gap-3">
              <label class="flex items-center gap-1.5 cursor-pointer text-sm">
                <input v-model="formData.status" type="radio" :value="1" class="accent-primary" />
                启用
              </label>
              <label class="flex items-center gap-1.5 cursor-pointer text-sm">
                <input v-model="formData.status" type="radio" :value="0" class="accent-primary" />
                禁用
              </label>
            </div>
          </div>
          <div class="space-y-1.5">
            <Label>备注</Label>
            <Textarea v-model="formData.remark" placeholder="请输入备注" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="closeDialog">取消</Button>
          <Button @click="handleSubmit">确定</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- 删除确认 -->
    <AlertDialog :open="deleteState.visible" @update:open="deleteState.visible = $event">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确认删除</AlertDialogTitle>
          <AlertDialogDescription>
            确认删除已选中的计费规则？此操作不可撤销。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction @click="confirmDelete">确定</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { toast } from "vue-sonner";
import { SearchIcon, RotateCcwIcon, PlusIcon, TrashIcon, PencilIcon } from "@lucide/vue";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableEmpty,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import BillingRuleAPI from "@/api/system/llm/billing-rule";
import type {
  BillingRuleQueryParams,
  BillingRuleItem,
  BillingRuleForm,
} from "@/api/system/llm/billing-rule";
import VendorConfigAPI from "@/api/system/llm/vendor-config";
import type { VendorConfigItem } from "@/api/system/llm/vendor-config";

defineOptions({ name: "LlmBillingRule", inheritAttrs: false });

// ==================== 厂商选项 ====================

interface VendorOption {
  id: string;
  vendorName: string;
}

const vendorOptions = ref<VendorOption[]>([]);

async function fetchVendorOptions() {
  try {
    const data = await VendorConfigAPI.getPage({ pageNum: 1, pageSize: 200, status: 1 });
    vendorOptions.value = (data.list ?? []).map((v: VendorConfigItem) => ({
      id: v.id,
      vendorName: v.vendorName,
    }));
  } catch {
    vendorOptions.value = [];
  }
}

// ==================== 查询 ====================

const queryParams = reactive<BillingRuleQueryParams>({ pageNum: 1, pageSize: 10 });
const tableData = ref<BillingRuleItem[]>([]);
const total = ref(0);
const loading = ref(false);

async function fetchData() {
  loading.value = true;
  try {
    const data = await BillingRuleAPI.getPage(queryParams);
    tableData.value = data.list ?? [];
    total.value = data.total ?? 0;
  } finally {
    loading.value = false;
  }
}

function handleQuery() {
  queryParams.pageNum = 1;
  fetchData();
}

function handleResetQuery() {
  queryParams.keywords = undefined;
  queryParams.vendorConfigId = undefined;
  queryParams.status = undefined;
  handleQuery();
}

// ==================== 选择 ====================

const checkedIds = ref<Set<string>>(new Set());
const hasSelection = computed(() => checkedIds.value.size > 0);

function isChecked(id: string) {
  return checkedIds.value.has(id);
}

function toggleRow(row: BillingRuleItem) {
  const s = new Set(checkedIds.value);
  if (s.has(row.id)) {
    s.delete(row.id);
  } else {
    s.add(row.id);
  }
  checkedIds.value = s;
}

const isAllSelected = computed(
  () => tableData.value.length > 0 && tableData.value.every((r) => checkedIds.value.has(r.id))
);

function toggleAll(val: boolean | "indeterminate") {
  const s = new Set<string>();
  if (val === true) tableData.value.forEach((r) => s.add(r.id));
  checkedIds.value = s;
}

// ==================== 表单 ====================

const dialogState = reactive({ visible: false, title: "" });
const initialFormData: BillingRuleForm = {
  billingType: 1,
  status: 1,
  currency: "CNY",
  priceUnit: "PER_MILLION_TOKENS",
};
const formData = reactive<BillingRuleForm>({ ...initialFormData });

function handleCreateClick() {
  Object.assign(formData, { ...initialFormData });
  dialogState.title = "新增计费规则";
  dialogState.visible = true;
}

async function handleEditClick(id: string) {
  Object.assign(formData, { ...initialFormData });
  dialogState.title = "修改计费规则";
  const data = await BillingRuleAPI.getFormData(id);
  Object.assign(formData, data);
  dialogState.visible = true;
}

function onDialogOpenChange(val: boolean) {
  if (!val) closeDialog();
}

function closeDialog() {
  dialogState.visible = false;
}

const handleSubmit = async () => {
  if (!formData.ruleName) {
    toast.error("请输入规则名称");
    return;
  }
  if (!formData.vendorConfigId) {
    toast.error("请选择厂商配置");
    return;
  }
  if (!formData.modelName) {
    toast.error("请输入模型名称");
    return;
  }
  if (formData.inputPrice == null) {
    toast.error("请输入输入价格");
    return;
  }
  if (formData.outputPrice == null) {
    toast.error("请输入输出价格");
    return;
  }

  loading.value = true;
  try {
    if (formData.id) {
      await BillingRuleAPI.update(formData.id, formData);
      toast.success("修改成功");
    } else {
      await BillingRuleAPI.create(formData);
      toast.success("新增成功");
    }
    closeDialog();
    handleQuery();
  } finally {
    loading.value = false;
  }
};

// ==================== 删除 ====================

const deleteState = reactive({ visible: false, ids: "" });

function handleDelete(id?: string) {
  const ids = id ?? [...checkedIds.value].join(",");
  if (!ids) {
    toast.warning("请勾选删除项");
    return;
  }
  deleteState.ids = ids;
  deleteState.visible = true;
}

async function confirmDelete() {
  await BillingRuleAPI.deleteByIds(deleteState.ids);
  toast.success("删除成功");
  deleteState.visible = false;
  checkedIds.value = new Set();
  handleQuery();
}

// ==================== 分页 ====================

const totalPages = computed(() => Math.ceil(total.value / queryParams.pageSize));

const paginationItems = computed(() => {
  const pages: number[] = [];
  const cur = queryParams.pageNum;
  const tp = totalPages.value;
  if (tp <= 7) {
    for (let i = 1; i <= tp; i++) pages.push(i);
    return pages;
  }
  pages.push(1);
  if (cur > 3) pages.push(-1);
  for (let i = Math.max(2, cur - 1); i <= Math.min(tp - 1, cur + 1); i++) pages.push(i);
  if (cur < tp - 2) pages.push(-2);
  pages.push(tp);
  return pages;
});

function onPageChange(page: number) {
  if (page < 1 || page > totalPages.value) return;
  queryParams.pageNum = page;
  fetchData();
}

// ==================== 初始化 ====================

onMounted(() => {
  fetchVendorOptions();
  handleQuery();
});
</script>
