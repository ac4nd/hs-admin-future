import { computed, onMounted, reactive, ref } from "vue";
import { toast } from "vue-sonner";
import { SearchIcon, RotateCcwIcon, PlusIcon, TrashIcon, PencilIcon, EyeIcon, SendIcon, Undo2Icon, } from "@lucide/vue";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableEmpty, } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import NoticeAPI from "@/api/system/notice";
import UserAPI from "@/api/system/user";
defineOptions({ name: "Notice", inheritAttrs: false });
// ==================== 常量映射 ====================
/** 通知类型选项 */
const noticeTypeOptions = [
    { value: 1, label: "通知" },
    { value: 2, label: "公告" },
];
/** 通知等级选项 */
const noticeLevelOptions = [
    { value: "L", label: "低" },
    { value: "M", label: "中" },
    { value: "H", label: "高" },
];
function getTypeLabel(type) {
    return noticeTypeOptions.find((o) => o.value === type)?.label ?? "-";
}
function getTypeBadgeVariant(type) {
    return type === 2 ? "default" : "secondary";
}
function getLevelLabel(level) {
    return noticeLevelOptions.find((o) => o.value === level)?.label ?? "-";
}
function getLevelBadgeVariant(level) {
    const map = {
        H: "destructive",
        M: "warning",
        L: "secondary",
    };
    return map[level] ?? "secondary";
}
function getStatusLabel(status) {
    const map = { 0: "未发布", 1: "已发布", "-1": "已撤回" };
    return map[status] ?? "-";
}
function getStatusBadgeVariant(status) {
    const map = {
        0: "secondary",
        1: "success",
        "-1": "warning",
    };
    return map[status] ?? "secondary";
}
// ==================== 查询 ====================
const queryParams = reactive({ pageNum: 1, pageSize: 10 });
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
async function fetchData() {
    loading.value = true;
    try {
        const data = await NoticeAPI.getPage(queryParams);
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
    queryParams.title = undefined;
    queryParams.publishStatus = undefined;
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
// ==================== 表单弹窗 ====================
const dialogState = reactive({ visible: false, title: "" });
const initialFormData = { level: "L", targetType: 1 };
const formData = reactive({ ...initialFormData });
const userOptions = ref([]);
function handleCreateClick() {
    Object.assign(formData, { ...initialFormData, targetUsers: [] });
    dialogState.title = "新增通知";
    dialogState.visible = true;
    loadUserOptions();
}
async function handleEditClick(id) {
    Object.assign(formData, { ...initialFormData, targetUsers: [] });
    dialogState.title = "修改通知";
    const data = await NoticeAPI.getFormData(id);
    Object.assign(formData, {
        ...data,
        targetUsers: normalizeTargetUsers(data.targetUserIds),
    });
    dialogState.visible = true;
    loadUserOptions();
}
function loadUserOptions() {
    UserAPI.getOptions().then((data) => {
        userOptions.value = data ?? [];
    });
}
function onDialogOpenChange(val) {
    if (!val)
        closeDialog();
}
function closeDialog() {
    dialogState.visible = false;
}
const handleSubmit = async () => {
    if (!formData.title?.trim()) {
        toast.error("请输入通知标题");
        return;
    }
    if (formData.type === undefined || formData.type === null) {
        toast.error("请选择通知类型");
        return;
    }
    if (!formData.content?.trim()) {
        toast.error("请输入通知内容");
        return;
    }
    loading.value = true;
    try {
        const payload = {
            ...formData,
            targetUserIds: formData.targetType === 2 ? (formData.targetUsers ?? []) : [],
        };
        if (formData.id) {
            await NoticeAPI.update(formData.id, payload);
            toast.success("修改成功");
        }
        else {
            await NoticeAPI.create(payload);
            toast.success("新增成功");
        }
        closeDialog();
        handleQuery();
    }
    finally {
        loading.value = false;
    }
};
/** 标准化目标用户数据 */
function normalizeTargetUsers(value) {
    if (!value)
        return [];
    const toNumberArray = (arr) => arr.map((v) => Number(v)).filter((v) => Number.isFinite(v));
    if (Array.isArray(value))
        return toNumberArray(value);
    if (typeof value === "string") {
        try {
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed))
                return toNumberArray(parsed);
        }
        catch {
            /* fall through */
        }
        return value
            .split(",")
            .filter(Boolean)
            .map((v) => Number(v))
            .filter((v) => Number.isFinite(v));
    }
    return [];
}
// ==================== 发布/撤回 ====================
async function handlePublish(id) {
    await NoticeAPI.publish(id);
    toast.success("发布成功");
    fetchData();
}
async function handleRevoke(id) {
    await NoticeAPI.revoke(id);
    toast.success("撤回成功");
    fetchData();
}
// ==================== 详情弹窗 ====================
const detailDialog = reactive({ visible: false });
const currentNotice = ref({});
async function openDetailDialog(id) {
    currentNotice.value = await NoticeAPI.getDetail(id);
    detailDialog.visible = true;
}
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
    await NoticeAPI.deleteByIds(deleteState.ids);
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
    ...{ class: "pt-5 pb-4" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "pt-5 pb-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['pt-5']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-4']} */ ;
const { default: __VLS_11 } = __VLS_9.slots;
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
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    ...{ class: "text-xs" },
}));
const __VLS_14 = __VLS_13({
    ...{ class: "text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_17 } = __VLS_15.slots;
var __VLS_15;
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.title),
    modelModifiers: { trim: true, },
    placeholder: "通知标题",
    ...{ class: "w-52 h-8 text-sm" },
}));
const __VLS_20 = __VLS_19({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.title),
    modelModifiers: { trim: true, },
    placeholder: "通知标题",
    ...{ class: "w-52 h-8 text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
let __VLS_23;
const __VLS_24 = ({ keyup: {} },
    { onKeyup: (__VLS_ctx.handleQuery) });
/** @type {__VLS_StyleScopedClasses['w-52']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
var __VLS_21;
var __VLS_22;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    ...{ class: "text-xs" },
}));
const __VLS_27 = __VLS_26({
    ...{ class: "text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_30 } = __VLS_28.slots;
// @ts-ignore
[queryParams, handleQuery,];
var __VLS_28;
let __VLS_31;
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.queryParams.publishStatus),
}));
const __VLS_33 = __VLS_32({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.queryParams.publishStatus),
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
let __VLS_36;
const __VLS_37 = ({ 'update:modelValue': {} },
    { 'onUpdate:modelValue': (__VLS_ctx.handleQuery) });
const { default: __VLS_38 } = __VLS_34.slots;
let __VLS_39;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
    ...{ class: "w-28 h-8 text-sm" },
}));
const __VLS_41 = __VLS_40({
    ...{ class: "w-28 h-8 text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
/** @type {__VLS_StyleScopedClasses['w-28']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_44 } = __VLS_42.slots;
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
    placeholder: "全部",
}));
const __VLS_47 = __VLS_46({
    placeholder: "全部",
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
// @ts-ignore
[queryParams, handleQuery,];
var __VLS_42;
let __VLS_50;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({}));
const __VLS_52 = __VLS_51({}, ...__VLS_functionalComponentArgsRest(__VLS_51));
const { default: __VLS_55 } = __VLS_53.slots;
let __VLS_56;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
    value: (0),
}));
const __VLS_58 = __VLS_57({
    value: (0),
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
const { default: __VLS_61 } = __VLS_59.slots;
// @ts-ignore
[];
var __VLS_59;
let __VLS_62;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
    value: (1),
}));
const __VLS_64 = __VLS_63({
    value: (1),
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
const { default: __VLS_67 } = __VLS_65.slots;
// @ts-ignore
[];
var __VLS_65;
let __VLS_68;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
    value: (-1),
}));
const __VLS_70 = __VLS_69({
    value: (-1),
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
const { default: __VLS_73 } = __VLS_71.slots;
// @ts-ignore
[];
var __VLS_71;
// @ts-ignore
[];
var __VLS_53;
// @ts-ignore
[];
var __VLS_34;
var __VLS_35;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
let __VLS_74;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({
    ...{ 'onClick': {} },
    size: "sm",
}));
const __VLS_76 = __VLS_75({
    ...{ 'onClick': {} },
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_75));
let __VLS_79;
const __VLS_80 = ({ click: {} },
    { onClick: (__VLS_ctx.handleQuery) });
const { default: __VLS_81 } = __VLS_77.slots;
let __VLS_82;
/** @ts-ignore @type { | typeof __VLS_components.SearchIcon} */
SearchIcon;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({
    ...{ class: "size-3.5" },
}));
const __VLS_84 = __VLS_83({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[handleQuery,];
var __VLS_77;
var __VLS_78;
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}));
const __VLS_89 = __VLS_88({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
let __VLS_92;
const __VLS_93 = ({ click: {} },
    { onClick: (__VLS_ctx.handleResetQuery) });
const { default: __VLS_94 } = __VLS_90.slots;
let __VLS_95;
/** @ts-ignore @type { | typeof __VLS_components.RotateCcwIcon} */
RotateCcwIcon;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent1(__VLS_95, new __VLS_95({
    ...{ class: "size-3.5" },
}));
const __VLS_97 = __VLS_96({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_96));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[handleResetQuery,];
var __VLS_90;
var __VLS_91;
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
let __VLS_100;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({}));
const __VLS_102 = __VLS_101({}, ...__VLS_functionalComponentArgsRest(__VLS_101));
const { default: __VLS_105 } = __VLS_103.slots;
let __VLS_106;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent1(__VLS_106, new __VLS_106({
    ...{ class: "pb-3" },
}));
const __VLS_108 = __VLS_107({
    ...{ class: "pb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_107));
/** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
const { default: __VLS_111 } = __VLS_109.slots;
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
let __VLS_112;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_113 = __VLS_asFunctionalComponent1(__VLS_112, new __VLS_112({
    ...{ 'onClick': {} },
    size: "sm",
}));
const __VLS_114 = __VLS_113({
    ...{ 'onClick': {} },
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_113));
let __VLS_117;
const __VLS_118 = ({ click: {} },
    { onClick: (__VLS_ctx.handleCreateClick) });
const { default: __VLS_119 } = __VLS_115.slots;
let __VLS_120;
/** @ts-ignore @type { | typeof __VLS_components.PlusIcon} */
PlusIcon;
// @ts-ignore
const __VLS_121 = __VLS_asFunctionalComponent1(__VLS_120, new __VLS_120({
    ...{ class: "size-3.5" },
}));
const __VLS_122 = __VLS_121({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_121));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[handleCreateClick,];
var __VLS_115;
var __VLS_116;
let __VLS_125;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_126 = __VLS_asFunctionalComponent1(__VLS_125, new __VLS_125({
    ...{ 'onClick': {} },
    variant: "destructive",
    size: "sm",
    disabled: (!__VLS_ctx.hasSelection),
}));
const __VLS_127 = __VLS_126({
    ...{ 'onClick': {} },
    variant: "destructive",
    size: "sm",
    disabled: (!__VLS_ctx.hasSelection),
}, ...__VLS_functionalComponentArgsRest(__VLS_126));
let __VLS_130;
const __VLS_131 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.handleDelete();
            // @ts-ignore
            [hasSelection, handleDelete,];
        } });
const { default: __VLS_132 } = __VLS_128.slots;
let __VLS_133;
/** @ts-ignore @type { | typeof __VLS_components.TrashIcon} */
TrashIcon;
// @ts-ignore
const __VLS_134 = __VLS_asFunctionalComponent1(__VLS_133, new __VLS_133({
    ...{ class: "size-3.5" },
}));
const __VLS_135 = __VLS_134({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_134));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[];
var __VLS_128;
var __VLS_129;
// @ts-ignore
[];
var __VLS_109;
let __VLS_138;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent1(__VLS_138, new __VLS_138({}));
const __VLS_140 = __VLS_139({}, ...__VLS_functionalComponentArgsRest(__VLS_139));
const { default: __VLS_143 } = __VLS_141.slots;
let __VLS_144;
/** @ts-ignore @type { | typeof __VLS_components.Table | typeof __VLS_components.Table} */
Table;
// @ts-ignore
const __VLS_145 = __VLS_asFunctionalComponent1(__VLS_144, new __VLS_144({}));
const __VLS_146 = __VLS_145({}, ...__VLS_functionalComponentArgsRest(__VLS_145));
const { default: __VLS_149 } = __VLS_147.slots;
let __VLS_150;
/** @ts-ignore @type { | typeof __VLS_components.TableHeader | typeof __VLS_components.TableHeader} */
TableHeader;
// @ts-ignore
const __VLS_151 = __VLS_asFunctionalComponent1(__VLS_150, new __VLS_150({}));
const __VLS_152 = __VLS_151({}, ...__VLS_functionalComponentArgsRest(__VLS_151));
const { default: __VLS_155 } = __VLS_153.slots;
let __VLS_156;
/** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
TableRow;
// @ts-ignore
const __VLS_157 = __VLS_asFunctionalComponent1(__VLS_156, new __VLS_156({}));
const __VLS_158 = __VLS_157({}, ...__VLS_functionalComponentArgsRest(__VLS_157));
const { default: __VLS_161 } = __VLS_159.slots;
let __VLS_162;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_163 = __VLS_asFunctionalComponent1(__VLS_162, new __VLS_162({
    ...{ class: "w-10" },
}));
const __VLS_164 = __VLS_163({
    ...{ class: "w-10" },
}, ...__VLS_functionalComponentArgsRest(__VLS_163));
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
const { default: __VLS_167 } = __VLS_165.slots;
let __VLS_168;
/** @ts-ignore @type { | typeof __VLS_components.Checkbox} */
Checkbox;
// @ts-ignore
const __VLS_169 = __VLS_asFunctionalComponent1(__VLS_168, new __VLS_168({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.isAllSelected),
}));
const __VLS_170 = __VLS_169({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.isAllSelected),
}, ...__VLS_functionalComponentArgsRest(__VLS_169));
let __VLS_173;
const __VLS_174 = ({ 'update:checked': {} },
    { 'onUpdate:checked': (__VLS_ctx.toggleAll) });
var __VLS_171;
var __VLS_172;
// @ts-ignore
[isAllSelected, toggleAll,];
var __VLS_165;
let __VLS_175;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_176 = __VLS_asFunctionalComponent1(__VLS_175, new __VLS_175({
    ...{ class: "w-12" },
}));
const __VLS_177 = __VLS_176({
    ...{ class: "w-12" },
}, ...__VLS_functionalComponentArgsRest(__VLS_176));
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
const { default: __VLS_180 } = __VLS_178.slots;
// @ts-ignore
[];
var __VLS_178;
let __VLS_181;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_182 = __VLS_asFunctionalComponent1(__VLS_181, new __VLS_181({}));
const __VLS_183 = __VLS_182({}, ...__VLS_functionalComponentArgsRest(__VLS_182));
const { default: __VLS_186 } = __VLS_184.slots;
// @ts-ignore
[];
var __VLS_184;
let __VLS_187;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_188 = __VLS_asFunctionalComponent1(__VLS_187, new __VLS_187({
    ...{ class: "w-24" },
}));
const __VLS_189 = __VLS_188({
    ...{ class: "w-24" },
}, ...__VLS_functionalComponentArgsRest(__VLS_188));
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
const { default: __VLS_192 } = __VLS_190.slots;
// @ts-ignore
[];
var __VLS_190;
let __VLS_193;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_194 = __VLS_asFunctionalComponent1(__VLS_193, new __VLS_193({
    ...{ class: "w-24" },
}));
const __VLS_195 = __VLS_194({
    ...{ class: "w-24" },
}, ...__VLS_functionalComponentArgsRest(__VLS_194));
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
const { default: __VLS_198 } = __VLS_196.slots;
// @ts-ignore
[];
var __VLS_196;
let __VLS_199;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_200 = __VLS_asFunctionalComponent1(__VLS_199, new __VLS_199({
    ...{ class: "w-24" },
}));
const __VLS_201 = __VLS_200({
    ...{ class: "w-24" },
}, ...__VLS_functionalComponentArgsRest(__VLS_200));
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
const { default: __VLS_204 } = __VLS_202.slots;
// @ts-ignore
[];
var __VLS_202;
let __VLS_205;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_206 = __VLS_asFunctionalComponent1(__VLS_205, new __VLS_205({
    ...{ class: "w-24" },
}));
const __VLS_207 = __VLS_206({
    ...{ class: "w-24" },
}, ...__VLS_functionalComponentArgsRest(__VLS_206));
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
const { default: __VLS_210 } = __VLS_208.slots;
// @ts-ignore
[];
var __VLS_208;
let __VLS_211;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_212 = __VLS_asFunctionalComponent1(__VLS_211, new __VLS_211({
    ...{ class: "w-24" },
}));
const __VLS_213 = __VLS_212({
    ...{ class: "w-24" },
}, ...__VLS_functionalComponentArgsRest(__VLS_212));
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
const { default: __VLS_216 } = __VLS_214.slots;
// @ts-ignore
[];
var __VLS_214;
let __VLS_217;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_218 = __VLS_asFunctionalComponent1(__VLS_217, new __VLS_217({
    ...{ class: "w-52" },
}));
const __VLS_219 = __VLS_218({
    ...{ class: "w-52" },
}, ...__VLS_functionalComponentArgsRest(__VLS_218));
/** @type {__VLS_StyleScopedClasses['w-52']} */ ;
const { default: __VLS_222 } = __VLS_220.slots;
// @ts-ignore
[];
var __VLS_220;
let __VLS_223;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_224 = __VLS_asFunctionalComponent1(__VLS_223, new __VLS_223({
    ...{ class: "w-52 text-right" },
}));
const __VLS_225 = __VLS_224({
    ...{ class: "w-52 text-right" },
}, ...__VLS_functionalComponentArgsRest(__VLS_224));
/** @type {__VLS_StyleScopedClasses['w-52']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
const { default: __VLS_228 } = __VLS_226.slots;
// @ts-ignore
[];
var __VLS_226;
// @ts-ignore
[];
var __VLS_159;
// @ts-ignore
[];
var __VLS_153;
let __VLS_229;
/** @ts-ignore @type { | typeof __VLS_components.TableBody | typeof __VLS_components.TableBody} */
TableBody;
// @ts-ignore
const __VLS_230 = __VLS_asFunctionalComponent1(__VLS_229, new __VLS_229({}));
const __VLS_231 = __VLS_230({}, ...__VLS_functionalComponentArgsRest(__VLS_230));
const { default: __VLS_234 } = __VLS_232.slots;
if (__VLS_ctx.loading) {
    for (const [i] of __VLS_vFor((5))) {
        let __VLS_235;
        /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
        TableRow;
        // @ts-ignore
        const __VLS_236 = __VLS_asFunctionalComponent1(__VLS_235, new __VLS_235({
            key: ('skeleton-' + i),
        }));
        const __VLS_237 = __VLS_236({
            key: ('skeleton-' + i),
        }, ...__VLS_functionalComponentArgsRest(__VLS_236));
        const { default: __VLS_240 } = __VLS_238.slots;
        for (const [j] of __VLS_vFor((10))) {
            let __VLS_241;
            /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
            TableCell;
            // @ts-ignore
            const __VLS_242 = __VLS_asFunctionalComponent1(__VLS_241, new __VLS_241({
                key: ('sk-' + j),
            }));
            const __VLS_243 = __VLS_242({
                key: ('sk-' + j),
            }, ...__VLS_functionalComponentArgsRest(__VLS_242));
            const { default: __VLS_246 } = __VLS_244.slots;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
                ...{ class: "h-4 bg-muted rounded animate-pulse" },
            });
            /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
            /** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
            // @ts-ignore
            [loading,];
            var __VLS_244;
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_238;
        // @ts-ignore
        [];
    }
}
else if (__VLS_ctx.tableData.length === 0) {
    let __VLS_247;
    /** @ts-ignore @type { | typeof __VLS_components.TableEmpty | typeof __VLS_components.TableEmpty} */
    TableEmpty;
    // @ts-ignore
    const __VLS_248 = __VLS_asFunctionalComponent1(__VLS_247, new __VLS_247({
        colspan: (10),
    }));
    const __VLS_249 = __VLS_248({
        colspan: (10),
    }, ...__VLS_functionalComponentArgsRest(__VLS_248));
    const { default: __VLS_252 } = __VLS_250.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-muted-foreground text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    // @ts-ignore
    [tableData,];
    var __VLS_250;
}
else {
    for (const [row, index] of __VLS_vFor((__VLS_ctx.tableData))) {
        let __VLS_253;
        /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
        TableRow;
        // @ts-ignore
        const __VLS_254 = __VLS_asFunctionalComponent1(__VLS_253, new __VLS_253({
            key: (row.id),
            dataState: (__VLS_ctx.isChecked(row.id) ? 'selected' : undefined),
            ...{ class: "cursor-pointer" },
        }));
        const __VLS_255 = __VLS_254({
            key: (row.id),
            dataState: (__VLS_ctx.isChecked(row.id) ? 'selected' : undefined),
            ...{ class: "cursor-pointer" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_254));
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        const { default: __VLS_258 } = __VLS_256.slots;
        let __VLS_259;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_260 = __VLS_asFunctionalComponent1(__VLS_259, new __VLS_259({}));
        const __VLS_261 = __VLS_260({}, ...__VLS_functionalComponentArgsRest(__VLS_260));
        const { default: __VLS_264 } = __VLS_262.slots;
        let __VLS_265;
        /** @ts-ignore @type { | typeof __VLS_components.Checkbox} */
        Checkbox;
        // @ts-ignore
        const __VLS_266 = __VLS_asFunctionalComponent1(__VLS_265, new __VLS_265({
            ...{ 'onUpdate:checked': {} },
            checked: (__VLS_ctx.isChecked(row.id)),
        }));
        const __VLS_267 = __VLS_266({
            ...{ 'onUpdate:checked': {} },
            checked: (__VLS_ctx.isChecked(row.id)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_266));
        let __VLS_270;
        const __VLS_271 = ({ 'update:checked': {} },
            { 'onUpdate:checked': (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.tableData.length === 0))
                        return;
                    __VLS_ctx.toggleRow(row);
                    // @ts-ignore
                    [tableData, isChecked, isChecked, toggleRow,];
                } });
        var __VLS_268;
        var __VLS_269;
        // @ts-ignore
        [];
        var __VLS_262;
        let __VLS_272;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_273 = __VLS_asFunctionalComponent1(__VLS_272, new __VLS_272({
            ...{ class: "text-muted-foreground" },
        }));
        const __VLS_274 = __VLS_273({
            ...{ class: "text-muted-foreground" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_273));
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        const { default: __VLS_277 } = __VLS_275.slots;
        ((__VLS_ctx.queryParams.pageNum - 1) * __VLS_ctx.queryParams.pageSize + index + 1);
        // @ts-ignore
        [queryParams, queryParams,];
        var __VLS_275;
        let __VLS_278;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_279 = __VLS_asFunctionalComponent1(__VLS_278, new __VLS_278({
            ...{ class: "font-medium" },
        }));
        const __VLS_280 = __VLS_279({
            ...{ class: "font-medium" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_279));
        /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
        const { default: __VLS_283 } = __VLS_281.slots;
        (row.title);
        // @ts-ignore
        [];
        var __VLS_281;
        let __VLS_284;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_285 = __VLS_asFunctionalComponent1(__VLS_284, new __VLS_284({}));
        const __VLS_286 = __VLS_285({}, ...__VLS_functionalComponentArgsRest(__VLS_285));
        const { default: __VLS_289 } = __VLS_287.slots;
        let __VLS_290;
        /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
        Badge;
        // @ts-ignore
        const __VLS_291 = __VLS_asFunctionalComponent1(__VLS_290, new __VLS_290({
            variant: (__VLS_ctx.getTypeBadgeVariant(row.type)),
            ...{ class: "text-[10px]" },
        }));
        const __VLS_292 = __VLS_291({
            variant: (__VLS_ctx.getTypeBadgeVariant(row.type)),
            ...{ class: "text-[10px]" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_291));
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        const { default: __VLS_295 } = __VLS_293.slots;
        (__VLS_ctx.getTypeLabel(row.type));
        // @ts-ignore
        [getTypeBadgeVariant, getTypeLabel,];
        var __VLS_293;
        // @ts-ignore
        [];
        var __VLS_287;
        let __VLS_296;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_297 = __VLS_asFunctionalComponent1(__VLS_296, new __VLS_296({
            ...{ class: "text-sm" },
        }));
        const __VLS_298 = __VLS_297({
            ...{ class: "text-sm" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_297));
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        const { default: __VLS_301 } = __VLS_299.slots;
        (row.publisherName || "-");
        // @ts-ignore
        [];
        var __VLS_299;
        let __VLS_302;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_303 = __VLS_asFunctionalComponent1(__VLS_302, new __VLS_302({}));
        const __VLS_304 = __VLS_303({}, ...__VLS_functionalComponentArgsRest(__VLS_303));
        const { default: __VLS_307 } = __VLS_305.slots;
        let __VLS_308;
        /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
        Badge;
        // @ts-ignore
        const __VLS_309 = __VLS_asFunctionalComponent1(__VLS_308, new __VLS_308({
            variant: (__VLS_ctx.getLevelBadgeVariant(row.level)),
            ...{ class: "text-[10px]" },
        }));
        const __VLS_310 = __VLS_309({
            variant: (__VLS_ctx.getLevelBadgeVariant(row.level)),
            ...{ class: "text-[10px]" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_309));
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        const { default: __VLS_313 } = __VLS_311.slots;
        (__VLS_ctx.getLevelLabel(row.level));
        // @ts-ignore
        [getLevelBadgeVariant, getLevelLabel,];
        var __VLS_311;
        // @ts-ignore
        [];
        var __VLS_305;
        let __VLS_314;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_315 = __VLS_asFunctionalComponent1(__VLS_314, new __VLS_314({}));
        const __VLS_316 = __VLS_315({}, ...__VLS_functionalComponentArgsRest(__VLS_315));
        const { default: __VLS_319 } = __VLS_317.slots;
        if (row.targetType === 1) {
            let __VLS_320;
            /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
            Badge;
            // @ts-ignore
            const __VLS_321 = __VLS_asFunctionalComponent1(__VLS_320, new __VLS_320({
                variant: "warning",
                ...{ class: "text-[10px]" },
            }));
            const __VLS_322 = __VLS_321({
                variant: "warning",
                ...{ class: "text-[10px]" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_321));
            /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
            const { default: __VLS_325 } = __VLS_323.slots;
            // @ts-ignore
            [];
            var __VLS_323;
        }
        else if (row.targetType === 2) {
            let __VLS_326;
            /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
            Badge;
            // @ts-ignore
            const __VLS_327 = __VLS_asFunctionalComponent1(__VLS_326, new __VLS_326({
                variant: "success",
                ...{ class: "text-[10px]" },
            }));
            const __VLS_328 = __VLS_327({
                variant: "success",
                ...{ class: "text-[10px]" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_327));
            /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
            const { default: __VLS_331 } = __VLS_329.slots;
            // @ts-ignore
            [];
            var __VLS_329;
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-muted-foreground" },
            });
            /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        }
        // @ts-ignore
        [];
        var __VLS_317;
        let __VLS_332;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_333 = __VLS_asFunctionalComponent1(__VLS_332, new __VLS_332({}));
        const __VLS_334 = __VLS_333({}, ...__VLS_functionalComponentArgsRest(__VLS_333));
        const { default: __VLS_337 } = __VLS_335.slots;
        let __VLS_338;
        /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
        Badge;
        // @ts-ignore
        const __VLS_339 = __VLS_asFunctionalComponent1(__VLS_338, new __VLS_338({
            variant: (__VLS_ctx.getStatusBadgeVariant(row.publishStatus)),
            ...{ class: "text-[10px]" },
        }));
        const __VLS_340 = __VLS_339({
            variant: (__VLS_ctx.getStatusBadgeVariant(row.publishStatus)),
            ...{ class: "text-[10px]" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_339));
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        const { default: __VLS_343 } = __VLS_341.slots;
        (__VLS_ctx.getStatusLabel(row.publishStatus));
        // @ts-ignore
        [getStatusBadgeVariant, getStatusLabel,];
        var __VLS_341;
        // @ts-ignore
        [];
        var __VLS_335;
        let __VLS_344;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_345 = __VLS_asFunctionalComponent1(__VLS_344, new __VLS_344({}));
        const __VLS_346 = __VLS_345({}, ...__VLS_functionalComponentArgsRest(__VLS_345));
        const { default: __VLS_349 } = __VLS_347.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-xs space-y-0.5" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['space-y-0.5']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-muted-foreground" },
        });
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        (row.createTime || "-");
        if (row.publishStatus === 1) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-muted-foreground" },
            });
            /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
            (row.publishTime || "-");
        }
        else if (row.publishStatus === -1) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-muted-foreground" },
            });
            /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
            (row.revokeTime || "-");
        }
        // @ts-ignore
        [];
        var __VLS_347;
        let __VLS_350;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_351 = __VLS_asFunctionalComponent1(__VLS_350, new __VLS_350({
            ...{ class: "text-right" },
        }));
        const __VLS_352 = __VLS_351({
            ...{ class: "text-right" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_351));
        /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
        const { default: __VLS_355 } = __VLS_353.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center justify-end gap-1" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
        let __VLS_356;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_357 = __VLS_asFunctionalComponent1(__VLS_356, new __VLS_356({
            ...{ 'onClick': {} },
            variant: "ghost",
            size: "sm",
        }));
        const __VLS_358 = __VLS_357({
            ...{ 'onClick': {} },
            variant: "ghost",
            size: "sm",
        }, ...__VLS_functionalComponentArgsRest(__VLS_357));
        let __VLS_361;
        const __VLS_362 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.tableData.length === 0))
                        return;
                    __VLS_ctx.openDetailDialog(row.id);
                    // @ts-ignore
                    [openDetailDialog,];
                } });
        const { default: __VLS_363 } = __VLS_359.slots;
        let __VLS_364;
        /** @ts-ignore @type { | typeof __VLS_components.EyeIcon} */
        EyeIcon;
        // @ts-ignore
        const __VLS_365 = __VLS_asFunctionalComponent1(__VLS_364, new __VLS_364({
            ...{ class: "size-3.5 mr-1" },
        }));
        const __VLS_366 = __VLS_365({
            ...{ class: "size-3.5 mr-1" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_365));
        /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
        // @ts-ignore
        [];
        var __VLS_359;
        var __VLS_360;
        if (row.publishStatus !== 1) {
            let __VLS_369;
            /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
            Button;
            // @ts-ignore
            const __VLS_370 = __VLS_asFunctionalComponent1(__VLS_369, new __VLS_369({
                ...{ 'onClick': {} },
                variant: "ghost",
                size: "sm",
            }));
            const __VLS_371 = __VLS_370({
                ...{ 'onClick': {} },
                variant: "ghost",
                size: "sm",
            }, ...__VLS_functionalComponentArgsRest(__VLS_370));
            let __VLS_374;
            const __VLS_375 = ({ click: {} },
                { onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.tableData.length === 0))
                            return;
                        if (!(row.publishStatus !== 1))
                            return;
                        __VLS_ctx.handlePublish(row.id);
                        // @ts-ignore
                        [handlePublish,];
                    } });
            const { default: __VLS_376 } = __VLS_372.slots;
            let __VLS_377;
            /** @ts-ignore @type { | typeof __VLS_components.SendIcon} */
            SendIcon;
            // @ts-ignore
            const __VLS_378 = __VLS_asFunctionalComponent1(__VLS_377, new __VLS_377({
                ...{ class: "size-3.5 mr-1" },
            }));
            const __VLS_379 = __VLS_378({
                ...{ class: "size-3.5 mr-1" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_378));
            /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
            // @ts-ignore
            [];
            var __VLS_372;
            var __VLS_373;
        }
        if (row.publishStatus === 1) {
            let __VLS_382;
            /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
            Button;
            // @ts-ignore
            const __VLS_383 = __VLS_asFunctionalComponent1(__VLS_382, new __VLS_382({
                ...{ 'onClick': {} },
                variant: "ghost",
                size: "sm",
            }));
            const __VLS_384 = __VLS_383({
                ...{ 'onClick': {} },
                variant: "ghost",
                size: "sm",
            }, ...__VLS_functionalComponentArgsRest(__VLS_383));
            let __VLS_387;
            const __VLS_388 = ({ click: {} },
                { onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.tableData.length === 0))
                            return;
                        if (!(row.publishStatus === 1))
                            return;
                        __VLS_ctx.handleRevoke(row.id);
                        // @ts-ignore
                        [handleRevoke,];
                    } });
            const { default: __VLS_389 } = __VLS_385.slots;
            let __VLS_390;
            /** @ts-ignore @type { | typeof __VLS_components.Undo2Icon} */
            Undo2Icon;
            // @ts-ignore
            const __VLS_391 = __VLS_asFunctionalComponent1(__VLS_390, new __VLS_390({
                ...{ class: "size-3.5 mr-1" },
            }));
            const __VLS_392 = __VLS_391({
                ...{ class: "size-3.5 mr-1" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_391));
            /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
            // @ts-ignore
            [];
            var __VLS_385;
            var __VLS_386;
        }
        if (row.publishStatus !== 1) {
            let __VLS_395;
            /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
            Button;
            // @ts-ignore
            const __VLS_396 = __VLS_asFunctionalComponent1(__VLS_395, new __VLS_395({
                ...{ 'onClick': {} },
                variant: "ghost",
                size: "sm",
            }));
            const __VLS_397 = __VLS_396({
                ...{ 'onClick': {} },
                variant: "ghost",
                size: "sm",
            }, ...__VLS_functionalComponentArgsRest(__VLS_396));
            let __VLS_400;
            const __VLS_401 = ({ click: {} },
                { onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.tableData.length === 0))
                            return;
                        if (!(row.publishStatus !== 1))
                            return;
                        __VLS_ctx.handleEditClick(row.id);
                        // @ts-ignore
                        [handleEditClick,];
                    } });
            const { default: __VLS_402 } = __VLS_398.slots;
            let __VLS_403;
            /** @ts-ignore @type { | typeof __VLS_components.PencilIcon} */
            PencilIcon;
            // @ts-ignore
            const __VLS_404 = __VLS_asFunctionalComponent1(__VLS_403, new __VLS_403({
                ...{ class: "size-3.5 mr-1" },
            }));
            const __VLS_405 = __VLS_404({
                ...{ class: "size-3.5 mr-1" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_404));
            /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
            // @ts-ignore
            [];
            var __VLS_398;
            var __VLS_399;
        }
        if (row.publishStatus !== 1) {
            let __VLS_408;
            /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
            Button;
            // @ts-ignore
            const __VLS_409 = __VLS_asFunctionalComponent1(__VLS_408, new __VLS_408({
                ...{ 'onClick': {} },
                variant: "ghost",
                size: "sm",
                ...{ class: "text-destructive hover:text-destructive" },
            }));
            const __VLS_410 = __VLS_409({
                ...{ 'onClick': {} },
                variant: "ghost",
                size: "sm",
                ...{ class: "text-destructive hover:text-destructive" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_409));
            let __VLS_413;
            const __VLS_414 = ({ click: {} },
                { onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.tableData.length === 0))
                            return;
                        if (!(row.publishStatus !== 1))
                            return;
                        __VLS_ctx.handleDelete(row.id);
                        // @ts-ignore
                        [handleDelete,];
                    } });
            /** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:text-destructive']} */ ;
            const { default: __VLS_415 } = __VLS_411.slots;
            let __VLS_416;
            /** @ts-ignore @type { | typeof __VLS_components.TrashIcon} */
            TrashIcon;
            // @ts-ignore
            const __VLS_417 = __VLS_asFunctionalComponent1(__VLS_416, new __VLS_416({
                ...{ class: "size-3.5 mr-1" },
            }));
            const __VLS_418 = __VLS_417({
                ...{ class: "size-3.5 mr-1" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_417));
            /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
            // @ts-ignore
            [];
            var __VLS_411;
            var __VLS_412;
        }
        // @ts-ignore
        [];
        var __VLS_353;
        // @ts-ignore
        [];
        var __VLS_256;
        // @ts-ignore
        [];
    }
}
// @ts-ignore
[];
var __VLS_232;
// @ts-ignore
[];
var __VLS_147;
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
    let __VLS_421;
    /** @ts-ignore @type { | typeof __VLS_components.Pagination | typeof __VLS_components.Pagination} */
    Pagination;
    // @ts-ignore
    const __VLS_422 = __VLS_asFunctionalComponent1(__VLS_421, new __VLS_421({
        ...{ 'onUpdate:page': {} },
        page: (__VLS_ctx.queryParams.pageNum),
        total: (__VLS_ctx.total),
        itemsPerPage: (__VLS_ctx.queryParams.pageSize),
    }));
    const __VLS_423 = __VLS_422({
        ...{ 'onUpdate:page': {} },
        page: (__VLS_ctx.queryParams.pageNum),
        total: (__VLS_ctx.total),
        itemsPerPage: (__VLS_ctx.queryParams.pageSize),
    }, ...__VLS_functionalComponentArgsRest(__VLS_422));
    let __VLS_426;
    const __VLS_427 = ({ 'update:page': {} },
        { 'onUpdate:page': (__VLS_ctx.onPageChange) });
    const { default: __VLS_428 } = __VLS_424.slots;
    let __VLS_429;
    /** @ts-ignore @type { | typeof __VLS_components.PaginationContent | typeof __VLS_components.PaginationContent} */
    PaginationContent;
    // @ts-ignore
    const __VLS_430 = __VLS_asFunctionalComponent1(__VLS_429, new __VLS_429({}));
    const __VLS_431 = __VLS_430({}, ...__VLS_functionalComponentArgsRest(__VLS_430));
    const { default: __VLS_434 } = __VLS_432.slots;
    let __VLS_435;
    /** @ts-ignore @type { | typeof __VLS_components.PaginationPrevious} */
    PaginationPrevious;
    // @ts-ignore
    const __VLS_436 = __VLS_asFunctionalComponent1(__VLS_435, new __VLS_435({}));
    const __VLS_437 = __VLS_436({}, ...__VLS_functionalComponentArgsRest(__VLS_436));
    for (const [item] of __VLS_vFor((__VLS_ctx.paginationItems))) {
        let __VLS_440;
        /** @ts-ignore @type { | typeof __VLS_components.PaginationItem | typeof __VLS_components.PaginationItem} */
        PaginationItem;
        // @ts-ignore
        const __VLS_441 = __VLS_asFunctionalComponent1(__VLS_440, new __VLS_440({
            key: (item),
            value: (item),
            asChild: true,
        }));
        const __VLS_442 = __VLS_441({
            key: (item),
            value: (item),
            asChild: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_441));
        const { default: __VLS_445 } = __VLS_443.slots;
        let __VLS_446;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_447 = __VLS_asFunctionalComponent1(__VLS_446, new __VLS_446({
            variant: "ghost",
            size: "icon-xs",
            ...{ class: ({
                    'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground': item === __VLS_ctx.queryParams.pageNum,
                }) },
        }));
        const __VLS_448 = __VLS_447({
            variant: "ghost",
            size: "icon-xs",
            ...{ class: ({
                    'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground': item === __VLS_ctx.queryParams.pageNum,
                }) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_447));
        /** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-foreground']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:bg-primary/90']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:text-primary-foreground']} */ ;
        const { default: __VLS_451 } = __VLS_449.slots;
        (item);
        // @ts-ignore
        [queryParams, queryParams, queryParams, total, total, total, onPageChange, paginationItems,];
        var __VLS_449;
        // @ts-ignore
        [];
        var __VLS_443;
        // @ts-ignore
        [];
    }
    let __VLS_452;
    /** @ts-ignore @type { | typeof __VLS_components.PaginationNext} */
    PaginationNext;
    // @ts-ignore
    const __VLS_453 = __VLS_asFunctionalComponent1(__VLS_452, new __VLS_452({}));
    const __VLS_454 = __VLS_453({}, ...__VLS_functionalComponentArgsRest(__VLS_453));
    // @ts-ignore
    [];
    var __VLS_432;
    // @ts-ignore
    [];
    var __VLS_424;
    var __VLS_425;
}
// @ts-ignore
[];
var __VLS_141;
// @ts-ignore
[];
var __VLS_103;
let __VLS_457;
/** @ts-ignore @type { | typeof __VLS_components.Dialog | typeof __VLS_components.Dialog} */
Dialog;
// @ts-ignore
const __VLS_458 = __VLS_asFunctionalComponent1(__VLS_457, new __VLS_457({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogState.visible),
}));
const __VLS_459 = __VLS_458({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogState.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_458));
let __VLS_462;
const __VLS_463 = ({ 'update:open': {} },
    { 'onUpdate:open': (__VLS_ctx.onDialogOpenChange) });
const { default: __VLS_464 } = __VLS_460.slots;
let __VLS_465;
/** @ts-ignore @type { | typeof __VLS_components.DialogContent | typeof __VLS_components.DialogContent} */
DialogContent;
// @ts-ignore
const __VLS_466 = __VLS_asFunctionalComponent1(__VLS_465, new __VLS_465({
    ...{ class: "sm:max-w-2xl max-h-[85vh] overflow-y-auto" },
}));
const __VLS_467 = __VLS_466({
    ...{ class: "sm:max-w-2xl max-h-[85vh] overflow-y-auto" },
}, ...__VLS_functionalComponentArgsRest(__VLS_466));
/** @type {__VLS_StyleScopedClasses['sm:max-w-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-[85vh]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
const { default: __VLS_470 } = __VLS_468.slots;
let __VLS_471;
/** @ts-ignore @type { | typeof __VLS_components.DialogHeader | typeof __VLS_components.DialogHeader} */
DialogHeader;
// @ts-ignore
const __VLS_472 = __VLS_asFunctionalComponent1(__VLS_471, new __VLS_471({}));
const __VLS_473 = __VLS_472({}, ...__VLS_functionalComponentArgsRest(__VLS_472));
const { default: __VLS_476 } = __VLS_474.slots;
let __VLS_477;
/** @ts-ignore @type { | typeof __VLS_components.DialogTitle | typeof __VLS_components.DialogTitle} */
DialogTitle;
// @ts-ignore
const __VLS_478 = __VLS_asFunctionalComponent1(__VLS_477, new __VLS_477({}));
const __VLS_479 = __VLS_478({}, ...__VLS_functionalComponentArgsRest(__VLS_478));
const { default: __VLS_482 } = __VLS_480.slots;
(__VLS_ctx.dialogState.title);
// @ts-ignore
[dialogState, dialogState, onDialogOpenChange,];
var __VLS_480;
// @ts-ignore
[];
var __VLS_474;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-4 py-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_483;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_484 = __VLS_asFunctionalComponent1(__VLS_483, new __VLS_483({}));
const __VLS_485 = __VLS_484({}, ...__VLS_functionalComponentArgsRest(__VLS_484));
const { default: __VLS_488 } = __VLS_486.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[];
var __VLS_486;
let __VLS_489;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_490 = __VLS_asFunctionalComponent1(__VLS_489, new __VLS_489({
    modelValue: (__VLS_ctx.formData.title),
    modelModifiers: { trim: true, },
    placeholder: "请输入通知标题",
}));
const __VLS_491 = __VLS_490({
    modelValue: (__VLS_ctx.formData.title),
    modelModifiers: { trim: true, },
    placeholder: "请输入通知标题",
}, ...__VLS_functionalComponentArgsRest(__VLS_490));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-2 gap-4" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_494;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_495 = __VLS_asFunctionalComponent1(__VLS_494, new __VLS_494({}));
const __VLS_496 = __VLS_495({}, ...__VLS_functionalComponentArgsRest(__VLS_495));
const { default: __VLS_499 } = __VLS_497.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[formData,];
var __VLS_497;
let __VLS_500;
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_501 = __VLS_asFunctionalComponent1(__VLS_500, new __VLS_500({
    modelValue: (__VLS_ctx.formData.type),
}));
const __VLS_502 = __VLS_501({
    modelValue: (__VLS_ctx.formData.type),
}, ...__VLS_functionalComponentArgsRest(__VLS_501));
const { default: __VLS_505 } = __VLS_503.slots;
let __VLS_506;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_507 = __VLS_asFunctionalComponent1(__VLS_506, new __VLS_506({
    ...{ class: "h-8 text-sm" },
}));
const __VLS_508 = __VLS_507({
    ...{ class: "h-8 text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_507));
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_511 } = __VLS_509.slots;
let __VLS_512;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_513 = __VLS_asFunctionalComponent1(__VLS_512, new __VLS_512({
    placeholder: "请选择",
}));
const __VLS_514 = __VLS_513({
    placeholder: "请选择",
}, ...__VLS_functionalComponentArgsRest(__VLS_513));
// @ts-ignore
[formData,];
var __VLS_509;
let __VLS_517;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_518 = __VLS_asFunctionalComponent1(__VLS_517, new __VLS_517({}));
const __VLS_519 = __VLS_518({}, ...__VLS_functionalComponentArgsRest(__VLS_518));
const { default: __VLS_522 } = __VLS_520.slots;
for (const [opt] of __VLS_vFor((__VLS_ctx.noticeTypeOptions))) {
    let __VLS_523;
    /** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
    SelectItem;
    // @ts-ignore
    const __VLS_524 = __VLS_asFunctionalComponent1(__VLS_523, new __VLS_523({
        key: (opt.value),
        value: (opt.value),
    }));
    const __VLS_525 = __VLS_524({
        key: (opt.value),
        value: (opt.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_524));
    const { default: __VLS_528 } = __VLS_526.slots;
    (opt.label);
    // @ts-ignore
    [noticeTypeOptions,];
    var __VLS_526;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_520;
// @ts-ignore
[];
var __VLS_503;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_529;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_530 = __VLS_asFunctionalComponent1(__VLS_529, new __VLS_529({}));
const __VLS_531 = __VLS_530({}, ...__VLS_functionalComponentArgsRest(__VLS_530));
const { default: __VLS_534 } = __VLS_532.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[];
var __VLS_532;
let __VLS_535;
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_536 = __VLS_asFunctionalComponent1(__VLS_535, new __VLS_535({
    modelValue: (__VLS_ctx.formData.level),
}));
const __VLS_537 = __VLS_536({
    modelValue: (__VLS_ctx.formData.level),
}, ...__VLS_functionalComponentArgsRest(__VLS_536));
const { default: __VLS_540 } = __VLS_538.slots;
let __VLS_541;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_542 = __VLS_asFunctionalComponent1(__VLS_541, new __VLS_541({
    ...{ class: "h-8 text-sm" },
}));
const __VLS_543 = __VLS_542({
    ...{ class: "h-8 text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_542));
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_546 } = __VLS_544.slots;
let __VLS_547;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_548 = __VLS_asFunctionalComponent1(__VLS_547, new __VLS_547({
    placeholder: "请选择",
}));
const __VLS_549 = __VLS_548({
    placeholder: "请选择",
}, ...__VLS_functionalComponentArgsRest(__VLS_548));
// @ts-ignore
[formData,];
var __VLS_544;
let __VLS_552;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_553 = __VLS_asFunctionalComponent1(__VLS_552, new __VLS_552({}));
const __VLS_554 = __VLS_553({}, ...__VLS_functionalComponentArgsRest(__VLS_553));
const { default: __VLS_557 } = __VLS_555.slots;
for (const [opt] of __VLS_vFor((__VLS_ctx.noticeLevelOptions))) {
    let __VLS_558;
    /** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
    SelectItem;
    // @ts-ignore
    const __VLS_559 = __VLS_asFunctionalComponent1(__VLS_558, new __VLS_558({
        key: (opt.value),
        value: (opt.value),
    }));
    const __VLS_560 = __VLS_559({
        key: (opt.value),
        value: (opt.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_559));
    const { default: __VLS_563 } = __VLS_561.slots;
    (opt.label);
    // @ts-ignore
    [noticeLevelOptions,];
    var __VLS_561;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_555;
// @ts-ignore
[];
var __VLS_538;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_564;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_565 = __VLS_asFunctionalComponent1(__VLS_564, new __VLS_564({}));
const __VLS_566 = __VLS_565({}, ...__VLS_functionalComponentArgsRest(__VLS_565));
const { default: __VLS_569 } = __VLS_567.slots;
// @ts-ignore
[];
var __VLS_567;
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
(__VLS_ctx.formData.targetType);
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
    value: (2),
    ...{ class: "accent-primary" },
});
(__VLS_ctx.formData.targetType);
/** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
if (__VLS_ctx.formData.targetType === 2) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
    let __VLS_570;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_571 = __VLS_asFunctionalComponent1(__VLS_570, new __VLS_570({}));
    const __VLS_572 = __VLS_571({}, ...__VLS_functionalComponentArgsRest(__VLS_571));
    const { default: __VLS_575 } = __VLS_573.slots;
    // @ts-ignore
    [formData, formData, formData,];
    var __VLS_573;
    let __VLS_576;
    /** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
    Select;
    // @ts-ignore
    const __VLS_577 = __VLS_asFunctionalComponent1(__VLS_576, new __VLS_576({
        modelValue: (__VLS_ctx.formData.targetUsers),
        multiple: true,
    }));
    const __VLS_578 = __VLS_577({
        modelValue: (__VLS_ctx.formData.targetUsers),
        multiple: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_577));
    const { default: __VLS_581 } = __VLS_579.slots;
    let __VLS_582;
    /** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
    SelectTrigger;
    // @ts-ignore
    const __VLS_583 = __VLS_asFunctionalComponent1(__VLS_582, new __VLS_582({
        ...{ class: "text-sm min-h-8" },
    }));
    const __VLS_584 = __VLS_583({
        ...{ class: "text-sm min-h-8" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_583));
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-h-8']} */ ;
    const { default: __VLS_587 } = __VLS_585.slots;
    let __VLS_588;
    /** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
    SelectValue;
    // @ts-ignore
    const __VLS_589 = __VLS_asFunctionalComponent1(__VLS_588, new __VLS_588({
        placeholder: "请选择用户",
    }));
    const __VLS_590 = __VLS_589({
        placeholder: "请选择用户",
    }, ...__VLS_functionalComponentArgsRest(__VLS_589));
    // @ts-ignore
    [formData,];
    var __VLS_585;
    let __VLS_593;
    /** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
    SelectContent;
    // @ts-ignore
    const __VLS_594 = __VLS_asFunctionalComponent1(__VLS_593, new __VLS_593({}));
    const __VLS_595 = __VLS_594({}, ...__VLS_functionalComponentArgsRest(__VLS_594));
    const { default: __VLS_598 } = __VLS_596.slots;
    for (const [user] of __VLS_vFor((__VLS_ctx.userOptions))) {
        let __VLS_599;
        /** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
        SelectItem;
        // @ts-ignore
        const __VLS_600 = __VLS_asFunctionalComponent1(__VLS_599, new __VLS_599({
            key: (user.value),
            value: (Number(user.value)),
        }));
        const __VLS_601 = __VLS_600({
            key: (user.value),
            value: (Number(user.value)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_600));
        const { default: __VLS_604 } = __VLS_602.slots;
        (user.label);
        // @ts-ignore
        [userOptions,];
        var __VLS_602;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_596;
    // @ts-ignore
    [];
    var __VLS_579;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_605;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_606 = __VLS_asFunctionalComponent1(__VLS_605, new __VLS_605({}));
const __VLS_607 = __VLS_606({}, ...__VLS_functionalComponentArgsRest(__VLS_606));
const { default: __VLS_610 } = __VLS_608.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[];
var __VLS_608;
let __VLS_611;
/** @ts-ignore @type { | typeof __VLS_components.WangEditor} */
WangEditor;
// @ts-ignore
const __VLS_612 = __VLS_asFunctionalComponent1(__VLS_611, new __VLS_611({
    modelValue: (__VLS_ctx.formData.content),
    height: "350px",
}));
const __VLS_613 = __VLS_612({
    modelValue: (__VLS_ctx.formData.content),
    height: "350px",
}, ...__VLS_functionalComponentArgsRest(__VLS_612));
let __VLS_616;
/** @ts-ignore @type { | typeof __VLS_components.DialogFooter | typeof __VLS_components.DialogFooter} */
DialogFooter;
// @ts-ignore
const __VLS_617 = __VLS_asFunctionalComponent1(__VLS_616, new __VLS_616({}));
const __VLS_618 = __VLS_617({}, ...__VLS_functionalComponentArgsRest(__VLS_617));
const { default: __VLS_621 } = __VLS_619.slots;
let __VLS_622;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_623 = __VLS_asFunctionalComponent1(__VLS_622, new __VLS_622({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_624 = __VLS_623({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_623));
let __VLS_627;
const __VLS_628 = ({ click: {} },
    { onClick: (__VLS_ctx.closeDialog) });
const { default: __VLS_629 } = __VLS_625.slots;
// @ts-ignore
[formData, closeDialog,];
var __VLS_625;
var __VLS_626;
let __VLS_630;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_631 = __VLS_asFunctionalComponent1(__VLS_630, new __VLS_630({
    ...{ 'onClick': {} },
}));
const __VLS_632 = __VLS_631({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_631));
let __VLS_635;
const __VLS_636 = ({ click: {} },
    { onClick: (__VLS_ctx.handleSubmit) });
const { default: __VLS_637 } = __VLS_633.slots;
// @ts-ignore
[handleSubmit,];
var __VLS_633;
var __VLS_634;
// @ts-ignore
[];
var __VLS_619;
// @ts-ignore
[];
var __VLS_468;
// @ts-ignore
[];
var __VLS_460;
var __VLS_461;
let __VLS_638;
/** @ts-ignore @type { | typeof __VLS_components.Dialog | typeof __VLS_components.Dialog} */
Dialog;
// @ts-ignore
const __VLS_639 = __VLS_asFunctionalComponent1(__VLS_638, new __VLS_638({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.detailDialog.visible),
}));
const __VLS_640 = __VLS_639({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.detailDialog.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_639));
let __VLS_643;
const __VLS_644 = ({ 'update:open': {} },
    { 'onUpdate:open': (...[$event]) => {
            __VLS_ctx.detailDialog.visible = $event;
            // @ts-ignore
            [detailDialog, detailDialog,];
        } });
const { default: __VLS_645 } = __VLS_641.slots;
let __VLS_646;
/** @ts-ignore @type { | typeof __VLS_components.DialogContent | typeof __VLS_components.DialogContent} */
DialogContent;
// @ts-ignore
const __VLS_647 = __VLS_asFunctionalComponent1(__VLS_646, new __VLS_646({
    ...{ class: "sm:max-w-2xl max-h-[85vh] overflow-y-auto" },
}));
const __VLS_648 = __VLS_647({
    ...{ class: "sm:max-w-2xl max-h-[85vh] overflow-y-auto" },
}, ...__VLS_functionalComponentArgsRest(__VLS_647));
/** @type {__VLS_StyleScopedClasses['sm:max-w-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-[85vh]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
const { default: __VLS_651 } = __VLS_649.slots;
let __VLS_652;
/** @ts-ignore @type { | typeof __VLS_components.DialogHeader | typeof __VLS_components.DialogHeader} */
DialogHeader;
// @ts-ignore
const __VLS_653 = __VLS_asFunctionalComponent1(__VLS_652, new __VLS_652({}));
const __VLS_654 = __VLS_653({}, ...__VLS_functionalComponentArgsRest(__VLS_653));
const { default: __VLS_657 } = __VLS_655.slots;
let __VLS_658;
/** @ts-ignore @type { | typeof __VLS_components.DialogTitle | typeof __VLS_components.DialogTitle} */
DialogTitle;
// @ts-ignore
const __VLS_659 = __VLS_asFunctionalComponent1(__VLS_658, new __VLS_658({}));
const __VLS_660 = __VLS_659({}, ...__VLS_functionalComponentArgsRest(__VLS_659));
const { default: __VLS_663 } = __VLS_661.slots;
// @ts-ignore
[];
var __VLS_661;
// @ts-ignore
[];
var __VLS_655;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-3 py-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-2 gap-4" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-sm font-medium mt-0.5" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
(__VLS_ctx.currentNotice.title || "-");
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mt-0.5" },
});
/** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
let __VLS_664;
/** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
Badge;
// @ts-ignore
const __VLS_665 = __VLS_asFunctionalComponent1(__VLS_664, new __VLS_664({
    variant: (__VLS_ctx.getStatusBadgeVariant(__VLS_ctx.currentNotice.publishStatus)),
    ...{ class: "text-[10px]" },
}));
const __VLS_666 = __VLS_665({
    variant: (__VLS_ctx.getStatusBadgeVariant(__VLS_ctx.currentNotice.publishStatus)),
    ...{ class: "text-[10px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_665));
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
const { default: __VLS_669 } = __VLS_667.slots;
(__VLS_ctx.getStatusLabel(__VLS_ctx.currentNotice.publishStatus));
// @ts-ignore
[getStatusBadgeVariant, getStatusLabel, currentNotice, currentNotice, currentNotice,];
var __VLS_667;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-2 gap-4" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-sm mt-0.5" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
(__VLS_ctx.currentNotice.publisherName || "-");
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-sm mt-0.5" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
(__VLS_ctx.currentNotice.publishTime || "-");
let __VLS_670;
/** @ts-ignore @type { | typeof __VLS_components.Separator} */
Separator;
// @ts-ignore
const __VLS_671 = __VLS_asFunctionalComponent1(__VLS_670, new __VLS_670({}));
const __VLS_672 = __VLS_671({}, ...__VLS_functionalComponentArgsRest(__VLS_671));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "mt-2 text-sm prose prose-sm max-w-none" },
});
__VLS_asFunctionalDirective(__VLS_directives.vHtml, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.currentNotice.content) }, null, null);
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['prose']} */ ;
/** @type {__VLS_StyleScopedClasses['prose-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-none']} */ ;
// @ts-ignore
[currentNotice, currentNotice, currentNotice,];
var __VLS_649;
// @ts-ignore
[];
var __VLS_641;
var __VLS_642;
let __VLS_675;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialog | typeof __VLS_components.AlertDialog} */
AlertDialog;
// @ts-ignore
const __VLS_676 = __VLS_asFunctionalComponent1(__VLS_675, new __VLS_675({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteState.visible),
}));
const __VLS_677 = __VLS_676({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteState.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_676));
let __VLS_680;
const __VLS_681 = ({ 'update:open': {} },
    { 'onUpdate:open': (...[$event]) => {
            __VLS_ctx.deleteState.visible = $event;
            // @ts-ignore
            [deleteState, deleteState,];
        } });
const { default: __VLS_682 } = __VLS_678.slots;
let __VLS_683;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogContent | typeof __VLS_components.AlertDialogContent} */
AlertDialogContent;
// @ts-ignore
const __VLS_684 = __VLS_asFunctionalComponent1(__VLS_683, new __VLS_683({}));
const __VLS_685 = __VLS_684({}, ...__VLS_functionalComponentArgsRest(__VLS_684));
const { default: __VLS_688 } = __VLS_686.slots;
let __VLS_689;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogHeader | typeof __VLS_components.AlertDialogHeader} */
AlertDialogHeader;
// @ts-ignore
const __VLS_690 = __VLS_asFunctionalComponent1(__VLS_689, new __VLS_689({}));
const __VLS_691 = __VLS_690({}, ...__VLS_functionalComponentArgsRest(__VLS_690));
const { default: __VLS_694 } = __VLS_692.slots;
let __VLS_695;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogTitle | typeof __VLS_components.AlertDialogTitle} */
AlertDialogTitle;
// @ts-ignore
const __VLS_696 = __VLS_asFunctionalComponent1(__VLS_695, new __VLS_695({}));
const __VLS_697 = __VLS_696({}, ...__VLS_functionalComponentArgsRest(__VLS_696));
const { default: __VLS_700 } = __VLS_698.slots;
// @ts-ignore
[];
var __VLS_698;
let __VLS_701;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogDescription | typeof __VLS_components.AlertDialogDescription} */
AlertDialogDescription;
// @ts-ignore
const __VLS_702 = __VLS_asFunctionalComponent1(__VLS_701, new __VLS_701({}));
const __VLS_703 = __VLS_702({}, ...__VLS_functionalComponentArgsRest(__VLS_702));
const { default: __VLS_706 } = __VLS_704.slots;
// @ts-ignore
[];
var __VLS_704;
// @ts-ignore
[];
var __VLS_692;
let __VLS_707;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogFooter | typeof __VLS_components.AlertDialogFooter} */
AlertDialogFooter;
// @ts-ignore
const __VLS_708 = __VLS_asFunctionalComponent1(__VLS_707, new __VLS_707({}));
const __VLS_709 = __VLS_708({}, ...__VLS_functionalComponentArgsRest(__VLS_708));
const { default: __VLS_712 } = __VLS_710.slots;
let __VLS_713;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogCancel | typeof __VLS_components.AlertDialogCancel} */
AlertDialogCancel;
// @ts-ignore
const __VLS_714 = __VLS_asFunctionalComponent1(__VLS_713, new __VLS_713({}));
const __VLS_715 = __VLS_714({}, ...__VLS_functionalComponentArgsRest(__VLS_714));
const { default: __VLS_718 } = __VLS_716.slots;
// @ts-ignore
[];
var __VLS_716;
let __VLS_719;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogAction | typeof __VLS_components.AlertDialogAction} */
AlertDialogAction;
// @ts-ignore
const __VLS_720 = __VLS_asFunctionalComponent1(__VLS_719, new __VLS_719({
    ...{ 'onClick': {} },
}));
const __VLS_721 = __VLS_720({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_720));
let __VLS_724;
const __VLS_725 = ({ click: {} },
    { onClick: (__VLS_ctx.confirmDelete) });
const { default: __VLS_726 } = __VLS_722.slots;
// @ts-ignore
[confirmDelete,];
var __VLS_722;
var __VLS_723;
// @ts-ignore
[];
var __VLS_710;
// @ts-ignore
[];
var __VLS_686;
// @ts-ignore
[];
var __VLS_678;
var __VLS_679;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map