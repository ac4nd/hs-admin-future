<!-- 字典组件示例 -->
<template>
  <div class="p-5 space-y-5">
    <Card>
      <CardHeader><CardTitle class="text-sm">字典组件 - Select 下拉模式</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center gap-3">
          <Label class="w-28 text-sm">性别（String）</Label>
          <Select v-model="stringValue">
            <SelectTrigger class="w-40 h-8">
              <SelectValue placeholder="请选择" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="item in genderOptions" :key="item.value" :value="item.value">
                {{ item.label }}
              </SelectItem>
            </SelectContent>
          </Select>
          <code class="text-xs bg-muted px-2 py-1 rounded">{{ stringValue }}</code>
        </div>

        <div class="flex items-center gap-3">
          <Label class="w-28 text-sm">性别（Number）</Label>
          <Select v-model.number="numberValue">
            <SelectTrigger class="w-40 h-8">
              <SelectValue placeholder="请选择" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="item in genderOptions" :key="item.value" :value="item.value">
                {{ item.label }}
              </SelectItem>
            </SelectContent>
          </Select>
          <code class="text-xs bg-muted px-2 py-1 rounded">{{ numberValue }}</code>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle class="text-sm">字典组件 - Radio 单选模式</CardTitle></CardHeader>
      <CardContent>
        <div class="flex items-center gap-4">
          <Label class="w-28 text-sm">性别</Label>
          <div class="flex items-center gap-3">
            <label
              v-for="item in genderOptions"
              :key="item.value"
              class="flex items-center gap-1.5 cursor-pointer text-sm"
            >
              <input v-model="radioValue" type="radio" :value="item.value" class="accent-primary" />
              {{ item.label }}
            </label>
          </div>
          <code class="text-xs bg-muted px-2 py-1 rounded">{{ radioValue }}</code>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle class="text-sm">字典组件 - Checkbox 多选模式</CardTitle></CardHeader>
      <CardContent>
        <div class="flex items-start gap-4">
          <Label class="w-28 text-sm mt-1">性别（多选）</Label>
          <div class="flex items-center gap-3">
            <label
              v-for="item in genderOptions"
              :key="item.value"
              class="flex items-center gap-1.5 cursor-pointer text-sm"
            >
              <Checkbox
                :checked="arrayValue.includes(item.value)"
                @update:checked="toggleCheck(item.value)"
              />
              {{ item.label }}
            </label>
          </div>
          <code class="text-xs bg-muted px-2 py-1 rounded">{{ JSON.stringify(arrayValue) }}</code>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle class="text-sm">字典标签展示</CardTitle></CardHeader>
      <CardContent>
        <div class="flex flex-wrap items-center gap-3">
          <span v-for="item in genderOptions" :key="item.value" class="flex items-center gap-1.5">
            <Badge :variant="item.tagVariant" class="text-[10px]">{{ item.label }}</Badge>
            <code class="text-xs text-muted-foreground">{{ item.value }}</code>
          </span>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DictOption {
  value: number;
  label: string;
  tagVariant: "default" | "secondary" | "destructive" | "outline";
}

const genderOptions: DictOption[] = [
  { value: 1, label: "男", tagVariant: "default" },
  { value: 2, label: "女", tagVariant: "secondary" },
  { value: 0, label: "保密", tagVariant: "outline" },
];

const stringValue = ref("1");
const numberValue = ref(1);
const radioValue = ref(1);
const arrayValue = ref<number[]>([1, 2]);

function toggleCheck(val: number) {
  const idx = arrayValue.value.indexOf(val);
  if (idx >= 0) arrayValue.value.splice(idx, 1);
  else arrayValue.value.push(val);
}
</script>
