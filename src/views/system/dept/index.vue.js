import { ref, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import DeptAPI from "@/api/system/dept";
import DeptTreeSelect from "./DeptTreeSelect.vue";
import DeptTableRow from "./DeptTableRow.vue";
const { t } = useI18n();
// ==================== 列表 ====================
const loading = ref(false);
const deptList = ref([]);
const selectedIds = ref([]);
const expandedIds = ref(new Set());
const allExpanded = ref(true);
const queryParams = reactive({});
const statusFilter = ref("all");
const isAllSelected = computed(() => {
    const all = flattenAll(deptList.value);
    return all.length > 0 && all.every((d) => selectedIds.value.includes(d.id));
});
function flattenAll(nodes) {
    const result = [];
    for (const node of nodes) {
        result.push(node);
        if (node.children)
            result.push(...flattenAll(node.children));
    }
    return result;
}
function toggleSelectAll() {
    const all = flattenAll(deptList.value);
    if (isAllSelected.value) {
        selectedIds.value = [];
    }
    else {
        selectedIds.value = all.map((d) => d.id);
    }
}
function toggleSelect(id) {
    const idx = selectedIds.value.indexOf(id);
    if (idx >= 0)
        selectedIds.value.splice(idx, 1);
    else
        selectedIds.value.push(id);
}
function toggleExpand(id) {
    const s = new Set(expandedIds.value);
    if (s.has(id))
        s.delete(id);
    else
        s.add(id);
    expandedIds.value = s;
}
function initExpanded(nodes) {
    const s = new Set();
    function walk(list) {
        for (const node of list) {
            if (node.children?.length) {
                s.add(node.id);
                walk(node.children);
            }
        }
    }
    walk(nodes);
    expandedIds.value = s;
}
function toggleExpandAll() {
    if (allExpanded.value) {
        expandedIds.value = new Set();
        allExpanded.value = false;
    }
    else {
        initExpanded(deptList.value);
        allExpanded.value = true;
    }
}
async function fetchList() {
    loading.value = true;
    try {
        deptList.value = await DeptAPI.getList(queryParams);
        initExpanded(deptList.value);
        selectedIds.value = [];
        allExpanded.value = true;
    }
    finally {
        loading.value = false;
    }
}
function handleQuery() {
    fetchList();
}
function handleResetQuery() {
    queryParams.keywords = "";
    queryParams.status = undefined;
    statusFilter.value = "all";
    fetchList();
}
// ==================== 新增/编辑弹窗 ====================
const dialogVisible = ref(false);
const dialogTitle = ref("");
const deptOptions = ref([]);
const formData = reactive({
    name: "",
    parentId: "0",
    sort: 1,
    status: 1,
});
function resetForm() {
    formData.id = undefined;
    formData.name = "";
    formData.parentId = "0";
    formData.sort = 1;
    formData.status = 1;
}
function closeDialog() {
    dialogVisible.value = false;
    resetForm();
}
async function handleCreate(parentId) {
    dialogTitle.value = t("dept.addTitle");
    deptOptions.value = [{ value: "0", label: t("dept.topLevel"), children: await DeptAPI.getOptions() }];
    resetForm();
    if (parentId)
        formData.parentId = parentId;
    dialogVisible.value = true;
}
async function handleEdit(id) {
    dialogTitle.value = t("dept.editTitle");
    deptOptions.value = [{ value: "0", label: t("dept.topLevel"), children: await DeptAPI.getOptions() }];
    const data = await DeptAPI.getFormData(id);
    if (data)
        Object.assign(formData, data);
    dialogVisible.value = true;
}
async function handleSubmit() {
    if (!formData.name) {
        toast.error(t("dept.nameRequired"));
        return;
    }
    if (!formData.parentId && formData.parentId !== "0") {
        toast.error(t("dept.parentRequired"));
        return;
    }
    if (formData.id) {
        await DeptAPI.update(formData.id, formData);
        toast.success(t("dept.editSuccess"));
    }
    else {
        await DeptAPI.create(formData);
        toast.success(t("dept.addSuccess"));
    }
    closeDialog();
    fetchList();
}
// ==================== 删除 ====================
const deleteConfirmVisible = ref(false);
const pendingDeleteIds = ref("");
function handleDelete(id) {
    const ids = id ?? selectedIds.value.join(",");
    if (!ids) {
        toast.warning(t("dept.selectDelete"));
        return;
    }
    pendingDeleteIds.value = ids;
    deleteConfirmVisible.value = true;
}
function handleBatchDelete() {
    handleDelete();
}
async function confirmDelete() {
    await DeptAPI.deleteByIds(pendingDeleteIds.value);
    toast.success(t("dept.deleteSuccess"));
    deleteConfirmVisible.value = false;
    fetchList();
}
// ==================== 初始化 ====================
onMounted(() => {
    fetchList();
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
    placeholder: (__VLS_ctx.t('dept.keywordPlaceholder')),
    ...{ class: "w-60" },
}));
const __VLS_14 = __VLS_13({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.keywords),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('dept.keywordPlaceholder')),
    ...{ class: "w-60" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_17;
const __VLS_18 = ({ keyup: {} },
    { onKeyup: (__VLS_ctx.handleQuery) });
/** @type {__VLS_StyleScopedClasses['w-60']} */ ;
var __VLS_15;
var __VLS_16;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.statusFilter),
}));
const __VLS_21 = __VLS_20({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.statusFilter),
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
let __VLS_24;
const __VLS_25 = ({ 'update:modelValue': {} },
    { 'onUpdate:modelValue': ((v) => (__VLS_ctx.queryParams.status = v === 'all' ? undefined : Number(v))) });
const { default: __VLS_26 } = __VLS_22.slots;
let __VLS_27;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
    ...{ class: "w-28" },
}));
const __VLS_29 = __VLS_28({
    ...{ class: "w-28" },
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
/** @type {__VLS_StyleScopedClasses['w-28']} */ ;
const { default: __VLS_32 } = __VLS_30.slots;
let __VLS_33;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({}));
const __VLS_35 = __VLS_34({}, ...__VLS_functionalComponentArgsRest(__VLS_34));
// @ts-ignore
[queryParams, queryParams, t, handleQuery, statusFilter,];
var __VLS_30;
let __VLS_38;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({}));
const __VLS_40 = __VLS_39({}, ...__VLS_functionalComponentArgsRest(__VLS_39));
const { default: __VLS_43 } = __VLS_41.slots;
let __VLS_44;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
    value: "all",
}));
const __VLS_46 = __VLS_45({
    value: "all",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
const { default: __VLS_49 } = __VLS_47.slots;
(__VLS_ctx.t("dept.statusAll"));
// @ts-ignore
[t,];
var __VLS_47;
let __VLS_50;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
    value: "1",
}));
const __VLS_52 = __VLS_51({
    value: "1",
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
const { default: __VLS_55 } = __VLS_53.slots;
(__VLS_ctx.t("dept.statusEnabled"));
// @ts-ignore
[t,];
var __VLS_53;
let __VLS_56;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
    value: "0",
}));
const __VLS_58 = __VLS_57({
    value: "0",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
const { default: __VLS_61 } = __VLS_59.slots;
(__VLS_ctx.t("dept.statusDisabled"));
// @ts-ignore
[t,];
var __VLS_59;
// @ts-ignore
[];
var __VLS_41;
// @ts-ignore
[];
var __VLS_22;
var __VLS_23;
let __VLS_62;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
    ...{ 'onClick': {} },
}));
const __VLS_64 = __VLS_63({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
let __VLS_67;
const __VLS_68 = ({ click: {} },
    { onClick: (__VLS_ctx.handleQuery) });
const { default: __VLS_69 } = __VLS_65.slots;
(__VLS_ctx.t("dept.search"));
// @ts-ignore
[t, handleQuery,];
var __VLS_65;
var __VLS_66;
let __VLS_70;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_72 = __VLS_71({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
let __VLS_75;
const __VLS_76 = ({ click: {} },
    { onClick: (__VLS_ctx.handleResetQuery) });
const { default: __VLS_77 } = __VLS_73.slots;
(__VLS_ctx.t("dept.reset"));
// @ts-ignore
[t, handleResetQuery,];
var __VLS_73;
var __VLS_74;
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
let __VLS_78;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent1(__VLS_78, new __VLS_78({}));
const __VLS_80 = __VLS_79({}, ...__VLS_functionalComponentArgsRest(__VLS_79));
const { default: __VLS_83 } = __VLS_81.slots;
let __VLS_84;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
    ...{ class: "pt-6" },
}));
const __VLS_86 = __VLS_85({
    ...{ class: "pt-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
/** @type {__VLS_StyleScopedClasses['pt-6']} */ ;
const { default: __VLS_89 } = __VLS_87.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2 mb-4" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
let __VLS_90;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent1(__VLS_90, new __VLS_90({
    ...{ 'onClick': {} },
}));
const __VLS_92 = __VLS_91({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
let __VLS_95;
const __VLS_96 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.handleCreate();
            // @ts-ignore
            [handleCreate,];
        } });
const { default: __VLS_97 } = __VLS_93.slots;
(__VLS_ctx.t("dept.add"));
// @ts-ignore
[t,];
var __VLS_93;
var __VLS_94;
let __VLS_98;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({
    ...{ 'onClick': {} },
    variant: "destructive",
    disabled: (__VLS_ctx.selectedIds.length === 0),
}));
const __VLS_100 = __VLS_99({
    ...{ 'onClick': {} },
    variant: "destructive",
    disabled: (__VLS_ctx.selectedIds.length === 0),
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
let __VLS_103;
const __VLS_104 = ({ click: {} },
    { onClick: (__VLS_ctx.handleBatchDelete) });
const { default: __VLS_105 } = __VLS_101.slots;
(__VLS_ctx.t("dept.delete"));
// @ts-ignore
[t, selectedIds, handleBatchDelete,];
var __VLS_101;
var __VLS_102;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "flex-1" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
let __VLS_106;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent1(__VLS_106, new __VLS_106({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}));
const __VLS_108 = __VLS_107({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_107));
let __VLS_111;
const __VLS_112 = ({ click: {} },
    { onClick: (__VLS_ctx.toggleExpandAll) });
const { default: __VLS_113 } = __VLS_109.slots;
(__VLS_ctx.allExpanded ? __VLS_ctx.t("dept.collapseAll") : __VLS_ctx.t("dept.expandAll"));
// @ts-ignore
[t, t, toggleExpandAll, allExpanded,];
var __VLS_109;
var __VLS_110;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "rounded-md border overflow-x-auto" },
});
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
let __VLS_114;
/** @ts-ignore @type { | typeof __VLS_components.Table | typeof __VLS_components.Table} */
Table;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent1(__VLS_114, new __VLS_114({}));
const __VLS_116 = __VLS_115({}, ...__VLS_functionalComponentArgsRest(__VLS_115));
const { default: __VLS_119 } = __VLS_117.slots;
let __VLS_120;
/** @ts-ignore @type { | typeof __VLS_components.TableHeader | typeof __VLS_components.TableHeader} */
TableHeader;
// @ts-ignore
const __VLS_121 = __VLS_asFunctionalComponent1(__VLS_120, new __VLS_120({}));
const __VLS_122 = __VLS_121({}, ...__VLS_functionalComponentArgsRest(__VLS_121));
const { default: __VLS_125 } = __VLS_123.slots;
let __VLS_126;
/** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
TableRow;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent1(__VLS_126, new __VLS_126({}));
const __VLS_128 = __VLS_127({}, ...__VLS_functionalComponentArgsRest(__VLS_127));
const { default: __VLS_131 } = __VLS_129.slots;
let __VLS_132;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_133 = __VLS_asFunctionalComponent1(__VLS_132, new __VLS_132({
    ...{ class: "w-12" },
}));
const __VLS_134 = __VLS_133({
    ...{ class: "w-12" },
}, ...__VLS_functionalComponentArgsRest(__VLS_133));
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
const { default: __VLS_137 } = __VLS_135.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onChange: (__VLS_ctx.toggleSelectAll) },
    type: "checkbox",
    checked: (__VLS_ctx.isAllSelected),
    ...{ class: "size-4 rounded border-border" },
});
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
// @ts-ignore
[toggleSelectAll, isAllSelected,];
var __VLS_135;
let __VLS_138;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent1(__VLS_138, new __VLS_138({}));
const __VLS_140 = __VLS_139({}, ...__VLS_functionalComponentArgsRest(__VLS_139));
const { default: __VLS_143 } = __VLS_141.slots;
(__VLS_ctx.t("dept.name"));
// @ts-ignore
[t,];
var __VLS_141;
let __VLS_144;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_145 = __VLS_asFunctionalComponent1(__VLS_144, new __VLS_144({
    ...{ class: "text-center w-24" },
}));
const __VLS_146 = __VLS_145({
    ...{ class: "text-center w-24" },
}, ...__VLS_functionalComponentArgsRest(__VLS_145));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
const { default: __VLS_149 } = __VLS_147.slots;
(__VLS_ctx.t("dept.status"));
// @ts-ignore
[t,];
var __VLS_147;
let __VLS_150;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_151 = __VLS_asFunctionalComponent1(__VLS_150, new __VLS_150({
    ...{ class: "text-center w-20" },
}));
const __VLS_152 = __VLS_151({
    ...{ class: "text-center w-20" },
}, ...__VLS_functionalComponentArgsRest(__VLS_151));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
const { default: __VLS_155 } = __VLS_153.slots;
(__VLS_ctx.t("dept.sort"));
// @ts-ignore
[t,];
var __VLS_153;
let __VLS_156;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_157 = __VLS_asFunctionalComponent1(__VLS_156, new __VLS_156({
    ...{ class: "text-center w-56" },
}));
const __VLS_158 = __VLS_157({
    ...{ class: "text-center w-56" },
}, ...__VLS_functionalComponentArgsRest(__VLS_157));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-56']} */ ;
const { default: __VLS_161 } = __VLS_159.slots;
(__VLS_ctx.t("dept.action"));
// @ts-ignore
[t,];
var __VLS_159;
// @ts-ignore
[];
var __VLS_129;
// @ts-ignore
[];
var __VLS_123;
let __VLS_162;
/** @ts-ignore @type { | typeof __VLS_components.TableBody | typeof __VLS_components.TableBody} */
TableBody;
// @ts-ignore
const __VLS_163 = __VLS_asFunctionalComponent1(__VLS_162, new __VLS_162({}));
const __VLS_164 = __VLS_163({}, ...__VLS_functionalComponentArgsRest(__VLS_163));
const { default: __VLS_167 } = __VLS_165.slots;
if (__VLS_ctx.loading) {
    let __VLS_168;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_169 = __VLS_asFunctionalComponent1(__VLS_168, new __VLS_168({}));
    const __VLS_170 = __VLS_169({}, ...__VLS_functionalComponentArgsRest(__VLS_169));
    const { default: __VLS_173 } = __VLS_171.slots;
    let __VLS_174;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_175 = __VLS_asFunctionalComponent1(__VLS_174, new __VLS_174({
        colspan: (5),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }));
    const __VLS_176 = __VLS_175({
        colspan: (5),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_175));
    /** @type {__VLS_StyleScopedClasses['h-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_179 } = __VLS_177.slots;
    (__VLS_ctx.t("dept.loading"));
    // @ts-ignore
    [t, loading,];
    var __VLS_177;
    // @ts-ignore
    [];
    var __VLS_171;
}
else if (__VLS_ctx.deptList.length === 0) {
    let __VLS_180;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_181 = __VLS_asFunctionalComponent1(__VLS_180, new __VLS_180({}));
    const __VLS_182 = __VLS_181({}, ...__VLS_functionalComponentArgsRest(__VLS_181));
    const { default: __VLS_185 } = __VLS_183.slots;
    let __VLS_186;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_187 = __VLS_asFunctionalComponent1(__VLS_186, new __VLS_186({
        colspan: (5),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }));
    const __VLS_188 = __VLS_187({
        colspan: (5),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_187));
    /** @type {__VLS_StyleScopedClasses['h-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_191 } = __VLS_189.slots;
    (__VLS_ctx.t("dept.noData"));
    // @ts-ignore
    [t, deptList,];
    var __VLS_189;
    // @ts-ignore
    [];
    var __VLS_183;
}
else {
    for (const [dept] of __VLS_vFor((__VLS_ctx.deptList))) {
        const __VLS_192 = DeptTableRow;
        // @ts-ignore
        const __VLS_193 = __VLS_asFunctionalComponent1(__VLS_192, new __VLS_192({
            ...{ 'onToggleExpand': {} },
            ...{ 'onToggleSelect': {} },
            ...{ 'onCreate': {} },
            ...{ 'onEdit': {} },
            ...{ 'onDelete': {} },
            key: (dept.id),
            dept: (dept),
            level: (0),
            expandedIds: (__VLS_ctx.expandedIds),
            selectedIds: (__VLS_ctx.selectedIds),
        }));
        const __VLS_194 = __VLS_193({
            ...{ 'onToggleExpand': {} },
            ...{ 'onToggleSelect': {} },
            ...{ 'onCreate': {} },
            ...{ 'onEdit': {} },
            ...{ 'onDelete': {} },
            key: (dept.id),
            dept: (dept),
            level: (0),
            expandedIds: (__VLS_ctx.expandedIds),
            selectedIds: (__VLS_ctx.selectedIds),
        }, ...__VLS_functionalComponentArgsRest(__VLS_193));
        let __VLS_197;
        const __VLS_198 = ({ toggleExpand: {} },
            { onToggleExpand: (__VLS_ctx.toggleExpand) });
        const __VLS_199 = ({ toggleSelect: {} },
            { onToggleSelect: (__VLS_ctx.toggleSelect) });
        const __VLS_200 = ({ create: {} },
            { onCreate: (__VLS_ctx.handleCreate) });
        const __VLS_201 = ({ edit: {} },
            { onEdit: (__VLS_ctx.handleEdit) });
        const __VLS_202 = ({ delete: {} },
            { onDelete: (__VLS_ctx.handleDelete) });
        var __VLS_195;
        var __VLS_196;
        // @ts-ignore
        [handleCreate, selectedIds, deptList, expandedIds, toggleExpand, toggleSelect, handleEdit, handleDelete,];
    }
}
// @ts-ignore
[];
var __VLS_165;
// @ts-ignore
[];
var __VLS_117;
// @ts-ignore
[];
var __VLS_87;
// @ts-ignore
[];
var __VLS_81;
let __VLS_203;
/** @ts-ignore @type { | typeof __VLS_components.Dialog | typeof __VLS_components.Dialog} */
Dialog;
// @ts-ignore
const __VLS_204 = __VLS_asFunctionalComponent1(__VLS_203, new __VLS_203({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogVisible),
}));
const __VLS_205 = __VLS_204({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogVisible),
}, ...__VLS_functionalComponentArgsRest(__VLS_204));
let __VLS_208;
const __VLS_209 = ({ 'update:open': {} },
    { 'onUpdate:open': ((v) => {
            if (!v)
                __VLS_ctx.closeDialog();
        }) });
const { default: __VLS_210 } = __VLS_206.slots;
let __VLS_211;
/** @ts-ignore @type { | typeof __VLS_components.DialogContent | typeof __VLS_components.DialogContent} */
DialogContent;
// @ts-ignore
const __VLS_212 = __VLS_asFunctionalComponent1(__VLS_211, new __VLS_211({
    ...{ class: "sm:max-w-lg" },
}));
const __VLS_213 = __VLS_212({
    ...{ class: "sm:max-w-lg" },
}, ...__VLS_functionalComponentArgsRest(__VLS_212));
/** @type {__VLS_StyleScopedClasses['sm:max-w-lg']} */ ;
const { default: __VLS_216 } = __VLS_214.slots;
let __VLS_217;
/** @ts-ignore @type { | typeof __VLS_components.DialogHeader | typeof __VLS_components.DialogHeader} */
DialogHeader;
// @ts-ignore
const __VLS_218 = __VLS_asFunctionalComponent1(__VLS_217, new __VLS_217({}));
const __VLS_219 = __VLS_218({}, ...__VLS_functionalComponentArgsRest(__VLS_218));
const { default: __VLS_222 } = __VLS_220.slots;
let __VLS_223;
/** @ts-ignore @type { | typeof __VLS_components.DialogTitle | typeof __VLS_components.DialogTitle} */
DialogTitle;
// @ts-ignore
const __VLS_224 = __VLS_asFunctionalComponent1(__VLS_223, new __VLS_223({}));
const __VLS_225 = __VLS_224({}, ...__VLS_functionalComponentArgsRest(__VLS_224));
const { default: __VLS_228 } = __VLS_226.slots;
(__VLS_ctx.dialogTitle);
// @ts-ignore
[dialogVisible, closeDialog, dialogTitle,];
var __VLS_226;
// @ts-ignore
[];
var __VLS_220;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-4 py-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_229;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_230 = __VLS_asFunctionalComponent1(__VLS_229, new __VLS_229({}));
const __VLS_231 = __VLS_230({}, ...__VLS_functionalComponentArgsRest(__VLS_230));
const { default: __VLS_234 } = __VLS_232.slots;
(__VLS_ctx.t("dept.parentDept"));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[t,];
var __VLS_232;
const __VLS_235 = DeptTreeSelect;
// @ts-ignore
const __VLS_236 = __VLS_asFunctionalComponent1(__VLS_235, new __VLS_235({
    modelValue: (__VLS_ctx.formData.parentId),
    options: (__VLS_ctx.deptOptions),
    placeholder: (__VLS_ctx.t('dept.parentDeptPlaceholder')),
}));
const __VLS_237 = __VLS_236({
    modelValue: (__VLS_ctx.formData.parentId),
    options: (__VLS_ctx.deptOptions),
    placeholder: (__VLS_ctx.t('dept.parentDeptPlaceholder')),
}, ...__VLS_functionalComponentArgsRest(__VLS_236));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_240;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_241 = __VLS_asFunctionalComponent1(__VLS_240, new __VLS_240({}));
const __VLS_242 = __VLS_241({}, ...__VLS_functionalComponentArgsRest(__VLS_241));
const { default: __VLS_245 } = __VLS_243.slots;
(__VLS_ctx.t("dept.name"));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[t, t, formData, deptOptions,];
var __VLS_243;
let __VLS_246;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_247 = __VLS_asFunctionalComponent1(__VLS_246, new __VLS_246({
    modelValue: (__VLS_ctx.formData.name),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('dept.namePlaceholder')),
}));
const __VLS_248 = __VLS_247({
    modelValue: (__VLS_ctx.formData.name),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('dept.namePlaceholder')),
}, ...__VLS_functionalComponentArgsRest(__VLS_247));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_251;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_252 = __VLS_asFunctionalComponent1(__VLS_251, new __VLS_251({}));
const __VLS_253 = __VLS_252({}, ...__VLS_functionalComponentArgsRest(__VLS_252));
const { default: __VLS_256 } = __VLS_254.slots;
(__VLS_ctx.t("dept.sortLabel"));
// @ts-ignore
[t, t, formData,];
var __VLS_254;
let __VLS_257;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_258 = __VLS_asFunctionalComponent1(__VLS_257, new __VLS_257({
    modelValue: (__VLS_ctx.formData.sort),
    modelModifiers: { number: true, },
    type: "number",
    min: "0",
    ...{ class: "w-24" },
}));
const __VLS_259 = __VLS_258({
    modelValue: (__VLS_ctx.formData.sort),
    modelModifiers: { number: true, },
    type: "number",
    min: "0",
    ...{ class: "w-24" },
}, ...__VLS_functionalComponentArgsRest(__VLS_258));
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_262;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_263 = __VLS_asFunctionalComponent1(__VLS_262, new __VLS_262({}));
const __VLS_264 = __VLS_263({}, ...__VLS_functionalComponentArgsRest(__VLS_263));
const { default: __VLS_267 } = __VLS_265.slots;
(__VLS_ctx.t("dept.status"));
// @ts-ignore
[t, formData,];
var __VLS_265;
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
(__VLS_ctx.formData.status);
/** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
(__VLS_ctx.t("dept.statusEnabled"));
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
(__VLS_ctx.formData.status);
/** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
(__VLS_ctx.t("dept.statusDisabled"));
let __VLS_268;
/** @ts-ignore @type { | typeof __VLS_components.DialogFooter | typeof __VLS_components.DialogFooter} */
DialogFooter;
// @ts-ignore
const __VLS_269 = __VLS_asFunctionalComponent1(__VLS_268, new __VLS_268({}));
const __VLS_270 = __VLS_269({}, ...__VLS_functionalComponentArgsRest(__VLS_269));
const { default: __VLS_273 } = __VLS_271.slots;
let __VLS_274;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_275 = __VLS_asFunctionalComponent1(__VLS_274, new __VLS_274({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_276 = __VLS_275({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_275));
let __VLS_279;
const __VLS_280 = ({ click: {} },
    { onClick: (__VLS_ctx.closeDialog) });
const { default: __VLS_281 } = __VLS_277.slots;
(__VLS_ctx.t("dept.cancel"));
// @ts-ignore
[t, t, t, closeDialog, formData, formData,];
var __VLS_277;
var __VLS_278;
let __VLS_282;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_283 = __VLS_asFunctionalComponent1(__VLS_282, new __VLS_282({
    ...{ 'onClick': {} },
}));
const __VLS_284 = __VLS_283({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_283));
let __VLS_287;
const __VLS_288 = ({ click: {} },
    { onClick: (__VLS_ctx.handleSubmit) });
const { default: __VLS_289 } = __VLS_285.slots;
(__VLS_ctx.t("dept.confirm"));
// @ts-ignore
[t, handleSubmit,];
var __VLS_285;
var __VLS_286;
// @ts-ignore
[];
var __VLS_271;
// @ts-ignore
[];
var __VLS_214;
// @ts-ignore
[];
var __VLS_206;
var __VLS_207;
let __VLS_290;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialog | typeof __VLS_components.AlertDialog} */
AlertDialog;
// @ts-ignore
const __VLS_291 = __VLS_asFunctionalComponent1(__VLS_290, new __VLS_290({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteConfirmVisible),
}));
const __VLS_292 = __VLS_291({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteConfirmVisible),
}, ...__VLS_functionalComponentArgsRest(__VLS_291));
let __VLS_295;
const __VLS_296 = ({ 'update:open': {} },
    { 'onUpdate:open': ((v) => (__VLS_ctx.deleteConfirmVisible = v)) });
const { default: __VLS_297 } = __VLS_293.slots;
let __VLS_298;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogContent | typeof __VLS_components.AlertDialogContent} */
AlertDialogContent;
// @ts-ignore
const __VLS_299 = __VLS_asFunctionalComponent1(__VLS_298, new __VLS_298({}));
const __VLS_300 = __VLS_299({}, ...__VLS_functionalComponentArgsRest(__VLS_299));
const { default: __VLS_303 } = __VLS_301.slots;
let __VLS_304;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogHeader | typeof __VLS_components.AlertDialogHeader} */
AlertDialogHeader;
// @ts-ignore
const __VLS_305 = __VLS_asFunctionalComponent1(__VLS_304, new __VLS_304({}));
const __VLS_306 = __VLS_305({}, ...__VLS_functionalComponentArgsRest(__VLS_305));
const { default: __VLS_309 } = __VLS_307.slots;
let __VLS_310;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogTitle | typeof __VLS_components.AlertDialogTitle} */
AlertDialogTitle;
// @ts-ignore
const __VLS_311 = __VLS_asFunctionalComponent1(__VLS_310, new __VLS_310({}));
const __VLS_312 = __VLS_311({}, ...__VLS_functionalComponentArgsRest(__VLS_311));
const { default: __VLS_315 } = __VLS_313.slots;
(__VLS_ctx.t("dept.deleteWarning"));
// @ts-ignore
[t, deleteConfirmVisible, deleteConfirmVisible,];
var __VLS_313;
let __VLS_316;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogDescription | typeof __VLS_components.AlertDialogDescription} */
AlertDialogDescription;
// @ts-ignore
const __VLS_317 = __VLS_asFunctionalComponent1(__VLS_316, new __VLS_316({}));
const __VLS_318 = __VLS_317({}, ...__VLS_functionalComponentArgsRest(__VLS_317));
const { default: __VLS_321 } = __VLS_319.slots;
(__VLS_ctx.t("dept.deleteConfirm"));
// @ts-ignore
[t,];
var __VLS_319;
// @ts-ignore
[];
var __VLS_307;
let __VLS_322;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogFooter | typeof __VLS_components.AlertDialogFooter} */
AlertDialogFooter;
// @ts-ignore
const __VLS_323 = __VLS_asFunctionalComponent1(__VLS_322, new __VLS_322({}));
const __VLS_324 = __VLS_323({}, ...__VLS_functionalComponentArgsRest(__VLS_323));
const { default: __VLS_327 } = __VLS_325.slots;
let __VLS_328;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogCancel | typeof __VLS_components.AlertDialogCancel} */
AlertDialogCancel;
// @ts-ignore
const __VLS_329 = __VLS_asFunctionalComponent1(__VLS_328, new __VLS_328({
    ...{ 'onClick': {} },
}));
const __VLS_330 = __VLS_329({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_329));
let __VLS_333;
const __VLS_334 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.deleteConfirmVisible = false;
            // @ts-ignore
            [deleteConfirmVisible,];
        } });
const { default: __VLS_335 } = __VLS_331.slots;
(__VLS_ctx.t("dept.cancel"));
// @ts-ignore
[t,];
var __VLS_331;
var __VLS_332;
let __VLS_336;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogAction | typeof __VLS_components.AlertDialogAction} */
AlertDialogAction;
// @ts-ignore
const __VLS_337 = __VLS_asFunctionalComponent1(__VLS_336, new __VLS_336({
    ...{ 'onClick': {} },
}));
const __VLS_338 = __VLS_337({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_337));
let __VLS_341;
const __VLS_342 = ({ click: {} },
    { onClick: (__VLS_ctx.confirmDelete) });
const { default: __VLS_343 } = __VLS_339.slots;
(__VLS_ctx.t("dept.confirm"));
// @ts-ignore
[t, confirmDelete,];
var __VLS_339;
var __VLS_340;
// @ts-ignore
[];
var __VLS_325;
// @ts-ignore
[];
var __VLS_301;
// @ts-ignore
[];
var __VLS_293;
var __VLS_294;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map