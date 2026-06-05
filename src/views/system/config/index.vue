<template>
  <div class="p-5 space-y-4">
    <!-- 搜索区域 -->
    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center gap-3 flex-wrap">
          <Input
            v-model.trim="queryParams.keywords"
            :placeholder="t('config.keywordPlaceholder')"
            class="w-60"
            @keyup.enter="handleQuery"
          />
          <Button @click="handleQuery">{{ t("config.search") }}</Button>
          <Button variant="outline" @click="handleResetQuery">{{ t("config.reset") }}</Button>
        </div>
      </CardContent>
    </Card>

    <!-- 表格区域 -->
    <Card>
      <CardContent class="pt-6">
        <!-- 工具栏 -->
        <div class="flex items-center gap-2 mb-4">
          <Button @click="handleCreate">{{ t("config.add") }}</Button>
          <Button variant="outline" @click="handleRefreshCache">
            {{ t("config.refreshCache") }}
          </Button>
        </div>

        <!-- 表格 -->
        <div class="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-14 text-center">{{ t("config.index") }}</TableHead>
                <TableHead>{{ t("config.configName") }}</TableHead>
                <TableHead>{{ t("config.configKey") }}</TableHead>
                <TableHead>{{ t("config.configValue") }}</TableHead>
                <TableHead>{{ t("config.remark") }}</TableHead>
                <TableHead class="text-center w-36">{{ t("config.action") }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="loading">
                <TableCell :colspan="6" class="h-24 text-center text-muted-foreground">
                  {{ t("config.loading") }}
                </TableCell>
              </TableRow>
              <TableRow v-else-if="pageData.length === 0">
                <TableCell :colspan="6" class="h-24 text-center text-muted-foreground">
                  {{ t("config.noData") }}
                </TableCell>
              </TableRow>
              <TableRow v-for="(item, idx) in pageData" :key="item.id" class="hover:bg-muted/50">
                <TableCell class="text-center text-muted-foreground">
                  {{ (queryParams.pageNum - 1) * queryParams.pageSize + idx + 1 }}
                </TableCell>
                <TableCell class="font-medium">{{ item.configName }}</TableCell>
                <TableCell>
                  <Badge variant="outline">{{ item.configKey }}</Badge>
                </TableCell>
                <TableCell>
                  <code class="text-sm bg-muted px-1.5 py-0.5 rounded">{{ item.configValue }}</code>
                </TableCell>
                <TableCell class="text-muted-foreground text-sm">{{ item.remark }}</TableCell>
                <TableCell class="text-center">
                  <div class="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      class="h-7 text-xs"
                      @click="handleEdit(item.id)"
                    >
                      {{ t("config.edit") }}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="h-7 text-xs text-destructive hover:text-destructive"
                      @click="handleDelete(item.id)"
                    >
                      {{ t("config.delete") }}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <!-- 分页 -->
        <div v-if="total > 0" class="flex items-center justify-between mt-4">
          <p class="text-sm text-muted-foreground">共 {{ total }} 条</p>
          <div class="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              :disabled="queryParams.pageNum <= 1"
              @click="goPage(queryParams.pageNum - 1)"
            >
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
            <Button
              variant="outline"
              size="sm"
              :disabled="queryParams.pageNum >= totalPages"
              @click="goPage(queryParams.pageNum + 1)"
            >
              &gt;
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 新增/编辑弹窗 -->
    <Dialog
      :open="dialogVisible"
      @update:open="
        (v) => {
          if (!v) closeDialog();
        }
      "
    >
      <DialogContent class="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{{ dialogTitle }}</DialogTitle>
        </DialogHeader>
        <div class="space-y-4 py-2">
          <div class="space-y-2">
            <Label>
              {{ t("config.configName") }}
              <span class="text-destructive">*</span>
            </Label>
            <Input
              v-model.trim="formData.configName"
              :placeholder="t('config.configNamePlaceholder')"
              :maxlength="50"
            />
          </div>
          <div class="space-y-2">
            <Label>
              {{ t("config.configKey") }}
              <span class="text-destructive">*</span>
            </Label>
            <Input
              v-model.trim="formData.configKey"
              :placeholder="t('config.configKeyPlaceholder')"
              :maxlength="50"
            />
          </div>
          <div class="space-y-2">
            <Label>
              {{ t("config.configValue") }}
              <span class="text-destructive">*</span>
            </Label>
            <Input
              v-model.trim="formData.configValue"
              :placeholder="t('config.configValuePlaceholder')"
              :maxlength="100"
            />
          </div>
          <div class="space-y-2">
            <Label>{{ t("config.remark") }}</Label>
            <Textarea
              v-model="formData.remark"
              :placeholder="t('config.remarkPlaceholder')"
              rows="3"
              :maxlength="100"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="closeDialog">{{ t("config.cancel") }}</Button>
          <Button @click="handleSubmit">{{ t("config.confirm") }}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- 删除确认 -->
    <AlertDialog :open="deleteConfirmVisible" @update:open="(v) => (deleteConfirmVisible = v)">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{{ t("config.deleteWarning") }}</AlertDialogTitle>
          <AlertDialogDescription>{{ t("config.deleteConfirm") }}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="deleteConfirmVisible = false">
            {{ t("config.cancel") }}
          </AlertDialogCancel>
          <AlertDialogAction @click="confirmDelete">{{ t("config.confirm") }}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ConfigAPI from "@/api/system/config";
import type { ConfigItem, ConfigForm, ConfigQueryParams } from "@/api/system/config/types";
type ConfigItemWithRemark = ConfigItem & { remark?: string };

const { t } = useI18n();

// ==================== 列表 ====================

const loading = ref(false);
const pageData = ref<ConfigItemWithRemark[]>([]);
const total = ref(0);

const queryParams = reactive<ConfigQueryParams>({
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

async function fetchList() {
  loading.value = true;
  try {
    const result = await ConfigAPI.getPage(queryParams);
    pageData.value = result.list;
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

// ==================== 新增/编辑弹窗 ====================

const dialogVisible = ref(false);
const dialogTitle = ref("");

const formData = reactive<ConfigForm>({
  configName: "",
  configKey: "",
  configValue: "",
  remark: "",
});

function resetForm() {
  formData.id = undefined;
  formData.configName = "";
  formData.configKey = "";
  formData.configValue = "";
  formData.remark = "";
}

function closeDialog() {
  dialogVisible.value = false;
  resetForm();
}

function handleCreate() {
  dialogTitle.value = t("config.addTitle");
  resetForm();
  dialogVisible.value = true;
}

async function handleEdit(id?: string) {
  if (!id) return;
  dialogTitle.value = t("config.editTitle");
  const data = await ConfigAPI.getFormData(id);
  if (data) Object.assign(formData, data);
  dialogVisible.value = true;
}

async function handleSubmit() {
  if (!formData.configName) {
    toast.error(t("config.configNameRequired"));
    return;
  }
  if (!formData.configKey) {
    toast.error(t("config.configKeyRequired"));
    return;
  }
  if (!formData.configValue) {
    toast.error(t("config.configValueRequired"));
    return;
  }

  if (formData.id) {
    await ConfigAPI.update(formData.id, formData);
    toast.success(t("config.editSuccess"));
  } else {
    await ConfigAPI.create(formData);
    toast.success(t("config.addSuccess"));
  }
  closeDialog();
  handleQuery();
}

// ==================== 删除 ====================

const deleteConfirmVisible = ref(false);
const pendingDeleteId = ref("");

function handleDelete(id?: string) {
  if (!id) return;
  pendingDeleteId.value = id;
  deleteConfirmVisible.value = true;
}

async function confirmDelete() {
  await ConfigAPI.deleteById(pendingDeleteId.value);
  toast.success(t("config.deleteSuccess"));
  deleteConfirmVisible.value = false;
  handleQuery();
}

// ==================== 刷新缓存 ====================

async function handleRefreshCache() {
  await ConfigAPI.refreshCache();
  toast.success(t("config.refreshSuccess"));
}

// ==================== 初始化 ====================

onMounted(() => {
  handleQuery();
});
</script>
