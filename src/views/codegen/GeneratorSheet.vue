<template>
  <Sheet :open="visible" @update:open="(v) => emit('update:visible', v)">
    <SheetContent class="sm:max-w-5xl overflow-auto">
      <SheetHeader>
        <SheetTitle>{{ title }}</SheetTitle>
      </SheetHeader>

      <!-- 步骤指示器 -->
      <div class="flex items-center gap-2 py-4">
        <template v-for="(step, idx) in steps" :key="idx">
          <button
            class="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors"
            :class="
              currentStep === idx
                ? 'bg-primary text-primary-foreground font-medium'
                : idx < currentStep
                  ? 'bg-primary/10 text-primary cursor-pointer'
                  : 'bg-muted text-muted-foreground'
            "
            @click="idx < currentStep && (currentStep = idx)"
          >
            <component :is="step.icon" class="size-4" />
            {{ step.label }}
          </button>
          <ChevronRightIcon v-if="idx < steps.length - 1" class="size-4 text-muted-foreground" />
        </template>
      </div>

      <!-- 加载状态 -->
      <div v-if="generating" class="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2Icon class="size-8 animate-spin text-primary" />
        <p class="text-muted-foreground">{{ t("codegen.generating") }}</p>
      </div>

      <!-- Step 1: 基础配置 -->
      <div v-else-if="currentStep === 0" class="space-y-4">
        <!-- 表信息 -->
        <Card>
          <CardContent class="pt-5 space-y-3">
            <h3 class="text-sm font-semibold text-muted-foreground">
              {{ t("codegen.tableInfo") }}
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <Label>{{ t("codegen.tableNameLabel") }}</Label>
                <Input :model-value="config.tableName" disabled class="bg-muted" />
              </div>
              <div class="space-y-1.5">
                <Label>
                  {{ t("codegen.businessName") }}
                  <span class="text-destructive">*</span>
                </Label>
                <Input
                  v-model="config.businessName!"
                  :placeholder="t('codegen.businessNamePlaceholder')"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- 包信息 -->
        <Card>
          <CardContent class="pt-5 space-y-3">
            <h3 class="text-sm font-semibold text-muted-foreground">
              {{ t("codegen.packageInfo") }}
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <Label>{{ t("codegen.packageName") }}</Label>
                <Input
                  v-model="config.packageName!"
                  :placeholder="t('codegen.packageNamePlaceholder')"
                />
              </div>
              <div class="space-y-1.5">
                <Label>{{ t("codegen.moduleName") }}</Label>
                <Input
                  v-model="config.moduleName!"
                  :placeholder="t('codegen.moduleNamePlaceholder')"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- 生成配置 -->
        <Card>
          <CardContent class="pt-5 space-y-3">
            <h3 class="text-sm font-semibold text-muted-foreground">
              {{ t("codegen.genConfig") }}
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <Label>
                  {{ t("codegen.entityName") }}
                  <span class="text-destructive">*</span>
                </Label>
                <Input
                  v-model="config.entityName!"
                  :placeholder="t('codegen.entityNamePlaceholder')"
                />
              </div>
              <div class="space-y-1.5">
                <Label>{{ t("codegen.author") }}</Label>
                <Input v-model="config.author!" :placeholder="t('codegen.authorPlaceholder')" />
              </div>
              <div class="space-y-1.5">
                <Label>{{ t("codegen.removePrefix") }}</Label>
                <Input
                  v-model="config.removeTablePrefix!"
                  :placeholder="t('codegen.removePrefixPlaceholder')"
                />
              </div>
              <div class="space-y-1.5">
                <Label>{{ t("codegen.pageType") }}</Label>
                <div class="flex items-center gap-3 pt-1">
                  <label class="flex items-center gap-1.5 cursor-pointer text-sm">
                    <input
                      v-model="config.pageType"
                      type="radio"
                      value="classic"
                      class="accent-primary"
                    />
                    {{ t("codegen.pageTypeClassic") }}
                  </label>
                  <label class="flex items-center gap-1.5 cursor-pointer text-sm">
                    <input
                      v-model="config.pageType"
                      type="radio"
                      value="curd"
                      class="accent-primary"
                    />
                    {{ t("codegen.pageTypeCurd") }}
                  </label>
                </div>
              </div>
            </div>
            <div class="space-y-1.5">
              <Label>{{ t("codegen.parentMenu") }}</Label>
              <Select v-model="config.parentMenuId!">
                <SelectTrigger>
                  <SelectValue :placeholder="t('codegen.parentMenuPlaceholder')" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="opt in menuOptions"
                    :key="String(opt.value)"
                    :value="String(opt.value)"
                  >
                    {{ opt.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <p class="text-xs text-muted-foreground">{{ t("codegen.parentMenuTip") }}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Step 2: 字段配置 -->
      <div v-else-if="currentStep === 1" class="space-y-3">
        <!-- 统计 + 批量操作 -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3 text-sm">
            <Badge variant="outline">{{ t("codegen.fieldTotal") }}: {{ fields.length }}</Badge>
            <Badge variant="outline" class="text-green-600">
              {{ t("codegen.fieldQuery") }}: {{ queryCount }}
            </Badge>
            <Badge variant="outline" class="text-yellow-600">
              {{ t("codegen.fieldList") }}: {{ listCount }}
            </Badge>
            <Badge variant="outline" class="text-blue-600">
              {{ t("codegen.fieldForm") }}: {{ formCount }}
            </Badge>
          </div>
          <div class="flex items-center gap-1">
            <Button variant="outline" size="sm" @click="batchSet('query', 1)">
              {{ t("codegen.queryLabel") }}{{ t("codegen.selectAll") }}
            </Button>
            <Button variant="outline" size="sm" @click="batchSet('query', 0)">
              {{ t("codegen.queryLabel") }}{{ t("codegen.deselectAll") }}
            </Button>
            <Button variant="outline" size="sm" @click="batchSet('list', 1)">
              {{ t("codegen.listLabel") }}{{ t("codegen.selectAll") }}
            </Button>
            <Button variant="outline" size="sm" @click="batchSet('list', 0)">
              {{ t("codegen.listLabel") }}{{ t("codegen.deselectAll") }}
            </Button>
            <Button variant="outline" size="sm" @click="batchSet('form', 1)">
              {{ t("codegen.formLabel") }}{{ t("codegen.selectAll") }}
            </Button>
            <Button variant="outline" size="sm" @click="batchSet('form', 0)">
              {{ t("codegen.formLabel") }}{{ t("codegen.deselectAll") }}
            </Button>
          </div>
        </div>

        <!-- 字段表格 -->
        <div class="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-32">{{ t("codegen.columnName") }}</TableHead>
                <TableHead class="w-28">{{ t("codegen.columnType") }}</TableHead>
                <TableHead class="w-28">{{ t("codegen.fieldName") }}</TableHead>
                <TableHead>{{ t("codegen.fieldComment") }}</TableHead>
                <TableHead class="w-14 text-center">{{ t("codegen.queryLabel") }}</TableHead>
                <TableHead class="w-28">{{ t("codegen.queryTypeLabel") }}</TableHead>
                <TableHead class="w-14 text-center">{{ t("codegen.listLabel") }}</TableHead>
                <TableHead class="w-14 text-center">{{ t("codegen.formLabel") }}</TableHead>
                <TableHead class="w-28">{{ t("codegen.formTypeLabel") }}</TableHead>
                <TableHead class="w-14 text-center">{{ t("codegen.requiredLabel") }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="fields.length === 0">
                <TableCell :colspan="10" class="h-20 text-center text-muted-foreground">
                  {{ t("codegen.noFields") }}
                </TableCell>
              </TableRow>
              <TableRow v-for="(field, idx) in fields" :key="idx" class="hover:bg-muted/50">
                <TableCell class="font-mono text-xs">{{ field.columnName }}</TableCell>
                <TableCell class="text-xs text-muted-foreground">{{ field.columnType }}</TableCell>
                <TableCell class="text-sm">{{ field.fieldName }}</TableCell>
                <TableCell class="text-sm">{{ field.fieldComment }}</TableCell>
                <TableCell class="text-center">
                  <input
                    v-model="field.isShowInQuery"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    class="size-4 rounded accent-primary"
                  />
                </TableCell>
                <TableCell>
                  <Select
                    :model-value="String(field.queryType)"
                    @update:model-value="(v: any) => (field.queryType = Number(v))"
                  >
                    <SelectTrigger class="h-7 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="qt in queryTypeOptions"
                        :key="String(qt.value)"
                        :value="String(qt.value)"
                      >
                        {{ qt.label }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell class="text-center">
                  <input
                    v-model="field.isShowInList"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    class="size-4 rounded accent-primary"
                  />
                </TableCell>
                <TableCell class="text-center">
                  <input
                    v-model="field.isShowInForm"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    class="size-4 rounded accent-primary"
                  />
                </TableCell>
                <TableCell>
                  <Select
                    :model-value="String(field.formType)"
                    @update:model-value="(v: any) => (field.formType = Number(v))"
                  >
                    <SelectTrigger class="h-7 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="ft in formTypeOptions"
                        :key="String(ft.value)"
                        :value="String(ft.value)"
                      >
                        {{ ft.label }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell class="text-center">
                  <input
                    v-model="field.isRequired"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    class="size-4 rounded accent-primary"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <!-- Step 3: 预览 -->
      <div v-else-if="currentStep === 2" class="space-y-3">
        <!-- 工具栏 -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <label
              v-for="s in scopeOptions"
              :key="s.value"
              class="flex items-center gap-1.5 cursor-pointer text-sm"
            >
              <input v-model="previewScope" type="radio" :value="s.value" class="accent-primary" />
              {{ s.label }}
            </label>
          </div>
          <div class="flex items-center gap-2">
            <Button variant="outline" size="sm" @click="handleCopyCode">
              <CopyIcon class="size-3.5 mr-1" />
              {{ t("codegen.copyCode") }}
            </Button>
            <Button size="sm" @click="handleDownloadZip">
              <DownloadIcon class="size-3.5 mr-1" />
              {{ t("codegen.downloadZip") }}
            </Button>
          </div>
        </div>

        <div v-if="previewFiles.length === 0" class="py-16 text-center text-muted-foreground">
          {{ t("codegen.noPreview") }}
        </div>

        <div v-else class="flex border rounded-md overflow-hidden" style="height: 500px">
          <!-- 文件树 -->
          <div class="w-64 border-r overflow-auto bg-muted/30 shrink-0">
            <div class="p-2 text-xs font-semibold text-muted-foreground border-b">
              {{ t("codegen.fileTree") }} ({{ filteredPreviewFiles.length }}
              {{ t("codegen.files") }})
            </div>
            <div class="p-1">
              <button
                v-for="file in filteredPreviewFiles"
                :key="file.path"
                class="w-full text-left px-2 py-1.5 rounded text-xs hover:bg-muted transition-colors flex items-center gap-1.5"
                :class="{
                  'bg-primary/10 text-primary font-medium': selectedFile?.path === file.path,
                }"
                @click="selectedFile = file"
              >
                <Badge
                  variant="outline"
                  class="text-[10px] px-1 py-0 h-4"
                  :class="file.scope === 'frontend' ? 'text-green-600' : 'text-orange-500'"
                >
                  {{ file.scope === "frontend" ? "FE" : "BE" }}
                </Badge>
                <span class="truncate">{{ file.fileName }}</span>
              </button>
            </div>
          </div>

          <!-- 代码预览 -->
          <div class="flex-1 overflow-auto">
            <div v-if="selectedFile" class="h-full flex flex-col">
              <div class="px-3 py-1.5 border-b bg-muted/50 flex items-center gap-2 shrink-0">
                <span class="text-xs font-mono text-muted-foreground truncate">
                  {{ selectedFile.path }}
                </span>
                <Badge variant="outline" class="text-[10px] px-1 py-0 h-4 shrink-0">
                  {{ selectedFile.language.toUpperCase() }}
                </Badge>
              </div>
              <pre
                class="flex-1 p-3 text-xs font-mono overflow-auto whitespace-pre-wrap"
              ><code>{{ selectedFile.content }}</code></pre>
            </div>
            <div
              v-else
              class="h-full flex items-center justify-center text-muted-foreground text-sm"
            >
              {{ t("codegen.noFileSelected") }}
            </div>
          </div>
        </div>
      </div>

      <!-- 底部按钮 -->
      <SheetFooter class="mt-4">
        <div class="flex items-center justify-between w-full">
          <Button v-if="currentStep > 0" variant="outline" @click="currentStep--">
            {{ t("codegen.prev") }}
          </Button>
          <span v-else />
          <div class="flex items-center gap-2">
            <Button variant="outline" @click="emit('update:visible', false)">
              {{ t("codegen.cancel") }}
            </Button>
            <Button v-if="currentStep < 2" @click="handleNext">{{ t("codegen.next") }}</Button>
          </div>
        </div>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import {
  ChevronRightIcon,
  SettingsIcon,
  LayoutGridIcon,
  EyeIcon,
  CopyIcon,
  DownloadIcon,
  Loader2Icon,
} from "@lucide/vue";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getGenConfig,
  saveGenConfig,
  getPreviewData,
  downloadZip,
  getMenuOptions,
} from "@/api/codegen";
import type { GenConfigForm, GeneratorPreviewItem } from "@/api/codegen/types";
import type { OptionItem } from "@/api/common";
import { formTypeOptions, queryTypeOptions } from "@/enums/codegen";

const props = defineProps<{
  visible: boolean;
  title: string;
  tableName: string;
}>();

const emit = defineEmits<{
  "update:visible": [value: boolean];
}>();

const { t } = useI18n();

const currentStep = ref(0);
const generating = ref(false);

const steps = [
  { label: t("codegen.stepBasic"), icon: SettingsIcon },
  { label: t("codegen.stepField"), icon: LayoutGridIcon },
  { label: t("codegen.stepPreview"), icon: EyeIcon },
];

// ==================== 基础配置 ====================

const config = reactive<GenConfigForm>({});
const menuOptions = ref<OptionItem[]>([]);

async function loadConfig(tableName: string) {
  const data = await getGenConfig(tableName);
  Object.assign(config, data);
  menuOptions.value = await getMenuOptions();
}

// ==================== 字段配置 ====================

const fields = computed(() => config.fieldConfigs ?? []);

const queryCount = computed(() => fields.value.filter((f) => f.isShowInQuery === 1).length);
const listCount = computed(() => fields.value.filter((f) => f.isShowInList === 1).length);
const formCount = computed(() => fields.value.filter((f) => f.isShowInForm === 1).length);

function batchSet(target: "query" | "list" | "form", value: number) {
  const fieldKey =
    target === "query" ? "isShowInQuery" : target === "list" ? "isShowInList" : "isShowInForm";
  config.fieldConfigs?.forEach((f) => {
    f[fieldKey] = value;
  });
}

// ==================== 预览 ====================

const previewFiles = ref<GeneratorPreviewItem[]>([]);
const selectedFile = ref<GeneratorPreviewItem | null>(null);
const previewScope = ref<"all" | "frontend" | "backend">("all");

const scopeOptions = computed(() => [
  { value: "all", label: t("codegen.scopeAll") },
  { value: "frontend", label: t("codegen.scopeFrontend") },
  { value: "backend", label: t("codegen.scopeBackend") },
]);

const filteredPreviewFiles = computed(() => {
  if (previewScope.value === "all") return previewFiles.value;
  return previewFiles.value.filter((f) => f.scope === previewScope.value);
});

async function loadPreview(tableName: string) {
  previewFiles.value = await getPreviewData(
    tableName,
    config.pageType as "classic" | "curd" | undefined
  );
  selectedFile.value = previewFiles.value[0] ?? null;
}

function handleCopyCode() {
  if (!selectedFile.value) return;
  navigator.clipboard.writeText(selectedFile.value.content).then(() => {
    toast.success(t("codegen.copySuccess"));
  });
}

async function handleDownloadZip() {
  try {
    await downloadZip(props.tableName, config.pageType as "classic" | "curd" | undefined);
    toast.success(t("codegen.downloadSuccess"));
  } catch {
    toast.error(t("codegen.downloadFailed"));
  }
}

// ==================== 步骤切换 ====================

async function handleNext() {
  if (currentStep.value === 0) {
    // 验证基础配置
    if (!config.businessName) {
      toast.error(t("codegen.businessNameRequired"));
      return;
    }
    if (!config.entityName) {
      toast.error(t("codegen.entityNameRequired"));
      return;
    }
    currentStep.value = 1;
  } else if (currentStep.value === 1) {
    // 保存配置 → 生成预览
    generating.value = true;
    try {
      await saveGenConfig(props.tableName, { ...config });
      await loadPreview(props.tableName);
      currentStep.value = 2;
    } finally {
      generating.value = false;
    }
  }
}

// ==================== 监听 ====================

watch(
  () => props.visible,
  (v) => {
    if (v && props.tableName) {
      currentStep.value = 0;
      generating.value = false;
      previewFiles.value = [];
      selectedFile.value = null;
      loadConfig(props.tableName);
    }
  }
);
</script>
