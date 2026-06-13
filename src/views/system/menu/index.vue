<template>
  <div class="p-5 space-y-4">
    <!-- 搜索区域 -->
    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center gap-3 flex-wrap">
          <Input
            v-model.trim="queryParams.keywords"
            :placeholder="t('menu.keywordPlaceholder')"
            class="w-60"
            @keyup.enter="handleQuery"
          />
          <Button @click="handleQuery">{{ t("menu.search") }}</Button>
          <Button variant="outline" @click="handleResetQuery">{{ t("menu.reset") }}</Button>
        </div>
      </CardContent>
    </Card>

    <!-- 表格区域 -->
    <Card>
      <CardContent class="pt-6">
        <!-- 工具栏 -->
        <div class="flex items-center gap-2 mb-4">
          <Button @click="handleCreate">{{ t("menu.add") }}</Button>
          <Button variant="outline" size="sm" @click="toggleExpandAll">
            {{ allExpanded ? t("menu.collapse", "收缩") : t("menu.expand", "展开") }}
          </Button>
        </div>

        <!-- 树形表格 -->
        <div class="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="min-w-[200px]">{{ t("menu.menuName") }}</TableHead>
                <TableHead class="w-20 text-center">{{ t("menu.type") }}</TableHead>
                <TableHead class="w-32">{{ t("menu.routeName") }}</TableHead>
                <TableHead class="w-32">{{ t("menu.routePath") }}</TableHead>
                <TableHead class="w-44">{{ t("menu.componentPath") }}</TableHead>
                <TableHead class="w-36">{{ t("menu.permission") }}</TableHead>
                <TableHead v-if="showMenuScope" class="w-20 text-center">
                  {{ t("menu.scope") }}
                </TableHead>
                <TableHead class="w-16 text-center">{{ t("menu.status") }}</TableHead>
                <TableHead class="w-14 text-center">{{ t("menu.sort") }}</TableHead>
                <TableHead class="w-40 text-center">{{ t("menu.action") }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="loading">
                <TableCell :colspan="colspan" class="h-24 text-center text-muted-foreground">
                  {{ t("menu.loading") }}
                </TableCell>
              </TableRow>
              <TableRow v-else-if="flatMenuData.length === 0">
                <TableCell :colspan="colspan" class="h-24 text-center text-muted-foreground">
                  {{ t("menu.noData") }}
                </TableCell>
              </TableRow>
              <TableRow v-for="row in flatMenuData" :key="row.id" class="hover:bg-muted/50">
                <!-- 菜单名称（带缩进和展开图标） -->
                <TableCell>
                  <div class="flex items-center" :style="{ paddingLeft: `${row._level * 24}px` }">
                    <button
                      v-if="row._hasChildren"
                      class="shrink-0 mr-1 p-0.5 rounded hover:bg-muted"
                      @click="toggleExpand(row.id!)"
                    >
                      <ChevronRightIcon
                        class="size-4 transition-transform duration-200"
                        :class="{ 'rotate-90': expandedIds.has(row.id!) }"
                      />
                    </button>
                    <span v-else class="inline-block w-5 shrink-0" />
                    <component
                      :is="resolveIcon(row.icon)"
                      v-if="resolveIcon(row.icon)"
                      class="size-4 mr-1 shrink-0 text-muted-foreground"
                    />
                    <span class="truncate">{{ row.name }}</span>
                  </div>
                </TableCell>

                <!-- 类型 -->
                <TableCell class="text-center">
                  <Badge
                    v-if="row.type === MenuTypeEnum.CATALOG"
                    variant="outline"
                    class="border-yellow-500 text-yellow-600"
                  >
                    {{ t("menu.typeCatalog") }}
                  </Badge>
                  <Badge v-else-if="row.type === MenuTypeEnum.MENU" variant="default">
                    {{ t("menu.typeMenu") }}
                  </Badge>
                  <Badge v-else-if="row.type === MenuTypeEnum.BUTTON" variant="destructive">
                    {{ t("menu.typeButton") }}
                  </Badge>
                </TableCell>

                <!-- 路由名称 -->
                <TableCell class="text-sm text-muted-foreground">
                  {{ row.routeName || "-" }}
                </TableCell>

                <!-- 路由路径 -->
                <TableCell class="text-sm text-muted-foreground">
                  {{ row.routePath || row.path || "-" }}
                </TableCell>

                <!-- 组件路径 -->
                <TableCell class="text-sm text-muted-foreground">
                  {{ row.component || "-" }}
                </TableCell>

                <!-- 权限标识 -->
                <TableCell>
                  <Badge v-if="row.perm" variant="outline" class="font-mono text-xs">
                    {{ row.perm }}
                  </Badge>
                  <span v-else class="text-muted-foreground">-</span>
                </TableCell>

                <!-- 范围 -->
                <TableCell v-if="showMenuScope" class="text-center">
                  <Badge v-if="row.scope === MenuScopeEnum.PLATFORM" variant="destructive">
                    {{ t("menu.scopePlatform") }}
                  </Badge>
                  <Badge v-else variant="default">
                    {{ t("menu.scopeBusiness") }}
                  </Badge>
                </TableCell>

                <!-- 状态 -->
                <TableCell class="text-center">
                  <Badge :variant="row.visible === 1 ? 'default' : 'secondary'">
                    {{ row.visible === 1 ? t("menu.statusShow") : t("menu.statusHide") }}
                  </Badge>
                </TableCell>

                <!-- 排序 -->
                <TableCell class="text-center">{{ row.sort }}</TableCell>

                <!-- 操作 -->
                <TableCell class="text-center">
                  <div class="flex items-center justify-center gap-1">
                    <Button
                      v-if="row.type === MenuTypeEnum.CATALOG || row.type === MenuTypeEnum.MENU"
                      variant="ghost"
                      size="sm"
                      class="h-7 text-xs"
                      @click="handleAddChild(row.id!)"
                    >
                      {{ t("menu.add") }}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="h-7 text-xs"
                      @click="handleEdit(row.id!)"
                    >
                      {{ t("menu.edit") }}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="h-7 text-xs text-destructive hover:text-destructive"
                      @click="handleDelete(row.id!)"
                    >
                      {{ t("menu.delete") }}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>

    <!-- 新增/编辑抽屉 -->
    <Sheet
      :open="dialogVisible"
      @update:open="
        (v) => {
          if (!v) closeDialog();
        }
      "
    >
      <SheetContent class="sm:max-w-xl overflow-auto">
        <SheetHeader>
          <SheetTitle>{{ dialogTitle }}</SheetTitle>
        </SheetHeader>
        <div class="py-4 space-y-4">
          <!-- 父级菜单 -->
          <div class="space-y-2">
            <Label>
              {{ t("menu.parentMenu") }}
              <span class="text-destructive">*</span>
            </Label>
            <TreeSelect
              v-model="formData.parentId!"
              :options="menuOptions"
              :placeholder="t('menu.parentMenuPlaceholder')"
              :top-level-label="t('menu.topLevelMenu')"
            />
          </div>

          <!-- 菜单名称 -->
          <div class="space-y-2">
            <Label>
              {{ t("menu.menuName") }}
              <span class="text-destructive">*</span>
            </Label>
            <Input v-model.trim="formData.name!" :placeholder="t('menu.menuNamePlaceholder')" />
          </div>

          <!-- 菜单类型 -->
          <div class="space-y-2">
            <Label>
              {{ t("menu.menuType") }}
              <span class="text-destructive">*</span>
            </Label>
            <div class="flex items-center gap-4">
              <label
                v-for="item in menuTypeOptions"
                :key="item.value"
                class="flex items-center gap-2 cursor-pointer text-sm"
              >
                <input
                  v-model="formData.type"
                  type="radio"
                  :value="item.value"
                  class="accent-primary"
                  @change="handleMenuTypeChange"
                />
                {{ item.label }}
              </label>
            </div>
          </div>

          <!-- 路由名称 -->
          <div v-if="formData.type === MenuTypeEnum.MENU && !isExternalLink" class="space-y-2">
            <Label>
              {{ t("menu.routeName") }}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <InfoIcon class="inline size-3.5 ml-1 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" class="max-w-xs">
                    <p>{{ t("menu.routeNameTooltip") }}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              v-model.trim="formData.routeName!"
              :placeholder="t('menu.routeNamePlaceholder')"
            />
          </div>

          <!-- 路由路径 -->
          <div
            v-if="formData.type === MenuTypeEnum.CATALOG || formData.type === MenuTypeEnum.MENU"
            class="space-y-2"
          >
            <Label>
              {{ t("menu.routePath") }}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <InfoIcon class="inline size-3.5 ml-1 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" class="max-w-xs">
                    <p>{{ t("menu.routePathTooltip") }}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              v-model.trim="formData.routePath!"
              :placeholder="
                formData.type === MenuTypeEnum.CATALOG
                  ? t('menu.routePathCatalogPlaceholder')
                  : t('menu.routePathMenuPlaceholder')
              "
            />
          </div>

          <!-- 组件路径 -->
          <div v-if="formData.type === MenuTypeEnum.MENU && !isExternalLink" class="space-y-2">
            <Label>
              {{ t("menu.componentPath") }}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <InfoIcon class="inline size-3.5 ml-1 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" class="max-w-xs">
                    <p>{{ t("menu.componentPathTooltip") }}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div class="flex items-center">
              <span
                class="bg-muted px-2 py-1.5 rounded-l-md border border-r-0 text-sm text-muted-foreground whitespace-nowrap"
              >
                src/views/
              </span>
              <Input
                v-model.trim="formData.component!"
                :placeholder="t('menu.componentPathPlaceholder')"
                class="rounded-none"
              />
              <span
                class="bg-muted px-2 py-1.5 rounded-r-md border border-l-0 text-sm text-muted-foreground"
              >
                .vue
              </span>
            </div>
          </div>

          <!-- 路由参数 -->
          <div v-if="formData.type === MenuTypeEnum.MENU && !isExternalLink" class="space-y-2">
            <Label>
              {{ t("menu.routeParams") }}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <InfoIcon class="inline size-3.5 ml-1 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" class="max-w-xs">
                    <p>{{ t("menu.routeParamsTooltip") }}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div v-if="!formData.params || formData.params.length === 0">
              <Button
                variant="outline"
                size="sm"
                @click="formData.params = [{ key: '', value: '' }]"
              >
                {{ t("menu.addParam") }}
              </Button>
            </div>
            <div v-else class="space-y-2">
              <div
                v-for="(item, idx) in formData.params"
                :key="idx"
                class="flex items-center gap-2"
              >
                <Input
                  v-model="item.key!"
                  :placeholder="t('menu.paramKeyPlaceholder')"
                  class="w-32"
                />
                <span class="text-muted-foreground">=</span>
                <Input
                  v-model="item.value!"
                  :placeholder="t('menu.paramValuePlaceholder')"
                  class="w-32"
                />
                <Button
                  v-if="idx === formData.params!.length - 1"
                  variant="ghost"
                  size="icon"
                  class="size-8 shrink-0"
                  @click="formData.params!.push({ key: '', value: '' })"
                >
                  <PlusIcon class="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  class="size-8 shrink-0 text-destructive hover:text-destructive"
                  @click="formData.params!.splice(idx, 1)"
                >
                  <Trash2Icon class="size-4" />
                </Button>
              </div>
            </div>
          </div>

          <!-- 菜单范围 -->
          <div v-if="formData.type !== MenuTypeEnum.BUTTON && showMenuScope" class="space-y-2">
            <Label>{{ t("menu.menuScope") }}</Label>
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  v-model.number="formData.scope"
                  type="radio"
                  :value="MenuScopeEnum.PLATFORM"
                  class="accent-primary"
                />
                {{ t("menu.scopePlatformLabel") }}
              </label>
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  v-model.number="formData.scope"
                  type="radio"
                  :value="MenuScopeEnum.TENANT"
                  class="accent-primary"
                />
                {{ t("menu.scopeBusinessLabel") }}
              </label>
            </div>
          </div>

          <!-- 显示状态 -->
          <div v-if="formData.type !== MenuTypeEnum.BUTTON" class="space-y-2">
            <Label>{{ t("menu.visibleStatus") }}</Label>
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  v-model.number="formData.visible"
                  type="radio"
                  :value="1"
                  class="accent-primary"
                />
                {{ t("menu.statusShow") }}
              </label>
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  v-model.number="formData.visible"
                  type="radio"
                  :value="0"
                  class="accent-primary"
                />
                {{ t("menu.statusHide") }}
              </label>
            </div>
          </div>

          <!-- 始终显示 -->
          <div
            v-if="formData.type === MenuTypeEnum.CATALOG || formData.type === MenuTypeEnum.MENU"
            class="space-y-2"
          >
            <Label>
              {{ t("menu.alwaysShow") }}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <InfoIcon class="inline size-3.5 ml-1 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" class="max-w-xs">
                    <p>{{ t("menu.alwaysShowTooltip") }}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  v-model.number="formData.alwaysShow"
                  type="radio"
                  :value="1"
                  class="accent-primary"
                />
                {{ t("menu.yes") }}
              </label>
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  v-model.number="formData.alwaysShow"
                  type="radio"
                  :value="0"
                  class="accent-primary"
                />
                {{ t("menu.no") }}
              </label>
            </div>
          </div>

          <!-- 缓存页面 -->
          <div v-if="formData.type === MenuTypeEnum.MENU && !isExternalLink" class="space-y-2">
            <Label>{{ t("menu.keepAlive") }}</Label>
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  v-model.number="formData.keepAlive"
                  type="radio"
                  :value="1"
                  class="accent-primary"
                />
                {{ t("menu.keepAliveOn") }}
              </label>
              <label class="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  v-model.number="formData.keepAlive"
                  type="radio"
                  :value="0"
                  class="accent-primary"
                />
                {{ t("menu.keepAliveOff") }}
              </label>
            </div>
          </div>

          <!-- 排序 -->
          <div class="space-y-2">
            <Label>{{ t("menu.sort") }}</Label>
            <Input v-model.number="formData.sort" type="number" min="0" class="w-24" />
          </div>

          <!-- 权限标识 -->
          <div v-if="formData.type === MenuTypeEnum.BUTTON" class="space-y-2">
            <Label>{{ t("menu.permLabel") }}</Label>
            <Input v-model.trim="formData.perm!" :placeholder="t('menu.permPlaceholder')" />
          </div>

          <!-- 图标 -->
          <div v-if="formData.type !== MenuTypeEnum.BUTTON" class="space-y-2">
            <Label>{{ t("menu.iconLabel") }}</Label>
            <Input v-model.trim="formData.icon!" :placeholder="t('menu.iconPlaceholder')" />
          </div>

          <!-- 跳转路由 -->
          <div v-if="formData.type === MenuTypeEnum.CATALOG" class="space-y-2">
            <Label>{{ t("menu.redirectLabel") }}</Label>
            <Input v-model.trim="formData.redirect!" :placeholder="t('menu.redirectPlaceholder')" />
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline" @click="closeDialog">{{ t("menu.cancel") }}</Button>
          <Button @click="handleSubmit">{{ t("menu.confirm") }}</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>

    <!-- 删除确认 -->
    <AlertDialog :open="deleteConfirmVisible" @update:open="(v) => (deleteConfirmVisible = v)">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{{ t("menu.deleteWarning") }}</AlertDialogTitle>
          <AlertDialogDescription>{{ t("menu.deleteConfirm") }}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="deleteConfirmVisible = false">
            {{ t("menu.cancel") }}
          </AlertDialogCancel>
          <AlertDialogAction @click="confirmDelete">{{ t("menu.confirm") }}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import * as LucideIcons from "@lucide/vue";
import { ChevronRightIcon, InfoIcon, PlusIcon, Trash2Icon } from "@lucide/vue";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import MenuAPI from "@/api/system/menu";
import type { MenuItem, MenuForm } from "@/api/system/menu/types";
import type { OptionItem } from "@/api/common";
import { MenuTypeEnum, MenuScopeEnum } from "@/enums/menu";
import { appConfig } from "@/settings";
import { useUserStoreHook } from "@/stores/user";
import { usePermissionStoreHook } from "@/stores/permission";
import TreeSelect from "./TreeSelect.vue";

const { t } = useI18n();

// ==================== 图标解析 ====================

function resolveIcon(name?: string) {
  if (!name) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (LucideIcons as any)[name] || (LucideIcons as any)[`${name}Icon`] || null;
}

// ==================== 列表 ====================

const loading = ref(false);
const menuTableData = ref<MenuItem[]>([]);
const menuOptions = ref<OptionItem[]>([]);
const expandedIds = ref<Set<string>>(new Set());

interface FlatMenuItem extends MenuItem {
  _level: number;
  _hasChildren: boolean;
}

function flattenTree(items: MenuItem[], level = 0): FlatMenuItem[] {
  const result: FlatMenuItem[] = [];
  for (const item of items) {
    const hasChildren = (item.children?.length ?? 0) > 0;
    result.push({ ...item, _level: level, _hasChildren: hasChildren });
    if (hasChildren && expandedIds.value.has(item.id ?? "")) {
      result.push(...flattenTree(item.children!, level + 1));
    }
  }
  return result;
}

const flatMenuData = computed(() => flattenTree(menuTableData.value));
const showMenuScope = computed(() => appConfig.tenantEnabled);
const allExpanded = computed(() => {
  function collectIds(items: MenuItem[]): string[] {
    const ids: string[] = [];
    for (const item of items) {
      if (item.children?.length) {
        ids.push(item.id ?? "");
        ids.push(...collectIds(item.children));
      }
    }
    return ids;
  }
  const allIds = collectIds(menuTableData.value);
  return allIds.length > 0 && allIds.every((id) => expandedIds.value.has(id));
});

const colspan = computed(() => (showMenuScope.value ? 10 : 9));

const queryParams = reactive({ keywords: "" });

function toggleExpand(id: string) {
  const newSet = new Set(expandedIds.value);
  if (newSet.has(id)) {
    newSet.delete(id);
  } else {
    newSet.add(id);
  }
  expandedIds.value = newSet;
}

function toggleExpandAll() {
  if (allExpanded.value) {
    expandedIds.value = new Set();
  } else {
    const ids: string[] = [];
    function collect(items: MenuItem[]) {
      for (const item of items) {
        if (item.children?.length) {
          ids.push(item.id ?? "");
          collect(item.children);
        }
      }
    }
    collect(menuTableData.value);
    expandedIds.value = new Set(ids);
  }
}

async function fetchData() {
  loading.value = true;
  try {
    menuTableData.value = await MenuAPI.getList(queryParams);
  } finally {
    loading.value = false;
  }
}

async function fetchOptions() {
  menuOptions.value = await MenuAPI.getOptions(true);
}

function handleQuery() {
  fetchData();
}

function handleResetQuery() {
  queryParams.keywords = "";
  handleQuery();
}

// ==================== 弹窗 ====================

const dialogVisible = ref(false);
const dialogTitle = ref("");

const formData = reactive<MenuForm>({
  id: undefined,
  parentId: "0",
  name: "",
  type: MenuTypeEnum.MENU,
  path: "",
  routeName: "",
  routePath: "",
  redirect: "",
  component: "",
  icon: "",
  sort: 1,
  visible: 1,
  scope: MenuScopeEnum.TENANT,
  perm: "",
  params: [],
  alwaysShow: 0,
  keepAlive: 1,
});

const menuTypeOptions = computed(() => [
  { value: MenuTypeEnum.CATALOG, label: t("menu.typeCatalog") },
  { value: MenuTypeEnum.MENU, label: t("menu.typeMenu") },
  { value: MenuTypeEnum.BUTTON, label: t("menu.typeButton") },
]);

const isExternalLink = computed(
  () =>
    formData.type === MenuTypeEnum.MENU &&
    !!formData.routePath &&
    /^https?:\/\//.test(formData.routePath)
);

function resetForm() {
  formData.id = undefined;
  formData.parentId = "0";
  formData.name = "";
  formData.type = MenuTypeEnum.MENU;
  formData.path = "";
  formData.routeName = "";
  formData.routePath = "";
  formData.redirect = "";
  formData.component = "";
  formData.icon = "";
  formData.sort = 1;
  formData.visible = 1;
  formData.scope = MenuScopeEnum.TENANT;
  formData.perm = "";
  formData.params = [];
  formData.alwaysShow = 0;
  formData.keepAlive = 1;
}

function closeDialog() {
  dialogVisible.value = false;
  resetForm();
}

function handleCreate() {
  dialogTitle.value = t("menu.addTitle");
  fetchOptions();
  resetForm();
  dialogVisible.value = true;
}

function handleAddChild(parentId: string) {
  dialogTitle.value = t("menu.addTitle");
  fetchOptions();
  resetForm();
  formData.parentId = parentId;
  dialogVisible.value = true;
}

async function handleEdit(id: string) {
  dialogTitle.value = t("menu.editTitle");
  fetchOptions();
  const data = await MenuAPI.getFormData(id);
  if (data) Object.assign(formData, data);
  dialogVisible.value = true;
}

function handleMenuTypeChange() {
  // 切换类型时清理不相关的字段
  if (formData.type === MenuTypeEnum.BUTTON) {
    formData.routePath = "";
    formData.routeName = "";
    formData.component = "";
    formData.redirect = "";
    formData.icon = "";
    formData.params = [];
  } else if (formData.type === MenuTypeEnum.CATALOG) {
    formData.component = "";
    formData.routeName = "";
    formData.perm = "";
    formData.params = [];
  }
}

async function handleSubmit() {
  // 表单验证
  if (!formData.name) {
    toast.error(t("menu.nameRequired"));
    return;
  }
  if (!formData.type) {
    toast.error(t("menu.typeRequired"));
    return;
  }
  if (!formData.parentId) {
    toast.error(t("menu.parentRequired"));
    return;
  }

  // 菜单类型必填路由路径
  if (
    (formData.type === MenuTypeEnum.CATALOG || formData.type === MenuTypeEnum.MENU) &&
    !formData.routePath
  ) {
    toast.error(t("menu.routePathRequired"));
    return;
  }

  // 菜单类型（非外链）必填路由名称
  if (formData.type === MenuTypeEnum.MENU && !isExternalLink.value && !formData.routeName) {
    toast.error(t("menu.routeNameRequired"));
    return;
  }

  // 菜单类型（非外链）必填组件路径
  if (formData.type === MenuTypeEnum.MENU && !isExternalLink.value && !formData.component) {
    toast.error(t("menu.componentRequired"));
    return;
  }

  // 编辑时不能将自己设为父级
  if (formData.id && formData.parentId === formData.id) {
    toast.error(t("menu.parentSelfError"));
    return;
  }

  if (formData.id) {
    await MenuAPI.update(formData.id, { ...formData });
    toast.success(t("menu.editSuccess"));
  } else {
    await MenuAPI.create({ ...formData });
    toast.success(t("menu.addSuccess"));
  }

  closeDialog();
  handleQuery();

  // 菜单变更必然影响当前用户可见菜单视图，立即刷新当前用户的权限与菜单
  try {
    await useUserStoreHook().getUserInfo();
    await usePermissionStoreHook().refreshRoutes();
  } catch (refreshErr) {
    console.error("[Menu] 刷新当前用户菜单失败:", refreshErr);
  }
}

// ==================== 删除 ====================

const deleteConfirmVisible = ref(false);
const pendingDeleteId = ref("");

function handleDelete(id: string) {
  pendingDeleteId.value = id;
  deleteConfirmVisible.value = true;
}

async function confirmDelete() {
  await MenuAPI.deleteById(pendingDeleteId.value);
  toast.success(t("menu.deleteSuccess"));
  deleteConfirmVisible.value = false;
  handleQuery();

  // 菜单删除影响当前用户可见菜单视图，立即刷新
  try {
    await useUserStoreHook().getUserInfo();
    await usePermissionStoreHook().refreshRoutes();
  } catch (refreshErr) {
    console.error("[Menu] 刷新当前用户菜单失败:", refreshErr);
  }
}

// ==================== 初始化 ====================

onMounted(() => {
  fetchData();
});
</script>
