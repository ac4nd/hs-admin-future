import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { SearchIcon, RotateCcwIcon, PlusIcon, TrashIcon, PencilIcon, ArrowLeftIcon, HelpCircleIcon, } from "@lucide/vue";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableEmpty, } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import DictAPI from "@/api/system/dict";
defineOptions({ name: "DictItem", inheritAttrs: false });
const route = useRoute();
const router = useRouter();
const dictCode = ref(route.query.dictCode);
const pageTitle = ref(route.query.title || "字典数据");
const tagTypes = ["primary", "success", "info", "warning", "danger"];
/** 标签类型 → Badge variant 映射 */
function tagVariant(tagType) {
    const map = {
        primary: "default",
        success: "outline",
        info: "secondary",
        warning: "outline",
        danger: "destructive",
    };
    return map[tagType ?? ""] ?? "secondary";
}
function onTagTypeClear(val) {
    if (val === "" || val === undefined || val === null) {
        formData.tagType = "";
    }
}
// ==================== 查询 ====================
const queryParams = reactive({ pageNum: 1, pageSize: 10 });
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
async function fetchData() {
    loading.value = true;
    try {
        const data = await DictAPI.getDictItemPage(dictCode.value, queryParams);
        tableData.value = data.list ?? [];
        total.value = data.total ?? 0;
    }
    finally {
        loading.value = false;
    }
}
function handleQuery() {
    queryParams.pageNum = 1;
    fetchData();
}
function handleResetQuery() {
    queryParams.keywords = undefined;
    handleQuery();
}
// ==================== 选择 ====================
const checkedIds = ref(new Set());
const hasSelection = computed(() => checkedIds.value.size > 0);
function isChecked(id) {
    return checkedIds.value.has(id);
}
function toggleRow(row) {
    const s = new Set(checkedIds.value);
    if (s.has(row.id)) {
        s.delete(row.id);
    }
    else {
        s.add(row.id);
    }
    checkedIds.value = s;
}
const isAllSelected = computed(() => tableData.value.length > 0 && tableData.value.every((r) => checkedIds.value.has(r.id)));
function toggleAll(val) {
    const s = new Set();
    if (val === true)
        tableData.value.forEach((r) => s.add(r.id));
    checkedIds.value = s;
}
// ==================== 表单 ====================
const dialogState = reactive({ visible: false, title: "" });
const initialFormData = { sort: 1, status: 1, tagType: "" };
const formData = reactive({ ...initialFormData });
function openDialog(row) {
    Object.assign(formData, { ...initialFormData, dictCode: dictCode.value });
    dialogState.title = row?.id ? "编辑字典值" : "新增字典项";
    if (row?.id) {
        DictAPI.getDictItemFormData(dictCode.value, row.id).then((data) => {
            Object.assign(formData, data);
        });
    }
    dialogState.visible = true;
}
function onDialogOpenChange(val) {
    if (!val)
        closeDialog();
}
function closeDialog() {
    dialogState.visible = false;
}
const handleSubmit = async () => {
    if (!formData.label) {
        toast.error("请输入字典标签");
        return;
    }
    if (!formData.value) {
        toast.error("请输入字典值");
        return;
    }
    loading.value = true;
    try {
        if (formData.id) {
            await DictAPI.updateDictItem(dictCode.value, formData.id, formData);
            toast.success("修改成功");
        }
        else {
            await DictAPI.createDictItem(dictCode.value, formData);
            toast.success("新增成功");
        }
        closeDialog();
        handleQuery();
    }
    finally {
        loading.value = false;
    }
};
// ==================== 删除 ====================
const deleteState = reactive({ visible: false, ids: "" });
function handleDelete(id) {
    const ids = id ?? [...checkedIds.value].join(",");
    if (!ids) {
        toast.warning("请勾选删除项");
        return;
    }
    deleteState.ids = ids;
    deleteState.visible = true;
}
async function confirmDelete() {
    await DictAPI.deleteDictItems(dictCode.value, deleteState.ids);
    toast.success("删除成功");
    deleteState.visible = false;
    checkedIds.value = new Set();
    handleQuery();
}
// ==================== 分页 ====================
const totalPages = computed(() => Math.ceil(total.value / queryParams.pageSize));
const paginationItems = computed(() => {
    const pages = [];
    const cur = queryParams.pageNum;
    const tp = totalPages.value;
    if (tp <= 7) {
        for (let i = 1; i <= tp; i++)
            pages.push(i);
        return pages;
    }
    pages.push(1);
    if (cur > 3)
        pages.push(-1);
    for (let i = Math.max(2, cur - 1); i <= Math.min(tp - 1, cur + 1); i++)
        pages.push(i);
    if (cur < tp - 2)
        pages.push(-2);
    pages.push(tp);
    return pages;
});
function onPageChange(page) {
    if (page < 1 || page > totalPages.value)
        return;
    queryParams.pageNum = page;
    fetchData();
}
// ==================== 导航 ====================
function goBack() {
    router.push({ name: "Dict" });
}
// ==================== 初始化 ====================
onMounted(() => handleQuery());
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2 text-sm" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (__VLS_ctx.goBack) });
const { default: __VLS_7 } = __VLS_3.slots;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.ArrowLeftIcon} */
ArrowLeftIcon;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    ...{ class: "size-3.5 mr-1" },
}));
const __VLS_10 = __VLS_9({
    ...{ class: "size-3.5 mr-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
// @ts-ignore
[goBack,];
var __VLS_3;
var __VLS_4;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.Separator} */
Separator;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    orientation: "vertical",
    ...{ class: "h-4" },
}));
const __VLS_15 = __VLS_14({
    orientation: "vertical",
    ...{ class: "h-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
(__VLS_ctx.pageTitle);
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({}));
const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_23 } = __VLS_21.slots;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    ...{ class: "pt-5 pb-4" },
}));
const __VLS_26 = __VLS_25({
    ...{ class: "pt-5 pb-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
/** @type {__VLS_StyleScopedClasses['pt-5']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-4']} */ ;
const { default: __VLS_29 } = __VLS_27.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-wrap items-end gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-end']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    ...{ class: "text-xs" },
}));
const __VLS_32 = __VLS_31({
    ...{ class: "text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_35 } = __VLS_33.slots;
// @ts-ignore
[pageTitle,];
var __VLS_33;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.keywords),
    modelModifiers: { trim: true, },
    placeholder: "字典标签/字典值",
    ...{ class: "w-52 h-8 text-sm" },
}));
const __VLS_38 = __VLS_37({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.keywords),
    modelModifiers: { trim: true, },
    placeholder: "字典标签/字典值",
    ...{ class: "w-52 h-8 text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_41;
const __VLS_42 = ({ keyup: {} },
    { onKeyup: (__VLS_ctx.handleQuery) });
/** @type {__VLS_StyleScopedClasses['w-52']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
var __VLS_39;
var __VLS_40;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
let __VLS_43;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
    ...{ 'onClick': {} },
    size: "sm",
}));
const __VLS_45 = __VLS_44({
    ...{ 'onClick': {} },
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
let __VLS_48;
const __VLS_49 = ({ click: {} },
    { onClick: (__VLS_ctx.handleQuery) });
const { default: __VLS_50 } = __VLS_46.slots;
let __VLS_51;
/** @ts-ignore @type { | typeof __VLS_components.SearchIcon} */
SearchIcon;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
    ...{ class: "size-3.5" },
}));
const __VLS_53 = __VLS_52({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[queryParams, handleQuery, handleQuery,];
var __VLS_46;
var __VLS_47;
let __VLS_56;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}));
const __VLS_58 = __VLS_57({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
let __VLS_61;
const __VLS_62 = ({ click: {} },
    { onClick: (__VLS_ctx.handleResetQuery) });
const { default: __VLS_63 } = __VLS_59.slots;
let __VLS_64;
/** @ts-ignore @type { | typeof __VLS_components.RotateCcwIcon} */
RotateCcwIcon;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
    ...{ class: "size-3.5" },
}));
const __VLS_66 = __VLS_65({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[handleResetQuery,];
var __VLS_59;
var __VLS_60;
// @ts-ignore
[];
var __VLS_27;
// @ts-ignore
[];
var __VLS_21;
let __VLS_69;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({}));
const __VLS_71 = __VLS_70({}, ...__VLS_functionalComponentArgsRest(__VLS_70));
const { default: __VLS_74 } = __VLS_72.slots;
let __VLS_75;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
    ...{ class: "pb-3" },
}));
const __VLS_77 = __VLS_76({
    ...{ class: "pb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
/** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
const { default: __VLS_80 } = __VLS_78.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
let __VLS_81;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
    ...{ 'onClick': {} },
    size: "sm",
}));
const __VLS_83 = __VLS_82({
    ...{ 'onClick': {} },
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
let __VLS_86;
const __VLS_87 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.openDialog();
            // @ts-ignore
            [openDialog,];
        } });
const { default: __VLS_88 } = __VLS_84.slots;
let __VLS_89;
/** @ts-ignore @type { | typeof __VLS_components.PlusIcon} */
PlusIcon;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent1(__VLS_89, new __VLS_89({
    ...{ class: "size-3.5" },
}));
const __VLS_91 = __VLS_90({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[];
var __VLS_84;
var __VLS_85;
let __VLS_94;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent1(__VLS_94, new __VLS_94({
    ...{ 'onClick': {} },
    variant: "destructive",
    size: "sm",
    disabled: (!__VLS_ctx.hasSelection),
}));
const __VLS_96 = __VLS_95({
    ...{ 'onClick': {} },
    variant: "destructive",
    size: "sm",
    disabled: (!__VLS_ctx.hasSelection),
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
let __VLS_99;
const __VLS_100 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.handleDelete();
            // @ts-ignore
            [hasSelection, handleDelete,];
        } });
const { default: __VLS_101 } = __VLS_97.slots;
let __VLS_102;
/** @ts-ignore @type { | typeof __VLS_components.TrashIcon} */
TrashIcon;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
    ...{ class: "size-3.5" },
}));
const __VLS_104 = __VLS_103({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[];
var __VLS_97;
var __VLS_98;
// @ts-ignore
[];
var __VLS_78;
let __VLS_107;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({}));
const __VLS_109 = __VLS_108({}, ...__VLS_functionalComponentArgsRest(__VLS_108));
const { default: __VLS_112 } = __VLS_110.slots;
let __VLS_113;
/** @ts-ignore @type { | typeof __VLS_components.Table | typeof __VLS_components.Table} */
Table;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent1(__VLS_113, new __VLS_113({}));
const __VLS_115 = __VLS_114({}, ...__VLS_functionalComponentArgsRest(__VLS_114));
const { default: __VLS_118 } = __VLS_116.slots;
let __VLS_119;
/** @ts-ignore @type { | typeof __VLS_components.TableHeader | typeof __VLS_components.TableHeader} */
TableHeader;
// @ts-ignore
const __VLS_120 = __VLS_asFunctionalComponent1(__VLS_119, new __VLS_119({}));
const __VLS_121 = __VLS_120({}, ...__VLS_functionalComponentArgsRest(__VLS_120));
const { default: __VLS_124 } = __VLS_122.slots;
let __VLS_125;
/** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
TableRow;
// @ts-ignore
const __VLS_126 = __VLS_asFunctionalComponent1(__VLS_125, new __VLS_125({}));
const __VLS_127 = __VLS_126({}, ...__VLS_functionalComponentArgsRest(__VLS_126));
const { default: __VLS_130 } = __VLS_128.slots;
let __VLS_131;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_132 = __VLS_asFunctionalComponent1(__VLS_131, new __VLS_131({
    ...{ class: "w-10" },
}));
const __VLS_133 = __VLS_132({
    ...{ class: "w-10" },
}, ...__VLS_functionalComponentArgsRest(__VLS_132));
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
const { default: __VLS_136 } = __VLS_134.slots;
let __VLS_137;
/** @ts-ignore @type { | typeof __VLS_components.Checkbox} */
Checkbox;
// @ts-ignore
const __VLS_138 = __VLS_asFunctionalComponent1(__VLS_137, new __VLS_137({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.isAllSelected),
}));
const __VLS_139 = __VLS_138({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.isAllSelected),
}, ...__VLS_functionalComponentArgsRest(__VLS_138));
let __VLS_142;
const __VLS_143 = ({ 'update:checked': {} },
    { 'onUpdate:checked': (__VLS_ctx.toggleAll) });
var __VLS_140;
var __VLS_141;
// @ts-ignore
[isAllSelected, toggleAll,];
var __VLS_134;
let __VLS_144;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_145 = __VLS_asFunctionalComponent1(__VLS_144, new __VLS_144({}));
const __VLS_146 = __VLS_145({}, ...__VLS_functionalComponentArgsRest(__VLS_145));
const { default: __VLS_149 } = __VLS_147.slots;
// @ts-ignore
[];
var __VLS_147;
let __VLS_150;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_151 = __VLS_asFunctionalComponent1(__VLS_150, new __VLS_150({}));
const __VLS_152 = __VLS_151({}, ...__VLS_functionalComponentArgsRest(__VLS_151));
const { default: __VLS_155 } = __VLS_153.slots;
// @ts-ignore
[];
var __VLS_153;
let __VLS_156;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_157 = __VLS_asFunctionalComponent1(__VLS_156, new __VLS_156({
    ...{ class: "w-20" },
}));
const __VLS_158 = __VLS_157({
    ...{ class: "w-20" },
}, ...__VLS_functionalComponentArgsRest(__VLS_157));
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
const { default: __VLS_161 } = __VLS_159.slots;
// @ts-ignore
[];
var __VLS_159;
let __VLS_162;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_163 = __VLS_asFunctionalComponent1(__VLS_162, new __VLS_162({
    ...{ class: "w-20" },
}));
const __VLS_164 = __VLS_163({
    ...{ class: "w-20" },
}, ...__VLS_functionalComponentArgsRest(__VLS_163));
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
const { default: __VLS_167 } = __VLS_165.slots;
// @ts-ignore
[];
var __VLS_165;
let __VLS_168;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_169 = __VLS_asFunctionalComponent1(__VLS_168, new __VLS_168({
    ...{ class: "w-36 text-right" },
}));
const __VLS_170 = __VLS_169({
    ...{ class: "w-36 text-right" },
}, ...__VLS_functionalComponentArgsRest(__VLS_169));
/** @type {__VLS_StyleScopedClasses['w-36']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
const { default: __VLS_173 } = __VLS_171.slots;
// @ts-ignore
[];
var __VLS_171;
// @ts-ignore
[];
var __VLS_128;
// @ts-ignore
[];
var __VLS_122;
let __VLS_174;
/** @ts-ignore @type { | typeof __VLS_components.TableBody | typeof __VLS_components.TableBody} */
TableBody;
// @ts-ignore
const __VLS_175 = __VLS_asFunctionalComponent1(__VLS_174, new __VLS_174({}));
const __VLS_176 = __VLS_175({}, ...__VLS_functionalComponentArgsRest(__VLS_175));
const { default: __VLS_179 } = __VLS_177.slots;
if (__VLS_ctx.loading) {
    for (const [i] of __VLS_vFor((5))) {
        let __VLS_180;
        /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
        TableRow;
        // @ts-ignore
        const __VLS_181 = __VLS_asFunctionalComponent1(__VLS_180, new __VLS_180({
            key: ('skeleton-' + i),
        }));
        const __VLS_182 = __VLS_181({
            key: ('skeleton-' + i),
        }, ...__VLS_functionalComponentArgsRest(__VLS_181));
        const { default: __VLS_185 } = __VLS_183.slots;
        for (const [j] of __VLS_vFor((6))) {
            let __VLS_186;
            /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
            TableCell;
            // @ts-ignore
            const __VLS_187 = __VLS_asFunctionalComponent1(__VLS_186, new __VLS_186({
                key: ('sk-' + j),
            }));
            const __VLS_188 = __VLS_187({
                key: ('sk-' + j),
            }, ...__VLS_functionalComponentArgsRest(__VLS_187));
            const { default: __VLS_191 } = __VLS_189.slots;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
                ...{ class: "h-4 bg-muted rounded animate-pulse" },
            });
            /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
            /** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
            // @ts-ignore
            [loading,];
            var __VLS_189;
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_183;
        // @ts-ignore
        [];
    }
}
else if (__VLS_ctx.tableData.length === 0) {
    let __VLS_192;
    /** @ts-ignore @type { | typeof __VLS_components.TableEmpty | typeof __VLS_components.TableEmpty} */
    TableEmpty;
    // @ts-ignore
    const __VLS_193 = __VLS_asFunctionalComponent1(__VLS_192, new __VLS_192({
        colspan: (6),
    }));
    const __VLS_194 = __VLS_193({
        colspan: (6),
    }, ...__VLS_functionalComponentArgsRest(__VLS_193));
    const { default: __VLS_197 } = __VLS_195.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-muted-foreground text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    // @ts-ignore
    [tableData,];
    var __VLS_195;
}
else {
    for (const [row] of __VLS_vFor((__VLS_ctx.tableData))) {
        let __VLS_198;
        /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
        TableRow;
        // @ts-ignore
        const __VLS_199 = __VLS_asFunctionalComponent1(__VLS_198, new __VLS_198({
            key: (row.id),
            dataState: (__VLS_ctx.isChecked(row.id) ? 'selected' : undefined),
        }));
        const __VLS_200 = __VLS_199({
            key: (row.id),
            dataState: (__VLS_ctx.isChecked(row.id) ? 'selected' : undefined),
        }, ...__VLS_functionalComponentArgsRest(__VLS_199));
        const { default: __VLS_203 } = __VLS_201.slots;
        let __VLS_204;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_205 = __VLS_asFunctionalComponent1(__VLS_204, new __VLS_204({}));
        const __VLS_206 = __VLS_205({}, ...__VLS_functionalComponentArgsRest(__VLS_205));
        const { default: __VLS_209 } = __VLS_207.slots;
        let __VLS_210;
        /** @ts-ignore @type { | typeof __VLS_components.Checkbox} */
        Checkbox;
        // @ts-ignore
        const __VLS_211 = __VLS_asFunctionalComponent1(__VLS_210, new __VLS_210({
            ...{ 'onUpdate:checked': {} },
            checked: (__VLS_ctx.isChecked(row.id)),
        }));
        const __VLS_212 = __VLS_211({
            ...{ 'onUpdate:checked': {} },
            checked: (__VLS_ctx.isChecked(row.id)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_211));
        let __VLS_215;
        const __VLS_216 = ({ 'update:checked': {} },
            { 'onUpdate:checked': (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.tableData.length === 0))
                        return;
                    __VLS_ctx.toggleRow(row);
                    // @ts-ignore
                    [tableData, isChecked, isChecked, toggleRow,];
                } });
        var __VLS_213;
        var __VLS_214;
        // @ts-ignore
        [];
        var __VLS_207;
        let __VLS_217;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_218 = __VLS_asFunctionalComponent1(__VLS_217, new __VLS_217({}));
        const __VLS_219 = __VLS_218({}, ...__VLS_functionalComponentArgsRest(__VLS_218));
        const { default: __VLS_222 } = __VLS_220.slots;
        if (row.tagType) {
            let __VLS_223;
            /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
            Badge;
            // @ts-ignore
            const __VLS_224 = __VLS_asFunctionalComponent1(__VLS_223, new __VLS_223({
                variant: (__VLS_ctx.tagVariant(row.tagType)),
                ...{ class: "text-[10px]" },
            }));
            const __VLS_225 = __VLS_224({
                variant: (__VLS_ctx.tagVariant(row.tagType)),
                ...{ class: "text-[10px]" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_224));
            /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
            const { default: __VLS_228 } = __VLS_226.slots;
            (row.label);
            // @ts-ignore
            [tagVariant,];
            var __VLS_226;
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-sm" },
            });
            /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
            (row.label);
        }
        // @ts-ignore
        [];
        var __VLS_220;
        let __VLS_229;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_230 = __VLS_asFunctionalComponent1(__VLS_229, new __VLS_229({}));
        const __VLS_231 = __VLS_230({}, ...__VLS_functionalComponentArgsRest(__VLS_230));
        const { default: __VLS_234 } = __VLS_232.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({
            ...{ class: "text-xs bg-muted px-1.5 py-0.5 rounded" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        (row.value);
        // @ts-ignore
        [];
        var __VLS_232;
        let __VLS_235;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_236 = __VLS_asFunctionalComponent1(__VLS_235, new __VLS_235({
            ...{ class: "text-sm text-muted-foreground" },
        }));
        const __VLS_237 = __VLS_236({
            ...{ class: "text-sm text-muted-foreground" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_236));
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        const { default: __VLS_240 } = __VLS_238.slots;
        (row.sort);
        // @ts-ignore
        [];
        var __VLS_238;
        let __VLS_241;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_242 = __VLS_asFunctionalComponent1(__VLS_241, new __VLS_241({}));
        const __VLS_243 = __VLS_242({}, ...__VLS_functionalComponentArgsRest(__VLS_242));
        const { default: __VLS_246 } = __VLS_244.slots;
        let __VLS_247;
        /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
        Badge;
        // @ts-ignore
        const __VLS_248 = __VLS_asFunctionalComponent1(__VLS_247, new __VLS_247({
            variant: (row.status === 1 ? 'default' : 'secondary'),
            ...{ class: "text-[10px]" },
        }));
        const __VLS_249 = __VLS_248({
            variant: (row.status === 1 ? 'default' : 'secondary'),
            ...{ class: "text-[10px]" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_248));
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        const { default: __VLS_252 } = __VLS_250.slots;
        (row.status === 1 ? "启用" : "禁用");
        // @ts-ignore
        [];
        var __VLS_250;
        // @ts-ignore
        [];
        var __VLS_244;
        let __VLS_253;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_254 = __VLS_asFunctionalComponent1(__VLS_253, new __VLS_253({
            ...{ class: "text-right" },
        }));
        const __VLS_255 = __VLS_254({
            ...{ class: "text-right" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_254));
        /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
        const { default: __VLS_258 } = __VLS_256.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center justify-end gap-1" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
        let __VLS_259;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_260 = __VLS_asFunctionalComponent1(__VLS_259, new __VLS_259({
            ...{ 'onClick': {} },
            variant: "ghost",
            size: "sm",
        }));
        const __VLS_261 = __VLS_260({
            ...{ 'onClick': {} },
            variant: "ghost",
            size: "sm",
        }, ...__VLS_functionalComponentArgsRest(__VLS_260));
        let __VLS_264;
        const __VLS_265 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.tableData.length === 0))
                        return;
                    __VLS_ctx.openDialog(row);
                    // @ts-ignore
                    [openDialog,];
                } });
        const { default: __VLS_266 } = __VLS_262.slots;
        let __VLS_267;
        /** @ts-ignore @type { | typeof __VLS_components.PencilIcon} */
        PencilIcon;
        // @ts-ignore
        const __VLS_268 = __VLS_asFunctionalComponent1(__VLS_267, new __VLS_267({
            ...{ class: "size-3.5 mr-1" },
        }));
        const __VLS_269 = __VLS_268({
            ...{ class: "size-3.5 mr-1" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_268));
        /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
        // @ts-ignore
        [];
        var __VLS_262;
        var __VLS_263;
        let __VLS_272;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_273 = __VLS_asFunctionalComponent1(__VLS_272, new __VLS_272({
            ...{ 'onClick': {} },
            variant: "ghost",
            size: "sm",
            ...{ class: "text-destructive hover:text-destructive" },
        }));
        const __VLS_274 = __VLS_273({
            ...{ 'onClick': {} },
            variant: "ghost",
            size: "sm",
            ...{ class: "text-destructive hover:text-destructive" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_273));
        let __VLS_277;
        const __VLS_278 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.tableData.length === 0))
                        return;
                    __VLS_ctx.handleDelete(row.id);
                    // @ts-ignore
                    [handleDelete,];
                } });
        /** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:text-destructive']} */ ;
        const { default: __VLS_279 } = __VLS_275.slots;
        let __VLS_280;
        /** @ts-ignore @type { | typeof __VLS_components.TrashIcon} */
        TrashIcon;
        // @ts-ignore
        const __VLS_281 = __VLS_asFunctionalComponent1(__VLS_280, new __VLS_280({
            ...{ class: "size-3.5 mr-1" },
        }));
        const __VLS_282 = __VLS_281({
            ...{ class: "size-3.5 mr-1" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_281));
        /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
        // @ts-ignore
        [];
        var __VLS_275;
        var __VLS_276;
        // @ts-ignore
        [];
        var __VLS_256;
        // @ts-ignore
        [];
        var __VLS_201;
        // @ts-ignore
        [];
    }
}
// @ts-ignore
[];
var __VLS_177;
// @ts-ignore
[];
var __VLS_116;
if (__VLS_ctx.total > 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between mt-4" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-xs text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.total);
    let __VLS_285;
    /** @ts-ignore @type { | typeof __VLS_components.Pagination | typeof __VLS_components.Pagination} */
    Pagination;
    // @ts-ignore
    const __VLS_286 = __VLS_asFunctionalComponent1(__VLS_285, new __VLS_285({
        ...{ 'onUpdate:page': {} },
        page: (__VLS_ctx.queryParams.pageNum),
        total: (__VLS_ctx.total),
        itemsPerPage: (__VLS_ctx.queryParams.pageSize),
    }));
    const __VLS_287 = __VLS_286({
        ...{ 'onUpdate:page': {} },
        page: (__VLS_ctx.queryParams.pageNum),
        total: (__VLS_ctx.total),
        itemsPerPage: (__VLS_ctx.queryParams.pageSize),
    }, ...__VLS_functionalComponentArgsRest(__VLS_286));
    let __VLS_290;
    const __VLS_291 = ({ 'update:page': {} },
        { 'onUpdate:page': (__VLS_ctx.onPageChange) });
    const { default: __VLS_292 } = __VLS_288.slots;
    let __VLS_293;
    /** @ts-ignore @type { | typeof __VLS_components.PaginationContent | typeof __VLS_components.PaginationContent} */
    PaginationContent;
    // @ts-ignore
    const __VLS_294 = __VLS_asFunctionalComponent1(__VLS_293, new __VLS_293({}));
    const __VLS_295 = __VLS_294({}, ...__VLS_functionalComponentArgsRest(__VLS_294));
    const { default: __VLS_298 } = __VLS_296.slots;
    let __VLS_299;
    /** @ts-ignore @type { | typeof __VLS_components.PaginationPrevious} */
    PaginationPrevious;
    // @ts-ignore
    const __VLS_300 = __VLS_asFunctionalComponent1(__VLS_299, new __VLS_299({}));
    const __VLS_301 = __VLS_300({}, ...__VLS_functionalComponentArgsRest(__VLS_300));
    for (const [item] of __VLS_vFor((__VLS_ctx.paginationItems))) {
        let __VLS_304;
        /** @ts-ignore @type { | typeof __VLS_components.PaginationItem | typeof __VLS_components.PaginationItem} */
        PaginationItem;
        // @ts-ignore
        const __VLS_305 = __VLS_asFunctionalComponent1(__VLS_304, new __VLS_304({
            key: (item),
            value: (item),
            asChild: true,
        }));
        const __VLS_306 = __VLS_305({
            key: (item),
            value: (item),
            asChild: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_305));
        const { default: __VLS_309 } = __VLS_307.slots;
        let __VLS_310;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_311 = __VLS_asFunctionalComponent1(__VLS_310, new __VLS_310({
            variant: "ghost",
            size: "icon-xs",
            ...{ class: ({
                    'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground': item === __VLS_ctx.queryParams.pageNum,
                }) },
        }));
        const __VLS_312 = __VLS_311({
            variant: "ghost",
            size: "icon-xs",
            ...{ class: ({
                    'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground': item === __VLS_ctx.queryParams.pageNum,
                }) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_311));
        /** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-foreground']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:bg-primary/90']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:text-primary-foreground']} */ ;
        const { default: __VLS_315 } = __VLS_313.slots;
        (item);
        // @ts-ignore
        [queryParams, queryParams, queryParams, total, total, total, onPageChange, paginationItems,];
        var __VLS_313;
        // @ts-ignore
        [];
        var __VLS_307;
        // @ts-ignore
        [];
    }
    let __VLS_316;
    /** @ts-ignore @type { | typeof __VLS_components.PaginationNext} */
    PaginationNext;
    // @ts-ignore
    const __VLS_317 = __VLS_asFunctionalComponent1(__VLS_316, new __VLS_316({}));
    const __VLS_318 = __VLS_317({}, ...__VLS_functionalComponentArgsRest(__VLS_317));
    // @ts-ignore
    [];
    var __VLS_296;
    // @ts-ignore
    [];
    var __VLS_288;
    var __VLS_289;
}
// @ts-ignore
[];
var __VLS_110;
// @ts-ignore
[];
var __VLS_72;
let __VLS_321;
/** @ts-ignore @type { | typeof __VLS_components.Dialog | typeof __VLS_components.Dialog} */
Dialog;
// @ts-ignore
const __VLS_322 = __VLS_asFunctionalComponent1(__VLS_321, new __VLS_321({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogState.visible),
}));
const __VLS_323 = __VLS_322({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogState.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_322));
let __VLS_326;
const __VLS_327 = ({ 'update:open': {} },
    { 'onUpdate:open': (__VLS_ctx.onDialogOpenChange) });
const { default: __VLS_328 } = __VLS_324.slots;
let __VLS_329;
/** @ts-ignore @type { | typeof __VLS_components.DialogContent | typeof __VLS_components.DialogContent} */
DialogContent;
// @ts-ignore
const __VLS_330 = __VLS_asFunctionalComponent1(__VLS_329, new __VLS_329({
    ...{ class: "sm:max-w-md" },
}));
const __VLS_331 = __VLS_330({
    ...{ class: "sm:max-w-md" },
}, ...__VLS_functionalComponentArgsRest(__VLS_330));
/** @type {__VLS_StyleScopedClasses['sm:max-w-md']} */ ;
const { default: __VLS_334 } = __VLS_332.slots;
let __VLS_335;
/** @ts-ignore @type { | typeof __VLS_components.DialogHeader | typeof __VLS_components.DialogHeader} */
DialogHeader;
// @ts-ignore
const __VLS_336 = __VLS_asFunctionalComponent1(__VLS_335, new __VLS_335({}));
const __VLS_337 = __VLS_336({}, ...__VLS_functionalComponentArgsRest(__VLS_336));
const { default: __VLS_340 } = __VLS_338.slots;
let __VLS_341;
/** @ts-ignore @type { | typeof __VLS_components.DialogTitle | typeof __VLS_components.DialogTitle} */
DialogTitle;
// @ts-ignore
const __VLS_342 = __VLS_asFunctionalComponent1(__VLS_341, new __VLS_341({}));
const __VLS_343 = __VLS_342({}, ...__VLS_functionalComponentArgsRest(__VLS_342));
const { default: __VLS_346 } = __VLS_344.slots;
(__VLS_ctx.dialogState.title);
// @ts-ignore
[dialogState, dialogState, onDialogOpenChange,];
var __VLS_344;
// @ts-ignore
[];
var __VLS_338;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-4 py-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_347;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_348 = __VLS_asFunctionalComponent1(__VLS_347, new __VLS_347({}));
const __VLS_349 = __VLS_348({}, ...__VLS_functionalComponentArgsRest(__VLS_348));
const { default: __VLS_352 } = __VLS_350.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[];
var __VLS_350;
let __VLS_353;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_354 = __VLS_asFunctionalComponent1(__VLS_353, new __VLS_353({
    modelValue: (__VLS_ctx.formData.label),
    modelModifiers: { trim: true, },
    placeholder: "请输入字典标签",
}));
const __VLS_355 = __VLS_354({
    modelValue: (__VLS_ctx.formData.label),
    modelModifiers: { trim: true, },
    placeholder: "请输入字典标签",
}, ...__VLS_functionalComponentArgsRest(__VLS_354));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_358;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_359 = __VLS_asFunctionalComponent1(__VLS_358, new __VLS_358({}));
const __VLS_360 = __VLS_359({}, ...__VLS_functionalComponentArgsRest(__VLS_359));
const { default: __VLS_363 } = __VLS_361.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[formData,];
var __VLS_361;
let __VLS_364;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_365 = __VLS_asFunctionalComponent1(__VLS_364, new __VLS_364({
    modelValue: (__VLS_ctx.formData.value),
    modelModifiers: { trim: true, },
    placeholder: "请输入字典值",
}));
const __VLS_366 = __VLS_365({
    modelValue: (__VLS_ctx.formData.value),
    modelModifiers: { trim: true, },
    placeholder: "请输入字典值",
}, ...__VLS_functionalComponentArgsRest(__VLS_365));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_369;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_370 = __VLS_asFunctionalComponent1(__VLS_369, new __VLS_369({}));
const __VLS_371 = __VLS_370({}, ...__VLS_functionalComponentArgsRest(__VLS_370));
const { default: __VLS_374 } = __VLS_372.slots;
// @ts-ignore
[formData,];
var __VLS_372;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "flex items-center gap-1.5 cursor-pointer text-sm" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    type: "radio",
    value: (1),
    ...{ class: "accent-primary" },
});
(__VLS_ctx.formData.status);
/** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "flex items-center gap-1.5 cursor-pointer text-sm" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    type: "radio",
    value: (0),
    ...{ class: "accent-primary" },
});
(__VLS_ctx.formData.status);
/** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_375;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_376 = __VLS_asFunctionalComponent1(__VLS_375, new __VLS_375({}));
const __VLS_377 = __VLS_376({}, ...__VLS_functionalComponentArgsRest(__VLS_376));
const { default: __VLS_380 } = __VLS_378.slots;
// @ts-ignore
[formData, formData,];
var __VLS_378;
let __VLS_381;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_382 = __VLS_asFunctionalComponent1(__VLS_381, new __VLS_381({
    modelValue: (__VLS_ctx.formData.sort),
    modelModifiers: { number: true, },
    type: "number",
    ...{ class: "w-32 h-8" },
}));
const __VLS_383 = __VLS_382({
    modelValue: (__VLS_ctx.formData.sort),
    modelModifiers: { number: true, },
    type: "number",
    ...{ class: "w-32 h-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_382));
/** @type {__VLS_StyleScopedClasses['w-32']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-1" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
let __VLS_386;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_387 = __VLS_asFunctionalComponent1(__VLS_386, new __VLS_386({}));
const __VLS_388 = __VLS_387({}, ...__VLS_functionalComponentArgsRest(__VLS_387));
const { default: __VLS_391 } = __VLS_389.slots;
// @ts-ignore
[formData,];
var __VLS_389;
let __VLS_392;
/** @ts-ignore @type { | typeof __VLS_components.Tooltip | typeof __VLS_components.Tooltip} */
Tooltip;
// @ts-ignore
const __VLS_393 = __VLS_asFunctionalComponent1(__VLS_392, new __VLS_392({}));
const __VLS_394 = __VLS_393({}, ...__VLS_functionalComponentArgsRest(__VLS_393));
const { default: __VLS_397 } = __VLS_395.slots;
let __VLS_398;
/** @ts-ignore @type { | typeof __VLS_components.TooltipTrigger | typeof __VLS_components.TooltipTrigger} */
TooltipTrigger;
// @ts-ignore
const __VLS_399 = __VLS_asFunctionalComponent1(__VLS_398, new __VLS_398({
    asChild: true,
}));
const __VLS_400 = __VLS_399({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_399));
const { default: __VLS_403 } = __VLS_401.slots;
let __VLS_404;
/** @ts-ignore @type { | typeof __VLS_components.HelpCircleIcon} */
HelpCircleIcon;
// @ts-ignore
const __VLS_405 = __VLS_asFunctionalComponent1(__VLS_404, new __VLS_404({
    ...{ class: "size-3.5 text-muted-foreground cursor-help" },
}));
const __VLS_406 = __VLS_405({
    ...{ class: "size-3.5 text-muted-foreground cursor-help" },
}, ...__VLS_functionalComponentArgsRest(__VLS_405));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-help']} */ ;
// @ts-ignore
[];
var __VLS_401;
let __VLS_409;
/** @ts-ignore @type { | typeof __VLS_components.TooltipContent | typeof __VLS_components.TooltipContent} */
TooltipContent;
// @ts-ignore
const __VLS_410 = __VLS_asFunctionalComponent1(__VLS_409, new __VLS_409({
    side: "right",
}));
const __VLS_411 = __VLS_410({
    side: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_410));
const { default: __VLS_414 } = __VLS_412.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-xs" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
// @ts-ignore
[];
var __VLS_412;
// @ts-ignore
[];
var __VLS_395;
let __VLS_415;
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_416 = __VLS_asFunctionalComponent1(__VLS_415, new __VLS_415({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.formData.tagType),
}));
const __VLS_417 = __VLS_416({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.formData.tagType),
}, ...__VLS_functionalComponentArgsRest(__VLS_416));
let __VLS_420;
const __VLS_421 = ({ 'update:modelValue': {} },
    { 'onUpdate:modelValue': (__VLS_ctx.onTagTypeClear) });
const { default: __VLS_422 } = __VLS_418.slots;
let __VLS_423;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_424 = __VLS_asFunctionalComponent1(__VLS_423, new __VLS_423({
    ...{ class: "h-8 text-sm" },
}));
const __VLS_425 = __VLS_424({
    ...{ class: "h-8 text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_424));
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_428 } = __VLS_426.slots;
let __VLS_429;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_430 = __VLS_asFunctionalComponent1(__VLS_429, new __VLS_429({
    placeholder: "默认文本",
}));
const __VLS_431 = __VLS_430({
    placeholder: "默认文本",
}, ...__VLS_functionalComponentArgsRest(__VLS_430));
// @ts-ignore
[formData, onTagTypeClear,];
var __VLS_426;
let __VLS_434;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_435 = __VLS_asFunctionalComponent1(__VLS_434, new __VLS_434({}));
const __VLS_436 = __VLS_435({}, ...__VLS_functionalComponentArgsRest(__VLS_435));
const { default: __VLS_439 } = __VLS_437.slots;
let __VLS_440;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_441 = __VLS_asFunctionalComponent1(__VLS_440, new __VLS_440({
    value: "",
}));
const __VLS_442 = __VLS_441({
    value: "",
}, ...__VLS_functionalComponentArgsRest(__VLS_441));
const { default: __VLS_445 } = __VLS_443.slots;
// @ts-ignore
[];
var __VLS_443;
for (const [t] of __VLS_vFor((__VLS_ctx.tagTypes))) {
    let __VLS_446;
    /** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
    SelectItem;
    // @ts-ignore
    const __VLS_447 = __VLS_asFunctionalComponent1(__VLS_446, new __VLS_446({
        key: (t),
        value: (t),
    }));
    const __VLS_448 = __VLS_447({
        key: (t),
        value: (t),
    }, ...__VLS_functionalComponentArgsRest(__VLS_447));
    const { default: __VLS_451 } = __VLS_449.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    let __VLS_452;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_453 = __VLS_asFunctionalComponent1(__VLS_452, new __VLS_452({
        variant: (__VLS_ctx.tagVariant(t)),
        ...{ class: "text-[10px]" },
    }));
    const __VLS_454 = __VLS_453({
        variant: (__VLS_ctx.tagVariant(t)),
        ...{ class: "text-[10px]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_453));
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    const { default: __VLS_457 } = __VLS_455.slots;
    (__VLS_ctx.formData.label || "预览");
    // @ts-ignore
    [tagVariant, formData, tagTypes,];
    var __VLS_455;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (t);
    // @ts-ignore
    [];
    var __VLS_449;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_437;
// @ts-ignore
[];
var __VLS_418;
var __VLS_419;
let __VLS_458;
/** @ts-ignore @type { | typeof __VLS_components.DialogFooter | typeof __VLS_components.DialogFooter} */
DialogFooter;
// @ts-ignore
const __VLS_459 = __VLS_asFunctionalComponent1(__VLS_458, new __VLS_458({}));
const __VLS_460 = __VLS_459({}, ...__VLS_functionalComponentArgsRest(__VLS_459));
const { default: __VLS_463 } = __VLS_461.slots;
let __VLS_464;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_465 = __VLS_asFunctionalComponent1(__VLS_464, new __VLS_464({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_466 = __VLS_465({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_465));
let __VLS_469;
const __VLS_470 = ({ click: {} },
    { onClick: (__VLS_ctx.closeDialog) });
const { default: __VLS_471 } = __VLS_467.slots;
// @ts-ignore
[closeDialog,];
var __VLS_467;
var __VLS_468;
let __VLS_472;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_473 = __VLS_asFunctionalComponent1(__VLS_472, new __VLS_472({
    ...{ 'onClick': {} },
}));
const __VLS_474 = __VLS_473({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_473));
let __VLS_477;
const __VLS_478 = ({ click: {} },
    { onClick: (__VLS_ctx.handleSubmit) });
const { default: __VLS_479 } = __VLS_475.slots;
// @ts-ignore
[handleSubmit,];
var __VLS_475;
var __VLS_476;
// @ts-ignore
[];
var __VLS_461;
// @ts-ignore
[];
var __VLS_332;
// @ts-ignore
[];
var __VLS_324;
var __VLS_325;
let __VLS_480;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialog | typeof __VLS_components.AlertDialog} */
AlertDialog;
// @ts-ignore
const __VLS_481 = __VLS_asFunctionalComponent1(__VLS_480, new __VLS_480({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteState.visible),
}));
const __VLS_482 = __VLS_481({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteState.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_481));
let __VLS_485;
const __VLS_486 = ({ 'update:open': {} },
    { 'onUpdate:open': (...[$event]) => {
            __VLS_ctx.deleteState.visible = $event;
            // @ts-ignore
            [deleteState, deleteState,];
        } });
const { default: __VLS_487 } = __VLS_483.slots;
let __VLS_488;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogContent | typeof __VLS_components.AlertDialogContent} */
AlertDialogContent;
// @ts-ignore
const __VLS_489 = __VLS_asFunctionalComponent1(__VLS_488, new __VLS_488({}));
const __VLS_490 = __VLS_489({}, ...__VLS_functionalComponentArgsRest(__VLS_489));
const { default: __VLS_493 } = __VLS_491.slots;
let __VLS_494;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogHeader | typeof __VLS_components.AlertDialogHeader} */
AlertDialogHeader;
// @ts-ignore
const __VLS_495 = __VLS_asFunctionalComponent1(__VLS_494, new __VLS_494({}));
const __VLS_496 = __VLS_495({}, ...__VLS_functionalComponentArgsRest(__VLS_495));
const { default: __VLS_499 } = __VLS_497.slots;
let __VLS_500;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogTitle | typeof __VLS_components.AlertDialogTitle} */
AlertDialogTitle;
// @ts-ignore
const __VLS_501 = __VLS_asFunctionalComponent1(__VLS_500, new __VLS_500({}));
const __VLS_502 = __VLS_501({}, ...__VLS_functionalComponentArgsRest(__VLS_501));
const { default: __VLS_505 } = __VLS_503.slots;
// @ts-ignore
[];
var __VLS_503;
let __VLS_506;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogDescription | typeof __VLS_components.AlertDialogDescription} */
AlertDialogDescription;
// @ts-ignore
const __VLS_507 = __VLS_asFunctionalComponent1(__VLS_506, new __VLS_506({}));
const __VLS_508 = __VLS_507({}, ...__VLS_functionalComponentArgsRest(__VLS_507));
const { default: __VLS_511 } = __VLS_509.slots;
// @ts-ignore
[];
var __VLS_509;
// @ts-ignore
[];
var __VLS_497;
let __VLS_512;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogFooter | typeof __VLS_components.AlertDialogFooter} */
AlertDialogFooter;
// @ts-ignore
const __VLS_513 = __VLS_asFunctionalComponent1(__VLS_512, new __VLS_512({}));
const __VLS_514 = __VLS_513({}, ...__VLS_functionalComponentArgsRest(__VLS_513));
const { default: __VLS_517 } = __VLS_515.slots;
let __VLS_518;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogCancel | typeof __VLS_components.AlertDialogCancel} */
AlertDialogCancel;
// @ts-ignore
const __VLS_519 = __VLS_asFunctionalComponent1(__VLS_518, new __VLS_518({}));
const __VLS_520 = __VLS_519({}, ...__VLS_functionalComponentArgsRest(__VLS_519));
const { default: __VLS_523 } = __VLS_521.slots;
// @ts-ignore
[];
var __VLS_521;
let __VLS_524;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogAction | typeof __VLS_components.AlertDialogAction} */
AlertDialogAction;
// @ts-ignore
const __VLS_525 = __VLS_asFunctionalComponent1(__VLS_524, new __VLS_524({
    ...{ 'onClick': {} },
}));
const __VLS_526 = __VLS_525({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_525));
let __VLS_529;
const __VLS_530 = ({ click: {} },
    { onClick: (__VLS_ctx.confirmDelete) });
const { default: __VLS_531 } = __VLS_527.slots;
// @ts-ignore
[confirmDelete,];
var __VLS_527;
var __VLS_528;
// @ts-ignore
[];
var __VLS_515;
// @ts-ignore
[];
var __VLS_491;
// @ts-ignore
[];
var __VLS_483;
var __VLS_484;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=dict-item.vue.js.map