<!-- 拖拽组件示例 -->
<template>
  <div class="p-5 space-y-5">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card>
        <CardHeader><CardTitle class="text-sm">基础示例</CardTitle></CardHeader>
        <CardContent>
          <VueDraggable v-model="list1" class="space-y-2 min-h-[200px]">
            <div
              v-for="item in list1"
              :key="item.name"
              class="px-4 py-3 bg-muted/50 rounded-lg text-sm font-medium text-center cursor-grab active:cursor-grabbing active:scale-[1.02] transition-transform"
            >
              {{ item.name }} — {{ item.role }}
            </div>
          </VueDraggable>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle class="text-sm">过渡动画</CardTitle></CardHeader>
        <CardContent>
          <VueDraggable v-model="list1" target=".sort-target" :scroll="true" class="min-h-[200px]">
            <TransitionGroup tag="ul" name="fade" class="sort-target space-y-2">
              <li
                v-for="item in list1"
                :key="item.name"
                class="px-4 py-3 bg-muted/50 rounded-lg text-sm font-medium text-center cursor-grab list-none"
              >
                {{ item.name }} — {{ item.role }}
              </li>
            </TransitionGroup>
          </VueDraggable>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader><CardTitle class="text-sm">表格拖拽排序</CardTitle></CardHeader>
      <CardContent>
        <VueDraggable v-model="list2" target="tbody" :animation="150">
          <Table>
            <TableHeader>
              <TableRow><TableHead>姓名</TableHead><TableHead>角色</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="item in list2" :key="item.name">
                <TableCell class="font-medium">{{ item.name }}</TableCell>
                <TableCell>{{ item.role }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </VueDraggable>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle class="text-sm">指定手柄拖拽排序</CardTitle></CardHeader>
      <CardContent>
        <VueDraggable v-model="list3" target="tbody" handle=".drag-handle" :animation="150">
          <Table>
            <TableHeader>
              <TableRow><TableHead>姓名</TableHead><TableHead>角色</TableHead><TableHead class="w-20">操作</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="item in list3" :key="item.name">
                <TableCell class="font-medium">{{ item.name }}</TableCell>
                <TableCell>{{ item.role }}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" class="drag-handle cursor-grab">
                    <GripVerticalIcon class="size-4" />
                    移动
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </VueDraggable>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import { GripVerticalIcon } from "@lucide/vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const crew = [
  { name: "路飞", role: "船长·格斗家" },
  { name: "索隆", role: "剑豪·战斗员·三刀流" },
  { name: "娜美", role: "航海士·气象学家·财务官" },
  { name: "山治", role: "厨师·格斗家·黑足" },
  { name: "罗宾", role: "考古学家·历史学家" },
];

const list1 = ref([...crew]);
const list2 = ref([...crew]);
const list3 = ref([...crew]);
</script>

<style scoped>
.fade-move, .fade-enter-active, .fade-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(20px, 0);
}
.fade-leave-active { position: absolute; }
</style>
