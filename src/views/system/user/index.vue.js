import { computed, onMounted, reactive, ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { toast } from "vue-sonner";
import { SearchIcon, RotateCcwIcon, PlusIcon, TrashIcon, DownloadIcon, MoreHorizontalIcon, PencilIcon, KeyRoundIcon, CalendarIcon, } from "@lucide/vue";
// shadcn/ui 组件
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableEmpty, } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// 业务依赖
import UserAPI from "@/api/system/user";
import RoleAPI from "@/api/system/role";
import DeptAPI from "@/api/system/dept";
import { DialogMode, CommonStatus } from "@/enums/common";
import { useTableSelection } from "@/composables/useTableSelection";
import { useUserStore } from "@/stores/user";
import UserDeptTree from "./components/UserDeptTree.vue";
import DeptSelectOption from "./components/DeptSelectOption.vue";
import CalendarRange from "./components/CalendarRange.vue";
defineOptions({ name: "User", inheritAttrs: false });
const userStore = useUserStore();
// ==================== 查询 ====================
const queryParams = reactive({
    pageNum: 1,
    pageSize: 10,
});
const dateRange = ref();
const dateRangeLabel = computed(() => {
    if (!dateRange.value)
        return "";
    const s = dateRange.value.start;
    const e = dateRange.value.end;
    if (!s || !e)
        return "";
    return `${fmt(s)} ~ ${fmt(e)}`;
});
function fmt(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function onDateChange(val) {
    dateRange.value = val;
    if (val?.start && val?.end) {
        queryParams.createTime = [fmt(val.start), fmt(val.end)];
    }
    else {
        queryParams.createTime = undefined;
    }
    handleQuery();
}
// ==================== 列表 ====================
const userList = ref([]);
const total = ref(0);
const loading = ref(false);
async function fetchList() {
    loading.value = true;
    try {
        const data = await UserAPI.getPage(queryParams);
        userList.value = data.list;
        total.value = data.total ?? 0;
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
    queryParams.keywords = undefined;
    queryParams.status = undefined;
    queryParams.deptId = undefined;
    queryParams.createTime = undefined;
    dateRange.value = undefined;
    handleQuery();
}
// ==================== 选择 ====================
const { selectedIds, hasSelection } = useTableSelection();
// 手动管理 checked 状态（shadcn Table 没有内置 selection）
const checkedIds = ref(new Set());
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
    selectedIds.value = [...s];
}
const isAllSelected = computed(() => {
    if (userList.value.length === 0)
        return false;
    return userList.value.every((row) => checkedIds.value.has(row.id));
});
function toggleAll(val) {
    const s = new Set();
    if (val === true) {
        userList.value.forEach((row) => s.add(row.id));
    }
    checkedIds.value = s;
    selectedIds.value = [...s];
}
// ==================== 表单弹窗 ====================
const dialogState = reactive({
    visible: false,
    title: "新增用户",
    mode: DialogMode.CREATE,
});
const initialFormData = {
    status: CommonStatus.ENABLED,
};
const formData = reactive({ ...initialFormData });
const deptOptions = ref([]);
const roleOptions = ref([]);
async function loadFormOptions() {
    [roleOptions.value, deptOptions.value] = await Promise.all([
        RoleAPI.getOptions(),
        DeptAPI.getOptions(),
    ]);
}
const selectedRoleLabels = computed(() => {
    if (!formData.roleIds?.length)
        return "";
    return formData.roleIds
        .map((id) => roleOptions.value.find((r) => r.value === id)?.label)
        .filter(Boolean)
        .join("、");
});
function toggleRole(roleId) {
    if (!formData.roleIds)
        formData.roleIds = [];
    const idx = formData.roleIds.indexOf(roleId);
    if (idx >= 0) {
        formData.roleIds.splice(idx, 1);
    }
    else {
        formData.roleIds.push(roleId);
    }
}
async function handleCreateClick() {
    dialogState.title = "新增用户";
    dialogState.mode = DialogMode.CREATE;
    Object.assign(formData, { ...initialFormData, roleIds: [] });
    await loadFormOptions();
    dialogState.visible = true;
}
async function handleEditClick(id) {
    dialogState.title = "修改用户";
    dialogState.mode = DialogMode.EDIT;
    await loadFormOptions();
    const data = await UserAPI.getFormData(id);
    Object.assign(formData, data);
    dialogState.visible = true;
}
function onSheetOpenChange(val) {
    if (!val)
        closeDialog();
}
function closeDialog() {
    dialogState.visible = false;
    Object.assign(formData, initialFormData);
}
const handleSubmit = useDebounceFn(async () => {
    if (!formData.username) {
        toast.error("请输入用户名");
        return;
    }
    if (!formData.nickname) {
        toast.error("请输入用户昵称");
        return;
    }
    if (!formData.deptId) {
        toast.error("请选择所属部门");
        return;
    }
    if (!formData.roleIds?.length) {
        toast.error("请选择角色");
        return;
    }
    loading.value = true;
    try {
        if (formData.id) {
            await UserAPI.update(formData.id, formData);
            toast.success("修改用户成功");
        }
        else {
            await UserAPI.create(formData);
            toast.success("新增用户成功");
        }
        closeDialog();
        handleQuery();
    }
    finally {
        loading.value = false;
    }
}, 300);
// ==================== 重置密码 ====================
const resetPasswordState = reactive({
    visible: false,
    userId: "",
    username: "",
    password: "",
});
function handleResetPassword(row) {
    resetPasswordState.userId = row.id;
    resetPasswordState.username = row.username ?? "";
    resetPasswordState.password = "";
    resetPasswordState.visible = true;
}
async function confirmResetPassword() {
    if (resetPasswordState.password.length < 6) {
        toast.error("密码至少需要6位字符");
        return;
    }
    await UserAPI.resetPassword(resetPasswordState.userId, resetPasswordState.password);
    toast.success("密码重置成功");
    resetPasswordState.visible = false;
}
// ==================== 删除 ====================
const deleteState = reactive({
    visible: false,
    ids: "",
});
function handleDelete(id) {
    const userIds = id ?? selectedIds.value.join(",");
    if (!userIds) {
        toast.warning("请勾选删除项");
        return;
    }
    // 安全检查：防止删除当前登录用户
    const currentUserId = userStore.userInfo?.userId;
    if (currentUserId) {
        const isCurrent = id
            ? id === currentUserId
            : selectedIds.value.some((sid) => String(sid) === currentUserId);
        if (isCurrent) {
            toast.error("不能删除当前登录用户");
            return;
        }
    }
    deleteState.ids = userIds;
    deleteState.visible = true;
}
async function confirmDelete() {
    await UserAPI.deleteByIds(deleteState.ids);
    toast.success("删除成功");
    deleteState.visible = false;
    checkedIds.value = new Set();
    handleQuery();
}
// ==================== 导出 ====================
async function exportUsers() {
    try {
        const response = await UserAPI.export(queryParams);
        const blob = new Blob([response], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "用户数据.xlsx";
        link.click();
        window.URL.revokeObjectURL(url);
        toast.success("导出成功");
    }
    catch {
        toast.error("导出失败");
    }
}
// ==================== 分页 ====================
const totalPages = computed(() => Math.ceil(total.value / queryParams.pageSize));
const paginationItems = computed(() => {
    const pages = [];
    const current = queryParams.pageNum;
    const totalP = totalPages.value;
    if (totalP <= 7) {
        for (let i = 1; i <= totalP; i++)
            pages.push(i);
        return pages;
    }
    pages.push(1);
    if (current > 3)
        pages.push(-1); // ellipsis
    const start = Math.max(2, current - 1);
    const end = Math.min(totalP - 1, current + 1);
    for (let i = start; i <= end; i++)
        pages.push(i);
    if (current < totalP - 2)
        pages.push(-2); // ellipsis
    pages.push(totalP);
    return pages;
});
function onPageChange(page) {
    if (page < 1 || page > totalPages.value)
        return;
    queryParams.pageNum = page;
    fetchList();
}
// ==================== 工具 ====================
function genderLabel(gender) {
    if (gender === 1)
        return "男";
    if (gender === 2)
        return "女";
    return "未知";
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
    ...{ class: "flex gap-5 h-full p-5" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
    ...{ class: "hidden lg:block w-60 shrink-0" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-60']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
const __VLS_0 = UserDeptTree;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onNodeClick': {} },
    modelValue: (__VLS_ctx.queryParams.deptId),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onNodeClick': {} },
    modelValue: (__VLS_ctx.queryParams.deptId),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ nodeClick: {} },
    { onNodeClick: (__VLS_ctx.handleQuery) });
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "flex-1 min-w-0 space-y-4" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({}));
const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    ...{ class: "pt-5 pb-4" },
}));
const __VLS_15 = __VLS_14({
    ...{ class: "pt-5 pb-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
/** @type {__VLS_StyleScopedClasses['pt-5']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-4']} */ ;
const { default: __VLS_18 } = __VLS_16.slots;
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
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    ...{ class: "text-xs" },
}));
const __VLS_21 = __VLS_20({
    ...{ class: "text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_24 } = __VLS_22.slots;
// @ts-ignore
[queryParams, handleQuery,];
var __VLS_22;
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.keywords),
    modelModifiers: { trim: true, },
    placeholder: "用户名/昵称/手机号",
    ...{ class: "w-52 h-8 text-sm" },
}));
const __VLS_27 = __VLS_26({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.keywords),
    modelModifiers: { trim: true, },
    placeholder: "用户名/昵称/手机号",
    ...{ class: "w-52 h-8 text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
let __VLS_30;
const __VLS_31 = ({ keyup: {} },
    { onKeyup: (__VLS_ctx.handleQuery) });
/** @type {__VLS_StyleScopedClasses['w-52']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
var __VLS_28;
var __VLS_29;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_32;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
    ...{ class: "text-xs" },
}));
const __VLS_34 = __VLS_33({
    ...{ class: "text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_37 } = __VLS_35.slots;
// @ts-ignore
[queryParams, handleQuery,];
var __VLS_35;
let __VLS_38;
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.queryParams.status),
}));
const __VLS_40 = __VLS_39({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.queryParams.status),
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
let __VLS_43;
const __VLS_44 = ({ 'update:modelValue': {} },
    { 'onUpdate:modelValue': (__VLS_ctx.handleQuery) });
const { default: __VLS_45 } = __VLS_41.slots;
let __VLS_46;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
    ...{ class: "w-28 h-8 text-sm" },
}));
const __VLS_48 = __VLS_47({
    ...{ class: "w-28 h-8 text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
/** @type {__VLS_StyleScopedClasses['w-28']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_51 } = __VLS_49.slots;
let __VLS_52;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
    placeholder: "全部",
}));
const __VLS_54 = __VLS_53({
    placeholder: "全部",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
// @ts-ignore
[queryParams, handleQuery,];
var __VLS_49;
let __VLS_57;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({}));
const __VLS_59 = __VLS_58({}, ...__VLS_functionalComponentArgsRest(__VLS_58));
const { default: __VLS_62 } = __VLS_60.slots;
let __VLS_63;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
    value: (1),
}));
const __VLS_65 = __VLS_64({
    value: (1),
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
const { default: __VLS_68 } = __VLS_66.slots;
// @ts-ignore
[];
var __VLS_66;
let __VLS_69;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
    value: (0),
}));
const __VLS_71 = __VLS_70({
    value: (0),
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
const { default: __VLS_74 } = __VLS_72.slots;
// @ts-ignore
[];
var __VLS_72;
// @ts-ignore
[];
var __VLS_60;
// @ts-ignore
[];
var __VLS_41;
var __VLS_42;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_75;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
    ...{ class: "text-xs" },
}));
const __VLS_77 = __VLS_76({
    ...{ class: "text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_80 } = __VLS_78.slots;
// @ts-ignore
[];
var __VLS_78;
let __VLS_81;
/** @ts-ignore @type { | typeof __VLS_components.Popover | typeof __VLS_components.Popover} */
Popover;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({}));
const __VLS_83 = __VLS_82({}, ...__VLS_functionalComponentArgsRest(__VLS_82));
const { default: __VLS_86 } = __VLS_84.slots;
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.PopoverTrigger | typeof __VLS_components.PopoverTrigger} */
PopoverTrigger;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
    asChild: true,
}));
const __VLS_89 = __VLS_88({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
const { default: __VLS_92 } = __VLS_90.slots;
let __VLS_93;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
    variant: "outline",
    ...{ class: "w-56 h-8 text-sm justify-start font-normal text-muted-foreground" },
}));
const __VLS_95 = __VLS_94({
    variant: "outline",
    ...{ class: "w-56 h-8 text-sm justify-start font-normal text-muted-foreground" },
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
/** @type {__VLS_StyleScopedClasses['w-56']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
const { default: __VLS_98 } = __VLS_96.slots;
let __VLS_99;
/** @ts-ignore @type { | typeof __VLS_components.CalendarIcon} */
CalendarIcon;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
    ...{ class: "mr-1.5 size-3.5" },
}));
const __VLS_101 = __VLS_100({
    ...{ class: "mr-1.5 size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
/** @type {__VLS_StyleScopedClasses['mr-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
(__VLS_ctx.dateRangeLabel || "选择日期范围");
// @ts-ignore
[dateRangeLabel,];
var __VLS_96;
// @ts-ignore
[];
var __VLS_90;
let __VLS_104;
/** @ts-ignore @type { | typeof __VLS_components.PopoverContent | typeof __VLS_components.PopoverContent} */
PopoverContent;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent1(__VLS_104, new __VLS_104({
    ...{ class: "w-auto p-0" },
    align: "start",
}));
const __VLS_106 = __VLS_105({
    ...{ class: "w-auto p-0" },
    align: "start",
}, ...__VLS_functionalComponentArgsRest(__VLS_105));
/** @type {__VLS_StyleScopedClasses['w-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['p-0']} */ ;
const { default: __VLS_109 } = __VLS_107.slots;
const __VLS_110 = CalendarRange;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.dateRange),
}));
const __VLS_112 = __VLS_111({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.dateRange),
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
let __VLS_115;
const __VLS_116 = ({ 'update:modelValue': {} },
    { 'onUpdate:modelValue': (__VLS_ctx.onDateChange) });
var __VLS_113;
var __VLS_114;
// @ts-ignore
[dateRange, onDateChange,];
var __VLS_107;
// @ts-ignore
[];
var __VLS_84;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
let __VLS_117;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({
    ...{ 'onClick': {} },
    size: "sm",
}));
const __VLS_119 = __VLS_118({
    ...{ 'onClick': {} },
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_118));
let __VLS_122;
const __VLS_123 = ({ click: {} },
    { onClick: (__VLS_ctx.handleQuery) });
const { default: __VLS_124 } = __VLS_120.slots;
let __VLS_125;
/** @ts-ignore @type { | typeof __VLS_components.SearchIcon} */
SearchIcon;
// @ts-ignore
const __VLS_126 = __VLS_asFunctionalComponent1(__VLS_125, new __VLS_125({
    ...{ class: "size-3.5" },
}));
const __VLS_127 = __VLS_126({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_126));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[handleQuery,];
var __VLS_120;
var __VLS_121;
let __VLS_130;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent1(__VLS_130, new __VLS_130({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}));
const __VLS_132 = __VLS_131({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
let __VLS_135;
const __VLS_136 = ({ click: {} },
    { onClick: (__VLS_ctx.handleResetQuery) });
const { default: __VLS_137 } = __VLS_133.slots;
let __VLS_138;
/** @ts-ignore @type { | typeof __VLS_components.RotateCcwIcon} */
RotateCcwIcon;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent1(__VLS_138, new __VLS_138({
    ...{ class: "size-3.5" },
}));
const __VLS_140 = __VLS_139({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_139));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[handleResetQuery,];
var __VLS_133;
var __VLS_134;
// @ts-ignore
[];
var __VLS_16;
// @ts-ignore
[];
var __VLS_10;
let __VLS_143;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_144 = __VLS_asFunctionalComponent1(__VLS_143, new __VLS_143({}));
const __VLS_145 = __VLS_144({}, ...__VLS_functionalComponentArgsRest(__VLS_144));
const { default: __VLS_148 } = __VLS_146.slots;
let __VLS_149;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_150 = __VLS_asFunctionalComponent1(__VLS_149, new __VLS_149({
    ...{ class: "pb-3" },
}));
const __VLS_151 = __VLS_150({
    ...{ class: "pb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_150));
/** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
const { default: __VLS_154 } = __VLS_152.slots;
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
let __VLS_155;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_156 = __VLS_asFunctionalComponent1(__VLS_155, new __VLS_155({
    ...{ 'onClick': {} },
    size: "sm",
}));
const __VLS_157 = __VLS_156({
    ...{ 'onClick': {} },
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_156));
let __VLS_160;
const __VLS_161 = ({ click: {} },
    { onClick: (__VLS_ctx.handleCreateClick) });
const { default: __VLS_162 } = __VLS_158.slots;
let __VLS_163;
/** @ts-ignore @type { | typeof __VLS_components.PlusIcon} */
PlusIcon;
// @ts-ignore
const __VLS_164 = __VLS_asFunctionalComponent1(__VLS_163, new __VLS_163({
    ...{ class: "size-3.5" },
}));
const __VLS_165 = __VLS_164({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_164));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[handleCreateClick,];
var __VLS_158;
var __VLS_159;
let __VLS_168;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_169 = __VLS_asFunctionalComponent1(__VLS_168, new __VLS_168({
    ...{ 'onClick': {} },
    variant: "destructive",
    size: "sm",
    disabled: (!__VLS_ctx.hasSelection),
}));
const __VLS_170 = __VLS_169({
    ...{ 'onClick': {} },
    variant: "destructive",
    size: "sm",
    disabled: (!__VLS_ctx.hasSelection),
}, ...__VLS_functionalComponentArgsRest(__VLS_169));
let __VLS_173;
const __VLS_174 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.handleDelete();
            // @ts-ignore
            [hasSelection, handleDelete,];
        } });
const { default: __VLS_175 } = __VLS_171.slots;
let __VLS_176;
/** @ts-ignore @type { | typeof __VLS_components.TrashIcon} */
TrashIcon;
// @ts-ignore
const __VLS_177 = __VLS_asFunctionalComponent1(__VLS_176, new __VLS_176({
    ...{ class: "size-3.5" },
}));
const __VLS_178 = __VLS_177({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_177));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[];
var __VLS_171;
var __VLS_172;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
let __VLS_181;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_182 = __VLS_asFunctionalComponent1(__VLS_181, new __VLS_181({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}));
const __VLS_183 = __VLS_182({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_182));
let __VLS_186;
const __VLS_187 = ({ click: {} },
    { onClick: (__VLS_ctx.exportUsers) });
const { default: __VLS_188 } = __VLS_184.slots;
let __VLS_189;
/** @ts-ignore @type { | typeof __VLS_components.DownloadIcon} */
DownloadIcon;
// @ts-ignore
const __VLS_190 = __VLS_asFunctionalComponent1(__VLS_189, new __VLS_189({
    ...{ class: "size-3.5" },
}));
const __VLS_191 = __VLS_190({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_190));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[exportUsers,];
var __VLS_184;
var __VLS_185;
// @ts-ignore
[];
var __VLS_152;
let __VLS_194;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_195 = __VLS_asFunctionalComponent1(__VLS_194, new __VLS_194({}));
const __VLS_196 = __VLS_195({}, ...__VLS_functionalComponentArgsRest(__VLS_195));
const { default: __VLS_199 } = __VLS_197.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
let __VLS_200;
/** @ts-ignore @type { | typeof __VLS_components.Table | typeof __VLS_components.Table} */
Table;
// @ts-ignore
const __VLS_201 = __VLS_asFunctionalComponent1(__VLS_200, new __VLS_200({}));
const __VLS_202 = __VLS_201({}, ...__VLS_functionalComponentArgsRest(__VLS_201));
const { default: __VLS_205 } = __VLS_203.slots;
let __VLS_206;
/** @ts-ignore @type { | typeof __VLS_components.TableHeader | typeof __VLS_components.TableHeader} */
TableHeader;
// @ts-ignore
const __VLS_207 = __VLS_asFunctionalComponent1(__VLS_206, new __VLS_206({}));
const __VLS_208 = __VLS_207({}, ...__VLS_functionalComponentArgsRest(__VLS_207));
const { default: __VLS_211 } = __VLS_209.slots;
let __VLS_212;
/** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
TableRow;
// @ts-ignore
const __VLS_213 = __VLS_asFunctionalComponent1(__VLS_212, new __VLS_212({}));
const __VLS_214 = __VLS_213({}, ...__VLS_functionalComponentArgsRest(__VLS_213));
const { default: __VLS_217 } = __VLS_215.slots;
let __VLS_218;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_219 = __VLS_asFunctionalComponent1(__VLS_218, new __VLS_218({
    ...{ class: "w-10" },
}));
const __VLS_220 = __VLS_219({
    ...{ class: "w-10" },
}, ...__VLS_functionalComponentArgsRest(__VLS_219));
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
const { default: __VLS_223 } = __VLS_221.slots;
let __VLS_224;
/** @ts-ignore @type { | typeof __VLS_components.Checkbox} */
Checkbox;
// @ts-ignore
const __VLS_225 = __VLS_asFunctionalComponent1(__VLS_224, new __VLS_224({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.isAllSelected),
}));
const __VLS_226 = __VLS_225({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.isAllSelected),
}, ...__VLS_functionalComponentArgsRest(__VLS_225));
let __VLS_229;
const __VLS_230 = ({ 'update:checked': {} },
    { 'onUpdate:checked': (__VLS_ctx.toggleAll) });
var __VLS_227;
var __VLS_228;
// @ts-ignore
[isAllSelected, toggleAll,];
var __VLS_221;
let __VLS_231;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_232 = __VLS_asFunctionalComponent1(__VLS_231, new __VLS_231({}));
const __VLS_233 = __VLS_232({}, ...__VLS_functionalComponentArgsRest(__VLS_232));
const { default: __VLS_236 } = __VLS_234.slots;
// @ts-ignore
[];
var __VLS_234;
let __VLS_237;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_238 = __VLS_asFunctionalComponent1(__VLS_237, new __VLS_237({}));
const __VLS_239 = __VLS_238({}, ...__VLS_functionalComponentArgsRest(__VLS_238));
const { default: __VLS_242 } = __VLS_240.slots;
// @ts-ignore
[];
var __VLS_240;
let __VLS_243;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_244 = __VLS_asFunctionalComponent1(__VLS_243, new __VLS_243({
    ...{ class: "w-20" },
}));
const __VLS_245 = __VLS_244({
    ...{ class: "w-20" },
}, ...__VLS_functionalComponentArgsRest(__VLS_244));
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
const { default: __VLS_248 } = __VLS_246.slots;
// @ts-ignore
[];
var __VLS_246;
let __VLS_249;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_250 = __VLS_asFunctionalComponent1(__VLS_249, new __VLS_249({}));
const __VLS_251 = __VLS_250({}, ...__VLS_functionalComponentArgsRest(__VLS_250));
const { default: __VLS_254 } = __VLS_252.slots;
// @ts-ignore
[];
var __VLS_252;
let __VLS_255;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_256 = __VLS_asFunctionalComponent1(__VLS_255, new __VLS_255({}));
const __VLS_257 = __VLS_256({}, ...__VLS_functionalComponentArgsRest(__VLS_256));
const { default: __VLS_260 } = __VLS_258.slots;
// @ts-ignore
[];
var __VLS_258;
let __VLS_261;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_262 = __VLS_asFunctionalComponent1(__VLS_261, new __VLS_261({}));
const __VLS_263 = __VLS_262({}, ...__VLS_functionalComponentArgsRest(__VLS_262));
const { default: __VLS_266 } = __VLS_264.slots;
// @ts-ignore
[];
var __VLS_264;
let __VLS_267;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_268 = __VLS_asFunctionalComponent1(__VLS_267, new __VLS_267({}));
const __VLS_269 = __VLS_268({}, ...__VLS_functionalComponentArgsRest(__VLS_268));
const { default: __VLS_272 } = __VLS_270.slots;
// @ts-ignore
[];
var __VLS_270;
let __VLS_273;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_274 = __VLS_asFunctionalComponent1(__VLS_273, new __VLS_273({
    ...{ class: "w-16" },
}));
const __VLS_275 = __VLS_274({
    ...{ class: "w-16" },
}, ...__VLS_functionalComponentArgsRest(__VLS_274));
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
const { default: __VLS_278 } = __VLS_276.slots;
// @ts-ignore
[];
var __VLS_276;
let __VLS_279;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_280 = __VLS_asFunctionalComponent1(__VLS_279, new __VLS_279({}));
const __VLS_281 = __VLS_280({}, ...__VLS_functionalComponentArgsRest(__VLS_280));
const { default: __VLS_284 } = __VLS_282.slots;
// @ts-ignore
[];
var __VLS_282;
let __VLS_285;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_286 = __VLS_asFunctionalComponent1(__VLS_285, new __VLS_285({
    ...{ class: "w-32 text-right" },
}));
const __VLS_287 = __VLS_286({
    ...{ class: "w-32 text-right" },
}, ...__VLS_functionalComponentArgsRest(__VLS_286));
/** @type {__VLS_StyleScopedClasses['w-32']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
const { default: __VLS_290 } = __VLS_288.slots;
// @ts-ignore
[];
var __VLS_288;
// @ts-ignore
[];
var __VLS_215;
// @ts-ignore
[];
var __VLS_209;
let __VLS_291;
/** @ts-ignore @type { | typeof __VLS_components.TableBody | typeof __VLS_components.TableBody} */
TableBody;
// @ts-ignore
const __VLS_292 = __VLS_asFunctionalComponent1(__VLS_291, new __VLS_291({}));
const __VLS_293 = __VLS_292({}, ...__VLS_functionalComponentArgsRest(__VLS_292));
const { default: __VLS_296 } = __VLS_294.slots;
if (__VLS_ctx.loading) {
    for (const [i] of __VLS_vFor((5))) {
        let __VLS_297;
        /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
        TableRow;
        // @ts-ignore
        const __VLS_298 = __VLS_asFunctionalComponent1(__VLS_297, new __VLS_297({
            key: ('skeleton-' + i),
        }));
        const __VLS_299 = __VLS_298({
            key: ('skeleton-' + i),
        }, ...__VLS_functionalComponentArgsRest(__VLS_298));
        const { default: __VLS_302 } = __VLS_300.slots;
        for (const [j] of __VLS_vFor((11))) {
            let __VLS_303;
            /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
            TableCell;
            // @ts-ignore
            const __VLS_304 = __VLS_asFunctionalComponent1(__VLS_303, new __VLS_303({
                key: ('sk-' + j),
            }));
            const __VLS_305 = __VLS_304({
                key: ('sk-' + j),
            }, ...__VLS_functionalComponentArgsRest(__VLS_304));
            const { default: __VLS_308 } = __VLS_306.slots;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
                ...{ class: "h-4 bg-muted rounded animate-pulse" },
            });
            /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
            /** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
            // @ts-ignore
            [loading,];
            var __VLS_306;
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_300;
        // @ts-ignore
        [];
    }
}
else if (__VLS_ctx.userList.length === 0) {
    let __VLS_309;
    /** @ts-ignore @type { | typeof __VLS_components.TableEmpty | typeof __VLS_components.TableEmpty} */
    TableEmpty;
    // @ts-ignore
    const __VLS_310 = __VLS_asFunctionalComponent1(__VLS_309, new __VLS_309({
        colspan: (11),
    }));
    const __VLS_311 = __VLS_310({
        colspan: (11),
    }, ...__VLS_functionalComponentArgsRest(__VLS_310));
    const { default: __VLS_314 } = __VLS_312.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-muted-foreground text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    // @ts-ignore
    [userList,];
    var __VLS_312;
}
else {
    for (const [row] of __VLS_vFor((__VLS_ctx.userList))) {
        let __VLS_315;
        /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
        TableRow;
        // @ts-ignore
        const __VLS_316 = __VLS_asFunctionalComponent1(__VLS_315, new __VLS_315({
            key: (row.id),
            dataState: (__VLS_ctx.isChecked(row.id) ? 'selected' : undefined),
        }));
        const __VLS_317 = __VLS_316({
            key: (row.id),
            dataState: (__VLS_ctx.isChecked(row.id) ? 'selected' : undefined),
        }, ...__VLS_functionalComponentArgsRest(__VLS_316));
        const { default: __VLS_320 } = __VLS_318.slots;
        let __VLS_321;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_322 = __VLS_asFunctionalComponent1(__VLS_321, new __VLS_321({}));
        const __VLS_323 = __VLS_322({}, ...__VLS_functionalComponentArgsRest(__VLS_322));
        const { default: __VLS_326 } = __VLS_324.slots;
        let __VLS_327;
        /** @ts-ignore @type { | typeof __VLS_components.Checkbox} */
        Checkbox;
        // @ts-ignore
        const __VLS_328 = __VLS_asFunctionalComponent1(__VLS_327, new __VLS_327({
            ...{ 'onUpdate:checked': {} },
            checked: (__VLS_ctx.isChecked(row.id)),
        }));
        const __VLS_329 = __VLS_328({
            ...{ 'onUpdate:checked': {} },
            checked: (__VLS_ctx.isChecked(row.id)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_328));
        let __VLS_332;
        const __VLS_333 = ({ 'update:checked': {} },
            { 'onUpdate:checked': (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.userList.length === 0))
                        return;
                    __VLS_ctx.toggleRow(row);
                    // @ts-ignore
                    [userList, isChecked, isChecked, toggleRow,];
                } });
        var __VLS_330;
        var __VLS_331;
        // @ts-ignore
        [];
        var __VLS_324;
        let __VLS_334;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_335 = __VLS_asFunctionalComponent1(__VLS_334, new __VLS_334({
            ...{ class: "font-medium" },
        }));
        const __VLS_336 = __VLS_335({
            ...{ class: "font-medium" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_335));
        /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
        const { default: __VLS_339 } = __VLS_337.slots;
        (row.username);
        // @ts-ignore
        [];
        var __VLS_337;
        let __VLS_340;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_341 = __VLS_asFunctionalComponent1(__VLS_340, new __VLS_340({}));
        const __VLS_342 = __VLS_341({}, ...__VLS_functionalComponentArgsRest(__VLS_341));
        const { default: __VLS_345 } = __VLS_343.slots;
        (row.nickname);
        // @ts-ignore
        [];
        var __VLS_343;
        let __VLS_346;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_347 = __VLS_asFunctionalComponent1(__VLS_346, new __VLS_346({}));
        const __VLS_348 = __VLS_347({}, ...__VLS_functionalComponentArgsRest(__VLS_347));
        const { default: __VLS_351 } = __VLS_349.slots;
        (__VLS_ctx.genderLabel(row.gender));
        // @ts-ignore
        [genderLabel,];
        var __VLS_349;
        let __VLS_352;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_353 = __VLS_asFunctionalComponent1(__VLS_352, new __VLS_352({}));
        const __VLS_354 = __VLS_353({}, ...__VLS_functionalComponentArgsRest(__VLS_353));
        const { default: __VLS_357 } = __VLS_355.slots;
        (row.deptName || "-");
        // @ts-ignore
        [];
        var __VLS_355;
        let __VLS_358;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_359 = __VLS_asFunctionalComponent1(__VLS_358, new __VLS_358({}));
        const __VLS_360 = __VLS_359({}, ...__VLS_functionalComponentArgsRest(__VLS_359));
        const { default: __VLS_363 } = __VLS_361.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs text-muted-foreground" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        (row.roleNames || "-");
        // @ts-ignore
        [];
        var __VLS_361;
        let __VLS_364;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_365 = __VLS_asFunctionalComponent1(__VLS_364, new __VLS_364({}));
        const __VLS_366 = __VLS_365({}, ...__VLS_functionalComponentArgsRest(__VLS_365));
        const { default: __VLS_369 } = __VLS_367.slots;
        (row.mobile || "-");
        // @ts-ignore
        [];
        var __VLS_367;
        let __VLS_370;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_371 = __VLS_asFunctionalComponent1(__VLS_370, new __VLS_370({}));
        const __VLS_372 = __VLS_371({}, ...__VLS_functionalComponentArgsRest(__VLS_371));
        const { default: __VLS_375 } = __VLS_373.slots;
        (row.email || "-");
        // @ts-ignore
        [];
        var __VLS_373;
        let __VLS_376;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_377 = __VLS_asFunctionalComponent1(__VLS_376, new __VLS_376({}));
        const __VLS_378 = __VLS_377({}, ...__VLS_functionalComponentArgsRest(__VLS_377));
        const { default: __VLS_381 } = __VLS_379.slots;
        let __VLS_382;
        /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
        Badge;
        // @ts-ignore
        const __VLS_383 = __VLS_asFunctionalComponent1(__VLS_382, new __VLS_382({
            variant: (row.status === __VLS_ctx.CommonStatus.ENABLED ? 'default' : 'secondary'),
            ...{ class: "text-[10px]" },
        }));
        const __VLS_384 = __VLS_383({
            variant: (row.status === __VLS_ctx.CommonStatus.ENABLED ? 'default' : 'secondary'),
            ...{ class: "text-[10px]" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_383));
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        const { default: __VLS_387 } = __VLS_385.slots;
        (row.status === __VLS_ctx.CommonStatus.ENABLED ? "正常" : "禁用");
        // @ts-ignore
        [CommonStatus, CommonStatus,];
        var __VLS_385;
        // @ts-ignore
        [];
        var __VLS_379;
        let __VLS_388;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_389 = __VLS_asFunctionalComponent1(__VLS_388, new __VLS_388({
            ...{ class: "text-xs text-muted-foreground" },
        }));
        const __VLS_390 = __VLS_389({
            ...{ class: "text-xs text-muted-foreground" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_389));
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        const { default: __VLS_393 } = __VLS_391.slots;
        (row.createTime);
        // @ts-ignore
        [];
        var __VLS_391;
        let __VLS_394;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_395 = __VLS_asFunctionalComponent1(__VLS_394, new __VLS_394({
            ...{ class: "text-right" },
        }));
        const __VLS_396 = __VLS_395({
            ...{ class: "text-right" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_395));
        /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
        const { default: __VLS_399 } = __VLS_397.slots;
        let __VLS_400;
        /** @ts-ignore @type { | typeof __VLS_components.DropdownMenu | typeof __VLS_components.DropdownMenu} */
        DropdownMenu;
        // @ts-ignore
        const __VLS_401 = __VLS_asFunctionalComponent1(__VLS_400, new __VLS_400({}));
        const __VLS_402 = __VLS_401({}, ...__VLS_functionalComponentArgsRest(__VLS_401));
        const { default: __VLS_405 } = __VLS_403.slots;
        let __VLS_406;
        /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuTrigger | typeof __VLS_components.DropdownMenuTrigger} */
        DropdownMenuTrigger;
        // @ts-ignore
        const __VLS_407 = __VLS_asFunctionalComponent1(__VLS_406, new __VLS_406({
            asChild: true,
        }));
        const __VLS_408 = __VLS_407({
            asChild: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_407));
        const { default: __VLS_411 } = __VLS_409.slots;
        let __VLS_412;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_413 = __VLS_asFunctionalComponent1(__VLS_412, new __VLS_412({
            variant: "ghost",
            size: "icon-xs",
        }));
        const __VLS_414 = __VLS_413({
            variant: "ghost",
            size: "icon-xs",
        }, ...__VLS_functionalComponentArgsRest(__VLS_413));
        const { default: __VLS_417 } = __VLS_415.slots;
        let __VLS_418;
        /** @ts-ignore @type { | typeof __VLS_components.MoreHorizontalIcon} */
        MoreHorizontalIcon;
        // @ts-ignore
        const __VLS_419 = __VLS_asFunctionalComponent1(__VLS_418, new __VLS_418({
            ...{ class: "size-3.5" },
        }));
        const __VLS_420 = __VLS_419({
            ...{ class: "size-3.5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_419));
        /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
        // @ts-ignore
        [];
        var __VLS_415;
        // @ts-ignore
        [];
        var __VLS_409;
        let __VLS_423;
        /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuContent | typeof __VLS_components.DropdownMenuContent} */
        DropdownMenuContent;
        // @ts-ignore
        const __VLS_424 = __VLS_asFunctionalComponent1(__VLS_423, new __VLS_423({
            align: "end",
        }));
        const __VLS_425 = __VLS_424({
            align: "end",
        }, ...__VLS_functionalComponentArgsRest(__VLS_424));
        const { default: __VLS_428 } = __VLS_426.slots;
        let __VLS_429;
        /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
        DropdownMenuItem;
        // @ts-ignore
        const __VLS_430 = __VLS_asFunctionalComponent1(__VLS_429, new __VLS_429({
            ...{ 'onClick': {} },
        }));
        const __VLS_431 = __VLS_430({
            ...{ 'onClick': {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_430));
        let __VLS_434;
        const __VLS_435 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.userList.length === 0))
                        return;
                    __VLS_ctx.handleResetPassword(row);
                    // @ts-ignore
                    [handleResetPassword,];
                } });
        const { default: __VLS_436 } = __VLS_432.slots;
        let __VLS_437;
        /** @ts-ignore @type { | typeof __VLS_components.KeyRoundIcon} */
        KeyRoundIcon;
        // @ts-ignore
        const __VLS_438 = __VLS_asFunctionalComponent1(__VLS_437, new __VLS_437({
            ...{ class: "size-3.5 mr-2" },
        }));
        const __VLS_439 = __VLS_438({
            ...{ class: "size-3.5 mr-2" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_438));
        /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
        // @ts-ignore
        [];
        var __VLS_432;
        var __VLS_433;
        let __VLS_442;
        /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
        DropdownMenuItem;
        // @ts-ignore
        const __VLS_443 = __VLS_asFunctionalComponent1(__VLS_442, new __VLS_442({
            ...{ 'onClick': {} },
        }));
        const __VLS_444 = __VLS_443({
            ...{ 'onClick': {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_443));
        let __VLS_447;
        const __VLS_448 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.userList.length === 0))
                        return;
                    __VLS_ctx.handleEditClick(row.id);
                    // @ts-ignore
                    [handleEditClick,];
                } });
        const { default: __VLS_449 } = __VLS_445.slots;
        let __VLS_450;
        /** @ts-ignore @type { | typeof __VLS_components.PencilIcon} */
        PencilIcon;
        // @ts-ignore
        const __VLS_451 = __VLS_asFunctionalComponent1(__VLS_450, new __VLS_450({
            ...{ class: "size-3.5 mr-2" },
        }));
        const __VLS_452 = __VLS_451({
            ...{ class: "size-3.5 mr-2" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_451));
        /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
        // @ts-ignore
        [];
        var __VLS_445;
        var __VLS_446;
        let __VLS_455;
        /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSeparator} */
        DropdownMenuSeparator;
        // @ts-ignore
        const __VLS_456 = __VLS_asFunctionalComponent1(__VLS_455, new __VLS_455({}));
        const __VLS_457 = __VLS_456({}, ...__VLS_functionalComponentArgsRest(__VLS_456));
        let __VLS_460;
        /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
        DropdownMenuItem;
        // @ts-ignore
        const __VLS_461 = __VLS_asFunctionalComponent1(__VLS_460, new __VLS_460({
            ...{ 'onClick': {} },
            ...{ class: "text-destructive focus:text-destructive" },
        }));
        const __VLS_462 = __VLS_461({
            ...{ 'onClick': {} },
            ...{ class: "text-destructive focus:text-destructive" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_461));
        let __VLS_465;
        const __VLS_466 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.userList.length === 0))
                        return;
                    __VLS_ctx.handleDelete(row.id);
                    // @ts-ignore
                    [handleDelete,];
                } });
        /** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus:text-destructive']} */ ;
        const { default: __VLS_467 } = __VLS_463.slots;
        let __VLS_468;
        /** @ts-ignore @type { | typeof __VLS_components.TrashIcon} */
        TrashIcon;
        // @ts-ignore
        const __VLS_469 = __VLS_asFunctionalComponent1(__VLS_468, new __VLS_468({
            ...{ class: "size-3.5 mr-2" },
        }));
        const __VLS_470 = __VLS_469({
            ...{ class: "size-3.5 mr-2" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_469));
        /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
        // @ts-ignore
        [];
        var __VLS_463;
        var __VLS_464;
        // @ts-ignore
        [];
        var __VLS_426;
        // @ts-ignore
        [];
        var __VLS_403;
        // @ts-ignore
        [];
        var __VLS_397;
        // @ts-ignore
        [];
        var __VLS_318;
        // @ts-ignore
        [];
    }
}
// @ts-ignore
[];
var __VLS_294;
// @ts-ignore
[];
var __VLS_203;
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
    let __VLS_473;
    /** @ts-ignore @type { | typeof __VLS_components.Pagination | typeof __VLS_components.Pagination} */
    Pagination;
    // @ts-ignore
    const __VLS_474 = __VLS_asFunctionalComponent1(__VLS_473, new __VLS_473({
        ...{ 'onUpdate:page': {} },
        page: (__VLS_ctx.queryParams.pageNum),
        total: (__VLS_ctx.total),
        itemsPerPage: (__VLS_ctx.queryParams.pageSize),
    }));
    const __VLS_475 = __VLS_474({
        ...{ 'onUpdate:page': {} },
        page: (__VLS_ctx.queryParams.pageNum),
        total: (__VLS_ctx.total),
        itemsPerPage: (__VLS_ctx.queryParams.pageSize),
    }, ...__VLS_functionalComponentArgsRest(__VLS_474));
    let __VLS_478;
    const __VLS_479 = ({ 'update:page': {} },
        { 'onUpdate:page': (__VLS_ctx.onPageChange) });
    const { default: __VLS_480 } = __VLS_476.slots;
    let __VLS_481;
    /** @ts-ignore @type { | typeof __VLS_components.PaginationContent | typeof __VLS_components.PaginationContent} */
    PaginationContent;
    // @ts-ignore
    const __VLS_482 = __VLS_asFunctionalComponent1(__VLS_481, new __VLS_481({}));
    const __VLS_483 = __VLS_482({}, ...__VLS_functionalComponentArgsRest(__VLS_482));
    const { default: __VLS_486 } = __VLS_484.slots;
    let __VLS_487;
    /** @ts-ignore @type { | typeof __VLS_components.PaginationPrevious} */
    PaginationPrevious;
    // @ts-ignore
    const __VLS_488 = __VLS_asFunctionalComponent1(__VLS_487, new __VLS_487({}));
    const __VLS_489 = __VLS_488({}, ...__VLS_functionalComponentArgsRest(__VLS_488));
    for (const [item] of __VLS_vFor((__VLS_ctx.paginationItems))) {
        let __VLS_492;
        /** @ts-ignore @type { | typeof __VLS_components.PaginationItem | typeof __VLS_components.PaginationItem} */
        PaginationItem;
        // @ts-ignore
        const __VLS_493 = __VLS_asFunctionalComponent1(__VLS_492, new __VLS_492({
            key: (item),
            value: (item),
            asChild: true,
        }));
        const __VLS_494 = __VLS_493({
            key: (item),
            value: (item),
            asChild: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_493));
        const { default: __VLS_497 } = __VLS_495.slots;
        let __VLS_498;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_499 = __VLS_asFunctionalComponent1(__VLS_498, new __VLS_498({
            variant: "ghost",
            size: "icon-xs",
            ...{ class: ({
                    'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground': item === __VLS_ctx.queryParams.pageNum,
                }) },
        }));
        const __VLS_500 = __VLS_499({
            variant: "ghost",
            size: "icon-xs",
            ...{ class: ({
                    'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground': item === __VLS_ctx.queryParams.pageNum,
                }) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_499));
        /** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-foreground']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:bg-primary/90']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:text-primary-foreground']} */ ;
        const { default: __VLS_503 } = __VLS_501.slots;
        (item);
        // @ts-ignore
        [queryParams, queryParams, queryParams, total, total, total, onPageChange, paginationItems,];
        var __VLS_501;
        // @ts-ignore
        [];
        var __VLS_495;
        // @ts-ignore
        [];
    }
    let __VLS_504;
    /** @ts-ignore @type { | typeof __VLS_components.PaginationNext} */
    PaginationNext;
    // @ts-ignore
    const __VLS_505 = __VLS_asFunctionalComponent1(__VLS_504, new __VLS_504({}));
    const __VLS_506 = __VLS_505({}, ...__VLS_functionalComponentArgsRest(__VLS_505));
    // @ts-ignore
    [];
    var __VLS_484;
    // @ts-ignore
    [];
    var __VLS_476;
    var __VLS_477;
}
// @ts-ignore
[];
var __VLS_197;
// @ts-ignore
[];
var __VLS_146;
let __VLS_509;
/** @ts-ignore @type { | typeof __VLS_components.Sheet | typeof __VLS_components.Sheet} */
Sheet;
// @ts-ignore
const __VLS_510 = __VLS_asFunctionalComponent1(__VLS_509, new __VLS_509({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogState.visible),
}));
const __VLS_511 = __VLS_510({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogState.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_510));
let __VLS_514;
const __VLS_515 = ({ 'update:open': {} },
    { 'onUpdate:open': (__VLS_ctx.onSheetOpenChange) });
const { default: __VLS_516 } = __VLS_512.slots;
let __VLS_517;
/** @ts-ignore @type { | typeof __VLS_components.SheetContent | typeof __VLS_components.SheetContent} */
SheetContent;
// @ts-ignore
const __VLS_518 = __VLS_asFunctionalComponent1(__VLS_517, new __VLS_517({
    side: "right",
    ...{ class: "sm:max-w-lg overflow-y-auto" },
}));
const __VLS_519 = __VLS_518({
    side: "right",
    ...{ class: "sm:max-w-lg overflow-y-auto" },
}, ...__VLS_functionalComponentArgsRest(__VLS_518));
/** @type {__VLS_StyleScopedClasses['sm:max-w-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
const { default: __VLS_522 } = __VLS_520.slots;
let __VLS_523;
/** @ts-ignore @type { | typeof __VLS_components.SheetHeader | typeof __VLS_components.SheetHeader} */
SheetHeader;
// @ts-ignore
const __VLS_524 = __VLS_asFunctionalComponent1(__VLS_523, new __VLS_523({}));
const __VLS_525 = __VLS_524({}, ...__VLS_functionalComponentArgsRest(__VLS_524));
const { default: __VLS_528 } = __VLS_526.slots;
let __VLS_529;
/** @ts-ignore @type { | typeof __VLS_components.SheetTitle | typeof __VLS_components.SheetTitle} */
SheetTitle;
// @ts-ignore
const __VLS_530 = __VLS_asFunctionalComponent1(__VLS_529, new __VLS_529({}));
const __VLS_531 = __VLS_530({}, ...__VLS_functionalComponentArgsRest(__VLS_530));
const { default: __VLS_534 } = __VLS_532.slots;
(__VLS_ctx.dialogState.title);
// @ts-ignore
[dialogState, dialogState, onSheetOpenChange,];
var __VLS_532;
// @ts-ignore
[];
var __VLS_526;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "px-4 py-2 space-y-4" },
});
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_535;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_536 = __VLS_asFunctionalComponent1(__VLS_535, new __VLS_535({}));
const __VLS_537 = __VLS_536({}, ...__VLS_functionalComponentArgsRest(__VLS_536));
const { default: __VLS_540 } = __VLS_538.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[];
var __VLS_538;
let __VLS_541;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_542 = __VLS_asFunctionalComponent1(__VLS_541, new __VLS_541({
    modelValue: (__VLS_ctx.formData.username),
    modelModifiers: { trim: true, },
    readonly: (!!__VLS_ctx.formData.id),
    placeholder: "请输入用户名",
}));
const __VLS_543 = __VLS_542({
    modelValue: (__VLS_ctx.formData.username),
    modelModifiers: { trim: true, },
    readonly: (!!__VLS_ctx.formData.id),
    placeholder: "请输入用户名",
}, ...__VLS_functionalComponentArgsRest(__VLS_542));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_546;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_547 = __VLS_asFunctionalComponent1(__VLS_546, new __VLS_546({}));
const __VLS_548 = __VLS_547({}, ...__VLS_functionalComponentArgsRest(__VLS_547));
const { default: __VLS_551 } = __VLS_549.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[formData, formData,];
var __VLS_549;
let __VLS_552;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_553 = __VLS_asFunctionalComponent1(__VLS_552, new __VLS_552({
    modelValue: (__VLS_ctx.formData.nickname),
    modelModifiers: { trim: true, },
    placeholder: "请输入用户昵称",
}));
const __VLS_554 = __VLS_553({
    modelValue: (__VLS_ctx.formData.nickname),
    modelModifiers: { trim: true, },
    placeholder: "请输入用户昵称",
}, ...__VLS_functionalComponentArgsRest(__VLS_553));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_557;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_558 = __VLS_asFunctionalComponent1(__VLS_557, new __VLS_557({}));
const __VLS_559 = __VLS_558({}, ...__VLS_functionalComponentArgsRest(__VLS_558));
const { default: __VLS_562 } = __VLS_560.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[formData,];
var __VLS_560;
let __VLS_563;
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_564 = __VLS_asFunctionalComponent1(__VLS_563, new __VLS_563({
    modelValue: (__VLS_ctx.formData.deptId),
}));
const __VLS_565 = __VLS_564({
    modelValue: (__VLS_ctx.formData.deptId),
}, ...__VLS_functionalComponentArgsRest(__VLS_564));
const { default: __VLS_568 } = __VLS_566.slots;
let __VLS_569;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_570 = __VLS_asFunctionalComponent1(__VLS_569, new __VLS_569({}));
const __VLS_571 = __VLS_570({}, ...__VLS_functionalComponentArgsRest(__VLS_570));
const { default: __VLS_574 } = __VLS_572.slots;
let __VLS_575;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_576 = __VLS_asFunctionalComponent1(__VLS_575, new __VLS_575({
    placeholder: "请选择所属部门",
}));
const __VLS_577 = __VLS_576({
    placeholder: "请选择所属部门",
}, ...__VLS_functionalComponentArgsRest(__VLS_576));
// @ts-ignore
[formData,];
var __VLS_572;
let __VLS_580;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_581 = __VLS_asFunctionalComponent1(__VLS_580, new __VLS_580({}));
const __VLS_582 = __VLS_581({}, ...__VLS_functionalComponentArgsRest(__VLS_581));
const { default: __VLS_585 } = __VLS_583.slots;
for (const [opt] of __VLS_vFor((__VLS_ctx.deptOptions))) {
    const __VLS_586 = DeptSelectOption;
    // @ts-ignore
    const __VLS_587 = __VLS_asFunctionalComponent1(__VLS_586, new __VLS_586({
        key: (opt.value),
        option: (opt),
    }));
    const __VLS_588 = __VLS_587({
        key: (opt.value),
        option: (opt),
    }, ...__VLS_functionalComponentArgsRest(__VLS_587));
    // @ts-ignore
    [deptOptions,];
}
// @ts-ignore
[];
var __VLS_583;
// @ts-ignore
[];
var __VLS_566;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_591;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_592 = __VLS_asFunctionalComponent1(__VLS_591, new __VLS_591({}));
const __VLS_593 = __VLS_592({}, ...__VLS_functionalComponentArgsRest(__VLS_592));
const { default: __VLS_596 } = __VLS_594.slots;
// @ts-ignore
[];
var __VLS_594;
let __VLS_597;
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_598 = __VLS_asFunctionalComponent1(__VLS_597, new __VLS_597({
    modelValue: (__VLS_ctx.formData.gender),
}));
const __VLS_599 = __VLS_598({
    modelValue: (__VLS_ctx.formData.gender),
}, ...__VLS_functionalComponentArgsRest(__VLS_598));
const { default: __VLS_602 } = __VLS_600.slots;
let __VLS_603;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_604 = __VLS_asFunctionalComponent1(__VLS_603, new __VLS_603({}));
const __VLS_605 = __VLS_604({}, ...__VLS_functionalComponentArgsRest(__VLS_604));
const { default: __VLS_608 } = __VLS_606.slots;
let __VLS_609;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_610 = __VLS_asFunctionalComponent1(__VLS_609, new __VLS_609({
    placeholder: "请选择",
}));
const __VLS_611 = __VLS_610({
    placeholder: "请选择",
}, ...__VLS_functionalComponentArgsRest(__VLS_610));
// @ts-ignore
[formData,];
var __VLS_606;
let __VLS_614;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_615 = __VLS_asFunctionalComponent1(__VLS_614, new __VLS_614({}));
const __VLS_616 = __VLS_615({}, ...__VLS_functionalComponentArgsRest(__VLS_615));
const { default: __VLS_619 } = __VLS_617.slots;
let __VLS_620;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_621 = __VLS_asFunctionalComponent1(__VLS_620, new __VLS_620({
    value: (1),
}));
const __VLS_622 = __VLS_621({
    value: (1),
}, ...__VLS_functionalComponentArgsRest(__VLS_621));
const { default: __VLS_625 } = __VLS_623.slots;
// @ts-ignore
[];
var __VLS_623;
let __VLS_626;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_627 = __VLS_asFunctionalComponent1(__VLS_626, new __VLS_626({
    value: (2),
}));
const __VLS_628 = __VLS_627({
    value: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_627));
const { default: __VLS_631 } = __VLS_629.slots;
// @ts-ignore
[];
var __VLS_629;
let __VLS_632;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_633 = __VLS_asFunctionalComponent1(__VLS_632, new __VLS_632({
    value: (0),
}));
const __VLS_634 = __VLS_633({
    value: (0),
}, ...__VLS_functionalComponentArgsRest(__VLS_633));
const { default: __VLS_637 } = __VLS_635.slots;
// @ts-ignore
[];
var __VLS_635;
// @ts-ignore
[];
var __VLS_617;
// @ts-ignore
[];
var __VLS_600;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_638;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_639 = __VLS_asFunctionalComponent1(__VLS_638, new __VLS_638({}));
const __VLS_640 = __VLS_639({}, ...__VLS_functionalComponentArgsRest(__VLS_639));
const { default: __VLS_643 } = __VLS_641.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[];
var __VLS_641;
let __VLS_644;
/** @ts-ignore @type { | typeof __VLS_components.Popover | typeof __VLS_components.Popover} */
Popover;
// @ts-ignore
const __VLS_645 = __VLS_asFunctionalComponent1(__VLS_644, new __VLS_644({}));
const __VLS_646 = __VLS_645({}, ...__VLS_functionalComponentArgsRest(__VLS_645));
const { default: __VLS_649 } = __VLS_647.slots;
let __VLS_650;
/** @ts-ignore @type { | typeof __VLS_components.PopoverTrigger | typeof __VLS_components.PopoverTrigger} */
PopoverTrigger;
// @ts-ignore
const __VLS_651 = __VLS_asFunctionalComponent1(__VLS_650, new __VLS_650({
    asChild: true,
}));
const __VLS_652 = __VLS_651({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_651));
const { default: __VLS_655 } = __VLS_653.slots;
let __VLS_656;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_657 = __VLS_asFunctionalComponent1(__VLS_656, new __VLS_656({
    variant: "outline",
    ...{ class: "w-full justify-start font-normal h-8 text-sm" },
}));
const __VLS_658 = __VLS_657({
    variant: "outline",
    ...{ class: "w-full justify-start font-normal h-8 text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_657));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_661 } = __VLS_659.slots;
if (__VLS_ctx.formData.roleIds?.length) {
    (__VLS_ctx.selectedRoleLabels);
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
}
// @ts-ignore
[formData, selectedRoleLabels,];
var __VLS_659;
// @ts-ignore
[];
var __VLS_653;
let __VLS_662;
/** @ts-ignore @type { | typeof __VLS_components.PopoverContent | typeof __VLS_components.PopoverContent} */
PopoverContent;
// @ts-ignore
const __VLS_663 = __VLS_asFunctionalComponent1(__VLS_662, new __VLS_662({
    ...{ class: "w-full p-2" },
    align: "start",
}));
const __VLS_664 = __VLS_663({
    ...{ class: "w-full p-2" },
    align: "start",
}, ...__VLS_functionalComponentArgsRest(__VLS_663));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
const { default: __VLS_667 } = __VLS_665.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
for (const [role] of __VLS_vFor((__VLS_ctx.roleOptions))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        key: (role.value),
        ...{ class: "flex items-center gap-2 px-2 py-1 rounded hover:bg-muted cursor-pointer text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-muted']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    let __VLS_668;
    /** @ts-ignore @type { | typeof __VLS_components.Checkbox} */
    Checkbox;
    // @ts-ignore
    const __VLS_669 = __VLS_asFunctionalComponent1(__VLS_668, new __VLS_668({
        ...{ 'onUpdate:checked': {} },
        checked: (__VLS_ctx.formData.roleIds?.includes(role.value)),
    }));
    const __VLS_670 = __VLS_669({
        ...{ 'onUpdate:checked': {} },
        checked: (__VLS_ctx.formData.roleIds?.includes(role.value)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_669));
    let __VLS_673;
    const __VLS_674 = ({ 'update:checked': {} },
        { 'onUpdate:checked': (...[$event]) => {
                __VLS_ctx.toggleRole(role.value);
                // @ts-ignore
                [formData, roleOptions, toggleRole,];
            } });
    var __VLS_671;
    var __VLS_672;
    (role.label);
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_665;
// @ts-ignore
[];
var __VLS_647;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_675;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_676 = __VLS_asFunctionalComponent1(__VLS_675, new __VLS_675({}));
const __VLS_677 = __VLS_676({}, ...__VLS_functionalComponentArgsRest(__VLS_676));
const { default: __VLS_680 } = __VLS_678.slots;
// @ts-ignore
[];
var __VLS_678;
let __VLS_681;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_682 = __VLS_asFunctionalComponent1(__VLS_681, new __VLS_681({
    modelValue: (__VLS_ctx.formData.mobile),
    modelModifiers: { trim: true, },
    placeholder: "请输入手机号码",
    maxlength: "11",
}));
const __VLS_683 = __VLS_682({
    modelValue: (__VLS_ctx.formData.mobile),
    modelModifiers: { trim: true, },
    placeholder: "请输入手机号码",
    maxlength: "11",
}, ...__VLS_functionalComponentArgsRest(__VLS_682));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_686;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_687 = __VLS_asFunctionalComponent1(__VLS_686, new __VLS_686({}));
const __VLS_688 = __VLS_687({}, ...__VLS_functionalComponentArgsRest(__VLS_687));
const { default: __VLS_691 } = __VLS_689.slots;
// @ts-ignore
[formData,];
var __VLS_689;
let __VLS_692;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_693 = __VLS_asFunctionalComponent1(__VLS_692, new __VLS_692({
    modelValue: (__VLS_ctx.formData.email),
    modelModifiers: { trim: true, },
    placeholder: "请输入邮箱",
    maxlength: "50",
}));
const __VLS_694 = __VLS_693({
    modelValue: (__VLS_ctx.formData.email),
    modelModifiers: { trim: true, },
    placeholder: "请输入邮箱",
    maxlength: "50",
}, ...__VLS_functionalComponentArgsRest(__VLS_693));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
let __VLS_697;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_698 = __VLS_asFunctionalComponent1(__VLS_697, new __VLS_697({}));
const __VLS_699 = __VLS_698({}, ...__VLS_functionalComponentArgsRest(__VLS_698));
const { default: __VLS_702 } = __VLS_700.slots;
// @ts-ignore
[formData,];
var __VLS_700;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
(__VLS_ctx.formData.status === __VLS_ctx.CommonStatus.ENABLED ? "正常" : "禁用");
let __VLS_703;
/** @ts-ignore @type { | typeof __VLS_components.Switch} */
Switch;
// @ts-ignore
const __VLS_704 = __VLS_asFunctionalComponent1(__VLS_703, new __VLS_703({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.formData.status === __VLS_ctx.CommonStatus.ENABLED),
}));
const __VLS_705 = __VLS_704({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.formData.status === __VLS_ctx.CommonStatus.ENABLED),
}, ...__VLS_functionalComponentArgsRest(__VLS_704));
let __VLS_708;
const __VLS_709 = ({ 'update:checked': {} },
    { 'onUpdate:checked': ((v) => (__VLS_ctx.formData.status = v ? __VLS_ctx.CommonStatus.ENABLED : __VLS_ctx.CommonStatus.DISABLED)) });
var __VLS_706;
var __VLS_707;
let __VLS_710;
/** @ts-ignore @type { | typeof __VLS_components.SheetFooter | typeof __VLS_components.SheetFooter} */
SheetFooter;
// @ts-ignore
const __VLS_711 = __VLS_asFunctionalComponent1(__VLS_710, new __VLS_710({
    ...{ class: "flex-row gap-2 justify-end px-4" },
}));
const __VLS_712 = __VLS_711({
    ...{ class: "flex-row gap-2 justify-end px-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_711));
/** @type {__VLS_StyleScopedClasses['flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
const { default: __VLS_715 } = __VLS_713.slots;
let __VLS_716;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_717 = __VLS_asFunctionalComponent1(__VLS_716, new __VLS_716({
    ...{ 'onClick': {} },
}));
const __VLS_718 = __VLS_717({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_717));
let __VLS_721;
const __VLS_722 = ({ click: {} },
    { onClick: (__VLS_ctx.handleSubmit) });
const { default: __VLS_723 } = __VLS_719.slots;
// @ts-ignore
[CommonStatus, CommonStatus, CommonStatus, CommonStatus, formData, formData, formData, handleSubmit,];
var __VLS_719;
var __VLS_720;
let __VLS_724;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_725 = __VLS_asFunctionalComponent1(__VLS_724, new __VLS_724({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_726 = __VLS_725({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_725));
let __VLS_729;
const __VLS_730 = ({ click: {} },
    { onClick: (__VLS_ctx.closeDialog) });
const { default: __VLS_731 } = __VLS_727.slots;
// @ts-ignore
[closeDialog,];
var __VLS_727;
var __VLS_728;
// @ts-ignore
[];
var __VLS_713;
// @ts-ignore
[];
var __VLS_520;
// @ts-ignore
[];
var __VLS_512;
var __VLS_513;
let __VLS_732;
/** @ts-ignore @type { | typeof __VLS_components.Dialog | typeof __VLS_components.Dialog} */
Dialog;
// @ts-ignore
const __VLS_733 = __VLS_asFunctionalComponent1(__VLS_732, new __VLS_732({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.resetPasswordState.visible),
}));
const __VLS_734 = __VLS_733({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.resetPasswordState.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_733));
let __VLS_737;
const __VLS_738 = ({ 'update:open': {} },
    { 'onUpdate:open': (...[$event]) => {
            __VLS_ctx.resetPasswordState.visible = $event;
            // @ts-ignore
            [resetPasswordState, resetPasswordState,];
        } });
const { default: __VLS_739 } = __VLS_735.slots;
let __VLS_740;
/** @ts-ignore @type { | typeof __VLS_components.DialogContent | typeof __VLS_components.DialogContent} */
DialogContent;
// @ts-ignore
const __VLS_741 = __VLS_asFunctionalComponent1(__VLS_740, new __VLS_740({
    ...{ class: "sm:max-w-md" },
}));
const __VLS_742 = __VLS_741({
    ...{ class: "sm:max-w-md" },
}, ...__VLS_functionalComponentArgsRest(__VLS_741));
/** @type {__VLS_StyleScopedClasses['sm:max-w-md']} */ ;
const { default: __VLS_745 } = __VLS_743.slots;
let __VLS_746;
/** @ts-ignore @type { | typeof __VLS_components.DialogHeader | typeof __VLS_components.DialogHeader} */
DialogHeader;
// @ts-ignore
const __VLS_747 = __VLS_asFunctionalComponent1(__VLS_746, new __VLS_746({}));
const __VLS_748 = __VLS_747({}, ...__VLS_functionalComponentArgsRest(__VLS_747));
const { default: __VLS_751 } = __VLS_749.slots;
let __VLS_752;
/** @ts-ignore @type { | typeof __VLS_components.DialogTitle | typeof __VLS_components.DialogTitle} */
DialogTitle;
// @ts-ignore
const __VLS_753 = __VLS_asFunctionalComponent1(__VLS_752, new __VLS_752({}));
const __VLS_754 = __VLS_753({}, ...__VLS_functionalComponentArgsRest(__VLS_753));
const { default: __VLS_757 } = __VLS_755.slots;
// @ts-ignore
[];
var __VLS_755;
let __VLS_758;
/** @ts-ignore @type { | typeof __VLS_components.DialogDescription | typeof __VLS_components.DialogDescription} */
DialogDescription;
// @ts-ignore
const __VLS_759 = __VLS_asFunctionalComponent1(__VLS_758, new __VLS_758({}));
const __VLS_760 = __VLS_759({}, ...__VLS_functionalComponentArgsRest(__VLS_759));
const { default: __VLS_763 } = __VLS_761.slots;
(__VLS_ctx.resetPasswordState.username);
// @ts-ignore
[resetPasswordState,];
var __VLS_761;
// @ts-ignore
[];
var __VLS_749;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "py-2" },
});
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
let __VLS_764;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_765 = __VLS_asFunctionalComponent1(__VLS_764, new __VLS_764({
    modelValue: (__VLS_ctx.resetPasswordState.password),
    type: "password",
    placeholder: "密码至少6位字符",
}));
const __VLS_766 = __VLS_765({
    modelValue: (__VLS_ctx.resetPasswordState.password),
    type: "password",
    placeholder: "密码至少6位字符",
}, ...__VLS_functionalComponentArgsRest(__VLS_765));
let __VLS_769;
/** @ts-ignore @type { | typeof __VLS_components.DialogFooter | typeof __VLS_components.DialogFooter} */
DialogFooter;
// @ts-ignore
const __VLS_770 = __VLS_asFunctionalComponent1(__VLS_769, new __VLS_769({}));
const __VLS_771 = __VLS_770({}, ...__VLS_functionalComponentArgsRest(__VLS_770));
const { default: __VLS_774 } = __VLS_772.slots;
let __VLS_775;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_776 = __VLS_asFunctionalComponent1(__VLS_775, new __VLS_775({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_777 = __VLS_776({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_776));
let __VLS_780;
const __VLS_781 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.resetPasswordState.visible = false;
            // @ts-ignore
            [resetPasswordState, resetPasswordState,];
        } });
const { default: __VLS_782 } = __VLS_778.slots;
// @ts-ignore
[];
var __VLS_778;
var __VLS_779;
let __VLS_783;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_784 = __VLS_asFunctionalComponent1(__VLS_783, new __VLS_783({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.resetPasswordState.password.length < 6),
}));
const __VLS_785 = __VLS_784({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.resetPasswordState.password.length < 6),
}, ...__VLS_functionalComponentArgsRest(__VLS_784));
let __VLS_788;
const __VLS_789 = ({ click: {} },
    { onClick: (__VLS_ctx.confirmResetPassword) });
const { default: __VLS_790 } = __VLS_786.slots;
// @ts-ignore
[resetPasswordState, confirmResetPassword,];
var __VLS_786;
var __VLS_787;
// @ts-ignore
[];
var __VLS_772;
// @ts-ignore
[];
var __VLS_743;
// @ts-ignore
[];
var __VLS_735;
var __VLS_736;
let __VLS_791;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialog | typeof __VLS_components.AlertDialog} */
AlertDialog;
// @ts-ignore
const __VLS_792 = __VLS_asFunctionalComponent1(__VLS_791, new __VLS_791({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteState.visible),
}));
const __VLS_793 = __VLS_792({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteState.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_792));
let __VLS_796;
const __VLS_797 = ({ 'update:open': {} },
    { 'onUpdate:open': (...[$event]) => {
            __VLS_ctx.deleteState.visible = $event;
            // @ts-ignore
            [deleteState, deleteState,];
        } });
const { default: __VLS_798 } = __VLS_794.slots;
let __VLS_799;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogContent | typeof __VLS_components.AlertDialogContent} */
AlertDialogContent;
// @ts-ignore
const __VLS_800 = __VLS_asFunctionalComponent1(__VLS_799, new __VLS_799({}));
const __VLS_801 = __VLS_800({}, ...__VLS_functionalComponentArgsRest(__VLS_800));
const { default: __VLS_804 } = __VLS_802.slots;
let __VLS_805;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogHeader | typeof __VLS_components.AlertDialogHeader} */
AlertDialogHeader;
// @ts-ignore
const __VLS_806 = __VLS_asFunctionalComponent1(__VLS_805, new __VLS_805({}));
const __VLS_807 = __VLS_806({}, ...__VLS_functionalComponentArgsRest(__VLS_806));
const { default: __VLS_810 } = __VLS_808.slots;
let __VLS_811;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogTitle | typeof __VLS_components.AlertDialogTitle} */
AlertDialogTitle;
// @ts-ignore
const __VLS_812 = __VLS_asFunctionalComponent1(__VLS_811, new __VLS_811({}));
const __VLS_813 = __VLS_812({}, ...__VLS_functionalComponentArgsRest(__VLS_812));
const { default: __VLS_816 } = __VLS_814.slots;
// @ts-ignore
[];
var __VLS_814;
let __VLS_817;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogDescription | typeof __VLS_components.AlertDialogDescription} */
AlertDialogDescription;
// @ts-ignore
const __VLS_818 = __VLS_asFunctionalComponent1(__VLS_817, new __VLS_817({}));
const __VLS_819 = __VLS_818({}, ...__VLS_functionalComponentArgsRest(__VLS_818));
const { default: __VLS_822 } = __VLS_820.slots;
// @ts-ignore
[];
var __VLS_820;
// @ts-ignore
[];
var __VLS_808;
let __VLS_823;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogFooter | typeof __VLS_components.AlertDialogFooter} */
AlertDialogFooter;
// @ts-ignore
const __VLS_824 = __VLS_asFunctionalComponent1(__VLS_823, new __VLS_823({}));
const __VLS_825 = __VLS_824({}, ...__VLS_functionalComponentArgsRest(__VLS_824));
const { default: __VLS_828 } = __VLS_826.slots;
let __VLS_829;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogCancel | typeof __VLS_components.AlertDialogCancel} */
AlertDialogCancel;
// @ts-ignore
const __VLS_830 = __VLS_asFunctionalComponent1(__VLS_829, new __VLS_829({}));
const __VLS_831 = __VLS_830({}, ...__VLS_functionalComponentArgsRest(__VLS_830));
const { default: __VLS_834 } = __VLS_832.slots;
// @ts-ignore
[];
var __VLS_832;
let __VLS_835;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogAction | typeof __VLS_components.AlertDialogAction} */
AlertDialogAction;
// @ts-ignore
const __VLS_836 = __VLS_asFunctionalComponent1(__VLS_835, new __VLS_835({
    ...{ 'onClick': {} },
}));
const __VLS_837 = __VLS_836({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_836));
let __VLS_840;
const __VLS_841 = ({ click: {} },
    { onClick: (__VLS_ctx.confirmDelete) });
const { default: __VLS_842 } = __VLS_838.slots;
// @ts-ignore
[confirmDelete,];
var __VLS_838;
var __VLS_839;
// @ts-ignore
[];
var __VLS_826;
// @ts-ignore
[];
var __VLS_802;
// @ts-ignore
[];
var __VLS_794;
var __VLS_795;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map