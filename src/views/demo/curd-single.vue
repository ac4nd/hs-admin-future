<template>
  <div class="p-5 space-y-4">
    <!-- 搜索 -->
    <Card>
      <CardContent class="pt-5 pb-4">
        <div class="flex flex-wrap items-end gap-3">
          <div class="space-y-1.5">
            <Label class="text-xs">关键字</Label>
            <Input v-model="queryParams.keywords" placeholder="姓名/地址" class="w-52 h-8 text-sm" @keyup.enter="handleQuery" />
          </div>
          <div class="space-y-1.5">
            <Label class="text-xs">状态</Label>
            <Select v-model="queryParams.status">
              <SelectTrigger class="w-28 h-8"><SelectValue placeholder="全部" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="1">正常</SelectItem>
                <SelectItem value="0">停用</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex gap-2">
            <Button size="sm" @click="handleQuery">搜索</Button>
            <Button variant="outline" size="sm" @click="handleReset">重置</Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 表格 -->
    <Card>
      <CardHeader class="pb-3">
        <div class="flex items-center justify-between">
          <div class="flex gap-2">
            <Button size="sm" @click="openAdd">新增</Button>
            <Button variant="destructive" size="sm" :disabled="checkedIds.size === 0" @click="handleBatchDelete">批量删除</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div class="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-10"><Checkbox :checked="isAllSelected" @update:checked="toggleAll" /></TableHead>
                <TableHead class="w-12">#</TableHead>
                <TableHead>姓名</TableHead>
                <TableHead>年龄</TableHead>
                <TableHead>性别</TableHead>
                <TableHead>手机号</TableHead>
                <TableHead>地址</TableHead>
                <TableHead class="w-20">状态</TableHead>
                <TableHead class="w-28 text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="paginatedList.length === 0">
                <TableCell :colspan="9" class="h-20 text-center text-muted-foreground">暂无数据</TableCell>
              </TableRow>
              <TableRow v-for="(row, idx) in paginatedList" :key="row.id" :data-state="checkedIds.has(row.id) ? 'selected' : undefined">
                <TableCell><Checkbox :checked="checkedIds.has(row.id)" @update:checked="toggleRow(row)" /></TableCell>
                <TableCell class="text-muted-foreground text-xs">{{ (currentPage - 1) * pageSize + idx + 1 }}</TableCell>
                <TableCell class="font-medium">{{ row.name }}</TableCell>
                <TableCell>{{ row.age }}</TableCell>
                <TableCell>
                  <Badge :variant="row.gender === 1 ? 'default' : 'secondary'" class="text-[10px]">
                    {{ row.gender === 1 ? '男' : '女' }}
                  </Badge>
                </TableCell>
                <TableCell class="text-sm">{{ row.phone }}</TableCell>
                <TableCell class="text-sm text-muted-foreground max-w-[200px] truncate">{{ row.address }}</TableCell>
                <TableCell>
                  <Badge :variant="row.status === 1 ? 'default' : 'outline'" class="text-[10px]">
                    {{ row.status === 1 ? '正常' : '停用' }}
                  </Badge>
                </TableCell>
                <TableCell class="text-right">
                  <div class="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" @click="openEdit(row)">编辑</Button>
                    <Button variant="ghost" size="sm" class="text-destructive" @click="handleDelete(row.id)">删除</Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <!-- 分页 -->
        <div class="flex items-center justify-between mt-4">
          <div class="text-xs text-muted-foreground">共 {{ filteredList.length }} 条</div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-muted-foreground">第 {{ currentPage }} / {{ totalPages }} 页</span>
            <Button variant="outline" size="sm" :disabled="currentPage <= 1" @click="currentPage--">&lt;</Button>
            <Button
              v-for="p in displayedPages"
              :key="p"
              :variant="p === currentPage ? 'default' : 'outline'"
              size="sm"
              class="w-8"
              @click="currentPage = p"
            >
              {{ p }}
            </Button>
            <Button variant="outline" size="sm" :disabled="currentPage >= totalPages" @click="currentPage++">&gt;</Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 新增/编辑弹窗 -->
    <Dialog :open="dialogOpen" @update:open="dialogOpen = $event">
      <DialogContent class="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{{ isEdit ? '编辑' : '新增' }}</DialogTitle>
        </DialogHeader>
        <div class="space-y-4 py-2">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <Label>姓名 <span class="text-destructive">*</span></Label>
              <Input v-model="formData.name" placeholder="请输入姓名" />
            </div>
            <div class="space-y-1.5">
              <Label>年龄</Label>
              <Input v-model.number="formData.age" type="number" placeholder="请输入年龄" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <Label>性别</Label>
              <Select :model-value="String(formData.gender)" @update:model-value="(v: any) => formData.gender = Number(v)">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">男</SelectItem>
                  <SelectItem value="2">女</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="space-y-1.5">
              <Label>手机号</Label>
              <Input v-model="formData.phone" placeholder="请输入手机号" />
            </div>
          </div>
          <div class="space-y-1.5">
            <Label>地址</Label>
            <Input v-model="formData.address" placeholder="请输入地址" />
          </div>
          <div class="flex items-center justify-between">
            <Label>状态</Label>
            <Switch :checked="formData.status === 1" @update:checked="(v: boolean) => formData.status = v ? 1 : 0" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="dialogOpen = false">取消</Button>
          <Button @click="handleSubmit">确定</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- 删除确认 -->
    <AlertDialog :open="deleteDialogOpen" @update:open="deleteDialogOpen = $event">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确认删除</AlertDialogTitle>
          <AlertDialogDescription>确定要删除选中的数据项吗？此操作不可撤销。</AlertDialogDescription>
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
import { ref, reactive, computed } from "vue";
import { toast } from "vue-sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Row {
  id: string;
  name: string;
  age: number;
  gender: number;
  phone: string;
  address: string;
  status: number;
}

const mockData: Row[] = [
  { id: "1", name: "张三", age: 28, gender: 1, phone: "18112345678", address: "北京市朝阳区建国路88号", status: 1 },
  { id: "2", name: "李四", age: 35, gender: 1, phone: "13987654321", address: "上海市浦东新区陆家嘴环路1000号", status: 1 },
  { id: "3", name: "王五", age: 22, gender: 2, phone: "15011223344", address: "广州市天河区珠江新城花城大道", status: 0 },
  { id: "4", name: "赵六", age: 30, gender: 1, phone: "13799887766", address: "深圳市南山区科技园南区", status: 1 },
  { id: "5", name: "孙七", age: 26, gender: 2, phone: "18666778899", address: "杭州市西湖区文三路138号", status: 1 },
  { id: "6", name: "周八", age: 40, gender: 1, phone: "13555667788", address: "成都市武侯区天府大道中段688号", status: 0 },
  { id: "7", name: "吴九", age: 33, gender: 2, phone: "18900112233", address: "武汉市洪山区光谷大道77号", status: 1 },
  { id: "8", name: "郑十", age: 29, gender: 1, phone: "13122334455", address: "南京市鼓楼区汉中路100号", status: 1 },
];

const dataList = ref<Row[]>([...mockData]);
const queryParams = reactive({ keywords: "", status: "all" as string });
const checkedIds = ref<Set<string>>(new Set());
const deleteDialogOpen = ref(false);
const pendingDeleteIds = ref<string[]>([]);

const currentPage = ref(1);
const pageSize = 5;

const filteredList = computed(() => {
  return dataList.value.filter((r) => {
    if (queryParams.keywords) {
      const kw = queryParams.keywords.toLowerCase();
      if (!r.name.toLowerCase().includes(kw) && !r.address.toLowerCase().includes(kw)) return false;
    }
    if (queryParams.status !== "all") {
      if (r.status !== Number(queryParams.status)) return false;
    }
    return true;
  });
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredList.value.length / pageSize)));
const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredList.value.slice(start, start + pageSize);
});

const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pages: number[] = [];
  for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) pages.push(i);
  return pages;
});

const isAllSelected = computed(() => paginatedList.value.length > 0 && paginatedList.value.every((r) => checkedIds.value.has(r.id)));

function toggleRow(row: Row) {
  const s = new Set(checkedIds.value);
  s.has(row.id) ? s.delete(row.id) : s.add(row.id);
  checkedIds.value = s;
}

function toggleAll(val: boolean | "indeterminate") {
  const s = new Set<string>();
  if (val === true) paginatedList.value.forEach((r) => s.add(r.id));
  checkedIds.value = s;
}

function handleQuery() { currentPage.value = 1; }
function handleReset() { queryParams.keywords = ""; queryParams.status = "all"; currentPage.value = 1; }

const dialogOpen = ref(false);
const isEdit = ref(false);
const formData = reactive<{ id?: string; name: string; age: number; gender: number; phone: string; address: string; status: number }>({
  name: "", age: 25, gender: 1, phone: "", address: "", status: 1,
});

function openAdd() {
  isEdit.value = false;
  Object.assign(formData, { id: undefined, name: "", age: 25, gender: 1, phone: "", address: "", status: 1 });
  dialogOpen.value = true;
}

function openEdit(row: Row) {
  isEdit.value = true;
  Object.assign(formData, { ...row });
  dialogOpen.value = true;
}

function handleSubmit() {
  if (!formData.name) { toast.error("请输入姓名"); return; }
  if (isEdit.value && formData.id) {
    const idx = dataList.value.findIndex((r) => r.id === formData.id);
    if (idx >= 0) dataList.value[idx] = { ...formData } as Row;
    toast.success("修改成功");
  } else {
    dataList.value.push({ ...formData, id: String(Date.now()) } as Row);
    toast.success("新增成功");
  }
  dialogOpen.value = false;
}

function handleDelete(id: string) {
  pendingDeleteIds.value = [id];
  deleteDialogOpen.value = true;
}

function handleBatchDelete() {
  pendingDeleteIds.value = [...checkedIds.value];
  deleteDialogOpen.value = true;
}

function confirmDelete() {
  const ids = new Set(pendingDeleteIds.value);
  dataList.value = dataList.value.filter((r) => !ids.has(r.id));
  checkedIds.value = new Set();
  deleteDialogOpen.value = false;
  toast.success("删除成功");
}
</script>
