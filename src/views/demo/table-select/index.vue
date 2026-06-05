<!-- 列表选择器示例 -->
<template>
  <div class="p-5 space-y-5">
    <Card>
      <CardHeader><CardTitle class="text-sm">列表选择器</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center gap-3">
          <Label class="w-20 text-sm">选择用户</Label>
          <Popover v-model:open="popoverOpen">
            <PopoverTrigger as-child>
              <Button variant="outline" class="w-80 justify-start font-normal">
                <span v-if="selectedUser" class="flex items-center gap-2">
                  <Badge variant="secondary" class="text-[10px]">
                    {{ selectedUser.status === 1 ? "启用" : "禁用" }}
                  </Badge>
                  {{ selectedUser.username }} — {{ selectedUser.deptName }}
                </span>
                <span v-else class="text-muted-foreground">点击选择用户</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-[500px] p-3" align="start">
              <Input v-model="keyword" placeholder="搜索用户名/昵称..." class="mb-3 h-8" />
              <ScrollArea class="h-[280px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead class="w-10"></TableHead>
                      <TableHead>用户名</TableHead>
                      <TableHead>部门</TableHead>
                      <TableHead>状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow
                      v-for="user in filteredUsers"
                      :key="user.id"
                      class="cursor-pointer"
                      :class="{ 'bg-primary/5': selectedUser?.id === user.id }"
                      @click="selectUser(user)"
                    >
                      <TableCell>
                        <Checkbox :checked="selectedUser?.id === user.id" />
                      </TableCell>
                      <TableCell class="font-medium">{{ user.username }}</TableCell>
                      <TableCell>{{ user.deptName }}</TableCell>
                      <TableCell>
                        <Badge
                          :variant="user.status === 1 ? 'default' : 'secondary'"
                          class="text-[10px]"
                        >
                          {{ user.status === 1 ? "启用" : "禁用" }}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
              <div class="flex justify-end mt-3 gap-2">
                <Button variant="outline" size="sm" @click="popoverOpen = false">取消</Button>
                <Button size="sm" @click="confirmSelect">确定</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div v-if="selectedUser" class="mt-4 p-4 border rounded-lg bg-muted/30">
          <p class="text-sm font-medium mb-2">已选择用户：</p>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span class="text-muted-foreground">用户名：</span>
              {{ selectedUser.username }}
            </div>
            <div>
              <span class="text-muted-foreground">昵称：</span>
              {{ selectedUser.nickname }}
            </div>
            <div>
              <span class="text-muted-foreground">部门：</span>
              {{ selectedUser.deptName }}
            </div>
            <div>
              <span class="text-muted-foreground">角色：</span>
              {{ selectedUser.roleNames }}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MockUser {
  id: string;
  username: string;
  nickname: string;
  deptName: string;
  roleNames: string;
  status: number;
}

const mockUsers: MockUser[] = [
  {
    id: "1",
    username: "admin",
    nickname: "管理员",
    deptName: "研发部门",
    roleNames: "超级管理员",
    status: 1,
  },
  {
    id: "2",
    username: "zhangsan",
    nickname: "张三",
    deptName: "市场部门",
    roleNames: "普通用户",
    status: 1,
  },
  {
    id: "3",
    username: "lisi",
    nickname: "李四",
    deptName: "财务部门",
    roleNames: "审计员",
    status: 1,
  },
  {
    id: "4",
    username: "wangwu",
    nickname: "王五",
    deptName: "人事部门",
    roleNames: "HR",
    status: 0,
  },
  {
    id: "5",
    username: "zhaoliu",
    nickname: "赵六",
    deptName: "研发部门",
    roleNames: "开发工程师",
    status: 1,
  },
  {
    id: "6",
    username: "sunqi",
    nickname: "孙七",
    deptName: "测试部门",
    roleNames: "测试工程师",
    status: 1,
  },
];

const popoverOpen = ref(false);
const keyword = ref("");
const selectedUser = ref<MockUser>();

const filteredUsers = computed(() => {
  if (!keyword.value) return mockUsers;
  const kw = keyword.value.toLowerCase();
  return mockUsers.filter(
    (u) => u.username.toLowerCase().includes(kw) || u.nickname.toLowerCase().includes(kw)
  );
});

function selectUser(user: MockUser) {
  selectedUser.value = user;
}

function confirmSelect() {
  popoverOpen.value = false;
}
</script>
