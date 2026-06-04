<template>
  <div class="p-5 space-y-5">
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle class="text-sm">字典实时同步演示</CardTitle>
          <Badge :variant="syncConnected ? 'default' : 'destructive'" class="text-[10px]">
            {{ syncConnected ? '已连接' : '未连接' }}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div class="p-3 mb-4 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400 text-sm">
          本示例展示字典数据实时同步的效果。编辑字典项后，其他组件将自动刷新数据。
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <!-- 编辑区 -->
          <Card>
            <CardHeader class="pb-3">
              <div class="flex items-center justify-between">
                <CardTitle class="text-sm">编辑字典项</CardTitle>
                <Button variant="outline" size="sm" @click="resetForm">重置</Button>
              </div>
            </CardHeader>
            <CardContent class="space-y-3">
              <div class="space-y-1.5">
                <Label class="text-xs">字典编码</Label>
                <Input :model-value="dictForm.dictCode" disabled class="h-8 bg-muted" />
              </div>
              <div class="space-y-1.5">
                <Label class="text-xs">字典标签 <span class="text-destructive">*</span></Label>
                <Input v-model="dictForm.label" placeholder="请输入标签" class="h-8" />
              </div>
              <div class="space-y-1.5">
                <Label class="text-xs">字典值</Label>
                <Input :model-value="dictForm.value" disabled class="h-8 bg-muted" />
              </div>
              <div class="space-y-1.5">
                <Label class="text-xs">标签颜色</Label>
                <Select v-model="dictForm.tagType">
                  <SelectTrigger class="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="opt in tagTypeOptions" :key="opt.value" :value="opt.value">
                      <Badge :variant="opt.variant" class="text-[10px]">{{ opt.label }}</Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="space-y-1.5">
                <Label class="text-xs">排序</Label>
                <Input v-model.number="dictForm.sort" type="number" class="h-8" />
              </div>
              <div class="flex gap-2 pt-2">
                <Button size="sm" @click="saveDict">保存</Button>
                <Button variant="outline" size="sm" @click="resetForm">重置</Button>
              </div>
            </CardContent>
          </Card>

          <!-- 组件展示区 -->
          <Card>
            <CardHeader class="pb-3">
              <div class="flex items-center justify-between">
                <CardTitle class="text-sm">字典组件展示</CardTitle>
                <Button variant="outline" size="sm" @click="refreshComponent">手动刷新</Button>
              </div>
            </CardHeader>
            <CardContent class="space-y-4">
              <div>
                <p class="text-sm font-medium mb-2">Radio 单选</p>
                <div class="flex items-center gap-3">
                  <label
                    v-for="item in dictItems"
                    :key="item.value"
                    class="flex items-center gap-1.5 cursor-pointer text-sm"
                  >
                    <input type="radio" :value="item.value" v-model="selectedValue" class="accent-primary" />
                    {{ item.label }}
                  </label>
                </div>
              </div>
              <div>
                <p class="text-sm font-medium mb-2">标签展示</p>
                <div class="flex flex-wrap gap-2">
                  <Badge
                    v-for="item in dictItems"
                    :key="item.value"
                    :variant="tagVariantMap[item.tagType] || 'outline'"
                    class="text-[10px]"
                  >
                    {{ item.label }}
                  </Badge>
                </div>
              </div>
              <div>
                <p class="text-sm font-medium mb-2">Select 下拉</p>
                <Select v-model="selectedValue">
                  <SelectTrigger class="h-8 w-40">
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="item in dictItems" :key="item.value" :value="item.value">
                      {{ item.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="pt-3 border-t text-xs text-muted-foreground space-y-1">
                <div>已选择：{{ selectedValue }}</div>
                <div>最后更新：{{ lastUpdateTime }}</div>
              </div>
            </CardContent>
          </Card>

          <!-- 缓存数据 -->
          <Card>
            <CardHeader class="pb-3">
              <div class="flex items-center justify-between">
                <CardTitle class="text-sm">缓存数据</CardTitle>
                <Badge variant="outline" class="text-[10px]">
                  {{ dictItems.length }} 项
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <pre class="p-3 rounded-lg bg-muted/50 text-xs font-mono overflow-auto max-h-[400px] whitespace-pre-wrap">{{ JSON.stringify(dictItems, null, 2) }}</pre>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { toast } from "vue-sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DictItem {
  value: string;
  label: string;
  tagType: string;
  sort: number;
}

const tagTypeOptions = [
  { value: "default", label: "default", variant: "default" as const },
  { value: "success", label: "success", variant: "default" as const },
  { value: "warning", label: "warning", variant: "secondary" as const },
  { value: "danger", label: "danger", variant: "destructive" as const },
  { value: "info", label: "info", variant: "outline" as const },
];

const tagVariantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  default: "default",
  success: "default",
  warning: "secondary",
  danger: "destructive",
  info: "outline",
};

const defaultDictItems: DictItem[] = [
  { value: "1", label: "男", tagType: "default", sort: 1 },
  { value: "2", label: "女", tagType: "secondary", sort: 2 },
  { value: "0", label: "保密", tagType: "outline", sort: 3 },
];

const dictItems = ref<DictItem[]>([...defaultDictItems]);
const selectedValue = ref("1");
const lastUpdateTime = ref("-");
const syncConnected = ref(true);

const dictForm = reactive({
  dictCode: "gender",
  label: "男",
  value: "1",
  tagType: "default",
  sort: 1,
});

let syncTimer: ReturnType<typeof setInterval> | null = null;

function resetForm() {
  const male = dictItems.value.find((d) => d.value === "1");
  if (male) {
    dictForm.label = male.label;
    dictForm.tagType = male.tagType;
    dictForm.sort = male.sort;
  }
}

function saveDict() {
  if (!dictForm.label.trim()) {
    toast.error("请输入标签名称");
    return;
  }
  const idx = dictItems.value.findIndex((d) => d.value === dictForm.value);
  if (idx >= 0) {
    dictItems.value[idx] = {
      value: dictForm.value,
      label: dictForm.label,
      tagType: dictForm.tagType,
      sort: dictForm.sort,
    };
  }
  lastUpdateTime.value = new Date().toLocaleString("zh-CN");
  toast.success("保存成功，字典数据已同步");
}

function refreshComponent() {
  toast.success("字典组件已刷新");
}

onMounted(() => {
  lastUpdateTime.value = new Date().toLocaleString("zh-CN");
  syncTimer = setInterval(() => {
    syncConnected.value = Math.random() > 0.05;
  }, 5000);
});

onUnmounted(() => {
  if (syncTimer) clearInterval(syncTimer);
});
</script>
