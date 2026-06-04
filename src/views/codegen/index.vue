<template>
  <div class="p-5 space-y-4">
    <!-- 搜索区域 -->
    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center gap-3 flex-wrap">
          <Input
            v-model="queryParams.keywords"
            :placeholder="t('codegen.keywordPlaceholder')"
            class="w-60"
            @keyup.enter="handleQuery"
          />
          <Button @click="handleQuery">{{ t('codegen.search') }}</Button>
          <Button variant="outline" @click="handleResetQuery">{{ t('codegen.reset') }}</Button>
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
                <TableHead class="min-w-[160px]">{{ t('codegen.tableName') }}</TableHead>
                <TableHead>{{ t('codegen.tableComment') }}</TableHead>
                <TableHead class="w-28">{{ t('codegen.engine') }}</TableHead>
                <TableHead class="w-44">{{ t('codegen.collation') }}</TableHead>
                <TableHead class="w-20 text-center">{{ t('codegen.configured') }}</TableHead>
                <TableHead class="w-44">{{ t('codegen.createTime') }}</TableHead>
                <TableHead class="w-40 text-center">{{ t('codegen.action') }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="loading">
                <TableCell :colspan="7" class="h-24 text-center text-muted-foreground">
                  {{ t('codegen.loading') }}
                </TableCell>
              </TableRow>
              <TableRow v-else-if="tableList.length === 0">
                <TableCell :colspan="7" class="h-24 text-center text-muted-foreground">
                  {{ t('codegen.noData') }}
                </TableCell>
              </TableRow>
              <TableRow v-for="table in tableList" :key="table.tableName" class="hover:bg-muted/50">
                <TableCell class="font-mono text-sm">{{ table.tableName }}</TableCell>
                <TableCell>{{ table.tableComment || '-' }}</TableCell>
                <TableCell class="text-sm text-muted-foreground">{{ table.engine }}</TableCell>
                <TableCell class="text-sm text-muted-foreground">{{ table.tableCollation }}</TableCell>
                <TableCell class="text-center">
                  <Badge :variant="table.isConfigured === 1 ? 'default' : 'secondary'">
                    {{ table.isConfigured === 1 ? t('codegen.configured') : t('codegen.notConfigured') }}
                  </Badge>
                </TableCell>
                <TableCell class="text-sm text-muted-foreground">{{ table.createTime }}</TableCell>
                <TableCell class="text-center">
                  <div class="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="sm" class="h-7 text-xs" @click="handleOpenSheet(table.tableName)">
                      {{ t('codegen.generate') }}
                    </Button>
                    <Button
                      v-if="table.isConfigured === 1"
                      variant="ghost"
                      size="sm"
                      class="h-7 text-xs text-destructive hover:text-destructive"
                      @click="handleResetConfig(table.tableName)"
                    >
                      {{ t('codegen.resetConfig') }}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <!-- 分页 -->
        <div v-if="total > 0" class="flex items-center justify-between mt-4">
          <p class="text-sm text-muted-foreground">{{ t('codegen.total', { count: total }) }}</p>
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

    <!-- 重置确认 -->
    <AlertDialog :open="resetConfirmVisible" @update:open="(v) => resetConfirmVisible = v">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{{ t('codegen.resetWarning') }}</AlertDialogTitle>
          <AlertDialogDescription>{{ t('codegen.resetConfirm') }}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="resetConfirmVisible = false">{{ t('codegen.cancel') }}</AlertDialogCancel>
          <AlertDialogAction @click="confirmReset">{{ t('codegen.confirm') }}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <!-- 代码生成向导 -->
    <GeneratorSheet
      v-model:visible="sheetVisible"
      :title="sheetTitle"
      :table-name="sheetTableName"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getTablePage, resetGenConfig } from "@/api/codegen";
import type { TableItem, TableQuery } from "@/api/codegen/types";
import GeneratorSheet from "./GeneratorSheet.vue";

const { t } = useI18n();

const loading = ref(false);
const tableList = ref<TableItem[]>([]);
const total = ref(0);

const queryParams = reactive<TableQuery>({
  pageNum: 1,
  pageSize: 10,
  keywords: "",
});

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
    const result = getTablePage(queryParams);
    tableList.value = result.list;
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
  handleQuery();
}

// 代码生成向导
const sheetVisible = ref(false);
const sheetTitle = ref("");
const sheetTableName = ref("");

function handleOpenSheet(tableName: string) {
  sheetTableName.value = tableName;
  sheetTitle.value = `${t("codegen.generate")} - ${tableName}`;
  sheetVisible.value = true;
}

// 重置配置
const resetConfirmVisible = ref(false);
const pendingResetTable = ref("");

function handleResetConfig(tableName: string) {
  pendingResetTable.value = tableName;
  resetConfirmVisible.value = true;
}

function confirmReset() {
  resetGenConfig(pendingResetTable.value);
  toast.success(t("codegen.resetSuccess"));
  resetConfirmVisible.value = false;
  fetchList();
}

onMounted(() => {
  fetchList();
});
</script>
