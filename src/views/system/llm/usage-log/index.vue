<!-- 使用日志 -->
<template>
  <div class="p-5 space-y-4">
    <!-- 搜索区域 -->
    <Card>
      <CardContent class="pt-5 pb-4">
        <div class="flex flex-wrap items-end gap-3">
          <div class="space-y-1.5">
            <Label class="text-xs">模型名称</Label>
            <Input
              v-model.trim="queryParams.modelName"
              placeholder="模型名称"
              class="w-44 h-8 text-sm"
              @keyup.enter="handleQuery"
            />
          </div>
          <div class="space-y-1.5">
            <Label class="text-xs">API-KEY配置</Label>
            <select
              v-model="queryParams.apiKeyConfigId"
              class="h-8 text-sm border rounded-md px-2 w-36 bg-background"
            >
              <option :value="undefined">全部</option>
              <option v-for="v in apiKeyOptions" :key="v.value" :value="v.value">
                {{ v.label }}
              </option>
            </select>
          </div>
          <div class="space-y-1.5">
            <Label class="text-xs">厂商配置</Label>
            <select
              v-model="queryParams.vendorConfigId"
              class="h-8 text-sm border rounded-md px-2 w-36 bg-background"
            >
              <option :value="undefined">全部</option>
              <option v-for="v in vendorOptions" :key="v.value" :value="v.value">
                {{ v.label }}
              </option>
            </select>
          </div>
          <div class="space-y-1.5">
            <Label class="text-xs">状态</Label>
            <select
              v-model="queryParams.status"
              class="h-8 text-sm border rounded-md px-2 w-28 bg-background"
            >
              <option :value="undefined">全部</option>
              <option :value="1">成功</option>
              <option :value="0">失败</option>
            </select>
          </div>
          <div class="space-y-1.5">
            <Label class="text-xs">开始时间</Label>
            <Input v-model="queryParams.startTime" type="date" class="h-8 text-sm w-36" />
          </div>
          <div class="space-y-1.5">
            <Label class="text-xs">结束时间</Label>
            <Input v-model="queryParams.endTime" type="date" class="h-8 text-sm w-36" />
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
      <CardContent class="pt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>调用时间</TableHead>
              <TableHead>模型</TableHead>
              <TableHead>API-KEY</TableHead>
              <TableHead>输入Token</TableHead>
              <TableHead>输出Token</TableHead>
              <TableHead>费用</TableHead>
              <TableHead>耗时(ms)</TableHead>
              <TableHead class="w-20">状态</TableHead>
              <TableHead>错误信息</TableHead>
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

            <TableRow v-for="row in tableData" v-else :key="row.id" class="cursor-pointer">
              <TableCell class="whitespace-nowrap">{{ row.createTime }}</TableCell>
              <TableCell class="font-medium">{{ row.modelName }}</TableCell>
              <TableCell>{{ row.apiKeyName || "-" }}</TableCell>
              <TableCell>{{ row.inputTokens ?? "-" }}</TableCell>
              <TableCell>{{ row.outputTokens ?? "-" }}</TableCell>
              <TableCell>{{ row.cost != null ? row.cost : "-" }}</TableCell>
              <TableCell>{{ row.durationMs ?? "-" }}</TableCell>
              <TableCell>
                <Badge :variant="row.status === 1 ? 'default' : 'destructive'" class="text-[10px]">
                  {{ row.status === 1 ? "成功" : "失败" }}
                </Badge>
              </TableCell>
              <TableCell class="max-w-48 truncate text-muted-foreground">
                {{ row.errorMessage || "-" }}
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
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { SearchIcon, RotateCcwIcon } from "@lucide/vue";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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

import UsageLogAPI from "@/api/system/llm/usage-log";
import type { UsageLogQueryParams, UsageLogItem } from "@/api/system/llm/usage-log";
import VendorConfigAPI from "@/api/system/llm/vendor-config";
import ApiKeyConfigAPI from "@/api/system/llm/api-key-config";

defineOptions({ name: "LlmUsageLog", inheritAttrs: false });

// ==================== 筛选选项 ====================

interface SelectOption {
  value: string | number;
  label: string;
}

const apiKeyOptions = ref<SelectOption[]>([]);
const vendorOptions = ref<SelectOption[]>([]);

async function loadFilterOptions() {
  try {
    const [vendors, apiKeys] = await Promise.all([
      VendorConfigAPI.getOptions(),
      ApiKeyConfigAPI.getOptions(),
    ]);
    vendorOptions.value = vendors ?? [];
    apiKeyOptions.value = apiKeys ?? [];
  } catch {
    apiKeyOptions.value = [];
    vendorOptions.value = [];
  }
}

// ==================== 查询 ====================

const queryParams = reactive<UsageLogQueryParams>({ pageNum: 1, pageSize: 10 });
const tableData = ref<UsageLogItem[]>([]);
const total = ref(0);
const loading = ref(false);

async function fetchData() {
  loading.value = true;
  try {
    const data = await UsageLogAPI.getPage(queryParams);
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
  queryParams.modelName = undefined;
  queryParams.apiKeyConfigId = undefined;
  queryParams.vendorConfigId = undefined;
  queryParams.status = undefined;
  queryParams.startTime = undefined;
  queryParams.endTime = undefined;
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
  loadFilterOptions();
  handleQuery();
});
</script>
