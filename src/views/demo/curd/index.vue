<!-- 增删改查示例 -->
<template>
  <div class="p-5 space-y-4">
    <!-- 搜索 -->
    <Card>
      <CardContent class="pt-5 pb-4">
        <div class="flex flex-wrap items-end gap-3">
          <div class="space-y-1.5">
            <Label class="text-xs">关键字</Label>
            <Input
              v-model="queryParams.keywords"
              placeholder="用户名/昵称"
              class="w-52 h-8 text-sm"
              @keyup.enter="handleQuery"
            />
          </div>
          <div class="space-y-1.5">
            <Label class="text-xs">状态</Label>
            <Select v-model="queryParams.status">
              <SelectTrigger class="w-28 h-8"><SelectValue placeholder="全部" /></SelectTrigger>
              <SelectContent>
                <SelectItem :value="1">启用</SelectItem>
                <SelectItem :value="0">禁用</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex gap-2">
            <Button size="sm" @click="handleQuery">
              <SearchIcon class="size-3.5" />
              搜索
            </Button>
            <Button variant="outline" size="sm" @click="handleReset">
              <RotateCcwIcon class="size-3.5" />
              重置
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 表格 -->
    <Card>
      <CardHeader class="pb-3">
        <div class="flex items-center justify-between">
          <div class="flex gap-2">
            <Button size="sm" @click="openAdd">
              <PlusIcon class="size-3.5" />
              新增
            </Button>
            <Button
              variant="destructive"
              size="sm"
              :disabled="checkedIds.size === 0"
              @click="handleBatchDelete"
            >
              <TrashIcon class="size-3.5" />
              删除
            </Button>
          </div>
          <Button variant="outline" size="sm" @click="handleExport">
            <DownloadIcon class="size-3.5" />
            导出
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-10">
                <Checkbox :checked="isAllSelected" @update:checked="toggleAll" />
              </TableHead>
              <TableHead>用户名</TableHead>
              <TableHead>昵称</TableHead>
              <TableHead>部门</TableHead>
              <TableHead class="w-20">状态</TableHead>
              <TableHead class="w-36 text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableEmpty v-if="filteredList.length === 0" :colspan="6">
              <div class="text-muted-foreground text-sm">暂无数据</div>
            </TableEmpty>
            <TableRow
              v-for="row in filteredList"
              :key="row.id"
              :data-state="checkedIds.has(row.id) ? 'selected' : undefined"
            >
              <TableCell>
                <Checkbox :checked="checkedIds.has(row.id)" @update:checked="toggleRow(row)" />
              </TableCell>
              <TableCell class="font-medium">{{ row.username }}</TableCell>
              <TableCell>{{ row.nickname }}</TableCell>
              <TableCell>{{ row.deptName }}</TableCell>
              <TableCell>
                <Badge :variant="row.status === 1 ? 'default' : 'secondary'" class="text-[10px]">
                  {{ row.status === 1 ? "启用" : "禁用" }}
                </Badge>
              </TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end gap-1">
                  <Button variant="ghost" size="sm" @click="openEdit(row)">
                    <PencilIcon class="size-3.5 mr-1" />
                    编辑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    class="text-destructive"
                    @click="handleDelete(row.id)"
                  >
                    <TrashIcon class="size-3.5 mr-1" />
                    删除
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- 新增/编辑弹窗 -->
    <Dialog :open="dialogOpen" @update:open="dialogOpen = $event">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{{ isEdit ? "编辑用户" : "新增用户" }}</DialogTitle>
        </DialogHeader>
        <div class="space-y-4 py-2">
          <div class="space-y-1.5">
            <Label>
              用户名
              <span class="text-destructive">*</span>
            </Label>
            <Input v-model="formData.username" placeholder="请输入用户名" :readonly="isEdit" />
          </div>
          <div class="space-y-1.5">
            <Label>
              昵称
              <span class="text-destructive">*</span>
            </Label>
            <Input v-model="formData.nickname" placeholder="请输入昵称" />
          </div>
          <div class="space-y-1.5">
            <Label>部门</Label>
            <Select v-model="formData.deptId">
              <SelectTrigger><SelectValue placeholder="请选择" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">研发部门</SelectItem>
                <SelectItem value="2">市场部门</SelectItem>
                <SelectItem value="3">财务部门</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex items-center justify-between">
            <Label>状态</Label>
            <Switch
              :checked="formData.status === 1"
              @update:checked="(v: boolean) => (formData.status = v ? 1 : 0)"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="dialogOpen = false">取消</Button>
          <Button @click="handleSubmit">确定</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { toast } from "vue-sonner";
import {
  SearchIcon,
  RotateCcwIcon,
  PlusIcon,
  TrashIcon,
  DownloadIcon,
  PencilIcon,
} from "@lucide/vue";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Row {
  id: string;
  username: string;
  nickname: string;
  deptId: string;
  deptName: string;
  status: number;
}

const mockData: Row[] = [
  { id: "1", username: "admin", nickname: "管理员", deptId: "1", deptName: "研发部门", status: 1 },
  { id: "2", username: "zhangsan", nickname: "张三", deptId: "2", deptName: "市场部门", status: 1 },
  { id: "3", username: "lisi", nickname: "李四", deptId: "3", deptName: "财务部门", status: 0 },
  { id: "4", username: "wangwu", nickname: "王五", deptId: "1", deptName: "研发部门", status: 1 },
  { id: "5", username: "zhaoliu", nickname: "赵六", deptId: "2", deptName: "市场部门", status: 1 },
];

const dataList = ref<Row[]>([...mockData]);
const queryParams = reactive({
  keywords: undefined as string | undefined,
  status: undefined as number | undefined,
});
const checkedIds = ref<Set<string>>(new Set());

const filteredList = computed(() => {
  return dataList.value.filter((r) => {
    if (
      queryParams.keywords &&
      !r.username.includes(queryParams.keywords) &&
      !r.nickname.includes(queryParams.keywords)
    )
      return false;
    if (queryParams.status !== undefined && r.status !== queryParams.status) return false;
    return true;
  });
});

const isAllSelected = computed(
  () => filteredList.value.length > 0 && filteredList.value.every((r) => checkedIds.value.has(r.id))
);

function toggleRow(row: Row) {
  const s = new Set(checkedIds.value);
  if (s.has(row.id)) {
    s.delete(row.id);
  } else {
    s.add(row.id);
  }
  checkedIds.value = s;
}

function toggleAll(val: boolean | "indeterminate") {
  const s = new Set<string>();
  if (val === true) filteredList.value.forEach((r) => s.add(r.id));
  checkedIds.value = s;
}

function handleQuery() {
  /* 前端过滤，自动响应 */
}
function handleReset() {
  queryParams.keywords = undefined;
  queryParams.status = undefined;
}
function handleExport() {
  toast.success("导出成功（模拟）");
}

// 表单
const dialogOpen = ref(false);
const isEdit = ref(false);
const formData = reactive<{
  id?: string;
  username: string;
  nickname: string;
  deptId: string;
  status: number;
}>({
  username: "",
  nickname: "",
  deptId: "",
  status: 1,
});

function openAdd() {
  isEdit.value = false;
  Object.assign(formData, { id: undefined, username: "", nickname: "", deptId: "", status: 1 });
  dialogOpen.value = true;
}

function openEdit(row: Row) {
  isEdit.value = true;
  Object.assign(formData, { ...row });
  dialogOpen.value = true;
}

function handleSubmit() {
  if (!formData.username || !formData.nickname) {
    toast.error("请填写必填项");
    return;
  }
  if (isEdit.value && formData.id) {
    const idx = dataList.value.findIndex((r) => r.id === formData.id);
    if (idx >= 0) {
      const deptMap: Record<string, string> = { "1": "研发部门", "2": "市场部门", "3": "财务部门" };
      dataList.value[idx] = { ...formData, deptName: deptMap[formData.deptId] ?? "" } as Row;
    }
    toast.success("修改成功");
  } else {
    dataList.value.push({
      id: String(Date.now()),
      username: formData.username,
      nickname: formData.nickname,
      deptId: formData.deptId,
      deptName: { "1": "研发部门", "2": "市场部门", "3": "财务部门" }[formData.deptId] ?? "",
      status: formData.status,
    });
    toast.success("新增成功");
  }
  dialogOpen.value = false;
}

function handleDelete(id: string) {
  dataList.value = dataList.value.filter((r) => r.id !== id);
  toast.success("删除成功");
}

function handleBatchDelete() {
  dataList.value = dataList.value.filter((r) => !checkedIds.value.has(r.id));
  checkedIds.value = new Set();
  toast.success("批量删除成功");
}
</script>
