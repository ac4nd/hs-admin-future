import { ref, reactive, computed } from "vue";
import { toast } from "vue-sonner";
import { SearchIcon, RotateCcwIcon, PlusIcon, TrashIcon, DownloadIcon, PencilIcon, } from "@lucide/vue";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableEmpty, } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
const mockData = [
    { id: "1", username: "admin", nickname: "管理员", deptId: "1", deptName: "研发部门", status: 1 },
    { id: "2", username: "zhangsan", nickname: "张三", deptId: "2", deptName: "市场部门", status: 1 },
    { id: "3", username: "lisi", nickname: "李四", deptId: "3", deptName: "财务部门", status: 0 },
    { id: "4", username: "wangwu", nickname: "王五", deptId: "1", deptName: "研发部门", status: 1 },
    { id: "5", username: "zhaoliu", nickname: "赵六", deptId: "2", deptName: "市场部门", status: 1 },
];
const dataList = ref([...mockData]);
const queryParams = reactive({
    keywords: undefined,
    status: undefined,
});
const checkedIds = ref(new Set());
const filteredList = computed(() => {
    return dataList.value.filter((r) => {
        if (queryParams.keywords &&
            !r.username.includes(queryParams.keywords) &&
            !r.nickname.includes(queryParams.keywords))
            return false;
        if (queryParams.status !== undefined && r.status !== queryParams.status)
            return false;
        return true;
    });
});
const isAllSelected = computed(() => filteredList.value.length > 0 && filteredList.value.every((r) => checkedIds.value.has(r.id)));
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
function toggleAll(val) {
    const s = new Set();
    if (val === true)
        filteredList.value.forEach((r) => s.add(r.id));
    checkedIds.value = s;
}
function handleQuery() {
    /* 前端过滤，自动响应 */
}
function handleReset() {
    queryParams.keywords = undefined;
    queryParams.status = undefined;
}
function handleExport() {
    toast.success("导出成功（模拟）");
}
// 表单
const dialogOpen = ref(false);
const isEdit = ref(false);
const formData = reactive({
    username: "",
    nickname: "",
    deptId: "",
    status: 1,
});
function openAdd() {
    isEdit.value = false;
    Object.assign(formData, { id: undefined, username: "", nickname: "", deptId: "", status: 1 });
    dialogOpen.value = true;
}
function openEdit(row) {
    isEdit.value = true;
    Object.assign(formData, { ...row });
    dialogOpen.value = true;
}
function handleSubmit() {
    if (!formData.username || !formData.nickname) {
        toast.error("请填写必填项");
        return;
    }
    if (isEdit.value && formData.id) {
        const idx = dataList.value.findIndex((r) => r.id === formData.id);
        if (idx >= 0) {
            const deptMap = { "1": "研发部门", "2": "市场部门", "3": "财务部门" };
            dataList.value[idx] = { ...formData, deptName: deptMap[formData.deptId] ?? "" };
        }
        toast.success("修改成功");
    }
    else {
        dataList.value.push({
            id: String(Date.now()),
            username: formData.username,
            nickname: formData.nickname,
            deptId: formData.deptId,
            deptName: { "1": "研发部门", "2": "市场部门", "3": "财务部门" }[formData.deptId] ?? "",
            status: formData.status,
        });
        toast.success("新增成功");
    }
    dialogOpen.value = false;
}
function handleDelete(id) {
    dataList.value = dataList.value.filter((r) => r.id !== id);
    toast.success("删除成功");
}
function handleBatchDelete() {
    dataList.value = dataList.value.filter((r) => !checkedIds.value.has(r.id));
    checkedIds.value = new Set();
    toast.success("批量删除成功");
}
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
    placeholder: "用户名/昵称",
    ...{ class: "w-52 h-8 text-sm" },
}));
const __VLS_20 = __VLS_19({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.keywords),
    placeholder: "用户名/昵称",
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
    modelValue: (__VLS_ctx.queryParams.status),
}));
const __VLS_33 = __VLS_32({
    modelValue: (__VLS_ctx.queryParams.status),
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
const { default: __VLS_36 } = __VLS_34.slots;
let __VLS_37;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
    ...{ class: "w-28 h-8" },
}));
const __VLS_39 = __VLS_38({
    ...{ class: "w-28 h-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
/** @type {__VLS_StyleScopedClasses['w-28']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
const { default: __VLS_42 } = __VLS_40.slots;
let __VLS_43;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
    placeholder: "全部",
}));
const __VLS_45 = __VLS_44({
    placeholder: "全部",
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
// @ts-ignore
[queryParams,];
var __VLS_40;
let __VLS_48;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({}));
const __VLS_50 = __VLS_49({}, ...__VLS_functionalComponentArgsRest(__VLS_49));
const { default: __VLS_53 } = __VLS_51.slots;
let __VLS_54;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
    value: (1),
}));
const __VLS_56 = __VLS_55({
    value: (1),
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
const { default: __VLS_59 } = __VLS_57.slots;
// @ts-ignore
[];
var __VLS_57;
let __VLS_60;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
    value: (0),
}));
const __VLS_62 = __VLS_61({
    value: (0),
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
const { default: __VLS_65 } = __VLS_63.slots;
// @ts-ignore
[];
var __VLS_63;
// @ts-ignore
[];
var __VLS_51;
// @ts-ignore
[];
var __VLS_34;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
let __VLS_66;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
    ...{ 'onClick': {} },
    size: "sm",
}));
const __VLS_68 = __VLS_67({
    ...{ 'onClick': {} },
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
let __VLS_71;
const __VLS_72 = ({ click: {} },
    { onClick: (__VLS_ctx.handleQuery) });
const { default: __VLS_73 } = __VLS_69.slots;
let __VLS_74;
/** @ts-ignore @type { | typeof __VLS_components.SearchIcon} */
SearchIcon;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({
    ...{ class: "size-3.5" },
}));
const __VLS_76 = __VLS_75({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_75));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[handleQuery,];
var __VLS_69;
var __VLS_70;
let __VLS_79;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}));
const __VLS_81 = __VLS_80({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
let __VLS_84;
const __VLS_85 = ({ click: {} },
    { onClick: (__VLS_ctx.handleReset) });
const { default: __VLS_86 } = __VLS_82.slots;
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.RotateCcwIcon} */
RotateCcwIcon;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
    ...{ class: "size-3.5" },
}));
const __VLS_89 = __VLS_88({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[handleReset,];
var __VLS_82;
var __VLS_83;
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
let __VLS_92;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({}));
const __VLS_94 = __VLS_93({}, ...__VLS_functionalComponentArgsRest(__VLS_93));
const { default: __VLS_97 } = __VLS_95.slots;
let __VLS_98;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({
    ...{ class: "pb-3" },
}));
const __VLS_100 = __VLS_99({
    ...{ class: "pb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
/** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
const { default: __VLS_103 } = __VLS_101.slots;
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
let __VLS_104;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent1(__VLS_104, new __VLS_104({
    ...{ 'onClick': {} },
    size: "sm",
}));
const __VLS_106 = __VLS_105({
    ...{ 'onClick': {} },
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_105));
let __VLS_109;
const __VLS_110 = ({ click: {} },
    { onClick: (__VLS_ctx.openAdd) });
const { default: __VLS_111 } = __VLS_107.slots;
let __VLS_112;
/** @ts-ignore @type { | typeof __VLS_components.PlusIcon} */
PlusIcon;
// @ts-ignore
const __VLS_113 = __VLS_asFunctionalComponent1(__VLS_112, new __VLS_112({
    ...{ class: "size-3.5" },
}));
const __VLS_114 = __VLS_113({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_113));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[openAdd,];
var __VLS_107;
var __VLS_108;
let __VLS_117;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({
    ...{ 'onClick': {} },
    variant: "destructive",
    size: "sm",
    disabled: (__VLS_ctx.checkedIds.size === 0),
}));
const __VLS_119 = __VLS_118({
    ...{ 'onClick': {} },
    variant: "destructive",
    size: "sm",
    disabled: (__VLS_ctx.checkedIds.size === 0),
}, ...__VLS_functionalComponentArgsRest(__VLS_118));
let __VLS_122;
const __VLS_123 = ({ click: {} },
    { onClick: (__VLS_ctx.handleBatchDelete) });
const { default: __VLS_124 } = __VLS_120.slots;
let __VLS_125;
/** @ts-ignore @type { | typeof __VLS_components.TrashIcon} */
TrashIcon;
// @ts-ignore
const __VLS_126 = __VLS_asFunctionalComponent1(__VLS_125, new __VLS_125({
    ...{ class: "size-3.5" },
}));
const __VLS_127 = __VLS_126({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_126));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[checkedIds, handleBatchDelete,];
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
    { onClick: (__VLS_ctx.handleExport) });
const { default: __VLS_137 } = __VLS_133.slots;
let __VLS_138;
/** @ts-ignore @type { | typeof __VLS_components.DownloadIcon} */
DownloadIcon;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent1(__VLS_138, new __VLS_138({
    ...{ class: "size-3.5" },
}));
const __VLS_140 = __VLS_139({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_139));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[handleExport,];
var __VLS_133;
var __VLS_134;
// @ts-ignore
[];
var __VLS_101;
let __VLS_143;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_144 = __VLS_asFunctionalComponent1(__VLS_143, new __VLS_143({}));
const __VLS_145 = __VLS_144({}, ...__VLS_functionalComponentArgsRest(__VLS_144));
const { default: __VLS_148 } = __VLS_146.slots;
let __VLS_149;
/** @ts-ignore @type { | typeof __VLS_components.Table | typeof __VLS_components.Table} */
Table;
// @ts-ignore
const __VLS_150 = __VLS_asFunctionalComponent1(__VLS_149, new __VLS_149({}));
const __VLS_151 = __VLS_150({}, ...__VLS_functionalComponentArgsRest(__VLS_150));
const { default: __VLS_154 } = __VLS_152.slots;
let __VLS_155;
/** @ts-ignore @type { | typeof __VLS_components.TableHeader | typeof __VLS_components.TableHeader} */
TableHeader;
// @ts-ignore
const __VLS_156 = __VLS_asFunctionalComponent1(__VLS_155, new __VLS_155({}));
const __VLS_157 = __VLS_156({}, ...__VLS_functionalComponentArgsRest(__VLS_156));
const { default: __VLS_160 } = __VLS_158.slots;
let __VLS_161;
/** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
TableRow;
// @ts-ignore
const __VLS_162 = __VLS_asFunctionalComponent1(__VLS_161, new __VLS_161({}));
const __VLS_163 = __VLS_162({}, ...__VLS_functionalComponentArgsRest(__VLS_162));
const { default: __VLS_166 } = __VLS_164.slots;
let __VLS_167;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_168 = __VLS_asFunctionalComponent1(__VLS_167, new __VLS_167({
    ...{ class: "w-10" },
}));
const __VLS_169 = __VLS_168({
    ...{ class: "w-10" },
}, ...__VLS_functionalComponentArgsRest(__VLS_168));
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
const { default: __VLS_172 } = __VLS_170.slots;
let __VLS_173;
/** @ts-ignore @type { | typeof __VLS_components.Checkbox} */
Checkbox;
// @ts-ignore
const __VLS_174 = __VLS_asFunctionalComponent1(__VLS_173, new __VLS_173({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.isAllSelected),
}));
const __VLS_175 = __VLS_174({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.isAllSelected),
}, ...__VLS_functionalComponentArgsRest(__VLS_174));
let __VLS_178;
const __VLS_179 = ({ 'update:checked': {} },
    { 'onUpdate:checked': (__VLS_ctx.toggleAll) });
var __VLS_176;
var __VLS_177;
// @ts-ignore
[isAllSelected, toggleAll,];
var __VLS_170;
let __VLS_180;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_181 = __VLS_asFunctionalComponent1(__VLS_180, new __VLS_180({}));
const __VLS_182 = __VLS_181({}, ...__VLS_functionalComponentArgsRest(__VLS_181));
const { default: __VLS_185 } = __VLS_183.slots;
// @ts-ignore
[];
var __VLS_183;
let __VLS_186;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_187 = __VLS_asFunctionalComponent1(__VLS_186, new __VLS_186({}));
const __VLS_188 = __VLS_187({}, ...__VLS_functionalComponentArgsRest(__VLS_187));
const { default: __VLS_191 } = __VLS_189.slots;
// @ts-ignore
[];
var __VLS_189;
let __VLS_192;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_193 = __VLS_asFunctionalComponent1(__VLS_192, new __VLS_192({}));
const __VLS_194 = __VLS_193({}, ...__VLS_functionalComponentArgsRest(__VLS_193));
const { default: __VLS_197 } = __VLS_195.slots;
// @ts-ignore
[];
var __VLS_195;
let __VLS_198;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_199 = __VLS_asFunctionalComponent1(__VLS_198, new __VLS_198({
    ...{ class: "w-20" },
}));
const __VLS_200 = __VLS_199({
    ...{ class: "w-20" },
}, ...__VLS_functionalComponentArgsRest(__VLS_199));
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
const { default: __VLS_203 } = __VLS_201.slots;
// @ts-ignore
[];
var __VLS_201;
let __VLS_204;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_205 = __VLS_asFunctionalComponent1(__VLS_204, new __VLS_204({
    ...{ class: "w-36 text-right" },
}));
const __VLS_206 = __VLS_205({
    ...{ class: "w-36 text-right" },
}, ...__VLS_functionalComponentArgsRest(__VLS_205));
/** @type {__VLS_StyleScopedClasses['w-36']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
const { default: __VLS_209 } = __VLS_207.slots;
// @ts-ignore
[];
var __VLS_207;
// @ts-ignore
[];
var __VLS_164;
// @ts-ignore
[];
var __VLS_158;
let __VLS_210;
/** @ts-ignore @type { | typeof __VLS_components.TableBody | typeof __VLS_components.TableBody} */
TableBody;
// @ts-ignore
const __VLS_211 = __VLS_asFunctionalComponent1(__VLS_210, new __VLS_210({}));
const __VLS_212 = __VLS_211({}, ...__VLS_functionalComponentArgsRest(__VLS_211));
const { default: __VLS_215 } = __VLS_213.slots;
if (__VLS_ctx.filteredList.length === 0) {
    let __VLS_216;
    /** @ts-ignore @type { | typeof __VLS_components.TableEmpty | typeof __VLS_components.TableEmpty} */
    TableEmpty;
    // @ts-ignore
    const __VLS_217 = __VLS_asFunctionalComponent1(__VLS_216, new __VLS_216({
        colspan: (6),
    }));
    const __VLS_218 = __VLS_217({
        colspan: (6),
    }, ...__VLS_functionalComponentArgsRest(__VLS_217));
    const { default: __VLS_221 } = __VLS_219.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-muted-foreground text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    // @ts-ignore
    [filteredList,];
    var __VLS_219;
}
for (const [row] of __VLS_vFor((__VLS_ctx.filteredList))) {
    let __VLS_222;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_223 = __VLS_asFunctionalComponent1(__VLS_222, new __VLS_222({
        key: (row.id),
        dataState: (__VLS_ctx.checkedIds.has(row.id) ? 'selected' : undefined),
    }));
    const __VLS_224 = __VLS_223({
        key: (row.id),
        dataState: (__VLS_ctx.checkedIds.has(row.id) ? 'selected' : undefined),
    }, ...__VLS_functionalComponentArgsRest(__VLS_223));
    const { default: __VLS_227 } = __VLS_225.slots;
    let __VLS_228;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_229 = __VLS_asFunctionalComponent1(__VLS_228, new __VLS_228({}));
    const __VLS_230 = __VLS_229({}, ...__VLS_functionalComponentArgsRest(__VLS_229));
    const { default: __VLS_233 } = __VLS_231.slots;
    let __VLS_234;
    /** @ts-ignore @type { | typeof __VLS_components.Checkbox} */
    Checkbox;
    // @ts-ignore
    const __VLS_235 = __VLS_asFunctionalComponent1(__VLS_234, new __VLS_234({
        ...{ 'onUpdate:checked': {} },
        checked: (__VLS_ctx.checkedIds.has(row.id)),
    }));
    const __VLS_236 = __VLS_235({
        ...{ 'onUpdate:checked': {} },
        checked: (__VLS_ctx.checkedIds.has(row.id)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_235));
    let __VLS_239;
    const __VLS_240 = ({ 'update:checked': {} },
        { 'onUpdate:checked': (...[$event]) => {
                __VLS_ctx.toggleRow(row);
                // @ts-ignore
                [checkedIds, checkedIds, filteredList, toggleRow,];
            } });
    var __VLS_237;
    var __VLS_238;
    // @ts-ignore
    [];
    var __VLS_231;
    let __VLS_241;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_242 = __VLS_asFunctionalComponent1(__VLS_241, new __VLS_241({
        ...{ class: "font-medium" },
    }));
    const __VLS_243 = __VLS_242({
        ...{ class: "font-medium" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_242));
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    const { default: __VLS_246 } = __VLS_244.slots;
    (row.username);
    // @ts-ignore
    [];
    var __VLS_244;
    let __VLS_247;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_248 = __VLS_asFunctionalComponent1(__VLS_247, new __VLS_247({}));
    const __VLS_249 = __VLS_248({}, ...__VLS_functionalComponentArgsRest(__VLS_248));
    const { default: __VLS_252 } = __VLS_250.slots;
    (row.nickname);
    // @ts-ignore
    [];
    var __VLS_250;
    let __VLS_253;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_254 = __VLS_asFunctionalComponent1(__VLS_253, new __VLS_253({}));
    const __VLS_255 = __VLS_254({}, ...__VLS_functionalComponentArgsRest(__VLS_254));
    const { default: __VLS_258 } = __VLS_256.slots;
    (row.deptName);
    // @ts-ignore
    [];
    var __VLS_256;
    let __VLS_259;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_260 = __VLS_asFunctionalComponent1(__VLS_259, new __VLS_259({}));
    const __VLS_261 = __VLS_260({}, ...__VLS_functionalComponentArgsRest(__VLS_260));
    const { default: __VLS_264 } = __VLS_262.slots;
    let __VLS_265;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_266 = __VLS_asFunctionalComponent1(__VLS_265, new __VLS_265({
        variant: (row.status === 1 ? 'default' : 'secondary'),
        ...{ class: "text-[10px]" },
    }));
    const __VLS_267 = __VLS_266({
        variant: (row.status === 1 ? 'default' : 'secondary'),
        ...{ class: "text-[10px]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_266));
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    const { default: __VLS_270 } = __VLS_268.slots;
    (row.status === 1 ? "启用" : "禁用");
    // @ts-ignore
    [];
    var __VLS_268;
    // @ts-ignore
    [];
    var __VLS_262;
    let __VLS_271;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_272 = __VLS_asFunctionalComponent1(__VLS_271, new __VLS_271({
        ...{ class: "text-right" },
    }));
    const __VLS_273 = __VLS_272({
        ...{ class: "text-right" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_272));
    /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
    const { default: __VLS_276 } = __VLS_274.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex justify-end gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    let __VLS_277;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_278 = __VLS_asFunctionalComponent1(__VLS_277, new __VLS_277({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
    }));
    const __VLS_279 = __VLS_278({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
    }, ...__VLS_functionalComponentArgsRest(__VLS_278));
    let __VLS_282;
    const __VLS_283 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.openEdit(row);
                // @ts-ignore
                [openEdit,];
            } });
    const { default: __VLS_284 } = __VLS_280.slots;
    let __VLS_285;
    /** @ts-ignore @type { | typeof __VLS_components.PencilIcon} */
    PencilIcon;
    // @ts-ignore
    const __VLS_286 = __VLS_asFunctionalComponent1(__VLS_285, new __VLS_285({
        ...{ class: "size-3.5 mr-1" },
    }));
    const __VLS_287 = __VLS_286({
        ...{ class: "size-3.5 mr-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_286));
    /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
    // @ts-ignore
    [];
    var __VLS_280;
    var __VLS_281;
    let __VLS_290;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_291 = __VLS_asFunctionalComponent1(__VLS_290, new __VLS_290({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "text-destructive" },
    }));
    const __VLS_292 = __VLS_291({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "text-destructive" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_291));
    let __VLS_295;
    const __VLS_296 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleDelete(row.id);
                // @ts-ignore
                [handleDelete,];
            } });
    /** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
    const { default: __VLS_297 } = __VLS_293.slots;
    let __VLS_298;
    /** @ts-ignore @type { | typeof __VLS_components.TrashIcon} */
    TrashIcon;
    // @ts-ignore
    const __VLS_299 = __VLS_asFunctionalComponent1(__VLS_298, new __VLS_298({
        ...{ class: "size-3.5 mr-1" },
    }));
    const __VLS_300 = __VLS_299({
        ...{ class: "size-3.5 mr-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_299));
    /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
    // @ts-ignore
    [];
    var __VLS_293;
    var __VLS_294;
    // @ts-ignore
    [];
    var __VLS_274;
    // @ts-ignore
    [];
    var __VLS_225;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_213;
// @ts-ignore
[];
var __VLS_152;
// @ts-ignore
[];
var __VLS_146;
// @ts-ignore
[];
var __VLS_95;
let __VLS_303;
/** @ts-ignore @type { | typeof __VLS_components.Dialog | typeof __VLS_components.Dialog} */
Dialog;
// @ts-ignore
const __VLS_304 = __VLS_asFunctionalComponent1(__VLS_303, new __VLS_303({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogOpen),
}));
const __VLS_305 = __VLS_304({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_304));
let __VLS_308;
const __VLS_309 = ({ 'update:open': {} },
    { 'onUpdate:open': (...[$event]) => {
            __VLS_ctx.dialogOpen = $event;
            // @ts-ignore
            [dialogOpen, dialogOpen,];
        } });
const { default: __VLS_310 } = __VLS_306.slots;
let __VLS_311;
/** @ts-ignore @type { | typeof __VLS_components.DialogContent | typeof __VLS_components.DialogContent} */
DialogContent;
// @ts-ignore
const __VLS_312 = __VLS_asFunctionalComponent1(__VLS_311, new __VLS_311({
    ...{ class: "sm:max-w-md" },
}));
const __VLS_313 = __VLS_312({
    ...{ class: "sm:max-w-md" },
}, ...__VLS_functionalComponentArgsRest(__VLS_312));
/** @type {__VLS_StyleScopedClasses['sm:max-w-md']} */ ;
const { default: __VLS_316 } = __VLS_314.slots;
let __VLS_317;
/** @ts-ignore @type { | typeof __VLS_components.DialogHeader | typeof __VLS_components.DialogHeader} */
DialogHeader;
// @ts-ignore
const __VLS_318 = __VLS_asFunctionalComponent1(__VLS_317, new __VLS_317({}));
const __VLS_319 = __VLS_318({}, ...__VLS_functionalComponentArgsRest(__VLS_318));
const { default: __VLS_322 } = __VLS_320.slots;
let __VLS_323;
/** @ts-ignore @type { | typeof __VLS_components.DialogTitle | typeof __VLS_components.DialogTitle} */
DialogTitle;
// @ts-ignore
const __VLS_324 = __VLS_asFunctionalComponent1(__VLS_323, new __VLS_323({}));
const __VLS_325 = __VLS_324({}, ...__VLS_functionalComponentArgsRest(__VLS_324));
const { default: __VLS_328 } = __VLS_326.slots;
(__VLS_ctx.isEdit ? "编辑用户" : "新增用户");
// @ts-ignore
[isEdit,];
var __VLS_326;
// @ts-ignore
[];
var __VLS_320;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-4 py-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_329;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_330 = __VLS_asFunctionalComponent1(__VLS_329, new __VLS_329({}));
const __VLS_331 = __VLS_330({}, ...__VLS_functionalComponentArgsRest(__VLS_330));
const { default: __VLS_334 } = __VLS_332.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[];
var __VLS_332;
let __VLS_335;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_336 = __VLS_asFunctionalComponent1(__VLS_335, new __VLS_335({
    modelValue: (__VLS_ctx.formData.username),
    placeholder: "请输入用户名",
    readonly: (__VLS_ctx.isEdit),
}));
const __VLS_337 = __VLS_336({
    modelValue: (__VLS_ctx.formData.username),
    placeholder: "请输入用户名",
    readonly: (__VLS_ctx.isEdit),
}, ...__VLS_functionalComponentArgsRest(__VLS_336));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_340;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_341 = __VLS_asFunctionalComponent1(__VLS_340, new __VLS_340({}));
const __VLS_342 = __VLS_341({}, ...__VLS_functionalComponentArgsRest(__VLS_341));
const { default: __VLS_345 } = __VLS_343.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[isEdit, formData,];
var __VLS_343;
let __VLS_346;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_347 = __VLS_asFunctionalComponent1(__VLS_346, new __VLS_346({
    modelValue: (__VLS_ctx.formData.nickname),
    placeholder: "请输入昵称",
}));
const __VLS_348 = __VLS_347({
    modelValue: (__VLS_ctx.formData.nickname),
    placeholder: "请输入昵称",
}, ...__VLS_functionalComponentArgsRest(__VLS_347));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_351;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_352 = __VLS_asFunctionalComponent1(__VLS_351, new __VLS_351({}));
const __VLS_353 = __VLS_352({}, ...__VLS_functionalComponentArgsRest(__VLS_352));
const { default: __VLS_356 } = __VLS_354.slots;
// @ts-ignore
[formData,];
var __VLS_354;
let __VLS_357;
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_358 = __VLS_asFunctionalComponent1(__VLS_357, new __VLS_357({
    modelValue: (__VLS_ctx.formData.deptId),
}));
const __VLS_359 = __VLS_358({
    modelValue: (__VLS_ctx.formData.deptId),
}, ...__VLS_functionalComponentArgsRest(__VLS_358));
const { default: __VLS_362 } = __VLS_360.slots;
let __VLS_363;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_364 = __VLS_asFunctionalComponent1(__VLS_363, new __VLS_363({}));
const __VLS_365 = __VLS_364({}, ...__VLS_functionalComponentArgsRest(__VLS_364));
const { default: __VLS_368 } = __VLS_366.slots;
let __VLS_369;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_370 = __VLS_asFunctionalComponent1(__VLS_369, new __VLS_369({
    placeholder: "请选择",
}));
const __VLS_371 = __VLS_370({
    placeholder: "请选择",
}, ...__VLS_functionalComponentArgsRest(__VLS_370));
// @ts-ignore
[formData,];
var __VLS_366;
let __VLS_374;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_375 = __VLS_asFunctionalComponent1(__VLS_374, new __VLS_374({}));
const __VLS_376 = __VLS_375({}, ...__VLS_functionalComponentArgsRest(__VLS_375));
const { default: __VLS_379 } = __VLS_377.slots;
let __VLS_380;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_381 = __VLS_asFunctionalComponent1(__VLS_380, new __VLS_380({
    value: "1",
}));
const __VLS_382 = __VLS_381({
    value: "1",
}, ...__VLS_functionalComponentArgsRest(__VLS_381));
const { default: __VLS_385 } = __VLS_383.slots;
// @ts-ignore
[];
var __VLS_383;
let __VLS_386;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_387 = __VLS_asFunctionalComponent1(__VLS_386, new __VLS_386({
    value: "2",
}));
const __VLS_388 = __VLS_387({
    value: "2",
}, ...__VLS_functionalComponentArgsRest(__VLS_387));
const { default: __VLS_391 } = __VLS_389.slots;
// @ts-ignore
[];
var __VLS_389;
let __VLS_392;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_393 = __VLS_asFunctionalComponent1(__VLS_392, new __VLS_392({
    value: "3",
}));
const __VLS_394 = __VLS_393({
    value: "3",
}, ...__VLS_functionalComponentArgsRest(__VLS_393));
const { default: __VLS_397 } = __VLS_395.slots;
// @ts-ignore
[];
var __VLS_395;
// @ts-ignore
[];
var __VLS_377;
// @ts-ignore
[];
var __VLS_360;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
let __VLS_398;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_399 = __VLS_asFunctionalComponent1(__VLS_398, new __VLS_398({}));
const __VLS_400 = __VLS_399({}, ...__VLS_functionalComponentArgsRest(__VLS_399));
const { default: __VLS_403 } = __VLS_401.slots;
// @ts-ignore
[];
var __VLS_401;
let __VLS_404;
/** @ts-ignore @type { | typeof __VLS_components.Switch} */
Switch;
// @ts-ignore
const __VLS_405 = __VLS_asFunctionalComponent1(__VLS_404, new __VLS_404({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.formData.status === 1),
}));
const __VLS_406 = __VLS_405({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.formData.status === 1),
}, ...__VLS_functionalComponentArgsRest(__VLS_405));
let __VLS_409;
const __VLS_410 = ({ 'update:checked': {} },
    { 'onUpdate:checked': ((v) => (__VLS_ctx.formData.status = v ? 1 : 0)) });
var __VLS_407;
var __VLS_408;
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
    { onClick: (...[$event]) => {
            __VLS_ctx.dialogOpen = false;
            // @ts-ignore
            [dialogOpen, formData, formData,];
        } });
const { default: __VLS_424 } = __VLS_420.slots;
// @ts-ignore
[];
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
// @ts-ignore
[handleSubmit,];
var __VLS_428;
var __VLS_429;
// @ts-ignore
[];
var __VLS_414;
// @ts-ignore
[];
var __VLS_314;
// @ts-ignore
[];
var __VLS_306;
var __VLS_307;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map