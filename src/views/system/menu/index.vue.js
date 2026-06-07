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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import MenuAPI from "@/api/system/menu";
import { MenuTypeEnum, MenuScopeEnum } from "@/enums/menu";
import { appConfig } from "@/settings";
import TreeSelect from "./TreeSelect.vue";
const { t } = useI18n();
// ==================== 图标解析 ====================
function resolveIcon(name) {
    if (!name)
        return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return LucideIcons[name] || LucideIcons[`${name}Icon`] || null;
}
// ==================== 列表 ====================
const loading = ref(false);
const menuTableData = ref([]);
const menuOptions = ref([]);
const expandedIds = ref(new Set());
function flattenTree(items, level = 0) {
    const result = [];
    for (const item of items) {
        const hasChildren = (item.children?.length ?? 0) > 0;
        result.push({ ...item, _level: level, _hasChildren: hasChildren });
        if (hasChildren && expandedIds.value.has(item.id ?? "")) {
            result.push(...flattenTree(item.children, level + 1));
        }
    }
    return result;
}
const flatMenuData = computed(() => flattenTree(menuTableData.value));
const showMenuScope = computed(() => appConfig.tenantEnabled);
const allExpanded = computed(() => {
    function collectIds(items) {
        const ids = [];
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
function toggleExpand(id) {
    const newSet = new Set(expandedIds.value);
    if (newSet.has(id)) {
        newSet.delete(id);
    }
    else {
        newSet.add(id);
    }
    expandedIds.value = newSet;
}
function toggleExpandAll() {
    if (allExpanded.value) {
        expandedIds.value = new Set();
    }
    else {
        const ids = [];
        function collect(items) {
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
    }
    finally {
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
const formData = reactive({
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
const isExternalLink = computed(() => formData.type === MenuTypeEnum.MENU &&
    !!formData.routePath &&
    /^https?:\/\//.test(formData.routePath));
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
function handleAddChild(parentId) {
    dialogTitle.value = t("menu.addTitle");
    fetchOptions();
    resetForm();
    formData.parentId = parentId;
    dialogVisible.value = true;
}
async function handleEdit(id) {
    dialogTitle.value = t("menu.editTitle");
    fetchOptions();
    const data = await MenuAPI.getFormData(id);
    if (data)
        Object.assign(formData, data);
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
    }
    else if (formData.type === MenuTypeEnum.CATALOG) {
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
    if ((formData.type === MenuTypeEnum.CATALOG || formData.type === MenuTypeEnum.MENU) &&
        !formData.routePath) {
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
    }
    else {
        await MenuAPI.create({ ...formData });
        toast.success(t("menu.addSuccess"));
    }
    closeDialog();
    handleQuery();
}
// ==================== 删除 ====================
const deleteConfirmVisible = ref(false);
const pendingDeleteId = ref("");
function handleDelete(id) {
    pendingDeleteId.value = id;
    deleteConfirmVisible.value = true;
}
async function confirmDelete() {
    await MenuAPI.deleteById(pendingDeleteId.value);
    toast.success(t("menu.deleteSuccess"));
    deleteConfirmVisible.value = false;
    handleQuery();
}
// ==================== 初始化 ====================
onMounted(() => {
    fetchData();
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-5 space-y-4" },
});
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    ...{ class: "pt-6" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "pt-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['pt-6']} */ ;
const { default: __VLS_11 } = __VLS_9.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3 flex-wrap" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.keywords),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('menu.keywordPlaceholder')),
    ...{ class: "w-60" },
}));
const __VLS_14 = __VLS_13({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.keywords),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('menu.keywordPlaceholder')),
    ...{ class: "w-60" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_17;
const __VLS_18 = ({ keyup: {} },
    { onKeyup: (__VLS_ctx.handleQuery) });
/** @type {__VLS_StyleScopedClasses['w-60']} */ ;
var __VLS_15;
var __VLS_16;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    ...{ 'onClick': {} },
}));
const __VLS_21 = __VLS_20({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
let __VLS_24;
const __VLS_25 = ({ click: {} },
    { onClick: (__VLS_ctx.handleQuery) });
const { default: __VLS_26 } = __VLS_22.slots;
(__VLS_ctx.t("menu.search"));
// @ts-ignore
[queryParams, t, t, handleQuery, handleQuery,];
var __VLS_22;
var __VLS_23;
let __VLS_27;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_29 = __VLS_28({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
let __VLS_32;
const __VLS_33 = ({ click: {} },
    { onClick: (__VLS_ctx.handleResetQuery) });
const { default: __VLS_34 } = __VLS_30.slots;
(__VLS_ctx.t("menu.reset"));
// @ts-ignore
[t, handleResetQuery,];
var __VLS_30;
var __VLS_31;
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
let __VLS_35;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({}));
const __VLS_37 = __VLS_36({}, ...__VLS_functionalComponentArgsRest(__VLS_36));
const { default: __VLS_40 } = __VLS_38.slots;
let __VLS_41;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
    ...{ class: "pt-6" },
}));
const __VLS_43 = __VLS_42({
    ...{ class: "pt-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
/** @type {__VLS_StyleScopedClasses['pt-6']} */ ;
const { default: __VLS_46 } = __VLS_44.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2 mb-4" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
let __VLS_47;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
    ...{ 'onClick': {} },
}));
const __VLS_49 = __VLS_48({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
let __VLS_52;
const __VLS_53 = ({ click: {} },
    { onClick: (__VLS_ctx.handleCreate) });
const { default: __VLS_54 } = __VLS_50.slots;
(__VLS_ctx.t("menu.add"));
// @ts-ignore
[t, handleCreate,];
var __VLS_50;
var __VLS_51;
let __VLS_55;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}));
const __VLS_57 = __VLS_56({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
let __VLS_60;
const __VLS_61 = ({ click: {} },
    { onClick: (__VLS_ctx.toggleExpandAll) });
const { default: __VLS_62 } = __VLS_58.slots;
(__VLS_ctx.allExpanded ? __VLS_ctx.t("menu.collapse", "收缩") : __VLS_ctx.t("menu.expand", "展开"));
// @ts-ignore
[t, t, toggleExpandAll, allExpanded,];
var __VLS_58;
var __VLS_59;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "rounded-md border overflow-x-auto" },
});
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
let __VLS_63;
/** @ts-ignore @type { | typeof __VLS_components.Table | typeof __VLS_components.Table} */
Table;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({}));
const __VLS_65 = __VLS_64({}, ...__VLS_functionalComponentArgsRest(__VLS_64));
const { default: __VLS_68 } = __VLS_66.slots;
let __VLS_69;
/** @ts-ignore @type { | typeof __VLS_components.TableHeader | typeof __VLS_components.TableHeader} */
TableHeader;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({}));
const __VLS_71 = __VLS_70({}, ...__VLS_functionalComponentArgsRest(__VLS_70));
const { default: __VLS_74 } = __VLS_72.slots;
let __VLS_75;
/** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
TableRow;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({}));
const __VLS_77 = __VLS_76({}, ...__VLS_functionalComponentArgsRest(__VLS_76));
const { default: __VLS_80 } = __VLS_78.slots;
let __VLS_81;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
    ...{ class: "min-w-[200px]" },
}));
const __VLS_83 = __VLS_82({
    ...{ class: "min-w-[200px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
/** @type {__VLS_StyleScopedClasses['min-w-[200px]']} */ ;
const { default: __VLS_86 } = __VLS_84.slots;
(__VLS_ctx.t("menu.menuName"));
// @ts-ignore
[t,];
var __VLS_84;
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
    ...{ class: "w-20 text-center" },
}));
const __VLS_89 = __VLS_88({
    ...{ class: "w-20 text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_92 } = __VLS_90.slots;
(__VLS_ctx.t("menu.type"));
// @ts-ignore
[t,];
var __VLS_90;
let __VLS_93;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
    ...{ class: "w-32" },
}));
const __VLS_95 = __VLS_94({
    ...{ class: "w-32" },
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
/** @type {__VLS_StyleScopedClasses['w-32']} */ ;
const { default: __VLS_98 } = __VLS_96.slots;
(__VLS_ctx.t("menu.routeName"));
// @ts-ignore
[t,];
var __VLS_96;
let __VLS_99;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
    ...{ class: "w-32" },
}));
const __VLS_101 = __VLS_100({
    ...{ class: "w-32" },
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
/** @type {__VLS_StyleScopedClasses['w-32']} */ ;
const { default: __VLS_104 } = __VLS_102.slots;
(__VLS_ctx.t("menu.routePath"));
// @ts-ignore
[t,];
var __VLS_102;
let __VLS_105;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent1(__VLS_105, new __VLS_105({
    ...{ class: "w-44" },
}));
const __VLS_107 = __VLS_106({
    ...{ class: "w-44" },
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
/** @type {__VLS_StyleScopedClasses['w-44']} */ ;
const { default: __VLS_110 } = __VLS_108.slots;
(__VLS_ctx.t("menu.componentPath"));
// @ts-ignore
[t,];
var __VLS_108;
let __VLS_111;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_112 = __VLS_asFunctionalComponent1(__VLS_111, new __VLS_111({
    ...{ class: "w-36" },
}));
const __VLS_113 = __VLS_112({
    ...{ class: "w-36" },
}, ...__VLS_functionalComponentArgsRest(__VLS_112));
/** @type {__VLS_StyleScopedClasses['w-36']} */ ;
const { default: __VLS_116 } = __VLS_114.slots;
(__VLS_ctx.t("menu.permission"));
// @ts-ignore
[t,];
var __VLS_114;
if (__VLS_ctx.showMenuScope) {
    let __VLS_117;
    /** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
    TableHead;
    // @ts-ignore
    const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({
        ...{ class: "w-20 text-center" },
    }));
    const __VLS_119 = __VLS_118({
        ...{ class: "w-20 text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_118));
    /** @type {__VLS_StyleScopedClasses['w-20']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_122 } = __VLS_120.slots;
    (__VLS_ctx.t("menu.scope"));
    // @ts-ignore
    [t, showMenuScope,];
    var __VLS_120;
}
let __VLS_123;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_124 = __VLS_asFunctionalComponent1(__VLS_123, new __VLS_123({
    ...{ class: "w-16 text-center" },
}));
const __VLS_125 = __VLS_124({
    ...{ class: "w-16 text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_124));
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_128 } = __VLS_126.slots;
(__VLS_ctx.t("menu.status"));
// @ts-ignore
[t,];
var __VLS_126;
let __VLS_129;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_130 = __VLS_asFunctionalComponent1(__VLS_129, new __VLS_129({
    ...{ class: "w-14 text-center" },
}));
const __VLS_131 = __VLS_130({
    ...{ class: "w-14 text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_130));
/** @type {__VLS_StyleScopedClasses['w-14']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_134 } = __VLS_132.slots;
(__VLS_ctx.t("menu.sort"));
// @ts-ignore
[t,];
var __VLS_132;
let __VLS_135;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_136 = __VLS_asFunctionalComponent1(__VLS_135, new __VLS_135({
    ...{ class: "w-40 text-center" },
}));
const __VLS_137 = __VLS_136({
    ...{ class: "w-40 text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_136));
/** @type {__VLS_StyleScopedClasses['w-40']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_140 } = __VLS_138.slots;
(__VLS_ctx.t("menu.action"));
// @ts-ignore
[t,];
var __VLS_138;
// @ts-ignore
[];
var __VLS_78;
// @ts-ignore
[];
var __VLS_72;
let __VLS_141;
/** @ts-ignore @type { | typeof __VLS_components.TableBody | typeof __VLS_components.TableBody} */
TableBody;
// @ts-ignore
const __VLS_142 = __VLS_asFunctionalComponent1(__VLS_141, new __VLS_141({}));
const __VLS_143 = __VLS_142({}, ...__VLS_functionalComponentArgsRest(__VLS_142));
const { default: __VLS_146 } = __VLS_144.slots;
if (__VLS_ctx.loading) {
    let __VLS_147;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_148 = __VLS_asFunctionalComponent1(__VLS_147, new __VLS_147({}));
    const __VLS_149 = __VLS_148({}, ...__VLS_functionalComponentArgsRest(__VLS_148));
    const { default: __VLS_152 } = __VLS_150.slots;
    let __VLS_153;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_154 = __VLS_asFunctionalComponent1(__VLS_153, new __VLS_153({
        colspan: (__VLS_ctx.colspan),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }));
    const __VLS_155 = __VLS_154({
        colspan: (__VLS_ctx.colspan),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_154));
    /** @type {__VLS_StyleScopedClasses['h-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_158 } = __VLS_156.slots;
    (__VLS_ctx.t("menu.loading"));
    // @ts-ignore
    [t, loading, colspan,];
    var __VLS_156;
    // @ts-ignore
    [];
    var __VLS_150;
}
else if (__VLS_ctx.flatMenuData.length === 0) {
    let __VLS_159;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_160 = __VLS_asFunctionalComponent1(__VLS_159, new __VLS_159({}));
    const __VLS_161 = __VLS_160({}, ...__VLS_functionalComponentArgsRest(__VLS_160));
    const { default: __VLS_164 } = __VLS_162.slots;
    let __VLS_165;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_166 = __VLS_asFunctionalComponent1(__VLS_165, new __VLS_165({
        colspan: (__VLS_ctx.colspan),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }));
    const __VLS_167 = __VLS_166({
        colspan: (__VLS_ctx.colspan),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_166));
    /** @type {__VLS_StyleScopedClasses['h-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_170 } = __VLS_168.slots;
    (__VLS_ctx.t("menu.noData"));
    // @ts-ignore
    [t, colspan, flatMenuData,];
    var __VLS_168;
    // @ts-ignore
    [];
    var __VLS_162;
}
for (const [row] of __VLS_vFor((__VLS_ctx.flatMenuData))) {
    let __VLS_171;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_172 = __VLS_asFunctionalComponent1(__VLS_171, new __VLS_171({
        key: (row.id),
        ...{ class: "hover:bg-muted/50" },
    }));
    const __VLS_173 = __VLS_172({
        key: (row.id),
        ...{ class: "hover:bg-muted/50" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_172));
    /** @type {__VLS_StyleScopedClasses['hover:bg-muted/50']} */ ;
    const { default: __VLS_176 } = __VLS_174.slots;
    let __VLS_177;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_178 = __VLS_asFunctionalComponent1(__VLS_177, new __VLS_177({}));
    const __VLS_179 = __VLS_178({}, ...__VLS_functionalComponentArgsRest(__VLS_178));
    const { default: __VLS_182 } = __VLS_180.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center" },
        ...{ style: ({ paddingLeft: `${row._level * 24}px` }) },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    if (row._hasChildren) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(row._hasChildren))
                        return;
                    __VLS_ctx.toggleExpand(row.id);
                    // @ts-ignore
                    [flatMenuData, toggleExpand,];
                } },
            ...{ class: "shrink-0 mr-1 p-0.5 rounded hover:bg-muted" },
        });
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-0.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:bg-muted']} */ ;
        let __VLS_183;
        /** @ts-ignore @type { | typeof __VLS_components.ChevronRightIcon} */
        ChevronRightIcon;
        // @ts-ignore
        const __VLS_184 = __VLS_asFunctionalComponent1(__VLS_183, new __VLS_183({
            ...{ class: "size-4 transition-transform duration-200" },
            ...{ class: ({ 'rotate-90': __VLS_ctx.expandedIds.has(row.id) }) },
        }));
        const __VLS_185 = __VLS_184({
            ...{ class: "size-4 transition-transform duration-200" },
            ...{ class: ({ 'rotate-90': __VLS_ctx.expandedIds.has(row.id) }) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_184));
        /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
        /** @type {__VLS_StyleScopedClasses['rotate-90']} */ ;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
            ...{ class: "inline-block w-5 shrink-0" },
        });
        /** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    }
    if (__VLS_ctx.resolveIcon(row.icon)) {
        const __VLS_188 = (__VLS_ctx.resolveIcon(row.icon));
        // @ts-ignore
        const __VLS_189 = __VLS_asFunctionalComponent1(__VLS_188, new __VLS_188({
            ...{ class: "size-4 mr-1 shrink-0 text-muted-foreground" },
        }));
        const __VLS_190 = __VLS_189({
            ...{ class: "size-4 mr-1 shrink-0 text-muted-foreground" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_189));
        /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "truncate" },
    });
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    (row.name);
    // @ts-ignore
    [expandedIds, resolveIcon, resolveIcon,];
    var __VLS_180;
    let __VLS_193;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_194 = __VLS_asFunctionalComponent1(__VLS_193, new __VLS_193({
        ...{ class: "text-center" },
    }));
    const __VLS_195 = __VLS_194({
        ...{ class: "text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_194));
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_198 } = __VLS_196.slots;
    if (row.type === __VLS_ctx.MenuTypeEnum.CATALOG) {
        let __VLS_199;
        /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
        Badge;
        // @ts-ignore
        const __VLS_200 = __VLS_asFunctionalComponent1(__VLS_199, new __VLS_199({
            variant: "outline",
            ...{ class: "border-yellow-500 text-yellow-600" },
        }));
        const __VLS_201 = __VLS_200({
            variant: "outline",
            ...{ class: "border-yellow-500 text-yellow-600" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_200));
        /** @type {__VLS_StyleScopedClasses['border-yellow-500']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-yellow-600']} */ ;
        const { default: __VLS_204 } = __VLS_202.slots;
        (__VLS_ctx.t("menu.typeCatalog"));
        // @ts-ignore
        [t, MenuTypeEnum,];
        var __VLS_202;
    }
    else if (row.type === __VLS_ctx.MenuTypeEnum.MENU) {
        let __VLS_205;
        /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
        Badge;
        // @ts-ignore
        const __VLS_206 = __VLS_asFunctionalComponent1(__VLS_205, new __VLS_205({
            variant: "default",
        }));
        const __VLS_207 = __VLS_206({
            variant: "default",
        }, ...__VLS_functionalComponentArgsRest(__VLS_206));
        const { default: __VLS_210 } = __VLS_208.slots;
        (__VLS_ctx.t("menu.typeMenu"));
        // @ts-ignore
        [t, MenuTypeEnum,];
        var __VLS_208;
    }
    else if (row.type === __VLS_ctx.MenuTypeEnum.BUTTON) {
        let __VLS_211;
        /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
        Badge;
        // @ts-ignore
        const __VLS_212 = __VLS_asFunctionalComponent1(__VLS_211, new __VLS_211({
            variant: "destructive",
        }));
        const __VLS_213 = __VLS_212({
            variant: "destructive",
        }, ...__VLS_functionalComponentArgsRest(__VLS_212));
        const { default: __VLS_216 } = __VLS_214.slots;
        (__VLS_ctx.t("menu.typeButton"));
        // @ts-ignore
        [t, MenuTypeEnum,];
        var __VLS_214;
    }
    // @ts-ignore
    [];
    var __VLS_196;
    let __VLS_217;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_218 = __VLS_asFunctionalComponent1(__VLS_217, new __VLS_217({
        ...{ class: "text-sm text-muted-foreground" },
    }));
    const __VLS_219 = __VLS_218({
        ...{ class: "text-sm text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_218));
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_222 } = __VLS_220.slots;
    (row.routeName || "-");
    // @ts-ignore
    [];
    var __VLS_220;
    let __VLS_223;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_224 = __VLS_asFunctionalComponent1(__VLS_223, new __VLS_223({
        ...{ class: "text-sm text-muted-foreground" },
    }));
    const __VLS_225 = __VLS_224({
        ...{ class: "text-sm text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_224));
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_228 } = __VLS_226.slots;
    (row.routePath || row.path || "-");
    // @ts-ignore
    [];
    var __VLS_226;
    let __VLS_229;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_230 = __VLS_asFunctionalComponent1(__VLS_229, new __VLS_229({
        ...{ class: "text-sm text-muted-foreground" },
    }));
    const __VLS_231 = __VLS_230({
        ...{ class: "text-sm text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_230));
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_234 } = __VLS_232.slots;
    (row.component || "-");
    // @ts-ignore
    [];
    var __VLS_232;
    let __VLS_235;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_236 = __VLS_asFunctionalComponent1(__VLS_235, new __VLS_235({}));
    const __VLS_237 = __VLS_236({}, ...__VLS_functionalComponentArgsRest(__VLS_236));
    const { default: __VLS_240 } = __VLS_238.slots;
    if (row.perm) {
        let __VLS_241;
        /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
        Badge;
        // @ts-ignore
        const __VLS_242 = __VLS_asFunctionalComponent1(__VLS_241, new __VLS_241({
            variant: "outline",
            ...{ class: "font-mono text-xs" },
        }));
        const __VLS_243 = __VLS_242({
            variant: "outline",
            ...{ class: "font-mono text-xs" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_242));
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        const { default: __VLS_246 } = __VLS_244.slots;
        (row.perm);
        // @ts-ignore
        [];
        var __VLS_244;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-muted-foreground" },
        });
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    }
    // @ts-ignore
    [];
    var __VLS_238;
    if (__VLS_ctx.showMenuScope) {
        let __VLS_247;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_248 = __VLS_asFunctionalComponent1(__VLS_247, new __VLS_247({
            ...{ class: "text-center" },
        }));
        const __VLS_249 = __VLS_248({
            ...{ class: "text-center" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_248));
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        const { default: __VLS_252 } = __VLS_250.slots;
        if (row.scope === __VLS_ctx.MenuScopeEnum.PLATFORM) {
            let __VLS_253;
            /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
            Badge;
            // @ts-ignore
            const __VLS_254 = __VLS_asFunctionalComponent1(__VLS_253, new __VLS_253({
                variant: "destructive",
            }));
            const __VLS_255 = __VLS_254({
                variant: "destructive",
            }, ...__VLS_functionalComponentArgsRest(__VLS_254));
            const { default: __VLS_258 } = __VLS_256.slots;
            (__VLS_ctx.t("menu.scopePlatform"));
            // @ts-ignore
            [t, showMenuScope, MenuScopeEnum,];
            var __VLS_256;
        }
        else {
            let __VLS_259;
            /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
            Badge;
            // @ts-ignore
            const __VLS_260 = __VLS_asFunctionalComponent1(__VLS_259, new __VLS_259({
                variant: "default",
            }));
            const __VLS_261 = __VLS_260({
                variant: "default",
            }, ...__VLS_functionalComponentArgsRest(__VLS_260));
            const { default: __VLS_264 } = __VLS_262.slots;
            (__VLS_ctx.t("menu.scopeBusiness"));
            // @ts-ignore
            [t,];
            var __VLS_262;
        }
        // @ts-ignore
        [];
        var __VLS_250;
    }
    let __VLS_265;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_266 = __VLS_asFunctionalComponent1(__VLS_265, new __VLS_265({
        ...{ class: "text-center" },
    }));
    const __VLS_267 = __VLS_266({
        ...{ class: "text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_266));
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_270 } = __VLS_268.slots;
    let __VLS_271;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_272 = __VLS_asFunctionalComponent1(__VLS_271, new __VLS_271({
        variant: (row.visible === 1 ? 'default' : 'secondary'),
    }));
    const __VLS_273 = __VLS_272({
        variant: (row.visible === 1 ? 'default' : 'secondary'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_272));
    const { default: __VLS_276 } = __VLS_274.slots;
    (row.visible === 1 ? __VLS_ctx.t("menu.statusShow") : __VLS_ctx.t("menu.statusHide"));
    // @ts-ignore
    [t, t,];
    var __VLS_274;
    // @ts-ignore
    [];
    var __VLS_268;
    let __VLS_277;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_278 = __VLS_asFunctionalComponent1(__VLS_277, new __VLS_277({
        ...{ class: "text-center" },
    }));
    const __VLS_279 = __VLS_278({
        ...{ class: "text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_278));
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_282 } = __VLS_280.slots;
    (row.sort);
    // @ts-ignore
    [];
    var __VLS_280;
    let __VLS_283;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_284 = __VLS_asFunctionalComponent1(__VLS_283, new __VLS_283({
        ...{ class: "text-center" },
    }));
    const __VLS_285 = __VLS_284({
        ...{ class: "text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_284));
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_288 } = __VLS_286.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-center gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    if (row.type === __VLS_ctx.MenuTypeEnum.CATALOG || row.type === __VLS_ctx.MenuTypeEnum.MENU) {
        let __VLS_289;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_290 = __VLS_asFunctionalComponent1(__VLS_289, new __VLS_289({
            ...{ 'onClick': {} },
            variant: "ghost",
            size: "sm",
            ...{ class: "h-7 text-xs" },
        }));
        const __VLS_291 = __VLS_290({
            ...{ 'onClick': {} },
            variant: "ghost",
            size: "sm",
            ...{ class: "h-7 text-xs" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_290));
        let __VLS_294;
        const __VLS_295 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(row.type === __VLS_ctx.MenuTypeEnum.CATALOG || row.type === __VLS_ctx.MenuTypeEnum.MENU))
                        return;
                    __VLS_ctx.handleAddChild(row.id);
                    // @ts-ignore
                    [MenuTypeEnum, MenuTypeEnum, handleAddChild,];
                } });
        /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        const { default: __VLS_296 } = __VLS_292.slots;
        (__VLS_ctx.t("menu.add"));
        // @ts-ignore
        [t,];
        var __VLS_292;
        var __VLS_293;
    }
    let __VLS_297;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_298 = __VLS_asFunctionalComponent1(__VLS_297, new __VLS_297({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs" },
    }));
    const __VLS_299 = __VLS_298({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_298));
    let __VLS_302;
    const __VLS_303 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleEdit(row.id);
                // @ts-ignore
                [handleEdit,];
            } });
    /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    const { default: __VLS_304 } = __VLS_300.slots;
    (__VLS_ctx.t("menu.edit"));
    // @ts-ignore
    [t,];
    var __VLS_300;
    var __VLS_301;
    let __VLS_305;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_306 = __VLS_asFunctionalComponent1(__VLS_305, new __VLS_305({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs text-destructive hover:text-destructive" },
    }));
    const __VLS_307 = __VLS_306({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs text-destructive hover:text-destructive" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_306));
    let __VLS_310;
    const __VLS_311 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleDelete(row.id);
                // @ts-ignore
                [handleDelete,];
            } });
    /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-destructive']} */ ;
    const { default: __VLS_312 } = __VLS_308.slots;
    (__VLS_ctx.t("menu.delete"));
    // @ts-ignore
    [t,];
    var __VLS_308;
    var __VLS_309;
    // @ts-ignore
    [];
    var __VLS_286;
    // @ts-ignore
    [];
    var __VLS_174;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_144;
// @ts-ignore
[];
var __VLS_66;
// @ts-ignore
[];
var __VLS_44;
// @ts-ignore
[];
var __VLS_38;
let __VLS_313;
/** @ts-ignore @type { | typeof __VLS_components.Sheet | typeof __VLS_components.Sheet} */
Sheet;
// @ts-ignore
const __VLS_314 = __VLS_asFunctionalComponent1(__VLS_313, new __VLS_313({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogVisible),
}));
const __VLS_315 = __VLS_314({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogVisible),
}, ...__VLS_functionalComponentArgsRest(__VLS_314));
let __VLS_318;
const __VLS_319 = ({ 'update:open': {} },
    { 'onUpdate:open': ((v) => {
            if (!v)
                __VLS_ctx.closeDialog();
        }) });
const { default: __VLS_320 } = __VLS_316.slots;
let __VLS_321;
/** @ts-ignore @type { | typeof __VLS_components.SheetContent | typeof __VLS_components.SheetContent} */
SheetContent;
// @ts-ignore
const __VLS_322 = __VLS_asFunctionalComponent1(__VLS_321, new __VLS_321({
    ...{ class: "sm:max-w-xl overflow-auto" },
}));
const __VLS_323 = __VLS_322({
    ...{ class: "sm:max-w-xl overflow-auto" },
}, ...__VLS_functionalComponentArgsRest(__VLS_322));
/** @type {__VLS_StyleScopedClasses['sm:max-w-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
const { default: __VLS_326 } = __VLS_324.slots;
let __VLS_327;
/** @ts-ignore @type { | typeof __VLS_components.SheetHeader | typeof __VLS_components.SheetHeader} */
SheetHeader;
// @ts-ignore
const __VLS_328 = __VLS_asFunctionalComponent1(__VLS_327, new __VLS_327({}));
const __VLS_329 = __VLS_328({}, ...__VLS_functionalComponentArgsRest(__VLS_328));
const { default: __VLS_332 } = __VLS_330.slots;
let __VLS_333;
/** @ts-ignore @type { | typeof __VLS_components.SheetTitle | typeof __VLS_components.SheetTitle} */
SheetTitle;
// @ts-ignore
const __VLS_334 = __VLS_asFunctionalComponent1(__VLS_333, new __VLS_333({}));
const __VLS_335 = __VLS_334({}, ...__VLS_functionalComponentArgsRest(__VLS_334));
const { default: __VLS_338 } = __VLS_336.slots;
(__VLS_ctx.dialogTitle);
// @ts-ignore
[dialogVisible, closeDialog, dialogTitle,];
var __VLS_336;
// @ts-ignore
[];
var __VLS_330;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "py-4 space-y-4" },
});
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_339;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_340 = __VLS_asFunctionalComponent1(__VLS_339, new __VLS_339({}));
const __VLS_341 = __VLS_340({}, ...__VLS_functionalComponentArgsRest(__VLS_340));
const { default: __VLS_344 } = __VLS_342.slots;
(__VLS_ctx.t("menu.parentMenu"));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[t,];
var __VLS_342;
const __VLS_345 = TreeSelect;
// @ts-ignore
const __VLS_346 = __VLS_asFunctionalComponent1(__VLS_345, new __VLS_345({
    modelValue: (__VLS_ctx.formData.parentId),
    options: (__VLS_ctx.menuOptions),
    placeholder: (__VLS_ctx.t('menu.parentMenuPlaceholder')),
    topLevelLabel: (__VLS_ctx.t('menu.topLevelMenu')),
}));
const __VLS_347 = __VLS_346({
    modelValue: (__VLS_ctx.formData.parentId),
    options: (__VLS_ctx.menuOptions),
    placeholder: (__VLS_ctx.t('menu.parentMenuPlaceholder')),
    topLevelLabel: (__VLS_ctx.t('menu.topLevelMenu')),
}, ...__VLS_functionalComponentArgsRest(__VLS_346));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_350;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_351 = __VLS_asFunctionalComponent1(__VLS_350, new __VLS_350({}));
const __VLS_352 = __VLS_351({}, ...__VLS_functionalComponentArgsRest(__VLS_351));
const { default: __VLS_355 } = __VLS_353.slots;
(__VLS_ctx.t("menu.menuName"));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[t, t, t, formData, menuOptions,];
var __VLS_353;
let __VLS_356;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_357 = __VLS_asFunctionalComponent1(__VLS_356, new __VLS_356({
    modelValue: (__VLS_ctx.formData.name),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('menu.menuNamePlaceholder')),
}));
const __VLS_358 = __VLS_357({
    modelValue: (__VLS_ctx.formData.name),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('menu.menuNamePlaceholder')),
}, ...__VLS_functionalComponentArgsRest(__VLS_357));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_361;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_362 = __VLS_asFunctionalComponent1(__VLS_361, new __VLS_361({}));
const __VLS_363 = __VLS_362({}, ...__VLS_functionalComponentArgsRest(__VLS_362));
const { default: __VLS_366 } = __VLS_364.slots;
(__VLS_ctx.t("menu.menuType"));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[t, t, formData,];
var __VLS_364;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-4" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.menuTypeOptions))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        key: (item.value),
        ...{ class: "flex items-center gap-2 cursor-pointer text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onChange: (__VLS_ctx.handleMenuTypeChange) },
        type: "radio",
        value: (item.value),
        ...{ class: "accent-primary" },
    });
    (__VLS_ctx.formData.type);
    /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
    (item.label);
    // @ts-ignore
    [formData, menuTypeOptions, handleMenuTypeChange,];
}
if (__VLS_ctx.formData.type === __VLS_ctx.MenuTypeEnum.MENU && !__VLS_ctx.isExternalLink) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    let __VLS_367;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_368 = __VLS_asFunctionalComponent1(__VLS_367, new __VLS_367({}));
    const __VLS_369 = __VLS_368({}, ...__VLS_functionalComponentArgsRest(__VLS_368));
    const { default: __VLS_372 } = __VLS_370.slots;
    (__VLS_ctx.t("menu.routeName"));
    let __VLS_373;
    /** @ts-ignore @type { | typeof __VLS_components.TooltipProvider | typeof __VLS_components.TooltipProvider} */
    TooltipProvider;
    // @ts-ignore
    const __VLS_374 = __VLS_asFunctionalComponent1(__VLS_373, new __VLS_373({}));
    const __VLS_375 = __VLS_374({}, ...__VLS_functionalComponentArgsRest(__VLS_374));
    const { default: __VLS_378 } = __VLS_376.slots;
    let __VLS_379;
    /** @ts-ignore @type { | typeof __VLS_components.Tooltip | typeof __VLS_components.Tooltip} */
    Tooltip;
    // @ts-ignore
    const __VLS_380 = __VLS_asFunctionalComponent1(__VLS_379, new __VLS_379({}));
    const __VLS_381 = __VLS_380({}, ...__VLS_functionalComponentArgsRest(__VLS_380));
    const { default: __VLS_384 } = __VLS_382.slots;
    let __VLS_385;
    /** @ts-ignore @type { | typeof __VLS_components.TooltipTrigger | typeof __VLS_components.TooltipTrigger} */
    TooltipTrigger;
    // @ts-ignore
    const __VLS_386 = __VLS_asFunctionalComponent1(__VLS_385, new __VLS_385({
        asChild: true,
    }));
    const __VLS_387 = __VLS_386({
        asChild: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_386));
    const { default: __VLS_390 } = __VLS_388.slots;
    let __VLS_391;
    /** @ts-ignore @type { | typeof __VLS_components.InfoIcon} */
    InfoIcon;
    // @ts-ignore
    const __VLS_392 = __VLS_asFunctionalComponent1(__VLS_391, new __VLS_391({
        ...{ class: "inline size-3.5 ml-1 text-muted-foreground cursor-help" },
    }));
    const __VLS_393 = __VLS_392({
        ...{ class: "inline size-3.5 ml-1 text-muted-foreground cursor-help" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_392));
    /** @type {__VLS_StyleScopedClasses['inline']} */ ;
    /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-help']} */ ;
    // @ts-ignore
    [t, MenuTypeEnum, formData, isExternalLink,];
    var __VLS_388;
    let __VLS_396;
    /** @ts-ignore @type { | typeof __VLS_components.TooltipContent | typeof __VLS_components.TooltipContent} */
    TooltipContent;
    // @ts-ignore
    const __VLS_397 = __VLS_asFunctionalComponent1(__VLS_396, new __VLS_396({
        side: "bottom",
        ...{ class: "max-w-xs" },
    }));
    const __VLS_398 = __VLS_397({
        side: "bottom",
        ...{ class: "max-w-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_397));
    /** @type {__VLS_StyleScopedClasses['max-w-xs']} */ ;
    const { default: __VLS_401 } = __VLS_399.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.t("menu.routeNameTooltip"));
    // @ts-ignore
    [t,];
    var __VLS_399;
    // @ts-ignore
    [];
    var __VLS_382;
    // @ts-ignore
    [];
    var __VLS_376;
    // @ts-ignore
    [];
    var __VLS_370;
    let __VLS_402;
    /** @ts-ignore @type { | typeof __VLS_components.Input} */
    Input;
    // @ts-ignore
    const __VLS_403 = __VLS_asFunctionalComponent1(__VLS_402, new __VLS_402({
        modelValue: (__VLS_ctx.formData.routeName),
        modelModifiers: { trim: true, },
        placeholder: (__VLS_ctx.t('menu.routeNamePlaceholder')),
    }));
    const __VLS_404 = __VLS_403({
        modelValue: (__VLS_ctx.formData.routeName),
        modelModifiers: { trim: true, },
        placeholder: (__VLS_ctx.t('menu.routeNamePlaceholder')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_403));
}
if (__VLS_ctx.formData.type === __VLS_ctx.MenuTypeEnum.CATALOG || __VLS_ctx.formData.type === __VLS_ctx.MenuTypeEnum.MENU) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    let __VLS_407;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_408 = __VLS_asFunctionalComponent1(__VLS_407, new __VLS_407({}));
    const __VLS_409 = __VLS_408({}, ...__VLS_functionalComponentArgsRest(__VLS_408));
    const { default: __VLS_412 } = __VLS_410.slots;
    (__VLS_ctx.t("menu.routePath"));
    let __VLS_413;
    /** @ts-ignore @type { | typeof __VLS_components.TooltipProvider | typeof __VLS_components.TooltipProvider} */
    TooltipProvider;
    // @ts-ignore
    const __VLS_414 = __VLS_asFunctionalComponent1(__VLS_413, new __VLS_413({}));
    const __VLS_415 = __VLS_414({}, ...__VLS_functionalComponentArgsRest(__VLS_414));
    const { default: __VLS_418 } = __VLS_416.slots;
    let __VLS_419;
    /** @ts-ignore @type { | typeof __VLS_components.Tooltip | typeof __VLS_components.Tooltip} */
    Tooltip;
    // @ts-ignore
    const __VLS_420 = __VLS_asFunctionalComponent1(__VLS_419, new __VLS_419({}));
    const __VLS_421 = __VLS_420({}, ...__VLS_functionalComponentArgsRest(__VLS_420));
    const { default: __VLS_424 } = __VLS_422.slots;
    let __VLS_425;
    /** @ts-ignore @type { | typeof __VLS_components.TooltipTrigger | typeof __VLS_components.TooltipTrigger} */
    TooltipTrigger;
    // @ts-ignore
    const __VLS_426 = __VLS_asFunctionalComponent1(__VLS_425, new __VLS_425({
        asChild: true,
    }));
    const __VLS_427 = __VLS_426({
        asChild: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_426));
    const { default: __VLS_430 } = __VLS_428.slots;
    let __VLS_431;
    /** @ts-ignore @type { | typeof __VLS_components.InfoIcon} */
    InfoIcon;
    // @ts-ignore
    const __VLS_432 = __VLS_asFunctionalComponent1(__VLS_431, new __VLS_431({
        ...{ class: "inline size-3.5 ml-1 text-muted-foreground cursor-help" },
    }));
    const __VLS_433 = __VLS_432({
        ...{ class: "inline size-3.5 ml-1 text-muted-foreground cursor-help" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_432));
    /** @type {__VLS_StyleScopedClasses['inline']} */ ;
    /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-help']} */ ;
    // @ts-ignore
    [t, t, MenuTypeEnum, MenuTypeEnum, formData, formData, formData,];
    var __VLS_428;
    let __VLS_436;
    /** @ts-ignore @type { | typeof __VLS_components.TooltipContent | typeof __VLS_components.TooltipContent} */
    TooltipContent;
    // @ts-ignore
    const __VLS_437 = __VLS_asFunctionalComponent1(__VLS_436, new __VLS_436({
        side: "bottom",
        ...{ class: "max-w-xs" },
    }));
    const __VLS_438 = __VLS_437({
        side: "bottom",
        ...{ class: "max-w-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_437));
    /** @type {__VLS_StyleScopedClasses['max-w-xs']} */ ;
    const { default: __VLS_441 } = __VLS_439.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.t("menu.routePathTooltip"));
    // @ts-ignore
    [t,];
    var __VLS_439;
    // @ts-ignore
    [];
    var __VLS_422;
    // @ts-ignore
    [];
    var __VLS_416;
    // @ts-ignore
    [];
    var __VLS_410;
    let __VLS_442;
    /** @ts-ignore @type { | typeof __VLS_components.Input} */
    Input;
    // @ts-ignore
    const __VLS_443 = __VLS_asFunctionalComponent1(__VLS_442, new __VLS_442({
        modelValue: (__VLS_ctx.formData.routePath),
        modelModifiers: { trim: true, },
        placeholder: (__VLS_ctx.formData.type === __VLS_ctx.MenuTypeEnum.CATALOG
            ? __VLS_ctx.t('menu.routePathCatalogPlaceholder')
            : __VLS_ctx.t('menu.routePathMenuPlaceholder')),
    }));
    const __VLS_444 = __VLS_443({
        modelValue: (__VLS_ctx.formData.routePath),
        modelModifiers: { trim: true, },
        placeholder: (__VLS_ctx.formData.type === __VLS_ctx.MenuTypeEnum.CATALOG
            ? __VLS_ctx.t('menu.routePathCatalogPlaceholder')
            : __VLS_ctx.t('menu.routePathMenuPlaceholder')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_443));
}
if (__VLS_ctx.formData.type === __VLS_ctx.MenuTypeEnum.MENU && !__VLS_ctx.isExternalLink) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    let __VLS_447;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_448 = __VLS_asFunctionalComponent1(__VLS_447, new __VLS_447({}));
    const __VLS_449 = __VLS_448({}, ...__VLS_functionalComponentArgsRest(__VLS_448));
    const { default: __VLS_452 } = __VLS_450.slots;
    (__VLS_ctx.t("menu.componentPath"));
    let __VLS_453;
    /** @ts-ignore @type { | typeof __VLS_components.TooltipProvider | typeof __VLS_components.TooltipProvider} */
    TooltipProvider;
    // @ts-ignore
    const __VLS_454 = __VLS_asFunctionalComponent1(__VLS_453, new __VLS_453({}));
    const __VLS_455 = __VLS_454({}, ...__VLS_functionalComponentArgsRest(__VLS_454));
    const { default: __VLS_458 } = __VLS_456.slots;
    let __VLS_459;
    /** @ts-ignore @type { | typeof __VLS_components.Tooltip | typeof __VLS_components.Tooltip} */
    Tooltip;
    // @ts-ignore
    const __VLS_460 = __VLS_asFunctionalComponent1(__VLS_459, new __VLS_459({}));
    const __VLS_461 = __VLS_460({}, ...__VLS_functionalComponentArgsRest(__VLS_460));
    const { default: __VLS_464 } = __VLS_462.slots;
    let __VLS_465;
    /** @ts-ignore @type { | typeof __VLS_components.TooltipTrigger | typeof __VLS_components.TooltipTrigger} */
    TooltipTrigger;
    // @ts-ignore
    const __VLS_466 = __VLS_asFunctionalComponent1(__VLS_465, new __VLS_465({
        asChild: true,
    }));
    const __VLS_467 = __VLS_466({
        asChild: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_466));
    const { default: __VLS_470 } = __VLS_468.slots;
    let __VLS_471;
    /** @ts-ignore @type { | typeof __VLS_components.InfoIcon} */
    InfoIcon;
    // @ts-ignore
    const __VLS_472 = __VLS_asFunctionalComponent1(__VLS_471, new __VLS_471({
        ...{ class: "inline size-3.5 ml-1 text-muted-foreground cursor-help" },
    }));
    const __VLS_473 = __VLS_472({
        ...{ class: "inline size-3.5 ml-1 text-muted-foreground cursor-help" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_472));
    /** @type {__VLS_StyleScopedClasses['inline']} */ ;
    /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-help']} */ ;
    // @ts-ignore
    [t, t, t, MenuTypeEnum, MenuTypeEnum, formData, formData, formData, isExternalLink,];
    var __VLS_468;
    let __VLS_476;
    /** @ts-ignore @type { | typeof __VLS_components.TooltipContent | typeof __VLS_components.TooltipContent} */
    TooltipContent;
    // @ts-ignore
    const __VLS_477 = __VLS_asFunctionalComponent1(__VLS_476, new __VLS_476({
        side: "bottom",
        ...{ class: "max-w-xs" },
    }));
    const __VLS_478 = __VLS_477({
        side: "bottom",
        ...{ class: "max-w-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_477));
    /** @type {__VLS_StyleScopedClasses['max-w-xs']} */ ;
    const { default: __VLS_481 } = __VLS_479.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.t("menu.componentPathTooltip"));
    // @ts-ignore
    [t,];
    var __VLS_479;
    // @ts-ignore
    [];
    var __VLS_462;
    // @ts-ignore
    [];
    var __VLS_456;
    // @ts-ignore
    [];
    var __VLS_450;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "bg-muted px-2 py-1.5 rounded-l-md border border-r-0 text-sm text-muted-foreground whitespace-nowrap" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-l-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-r-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    let __VLS_482;
    /** @ts-ignore @type { | typeof __VLS_components.Input} */
    Input;
    // @ts-ignore
    const __VLS_483 = __VLS_asFunctionalComponent1(__VLS_482, new __VLS_482({
        modelValue: (__VLS_ctx.formData.component),
        modelModifiers: { trim: true, },
        placeholder: (__VLS_ctx.t('menu.componentPathPlaceholder')),
        ...{ class: "rounded-none" },
    }));
    const __VLS_484 = __VLS_483({
        modelValue: (__VLS_ctx.formData.component),
        modelModifiers: { trim: true, },
        placeholder: (__VLS_ctx.t('menu.componentPathPlaceholder')),
        ...{ class: "rounded-none" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_483));
    /** @type {__VLS_StyleScopedClasses['rounded-none']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "bg-muted px-2 py-1.5 rounded-r-md border border-l-0 text-sm text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-r-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-l-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
}
if (__VLS_ctx.formData.type === __VLS_ctx.MenuTypeEnum.MENU && !__VLS_ctx.isExternalLink) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    let __VLS_487;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_488 = __VLS_asFunctionalComponent1(__VLS_487, new __VLS_487({}));
    const __VLS_489 = __VLS_488({}, ...__VLS_functionalComponentArgsRest(__VLS_488));
    const { default: __VLS_492 } = __VLS_490.slots;
    (__VLS_ctx.t("menu.routeParams"));
    let __VLS_493;
    /** @ts-ignore @type { | typeof __VLS_components.TooltipProvider | typeof __VLS_components.TooltipProvider} */
    TooltipProvider;
    // @ts-ignore
    const __VLS_494 = __VLS_asFunctionalComponent1(__VLS_493, new __VLS_493({}));
    const __VLS_495 = __VLS_494({}, ...__VLS_functionalComponentArgsRest(__VLS_494));
    const { default: __VLS_498 } = __VLS_496.slots;
    let __VLS_499;
    /** @ts-ignore @type { | typeof __VLS_components.Tooltip | typeof __VLS_components.Tooltip} */
    Tooltip;
    // @ts-ignore
    const __VLS_500 = __VLS_asFunctionalComponent1(__VLS_499, new __VLS_499({}));
    const __VLS_501 = __VLS_500({}, ...__VLS_functionalComponentArgsRest(__VLS_500));
    const { default: __VLS_504 } = __VLS_502.slots;
    let __VLS_505;
    /** @ts-ignore @type { | typeof __VLS_components.TooltipTrigger | typeof __VLS_components.TooltipTrigger} */
    TooltipTrigger;
    // @ts-ignore
    const __VLS_506 = __VLS_asFunctionalComponent1(__VLS_505, new __VLS_505({
        asChild: true,
    }));
    const __VLS_507 = __VLS_506({
        asChild: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_506));
    const { default: __VLS_510 } = __VLS_508.slots;
    let __VLS_511;
    /** @ts-ignore @type { | typeof __VLS_components.InfoIcon} */
    InfoIcon;
    // @ts-ignore
    const __VLS_512 = __VLS_asFunctionalComponent1(__VLS_511, new __VLS_511({
        ...{ class: "inline size-3.5 ml-1 text-muted-foreground cursor-help" },
    }));
    const __VLS_513 = __VLS_512({
        ...{ class: "inline size-3.5 ml-1 text-muted-foreground cursor-help" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_512));
    /** @type {__VLS_StyleScopedClasses['inline']} */ ;
    /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-help']} */ ;
    // @ts-ignore
    [t, t, MenuTypeEnum, formData, formData, isExternalLink,];
    var __VLS_508;
    let __VLS_516;
    /** @ts-ignore @type { | typeof __VLS_components.TooltipContent | typeof __VLS_components.TooltipContent} */
    TooltipContent;
    // @ts-ignore
    const __VLS_517 = __VLS_asFunctionalComponent1(__VLS_516, new __VLS_516({
        side: "bottom",
        ...{ class: "max-w-xs" },
    }));
    const __VLS_518 = __VLS_517({
        side: "bottom",
        ...{ class: "max-w-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_517));
    /** @type {__VLS_StyleScopedClasses['max-w-xs']} */ ;
    const { default: __VLS_521 } = __VLS_519.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.t("menu.routeParamsTooltip"));
    // @ts-ignore
    [t,];
    var __VLS_519;
    // @ts-ignore
    [];
    var __VLS_502;
    // @ts-ignore
    [];
    var __VLS_496;
    // @ts-ignore
    [];
    var __VLS_490;
    if (!__VLS_ctx.formData.params || __VLS_ctx.formData.params.length === 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        let __VLS_522;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_523 = __VLS_asFunctionalComponent1(__VLS_522, new __VLS_522({
            ...{ 'onClick': {} },
            variant: "outline",
            size: "sm",
        }));
        const __VLS_524 = __VLS_523({
            ...{ 'onClick': {} },
            variant: "outline",
            size: "sm",
        }, ...__VLS_functionalComponentArgsRest(__VLS_523));
        let __VLS_527;
        const __VLS_528 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.formData.type === __VLS_ctx.MenuTypeEnum.MENU && !__VLS_ctx.isExternalLink))
                        return;
                    if (!(!__VLS_ctx.formData.params || __VLS_ctx.formData.params.length === 0))
                        return;
                    __VLS_ctx.formData.params = [{ key: '', value: '' }];
                    // @ts-ignore
                    [formData, formData, formData,];
                } });
        const { default: __VLS_529 } = __VLS_525.slots;
        (__VLS_ctx.t("menu.addParam"));
        // @ts-ignore
        [t,];
        var __VLS_525;
        var __VLS_526;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "space-y-2" },
        });
        /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
        for (const [item, idx] of __VLS_vFor((__VLS_ctx.formData.params))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                key: (idx),
                ...{ class: "flex items-center gap-2" },
            });
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
            let __VLS_530;
            /** @ts-ignore @type { | typeof __VLS_components.Input} */
            Input;
            // @ts-ignore
            const __VLS_531 = __VLS_asFunctionalComponent1(__VLS_530, new __VLS_530({
                modelValue: (item.key),
                placeholder: (__VLS_ctx.t('menu.paramKeyPlaceholder')),
                ...{ class: "w-32" },
            }));
            const __VLS_532 = __VLS_531({
                modelValue: (item.key),
                placeholder: (__VLS_ctx.t('menu.paramKeyPlaceholder')),
                ...{ class: "w-32" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_531));
            /** @type {__VLS_StyleScopedClasses['w-32']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-muted-foreground" },
            });
            /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
            let __VLS_535;
            /** @ts-ignore @type { | typeof __VLS_components.Input} */
            Input;
            // @ts-ignore
            const __VLS_536 = __VLS_asFunctionalComponent1(__VLS_535, new __VLS_535({
                modelValue: (item.value),
                placeholder: (__VLS_ctx.t('menu.paramValuePlaceholder')),
                ...{ class: "w-32" },
            }));
            const __VLS_537 = __VLS_536({
                modelValue: (item.value),
                placeholder: (__VLS_ctx.t('menu.paramValuePlaceholder')),
                ...{ class: "w-32" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_536));
            /** @type {__VLS_StyleScopedClasses['w-32']} */ ;
            if (idx === __VLS_ctx.formData.params.length - 1) {
                let __VLS_540;
                /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
                Button;
                // @ts-ignore
                const __VLS_541 = __VLS_asFunctionalComponent1(__VLS_540, new __VLS_540({
                    ...{ 'onClick': {} },
                    variant: "ghost",
                    size: "icon",
                    ...{ class: "size-8 shrink-0" },
                }));
                const __VLS_542 = __VLS_541({
                    ...{ 'onClick': {} },
                    variant: "ghost",
                    size: "icon",
                    ...{ class: "size-8 shrink-0" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_541));
                let __VLS_545;
                const __VLS_546 = ({ click: {} },
                    { onClick: (...[$event]) => {
                            if (!(__VLS_ctx.formData.type === __VLS_ctx.MenuTypeEnum.MENU && !__VLS_ctx.isExternalLink))
                                return;
                            if (!!(!__VLS_ctx.formData.params || __VLS_ctx.formData.params.length === 0))
                                return;
                            if (!(idx === __VLS_ctx.formData.params.length - 1))
                                return;
                            __VLS_ctx.formData.params.push({ key: '', value: '' });
                            // @ts-ignore
                            [t, t, formData, formData, formData,];
                        } });
                /** @type {__VLS_StyleScopedClasses['size-8']} */ ;
                /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
                const { default: __VLS_547 } = __VLS_543.slots;
                let __VLS_548;
                /** @ts-ignore @type { | typeof __VLS_components.PlusIcon} */
                PlusIcon;
                // @ts-ignore
                const __VLS_549 = __VLS_asFunctionalComponent1(__VLS_548, new __VLS_548({
                    ...{ class: "size-4" },
                }));
                const __VLS_550 = __VLS_549({
                    ...{ class: "size-4" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_549));
                /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
                // @ts-ignore
                [];
                var __VLS_543;
                var __VLS_544;
            }
            let __VLS_553;
            /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
            Button;
            // @ts-ignore
            const __VLS_554 = __VLS_asFunctionalComponent1(__VLS_553, new __VLS_553({
                ...{ 'onClick': {} },
                variant: "ghost",
                size: "icon",
                ...{ class: "size-8 shrink-0 text-destructive hover:text-destructive" },
            }));
            const __VLS_555 = __VLS_554({
                ...{ 'onClick': {} },
                variant: "ghost",
                size: "icon",
                ...{ class: "size-8 shrink-0 text-destructive hover:text-destructive" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_554));
            let __VLS_558;
            const __VLS_559 = ({ click: {} },
                { onClick: (...[$event]) => {
                        if (!(__VLS_ctx.formData.type === __VLS_ctx.MenuTypeEnum.MENU && !__VLS_ctx.isExternalLink))
                            return;
                        if (!!(!__VLS_ctx.formData.params || __VLS_ctx.formData.params.length === 0))
                            return;
                        __VLS_ctx.formData.params.splice(idx, 1);
                        // @ts-ignore
                        [formData,];
                    } });
            /** @type {__VLS_StyleScopedClasses['size-8']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:text-destructive']} */ ;
            const { default: __VLS_560 } = __VLS_556.slots;
            let __VLS_561;
            /** @ts-ignore @type { | typeof __VLS_components.Trash2Icon} */
            Trash2Icon;
            // @ts-ignore
            const __VLS_562 = __VLS_asFunctionalComponent1(__VLS_561, new __VLS_561({
                ...{ class: "size-4" },
            }));
            const __VLS_563 = __VLS_562({
                ...{ class: "size-4" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_562));
            /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
            // @ts-ignore
            [];
            var __VLS_556;
            var __VLS_557;
            // @ts-ignore
            [];
        }
    }
}
if (__VLS_ctx.formData.type !== __VLS_ctx.MenuTypeEnum.BUTTON && __VLS_ctx.showMenuScope) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    let __VLS_566;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_567 = __VLS_asFunctionalComponent1(__VLS_566, new __VLS_566({}));
    const __VLS_568 = __VLS_567({}, ...__VLS_functionalComponentArgsRest(__VLS_567));
    const { default: __VLS_571 } = __VLS_569.slots;
    (__VLS_ctx.t("menu.menuScope"));
    // @ts-ignore
    [t, showMenuScope, MenuTypeEnum, formData,];
    var __VLS_569;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-4" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "flex items-center gap-2 cursor-pointer text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        type: "radio",
        value: (__VLS_ctx.MenuScopeEnum.PLATFORM),
        ...{ class: "accent-primary" },
    });
    (__VLS_ctx.formData.scope);
    /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
    (__VLS_ctx.t("menu.scopePlatformLabel"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "flex items-center gap-2 cursor-pointer text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        type: "radio",
        value: (__VLS_ctx.MenuScopeEnum.TENANT),
        ...{ class: "accent-primary" },
    });
    (__VLS_ctx.formData.scope);
    /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
    (__VLS_ctx.t("menu.scopeBusinessLabel"));
}
if (__VLS_ctx.formData.type !== __VLS_ctx.MenuTypeEnum.BUTTON) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    let __VLS_572;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_573 = __VLS_asFunctionalComponent1(__VLS_572, new __VLS_572({}));
    const __VLS_574 = __VLS_573({}, ...__VLS_functionalComponentArgsRest(__VLS_573));
    const { default: __VLS_577 } = __VLS_575.slots;
    (__VLS_ctx.t("menu.visibleStatus"));
    // @ts-ignore
    [t, t, t, MenuTypeEnum, MenuScopeEnum, MenuScopeEnum, formData, formData, formData,];
    var __VLS_575;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-4" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "flex items-center gap-2 cursor-pointer text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        type: "radio",
        value: (1),
        ...{ class: "accent-primary" },
    });
    (__VLS_ctx.formData.visible);
    /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
    (__VLS_ctx.t("menu.statusShow"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "flex items-center gap-2 cursor-pointer text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        type: "radio",
        value: (0),
        ...{ class: "accent-primary" },
    });
    (__VLS_ctx.formData.visible);
    /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
    (__VLS_ctx.t("menu.statusHide"));
}
if (__VLS_ctx.formData.type === __VLS_ctx.MenuTypeEnum.CATALOG || __VLS_ctx.formData.type === __VLS_ctx.MenuTypeEnum.MENU) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    let __VLS_578;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_579 = __VLS_asFunctionalComponent1(__VLS_578, new __VLS_578({}));
    const __VLS_580 = __VLS_579({}, ...__VLS_functionalComponentArgsRest(__VLS_579));
    const { default: __VLS_583 } = __VLS_581.slots;
    (__VLS_ctx.t("menu.alwaysShow"));
    let __VLS_584;
    /** @ts-ignore @type { | typeof __VLS_components.TooltipProvider | typeof __VLS_components.TooltipProvider} */
    TooltipProvider;
    // @ts-ignore
    const __VLS_585 = __VLS_asFunctionalComponent1(__VLS_584, new __VLS_584({}));
    const __VLS_586 = __VLS_585({}, ...__VLS_functionalComponentArgsRest(__VLS_585));
    const { default: __VLS_589 } = __VLS_587.slots;
    let __VLS_590;
    /** @ts-ignore @type { | typeof __VLS_components.Tooltip | typeof __VLS_components.Tooltip} */
    Tooltip;
    // @ts-ignore
    const __VLS_591 = __VLS_asFunctionalComponent1(__VLS_590, new __VLS_590({}));
    const __VLS_592 = __VLS_591({}, ...__VLS_functionalComponentArgsRest(__VLS_591));
    const { default: __VLS_595 } = __VLS_593.slots;
    let __VLS_596;
    /** @ts-ignore @type { | typeof __VLS_components.TooltipTrigger | typeof __VLS_components.TooltipTrigger} */
    TooltipTrigger;
    // @ts-ignore
    const __VLS_597 = __VLS_asFunctionalComponent1(__VLS_596, new __VLS_596({
        asChild: true,
    }));
    const __VLS_598 = __VLS_597({
        asChild: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_597));
    const { default: __VLS_601 } = __VLS_599.slots;
    let __VLS_602;
    /** @ts-ignore @type { | typeof __VLS_components.InfoIcon} */
    InfoIcon;
    // @ts-ignore
    const __VLS_603 = __VLS_asFunctionalComponent1(__VLS_602, new __VLS_602({
        ...{ class: "inline size-3.5 ml-1 text-muted-foreground cursor-help" },
    }));
    const __VLS_604 = __VLS_603({
        ...{ class: "inline size-3.5 ml-1 text-muted-foreground cursor-help" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_603));
    /** @type {__VLS_StyleScopedClasses['inline']} */ ;
    /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-help']} */ ;
    // @ts-ignore
    [t, t, t, MenuTypeEnum, MenuTypeEnum, formData, formData, formData, formData,];
    var __VLS_599;
    let __VLS_607;
    /** @ts-ignore @type { | typeof __VLS_components.TooltipContent | typeof __VLS_components.TooltipContent} */
    TooltipContent;
    // @ts-ignore
    const __VLS_608 = __VLS_asFunctionalComponent1(__VLS_607, new __VLS_607({
        side: "bottom",
        ...{ class: "max-w-xs" },
    }));
    const __VLS_609 = __VLS_608({
        side: "bottom",
        ...{ class: "max-w-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_608));
    /** @type {__VLS_StyleScopedClasses['max-w-xs']} */ ;
    const { default: __VLS_612 } = __VLS_610.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.t("menu.alwaysShowTooltip"));
    // @ts-ignore
    [t,];
    var __VLS_610;
    // @ts-ignore
    [];
    var __VLS_593;
    // @ts-ignore
    [];
    var __VLS_587;
    // @ts-ignore
    [];
    var __VLS_581;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-4" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "flex items-center gap-2 cursor-pointer text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        type: "radio",
        value: (1),
        ...{ class: "accent-primary" },
    });
    (__VLS_ctx.formData.alwaysShow);
    /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
    (__VLS_ctx.t("menu.yes"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "flex items-center gap-2 cursor-pointer text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        type: "radio",
        value: (0),
        ...{ class: "accent-primary" },
    });
    (__VLS_ctx.formData.alwaysShow);
    /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
    (__VLS_ctx.t("menu.no"));
}
if (__VLS_ctx.formData.type === __VLS_ctx.MenuTypeEnum.MENU && !__VLS_ctx.isExternalLink) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    let __VLS_613;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_614 = __VLS_asFunctionalComponent1(__VLS_613, new __VLS_613({}));
    const __VLS_615 = __VLS_614({}, ...__VLS_functionalComponentArgsRest(__VLS_614));
    const { default: __VLS_618 } = __VLS_616.slots;
    (__VLS_ctx.t("menu.keepAlive"));
    // @ts-ignore
    [t, t, t, MenuTypeEnum, formData, formData, formData, isExternalLink,];
    var __VLS_616;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-4" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "flex items-center gap-2 cursor-pointer text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        type: "radio",
        value: (1),
        ...{ class: "accent-primary" },
    });
    (__VLS_ctx.formData.keepAlive);
    /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
    (__VLS_ctx.t("menu.keepAliveOn"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "flex items-center gap-2 cursor-pointer text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        type: "radio",
        value: (0),
        ...{ class: "accent-primary" },
    });
    (__VLS_ctx.formData.keepAlive);
    /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
    (__VLS_ctx.t("menu.keepAliveOff"));
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_619;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_620 = __VLS_asFunctionalComponent1(__VLS_619, new __VLS_619({}));
const __VLS_621 = __VLS_620({}, ...__VLS_functionalComponentArgsRest(__VLS_620));
const { default: __VLS_624 } = __VLS_622.slots;
(__VLS_ctx.t("menu.sort"));
// @ts-ignore
[t, t, t, formData, formData,];
var __VLS_622;
let __VLS_625;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_626 = __VLS_asFunctionalComponent1(__VLS_625, new __VLS_625({
    modelValue: (__VLS_ctx.formData.sort),
    modelModifiers: { number: true, },
    type: "number",
    min: "0",
    ...{ class: "w-24" },
}));
const __VLS_627 = __VLS_626({
    modelValue: (__VLS_ctx.formData.sort),
    modelModifiers: { number: true, },
    type: "number",
    min: "0",
    ...{ class: "w-24" },
}, ...__VLS_functionalComponentArgsRest(__VLS_626));
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
if (__VLS_ctx.formData.type === __VLS_ctx.MenuTypeEnum.BUTTON) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    let __VLS_630;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_631 = __VLS_asFunctionalComponent1(__VLS_630, new __VLS_630({}));
    const __VLS_632 = __VLS_631({}, ...__VLS_functionalComponentArgsRest(__VLS_631));
    const { default: __VLS_635 } = __VLS_633.slots;
    (__VLS_ctx.t("menu.permLabel"));
    // @ts-ignore
    [t, MenuTypeEnum, formData, formData,];
    var __VLS_633;
    let __VLS_636;
    /** @ts-ignore @type { | typeof __VLS_components.Input} */
    Input;
    // @ts-ignore
    const __VLS_637 = __VLS_asFunctionalComponent1(__VLS_636, new __VLS_636({
        modelValue: (__VLS_ctx.formData.perm),
        modelModifiers: { trim: true, },
        placeholder: (__VLS_ctx.t('menu.permPlaceholder')),
    }));
    const __VLS_638 = __VLS_637({
        modelValue: (__VLS_ctx.formData.perm),
        modelModifiers: { trim: true, },
        placeholder: (__VLS_ctx.t('menu.permPlaceholder')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_637));
}
if (__VLS_ctx.formData.type !== __VLS_ctx.MenuTypeEnum.BUTTON) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    let __VLS_641;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_642 = __VLS_asFunctionalComponent1(__VLS_641, new __VLS_641({}));
    const __VLS_643 = __VLS_642({}, ...__VLS_functionalComponentArgsRest(__VLS_642));
    const { default: __VLS_646 } = __VLS_644.slots;
    (__VLS_ctx.t("menu.iconLabel"));
    // @ts-ignore
    [t, t, MenuTypeEnum, formData, formData,];
    var __VLS_644;
    let __VLS_647;
    /** @ts-ignore @type { | typeof __VLS_components.Input} */
    Input;
    // @ts-ignore
    const __VLS_648 = __VLS_asFunctionalComponent1(__VLS_647, new __VLS_647({
        modelValue: (__VLS_ctx.formData.icon),
        modelModifiers: { trim: true, },
        placeholder: (__VLS_ctx.t('menu.iconPlaceholder')),
    }));
    const __VLS_649 = __VLS_648({
        modelValue: (__VLS_ctx.formData.icon),
        modelModifiers: { trim: true, },
        placeholder: (__VLS_ctx.t('menu.iconPlaceholder')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_648));
}
if (__VLS_ctx.formData.type === __VLS_ctx.MenuTypeEnum.CATALOG) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    let __VLS_652;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_653 = __VLS_asFunctionalComponent1(__VLS_652, new __VLS_652({}));
    const __VLS_654 = __VLS_653({}, ...__VLS_functionalComponentArgsRest(__VLS_653));
    const { default: __VLS_657 } = __VLS_655.slots;
    (__VLS_ctx.t("menu.redirectLabel"));
    // @ts-ignore
    [t, t, MenuTypeEnum, formData, formData,];
    var __VLS_655;
    let __VLS_658;
    /** @ts-ignore @type { | typeof __VLS_components.Input} */
    Input;
    // @ts-ignore
    const __VLS_659 = __VLS_asFunctionalComponent1(__VLS_658, new __VLS_658({
        modelValue: (__VLS_ctx.formData.redirect),
        modelModifiers: { trim: true, },
        placeholder: (__VLS_ctx.t('menu.redirectPlaceholder')),
    }));
    const __VLS_660 = __VLS_659({
        modelValue: (__VLS_ctx.formData.redirect),
        modelModifiers: { trim: true, },
        placeholder: (__VLS_ctx.t('menu.redirectPlaceholder')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_659));
}
let __VLS_663;
/** @ts-ignore @type { | typeof __VLS_components.SheetFooter | typeof __VLS_components.SheetFooter} */
SheetFooter;
// @ts-ignore
const __VLS_664 = __VLS_asFunctionalComponent1(__VLS_663, new __VLS_663({}));
const __VLS_665 = __VLS_664({}, ...__VLS_functionalComponentArgsRest(__VLS_664));
const { default: __VLS_668 } = __VLS_666.slots;
let __VLS_669;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_670 = __VLS_asFunctionalComponent1(__VLS_669, new __VLS_669({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_671 = __VLS_670({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_670));
let __VLS_674;
const __VLS_675 = ({ click: {} },
    { onClick: (__VLS_ctx.closeDialog) });
const { default: __VLS_676 } = __VLS_672.slots;
(__VLS_ctx.t("menu.cancel"));
// @ts-ignore
[t, t, closeDialog, formData,];
var __VLS_672;
var __VLS_673;
let __VLS_677;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_678 = __VLS_asFunctionalComponent1(__VLS_677, new __VLS_677({
    ...{ 'onClick': {} },
}));
const __VLS_679 = __VLS_678({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_678));
let __VLS_682;
const __VLS_683 = ({ click: {} },
    { onClick: (__VLS_ctx.handleSubmit) });
const { default: __VLS_684 } = __VLS_680.slots;
(__VLS_ctx.t("menu.confirm"));
// @ts-ignore
[t, handleSubmit,];
var __VLS_680;
var __VLS_681;
// @ts-ignore
[];
var __VLS_666;
// @ts-ignore
[];
var __VLS_324;
// @ts-ignore
[];
var __VLS_316;
var __VLS_317;
let __VLS_685;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialog | typeof __VLS_components.AlertDialog} */
AlertDialog;
// @ts-ignore
const __VLS_686 = __VLS_asFunctionalComponent1(__VLS_685, new __VLS_685({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteConfirmVisible),
}));
const __VLS_687 = __VLS_686({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteConfirmVisible),
}, ...__VLS_functionalComponentArgsRest(__VLS_686));
let __VLS_690;
const __VLS_691 = ({ 'update:open': {} },
    { 'onUpdate:open': ((v) => (__VLS_ctx.deleteConfirmVisible = v)) });
const { default: __VLS_692 } = __VLS_688.slots;
let __VLS_693;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogContent | typeof __VLS_components.AlertDialogContent} */
AlertDialogContent;
// @ts-ignore
const __VLS_694 = __VLS_asFunctionalComponent1(__VLS_693, new __VLS_693({}));
const __VLS_695 = __VLS_694({}, ...__VLS_functionalComponentArgsRest(__VLS_694));
const { default: __VLS_698 } = __VLS_696.slots;
let __VLS_699;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogHeader | typeof __VLS_components.AlertDialogHeader} */
AlertDialogHeader;
// @ts-ignore
const __VLS_700 = __VLS_asFunctionalComponent1(__VLS_699, new __VLS_699({}));
const __VLS_701 = __VLS_700({}, ...__VLS_functionalComponentArgsRest(__VLS_700));
const { default: __VLS_704 } = __VLS_702.slots;
let __VLS_705;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogTitle | typeof __VLS_components.AlertDialogTitle} */
AlertDialogTitle;
// @ts-ignore
const __VLS_706 = __VLS_asFunctionalComponent1(__VLS_705, new __VLS_705({}));
const __VLS_707 = __VLS_706({}, ...__VLS_functionalComponentArgsRest(__VLS_706));
const { default: __VLS_710 } = __VLS_708.slots;
(__VLS_ctx.t("menu.deleteWarning"));
// @ts-ignore
[t, deleteConfirmVisible, deleteConfirmVisible,];
var __VLS_708;
let __VLS_711;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogDescription | typeof __VLS_components.AlertDialogDescription} */
AlertDialogDescription;
// @ts-ignore
const __VLS_712 = __VLS_asFunctionalComponent1(__VLS_711, new __VLS_711({}));
const __VLS_713 = __VLS_712({}, ...__VLS_functionalComponentArgsRest(__VLS_712));
const { default: __VLS_716 } = __VLS_714.slots;
(__VLS_ctx.t("menu.deleteConfirm"));
// @ts-ignore
[t,];
var __VLS_714;
// @ts-ignore
[];
var __VLS_702;
let __VLS_717;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogFooter | typeof __VLS_components.AlertDialogFooter} */
AlertDialogFooter;
// @ts-ignore
const __VLS_718 = __VLS_asFunctionalComponent1(__VLS_717, new __VLS_717({}));
const __VLS_719 = __VLS_718({}, ...__VLS_functionalComponentArgsRest(__VLS_718));
const { default: __VLS_722 } = __VLS_720.slots;
let __VLS_723;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogCancel | typeof __VLS_components.AlertDialogCancel} */
AlertDialogCancel;
// @ts-ignore
const __VLS_724 = __VLS_asFunctionalComponent1(__VLS_723, new __VLS_723({
    ...{ 'onClick': {} },
}));
const __VLS_725 = __VLS_724({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_724));
let __VLS_728;
const __VLS_729 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.deleteConfirmVisible = false;
            // @ts-ignore
            [deleteConfirmVisible,];
        } });
const { default: __VLS_730 } = __VLS_726.slots;
(__VLS_ctx.t("menu.cancel"));
// @ts-ignore
[t,];
var __VLS_726;
var __VLS_727;
let __VLS_731;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogAction | typeof __VLS_components.AlertDialogAction} */
AlertDialogAction;
// @ts-ignore
const __VLS_732 = __VLS_asFunctionalComponent1(__VLS_731, new __VLS_731({
    ...{ 'onClick': {} },
}));
const __VLS_733 = __VLS_732({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_732));
let __VLS_736;
const __VLS_737 = ({ click: {} },
    { onClick: (__VLS_ctx.confirmDelete) });
const { default: __VLS_738 } = __VLS_734.slots;
(__VLS_ctx.t("menu.confirm"));
// @ts-ignore
[t, confirmDelete,];
var __VLS_734;
var __VLS_735;
// @ts-ignore
[];
var __VLS_720;
// @ts-ignore
[];
var __VLS_696;
// @ts-ignore
[];
var __VLS_688;
var __VLS_689;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map