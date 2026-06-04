<!-- 通知公告管理 -->
<template>
  <div class="p-5 space-y-4">
    <!-- 搜索区域 -->
    <Card>
      <CardContent class="pt-5 pb-4">
        <div class="flex flex-wrap items-end gap-3">
          <div class="space-y-1.5">
            <Label class="text-xs">标题</Label>
            <Input
              v-model="queryParams.title"
              placeholder="通知标题"
              class="w-52 h-8 text-sm"
              @keyup.enter="handleQuery"
            />
          </div>
          <div class="space-y-1.5">
            <Label class="text-xs">发布状态</Label>
            <Select v-model="queryParams.publishStatus" @update:model-value="handleQuery">
              <SelectTrigger class="w-28 h-8 text-sm">
                <SelectValue placeholder="全部" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem :value="0">未发布</SelectItem>
                <SelectItem :value="1">已发布</SelectItem>
                <SelectItem :value="-1">已撤回</SelectItem>
              </SelectContent>
            </Select>
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
              新增通知
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
              <TableHead class="w-12">序号</TableHead>
              <TableHead>通知标题</TableHead>
              <TableHead class="w-24">通知类型</TableHead>
              <TableHead class="w-24">发布人</TableHead>
              <TableHead class="w-24">通知等级</TableHead>
              <TableHead class="w-24">目标类型</TableHead>
              <TableHead class="w-24">发布状态</TableHead>
              <TableHead class="w-52">时间</TableHead>
              <TableHead class="w-52 text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="loading">
              <TableRow v-for="i in 5" :key="'skeleton-' + i">
                <TableCell v-for="j in 10" :key="'sk-' + j">
                  <div class="h-4 bg-muted rounded animate-pulse" />
                </TableCell>
              </TableRow>
            </template>

            <TableEmpty v-else-if="tableData.length === 0" :colspan="10">
              <div class="text-muted-foreground text-sm">暂无数据</div>
            </TableEmpty>

            <TableRow
              v-else
              v-for="(row, index) in tableData"
              :key="row.id"
              :data-state="isChecked(row.id) ? 'selected' : undefined"
              class="cursor-pointer"
            >
              <TableCell>
                <Checkbox :checked="isChecked(row.id)" @update:checked="toggleRow(row)" />
              </TableCell>
              <TableCell class="text-muted-foreground">
                {{ (queryParams.pageNum - 1) * queryParams.pageSize + index + 1 }}
              </TableCell>
              <TableCell class="font-medium">{{ row.title }}</TableCell>
              <TableCell>
                <Badge :variant="getTypeBadgeVariant(row.type)" class="text-[10px]">
                  {{ getTypeLabel(row.type) }}
                </Badge>
              </TableCell>
              <TableCell class="text-sm">{{ row.publisherName || "-" }}</TableCell>
              <TableCell>
                <Badge :variant="getLevelBadgeVariant(row.level)" class="text-[10px]">
                  {{ getLevelLabel(row.level) }}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge v-if="row.targetType === 1" variant="warning" class="text-[10px]">全体</Badge>
                <Badge v-else-if="row.targetType === 2" variant="success" class="text-[10px]">指定</Badge>
                <span v-else class="text-muted-foreground">-</span>
              </TableCell>
              <TableCell>
                <Badge :variant="getStatusBadgeVariant(row.publishStatus)" class="text-[10px]">
                  {{ getStatusLabel(row.publishStatus) }}
                </Badge>
              </TableCell>
              <TableCell>
                <div class="text-xs space-y-0.5">
                  <div>
                    <span class="text-muted-foreground">创建：</span>{{ row.createTime || "-" }}
                  </div>
                  <div v-if="row.publishStatus === 1">
                    <span class="text-muted-foreground">发布：</span>{{ row.publishTime || "-" }}
                  </div>
                  <div v-else-if="row.publishStatus === -1">
                    <span class="text-muted-foreground">撤回：</span>{{ row.revokeTime || "-" }}
                  </div>
                </div>
              </TableCell>
              <TableCell class="text-right">
                <div class="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="sm" @click.stop="openDetailDialog(row.id)">
                    <EyeIcon class="size-3.5 mr-1" />
                    查看
                  </Button>
                  <Button
                    v-if="row.publishStatus !== 1"
                    variant="ghost"
                    size="sm"
                    @click.stop="handlePublish(row.id)"
                  >
                    <SendIcon class="size-3.5 mr-1" />
                    发布
                  </Button>
                  <Button
                    v-if="row.publishStatus === 1"
                    variant="ghost"
                    size="sm"
                    @click.stop="handleRevoke(row.id)"
                  >
                    <Undo2Icon class="size-3.5 mr-1" />
                    撤回
                  </Button>
                  <Button
                    v-if="row.publishStatus !== 1"
                    variant="ghost"
                    size="sm"
                    @click.stop="handleEditClick(row.id)"
                  >
                    <PencilIcon class="size-3.5 mr-1" />
                    编辑
                  </Button>
                  <Button
                    v-if="row.publishStatus !== 1"
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
              <PaginationItem
                v-for="item in paginationItems"
                :key="item"
                :value="item"
                as-child
              >
                <Button
                  variant="ghost"
                  size="icon-xs"
                  :class="{ 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground': item === queryParams.pageNum }"
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

    <!-- 新增/编辑弹窗 -->
    <Dialog :open="dialogState.visible" @update:open="onDialogOpenChange">
      <DialogContent class="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{{ dialogState.title }}</DialogTitle>
        </DialogHeader>
        <div class="space-y-4 py-2">
          <div class="space-y-1.5">
            <Label>通知标题 <span class="text-destructive">*</span></Label>
            <Input v-model="formData.title" placeholder="请输入通知标题" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <Label>通知类型 <span class="text-destructive">*</span></Label>
              <Select v-model="formData.type">
                <SelectTrigger class="h-8 text-sm">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="opt in noticeTypeOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="space-y-1.5">
              <Label>通知等级 <span class="text-destructive">*</span></Label>
              <Select v-model="formData.level">
                <SelectTrigger class="h-8 text-sm">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="opt in noticeLevelOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div class="space-y-1.5">
            <Label>目标类型</Label>
            <div class="flex items-center gap-3">
              <label class="flex items-center gap-1.5 cursor-pointer text-sm">
                <input type="radio" :value="1" v-model="formData.targetType" class="accent-primary" />
                全体
              </label>
              <label class="flex items-center gap-1.5 cursor-pointer text-sm">
                <input type="radio" :value="2" v-model="formData.targetType" class="accent-primary" />
                指定用户
              </label>
            </div>
          </div>
          <div v-if="formData.targetType === 2" class="space-y-1.5">
            <Label>指定用户</Label>
            <Select v-model="formData.targetUsers" multiple>
              <SelectTrigger class="text-sm min-h-8">
                <SelectValue placeholder="请选择用户" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="user in userOptions"
                  :key="user.value"
                  :value="Number(user.value)"
                >
                  {{ user.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="space-y-1.5">
            <Label>通知内容 <span class="text-destructive">*</span></Label>
            <WangEditor v-model="formData.content" height="350px" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="closeDialog">取消</Button>
          <Button @click="handleSubmit">确定</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- 详情弹窗 -->
    <Dialog :open="detailDialog.visible" @update:open="detailDialog.visible = $event">
      <DialogContent class="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>通知公告详情</DialogTitle>
        </DialogHeader>
        <div class="space-y-3 py-2">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-xs text-muted-foreground">标题</span>
              <p class="text-sm font-medium mt-0.5">{{ currentNotice.title || "-" }}</p>
            </div>
            <div>
              <span class="text-xs text-muted-foreground">发布状态</span>
              <div class="mt-0.5">
                <Badge :variant="getStatusBadgeVariant(currentNotice.publishStatus)" class="text-[10px]">
                  {{ getStatusLabel(currentNotice.publishStatus) }}
                </Badge>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-xs text-muted-foreground">发布人</span>
              <p class="text-sm mt-0.5">{{ currentNotice.publisherName || "-" }}</p>
            </div>
            <div>
              <span class="text-xs text-muted-foreground">发布时间</span>
              <p class="text-sm mt-0.5">{{ currentNotice.publishTime || "-" }}</p>
            </div>
          </div>
          <Separator />
          <div>
            <span class="text-xs text-muted-foreground">公告内容</span>
            <div class="mt-2 text-sm prose prose-sm max-w-none" v-html="currentNotice.content" />
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <!-- 删除确认 -->
    <AlertDialog :open="deleteState.visible" @update:open="deleteState.visible = $event">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确认删除</AlertDialogTitle>
          <AlertDialogDescription>确认删除已选中的数据项？此操作不可撤销。</AlertDialogDescription>
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
import {
  SearchIcon,
  RotateCcwIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
  SendIcon,
  Undo2Icon,
} from "@lucide/vue";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableEmpty,
} from "@/components/ui/table";
import {
  Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

import NoticeAPI from "@/api/system/notice";
import type { NoticeQueryParams, NoticeItem, NoticeForm, NoticeDetail } from "@/api/system/notice";
import UserAPI from "@/api/system/user";
import type { OptionItem } from "@/api/common";

defineOptions({ name: "Notice", inheritAttrs: false });

// ==================== 常量映射 ====================

/** 通知类型选项 */
const noticeTypeOptions = [
  { value: 1, label: "通知" },
  { value: 2, label: "公告" },
];

/** 通知等级选项 */
const noticeLevelOptions = [
  { value: "L", label: "低" },
  { value: "M", label: "中" },
  { value: "H", label: "高" },
];

function getTypeLabel(type: number): string {
  return noticeTypeOptions.find((o) => o.value === type)?.label ?? "-";
}

function getTypeBadgeVariant(type: number): "default" | "secondary" | "outline" {
  return type === 2 ? "default" : "secondary";
}

function getLevelLabel(level: string): string {
  return noticeLevelOptions.find((o) => o.value === level)?.label ?? "-";
}

function getLevelBadgeVariant(level: string): "default" | "warning" | "destructive" | "secondary" {
  const map: Record<string, "default" | "warning" | "destructive" | "secondary"> = {
    H: "destructive",
    M: "warning",
    L: "secondary",
  };
  return map[level] ?? "secondary";
}

function getStatusLabel(status: number): string {
  const map: Record<number, string> = { 0: "未发布", 1: "已发布", "-1": "已撤回" };
  return map[status] ?? "-";
}

function getStatusBadgeVariant(status: number): "default" | "secondary" | "warning" | "success" {
  const map: Record<number, "default" | "secondary" | "warning" | "success"> = {
    0: "secondary",
    1: "success",
    "-1": "warning",
  };
  return map[status] ?? "secondary";
}

// ==================== 查询 ====================

const queryParams = reactive<NoticeQueryParams>({ pageNum: 1, pageSize: 10 });
const tableData = ref<NoticeItem[]>([]);
const total = ref(0);
const loading = ref(false);

async function fetchData() {
  loading.value = true;
  try {
    const data = await NoticeAPI.getPage(queryParams);
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
  queryParams.title = undefined;
  queryParams.publishStatus = undefined;
  handleQuery();
}

// ==================== 选择 ====================

const checkedIds = ref<Set<string>>(new Set());
const hasSelection = computed(() => checkedIds.value.size > 0);

function isChecked(id: string) {
  return checkedIds.value.has(id);
}

function toggleRow(row: NoticeItem) {
  const s = new Set(checkedIds.value);
  s.has(row.id) ? s.delete(row.id) : s.add(row.id);
  checkedIds.value = s;
}

const isAllSelected = computed(() =>
  tableData.value.length > 0 && tableData.value.every((r) => checkedIds.value.has(r.id))
);

function toggleAll(val: boolean | "indeterminate") {
  const s = new Set<string>();
  if (val === true) tableData.value.forEach((r) => s.add(r.id));
  checkedIds.value = s;
}

// ==================== 表单弹窗 ====================

const dialogState = reactive({ visible: false, title: "" });
const initialFormData: NoticeForm = { level: "L", targetType: 1 };
const formData = reactive<NoticeForm>({ ...initialFormData });
const userOptions = ref<OptionItem[]>([]);

function handleCreateClick() {
  Object.assign(formData, { ...initialFormData, targetUsers: [] });
  dialogState.title = "新增通知";
  dialogState.visible = true;
  loadUserOptions();
}

async function handleEditClick(id: string) {
  Object.assign(formData, { ...initialFormData, targetUsers: [] });
  dialogState.title = "修改通知";
  const data = await NoticeAPI.getFormData(id);
  Object.assign(formData, {
    ...data,
    targetUsers: normalizeTargetUsers(
      (data as NoticeForm & { targetUserIds?: unknown }).targetUserIds
    ),
  });
  dialogState.visible = true;
  loadUserOptions();
}

function loadUserOptions() {
  UserAPI.getOptions().then((data) => {
    userOptions.value = data ?? [];
  });
}

function onDialogOpenChange(val: boolean) {
  if (!val) closeDialog();
}

function closeDialog() {
  dialogState.visible = false;
}

const handleSubmit = async () => {
  if (!formData.title?.trim()) { toast.error("请输入通知标题"); return; }
  if (formData.type === undefined || formData.type === null) { toast.error("请选择通知类型"); return; }
  if (!formData.content?.trim()) { toast.error("请输入通知内容"); return; }

  loading.value = true;
  try {
    const payload: NoticeForm & { targetUserIds: number[] } = {
      ...formData,
      targetUserIds: formData.targetType === 2 ? (formData.targetUsers ?? []) : [],
    };

    if (formData.id) {
      await NoticeAPI.update(formData.id, payload);
      toast.success("修改成功");
    } else {
      await NoticeAPI.create(payload);
      toast.success("新增成功");
    }
    closeDialog();
    handleQuery();
  } finally {
    loading.value = false;
  }
};

/** 标准化目标用户数据 */
function normalizeTargetUsers(value?: unknown): number[] {
  if (!value) return [];
  const toNumberArray = (arr: unknown[]): number[] =>
    arr.map((v) => Number(v)).filter((v) => Number.isFinite(v));

  if (Array.isArray(value)) return toNumberArray(value);
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return toNumberArray(parsed);
    } catch { /* fall through */ }
    return value.split(",").filter(Boolean).map((v) => Number(v)).filter((v) => Number.isFinite(v));
  }
  return [];
}

// ==================== 发布/撤回 ====================

async function handlePublish(id: string) {
  await NoticeAPI.publish(id);
  toast.success("发布成功");
  fetchData();
}

async function handleRevoke(id: string) {
  await NoticeAPI.revoke(id);
  toast.success("撤回成功");
  fetchData();
}

// ==================== 详情弹窗 ====================

const detailDialog = reactive({ visible: false });
const currentNotice = ref<NoticeDetail>({});

async function openDetailDialog(id: string) {
  currentNotice.value = await NoticeAPI.getDetail(id);
  detailDialog.visible = true;
}

// ==================== 删除 ====================

const deleteState = reactive({ visible: false, ids: "" });

function handleDelete(id?: string) {
  const ids = id ?? [...checkedIds.value].join(",");
  if (!ids) { toast.warning("请勾选删除项"); return; }
  deleteState.ids = ids;
  deleteState.visible = true;
}

async function confirmDelete() {
  await NoticeAPI.deleteByIds(deleteState.ids);
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
  if (tp <= 7) { for (let i = 1; i <= tp; i++) pages.push(i); return pages; }
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

onMounted(() => handleQuery());
</script>
