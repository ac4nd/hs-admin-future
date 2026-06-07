import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { SearchIcon, RotateCcwIcon, PlusIcon, TrashIcon, PencilIcon, BookOpenIcon, } from "@lucide/vue";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableEmpty, } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import DictAPI from "@/api/system/dict";
defineOptions({ name: "Dict", inheritAttrs: false });
const router = useRouter();
// ==================== 查询 ====================
const queryParams = reactive({ pageNum: 1, pageSize: 10 });
const tableData = ref([]);
const total = ref(0);
const loading = ref(false);
async function fetchData() {
    loading.value = true;
    try {
        const data = await DictAPI.getPage(queryParams);
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
const initialFormData = { status: 1 };
const formData = reactive({ ...initialFormData });
function handleCreateClick() {
    Object.assign(formData, { ...initialFormData });
    dialogState.title = "新增字典";
    dialogState.visible = true;
}
async function handleEditClick(id) {
    Object.assign(formData, { ...initialFormData });
    dialogState.title = "修改字典";
    const data = await DictAPI.getFormData(id);
    Object.assign(formData, data);
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
    if (!formData.name) {
        toast.error("请输入字典名称");
        return;
    }
    if (!formData.dictCode) {
        toast.error("请输入字典编码");
        return;
    }
    loading.value = true;
    try {
        if (formData.id) {
            await DictAPI.update(formData.id, formData);
            toast.success("修改成功");
        }
        else {
            await DictAPI.create(formData);
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
    await DictAPI.deleteByIds(deleteState.ids);
    toast.success("删除成功");
    deleteState.visible = false;
    checkedIds.value = new Set();
    handleQuery();
}
// ==================== 跳转字典项 ====================
function openDictData(row) {
    router.push({
        name: "DictItem",
        query: { dictCode: row.dictCode, title: `【${row.name}】字典数据` },
    });
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
    modelValue: (__VLS_ctx.queryParams.keywords),
    modelModifiers: { trim: true, },
    placeholder: "字典名称/编码",
    ...{ class: "w-52 h-8 text-sm" },
}));
const __VLS_20 = __VLS_19({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.keywords),
    modelModifiers: { trim: true, },
    placeholder: "字典名称/编码",
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
    ...{ class: "flex gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    ...{ 'onClick': {} },
    size: "sm",
}));
const __VLS_27 = __VLS_26({
    ...{ 'onClick': {} },
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
let __VLS_30;
const __VLS_31 = ({ click: {} },
    { onClick: (__VLS_ctx.handleQuery) });
const { default: __VLS_32 } = __VLS_28.slots;
let __VLS_33;
/** @ts-ignore @type { | typeof __VLS_components.SearchIcon} */
SearchIcon;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
    ...{ class: "size-3.5" },
}));
const __VLS_35 = __VLS_34({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[queryParams, handleQuery, handleQuery,];
var __VLS_28;
var __VLS_29;
let __VLS_38;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}));
const __VLS_40 = __VLS_39({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
let __VLS_43;
const __VLS_44 = ({ click: {} },
    { onClick: (__VLS_ctx.handleResetQuery) });
const { default: __VLS_45 } = __VLS_41.slots;
let __VLS_46;
/** @ts-ignore @type { | typeof __VLS_components.RotateCcwIcon} */
RotateCcwIcon;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
    ...{ class: "size-3.5" },
}));
const __VLS_48 = __VLS_47({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[handleResetQuery,];
var __VLS_41;
var __VLS_42;
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
let __VLS_51;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({}));
const __VLS_53 = __VLS_52({}, ...__VLS_functionalComponentArgsRest(__VLS_52));
const { default: __VLS_56 } = __VLS_54.slots;
let __VLS_57;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
    ...{ class: "pb-3" },
}));
const __VLS_59 = __VLS_58({
    ...{ class: "pb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
/** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
const { default: __VLS_62 } = __VLS_60.slots;
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
let __VLS_63;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
    ...{ 'onClick': {} },
    size: "sm",
}));
const __VLS_65 = __VLS_64({
    ...{ 'onClick': {} },
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
let __VLS_68;
const __VLS_69 = ({ click: {} },
    { onClick: (__VLS_ctx.handleCreateClick) });
const { default: __VLS_70 } = __VLS_66.slots;
let __VLS_71;
/** @ts-ignore @type { | typeof __VLS_components.PlusIcon} */
PlusIcon;
// @ts-ignore
const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({
    ...{ class: "size-3.5" },
}));
const __VLS_73 = __VLS_72({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_72));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[handleCreateClick,];
var __VLS_66;
var __VLS_67;
let __VLS_76;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
    ...{ 'onClick': {} },
    variant: "destructive",
    size: "sm",
    disabled: (!__VLS_ctx.hasSelection),
}));
const __VLS_78 = __VLS_77({
    ...{ 'onClick': {} },
    variant: "destructive",
    size: "sm",
    disabled: (!__VLS_ctx.hasSelection),
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
let __VLS_81;
const __VLS_82 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.handleDelete();
            // @ts-ignore
            [hasSelection, handleDelete,];
        } });
const { default: __VLS_83 } = __VLS_79.slots;
let __VLS_84;
/** @ts-ignore @type { | typeof __VLS_components.TrashIcon} */
TrashIcon;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
    ...{ class: "size-3.5" },
}));
const __VLS_86 = __VLS_85({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[];
var __VLS_79;
var __VLS_80;
// @ts-ignore
[];
var __VLS_60;
let __VLS_89;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent1(__VLS_89, new __VLS_89({}));
const __VLS_91 = __VLS_90({}, ...__VLS_functionalComponentArgsRest(__VLS_90));
const { default: __VLS_94 } = __VLS_92.slots;
let __VLS_95;
/** @ts-ignore @type { | typeof __VLS_components.Table | typeof __VLS_components.Table} */
Table;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent1(__VLS_95, new __VLS_95({}));
const __VLS_97 = __VLS_96({}, ...__VLS_functionalComponentArgsRest(__VLS_96));
const { default: __VLS_100 } = __VLS_98.slots;
let __VLS_101;
/** @ts-ignore @type { | typeof __VLS_components.TableHeader | typeof __VLS_components.TableHeader} */
TableHeader;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent1(__VLS_101, new __VLS_101({}));
const __VLS_103 = __VLS_102({}, ...__VLS_functionalComponentArgsRest(__VLS_102));
const { default: __VLS_106 } = __VLS_104.slots;
let __VLS_107;
/** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
TableRow;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({}));
const __VLS_109 = __VLS_108({}, ...__VLS_functionalComponentArgsRest(__VLS_108));
const { default: __VLS_112 } = __VLS_110.slots;
let __VLS_113;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent1(__VLS_113, new __VLS_113({
    ...{ class: "w-10" },
}));
const __VLS_115 = __VLS_114({
    ...{ class: "w-10" },
}, ...__VLS_functionalComponentArgsRest(__VLS_114));
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
const { default: __VLS_118 } = __VLS_116.slots;
let __VLS_119;
/** @ts-ignore @type { | typeof __VLS_components.Checkbox} */
Checkbox;
// @ts-ignore
const __VLS_120 = __VLS_asFunctionalComponent1(__VLS_119, new __VLS_119({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.isAllSelected),
}));
const __VLS_121 = __VLS_120({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.isAllSelected),
}, ...__VLS_functionalComponentArgsRest(__VLS_120));
let __VLS_124;
const __VLS_125 = ({ 'update:checked': {} },
    { 'onUpdate:checked': (__VLS_ctx.toggleAll) });
var __VLS_122;
var __VLS_123;
// @ts-ignore
[isAllSelected, toggleAll,];
var __VLS_116;
let __VLS_126;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent1(__VLS_126, new __VLS_126({}));
const __VLS_128 = __VLS_127({}, ...__VLS_functionalComponentArgsRest(__VLS_127));
const { default: __VLS_131 } = __VLS_129.slots;
// @ts-ignore
[];
var __VLS_129;
let __VLS_132;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_133 = __VLS_asFunctionalComponent1(__VLS_132, new __VLS_132({}));
const __VLS_134 = __VLS_133({}, ...__VLS_functionalComponentArgsRest(__VLS_133));
const { default: __VLS_137 } = __VLS_135.slots;
// @ts-ignore
[];
var __VLS_135;
let __VLS_138;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent1(__VLS_138, new __VLS_138({
    ...{ class: "w-20" },
}));
const __VLS_140 = __VLS_139({
    ...{ class: "w-20" },
}, ...__VLS_functionalComponentArgsRest(__VLS_139));
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
const { default: __VLS_143 } = __VLS_141.slots;
// @ts-ignore
[];
var __VLS_141;
let __VLS_144;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_145 = __VLS_asFunctionalComponent1(__VLS_144, new __VLS_144({
    ...{ class: "w-48 text-right" },
}));
const __VLS_146 = __VLS_145({
    ...{ class: "w-48 text-right" },
}, ...__VLS_functionalComponentArgsRest(__VLS_145));
/** @type {__VLS_StyleScopedClasses['w-48']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
const { default: __VLS_149 } = __VLS_147.slots;
// @ts-ignore
[];
var __VLS_147;
// @ts-ignore
[];
var __VLS_110;
// @ts-ignore
[];
var __VLS_104;
let __VLS_150;
/** @ts-ignore @type { | typeof __VLS_components.TableBody | typeof __VLS_components.TableBody} */
TableBody;
// @ts-ignore
const __VLS_151 = __VLS_asFunctionalComponent1(__VLS_150, new __VLS_150({}));
const __VLS_152 = __VLS_151({}, ...__VLS_functionalComponentArgsRest(__VLS_151));
const { default: __VLS_155 } = __VLS_153.slots;
if (__VLS_ctx.loading) {
    for (const [i] of __VLS_vFor((5))) {
        let __VLS_156;
        /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
        TableRow;
        // @ts-ignore
        const __VLS_157 = __VLS_asFunctionalComponent1(__VLS_156, new __VLS_156({
            key: ('skeleton-' + i),
        }));
        const __VLS_158 = __VLS_157({
            key: ('skeleton-' + i),
        }, ...__VLS_functionalComponentArgsRest(__VLS_157));
        const { default: __VLS_161 } = __VLS_159.slots;
        for (const [j] of __VLS_vFor((5))) {
            let __VLS_162;
            /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
            TableCell;
            // @ts-ignore
            const __VLS_163 = __VLS_asFunctionalComponent1(__VLS_162, new __VLS_162({
                key: ('sk-' + j),
            }));
            const __VLS_164 = __VLS_163({
                key: ('sk-' + j),
            }, ...__VLS_functionalComponentArgsRest(__VLS_163));
            const { default: __VLS_167 } = __VLS_165.slots;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
                ...{ class: "h-4 bg-muted rounded animate-pulse" },
            });
            /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
            /** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
            // @ts-ignore
            [loading,];
            var __VLS_165;
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_159;
        // @ts-ignore
        [];
    }
}
else if (__VLS_ctx.tableData.length === 0) {
    let __VLS_168;
    /** @ts-ignore @type { | typeof __VLS_components.TableEmpty | typeof __VLS_components.TableEmpty} */
    TableEmpty;
    // @ts-ignore
    const __VLS_169 = __VLS_asFunctionalComponent1(__VLS_168, new __VLS_168({
        colspan: (5),
    }));
    const __VLS_170 = __VLS_169({
        colspan: (5),
    }, ...__VLS_functionalComponentArgsRest(__VLS_169));
    const { default: __VLS_173 } = __VLS_171.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-muted-foreground text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    // @ts-ignore
    [tableData,];
    var __VLS_171;
}
else {
    for (const [row] of __VLS_vFor((__VLS_ctx.tableData))) {
        let __VLS_174;
        /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
        TableRow;
        // @ts-ignore
        const __VLS_175 = __VLS_asFunctionalComponent1(__VLS_174, new __VLS_174({
            key: (row.id),
            dataState: (__VLS_ctx.isChecked(row.id) ? 'selected' : undefined),
            ...{ class: "cursor-pointer" },
        }));
        const __VLS_176 = __VLS_175({
            key: (row.id),
            dataState: (__VLS_ctx.isChecked(row.id) ? 'selected' : undefined),
            ...{ class: "cursor-pointer" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_175));
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        const { default: __VLS_179 } = __VLS_177.slots;
        let __VLS_180;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_181 = __VLS_asFunctionalComponent1(__VLS_180, new __VLS_180({}));
        const __VLS_182 = __VLS_181({}, ...__VLS_functionalComponentArgsRest(__VLS_181));
        const { default: __VLS_185 } = __VLS_183.slots;
        let __VLS_186;
        /** @ts-ignore @type { | typeof __VLS_components.Checkbox} */
        Checkbox;
        // @ts-ignore
        const __VLS_187 = __VLS_asFunctionalComponent1(__VLS_186, new __VLS_186({
            ...{ 'onUpdate:checked': {} },
            checked: (__VLS_ctx.isChecked(row.id)),
        }));
        const __VLS_188 = __VLS_187({
            ...{ 'onUpdate:checked': {} },
            checked: (__VLS_ctx.isChecked(row.id)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_187));
        let __VLS_191;
        const __VLS_192 = ({ 'update:checked': {} },
            { 'onUpdate:checked': (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.tableData.length === 0))
                        return;
                    __VLS_ctx.toggleRow(row);
                    // @ts-ignore
                    [tableData, isChecked, isChecked, toggleRow,];
                } });
        var __VLS_189;
        var __VLS_190;
        // @ts-ignore
        [];
        var __VLS_183;
        let __VLS_193;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_194 = __VLS_asFunctionalComponent1(__VLS_193, new __VLS_193({
            ...{ class: "font-medium" },
        }));
        const __VLS_195 = __VLS_194({
            ...{ class: "font-medium" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_194));
        /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
        const { default: __VLS_198 } = __VLS_196.slots;
        (row.name);
        // @ts-ignore
        [];
        var __VLS_196;
        let __VLS_199;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_200 = __VLS_asFunctionalComponent1(__VLS_199, new __VLS_199({}));
        const __VLS_201 = __VLS_200({}, ...__VLS_functionalComponentArgsRest(__VLS_200));
        const { default: __VLS_204 } = __VLS_202.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({
            ...{ class: "text-xs bg-muted px-1.5 py-0.5 rounded" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        (row.dictCode);
        // @ts-ignore
        [];
        var __VLS_202;
        let __VLS_205;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_206 = __VLS_asFunctionalComponent1(__VLS_205, new __VLS_205({}));
        const __VLS_207 = __VLS_206({}, ...__VLS_functionalComponentArgsRest(__VLS_206));
        const { default: __VLS_210 } = __VLS_208.slots;
        let __VLS_211;
        /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
        Badge;
        // @ts-ignore
        const __VLS_212 = __VLS_asFunctionalComponent1(__VLS_211, new __VLS_211({
            variant: (row.status === 1 ? 'default' : 'secondary'),
            ...{ class: "text-[10px]" },
        }));
        const __VLS_213 = __VLS_212({
            variant: (row.status === 1 ? 'default' : 'secondary'),
            ...{ class: "text-[10px]" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_212));
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        const { default: __VLS_216 } = __VLS_214.slots;
        (row.status === 1 ? "启用" : "禁用");
        // @ts-ignore
        [];
        var __VLS_214;
        // @ts-ignore
        [];
        var __VLS_208;
        let __VLS_217;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_218 = __VLS_asFunctionalComponent1(__VLS_217, new __VLS_217({
            ...{ class: "text-right" },
        }));
        const __VLS_219 = __VLS_218({
            ...{ class: "text-right" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_218));
        /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
        const { default: __VLS_222 } = __VLS_220.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center justify-end gap-1" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
        let __VLS_223;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_224 = __VLS_asFunctionalComponent1(__VLS_223, new __VLS_223({
            ...{ 'onClick': {} },
            variant: "ghost",
            size: "sm",
        }));
        const __VLS_225 = __VLS_224({
            ...{ 'onClick': {} },
            variant: "ghost",
            size: "sm",
        }, ...__VLS_functionalComponentArgsRest(__VLS_224));
        let __VLS_228;
        const __VLS_229 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.tableData.length === 0))
                        return;
                    __VLS_ctx.openDictData(row);
                    // @ts-ignore
                    [openDictData,];
                } });
        const { default: __VLS_230 } = __VLS_226.slots;
        let __VLS_231;
        /** @ts-ignore @type { | typeof __VLS_components.BookOpenIcon} */
        BookOpenIcon;
        // @ts-ignore
        const __VLS_232 = __VLS_asFunctionalComponent1(__VLS_231, new __VLS_231({
            ...{ class: "size-3.5 mr-1" },
        }));
        const __VLS_233 = __VLS_232({
            ...{ class: "size-3.5 mr-1" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_232));
        /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
        // @ts-ignore
        [];
        var __VLS_226;
        var __VLS_227;
        let __VLS_236;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_237 = __VLS_asFunctionalComponent1(__VLS_236, new __VLS_236({
            ...{ 'onClick': {} },
            variant: "ghost",
            size: "sm",
        }));
        const __VLS_238 = __VLS_237({
            ...{ 'onClick': {} },
            variant: "ghost",
            size: "sm",
        }, ...__VLS_functionalComponentArgsRest(__VLS_237));
        let __VLS_241;
        const __VLS_242 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.tableData.length === 0))
                        return;
                    __VLS_ctx.handleEditClick(row.id);
                    // @ts-ignore
                    [handleEditClick,];
                } });
        const { default: __VLS_243 } = __VLS_239.slots;
        let __VLS_244;
        /** @ts-ignore @type { | typeof __VLS_components.PencilIcon} */
        PencilIcon;
        // @ts-ignore
        const __VLS_245 = __VLS_asFunctionalComponent1(__VLS_244, new __VLS_244({
            ...{ class: "size-3.5 mr-1" },
        }));
        const __VLS_246 = __VLS_245({
            ...{ class: "size-3.5 mr-1" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_245));
        /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
        // @ts-ignore
        [];
        var __VLS_239;
        var __VLS_240;
        let __VLS_249;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_250 = __VLS_asFunctionalComponent1(__VLS_249, new __VLS_249({
            ...{ 'onClick': {} },
            variant: "ghost",
            size: "sm",
            ...{ class: "text-destructive hover:text-destructive" },
        }));
        const __VLS_251 = __VLS_250({
            ...{ 'onClick': {} },
            variant: "ghost",
            size: "sm",
            ...{ class: "text-destructive hover:text-destructive" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_250));
        let __VLS_254;
        const __VLS_255 = ({ click: {} },
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
        const { default: __VLS_256 } = __VLS_252.slots;
        let __VLS_257;
        /** @ts-ignore @type { | typeof __VLS_components.TrashIcon} */
        TrashIcon;
        // @ts-ignore
        const __VLS_258 = __VLS_asFunctionalComponent1(__VLS_257, new __VLS_257({
            ...{ class: "size-3.5 mr-1" },
        }));
        const __VLS_259 = __VLS_258({
            ...{ class: "size-3.5 mr-1" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_258));
        /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
        // @ts-ignore
        [];
        var __VLS_252;
        var __VLS_253;
        // @ts-ignore
        [];
        var __VLS_220;
        // @ts-ignore
        [];
        var __VLS_177;
        // @ts-ignore
        [];
    }
}
// @ts-ignore
[];
var __VLS_153;
// @ts-ignore
[];
var __VLS_98;
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
    let __VLS_262;
    /** @ts-ignore @type { | typeof __VLS_components.Pagination | typeof __VLS_components.Pagination} */
    Pagination;
    // @ts-ignore
    const __VLS_263 = __VLS_asFunctionalComponent1(__VLS_262, new __VLS_262({
        ...{ 'onUpdate:page': {} },
        page: (__VLS_ctx.queryParams.pageNum),
        total: (__VLS_ctx.total),
        itemsPerPage: (__VLS_ctx.queryParams.pageSize),
    }));
    const __VLS_264 = __VLS_263({
        ...{ 'onUpdate:page': {} },
        page: (__VLS_ctx.queryParams.pageNum),
        total: (__VLS_ctx.total),
        itemsPerPage: (__VLS_ctx.queryParams.pageSize),
    }, ...__VLS_functionalComponentArgsRest(__VLS_263));
    let __VLS_267;
    const __VLS_268 = ({ 'update:page': {} },
        { 'onUpdate:page': (__VLS_ctx.onPageChange) });
    const { default: __VLS_269 } = __VLS_265.slots;
    let __VLS_270;
    /** @ts-ignore @type { | typeof __VLS_components.PaginationContent | typeof __VLS_components.PaginationContent} */
    PaginationContent;
    // @ts-ignore
    const __VLS_271 = __VLS_asFunctionalComponent1(__VLS_270, new __VLS_270({}));
    const __VLS_272 = __VLS_271({}, ...__VLS_functionalComponentArgsRest(__VLS_271));
    const { default: __VLS_275 } = __VLS_273.slots;
    let __VLS_276;
    /** @ts-ignore @type { | typeof __VLS_components.PaginationPrevious} */
    PaginationPrevious;
    // @ts-ignore
    const __VLS_277 = __VLS_asFunctionalComponent1(__VLS_276, new __VLS_276({}));
    const __VLS_278 = __VLS_277({}, ...__VLS_functionalComponentArgsRest(__VLS_277));
    for (const [item] of __VLS_vFor((__VLS_ctx.paginationItems))) {
        let __VLS_281;
        /** @ts-ignore @type { | typeof __VLS_components.PaginationItem | typeof __VLS_components.PaginationItem} */
        PaginationItem;
        // @ts-ignore
        const __VLS_282 = __VLS_asFunctionalComponent1(__VLS_281, new __VLS_281({
            key: (item),
            value: (item),
            asChild: true,
        }));
        const __VLS_283 = __VLS_282({
            key: (item),
            value: (item),
            asChild: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_282));
        const { default: __VLS_286 } = __VLS_284.slots;
        let __VLS_287;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_288 = __VLS_asFunctionalComponent1(__VLS_287, new __VLS_287({
            variant: "ghost",
            size: "icon-xs",
            ...{ class: ({
                    'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground': item === __VLS_ctx.queryParams.pageNum,
                }) },
        }));
        const __VLS_289 = __VLS_288({
            variant: "ghost",
            size: "icon-xs",
            ...{ class: ({
                    'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground': item === __VLS_ctx.queryParams.pageNum,
                }) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_288));
        /** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-foreground']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:bg-primary/90']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:text-primary-foreground']} */ ;
        const { default: __VLS_292 } = __VLS_290.slots;
        (item);
        // @ts-ignore
        [queryParams, queryParams, queryParams, total, total, total, onPageChange, paginationItems,];
        var __VLS_290;
        // @ts-ignore
        [];
        var __VLS_284;
        // @ts-ignore
        [];
    }
    let __VLS_293;
    /** @ts-ignore @type { | typeof __VLS_components.PaginationNext} */
    PaginationNext;
    // @ts-ignore
    const __VLS_294 = __VLS_asFunctionalComponent1(__VLS_293, new __VLS_293({}));
    const __VLS_295 = __VLS_294({}, ...__VLS_functionalComponentArgsRest(__VLS_294));
    // @ts-ignore
    [];
    var __VLS_273;
    // @ts-ignore
    [];
    var __VLS_265;
    var __VLS_266;
}
// @ts-ignore
[];
var __VLS_92;
// @ts-ignore
[];
var __VLS_54;
let __VLS_298;
/** @ts-ignore @type { | typeof __VLS_components.Dialog | typeof __VLS_components.Dialog} */
Dialog;
// @ts-ignore
const __VLS_299 = __VLS_asFunctionalComponent1(__VLS_298, new __VLS_298({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogState.visible),
}));
const __VLS_300 = __VLS_299({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogState.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_299));
let __VLS_303;
const __VLS_304 = ({ 'update:open': {} },
    { 'onUpdate:open': (__VLS_ctx.onDialogOpenChange) });
const { default: __VLS_305 } = __VLS_301.slots;
let __VLS_306;
/** @ts-ignore @type { | typeof __VLS_components.DialogContent | typeof __VLS_components.DialogContent} */
DialogContent;
// @ts-ignore
const __VLS_307 = __VLS_asFunctionalComponent1(__VLS_306, new __VLS_306({
    ...{ class: "sm:max-w-md" },
}));
const __VLS_308 = __VLS_307({
    ...{ class: "sm:max-w-md" },
}, ...__VLS_functionalComponentArgsRest(__VLS_307));
/** @type {__VLS_StyleScopedClasses['sm:max-w-md']} */ ;
const { default: __VLS_311 } = __VLS_309.slots;
let __VLS_312;
/** @ts-ignore @type { | typeof __VLS_components.DialogHeader | typeof __VLS_components.DialogHeader} */
DialogHeader;
// @ts-ignore
const __VLS_313 = __VLS_asFunctionalComponent1(__VLS_312, new __VLS_312({}));
const __VLS_314 = __VLS_313({}, ...__VLS_functionalComponentArgsRest(__VLS_313));
const { default: __VLS_317 } = __VLS_315.slots;
let __VLS_318;
/** @ts-ignore @type { | typeof __VLS_components.DialogTitle | typeof __VLS_components.DialogTitle} */
DialogTitle;
// @ts-ignore
const __VLS_319 = __VLS_asFunctionalComponent1(__VLS_318, new __VLS_318({}));
const __VLS_320 = __VLS_319({}, ...__VLS_functionalComponentArgsRest(__VLS_319));
const { default: __VLS_323 } = __VLS_321.slots;
(__VLS_ctx.dialogState.title);
// @ts-ignore
[dialogState, dialogState, onDialogOpenChange,];
var __VLS_321;
// @ts-ignore
[];
var __VLS_315;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-4 py-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_324;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_325 = __VLS_asFunctionalComponent1(__VLS_324, new __VLS_324({}));
const __VLS_326 = __VLS_325({}, ...__VLS_functionalComponentArgsRest(__VLS_325));
const { default: __VLS_329 } = __VLS_327.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[];
var __VLS_327;
let __VLS_330;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_331 = __VLS_asFunctionalComponent1(__VLS_330, new __VLS_330({
    modelValue: (__VLS_ctx.formData.name),
    modelModifiers: { trim: true, },
    placeholder: "请输入字典名称",
}));
const __VLS_332 = __VLS_331({
    modelValue: (__VLS_ctx.formData.name),
    modelModifiers: { trim: true, },
    placeholder: "请输入字典名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_331));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_335;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_336 = __VLS_asFunctionalComponent1(__VLS_335, new __VLS_335({}));
const __VLS_337 = __VLS_336({}, ...__VLS_functionalComponentArgsRest(__VLS_336));
const { default: __VLS_340 } = __VLS_338.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[formData,];
var __VLS_338;
let __VLS_341;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_342 = __VLS_asFunctionalComponent1(__VLS_341, new __VLS_341({
    modelValue: (__VLS_ctx.formData.dictCode),
    modelModifiers: { trim: true, },
    placeholder: "请输入字典编码",
}));
const __VLS_343 = __VLS_342({
    modelValue: (__VLS_ctx.formData.dictCode),
    modelModifiers: { trim: true, },
    placeholder: "请输入字典编码",
}, ...__VLS_functionalComponentArgsRest(__VLS_342));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_346;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_347 = __VLS_asFunctionalComponent1(__VLS_346, new __VLS_346({}));
const __VLS_348 = __VLS_347({}, ...__VLS_functionalComponentArgsRest(__VLS_347));
const { default: __VLS_351 } = __VLS_349.slots;
// @ts-ignore
[formData,];
var __VLS_349;
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
let __VLS_352;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_353 = __VLS_asFunctionalComponent1(__VLS_352, new __VLS_352({}));
const __VLS_354 = __VLS_353({}, ...__VLS_functionalComponentArgsRest(__VLS_353));
const { default: __VLS_357 } = __VLS_355.slots;
// @ts-ignore
[formData, formData,];
var __VLS_355;
let __VLS_358;
/** @ts-ignore @type { | typeof __VLS_components.Textarea} */
Textarea;
// @ts-ignore
const __VLS_359 = __VLS_asFunctionalComponent1(__VLS_358, new __VLS_358({
    modelValue: (__VLS_ctx.formData.remark),
    placeholder: "请输入备注",
}));
const __VLS_360 = __VLS_359({
    modelValue: (__VLS_ctx.formData.remark),
    placeholder: "请输入备注",
}, ...__VLS_functionalComponentArgsRest(__VLS_359));
let __VLS_363;
/** @ts-ignore @type { | typeof __VLS_components.DialogFooter | typeof __VLS_components.DialogFooter} */
DialogFooter;
// @ts-ignore
const __VLS_364 = __VLS_asFunctionalComponent1(__VLS_363, new __VLS_363({}));
const __VLS_365 = __VLS_364({}, ...__VLS_functionalComponentArgsRest(__VLS_364));
const { default: __VLS_368 } = __VLS_366.slots;
let __VLS_369;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_370 = __VLS_asFunctionalComponent1(__VLS_369, new __VLS_369({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_371 = __VLS_370({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_370));
let __VLS_374;
const __VLS_375 = ({ click: {} },
    { onClick: (__VLS_ctx.closeDialog) });
const { default: __VLS_376 } = __VLS_372.slots;
// @ts-ignore
[formData, closeDialog,];
var __VLS_372;
var __VLS_373;
let __VLS_377;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_378 = __VLS_asFunctionalComponent1(__VLS_377, new __VLS_377({
    ...{ 'onClick': {} },
}));
const __VLS_379 = __VLS_378({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_378));
let __VLS_382;
const __VLS_383 = ({ click: {} },
    { onClick: (__VLS_ctx.handleSubmit) });
const { default: __VLS_384 } = __VLS_380.slots;
// @ts-ignore
[handleSubmit,];
var __VLS_380;
var __VLS_381;
// @ts-ignore
[];
var __VLS_366;
// @ts-ignore
[];
var __VLS_309;
// @ts-ignore
[];
var __VLS_301;
var __VLS_302;
let __VLS_385;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialog | typeof __VLS_components.AlertDialog} */
AlertDialog;
// @ts-ignore
const __VLS_386 = __VLS_asFunctionalComponent1(__VLS_385, new __VLS_385({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteState.visible),
}));
const __VLS_387 = __VLS_386({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteState.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_386));
let __VLS_390;
const __VLS_391 = ({ 'update:open': {} },
    { 'onUpdate:open': (...[$event]) => {
            __VLS_ctx.deleteState.visible = $event;
            // @ts-ignore
            [deleteState, deleteState,];
        } });
const { default: __VLS_392 } = __VLS_388.slots;
let __VLS_393;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogContent | typeof __VLS_components.AlertDialogContent} */
AlertDialogContent;
// @ts-ignore
const __VLS_394 = __VLS_asFunctionalComponent1(__VLS_393, new __VLS_393({}));
const __VLS_395 = __VLS_394({}, ...__VLS_functionalComponentArgsRest(__VLS_394));
const { default: __VLS_398 } = __VLS_396.slots;
let __VLS_399;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogHeader | typeof __VLS_components.AlertDialogHeader} */
AlertDialogHeader;
// @ts-ignore
const __VLS_400 = __VLS_asFunctionalComponent1(__VLS_399, new __VLS_399({}));
const __VLS_401 = __VLS_400({}, ...__VLS_functionalComponentArgsRest(__VLS_400));
const { default: __VLS_404 } = __VLS_402.slots;
let __VLS_405;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogTitle | typeof __VLS_components.AlertDialogTitle} */
AlertDialogTitle;
// @ts-ignore
const __VLS_406 = __VLS_asFunctionalComponent1(__VLS_405, new __VLS_405({}));
const __VLS_407 = __VLS_406({}, ...__VLS_functionalComponentArgsRest(__VLS_406));
const { default: __VLS_410 } = __VLS_408.slots;
// @ts-ignore
[];
var __VLS_408;
let __VLS_411;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogDescription | typeof __VLS_components.AlertDialogDescription} */
AlertDialogDescription;
// @ts-ignore
const __VLS_412 = __VLS_asFunctionalComponent1(__VLS_411, new __VLS_411({}));
const __VLS_413 = __VLS_412({}, ...__VLS_functionalComponentArgsRest(__VLS_412));
const { default: __VLS_416 } = __VLS_414.slots;
// @ts-ignore
[];
var __VLS_414;
// @ts-ignore
[];
var __VLS_402;
let __VLS_417;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogFooter | typeof __VLS_components.AlertDialogFooter} */
AlertDialogFooter;
// @ts-ignore
const __VLS_418 = __VLS_asFunctionalComponent1(__VLS_417, new __VLS_417({}));
const __VLS_419 = __VLS_418({}, ...__VLS_functionalComponentArgsRest(__VLS_418));
const { default: __VLS_422 } = __VLS_420.slots;
let __VLS_423;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogCancel | typeof __VLS_components.AlertDialogCancel} */
AlertDialogCancel;
// @ts-ignore
const __VLS_424 = __VLS_asFunctionalComponent1(__VLS_423, new __VLS_423({}));
const __VLS_425 = __VLS_424({}, ...__VLS_functionalComponentArgsRest(__VLS_424));
const { default: __VLS_428 } = __VLS_426.slots;
// @ts-ignore
[];
var __VLS_426;
let __VLS_429;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogAction | typeof __VLS_components.AlertDialogAction} */
AlertDialogAction;
// @ts-ignore
const __VLS_430 = __VLS_asFunctionalComponent1(__VLS_429, new __VLS_429({
    ...{ 'onClick': {} },
}));
const __VLS_431 = __VLS_430({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_430));
let __VLS_434;
const __VLS_435 = ({ click: {} },
    { onClick: (__VLS_ctx.confirmDelete) });
const { default: __VLS_436 } = __VLS_432.slots;
// @ts-ignore
[confirmDelete,];
var __VLS_432;
var __VLS_433;
// @ts-ignore
[];
var __VLS_420;
// @ts-ignore
[];
var __VLS_396;
// @ts-ignore
[];
var __VLS_388;
var __VLS_389;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map