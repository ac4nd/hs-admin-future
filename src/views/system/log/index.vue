<template>
  <div class="p-5 space-y-4">
    <!-- 搜索区域 -->
    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center gap-3 flex-wrap">
          <Input
            v-model="queryParams.keywords"
            :placeholder="t('log.keywordPlaceholder')"
            class="w-60"
            @keyup.enter="handleQuery"
          />
          <div class="flex items-center gap-1.5">
            <Input
              v-model="startDate"
              type="date"
              class="w-40"
              :placeholder="t('log.startDate')"
            />
            <span class="text-muted-foreground">~</span>
            <Input
              v-model="endDate"
              type="date"
              class="w-40"
              :placeholder="t('log.endDate')"
            />
          </div>
          <Button @click="handleQuery">{{ t('log.search') }}</Button>
          <Button variant="outline" @click="handleResetQuery">{{ t('log.reset') }}</Button>
        </div>
      </CardContent>
    </Card>

    <!-- 表格区域 -->
    <Card>
      <CardContent class="pt-6">
        <div class="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="min-w-[180px]">{{ t('log.logTitle') }}</TableHead>
                <TableHead class="w-20 text-center">{{ t('log.status') }}</TableHead>
                <TableHead class="w-32">{{ t('log.ipAddress') }}</TableHead>
                <TableHead class="min-w-[180px]">{{ t('log.requestUri') }}</TableHead>
                <TableHead class="w-24 text-center">{{ t('log.requestMethod') }}</TableHead>
                <TableHead class="w-28 text-center">{{ t('log.executionTime') }}</TableHead>
                <TableHead class="w-24">{{ t('log.operator') }}</TableHead>
                <TableHead class="w-44">{{ t('log.createTime') }}</TableHead>
                <TableHead class="w-20 text-center">{{ t('log.action') }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="loading">
                <TableCell :colspan="9" class="h-24 text-center text-muted-foreground">
                  {{ t('log.loading') }}
                </TableCell>
              </TableRow>
              <TableRow v-else-if="logList.length === 0">
                <TableCell :colspan="9" class="h-24 text-center text-muted-foreground">
                  {{ t('log.noData') }}
                </TableCell>
              </TableRow>
              <TableRow
                v-for="log in logList"
                :key="log.id"
                class="hover:bg-muted/50"
              >
                <!-- 操作标题 -->
                <TableCell>
                  <span class="truncate block max-w-[260px]" :title="log.title">
                    {{ log.title || '-' }}
                  </span>
                </TableCell>

                <!-- 状态 -->
                <TableCell class="text-center">
                  <Badge :variant="log.status === 1 ? 'default' : 'destructive'">
                    {{ log.status === 1 ? t('log.statusSuccess') : t('log.statusFail') }}
                  </Badge>
                </TableCell>

                <!-- IP地址 -->
                <TableCell class="text-sm text-muted-foreground">{{ log.ip || '-' }}</TableCell>

                <!-- 请求路径 -->
                <TableCell>
                  <span class="truncate block max-w-[260px] font-mono text-xs text-muted-foreground" :title="log.requestUri">
                    {{ log.requestUri || '-' }}
                  </span>
                </TableCell>

                <!-- 请求方法 -->
                <TableCell class="text-center">
                  <Badge :variant="getMethodVariant(log.requestMethod)" class="font-mono text-xs">
                    {{ log.requestMethod || '-' }}
                  </Badge>
                </TableCell>

                <!-- 执行时间 -->
                <TableCell class="text-center text-sm">
                  <span :class="log.executionTime && log.executionTime > 1000 ? 'text-destructive font-medium' : 'text-muted-foreground'">
                    {{ log.executionTime ?? '-' }}
                  </span>
                </TableCell>

                <!-- 操作人 -->
                <TableCell class="text-sm">{{ log.operatorName || '-' }}</TableCell>

                <!-- 操作时间 -->
                <TableCell class="text-sm text-muted-foreground">{{ log.createTime || '-' }}</TableCell>

                <!-- 操作 -->
                <TableCell class="text-center">
                  <Button variant="ghost" size="sm" class="h-7 text-xs" @click="handleDetail(log)">
                    {{ t('log.detail') }}
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <!-- 分页 -->
        <div v-if="total > 0" class="flex items-center justify-between mt-4">
          <p class="text-sm text-muted-foreground">{{ t('log.total', { count: total }) }}</p>
          <div class="flex items-center gap-1">
            <Button variant="outline" size="sm" :disabled="queryParams.pageNum <= 1" @click="goPage(queryParams.pageNum - 1)">
              &lt;
            </Button>
            <Button
              v-for="page in displayedPages"
              :key="page"
              :variant="page === queryParams.pageNum ? 'default' : 'outline'"
              size="sm"
              class="min-w-8"
              @click="goPage(page)"
            >
              {{ page }}
            </Button>
            <Button variant="outline" size="sm" :disabled="queryParams.pageNum >= totalPages" @click="goPage(queryParams.pageNum + 1)">
              &gt;
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 详情弹窗 -->
    <Dialog :open="detailVisible" @update:open="(v) => { if (!v) detailVisible = false }">
      <DialogContent class="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{{ t('log.detailTitle') }}</DialogTitle>
        </DialogHeader>
        <div v-if="detailData" class="space-y-3 py-2">
          <!-- 操作标题 -->
          <div class="grid grid-cols-[100px_1fr] gap-2 items-start">
            <span class="text-sm text-muted-foreground">{{ t('log.logTitle') }}</span>
            <span class="text-sm font-medium">{{ detailData.title || '-' }}</span>
          </div>

          <!-- 状态 + 执行时间 -->
          <div class="grid grid-cols-2 gap-4">
            <div class="grid grid-cols-[100px_1fr] gap-2 items-center">
              <span class="text-sm text-muted-foreground">{{ t('log.status') }}</span>
              <Badge :variant="detailData.status === 1 ? 'default' : 'destructive'">
                {{ detailData.status === 1 ? t('log.statusSuccess') : t('log.statusFail') }}
              </Badge>
            </div>
            <div class="grid grid-cols-[100px_1fr] gap-2 items-center">
              <span class="text-sm text-muted-foreground">{{ t('log.executionTime') }}</span>
              <span class="text-sm">{{ detailData.executionTime }}ms</span>
            </div>
          </div>

          <!-- 操作人 + 操作时间 -->
          <div class="grid grid-cols-2 gap-4">
            <div class="grid grid-cols-[100px_1fr] gap-2 items-center">
              <span class="text-sm text-muted-foreground">{{ t('log.operator') }}</span>
              <span class="text-sm">{{ detailData.operatorName || '-' }}</span>
            </div>
            <div class="grid grid-cols-[100px_1fr] gap-2 items-center">
              <span class="text-sm text-muted-foreground">{{ t('log.createTime') }}</span>
              <span class="text-sm">{{ detailData.createTime || '-' }}</span>
            </div>
          </div>

          <!-- IP + 请求方法 -->
          <div class="grid grid-cols-2 gap-4">
            <div class="grid grid-cols-[100px_1fr] gap-2 items-center">
              <span class="text-sm text-muted-foreground">{{ t('log.ipAddress') }}</span>
              <span class="text-sm">{{ detailData.ip || '-' }}</span>
            </div>
            <div class="grid grid-cols-[100px_1fr] gap-2 items-center">
              <span class="text-sm text-muted-foreground">{{ t('log.requestMethod') }}</span>
              <Badge :variant="getMethodVariant(detailData.requestMethod)" class="font-mono text-xs">
                {{ detailData.requestMethod || '-' }}
              </Badge>
            </div>
          </div>

          <!-- 请求路径 -->
          <div class="grid grid-cols-[100px_1fr] gap-2 items-center">
            <span class="text-sm text-muted-foreground">{{ t('log.requestUri') }}</span>
            <span class="text-sm font-mono">{{ detailData.requestUri || '-' }}</span>
          </div>

          <!-- 浏览器 + 操作系统 -->
          <div class="grid grid-cols-2 gap-4">
            <div class="grid grid-cols-[100px_1fr] gap-2 items-center">
              <span class="text-sm text-muted-foreground">{{ t('log.browser') }}</span>
              <span class="text-sm">{{ detailData.browser || '-' }}</span>
            </div>
            <div class="grid grid-cols-[100px_1fr] gap-2 items-center">
              <span class="text-sm text-muted-foreground">{{ t('log.os') }}</span>
              <span class="text-sm">{{ detailData.os || '-' }}</span>
            </div>
          </div>

          <!-- 自定义内容 -->
          <div class="grid grid-cols-[100px_1fr] gap-2 items-start">
            <span class="text-sm text-muted-foreground">{{ t('log.content') }}</span>
            <div v-if="detailData.content" class="text-sm whitespace-pre-wrap">{{ detailData.content }}</div>
            <span v-else class="text-sm text-muted-foreground">{{ t('log.contentEmpty') }}</span>
          </div>

          <!-- 错误信息 -->
          <div v-if="detailData.errorMsg" class="grid grid-cols-[100px_1fr] gap-2 items-start">
            <span class="text-sm text-muted-foreground">{{ t('log.errorMsg') }}</span>
            <span class="text-sm text-destructive">{{ detailData.errorMsg }}</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="detailVisible = false">{{ t('log.close', '关闭') }}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getLogPage } from "@/api/log";
import type { LogItem, LogQuery } from "@/api/log/types";

const { t } = useI18n();

// ==================== 查询参数 ====================

const queryParams = reactive<LogQuery>({
  pageNum: 1,
  pageSize: 10,
  keywords: "",
});

const startDate = ref("");
const endDate = ref("");

// ==================== 列表 ====================

const loading = ref(false);
const logList = ref<LogItem[]>([]);
const total = ref(0);

const totalPages = computed(() => Math.ceil(total.value / queryParams.pageSize));

const displayedPages = computed(() => {
  const tp = totalPages.value;
  const current = queryParams.pageNum;
  const pages: number[] = [];
  let start = Math.max(1, current - 2);
  const end = Math.min(tp, start + 4);
  start = Math.max(1, end - 4);
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

function goPage(page: number) {
  queryParams.pageNum = page;
  fetchList();
}

function fetchList() {
  loading.value = true;
  try {
    // 构建查询参数
    const params: LogQuery = { ...queryParams };
    if (startDate.value && endDate.value) {
      params.createTime = [startDate.value, endDate.value];
    }
    const result = getLogPage(params);
    logList.value = result.list;
    total.value = result.total;
  } finally {
    loading.value = false;
  }
}

function handleQuery() {
  queryParams.pageNum = 1;
  fetchList();
}

function handleResetQuery() {
  queryParams.keywords = "";
  startDate.value = "";
  endDate.value = "";
  handleQuery();
}

// ==================== 详情 ====================

const detailVisible = ref(false);
const detailData = ref<LogItem | null>(null);

function handleDetail(row: LogItem) {
  detailData.value = row;
  detailVisible.value = true;
}

// ==================== 辅助方法 ====================

/** HTTP 方法对应的 Badge 变体 */
function getMethodVariant(method?: string): "default" | "outline" | "secondary" | "destructive" {
  const map: Record<string, "default" | "outline" | "secondary" | "destructive"> = {
    GET: "outline",
    POST: "default",
    PUT: "secondary",
    DELETE: "destructive",
    PATCH: "outline",
  };
  return map[method?.toUpperCase() ?? ""] ?? "outline";
}

// ==================== 初始化 ====================

onMounted(() => {
  handleQuery();
});
</script>
