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
              placeholder="用户名/邮箱"
              class="w-52 h-8 text-sm"
              @keyup.enter="handleQuery"
            />
          </div>
          <div class="space-y-1.5">
            <Label class="text-xs">状态</Label>
            <Select v-model="queryParams.status">
              <SelectTrigger class="w-28 h-8"><SelectValue placeholder="全部" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="true">启用</SelectItem>
                <SelectItem value="false">禁用</SelectItem>
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
            <Button size="sm" @click="openAdd">新增用户</Button>
            <Button
              variant="destructive"
              size="sm"
              :disabled="checkedIds.size === 0"
              @click="handleBatchDelete"
            >
              批量删除
            </Button>
          </div>
          <div class="flex items-center gap-2">
            <Button variant="outline" size="sm" @click="toggleExpandAll">
              {{ allExpanded ? "收起全部" : "展开全部" }}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div class="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-10">
                  <Checkbox :checked="isAllSelected" @update:checked="toggleAll" />
                </TableHead>
                <TableHead class="w-10" />
                <TableHead class="w-12">#</TableHead>
                <TableHead>用户名</TableHead>
                <TableHead>角色</TableHead>
                <TableHead>手机号</TableHead>
                <TableHead>邮箱</TableHead>
                <TableHead class="w-20">
                  <Button
                    variant="ghost"
                    size="sm"
                    class="h-6 px-1 text-xs"
                    @click="toggleSort('status')"
                  >
                    状态 {{ sortField === "status" ? (sortOrder === "asc" ? "↑" : "↓") : "" }}
                  </Button>
                </TableHead>
                <TableHead class="w-36">
                  <Button
                    variant="ghost"
                    size="sm"
                    class="h-6 px-1 text-xs"
                    @click="toggleSort('createTime')"
                  >
                    创建时间
                    {{ sortField === "createTime" ? (sortOrder === "asc" ? "↑" : "↓") : "" }}
                  </Button>
                </TableHead>
                <TableHead class="w-28 text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <template v-if="filteredList.length === 0">
                <TableRow>
                  <TableCell :colspan="10" class="h-20 text-center text-muted-foreground">
                    暂无数据
                  </TableCell>
                </TableRow>
              </template>
              <template v-for="(row, idx) in paginatedList" :key="row.id">
                <TableRow :data-state="checkedIds.has(row.id) ? 'selected' : undefined">
                  <TableCell>
                    <Checkbox :checked="checkedIds.has(row.id)" @update:checked="toggleRow(row)" />
                  </TableCell>
                  <TableCell>
                    <button class="p-0.5 hover:bg-muted rounded" @click="toggleExpand(row.id)">
                      <ChevronRightIcon
                        class="size-3.5 transition-transform"
                        :class="{ 'rotate-90': expandedIds.has(row.id) }"
                      />
                    </button>
                  </TableCell>
                  <TableCell class="text-muted-foreground text-xs">
                    {{ (currentPage - 1) * pageSize + idx + 1 }}
                  </TableCell>
                  <TableCell class="font-medium">{{ row.username }}</TableCell>
                  <TableCell>
                    <div class="flex gap-1">
                      <Badge
                        v-for="role in row.roles.split(',')"
                        :key="role"
                        :variant="role === 'admin' ? 'default' : 'secondary'"
                        class="text-[10px]"
                      >
                        {{ role }}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell class="text-sm">{{ row.phone }}</TableCell>
                  <TableCell class="text-sm text-muted-foreground">{{ row.email }}</TableCell>
                  <TableCell>
                    <Badge :variant="row.status ? 'default' : 'outline'" class="text-[10px]">
                      {{ row.status ? "启用" : "禁用" }}
                    </Badge>
                  </TableCell>
                  <TableCell class="text-xs text-muted-foreground">{{ row.createTime }}</TableCell>
                  <TableCell class="text-right">
                    <div class="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" @click="openEdit(row)">修改</Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        class="text-destructive"
                        @click="handleDelete(row.id)"
                      >
                        删除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow v-if="expandedIds.has(row.id)">
                  <TableCell :colspan="10" class="bg-muted/30 px-8 py-3">
                    <div class="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span class="text-muted-foreground">ID：</span>
                        {{ row.id }}
                      </div>
                      <div>
                        <span class="text-muted-foreground">用户名：</span>
                        {{ row.username }}
                      </div>
                      <div>
                        <span class="text-muted-foreground">角色：</span>
                        {{ row.roles }}
                      </div>
                      <div>
                        <span class="text-muted-foreground">手机号：</span>
                        {{ row.phone }}
                      </div>
                      <div>
                        <span class="text-muted-foreground">邮箱：</span>
                        {{ row.email }}
                      </div>
                      <div>
                        <span class="text-muted-foreground">创建时间：</span>
                        {{ row.createTime }}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </template>
            </TableBody>
          </Table>
        </div>

        <!-- 分页 + 统计 -->
        <div class="flex items-center justify-between mt-4">
          <div class="text-xs text-muted-foreground">
            共 {{ filteredList.length }} 条，启用
            {{ filteredList.filter((r) => r.status).length }} 条
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-muted-foreground">
              第 {{ currentPage }} / {{ totalPages }} 页
            </span>
            <Button variant="outline" size="sm" :disabled="currentPage <= 1" @click="currentPage--">
              &lt;
            </Button>
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
            <Button
              variant="outline"
              size="sm"
              :disabled="currentPage >= totalPages"
              @click="currentPage++"
            >
              &gt;
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 弹窗 -->
    <Dialog :open="dialogOpen" @update:open="dialogOpen = $event">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{{ isEdit ? "修改用户" : "新增用户" }}</DialogTitle>
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
            <Label>角色</Label>
            <Select v-model="formData.roles">
              <SelectTrigger><SelectValue placeholder="请选择" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">admin</SelectItem>
                <SelectItem value="editor">editor</SelectItem>
                <SelectItem value="user">user</SelectItem>
                <SelectItem value="guest">guest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex items-center justify-between">
            <Label>状态</Label>
            <Switch
              :checked="formData.status"
              @update:checked="(v: boolean) => (formData.status = v)"
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
import { ChevronRightIcon } from "@lucide/vue";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Row {
  id: number;
  username: string;
  roles: string;
  phone: string;
  email: string;
  status: boolean;
  createTime: string;
}

const mockData: Row[] = [
  {
    id: 1,
    username: "Richard Clark",
    roles: "editor",
    phone: "18185826431",
    email: "y.djf@xiswx.fk",
    status: true,
    createTime: "2010-04-17 12:39:20",
  },
  {
    id: 2,
    username: "Robert Garcia",
    roles: "admin",
    phone: "18125716043",
    email: "z.japgndxosu@inoudjxc.ie",
    status: false,
    createTime: "2020-01-02 11:51:58",
  },
  {
    id: 3,
    username: "Thomas Moore",
    roles: "admin",
    phone: "18106622048",
    email: "j.fvsgnjjutm@fmjw.se",
    status: true,
    createTime: "1983-10-12 10:06:41",
  },
  {
    id: 4,
    username: "Dorothy Lewis",
    roles: "admin",
    phone: "13321357284",
    email: "o.htso@iwxvehrs.tj",
    status: true,
    createTime: "1970-03-03 00:26:45",
  },
  {
    id: 5,
    username: "George Rodriguez",
    roles: "admin",
    phone: "18158641167",
    email: "x.sigizx@fwknokiqn.tr",
    status: true,
    createTime: "1988-03-16 14:46:26",
  },
  {
    id: 6,
    username: "Angela Jackson",
    roles: "admin",
    phone: "19810721230",
    email: "j.gqrdqaqtu@ipthgm.fj",
    status: true,
    createTime: "2006-09-26 12:53:37",
  },
  {
    id: 7,
    username: "James Walker",
    roles: "admin",
    phone: "18123903251",
    email: "k.axmdcsl@mcmeudog.cl",
    status: true,
    createTime: "1981-01-19 12:51:34",
  },
  {
    id: 8,
    username: "Paul Garcia",
    roles: "admin",
    phone: "18617930381",
    email: "c.glufsn@vwqntlllj.es",
    status: false,
    createTime: "2009-12-04 20:40:57",
  },
  {
    id: 9,
    username: "Jeffrey Miller",
    roles: "admin",
    phone: "18145245413",
    email: "u.poqrqw@arto.rw",
    status: false,
    createTime: "1991-04-01 05:16:52",
  },
  {
    id: 10,
    username: "Donna Lewis",
    roles: "editor",
    phone: "19839835537",
    email: "l.lmpeoupu@rujdlzdbk.gf",
    status: true,
    createTime: "1987-11-29 21:47:37",
  },
  {
    id: 11,
    username: "Jennifer Smith",
    roles: "editor",
    phone: "18145245413",
    email: "j.jqx@xjxqx.jp",
    status: true,
    createTime: "1991-04-01 05:16:52",
  },
];

const dataList = ref<Row[]>([...mockData]);
const queryParams = reactive({ keywords: "", status: "all" as string });
const checkedIds = ref<Set<number>>(new Set());
const expandedIds = ref<Set<number>>(new Set());
const sortField = ref("");
const sortOrder = ref<"asc" | "desc">("asc");

const currentPage = ref(1);
const pageSize = 5;

const filteredList = computed(() => {
  let list = [...dataList.value];
  if (queryParams.keywords) {
    const kw = queryParams.keywords.toLowerCase();
    list = list.filter(
      (r) => r.username.toLowerCase().includes(kw) || r.email.toLowerCase().includes(kw)
    );
  }
  if (queryParams.status !== "all") {
    const st = queryParams.status === "true";
    list = list.filter((r) => r.status === st);
  }
  if (sortField.value) {
    list.sort((a, b) => {
      const aVal =
        sortField.value === "status"
          ? a.status
            ? 1
            : 0
          : (a[sortField.value as keyof Row] as string);
      const bVal =
        sortField.value === "status"
          ? b.status
            ? 1
            : 0
          : (b[sortField.value as keyof Row] as string);
      return sortOrder.value === "asc" ? (aVal > bVal ? 1 : -1) : aVal < bVal ? 1 : -1;
    });
  }
  return list;
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

const isAllSelected = computed(
  () =>
    paginatedList.value.length > 0 && paginatedList.value.every((r) => checkedIds.value.has(r.id))
);
const allExpanded = computed(
  () =>
    paginatedList.value.length > 0 && paginatedList.value.every((r) => expandedIds.value.has(r.id))
);

function toggleRow(row: Row) {
  const s = new Set(checkedIds.value);
  s.has(row.id) ? s.delete(row.id) : s.add(row.id);
  checkedIds.value = s;
}

function toggleAll(val: boolean | "indeterminate") {
  const s = new Set<number>();
  if (val === true) paginatedList.value.forEach((r) => s.add(r.id));
  checkedIds.value = s;
}

function toggleExpand(id: number) {
  const s = new Set(expandedIds.value);
  s.has(id) ? s.delete(id) : s.add(id);
  expandedIds.value = s;
}

function toggleExpandAll() {
  if (allExpanded.value) expandedIds.value = new Set();
  else {
    const s = new Set<number>();
    paginatedList.value.forEach((r) => s.add(r.id));
    expandedIds.value = s;
  }
}

function toggleSort(field: string) {
  if (sortField.value === field) sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  else {
    sortField.value = field;
    sortOrder.value = "asc";
  }
}

function handleQuery() {
  currentPage.value = 1;
}
function handleReset() {
  queryParams.keywords = "";
  queryParams.status = "all";
  currentPage.value = 1;
}

const dialogOpen = ref(false);
const isEdit = ref(false);
const formData = reactive<{ id?: number; username: string; roles: string; status: boolean }>({
  username: "",
  roles: "user",
  status: true,
});

function openAdd() {
  isEdit.value = false;
  Object.assign(formData, { id: undefined, username: "", roles: "user", status: true });
  dialogOpen.value = true;
}

function openEdit(row: Row) {
  isEdit.value = true;
  Object.assign(formData, {
    id: row.id,
    username: row.username,
    roles: row.roles,
    status: row.status,
  });
  dialogOpen.value = true;
}

function handleSubmit() {
  if (!formData.username) {
    toast.error("请输入用户名");
    return;
  }
  if (isEdit.value && formData.id) {
    const idx = dataList.value.findIndex((r) => r.id === formData.id);
    if (idx >= 0)
      dataList.value[idx] = {
        ...dataList.value[idx],
        username: formData.username,
        roles: formData.roles,
        status: formData.status,
      };
    toast.success("修改成功");
  } else {
    dataList.value.push({
      id: Date.now(),
      username: formData.username,
      roles: formData.roles,
      phone: "181" + Math.random().toString().slice(2, 9),
      email: `${formData.username.toLowerCase().replace(/\s/g, ".")}@example.com`,
      status: formData.status,
      createTime: new Date().toISOString().slice(0, 19).replace("T", " "),
    });
    toast.success("新增成功");
  }
  dialogOpen.value = false;
}

function handleDelete(id: number) {
  dataList.value = dataList.value.filter((r) => r.id !== id);
  toast.success("删除成功");
}

function handleBatchDelete() {
  dataList.value = dataList.value.filter((r) => !checkedIds.value.has(r.id));
  checkedIds.value = new Set();
  toast.success("批量删除成功");
}
</script>
