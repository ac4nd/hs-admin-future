<!-- 用户管理 -->
<template>
  <div class="flex gap-5 h-full p-5">
    <!-- 部门树 -->
    <aside class="hidden lg:block w-60 shrink-0">
      <UserDeptTree v-model="queryParams.deptId" @node-click="handleQuery" />
    </aside>

    <!-- 用户列表 -->
    <main class="flex-1 min-w-0 space-y-4">
      <!-- 搜索区域 -->
      <Card>
        <CardContent class="pt-5 pb-4">
          <div class="flex flex-wrap items-end gap-3">
            <div class="space-y-1.5">
              <Label class="text-xs">关键字</Label>
              <Input
                v-model.trim="queryParams.keywords"
                placeholder="用户名/昵称/手机号"
                class="w-52 h-8 text-sm"
                @keyup.enter="handleQuery"
              />
            </div>

            <div class="space-y-1.5">
              <Label class="text-xs">状态</Label>
              <Select v-model="queryParams.status" @update:model-value="handleQuery">
                <SelectTrigger class="w-28 h-8 text-sm">
                  <SelectValue placeholder="全部" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem :value="1">正常</SelectItem>
                  <SelectItem :value="0">禁用</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="space-y-1.5">
              <Label class="text-xs">创建时间</Label>
              <Popover>
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    class="w-56 h-8 text-sm justify-start font-normal text-muted-foreground"
                  >
                    <CalendarIcon class="mr-1.5 size-3.5" />
                    {{ dateRangeLabel || "选择日期范围" }}
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0" align="start">
                  <CalendarRange v-model="dateRange" @update:model-value="onDateChange" />
                </PopoverContent>
              </Popover>
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
            <div class="flex gap-2">
              <Button variant="outline" size="sm" @click="exportUsers">
                <DownloadIcon class="size-3.5" />
                导出
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div class="relative">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-10">
                    <Checkbox :checked="isAllSelected" @update:checked="toggleAll" />
                  </TableHead>
                  <TableHead>用户名</TableHead>
                  <TableHead>昵称</TableHead>
                  <TableHead class="w-20">性别</TableHead>
                  <TableHead>部门</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead>手机号码</TableHead>
                  <TableHead>邮箱</TableHead>
                  <TableHead class="w-16">状态</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead class="w-32 text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <!-- 加载骨架屏 -->
                <template v-if="loading">
                  <TableRow v-for="i in 5" :key="'skeleton-' + i">
                    <TableCell v-for="j in 11" :key="'sk-' + j">
                      <div class="h-4 bg-muted rounded animate-pulse" />
                    </TableCell>
                  </TableRow>
                </template>

                <!-- 空状态 -->
                <TableEmpty v-else-if="userList.length === 0" :colspan="11">
                  <div class="text-muted-foreground text-sm">暂无数据</div>
                </TableEmpty>

                <!-- 数据行 -->
                <TableRow
                  v-for="row in userList"
                  v-else
                  :key="row.id"
                  :data-state="isChecked(row.id) ? 'selected' : undefined"
                >
                  <TableCell>
                    <Checkbox :checked="isChecked(row.id)" @update:checked="toggleRow(row)" />
                  </TableCell>
                  <TableCell class="font-medium">{{ row.username }}</TableCell>
                  <TableCell>{{ row.nickname }}</TableCell>
                  <TableCell>{{ genderLabel(row.gender) }}</TableCell>
                  <TableCell>{{ row.deptName || "-" }}</TableCell>
                  <TableCell>
                    <span class="text-xs text-muted-foreground">{{ row.roleNames || "-" }}</span>
                  </TableCell>
                  <TableCell>{{ row.mobile || "-" }}</TableCell>
                  <TableCell>{{ row.email || "-" }}</TableCell>
                  <TableCell>
                    <Badge
                      :variant="row.status === CommonStatus.ENABLED ? 'default' : 'secondary'"
                      class="text-[10px]"
                    >
                      {{ row.status === CommonStatus.ENABLED ? "正常" : "禁用" }}
                    </Badge>
                  </TableCell>
                  <TableCell class="text-xs text-muted-foreground">{{ row.createTime }}</TableCell>
                  <TableCell class="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger as-child>
                        <Button variant="ghost" size="icon-xs">
                          <MoreHorizontalIcon class="size-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem @click="handleResetPassword(row)">
                          <KeyRoundIcon class="size-3.5 mr-2" />
                          重置密码
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="handleEditClick(row.id)">
                          <PencilIcon class="size-3.5 mr-2" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          class="text-destructive focus:text-destructive"
                          @click="handleDelete(row.id)"
                        >
                          <TrashIcon class="size-3.5 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

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
    </main>

    <!-- 用户表单（Sheet 抽屉） -->
    <Sheet :open="dialogState.visible" @update:open="onSheetOpenChange">
      <SheetContent side="right" class="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{{ dialogState.title }}</SheetTitle>
        </SheetHeader>

        <div class="px-4 py-2 space-y-4">
          <div class="space-y-1.5">
            <Label>
              用户名
              <span class="text-destructive">*</span>
            </Label>
            <Input
              v-model.trim="formData.username"
              :readonly="!!formData.id"
              placeholder="请输入用户名"
            />
          </div>

          <div class="space-y-1.5">
            <Label>
              用户昵称
              <span class="text-destructive">*</span>
            </Label>
            <Input v-model.trim="formData.nickname" placeholder="请输入用户昵称" />
          </div>

          <div class="space-y-1.5">
            <Label>
              所属部门
              <span class="text-destructive">*</span>
            </Label>
            <Select v-model="formData.deptId">
              <SelectTrigger>
                <SelectValue placeholder="请选择所属部门" />
              </SelectTrigger>
              <SelectContent>
                <DeptSelectOption v-for="opt in deptOptions" :key="opt.value" :option="opt" />
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-1.5">
            <Label>性别</Label>
            <Select v-model="formData.gender">
              <SelectTrigger>
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem :value="1">男</SelectItem>
                <SelectItem :value="2">女</SelectItem>
                <SelectItem :value="0">未知</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-1.5">
            <Label>
              角色
              <span class="text-destructive">*</span>
            </Label>
            <Popover>
              <PopoverTrigger as-child>
                <Button variant="outline" class="w-full justify-start font-normal h-8 text-sm">
                  <template v-if="formData.roleIds?.length">
                    {{ selectedRoleLabels }}
                  </template>
                  <span v-else class="text-muted-foreground">请选择角色</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-full p-2" align="start">
                <div class="space-y-1">
                  <label
                    v-for="role in roleOptions"
                    :key="role.value"
                    class="flex items-center gap-2 px-2 py-1 rounded hover:bg-muted cursor-pointer text-sm"
                  >
                    <Checkbox
                      :checked="formData.roleIds?.includes(role.value as number)"
                      @update:checked="toggleRole(role.value as number)"
                    />
                    {{ role.label }}
                  </label>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div class="space-y-1.5">
            <Label>手机号码</Label>
            <Input v-model.trim="formData.mobile" placeholder="请输入手机号码" maxlength="11" />
          </div>

          <div class="space-y-1.5">
            <Label>邮箱</Label>
            <Input v-model.trim="formData.email" placeholder="请输入邮箱" maxlength="50" />
          </div>

          <div class="flex items-center justify-between">
            <Label>状态</Label>
            <div class="flex items-center gap-2">
              <span class="text-xs text-muted-foreground">
                {{ formData.status === CommonStatus.ENABLED ? "正常" : "禁用" }}
              </span>
              <Switch
                :checked="formData.status === CommonStatus.ENABLED"
                @update:checked="
                  (v: boolean) =>
                    (formData.status = v ? CommonStatus.ENABLED : CommonStatus.DISABLED)
                "
              />
            </div>
          </div>
        </div>

        <SheetFooter class="flex-row gap-2 justify-end px-4">
          <Button @click="handleSubmit">确定</Button>
          <Button variant="outline" @click="closeDialog">取消</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>

    <!-- 重置密码弹窗 -->
    <Dialog :open="resetPasswordState.visible" @update:open="resetPasswordState.visible = $event">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>重置密码</DialogTitle>
          <DialogDescription>
            请输入用户【{{ resetPasswordState.username }}】的新密码
          </DialogDescription>
        </DialogHeader>
        <div class="py-2">
          <Input
            v-model="resetPasswordState.password"
            type="password"
            placeholder="密码至少6位字符"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" @click="resetPasswordState.visible = false">取消</Button>
          <Button :disabled="resetPasswordState.password.length < 6" @click="confirmResetPassword">
            确定
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- 删除确认弹窗 -->
    <AlertDialog :open="deleteState.visible" @update:open="deleteState.visible = $event">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确认删除</AlertDialogTitle>
          <AlertDialogDescription>确认删除选中的用户吗？此操作不可撤销。</AlertDialogDescription>
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
import { useDebounceFn } from "@vueuse/core";
import { toast } from "vue-sonner";
import {
  SearchIcon,
  RotateCcwIcon,
  PlusIcon,
  TrashIcon,
  DownloadIcon,
  MoreHorizontalIcon,
  PencilIcon,
  KeyRoundIcon,
  CalendarIcon,
} from "@lucide/vue";

// shadcn/ui 组件
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// 业务依赖
import UserAPI from "@/api/system/user";
import RoleAPI from "@/api/system/role";
import DeptAPI from "@/api/system/dept";
import type { UserForm, UserQueryParams, UserItem } from "@/api/system/user";
import type { OptionItem } from "@/api/common";
import { DialogMode, CommonStatus } from "@/enums/common";
import { useTableSelection } from "@/composables/useTableSelection";
import { useUserStore } from "@/stores/user";

import UserDeptTree from "./components/UserDeptTree.vue";
import DeptSelectOption from "./components/DeptSelectOption.vue";
import CalendarRange from "./components/CalendarRange.vue";

defineOptions({ name: "User", inheritAttrs: false });

const userStore = useUserStore();

// ==================== 查询 ====================

const queryParams = reactive<UserQueryParams>({
  pageNum: 1,
  pageSize: 10,
});

const dateRange = ref<{ start: Date; end: Date }>();

const dateRangeLabel = computed(() => {
  if (!dateRange.value) return "";
  const s = dateRange.value.start;
  const e = dateRange.value.end;
  if (!s || !e) return "";
  return `${fmt(s)} ~ ${fmt(e)}`;
});

function fmt(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function onDateChange(val: { start: Date; end: Date } | undefined) {
  dateRange.value = val;
  if (val?.start && val?.end) {
    queryParams.createTime = [fmt(val.start), fmt(val.end)];
  } else {
    queryParams.createTime = undefined;
  }
  handleQuery();
}

// ==================== 列表 ====================

const userList = ref<UserItem[]>([]);
const total = ref(0);
const loading = ref(false);

async function fetchList() {
  loading.value = true;
  try {
    const data = await UserAPI.getPage(queryParams);
    userList.value = data.list;
    total.value = data.total ?? 0;
  } finally {
    loading.value = false;
  }
}

function handleQuery() {
  queryParams.pageNum = 1;
  fetchList();
}

function handleResetQuery() {
  queryParams.keywords = undefined;
  queryParams.status = undefined;
  queryParams.deptId = undefined;
  queryParams.createTime = undefined;
  dateRange.value = undefined;
  handleQuery();
}

// ==================== 选择 ====================

const { selectedIds, hasSelection } = useTableSelection<UserItem>();

// 手动管理 checked 状态（shadcn Table 没有内置 selection）
const checkedIds = ref<Set<string>>(new Set());

function isChecked(id: string) {
  return checkedIds.value.has(id);
}

function toggleRow(row: UserItem) {
  const s = new Set(checkedIds.value);
  if (s.has(row.id)) {
    s.delete(row.id);
  } else {
    s.add(row.id);
  }
  checkedIds.value = s;
  selectedIds.value = [...s];
}

const isAllSelected = computed(() => {
  if (userList.value.length === 0) return false;
  return userList.value.every((row) => checkedIds.value.has(row.id));
});

function toggleAll(val: boolean | "indeterminate") {
  const s = new Set<string>();
  if (val === true) {
    userList.value.forEach((row) => s.add(row.id));
  }
  checkedIds.value = s;
  selectedIds.value = [...s];
}

// ==================== 表单弹窗 ====================

const dialogState = reactive({
  visible: false,
  title: "新增用户",
  mode: DialogMode.CREATE,
});

const initialFormData: UserForm = {
  status: CommonStatus.ENABLED,
};

const formData = reactive<UserForm>({ ...initialFormData });
const deptOptions = ref<OptionItem[]>([]);
const roleOptions = ref<OptionItem[]>([]);

async function loadFormOptions() {
  [roleOptions.value, deptOptions.value] = await Promise.all([
    RoleAPI.getOptions(),
    DeptAPI.getOptions(),
  ]);
}

const selectedRoleLabels = computed(() => {
  if (!formData.roleIds?.length) return "";
  return formData.roleIds
    .map((id) => roleOptions.value.find((r) => r.value === id)?.label)
    .filter(Boolean)
    .join("、");
});

function toggleRole(roleId: number) {
  if (!formData.roleIds) formData.roleIds = [];
  const idx = formData.roleIds.indexOf(roleId);
  if (idx >= 0) {
    formData.roleIds.splice(idx, 1);
  } else {
    formData.roleIds.push(roleId);
  }
}

async function handleCreateClick() {
  dialogState.title = "新增用户";
  dialogState.mode = DialogMode.CREATE;
  Object.assign(formData, { ...initialFormData, roleIds: [] });
  await loadFormOptions();
  dialogState.visible = true;
}

async function handleEditClick(id: string) {
  dialogState.title = "修改用户";
  dialogState.mode = DialogMode.EDIT;
  await loadFormOptions();
  const data = await UserAPI.getFormData(id);
  Object.assign(formData, data);
  dialogState.visible = true;
}

function onSheetOpenChange(val: boolean) {
  if (!val) closeDialog();
}

function closeDialog() {
  dialogState.visible = false;
  Object.assign(formData, initialFormData);
}

const handleSubmit = useDebounceFn(async () => {
  if (!formData.username) {
    toast.error("请输入用户名");
    return;
  }
  if (!formData.nickname) {
    toast.error("请输入用户昵称");
    return;
  }
  if (!formData.deptId) {
    toast.error("请选择所属部门");
    return;
  }
  if (!formData.roleIds?.length) {
    toast.error("请选择角色");
    return;
  }

  loading.value = true;
  try {
    if (formData.id) {
      await UserAPI.update(formData.id, formData);
      toast.success("修改用户成功");
    } else {
      await UserAPI.create(formData);
      toast.success("新增用户成功");
    }
    closeDialog();
    handleQuery();
  } finally {
    loading.value = false;
  }
}, 300);

// ==================== 重置密码 ====================

const resetPasswordState = reactive({
  visible: false,
  userId: "",
  username: "",
  password: "",
});

function handleResetPassword(row: UserItem) {
  resetPasswordState.userId = row.id;
  resetPasswordState.username = row.username ?? "";
  resetPasswordState.password = "";
  resetPasswordState.visible = true;
}

async function confirmResetPassword() {
  if (resetPasswordState.password.length < 6) {
    toast.error("密码至少需要6位字符");
    return;
  }
  await UserAPI.resetPassword(resetPasswordState.userId, resetPasswordState.password);
  toast.success("密码重置成功");
  resetPasswordState.visible = false;
}

// ==================== 删除 ====================

const deleteState = reactive({
  visible: false,
  ids: "",
});

function handleDelete(id?: string) {
  const userIds = id ?? selectedIds.value.join(",");
  if (!userIds) {
    toast.warning("请勾选删除项");
    return;
  }

  // 安全检查：防止删除当前登录用户
  const currentUserId = userStore.userInfo?.userId;
  if (currentUserId) {
    const isCurrent = id
      ? id === currentUserId
      : selectedIds.value.some((sid) => String(sid) === currentUserId);
    if (isCurrent) {
      toast.error("不能删除当前登录用户");
      return;
    }
  }

  deleteState.ids = userIds;
  deleteState.visible = true;
}

async function confirmDelete() {
  await UserAPI.deleteByIds(deleteState.ids);
  toast.success("删除成功");
  deleteState.visible = false;
  checkedIds.value = new Set();
  handleQuery();
}

// ==================== 导出 ====================

async function exportUsers() {
  try {
    const response = await UserAPI.export(queryParams);
    const blob = new Blob([response as any], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "用户数据.xlsx";
    link.click();
    window.URL.revokeObjectURL(url);
    toast.success("导出成功");
  } catch {
    toast.error("导出失败");
  }
}

// ==================== 分页 ====================

const totalPages = computed(() => Math.ceil(total.value / queryParams.pageSize));

const paginationItems = computed(() => {
  const pages: number[] = [];
  const current = queryParams.pageNum;
  const totalP = totalPages.value;

  if (totalP <= 7) {
    for (let i = 1; i <= totalP; i++) pages.push(i);
    return pages;
  }

  pages.push(1);
  if (current > 3) pages.push(-1); // ellipsis

  const start = Math.max(2, current - 1);
  const end = Math.min(totalP - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < totalP - 2) pages.push(-2); // ellipsis
  pages.push(totalP);

  return pages;
});

function onPageChange(page: number) {
  if (page < 1 || page > totalPages.value) return;
  queryParams.pageNum = page;
  fetchList();
}

// ==================== 工具 ====================

function genderLabel(gender?: number) {
  if (gender === 1) return "男";
  if (gender === 2) return "女";
  return "未知";
}

// ==================== 初始化 ====================

onMounted(() => {
  handleQuery();
});
</script>
