import { ref, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import ConfigAPI from "@/api/system/config";
const { t } = useI18n();
// ==================== 列表 ====================
const loading = ref(false);
const pageData = ref([]);
const total = ref(0);
const queryParams = reactive({
    pageNum: 1,
    pageSize: 10,
    keywords: "",
});
const totalPages = computed(() => Math.ceil(total.value / queryParams.pageSize));
const displayedPages = computed(() => {
    const tp = totalPages.value;
    const current = queryParams.pageNum;
    const pages = [];
    let start = Math.max(1, current - 2);
    const end = Math.min(tp, start + 4);
    start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++)
        pages.push(i);
    return pages;
});
function goPage(page) {
    queryParams.pageNum = page;
    fetchList();
}
async function fetchList() {
    loading.value = true;
    try {
        const result = await ConfigAPI.getPage(queryParams);
        pageData.value = result.list;
        total.value = result.total;
    }
    finally {
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
const formData = reactive({
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
async function handleEdit(id) {
    if (!id)
        return;
    dialogTitle.value = t("config.editTitle");
    const data = await ConfigAPI.getFormData(id);
    if (data)
        Object.assign(formData, data);
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
    }
    else {
        await ConfigAPI.create(formData);
        toast.success(t("config.addSuccess"));
    }
    closeDialog();
    handleQuery();
}
// ==================== 删除 ====================
const deleteConfirmVisible = ref(false);
const pendingDeleteId = ref("");
function handleDelete(id) {
    if (!id)
        return;
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
    placeholder: (__VLS_ctx.t('config.keywordPlaceholder')),
    ...{ class: "w-60" },
}));
const __VLS_14 = __VLS_13({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.keywords),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('config.keywordPlaceholder')),
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
(__VLS_ctx.t("config.search"));
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
(__VLS_ctx.t("config.reset"));
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
(__VLS_ctx.t("config.add"));
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
}));
const __VLS_57 = __VLS_56({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
let __VLS_60;
const __VLS_61 = ({ click: {} },
    { onClick: (__VLS_ctx.handleRefreshCache) });
const { default: __VLS_62 } = __VLS_58.slots;
(__VLS_ctx.t("config.refreshCache"));
// @ts-ignore
[t, handleRefreshCache,];
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
    ...{ class: "w-14 text-center" },
}));
const __VLS_83 = __VLS_82({
    ...{ class: "w-14 text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
/** @type {__VLS_StyleScopedClasses['w-14']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_86 } = __VLS_84.slots;
(__VLS_ctx.t("config.index"));
// @ts-ignore
[t,];
var __VLS_84;
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({}));
const __VLS_89 = __VLS_88({}, ...__VLS_functionalComponentArgsRest(__VLS_88));
const { default: __VLS_92 } = __VLS_90.slots;
(__VLS_ctx.t("config.configName"));
// @ts-ignore
[t,];
var __VLS_90;
let __VLS_93;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({}));
const __VLS_95 = __VLS_94({}, ...__VLS_functionalComponentArgsRest(__VLS_94));
const { default: __VLS_98 } = __VLS_96.slots;
(__VLS_ctx.t("config.configKey"));
// @ts-ignore
[t,];
var __VLS_96;
let __VLS_99;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({}));
const __VLS_101 = __VLS_100({}, ...__VLS_functionalComponentArgsRest(__VLS_100));
const { default: __VLS_104 } = __VLS_102.slots;
(__VLS_ctx.t("config.configValue"));
// @ts-ignore
[t,];
var __VLS_102;
let __VLS_105;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent1(__VLS_105, new __VLS_105({}));
const __VLS_107 = __VLS_106({}, ...__VLS_functionalComponentArgsRest(__VLS_106));
const { default: __VLS_110 } = __VLS_108.slots;
(__VLS_ctx.t("config.remark"));
// @ts-ignore
[t,];
var __VLS_108;
let __VLS_111;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_112 = __VLS_asFunctionalComponent1(__VLS_111, new __VLS_111({
    ...{ class: "text-center w-36" },
}));
const __VLS_113 = __VLS_112({
    ...{ class: "text-center w-36" },
}, ...__VLS_functionalComponentArgsRest(__VLS_112));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-36']} */ ;
const { default: __VLS_116 } = __VLS_114.slots;
(__VLS_ctx.t("config.action"));
// @ts-ignore
[t,];
var __VLS_114;
// @ts-ignore
[];
var __VLS_78;
// @ts-ignore
[];
var __VLS_72;
let __VLS_117;
/** @ts-ignore @type { | typeof __VLS_components.TableBody | typeof __VLS_components.TableBody} */
TableBody;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({}));
const __VLS_119 = __VLS_118({}, ...__VLS_functionalComponentArgsRest(__VLS_118));
const { default: __VLS_122 } = __VLS_120.slots;
if (__VLS_ctx.loading) {
    let __VLS_123;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_124 = __VLS_asFunctionalComponent1(__VLS_123, new __VLS_123({}));
    const __VLS_125 = __VLS_124({}, ...__VLS_functionalComponentArgsRest(__VLS_124));
    const { default: __VLS_128 } = __VLS_126.slots;
    let __VLS_129;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_130 = __VLS_asFunctionalComponent1(__VLS_129, new __VLS_129({
        colspan: (6),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }));
    const __VLS_131 = __VLS_130({
        colspan: (6),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_130));
    /** @type {__VLS_StyleScopedClasses['h-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_134 } = __VLS_132.slots;
    (__VLS_ctx.t("config.loading"));
    // @ts-ignore
    [t, loading,];
    var __VLS_132;
    // @ts-ignore
    [];
    var __VLS_126;
}
else if (__VLS_ctx.pageData.length === 0) {
    let __VLS_135;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_136 = __VLS_asFunctionalComponent1(__VLS_135, new __VLS_135({}));
    const __VLS_137 = __VLS_136({}, ...__VLS_functionalComponentArgsRest(__VLS_136));
    const { default: __VLS_140 } = __VLS_138.slots;
    let __VLS_141;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_142 = __VLS_asFunctionalComponent1(__VLS_141, new __VLS_141({
        colspan: (6),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }));
    const __VLS_143 = __VLS_142({
        colspan: (6),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_142));
    /** @type {__VLS_StyleScopedClasses['h-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_146 } = __VLS_144.slots;
    (__VLS_ctx.t("config.noData"));
    // @ts-ignore
    [t, pageData,];
    var __VLS_144;
    // @ts-ignore
    [];
    var __VLS_138;
}
for (const [item, idx] of __VLS_vFor((__VLS_ctx.pageData))) {
    let __VLS_147;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_148 = __VLS_asFunctionalComponent1(__VLS_147, new __VLS_147({
        key: (item.id),
        ...{ class: "hover:bg-muted/50" },
    }));
    const __VLS_149 = __VLS_148({
        key: (item.id),
        ...{ class: "hover:bg-muted/50" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_148));
    /** @type {__VLS_StyleScopedClasses['hover:bg-muted/50']} */ ;
    const { default: __VLS_152 } = __VLS_150.slots;
    let __VLS_153;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_154 = __VLS_asFunctionalComponent1(__VLS_153, new __VLS_153({
        ...{ class: "text-center text-muted-foreground" },
    }));
    const __VLS_155 = __VLS_154({
        ...{ class: "text-center text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_154));
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_158 } = __VLS_156.slots;
    ((__VLS_ctx.queryParams.pageNum - 1) * __VLS_ctx.queryParams.pageSize + idx + 1);
    // @ts-ignore
    [queryParams, queryParams, pageData,];
    var __VLS_156;
    let __VLS_159;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_160 = __VLS_asFunctionalComponent1(__VLS_159, new __VLS_159({
        ...{ class: "font-medium" },
    }));
    const __VLS_161 = __VLS_160({
        ...{ class: "font-medium" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_160));
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    const { default: __VLS_164 } = __VLS_162.slots;
    (item.configName);
    // @ts-ignore
    [];
    var __VLS_162;
    let __VLS_165;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_166 = __VLS_asFunctionalComponent1(__VLS_165, new __VLS_165({}));
    const __VLS_167 = __VLS_166({}, ...__VLS_functionalComponentArgsRest(__VLS_166));
    const { default: __VLS_170 } = __VLS_168.slots;
    let __VLS_171;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_172 = __VLS_asFunctionalComponent1(__VLS_171, new __VLS_171({
        variant: "outline",
    }));
    const __VLS_173 = __VLS_172({
        variant: "outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_172));
    const { default: __VLS_176 } = __VLS_174.slots;
    (item.configKey);
    // @ts-ignore
    [];
    var __VLS_174;
    // @ts-ignore
    [];
    var __VLS_168;
    let __VLS_177;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_178 = __VLS_asFunctionalComponent1(__VLS_177, new __VLS_177({}));
    const __VLS_179 = __VLS_178({}, ...__VLS_functionalComponentArgsRest(__VLS_178));
    const { default: __VLS_182 } = __VLS_180.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({
        ...{ class: "text-sm bg-muted px-1.5 py-0.5 rounded" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
    (item.configValue);
    // @ts-ignore
    [];
    var __VLS_180;
    let __VLS_183;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_184 = __VLS_asFunctionalComponent1(__VLS_183, new __VLS_183({
        ...{ class: "text-muted-foreground text-sm" },
    }));
    const __VLS_185 = __VLS_184({
        ...{ class: "text-muted-foreground text-sm" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_184));
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    const { default: __VLS_188 } = __VLS_186.slots;
    (item.remark);
    // @ts-ignore
    [];
    var __VLS_186;
    let __VLS_189;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_190 = __VLS_asFunctionalComponent1(__VLS_189, new __VLS_189({
        ...{ class: "text-center" },
    }));
    const __VLS_191 = __VLS_190({
        ...{ class: "text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_190));
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_194 } = __VLS_192.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-center gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    let __VLS_195;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_196 = __VLS_asFunctionalComponent1(__VLS_195, new __VLS_195({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs" },
    }));
    const __VLS_197 = __VLS_196({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_196));
    let __VLS_200;
    const __VLS_201 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleEdit(item.id);
                // @ts-ignore
                [handleEdit,];
            } });
    /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    const { default: __VLS_202 } = __VLS_198.slots;
    (__VLS_ctx.t("config.edit"));
    // @ts-ignore
    [t,];
    var __VLS_198;
    var __VLS_199;
    let __VLS_203;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_204 = __VLS_asFunctionalComponent1(__VLS_203, new __VLS_203({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs text-destructive hover:text-destructive" },
    }));
    const __VLS_205 = __VLS_204({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs text-destructive hover:text-destructive" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_204));
    let __VLS_208;
    const __VLS_209 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleDelete(item.id);
                // @ts-ignore
                [handleDelete,];
            } });
    /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-destructive']} */ ;
    const { default: __VLS_210 } = __VLS_206.slots;
    (__VLS_ctx.t("config.delete"));
    // @ts-ignore
    [t,];
    var __VLS_206;
    var __VLS_207;
    // @ts-ignore
    [];
    var __VLS_192;
    // @ts-ignore
    [];
    var __VLS_150;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_120;
// @ts-ignore
[];
var __VLS_66;
if (__VLS_ctx.total > 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between mt-4" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.total);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    let __VLS_211;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_212 = __VLS_asFunctionalComponent1(__VLS_211, new __VLS_211({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.queryParams.pageNum <= 1),
    }));
    const __VLS_213 = __VLS_212({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.queryParams.pageNum <= 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_212));
    let __VLS_216;
    const __VLS_217 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.total > 0))
                    return;
                __VLS_ctx.goPage(__VLS_ctx.queryParams.pageNum - 1);
                // @ts-ignore
                [queryParams, queryParams, total, total, goPage,];
            } });
    const { default: __VLS_218 } = __VLS_214.slots;
    // @ts-ignore
    [];
    var __VLS_214;
    var __VLS_215;
    for (const [page] of __VLS_vFor((__VLS_ctx.displayedPages))) {
        let __VLS_219;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_220 = __VLS_asFunctionalComponent1(__VLS_219, new __VLS_219({
            ...{ 'onClick': {} },
            key: (page),
            variant: (page === __VLS_ctx.queryParams.pageNum ? 'default' : 'outline'),
            size: "sm",
            ...{ class: "min-w-8" },
        }));
        const __VLS_221 = __VLS_220({
            ...{ 'onClick': {} },
            key: (page),
            variant: (page === __VLS_ctx.queryParams.pageNum ? 'default' : 'outline'),
            size: "sm",
            ...{ class: "min-w-8" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_220));
        let __VLS_224;
        const __VLS_225 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.total > 0))
                        return;
                    __VLS_ctx.goPage(page);
                    // @ts-ignore
                    [queryParams, goPage, displayedPages,];
                } });
        /** @type {__VLS_StyleScopedClasses['min-w-8']} */ ;
        const { default: __VLS_226 } = __VLS_222.slots;
        (page);
        // @ts-ignore
        [];
        var __VLS_222;
        var __VLS_223;
        // @ts-ignore
        [];
    }
    let __VLS_227;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_228 = __VLS_asFunctionalComponent1(__VLS_227, new __VLS_227({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.queryParams.pageNum >= __VLS_ctx.totalPages),
    }));
    const __VLS_229 = __VLS_228({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.queryParams.pageNum >= __VLS_ctx.totalPages),
    }, ...__VLS_functionalComponentArgsRest(__VLS_228));
    let __VLS_232;
    const __VLS_233 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.total > 0))
                    return;
                __VLS_ctx.goPage(__VLS_ctx.queryParams.pageNum + 1);
                // @ts-ignore
                [queryParams, queryParams, goPage, totalPages,];
            } });
    const { default: __VLS_234 } = __VLS_230.slots;
    // @ts-ignore
    [];
    var __VLS_230;
    var __VLS_231;
}
// @ts-ignore
[];
var __VLS_44;
// @ts-ignore
[];
var __VLS_38;
let __VLS_235;
/** @ts-ignore @type { | typeof __VLS_components.Dialog | typeof __VLS_components.Dialog} */
Dialog;
// @ts-ignore
const __VLS_236 = __VLS_asFunctionalComponent1(__VLS_235, new __VLS_235({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogVisible),
}));
const __VLS_237 = __VLS_236({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogVisible),
}, ...__VLS_functionalComponentArgsRest(__VLS_236));
let __VLS_240;
const __VLS_241 = ({ 'update:open': {} },
    { 'onUpdate:open': ((v) => {
            if (!v)
                __VLS_ctx.closeDialog();
        }) });
const { default: __VLS_242 } = __VLS_238.slots;
let __VLS_243;
/** @ts-ignore @type { | typeof __VLS_components.DialogContent | typeof __VLS_components.DialogContent} */
DialogContent;
// @ts-ignore
const __VLS_244 = __VLS_asFunctionalComponent1(__VLS_243, new __VLS_243({
    ...{ class: "sm:max-w-lg" },
}));
const __VLS_245 = __VLS_244({
    ...{ class: "sm:max-w-lg" },
}, ...__VLS_functionalComponentArgsRest(__VLS_244));
/** @type {__VLS_StyleScopedClasses['sm:max-w-lg']} */ ;
const { default: __VLS_248 } = __VLS_246.slots;
let __VLS_249;
/** @ts-ignore @type { | typeof __VLS_components.DialogHeader | typeof __VLS_components.DialogHeader} */
DialogHeader;
// @ts-ignore
const __VLS_250 = __VLS_asFunctionalComponent1(__VLS_249, new __VLS_249({}));
const __VLS_251 = __VLS_250({}, ...__VLS_functionalComponentArgsRest(__VLS_250));
const { default: __VLS_254 } = __VLS_252.slots;
let __VLS_255;
/** @ts-ignore @type { | typeof __VLS_components.DialogTitle | typeof __VLS_components.DialogTitle} */
DialogTitle;
// @ts-ignore
const __VLS_256 = __VLS_asFunctionalComponent1(__VLS_255, new __VLS_255({}));
const __VLS_257 = __VLS_256({}, ...__VLS_functionalComponentArgsRest(__VLS_256));
const { default: __VLS_260 } = __VLS_258.slots;
(__VLS_ctx.dialogTitle);
// @ts-ignore
[dialogVisible, closeDialog, dialogTitle,];
var __VLS_258;
// @ts-ignore
[];
var __VLS_252;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-4 py-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_261;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_262 = __VLS_asFunctionalComponent1(__VLS_261, new __VLS_261({}));
const __VLS_263 = __VLS_262({}, ...__VLS_functionalComponentArgsRest(__VLS_262));
const { default: __VLS_266 } = __VLS_264.slots;
(__VLS_ctx.t("config.configName"));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[t,];
var __VLS_264;
let __VLS_267;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_268 = __VLS_asFunctionalComponent1(__VLS_267, new __VLS_267({
    modelValue: (__VLS_ctx.formData.configName),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('config.configNamePlaceholder')),
    maxlength: (50),
}));
const __VLS_269 = __VLS_268({
    modelValue: (__VLS_ctx.formData.configName),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('config.configNamePlaceholder')),
    maxlength: (50),
}, ...__VLS_functionalComponentArgsRest(__VLS_268));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_272;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_273 = __VLS_asFunctionalComponent1(__VLS_272, new __VLS_272({}));
const __VLS_274 = __VLS_273({}, ...__VLS_functionalComponentArgsRest(__VLS_273));
const { default: __VLS_277 } = __VLS_275.slots;
(__VLS_ctx.t("config.configKey"));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[t, t, formData,];
var __VLS_275;
let __VLS_278;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_279 = __VLS_asFunctionalComponent1(__VLS_278, new __VLS_278({
    modelValue: (__VLS_ctx.formData.configKey),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('config.configKeyPlaceholder')),
    maxlength: (50),
}));
const __VLS_280 = __VLS_279({
    modelValue: (__VLS_ctx.formData.configKey),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('config.configKeyPlaceholder')),
    maxlength: (50),
}, ...__VLS_functionalComponentArgsRest(__VLS_279));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_283;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_284 = __VLS_asFunctionalComponent1(__VLS_283, new __VLS_283({}));
const __VLS_285 = __VLS_284({}, ...__VLS_functionalComponentArgsRest(__VLS_284));
const { default: __VLS_288 } = __VLS_286.slots;
(__VLS_ctx.t("config.configValue"));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[t, t, formData,];
var __VLS_286;
let __VLS_289;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_290 = __VLS_asFunctionalComponent1(__VLS_289, new __VLS_289({
    modelValue: (__VLS_ctx.formData.configValue),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('config.configValuePlaceholder')),
    maxlength: (100),
}));
const __VLS_291 = __VLS_290({
    modelValue: (__VLS_ctx.formData.configValue),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('config.configValuePlaceholder')),
    maxlength: (100),
}, ...__VLS_functionalComponentArgsRest(__VLS_290));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_294;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_295 = __VLS_asFunctionalComponent1(__VLS_294, new __VLS_294({}));
const __VLS_296 = __VLS_295({}, ...__VLS_functionalComponentArgsRest(__VLS_295));
const { default: __VLS_299 } = __VLS_297.slots;
(__VLS_ctx.t("config.remark"));
// @ts-ignore
[t, t, formData,];
var __VLS_297;
let __VLS_300;
/** @ts-ignore @type { | typeof __VLS_components.Textarea} */
Textarea;
// @ts-ignore
const __VLS_301 = __VLS_asFunctionalComponent1(__VLS_300, new __VLS_300({
    modelValue: (__VLS_ctx.formData.remark),
    placeholder: (__VLS_ctx.t('config.remarkPlaceholder')),
    rows: "3",
    maxlength: (100),
}));
const __VLS_302 = __VLS_301({
    modelValue: (__VLS_ctx.formData.remark),
    placeholder: (__VLS_ctx.t('config.remarkPlaceholder')),
    rows: "3",
    maxlength: (100),
}, ...__VLS_functionalComponentArgsRest(__VLS_301));
let __VLS_305;
/** @ts-ignore @type { | typeof __VLS_components.DialogFooter | typeof __VLS_components.DialogFooter} */
DialogFooter;
// @ts-ignore
const __VLS_306 = __VLS_asFunctionalComponent1(__VLS_305, new __VLS_305({}));
const __VLS_307 = __VLS_306({}, ...__VLS_functionalComponentArgsRest(__VLS_306));
const { default: __VLS_310 } = __VLS_308.slots;
let __VLS_311;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_312 = __VLS_asFunctionalComponent1(__VLS_311, new __VLS_311({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_313 = __VLS_312({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_312));
let __VLS_316;
const __VLS_317 = ({ click: {} },
    { onClick: (__VLS_ctx.closeDialog) });
const { default: __VLS_318 } = __VLS_314.slots;
(__VLS_ctx.t("config.cancel"));
// @ts-ignore
[t, t, closeDialog, formData,];
var __VLS_314;
var __VLS_315;
let __VLS_319;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_320 = __VLS_asFunctionalComponent1(__VLS_319, new __VLS_319({
    ...{ 'onClick': {} },
}));
const __VLS_321 = __VLS_320({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_320));
let __VLS_324;
const __VLS_325 = ({ click: {} },
    { onClick: (__VLS_ctx.handleSubmit) });
const { default: __VLS_326 } = __VLS_322.slots;
(__VLS_ctx.t("config.confirm"));
// @ts-ignore
[t, handleSubmit,];
var __VLS_322;
var __VLS_323;
// @ts-ignore
[];
var __VLS_308;
// @ts-ignore
[];
var __VLS_246;
// @ts-ignore
[];
var __VLS_238;
var __VLS_239;
let __VLS_327;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialog | typeof __VLS_components.AlertDialog} */
AlertDialog;
// @ts-ignore
const __VLS_328 = __VLS_asFunctionalComponent1(__VLS_327, new __VLS_327({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteConfirmVisible),
}));
const __VLS_329 = __VLS_328({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteConfirmVisible),
}, ...__VLS_functionalComponentArgsRest(__VLS_328));
let __VLS_332;
const __VLS_333 = ({ 'update:open': {} },
    { 'onUpdate:open': ((v) => (__VLS_ctx.deleteConfirmVisible = v)) });
const { default: __VLS_334 } = __VLS_330.slots;
let __VLS_335;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogContent | typeof __VLS_components.AlertDialogContent} */
AlertDialogContent;
// @ts-ignore
const __VLS_336 = __VLS_asFunctionalComponent1(__VLS_335, new __VLS_335({}));
const __VLS_337 = __VLS_336({}, ...__VLS_functionalComponentArgsRest(__VLS_336));
const { default: __VLS_340 } = __VLS_338.slots;
let __VLS_341;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogHeader | typeof __VLS_components.AlertDialogHeader} */
AlertDialogHeader;
// @ts-ignore
const __VLS_342 = __VLS_asFunctionalComponent1(__VLS_341, new __VLS_341({}));
const __VLS_343 = __VLS_342({}, ...__VLS_functionalComponentArgsRest(__VLS_342));
const { default: __VLS_346 } = __VLS_344.slots;
let __VLS_347;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogTitle | typeof __VLS_components.AlertDialogTitle} */
AlertDialogTitle;
// @ts-ignore
const __VLS_348 = __VLS_asFunctionalComponent1(__VLS_347, new __VLS_347({}));
const __VLS_349 = __VLS_348({}, ...__VLS_functionalComponentArgsRest(__VLS_348));
const { default: __VLS_352 } = __VLS_350.slots;
(__VLS_ctx.t("config.deleteWarning"));
// @ts-ignore
[t, deleteConfirmVisible, deleteConfirmVisible,];
var __VLS_350;
let __VLS_353;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogDescription | typeof __VLS_components.AlertDialogDescription} */
AlertDialogDescription;
// @ts-ignore
const __VLS_354 = __VLS_asFunctionalComponent1(__VLS_353, new __VLS_353({}));
const __VLS_355 = __VLS_354({}, ...__VLS_functionalComponentArgsRest(__VLS_354));
const { default: __VLS_358 } = __VLS_356.slots;
(__VLS_ctx.t("config.deleteConfirm"));
// @ts-ignore
[t,];
var __VLS_356;
// @ts-ignore
[];
var __VLS_344;
let __VLS_359;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogFooter | typeof __VLS_components.AlertDialogFooter} */
AlertDialogFooter;
// @ts-ignore
const __VLS_360 = __VLS_asFunctionalComponent1(__VLS_359, new __VLS_359({}));
const __VLS_361 = __VLS_360({}, ...__VLS_functionalComponentArgsRest(__VLS_360));
const { default: __VLS_364 } = __VLS_362.slots;
let __VLS_365;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogCancel | typeof __VLS_components.AlertDialogCancel} */
AlertDialogCancel;
// @ts-ignore
const __VLS_366 = __VLS_asFunctionalComponent1(__VLS_365, new __VLS_365({
    ...{ 'onClick': {} },
}));
const __VLS_367 = __VLS_366({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_366));
let __VLS_370;
const __VLS_371 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.deleteConfirmVisible = false;
            // @ts-ignore
            [deleteConfirmVisible,];
        } });
const { default: __VLS_372 } = __VLS_368.slots;
(__VLS_ctx.t("config.cancel"));
// @ts-ignore
[t,];
var __VLS_368;
var __VLS_369;
let __VLS_373;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogAction | typeof __VLS_components.AlertDialogAction} */
AlertDialogAction;
// @ts-ignore
const __VLS_374 = __VLS_asFunctionalComponent1(__VLS_373, new __VLS_373({
    ...{ 'onClick': {} },
}));
const __VLS_375 = __VLS_374({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_374));
let __VLS_378;
const __VLS_379 = ({ click: {} },
    { onClick: (__VLS_ctx.confirmDelete) });
const { default: __VLS_380 } = __VLS_376.slots;
(__VLS_ctx.t("config.confirm"));
// @ts-ignore
[t, confirmDelete,];
var __VLS_376;
var __VLS_377;
// @ts-ignore
[];
var __VLS_362;
// @ts-ignore
[];
var __VLS_338;
// @ts-ignore
[];
var __VLS_330;
var __VLS_331;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map