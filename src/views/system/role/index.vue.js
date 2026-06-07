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
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import RoleAPI from "@/api/system/role";
import DeptAPI from "@/api/system/dept";
import MenuAPI from "@/api/system/menu";
import PermTreeItem from "./PermTreeItem.vue";
import DepartmentTree from "./DepartmentTree.vue";
const { t } = useI18n();
// ==================== 列表 ====================
const loading = ref(false);
const roleList = ref([]);
const total = ref(0);
const selectedIds = ref([]);
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
const isAllSelected = computed(() => roleList.value.length > 0 && roleList.value.every((r) => selectedIds.value.includes(r.id ?? "")));
const isPartialSelected = computed(() => !isAllSelected.value && roleList.value.some((r) => selectedIds.value.includes(r.id ?? "")));
function toggleSelectAll() {
    selectedIds.value = isAllSelected.value ? [] : roleList.value.map((r) => r.id ?? "");
}
function toggleSelect(id) {
    const idx = selectedIds.value.indexOf(id);
    if (idx >= 0)
        selectedIds.value.splice(idx, 1);
    else
        selectedIds.value.push(id);
}
function goPage(page) {
    queryParams.pageNum = page;
    fetchList();
}
async function fetchList() {
    loading.value = true;
    try {
        const result = await RoleAPI.getPage(queryParams);
        roleList.value = result.list;
        total.value = result.total;
        selectedIds.value = [];
    }
    catch (error) {
        console.error("[Role] 获取角色列表失败:", error);
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
    name: "",
    code: "",
    dataScope: 1,
    status: 1,
    sort: 1,
    remark: "",
});
const dataScopeStr = computed({
    get: () => String(formData.dataScope),
    set: (v) => {
        formData.dataScope = Number(v);
    },
});
const deptOptions = ref([]);
function resetForm() {
    formData.id = undefined;
    formData.name = "";
    formData.code = "";
    formData.dataScope = 1;
    formData.status = 1;
    formData.sort = 1;
    formData.remark = "";
    formData.deptIds = undefined;
}
function closeDialog() {
    dialogVisible.value = false;
    resetForm();
}
async function handleCreate() {
    dialogTitle.value = t("role.addTitle");
    if (deptOptions.value.length === 0)
        deptOptions.value = await DeptAPI.getOptions();
    resetForm();
    dialogVisible.value = true;
}
async function handleEdit(id) {
    dialogTitle.value = t("role.editTitle");
    if (deptOptions.value.length === 0)
        deptOptions.value = await DeptAPI.getOptions();
    const data = await RoleAPI.getFormData(id);
    if (data)
        Object.assign(formData, data);
    dialogVisible.value = true;
}
async function handleSubmit() {
    if (!formData.name) {
        toast.error(t("role.nameRequired"));
        return;
    }
    if (!formData.code) {
        toast.error(t("role.codeRequired"));
        return;
    }
    const submitData = { ...formData };
    if (submitData.dataScope !== 5)
        submitData.deptIds = undefined;
    loading.value = true;
    try {
        const roleId = formData.id;
        if (roleId) {
            await RoleAPI.update(roleId, submitData);
            toast.success(t("role.editSuccess"));
        }
        else {
            await RoleAPI.create(submitData);
            toast.success(t("role.addSuccess"));
        }
        closeDialog();
        handleResetQuery();
    }
    catch (error) {
        console.error("[Role] 提交表单失败:", error);
    }
    finally {
        loading.value = false;
    }
}
// ==================== 删除 ====================
const deleteConfirmVisible = ref(false);
const pendingDeleteIds = ref("");
function handleDelete(id) {
    const ids = id ?? selectedIds.value.join(",");
    if (!ids) {
        toast.warning(t("role.selectDelete"));
        return;
    }
    pendingDeleteIds.value = ids;
    deleteConfirmVisible.value = true;
}
function handleBatchDelete() {
    handleDelete();
}
async function confirmDelete() {
    loading.value = true;
    try {
        await RoleAPI.deleteByIds(pendingDeleteIds.value);
        toast.success(t("role.deleteSuccess"));
        deleteConfirmVisible.value = false;
        handleResetQuery();
    }
    catch (error) {
        console.error("[Role] 删除角色失败:", error);
    }
    finally {
        loading.value = false;
    }
}
// ==================== 分配权限 ====================
const assignVisible = ref(false);
const checkedRoleId = ref("");
const checkedRoleName = ref("");
const permOptions = ref([]);
const checkedMenuIds = ref([]);
const permKeywords = ref("");
const permExpanded = ref(true);
const parentChildLinked = ref(true);
const filteredPermOptions = computed(() => {
    if (!permKeywords.value)
        return permOptions.value;
    return filterPermTree(permOptions.value, permKeywords.value.toLowerCase());
});
function filterPermTree(nodes, kw) {
    return nodes
        .map((node) => {
        if (node.label.toLowerCase().includes(kw))
            return { ...node };
        if (node.children) {
            const filtered = filterPermTree(node.children, kw);
            if (filtered.length > 0)
                return { ...node, children: filtered };
        }
        return null;
    })
        .filter(Boolean);
}
function togglePermTree() {
    permExpanded.value = !permExpanded.value;
}
function togglePermCheck(id) {
    const idx = checkedMenuIds.value.indexOf(id);
    if (idx >= 0) {
        checkedMenuIds.value.splice(idx, 1);
    }
    else {
        checkedMenuIds.value.push(id);
    }
    // 父子联动
    if (parentChildLinked.value) {
        const node = findNode(permOptions.value, id);
        if (node?.children) {
            const childIds = collectIds(node.children);
            if (idx >= 0) {
                checkedMenuIds.value = checkedMenuIds.value.filter((cid) => !childIds.includes(cid));
            }
            else {
                childIds.forEach((cid) => {
                    if (!checkedMenuIds.value.includes(cid))
                        checkedMenuIds.value.push(cid);
                });
            }
        }
    }
}
function findNode(nodes, id) {
    for (const node of nodes) {
        if (String(node.value) === id)
            return node;
        if (node.children) {
            const found = findNode(node.children, id);
            if (found)
                return found;
        }
    }
    return undefined;
}
function collectIds(nodes) {
    const ids = [];
    for (const node of nodes) {
        ids.push(String(node.value));
        if (node.children)
            ids.push(...collectIds(node.children));
    }
    return ids;
}
async function handleAssignPerm(role) {
    checkedRoleId.value = role.id ?? "";
    checkedRoleName.value = role.name ?? "";
    permOptions.value = await MenuAPI.getOptions();
    checkedMenuIds.value = await RoleAPI.getRoleMenuIds(role.id ?? "");
    permKeywords.value = "";
    assignVisible.value = true;
}
async function handleAssignPermSubmit() {
    loading.value = true;
    try {
        await RoleAPI.updateRoleMenus(checkedRoleId.value, checkedMenuIds.value.map(Number));
        toast.success(t("role.assignSuccess"));
        assignVisible.value = false;
        handleResetQuery();
    }
    catch (error) {
        console.error("[Role] 分配权限失败:", error);
    }
    finally {
        loading.value = false;
    }
}
// ==================== 部门选择 ====================
function toggleDept(deptId) {
    if (!formData.deptIds)
        formData.deptIds = [];
    const idx = formData.deptIds.indexOf(deptId);
    if (idx >= 0) {
        formData.deptIds.splice(idx, 1);
    }
    else {
        formData.deptIds.push(deptId);
        // 自动勾选所有祖先节点
        const ancestors = findAncestors(deptOptions.value, deptId);
        for (const id of ancestors) {
            if (!formData.deptIds.includes(id)) {
                formData.deptIds.push(id);
            }
        }
    }
}
/** 在选项树中查找目标节点的祖先 ID 路径 */
function findAncestors(nodes, targetId, path = []) {
    for (const node of nodes) {
        const nodeId = String(node.value);
        if (nodeId === targetId)
            return path;
        if (node.children) {
            const result = findAncestors(node.children, targetId, [...path, nodeId]);
            if (result.length > 0)
                return result;
        }
    }
    return [];
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
    placeholder: (__VLS_ctx.t('role.keywordPlaceholder')),
    ...{ class: "w-60" },
}));
const __VLS_14 = __VLS_13({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.keywords),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('role.keywordPlaceholder')),
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
(__VLS_ctx.t("role.search"));
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
(__VLS_ctx.t("role.reset"));
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
(__VLS_ctx.t("role.add"));
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
    variant: "destructive",
    disabled: (__VLS_ctx.selectedIds.length === 0),
}));
const __VLS_57 = __VLS_56({
    ...{ 'onClick': {} },
    variant: "destructive",
    disabled: (__VLS_ctx.selectedIds.length === 0),
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
let __VLS_60;
const __VLS_61 = ({ click: {} },
    { onClick: (__VLS_ctx.handleBatchDelete) });
const { default: __VLS_62 } = __VLS_58.slots;
(__VLS_ctx.t("role.batchDelete"));
// @ts-ignore
[t, selectedIds, handleBatchDelete,];
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
    ...{ class: "w-12" },
}));
const __VLS_83 = __VLS_82({
    ...{ class: "w-12" },
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
const { default: __VLS_86 } = __VLS_84.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onChange: (__VLS_ctx.toggleSelectAll) },
    type: "checkbox",
    checked: (__VLS_ctx.isAllSelected),
    indeterminate: (__VLS_ctx.isPartialSelected),
    ...{ class: "size-4 rounded border-border" },
});
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
// @ts-ignore
[toggleSelectAll, isAllSelected, isPartialSelected,];
var __VLS_84;
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({}));
const __VLS_89 = __VLS_88({}, ...__VLS_functionalComponentArgsRest(__VLS_88));
const { default: __VLS_92 } = __VLS_90.slots;
(__VLS_ctx.t("role.name"));
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
(__VLS_ctx.t("role.code"));
// @ts-ignore
[t,];
var __VLS_96;
let __VLS_99;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
    ...{ class: "text-center" },
}));
const __VLS_101 = __VLS_100({
    ...{ class: "text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_104 } = __VLS_102.slots;
(__VLS_ctx.t("role.dataScope"));
// @ts-ignore
[t,];
var __VLS_102;
let __VLS_105;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent1(__VLS_105, new __VLS_105({
    ...{ class: "text-center" },
}));
const __VLS_107 = __VLS_106({
    ...{ class: "text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_110 } = __VLS_108.slots;
(__VLS_ctx.t("role.status"));
// @ts-ignore
[t,];
var __VLS_108;
let __VLS_111;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_112 = __VLS_asFunctionalComponent1(__VLS_111, new __VLS_111({
    ...{ class: "text-center w-20" },
}));
const __VLS_113 = __VLS_112({
    ...{ class: "text-center w-20" },
}, ...__VLS_functionalComponentArgsRest(__VLS_112));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
const { default: __VLS_116 } = __VLS_114.slots;
(__VLS_ctx.t("role.sort"));
// @ts-ignore
[t,];
var __VLS_114;
let __VLS_117;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({
    ...{ class: "text-center w-56" },
}));
const __VLS_119 = __VLS_118({
    ...{ class: "text-center w-56" },
}, ...__VLS_functionalComponentArgsRest(__VLS_118));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-56']} */ ;
const { default: __VLS_122 } = __VLS_120.slots;
(__VLS_ctx.t("role.action"));
// @ts-ignore
[t,];
var __VLS_120;
// @ts-ignore
[];
var __VLS_78;
// @ts-ignore
[];
var __VLS_72;
let __VLS_123;
/** @ts-ignore @type { | typeof __VLS_components.TableBody | typeof __VLS_components.TableBody} */
TableBody;
// @ts-ignore
const __VLS_124 = __VLS_asFunctionalComponent1(__VLS_123, new __VLS_123({}));
const __VLS_125 = __VLS_124({}, ...__VLS_functionalComponentArgsRest(__VLS_124));
const { default: __VLS_128 } = __VLS_126.slots;
if (__VLS_ctx.loading) {
    let __VLS_129;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_130 = __VLS_asFunctionalComponent1(__VLS_129, new __VLS_129({}));
    const __VLS_131 = __VLS_130({}, ...__VLS_functionalComponentArgsRest(__VLS_130));
    const { default: __VLS_134 } = __VLS_132.slots;
    let __VLS_135;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_136 = __VLS_asFunctionalComponent1(__VLS_135, new __VLS_135({
        colspan: (7),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }));
    const __VLS_137 = __VLS_136({
        colspan: (7),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_136));
    /** @type {__VLS_StyleScopedClasses['h-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_140 } = __VLS_138.slots;
    // @ts-ignore
    [loading,];
    var __VLS_138;
    // @ts-ignore
    [];
    var __VLS_132;
}
else if (__VLS_ctx.roleList.length === 0) {
    let __VLS_141;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_142 = __VLS_asFunctionalComponent1(__VLS_141, new __VLS_141({}));
    const __VLS_143 = __VLS_142({}, ...__VLS_functionalComponentArgsRest(__VLS_142));
    const { default: __VLS_146 } = __VLS_144.slots;
    let __VLS_147;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_148 = __VLS_asFunctionalComponent1(__VLS_147, new __VLS_147({
        colspan: (7),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }));
    const __VLS_149 = __VLS_148({
        colspan: (7),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_148));
    /** @type {__VLS_StyleScopedClasses['h-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_152 } = __VLS_150.slots;
    // @ts-ignore
    [roleList,];
    var __VLS_150;
    // @ts-ignore
    [];
    var __VLS_144;
}
for (const [role] of __VLS_vFor((__VLS_ctx.roleList))) {
    let __VLS_153;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_154 = __VLS_asFunctionalComponent1(__VLS_153, new __VLS_153({
        key: (role.id),
        ...{ class: "hover:bg-muted/50" },
    }));
    const __VLS_155 = __VLS_154({
        key: (role.id),
        ...{ class: "hover:bg-muted/50" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_154));
    /** @type {__VLS_StyleScopedClasses['hover:bg-muted/50']} */ ;
    const { default: __VLS_158 } = __VLS_156.slots;
    let __VLS_159;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_160 = __VLS_asFunctionalComponent1(__VLS_159, new __VLS_159({}));
    const __VLS_161 = __VLS_160({}, ...__VLS_functionalComponentArgsRest(__VLS_160));
    const { default: __VLS_164 } = __VLS_162.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onChange: (...[$event]) => {
                __VLS_ctx.toggleSelect(role.id ?? '');
                // @ts-ignore
                [roleList, toggleSelect,];
            } },
        type: "checkbox",
        checked: (__VLS_ctx.selectedIds.includes(role.id ?? '')),
        ...{ class: "size-4 rounded border-border" },
    });
    /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-border']} */ ;
    // @ts-ignore
    [selectedIds,];
    var __VLS_162;
    let __VLS_165;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_166 = __VLS_asFunctionalComponent1(__VLS_165, new __VLS_165({
        ...{ class: "font-medium" },
    }));
    const __VLS_167 = __VLS_166({
        ...{ class: "font-medium" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_166));
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    const { default: __VLS_170 } = __VLS_168.slots;
    (role.name);
    // @ts-ignore
    [];
    var __VLS_168;
    let __VLS_171;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_172 = __VLS_asFunctionalComponent1(__VLS_171, new __VLS_171({}));
    const __VLS_173 = __VLS_172({}, ...__VLS_functionalComponentArgsRest(__VLS_172));
    const { default: __VLS_176 } = __VLS_174.slots;
    let __VLS_177;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_178 = __VLS_asFunctionalComponent1(__VLS_177, new __VLS_177({
        variant: "outline",
    }));
    const __VLS_179 = __VLS_178({
        variant: "outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_178));
    const { default: __VLS_182 } = __VLS_180.slots;
    (role.code);
    // @ts-ignore
    [];
    var __VLS_180;
    // @ts-ignore
    [];
    var __VLS_174;
    let __VLS_183;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_184 = __VLS_asFunctionalComponent1(__VLS_183, new __VLS_183({
        ...{ class: "text-center" },
    }));
    const __VLS_185 = __VLS_184({
        ...{ class: "text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_184));
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_188 } = __VLS_186.slots;
    (role.dataScopeLabel);
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
    let __VLS_195;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_196 = __VLS_asFunctionalComponent1(__VLS_195, new __VLS_195({
        variant: (role.status === 1 ? 'default' : 'secondary'),
    }));
    const __VLS_197 = __VLS_196({
        variant: (role.status === 1 ? 'default' : 'secondary'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_196));
    const { default: __VLS_200 } = __VLS_198.slots;
    (role.status === 1 ? __VLS_ctx.t("role.statusEnabled") : __VLS_ctx.t("role.statusDisabled"));
    // @ts-ignore
    [t, t,];
    var __VLS_198;
    // @ts-ignore
    [];
    var __VLS_192;
    let __VLS_201;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_202 = __VLS_asFunctionalComponent1(__VLS_201, new __VLS_201({
        ...{ class: "text-center" },
    }));
    const __VLS_203 = __VLS_202({
        ...{ class: "text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_202));
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_206 } = __VLS_204.slots;
    (role.sort);
    // @ts-ignore
    [];
    var __VLS_204;
    let __VLS_207;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_208 = __VLS_asFunctionalComponent1(__VLS_207, new __VLS_207({
        ...{ class: "text-center" },
    }));
    const __VLS_209 = __VLS_208({
        ...{ class: "text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_208));
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_212 } = __VLS_210.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-center gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    let __VLS_213;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_214 = __VLS_asFunctionalComponent1(__VLS_213, new __VLS_213({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs" },
    }));
    const __VLS_215 = __VLS_214({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_214));
    let __VLS_218;
    const __VLS_219 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleAssignPerm(role);
                // @ts-ignore
                [handleAssignPerm,];
            } });
    /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    const { default: __VLS_220 } = __VLS_216.slots;
    (__VLS_ctx.t("role.assignPerm"));
    // @ts-ignore
    [t,];
    var __VLS_216;
    var __VLS_217;
    let __VLS_221;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_222 = __VLS_asFunctionalComponent1(__VLS_221, new __VLS_221({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs" },
    }));
    const __VLS_223 = __VLS_222({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_222));
    let __VLS_226;
    const __VLS_227 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleEdit(role.id ?? '');
                // @ts-ignore
                [handleEdit,];
            } });
    /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    const { default: __VLS_228 } = __VLS_224.slots;
    (__VLS_ctx.t("role.edit"));
    // @ts-ignore
    [t,];
    var __VLS_224;
    var __VLS_225;
    let __VLS_229;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_230 = __VLS_asFunctionalComponent1(__VLS_229, new __VLS_229({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs text-destructive hover:text-destructive" },
    }));
    const __VLS_231 = __VLS_230({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs text-destructive hover:text-destructive" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_230));
    let __VLS_234;
    const __VLS_235 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleDelete(role.id);
                // @ts-ignore
                [handleDelete,];
            } });
    /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-destructive']} */ ;
    const { default: __VLS_236 } = __VLS_232.slots;
    (__VLS_ctx.t("role.delete"));
    // @ts-ignore
    [t,];
    var __VLS_232;
    var __VLS_233;
    // @ts-ignore
    [];
    var __VLS_210;
    // @ts-ignore
    [];
    var __VLS_156;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_126;
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
    let __VLS_237;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_238 = __VLS_asFunctionalComponent1(__VLS_237, new __VLS_237({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.queryParams.pageNum <= 1),
    }));
    const __VLS_239 = __VLS_238({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.queryParams.pageNum <= 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_238));
    let __VLS_242;
    const __VLS_243 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.total > 0))
                    return;
                __VLS_ctx.goPage(__VLS_ctx.queryParams.pageNum - 1);
                // @ts-ignore
                [queryParams, queryParams, total, total, goPage,];
            } });
    const { default: __VLS_244 } = __VLS_240.slots;
    // @ts-ignore
    [];
    var __VLS_240;
    var __VLS_241;
    for (const [page] of __VLS_vFor((__VLS_ctx.displayedPages))) {
        let __VLS_245;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_246 = __VLS_asFunctionalComponent1(__VLS_245, new __VLS_245({
            ...{ 'onClick': {} },
            key: (page),
            variant: (page === __VLS_ctx.queryParams.pageNum ? 'default' : 'outline'),
            size: "sm",
            ...{ class: "min-w-8" },
        }));
        const __VLS_247 = __VLS_246({
            ...{ 'onClick': {} },
            key: (page),
            variant: (page === __VLS_ctx.queryParams.pageNum ? 'default' : 'outline'),
            size: "sm",
            ...{ class: "min-w-8" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_246));
        let __VLS_250;
        const __VLS_251 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.total > 0))
                        return;
                    __VLS_ctx.goPage(page);
                    // @ts-ignore
                    [queryParams, goPage, displayedPages,];
                } });
        /** @type {__VLS_StyleScopedClasses['min-w-8']} */ ;
        const { default: __VLS_252 } = __VLS_248.slots;
        (page);
        // @ts-ignore
        [];
        var __VLS_248;
        var __VLS_249;
        // @ts-ignore
        [];
    }
    let __VLS_253;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_254 = __VLS_asFunctionalComponent1(__VLS_253, new __VLS_253({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.queryParams.pageNum >= __VLS_ctx.totalPages),
    }));
    const __VLS_255 = __VLS_254({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.queryParams.pageNum >= __VLS_ctx.totalPages),
    }, ...__VLS_functionalComponentArgsRest(__VLS_254));
    let __VLS_258;
    const __VLS_259 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.total > 0))
                    return;
                __VLS_ctx.goPage(__VLS_ctx.queryParams.pageNum + 1);
                // @ts-ignore
                [queryParams, queryParams, goPage, totalPages,];
            } });
    const { default: __VLS_260 } = __VLS_256.slots;
    // @ts-ignore
    [];
    var __VLS_256;
    var __VLS_257;
}
// @ts-ignore
[];
var __VLS_44;
// @ts-ignore
[];
var __VLS_38;
let __VLS_261;
/** @ts-ignore @type { | typeof __VLS_components.Dialog | typeof __VLS_components.Dialog} */
Dialog;
// @ts-ignore
const __VLS_262 = __VLS_asFunctionalComponent1(__VLS_261, new __VLS_261({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogVisible),
}));
const __VLS_263 = __VLS_262({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogVisible),
}, ...__VLS_functionalComponentArgsRest(__VLS_262));
let __VLS_266;
const __VLS_267 = ({ 'update:open': {} },
    { 'onUpdate:open': ((v) => {
            if (!v)
                __VLS_ctx.closeDialog();
        }) });
const { default: __VLS_268 } = __VLS_264.slots;
let __VLS_269;
/** @ts-ignore @type { | typeof __VLS_components.DialogContent | typeof __VLS_components.DialogContent} */
DialogContent;
// @ts-ignore
const __VLS_270 = __VLS_asFunctionalComponent1(__VLS_269, new __VLS_269({
    ...{ class: "sm:max-w-lg" },
}));
const __VLS_271 = __VLS_270({
    ...{ class: "sm:max-w-lg" },
}, ...__VLS_functionalComponentArgsRest(__VLS_270));
/** @type {__VLS_StyleScopedClasses['sm:max-w-lg']} */ ;
const { default: __VLS_274 } = __VLS_272.slots;
let __VLS_275;
/** @ts-ignore @type { | typeof __VLS_components.DialogHeader | typeof __VLS_components.DialogHeader} */
DialogHeader;
// @ts-ignore
const __VLS_276 = __VLS_asFunctionalComponent1(__VLS_275, new __VLS_275({}));
const __VLS_277 = __VLS_276({}, ...__VLS_functionalComponentArgsRest(__VLS_276));
const { default: __VLS_280 } = __VLS_278.slots;
let __VLS_281;
/** @ts-ignore @type { | typeof __VLS_components.DialogTitle | typeof __VLS_components.DialogTitle} */
DialogTitle;
// @ts-ignore
const __VLS_282 = __VLS_asFunctionalComponent1(__VLS_281, new __VLS_281({}));
const __VLS_283 = __VLS_282({}, ...__VLS_functionalComponentArgsRest(__VLS_282));
const { default: __VLS_286 } = __VLS_284.slots;
(__VLS_ctx.dialogTitle);
// @ts-ignore
[dialogVisible, closeDialog, dialogTitle,];
var __VLS_284;
// @ts-ignore
[];
var __VLS_278;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-4 py-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_287;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_288 = __VLS_asFunctionalComponent1(__VLS_287, new __VLS_287({}));
const __VLS_289 = __VLS_288({}, ...__VLS_functionalComponentArgsRest(__VLS_288));
const { default: __VLS_292 } = __VLS_290.slots;
(__VLS_ctx.t("role.name"));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[t,];
var __VLS_290;
let __VLS_293;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_294 = __VLS_asFunctionalComponent1(__VLS_293, new __VLS_293({
    modelValue: (__VLS_ctx.formData.name),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('role.namePlaceholder')),
}));
const __VLS_295 = __VLS_294({
    modelValue: (__VLS_ctx.formData.name),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('role.namePlaceholder')),
}, ...__VLS_functionalComponentArgsRest(__VLS_294));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_298;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_299 = __VLS_asFunctionalComponent1(__VLS_298, new __VLS_298({}));
const __VLS_300 = __VLS_299({}, ...__VLS_functionalComponentArgsRest(__VLS_299));
const { default: __VLS_303 } = __VLS_301.slots;
(__VLS_ctx.t("role.code"));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[t, t, formData,];
var __VLS_301;
let __VLS_304;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_305 = __VLS_asFunctionalComponent1(__VLS_304, new __VLS_304({
    modelValue: (__VLS_ctx.formData.code),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('role.codePlaceholder')),
}));
const __VLS_306 = __VLS_305({
    modelValue: (__VLS_ctx.formData.code),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('role.codePlaceholder')),
}, ...__VLS_functionalComponentArgsRest(__VLS_305));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_309;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_310 = __VLS_asFunctionalComponent1(__VLS_309, new __VLS_309({}));
const __VLS_311 = __VLS_310({}, ...__VLS_functionalComponentArgsRest(__VLS_310));
const { default: __VLS_314 } = __VLS_312.slots;
(__VLS_ctx.t("role.dataScope"));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[t, t, formData,];
var __VLS_312;
let __VLS_315;
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_316 = __VLS_asFunctionalComponent1(__VLS_315, new __VLS_315({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.dataScopeStr),
}));
const __VLS_317 = __VLS_316({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.dataScopeStr),
}, ...__VLS_functionalComponentArgsRest(__VLS_316));
let __VLS_320;
const __VLS_321 = ({ 'update:modelValue': {} },
    { 'onUpdate:modelValue': ((v) => (__VLS_ctx.formData.dataScope = Number(v))) });
const { default: __VLS_322 } = __VLS_318.slots;
let __VLS_323;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_324 = __VLS_asFunctionalComponent1(__VLS_323, new __VLS_323({}));
const __VLS_325 = __VLS_324({}, ...__VLS_functionalComponentArgsRest(__VLS_324));
const { default: __VLS_328 } = __VLS_326.slots;
let __VLS_329;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_330 = __VLS_asFunctionalComponent1(__VLS_329, new __VLS_329({
    placeholder: (__VLS_ctx.t('role.dataScopePlaceholder')),
}));
const __VLS_331 = __VLS_330({
    placeholder: (__VLS_ctx.t('role.dataScopePlaceholder')),
}, ...__VLS_functionalComponentArgsRest(__VLS_330));
// @ts-ignore
[t, formData, dataScopeStr,];
var __VLS_326;
let __VLS_334;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_335 = __VLS_asFunctionalComponent1(__VLS_334, new __VLS_334({}));
const __VLS_336 = __VLS_335({}, ...__VLS_functionalComponentArgsRest(__VLS_335));
const { default: __VLS_339 } = __VLS_337.slots;
let __VLS_340;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_341 = __VLS_asFunctionalComponent1(__VLS_340, new __VLS_340({
    value: "1",
}));
const __VLS_342 = __VLS_341({
    value: "1",
}, ...__VLS_functionalComponentArgsRest(__VLS_341));
const { default: __VLS_345 } = __VLS_343.slots;
(__VLS_ctx.t("role.dataScopeAll"));
// @ts-ignore
[t,];
var __VLS_343;
let __VLS_346;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_347 = __VLS_asFunctionalComponent1(__VLS_346, new __VLS_346({
    value: "2",
}));
const __VLS_348 = __VLS_347({
    value: "2",
}, ...__VLS_functionalComponentArgsRest(__VLS_347));
const { default: __VLS_351 } = __VLS_349.slots;
(__VLS_ctx.t("role.dataScopeDeptAndSub"));
// @ts-ignore
[t,];
var __VLS_349;
let __VLS_352;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_353 = __VLS_asFunctionalComponent1(__VLS_352, new __VLS_352({
    value: "3",
}));
const __VLS_354 = __VLS_353({
    value: "3",
}, ...__VLS_functionalComponentArgsRest(__VLS_353));
const { default: __VLS_357 } = __VLS_355.slots;
(__VLS_ctx.t("role.dataScopeDept"));
// @ts-ignore
[t,];
var __VLS_355;
let __VLS_358;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_359 = __VLS_asFunctionalComponent1(__VLS_358, new __VLS_358({
    value: "4",
}));
const __VLS_360 = __VLS_359({
    value: "4",
}, ...__VLS_functionalComponentArgsRest(__VLS_359));
const { default: __VLS_363 } = __VLS_361.slots;
(__VLS_ctx.t("role.dataScopeSelf"));
// @ts-ignore
[t,];
var __VLS_361;
let __VLS_364;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_365 = __VLS_asFunctionalComponent1(__VLS_364, new __VLS_364({
    value: "5",
}));
const __VLS_366 = __VLS_365({
    value: "5",
}, ...__VLS_functionalComponentArgsRest(__VLS_365));
const { default: __VLS_369 } = __VLS_367.slots;
(__VLS_ctx.t("role.dataScopeCustom"));
// @ts-ignore
[t,];
var __VLS_367;
// @ts-ignore
[];
var __VLS_337;
// @ts-ignore
[];
var __VLS_318;
var __VLS_319;
if (__VLS_ctx.formData.dataScope === 5) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    let __VLS_370;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_371 = __VLS_asFunctionalComponent1(__VLS_370, new __VLS_370({}));
    const __VLS_372 = __VLS_371({}, ...__VLS_functionalComponentArgsRest(__VLS_371));
    const { default: __VLS_375 } = __VLS_373.slots;
    (__VLS_ctx.t("role.deptSelect"));
    // @ts-ignore
    [t, formData,];
    var __VLS_373;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "border rounded-md p-3 max-h-40 overflow-auto space-y-1" },
    });
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-h-40']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
    for (const [dept] of __VLS_vFor((__VLS_ctx.deptOptions))) {
        const __VLS_376 = DepartmentTree;
        // @ts-ignore
        const __VLS_377 = __VLS_asFunctionalComponent1(__VLS_376, new __VLS_376({
            ...{ 'onToggle': {} },
            key: (String(dept.value)),
            option: (dept),
            level: (0),
            checked: (__VLS_ctx.formData.deptIds ?? []),
        }));
        const __VLS_378 = __VLS_377({
            ...{ 'onToggle': {} },
            key: (String(dept.value)),
            option: (dept),
            level: (0),
            checked: (__VLS_ctx.formData.deptIds ?? []),
        }, ...__VLS_functionalComponentArgsRest(__VLS_377));
        let __VLS_381;
        const __VLS_382 = ({ toggle: {} },
            { onToggle: (__VLS_ctx.toggleDept) });
        var __VLS_379;
        var __VLS_380;
        // @ts-ignore
        [formData, deptOptions, toggleDept,];
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_383;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_384 = __VLS_asFunctionalComponent1(__VLS_383, new __VLS_383({}));
const __VLS_385 = __VLS_384({}, ...__VLS_functionalComponentArgsRest(__VLS_384));
const { default: __VLS_388 } = __VLS_386.slots;
(__VLS_ctx.t("role.status"));
// @ts-ignore
[t,];
var __VLS_386;
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
(__VLS_ctx.t("role.statusEnabled"));
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
(__VLS_ctx.t("role.statusDisabled"));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_389;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_390 = __VLS_asFunctionalComponent1(__VLS_389, new __VLS_389({}));
const __VLS_391 = __VLS_390({}, ...__VLS_functionalComponentArgsRest(__VLS_390));
const { default: __VLS_394 } = __VLS_392.slots;
(__VLS_ctx.t("role.sort"));
// @ts-ignore
[t, t, t, formData, formData,];
var __VLS_392;
let __VLS_395;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_396 = __VLS_asFunctionalComponent1(__VLS_395, new __VLS_395({
    modelValue: (__VLS_ctx.formData.sort),
    modelModifiers: { number: true, },
    type: "number",
    min: "0",
    ...{ class: "w-24" },
}));
const __VLS_397 = __VLS_396({
    modelValue: (__VLS_ctx.formData.sort),
    modelModifiers: { number: true, },
    type: "number",
    min: "0",
    ...{ class: "w-24" },
}, ...__VLS_functionalComponentArgsRest(__VLS_396));
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
let __VLS_400;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_401 = __VLS_asFunctionalComponent1(__VLS_400, new __VLS_400({}));
const __VLS_402 = __VLS_401({}, ...__VLS_functionalComponentArgsRest(__VLS_401));
const { default: __VLS_405 } = __VLS_403.slots;
(__VLS_ctx.t("role.remark"));
// @ts-ignore
[t, formData,];
var __VLS_403;
let __VLS_406;
/** @ts-ignore @type { | typeof __VLS_components.Textarea} */
Textarea;
// @ts-ignore
const __VLS_407 = __VLS_asFunctionalComponent1(__VLS_406, new __VLS_406({
    modelValue: (__VLS_ctx.formData.remark),
    placeholder: (__VLS_ctx.t('role.remarkPlaceholder')),
    rows: "3",
}));
const __VLS_408 = __VLS_407({
    modelValue: (__VLS_ctx.formData.remark),
    placeholder: (__VLS_ctx.t('role.remarkPlaceholder')),
    rows: "3",
}, ...__VLS_functionalComponentArgsRest(__VLS_407));
let __VLS_411;
/** @ts-ignore @type { | typeof __VLS_components.DialogFooter | typeof __VLS_components.DialogFooter} */
DialogFooter;
// @ts-ignore
const __VLS_412 = __VLS_asFunctionalComponent1(__VLS_411, new __VLS_411({}));
const __VLS_413 = __VLS_412({}, ...__VLS_functionalComponentArgsRest(__VLS_412));
const { default: __VLS_416 } = __VLS_414.slots;
let __VLS_417;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_418 = __VLS_asFunctionalComponent1(__VLS_417, new __VLS_417({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_419 = __VLS_418({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_418));
let __VLS_422;
const __VLS_423 = ({ click: {} },
    { onClick: (__VLS_ctx.closeDialog) });
const { default: __VLS_424 } = __VLS_420.slots;
(__VLS_ctx.t("role.cancel"));
// @ts-ignore
[t, t, closeDialog, formData,];
var __VLS_420;
var __VLS_421;
let __VLS_425;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_426 = __VLS_asFunctionalComponent1(__VLS_425, new __VLS_425({
    ...{ 'onClick': {} },
}));
const __VLS_427 = __VLS_426({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_426));
let __VLS_430;
const __VLS_431 = ({ click: {} },
    { onClick: (__VLS_ctx.handleSubmit) });
const { default: __VLS_432 } = __VLS_428.slots;
(__VLS_ctx.t("role.confirm"));
// @ts-ignore
[t, handleSubmit,];
var __VLS_428;
var __VLS_429;
// @ts-ignore
[];
var __VLS_414;
// @ts-ignore
[];
var __VLS_272;
// @ts-ignore
[];
var __VLS_264;
var __VLS_265;
let __VLS_433;
/** @ts-ignore @type { | typeof __VLS_components.Sheet | typeof __VLS_components.Sheet} */
Sheet;
// @ts-ignore
const __VLS_434 = __VLS_asFunctionalComponent1(__VLS_433, new __VLS_433({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.assignVisible),
}));
const __VLS_435 = __VLS_434({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.assignVisible),
}, ...__VLS_functionalComponentArgsRest(__VLS_434));
let __VLS_438;
const __VLS_439 = ({ 'update:open': {} },
    { 'onUpdate:open': ((v) => (__VLS_ctx.assignVisible = v)) });
const { default: __VLS_440 } = __VLS_436.slots;
let __VLS_441;
/** @ts-ignore @type { | typeof __VLS_components.SheetContent | typeof __VLS_components.SheetContent} */
SheetContent;
// @ts-ignore
const __VLS_442 = __VLS_asFunctionalComponent1(__VLS_441, new __VLS_441({
    ...{ class: "sm:max-w-lg overflow-auto" },
}));
const __VLS_443 = __VLS_442({
    ...{ class: "sm:max-w-lg overflow-auto" },
}, ...__VLS_functionalComponentArgsRest(__VLS_442));
/** @type {__VLS_StyleScopedClasses['sm:max-w-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
const { default: __VLS_446 } = __VLS_444.slots;
let __VLS_447;
/** @ts-ignore @type { | typeof __VLS_components.SheetHeader | typeof __VLS_components.SheetHeader} */
SheetHeader;
// @ts-ignore
const __VLS_448 = __VLS_asFunctionalComponent1(__VLS_447, new __VLS_447({}));
const __VLS_449 = __VLS_448({}, ...__VLS_functionalComponentArgsRest(__VLS_448));
const { default: __VLS_452 } = __VLS_450.slots;
let __VLS_453;
/** @ts-ignore @type { | typeof __VLS_components.SheetTitle | typeof __VLS_components.SheetTitle} */
SheetTitle;
// @ts-ignore
const __VLS_454 = __VLS_asFunctionalComponent1(__VLS_453, new __VLS_453({}));
const __VLS_455 = __VLS_454({}, ...__VLS_functionalComponentArgsRest(__VLS_454));
const { default: __VLS_458 } = __VLS_456.slots;
(__VLS_ctx.t("role.assignPermTitle", { name: __VLS_ctx.checkedRoleName }));
// @ts-ignore
[t, assignVisible, assignVisible, checkedRoleName,];
var __VLS_456;
// @ts-ignore
[];
var __VLS_450;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "py-4 space-y-4" },
});
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3 flex-wrap" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
let __VLS_459;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_460 = __VLS_asFunctionalComponent1(__VLS_459, new __VLS_459({
    modelValue: (__VLS_ctx.permKeywords),
    placeholder: (__VLS_ctx.t('role.permSearchPlaceholder')),
    ...{ class: "w-40" },
}));
const __VLS_461 = __VLS_460({
    modelValue: (__VLS_ctx.permKeywords),
    placeholder: (__VLS_ctx.t('role.permSearchPlaceholder')),
    ...{ class: "w-40" },
}, ...__VLS_functionalComponentArgsRest(__VLS_460));
/** @type {__VLS_StyleScopedClasses['w-40']} */ ;
let __VLS_464;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_465 = __VLS_asFunctionalComponent1(__VLS_464, new __VLS_464({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}));
const __VLS_466 = __VLS_465({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_465));
let __VLS_469;
const __VLS_470 = ({ click: {} },
    { onClick: (__VLS_ctx.togglePermTree) });
const { default: __VLS_471 } = __VLS_467.slots;
(__VLS_ctx.permExpanded ? __VLS_ctx.t("role.collapse") : __VLS_ctx.t("role.expand"));
// @ts-ignore
[t, t, t, permKeywords, togglePermTree, permExpanded,];
var __VLS_467;
var __VLS_468;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "flex items-center gap-1.5 text-sm cursor-pointer" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    type: "checkbox",
    ...{ class: "size-4 rounded" },
});
(__VLS_ctx.parentChildLinked);
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
(__VLS_ctx.t("role.parentChildLinked"));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "border rounded-md p-3 space-y-1" },
});
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
for (const [node] of __VLS_vFor((__VLS_ctx.filteredPermOptions))) {
    const __VLS_472 = PermTreeItem;
    // @ts-ignore
    const __VLS_473 = __VLS_asFunctionalComponent1(__VLS_472, new __VLS_472({
        ...{ 'onToggle': {} },
        key: (String(node.value)),
        node: (node),
        level: (0),
        expanded: (__VLS_ctx.permExpanded),
        checkedIds: (__VLS_ctx.checkedMenuIds),
        parentLinked: (__VLS_ctx.parentChildLinked),
    }));
    const __VLS_474 = __VLS_473({
        ...{ 'onToggle': {} },
        key: (String(node.value)),
        node: (node),
        level: (0),
        expanded: (__VLS_ctx.permExpanded),
        checkedIds: (__VLS_ctx.checkedMenuIds),
        parentLinked: (__VLS_ctx.parentChildLinked),
    }, ...__VLS_functionalComponentArgsRest(__VLS_473));
    let __VLS_477;
    const __VLS_478 = ({ toggle: {} },
        { onToggle: (__VLS_ctx.togglePermCheck) });
    var __VLS_475;
    var __VLS_476;
    // @ts-ignore
    [t, permExpanded, parentChildLinked, parentChildLinked, filteredPermOptions, checkedMenuIds, togglePermCheck,];
}
let __VLS_479;
/** @ts-ignore @type { | typeof __VLS_components.SheetFooter | typeof __VLS_components.SheetFooter} */
SheetFooter;
// @ts-ignore
const __VLS_480 = __VLS_asFunctionalComponent1(__VLS_479, new __VLS_479({}));
const __VLS_481 = __VLS_480({}, ...__VLS_functionalComponentArgsRest(__VLS_480));
const { default: __VLS_484 } = __VLS_482.slots;
let __VLS_485;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_486 = __VLS_asFunctionalComponent1(__VLS_485, new __VLS_485({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_487 = __VLS_486({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_486));
let __VLS_490;
const __VLS_491 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.assignVisible = false;
            // @ts-ignore
            [assignVisible,];
        } });
const { default: __VLS_492 } = __VLS_488.slots;
(__VLS_ctx.t("role.cancel"));
// @ts-ignore
[t,];
var __VLS_488;
var __VLS_489;
let __VLS_493;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_494 = __VLS_asFunctionalComponent1(__VLS_493, new __VLS_493({
    ...{ 'onClick': {} },
}));
const __VLS_495 = __VLS_494({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_494));
let __VLS_498;
const __VLS_499 = ({ click: {} },
    { onClick: (__VLS_ctx.handleAssignPermSubmit) });
const { default: __VLS_500 } = __VLS_496.slots;
(__VLS_ctx.t("role.confirm"));
// @ts-ignore
[t, handleAssignPermSubmit,];
var __VLS_496;
var __VLS_497;
// @ts-ignore
[];
var __VLS_482;
// @ts-ignore
[];
var __VLS_444;
// @ts-ignore
[];
var __VLS_436;
var __VLS_437;
let __VLS_501;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialog | typeof __VLS_components.AlertDialog} */
AlertDialog;
// @ts-ignore
const __VLS_502 = __VLS_asFunctionalComponent1(__VLS_501, new __VLS_501({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteConfirmVisible),
}));
const __VLS_503 = __VLS_502({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteConfirmVisible),
}, ...__VLS_functionalComponentArgsRest(__VLS_502));
let __VLS_506;
const __VLS_507 = ({ 'update:open': {} },
    { 'onUpdate:open': ((v) => (__VLS_ctx.deleteConfirmVisible = v)) });
const { default: __VLS_508 } = __VLS_504.slots;
let __VLS_509;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogContent | typeof __VLS_components.AlertDialogContent} */
AlertDialogContent;
// @ts-ignore
const __VLS_510 = __VLS_asFunctionalComponent1(__VLS_509, new __VLS_509({}));
const __VLS_511 = __VLS_510({}, ...__VLS_functionalComponentArgsRest(__VLS_510));
const { default: __VLS_514 } = __VLS_512.slots;
let __VLS_515;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogHeader | typeof __VLS_components.AlertDialogHeader} */
AlertDialogHeader;
// @ts-ignore
const __VLS_516 = __VLS_asFunctionalComponent1(__VLS_515, new __VLS_515({}));
const __VLS_517 = __VLS_516({}, ...__VLS_functionalComponentArgsRest(__VLS_516));
const { default: __VLS_520 } = __VLS_518.slots;
let __VLS_521;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogTitle | typeof __VLS_components.AlertDialogTitle} */
AlertDialogTitle;
// @ts-ignore
const __VLS_522 = __VLS_asFunctionalComponent1(__VLS_521, new __VLS_521({}));
const __VLS_523 = __VLS_522({}, ...__VLS_functionalComponentArgsRest(__VLS_522));
const { default: __VLS_526 } = __VLS_524.slots;
(__VLS_ctx.t("role.deleteWarning"));
// @ts-ignore
[t, deleteConfirmVisible, deleteConfirmVisible,];
var __VLS_524;
let __VLS_527;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogDescription | typeof __VLS_components.AlertDialogDescription} */
AlertDialogDescription;
// @ts-ignore
const __VLS_528 = __VLS_asFunctionalComponent1(__VLS_527, new __VLS_527({}));
const __VLS_529 = __VLS_528({}, ...__VLS_functionalComponentArgsRest(__VLS_528));
const { default: __VLS_532 } = __VLS_530.slots;
(__VLS_ctx.t("role.deleteConfirm"));
// @ts-ignore
[t,];
var __VLS_530;
// @ts-ignore
[];
var __VLS_518;
let __VLS_533;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogFooter | typeof __VLS_components.AlertDialogFooter} */
AlertDialogFooter;
// @ts-ignore
const __VLS_534 = __VLS_asFunctionalComponent1(__VLS_533, new __VLS_533({}));
const __VLS_535 = __VLS_534({}, ...__VLS_functionalComponentArgsRest(__VLS_534));
const { default: __VLS_538 } = __VLS_536.slots;
let __VLS_539;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogCancel | typeof __VLS_components.AlertDialogCancel} */
AlertDialogCancel;
// @ts-ignore
const __VLS_540 = __VLS_asFunctionalComponent1(__VLS_539, new __VLS_539({
    ...{ 'onClick': {} },
}));
const __VLS_541 = __VLS_540({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_540));
let __VLS_544;
const __VLS_545 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.deleteConfirmVisible = false;
            // @ts-ignore
            [deleteConfirmVisible,];
        } });
const { default: __VLS_546 } = __VLS_542.slots;
(__VLS_ctx.t("role.cancel"));
// @ts-ignore
[t,];
var __VLS_542;
var __VLS_543;
let __VLS_547;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogAction | typeof __VLS_components.AlertDialogAction} */
AlertDialogAction;
// @ts-ignore
const __VLS_548 = __VLS_asFunctionalComponent1(__VLS_547, new __VLS_547({
    ...{ 'onClick': {} },
}));
const __VLS_549 = __VLS_548({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_548));
let __VLS_552;
const __VLS_553 = ({ click: {} },
    { onClick: (__VLS_ctx.confirmDelete) });
const { default: __VLS_554 } = __VLS_550.slots;
(__VLS_ctx.t("role.confirm"));
// @ts-ignore
[t, confirmDelete,];
var __VLS_550;
var __VLS_551;
// @ts-ignore
[];
var __VLS_536;
// @ts-ignore
[];
var __VLS_512;
// @ts-ignore
[];
var __VLS_504;
var __VLS_505;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map