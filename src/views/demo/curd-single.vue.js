import { ref, reactive, computed } from "vue";
import { toast } from "vue-sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
const mockData = [
    {
        id: "1",
        name: "张三",
        age: 28,
        gender: 1,
        phone: "18112345678",
        address: "北京市朝阳区建国路88号",
        status: 1,
    },
    {
        id: "2",
        name: "李四",
        age: 35,
        gender: 1,
        phone: "13987654321",
        address: "上海市浦东新区陆家嘴环路1000号",
        status: 1,
    },
    {
        id: "3",
        name: "王五",
        age: 22,
        gender: 2,
        phone: "15011223344",
        address: "广州市天河区珠江新城花城大道",
        status: 0,
    },
    {
        id: "4",
        name: "赵六",
        age: 30,
        gender: 1,
        phone: "13799887766",
        address: "深圳市南山区科技园南区",
        status: 1,
    },
    {
        id: "5",
        name: "孙七",
        age: 26,
        gender: 2,
        phone: "18666778899",
        address: "杭州市西湖区文三路138号",
        status: 1,
    },
    {
        id: "6",
        name: "周八",
        age: 40,
        gender: 1,
        phone: "13555667788",
        address: "成都市武侯区天府大道中段688号",
        status: 0,
    },
    {
        id: "7",
        name: "吴九",
        age: 33,
        gender: 2,
        phone: "18900112233",
        address: "武汉市洪山区光谷大道77号",
        status: 1,
    },
    {
        id: "8",
        name: "郑十",
        age: 29,
        gender: 1,
        phone: "13122334455",
        address: "南京市鼓楼区汉中路100号",
        status: 1,
    },
];
const dataList = ref([...mockData]);
const queryParams = reactive({ keywords: "", status: "all" });
const checkedIds = ref(new Set());
const deleteDialogOpen = ref(false);
const pendingDeleteIds = ref([]);
const currentPage = ref(1);
const pageSize = 5;
const filteredList = computed(() => {
    return dataList.value.filter((r) => {
        if (queryParams.keywords) {
            const kw = queryParams.keywords.toLowerCase();
            if (!r.name.toLowerCase().includes(kw) && !r.address.toLowerCase().includes(kw))
                return false;
        }
        if (queryParams.status !== "all") {
            if (r.status !== Number(queryParams.status))
                return false;
        }
        return true;
    });
});
const totalPages = computed(() => Math.max(1, Math.ceil(filteredList.value.length / pageSize)));
const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return filteredList.value.slice(start, start + pageSize);
});
const displayedPages = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const pages = [];
    for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++)
        pages.push(i);
    return pages;
});
const isAllSelected = computed(() => paginatedList.value.length > 0 && paginatedList.value.every((r) => checkedIds.value.has(r.id)));
function toggleRow(row) {
    const s = new Set(checkedIds.value);
    s.has(row.id) ? s.delete(row.id) : s.add(row.id);
    checkedIds.value = s;
}
function toggleAll(val) {
    const s = new Set();
    if (val === true)
        paginatedList.value.forEach((r) => s.add(r.id));
    checkedIds.value = s;
}
function handleQuery() {
    currentPage.value = 1;
}
function handleReset() {
    queryParams.keywords = "";
    queryParams.status = "all";
    currentPage.value = 1;
}
const dialogOpen = ref(false);
const isEdit = ref(false);
const formData = reactive({
    name: "",
    age: 25,
    gender: 1,
    phone: "",
    address: "",
    status: 1,
});
function openAdd() {
    isEdit.value = false;
    Object.assign(formData, {
        id: undefined,
        name: "",
        age: 25,
        gender: 1,
        phone: "",
        address: "",
        status: 1,
    });
    dialogOpen.value = true;
}
function openEdit(row) {
    isEdit.value = true;
    Object.assign(formData, { ...row });
    dialogOpen.value = true;
}
function handleSubmit() {
    if (!formData.name) {
        toast.error("请输入姓名");
        return;
    }
    if (isEdit.value && formData.id) {
        const idx = dataList.value.findIndex((r) => r.id === formData.id);
        if (idx >= 0)
            dataList.value[idx] = { ...formData };
        toast.success("修改成功");
    }
    else {
        dataList.value.push({ ...formData, id: String(Date.now()) });
        toast.success("新增成功");
    }
    dialogOpen.value = false;
}
function handleDelete(id) {
    pendingDeleteIds.value = [id];
    deleteDialogOpen.value = true;
}
function handleBatchDelete() {
    pendingDeleteIds.value = [...checkedIds.value];
    deleteDialogOpen.value = true;
}
function confirmDelete() {
    const ids = new Set(pendingDeleteIds.value);
    dataList.value = dataList.value.filter((r) => !ids.has(r.id));
    checkedIds.value = new Set();
    deleteDialogOpen.value = false;
    toast.success("删除成功");
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
    placeholder: "姓名/地址",
    ...{ class: "w-52 h-8 text-sm" },
}));
const __VLS_20 = __VLS_19({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.keywords),
    placeholder: "姓名/地址",
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
    value: "all",
}));
const __VLS_56 = __VLS_55({
    value: "all",
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
    value: "1",
}));
const __VLS_62 = __VLS_61({
    value: "1",
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
const { default: __VLS_65 } = __VLS_63.slots;
// @ts-ignore
[];
var __VLS_63;
let __VLS_66;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
    value: "0",
}));
const __VLS_68 = __VLS_67({
    value: "0",
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
const { default: __VLS_71 } = __VLS_69.slots;
// @ts-ignore
[];
var __VLS_69;
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
let __VLS_72;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
    ...{ 'onClick': {} },
    size: "sm",
}));
const __VLS_74 = __VLS_73({
    ...{ 'onClick': {} },
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_77;
const __VLS_78 = ({ click: {} },
    { onClick: (__VLS_ctx.handleQuery) });
const { default: __VLS_79 } = __VLS_75.slots;
// @ts-ignore
[handleQuery,];
var __VLS_75;
var __VLS_76;
let __VLS_80;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent1(__VLS_80, new __VLS_80({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}));
const __VLS_82 = __VLS_81({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
let __VLS_85;
const __VLS_86 = ({ click: {} },
    { onClick: (__VLS_ctx.handleReset) });
const { default: __VLS_87 } = __VLS_83.slots;
// @ts-ignore
[handleReset,];
var __VLS_83;
var __VLS_84;
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
let __VLS_88;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent1(__VLS_88, new __VLS_88({}));
const __VLS_90 = __VLS_89({}, ...__VLS_functionalComponentArgsRest(__VLS_89));
const { default: __VLS_93 } = __VLS_91.slots;
let __VLS_94;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent1(__VLS_94, new __VLS_94({
    ...{ class: "pb-3" },
}));
const __VLS_96 = __VLS_95({
    ...{ class: "pb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
/** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
const { default: __VLS_99 } = __VLS_97.slots;
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
let __VLS_100;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({
    ...{ 'onClick': {} },
    size: "sm",
}));
const __VLS_102 = __VLS_101({
    ...{ 'onClick': {} },
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_101));
let __VLS_105;
const __VLS_106 = ({ click: {} },
    { onClick: (__VLS_ctx.openAdd) });
const { default: __VLS_107 } = __VLS_103.slots;
// @ts-ignore
[openAdd,];
var __VLS_103;
var __VLS_104;
let __VLS_108;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_109 = __VLS_asFunctionalComponent1(__VLS_108, new __VLS_108({
    ...{ 'onClick': {} },
    variant: "destructive",
    size: "sm",
    disabled: (__VLS_ctx.checkedIds.size === 0),
}));
const __VLS_110 = __VLS_109({
    ...{ 'onClick': {} },
    variant: "destructive",
    size: "sm",
    disabled: (__VLS_ctx.checkedIds.size === 0),
}, ...__VLS_functionalComponentArgsRest(__VLS_109));
let __VLS_113;
const __VLS_114 = ({ click: {} },
    { onClick: (__VLS_ctx.handleBatchDelete) });
const { default: __VLS_115 } = __VLS_111.slots;
// @ts-ignore
[checkedIds, handleBatchDelete,];
var __VLS_111;
var __VLS_112;
// @ts-ignore
[];
var __VLS_97;
let __VLS_116;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_117 = __VLS_asFunctionalComponent1(__VLS_116, new __VLS_116({}));
const __VLS_118 = __VLS_117({}, ...__VLS_functionalComponentArgsRest(__VLS_117));
const { default: __VLS_121 } = __VLS_119.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "rounded-md border overflow-x-auto" },
});
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
let __VLS_122;
/** @ts-ignore @type { | typeof __VLS_components.Table | typeof __VLS_components.Table} */
Table;
// @ts-ignore
const __VLS_123 = __VLS_asFunctionalComponent1(__VLS_122, new __VLS_122({}));
const __VLS_124 = __VLS_123({}, ...__VLS_functionalComponentArgsRest(__VLS_123));
const { default: __VLS_127 } = __VLS_125.slots;
let __VLS_128;
/** @ts-ignore @type { | typeof __VLS_components.TableHeader | typeof __VLS_components.TableHeader} */
TableHeader;
// @ts-ignore
const __VLS_129 = __VLS_asFunctionalComponent1(__VLS_128, new __VLS_128({}));
const __VLS_130 = __VLS_129({}, ...__VLS_functionalComponentArgsRest(__VLS_129));
const { default: __VLS_133 } = __VLS_131.slots;
let __VLS_134;
/** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
TableRow;
// @ts-ignore
const __VLS_135 = __VLS_asFunctionalComponent1(__VLS_134, new __VLS_134({}));
const __VLS_136 = __VLS_135({}, ...__VLS_functionalComponentArgsRest(__VLS_135));
const { default: __VLS_139 } = __VLS_137.slots;
let __VLS_140;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_141 = __VLS_asFunctionalComponent1(__VLS_140, new __VLS_140({
    ...{ class: "w-10" },
}));
const __VLS_142 = __VLS_141({
    ...{ class: "w-10" },
}, ...__VLS_functionalComponentArgsRest(__VLS_141));
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
const { default: __VLS_145 } = __VLS_143.slots;
let __VLS_146;
/** @ts-ignore @type { | typeof __VLS_components.Checkbox} */
Checkbox;
// @ts-ignore
const __VLS_147 = __VLS_asFunctionalComponent1(__VLS_146, new __VLS_146({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.isAllSelected),
}));
const __VLS_148 = __VLS_147({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.isAllSelected),
}, ...__VLS_functionalComponentArgsRest(__VLS_147));
let __VLS_151;
const __VLS_152 = ({ 'update:checked': {} },
    { 'onUpdate:checked': (__VLS_ctx.toggleAll) });
var __VLS_149;
var __VLS_150;
// @ts-ignore
[isAllSelected, toggleAll,];
var __VLS_143;
let __VLS_153;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_154 = __VLS_asFunctionalComponent1(__VLS_153, new __VLS_153({
    ...{ class: "w-12" },
}));
const __VLS_155 = __VLS_154({
    ...{ class: "w-12" },
}, ...__VLS_functionalComponentArgsRest(__VLS_154));
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
const { default: __VLS_158 } = __VLS_156.slots;
// @ts-ignore
[];
var __VLS_156;
let __VLS_159;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_160 = __VLS_asFunctionalComponent1(__VLS_159, new __VLS_159({}));
const __VLS_161 = __VLS_160({}, ...__VLS_functionalComponentArgsRest(__VLS_160));
const { default: __VLS_164 } = __VLS_162.slots;
// @ts-ignore
[];
var __VLS_162;
let __VLS_165;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_166 = __VLS_asFunctionalComponent1(__VLS_165, new __VLS_165({}));
const __VLS_167 = __VLS_166({}, ...__VLS_functionalComponentArgsRest(__VLS_166));
const { default: __VLS_170 } = __VLS_168.slots;
// @ts-ignore
[];
var __VLS_168;
let __VLS_171;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_172 = __VLS_asFunctionalComponent1(__VLS_171, new __VLS_171({}));
const __VLS_173 = __VLS_172({}, ...__VLS_functionalComponentArgsRest(__VLS_172));
const { default: __VLS_176 } = __VLS_174.slots;
// @ts-ignore
[];
var __VLS_174;
let __VLS_177;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_178 = __VLS_asFunctionalComponent1(__VLS_177, new __VLS_177({}));
const __VLS_179 = __VLS_178({}, ...__VLS_functionalComponentArgsRest(__VLS_178));
const { default: __VLS_182 } = __VLS_180.slots;
// @ts-ignore
[];
var __VLS_180;
let __VLS_183;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_184 = __VLS_asFunctionalComponent1(__VLS_183, new __VLS_183({}));
const __VLS_185 = __VLS_184({}, ...__VLS_functionalComponentArgsRest(__VLS_184));
const { default: __VLS_188 } = __VLS_186.slots;
// @ts-ignore
[];
var __VLS_186;
let __VLS_189;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_190 = __VLS_asFunctionalComponent1(__VLS_189, new __VLS_189({
    ...{ class: "w-20" },
}));
const __VLS_191 = __VLS_190({
    ...{ class: "w-20" },
}, ...__VLS_functionalComponentArgsRest(__VLS_190));
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
const { default: __VLS_194 } = __VLS_192.slots;
// @ts-ignore
[];
var __VLS_192;
let __VLS_195;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_196 = __VLS_asFunctionalComponent1(__VLS_195, new __VLS_195({
    ...{ class: "w-28 text-right" },
}));
const __VLS_197 = __VLS_196({
    ...{ class: "w-28 text-right" },
}, ...__VLS_functionalComponentArgsRest(__VLS_196));
/** @type {__VLS_StyleScopedClasses['w-28']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
const { default: __VLS_200 } = __VLS_198.slots;
// @ts-ignore
[];
var __VLS_198;
// @ts-ignore
[];
var __VLS_137;
// @ts-ignore
[];
var __VLS_131;
let __VLS_201;
/** @ts-ignore @type { | typeof __VLS_components.TableBody | typeof __VLS_components.TableBody} */
TableBody;
// @ts-ignore
const __VLS_202 = __VLS_asFunctionalComponent1(__VLS_201, new __VLS_201({}));
const __VLS_203 = __VLS_202({}, ...__VLS_functionalComponentArgsRest(__VLS_202));
const { default: __VLS_206 } = __VLS_204.slots;
if (__VLS_ctx.paginatedList.length === 0) {
    let __VLS_207;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_208 = __VLS_asFunctionalComponent1(__VLS_207, new __VLS_207({}));
    const __VLS_209 = __VLS_208({}, ...__VLS_functionalComponentArgsRest(__VLS_208));
    const { default: __VLS_212 } = __VLS_210.slots;
    let __VLS_213;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_214 = __VLS_asFunctionalComponent1(__VLS_213, new __VLS_213({
        colspan: (9),
        ...{ class: "h-20 text-center text-muted-foreground" },
    }));
    const __VLS_215 = __VLS_214({
        colspan: (9),
        ...{ class: "h-20 text-center text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_214));
    /** @type {__VLS_StyleScopedClasses['h-20']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_218 } = __VLS_216.slots;
    // @ts-ignore
    [paginatedList,];
    var __VLS_216;
    // @ts-ignore
    [];
    var __VLS_210;
}
for (const [row, idx] of __VLS_vFor((__VLS_ctx.paginatedList))) {
    let __VLS_219;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_220 = __VLS_asFunctionalComponent1(__VLS_219, new __VLS_219({
        key: (row.id),
        dataState: (__VLS_ctx.checkedIds.has(row.id) ? 'selected' : undefined),
    }));
    const __VLS_221 = __VLS_220({
        key: (row.id),
        dataState: (__VLS_ctx.checkedIds.has(row.id) ? 'selected' : undefined),
    }, ...__VLS_functionalComponentArgsRest(__VLS_220));
    const { default: __VLS_224 } = __VLS_222.slots;
    let __VLS_225;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_226 = __VLS_asFunctionalComponent1(__VLS_225, new __VLS_225({}));
    const __VLS_227 = __VLS_226({}, ...__VLS_functionalComponentArgsRest(__VLS_226));
    const { default: __VLS_230 } = __VLS_228.slots;
    let __VLS_231;
    /** @ts-ignore @type { | typeof __VLS_components.Checkbox} */
    Checkbox;
    // @ts-ignore
    const __VLS_232 = __VLS_asFunctionalComponent1(__VLS_231, new __VLS_231({
        ...{ 'onUpdate:checked': {} },
        checked: (__VLS_ctx.checkedIds.has(row.id)),
    }));
    const __VLS_233 = __VLS_232({
        ...{ 'onUpdate:checked': {} },
        checked: (__VLS_ctx.checkedIds.has(row.id)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_232));
    let __VLS_236;
    const __VLS_237 = ({ 'update:checked': {} },
        { 'onUpdate:checked': (...[$event]) => {
                __VLS_ctx.toggleRow(row);
                // @ts-ignore
                [checkedIds, checkedIds, paginatedList, toggleRow,];
            } });
    var __VLS_234;
    var __VLS_235;
    // @ts-ignore
    [];
    var __VLS_228;
    let __VLS_238;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_239 = __VLS_asFunctionalComponent1(__VLS_238, new __VLS_238({
        ...{ class: "text-muted-foreground text-xs" },
    }));
    const __VLS_240 = __VLS_239({
        ...{ class: "text-muted-foreground text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_239));
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    const { default: __VLS_243 } = __VLS_241.slots;
    ((__VLS_ctx.currentPage - 1) * __VLS_ctx.pageSize + idx + 1);
    // @ts-ignore
    [currentPage, pageSize,];
    var __VLS_241;
    let __VLS_244;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_245 = __VLS_asFunctionalComponent1(__VLS_244, new __VLS_244({
        ...{ class: "font-medium" },
    }));
    const __VLS_246 = __VLS_245({
        ...{ class: "font-medium" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_245));
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    const { default: __VLS_249 } = __VLS_247.slots;
    (row.name);
    // @ts-ignore
    [];
    var __VLS_247;
    let __VLS_250;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_251 = __VLS_asFunctionalComponent1(__VLS_250, new __VLS_250({}));
    const __VLS_252 = __VLS_251({}, ...__VLS_functionalComponentArgsRest(__VLS_251));
    const { default: __VLS_255 } = __VLS_253.slots;
    (row.age);
    // @ts-ignore
    [];
    var __VLS_253;
    let __VLS_256;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_257 = __VLS_asFunctionalComponent1(__VLS_256, new __VLS_256({}));
    const __VLS_258 = __VLS_257({}, ...__VLS_functionalComponentArgsRest(__VLS_257));
    const { default: __VLS_261 } = __VLS_259.slots;
    let __VLS_262;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_263 = __VLS_asFunctionalComponent1(__VLS_262, new __VLS_262({
        variant: (row.gender === 1 ? 'default' : 'secondary'),
        ...{ class: "text-[10px]" },
    }));
    const __VLS_264 = __VLS_263({
        variant: (row.gender === 1 ? 'default' : 'secondary'),
        ...{ class: "text-[10px]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_263));
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    const { default: __VLS_267 } = __VLS_265.slots;
    (row.gender === 1 ? "男" : "女");
    // @ts-ignore
    [];
    var __VLS_265;
    // @ts-ignore
    [];
    var __VLS_259;
    let __VLS_268;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_269 = __VLS_asFunctionalComponent1(__VLS_268, new __VLS_268({
        ...{ class: "text-sm" },
    }));
    const __VLS_270 = __VLS_269({
        ...{ class: "text-sm" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_269));
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    const { default: __VLS_273 } = __VLS_271.slots;
    (row.phone);
    // @ts-ignore
    [];
    var __VLS_271;
    let __VLS_274;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_275 = __VLS_asFunctionalComponent1(__VLS_274, new __VLS_274({
        ...{ class: "text-sm text-muted-foreground max-w-[200px] truncate" },
    }));
    const __VLS_276 = __VLS_275({
        ...{ class: "text-sm text-muted-foreground max-w-[200px] truncate" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_275));
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-[200px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    const { default: __VLS_279 } = __VLS_277.slots;
    (row.address);
    // @ts-ignore
    [];
    var __VLS_277;
    let __VLS_280;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_281 = __VLS_asFunctionalComponent1(__VLS_280, new __VLS_280({}));
    const __VLS_282 = __VLS_281({}, ...__VLS_functionalComponentArgsRest(__VLS_281));
    const { default: __VLS_285 } = __VLS_283.slots;
    let __VLS_286;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_287 = __VLS_asFunctionalComponent1(__VLS_286, new __VLS_286({
        variant: (row.status === 1 ? 'default' : 'outline'),
        ...{ class: "text-[10px]" },
    }));
    const __VLS_288 = __VLS_287({
        variant: (row.status === 1 ? 'default' : 'outline'),
        ...{ class: "text-[10px]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_287));
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    const { default: __VLS_291 } = __VLS_289.slots;
    (row.status === 1 ? "正常" : "停用");
    // @ts-ignore
    [];
    var __VLS_289;
    // @ts-ignore
    [];
    var __VLS_283;
    let __VLS_292;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_293 = __VLS_asFunctionalComponent1(__VLS_292, new __VLS_292({
        ...{ class: "text-right" },
    }));
    const __VLS_294 = __VLS_293({
        ...{ class: "text-right" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_293));
    /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
    const { default: __VLS_297 } = __VLS_295.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex justify-end gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    let __VLS_298;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_299 = __VLS_asFunctionalComponent1(__VLS_298, new __VLS_298({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
    }));
    const __VLS_300 = __VLS_299({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
    }, ...__VLS_functionalComponentArgsRest(__VLS_299));
    let __VLS_303;
    const __VLS_304 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.openEdit(row);
                // @ts-ignore
                [openEdit,];
            } });
    const { default: __VLS_305 } = __VLS_301.slots;
    // @ts-ignore
    [];
    var __VLS_301;
    var __VLS_302;
    let __VLS_306;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_307 = __VLS_asFunctionalComponent1(__VLS_306, new __VLS_306({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "text-destructive" },
    }));
    const __VLS_308 = __VLS_307({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "text-destructive" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_307));
    let __VLS_311;
    const __VLS_312 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleDelete(row.id);
                // @ts-ignore
                [handleDelete,];
            } });
    /** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
    const { default: __VLS_313 } = __VLS_309.slots;
    // @ts-ignore
    [];
    var __VLS_309;
    var __VLS_310;
    // @ts-ignore
    [];
    var __VLS_295;
    // @ts-ignore
    [];
    var __VLS_222;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_204;
// @ts-ignore
[];
var __VLS_125;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between mt-4" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
(__VLS_ctx.filteredList.length);
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
(__VLS_ctx.currentPage);
(__VLS_ctx.totalPages);
let __VLS_314;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_315 = __VLS_asFunctionalComponent1(__VLS_314, new __VLS_314({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
    disabled: (__VLS_ctx.currentPage <= 1),
}));
const __VLS_316 = __VLS_315({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
    disabled: (__VLS_ctx.currentPage <= 1),
}, ...__VLS_functionalComponentArgsRest(__VLS_315));
let __VLS_319;
const __VLS_320 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.currentPage--;
            // @ts-ignore
            [currentPage, currentPage, currentPage, filteredList, totalPages,];
        } });
const { default: __VLS_321 } = __VLS_317.slots;
// @ts-ignore
[];
var __VLS_317;
var __VLS_318;
for (const [p] of __VLS_vFor((__VLS_ctx.displayedPages))) {
    let __VLS_322;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_323 = __VLS_asFunctionalComponent1(__VLS_322, new __VLS_322({
        ...{ 'onClick': {} },
        key: (p),
        variant: (p === __VLS_ctx.currentPage ? 'default' : 'outline'),
        size: "sm",
        ...{ class: "w-8" },
    }));
    const __VLS_324 = __VLS_323({
        ...{ 'onClick': {} },
        key: (p),
        variant: (p === __VLS_ctx.currentPage ? 'default' : 'outline'),
        size: "sm",
        ...{ class: "w-8" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_323));
    let __VLS_327;
    const __VLS_328 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.currentPage = p;
                // @ts-ignore
                [currentPage, currentPage, displayedPages,];
            } });
    /** @type {__VLS_StyleScopedClasses['w-8']} */ ;
    const { default: __VLS_329 } = __VLS_325.slots;
    (p);
    // @ts-ignore
    [];
    var __VLS_325;
    var __VLS_326;
    // @ts-ignore
    [];
}
let __VLS_330;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_331 = __VLS_asFunctionalComponent1(__VLS_330, new __VLS_330({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
    disabled: (__VLS_ctx.currentPage >= __VLS_ctx.totalPages),
}));
const __VLS_332 = __VLS_331({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
    disabled: (__VLS_ctx.currentPage >= __VLS_ctx.totalPages),
}, ...__VLS_functionalComponentArgsRest(__VLS_331));
let __VLS_335;
const __VLS_336 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.currentPage++;
            // @ts-ignore
            [currentPage, currentPage, totalPages,];
        } });
const { default: __VLS_337 } = __VLS_333.slots;
// @ts-ignore
[];
var __VLS_333;
var __VLS_334;
// @ts-ignore
[];
var __VLS_119;
// @ts-ignore
[];
var __VLS_91;
let __VLS_338;
/** @ts-ignore @type { | typeof __VLS_components.Dialog | typeof __VLS_components.Dialog} */
Dialog;
// @ts-ignore
const __VLS_339 = __VLS_asFunctionalComponent1(__VLS_338, new __VLS_338({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogOpen),
}));
const __VLS_340 = __VLS_339({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_339));
let __VLS_343;
const __VLS_344 = ({ 'update:open': {} },
    { 'onUpdate:open': (...[$event]) => {
            __VLS_ctx.dialogOpen = $event;
            // @ts-ignore
            [dialogOpen, dialogOpen,];
        } });
const { default: __VLS_345 } = __VLS_341.slots;
let __VLS_346;
/** @ts-ignore @type { | typeof __VLS_components.DialogContent | typeof __VLS_components.DialogContent} */
DialogContent;
// @ts-ignore
const __VLS_347 = __VLS_asFunctionalComponent1(__VLS_346, new __VLS_346({
    ...{ class: "sm:max-w-lg" },
}));
const __VLS_348 = __VLS_347({
    ...{ class: "sm:max-w-lg" },
}, ...__VLS_functionalComponentArgsRest(__VLS_347));
/** @type {__VLS_StyleScopedClasses['sm:max-w-lg']} */ ;
const { default: __VLS_351 } = __VLS_349.slots;
let __VLS_352;
/** @ts-ignore @type { | typeof __VLS_components.DialogHeader | typeof __VLS_components.DialogHeader} */
DialogHeader;
// @ts-ignore
const __VLS_353 = __VLS_asFunctionalComponent1(__VLS_352, new __VLS_352({}));
const __VLS_354 = __VLS_353({}, ...__VLS_functionalComponentArgsRest(__VLS_353));
const { default: __VLS_357 } = __VLS_355.slots;
let __VLS_358;
/** @ts-ignore @type { | typeof __VLS_components.DialogTitle | typeof __VLS_components.DialogTitle} */
DialogTitle;
// @ts-ignore
const __VLS_359 = __VLS_asFunctionalComponent1(__VLS_358, new __VLS_358({}));
const __VLS_360 = __VLS_359({}, ...__VLS_functionalComponentArgsRest(__VLS_359));
const { default: __VLS_363 } = __VLS_361.slots;
(__VLS_ctx.isEdit ? "编辑" : "新增");
// @ts-ignore
[isEdit,];
var __VLS_361;
// @ts-ignore
[];
var __VLS_355;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-4 py-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
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
let __VLS_364;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_365 = __VLS_asFunctionalComponent1(__VLS_364, new __VLS_364({}));
const __VLS_366 = __VLS_365({}, ...__VLS_functionalComponentArgsRest(__VLS_365));
const { default: __VLS_369 } = __VLS_367.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[];
var __VLS_367;
let __VLS_370;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_371 = __VLS_asFunctionalComponent1(__VLS_370, new __VLS_370({
    modelValue: (__VLS_ctx.formData.name),
    placeholder: "请输入姓名",
}));
const __VLS_372 = __VLS_371({
    modelValue: (__VLS_ctx.formData.name),
    placeholder: "请输入姓名",
}, ...__VLS_functionalComponentArgsRest(__VLS_371));
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
[formData,];
var __VLS_378;
let __VLS_381;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_382 = __VLS_asFunctionalComponent1(__VLS_381, new __VLS_381({
    modelValue: (__VLS_ctx.formData.age),
    modelModifiers: { number: true, },
    type: "number",
    placeholder: "请输入年龄",
}));
const __VLS_383 = __VLS_382({
    modelValue: (__VLS_ctx.formData.age),
    modelModifiers: { number: true, },
    type: "number",
    placeholder: "请输入年龄",
}, ...__VLS_functionalComponentArgsRest(__VLS_382));
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
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_393 = __VLS_asFunctionalComponent1(__VLS_392, new __VLS_392({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (String(__VLS_ctx.formData.gender)),
}));
const __VLS_394 = __VLS_393({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (String(__VLS_ctx.formData.gender)),
}, ...__VLS_functionalComponentArgsRest(__VLS_393));
let __VLS_397;
const __VLS_398 = ({ 'update:modelValue': {} },
    { 'onUpdate:modelValue': ((v) => (__VLS_ctx.formData.gender = Number(v))) });
const { default: __VLS_399 } = __VLS_395.slots;
let __VLS_400;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_401 = __VLS_asFunctionalComponent1(__VLS_400, new __VLS_400({}));
const __VLS_402 = __VLS_401({}, ...__VLS_functionalComponentArgsRest(__VLS_401));
const { default: __VLS_405 } = __VLS_403.slots;
let __VLS_406;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_407 = __VLS_asFunctionalComponent1(__VLS_406, new __VLS_406({}));
const __VLS_408 = __VLS_407({}, ...__VLS_functionalComponentArgsRest(__VLS_407));
// @ts-ignore
[formData, formData,];
var __VLS_403;
let __VLS_411;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_412 = __VLS_asFunctionalComponent1(__VLS_411, new __VLS_411({}));
const __VLS_413 = __VLS_412({}, ...__VLS_functionalComponentArgsRest(__VLS_412));
const { default: __VLS_416 } = __VLS_414.slots;
let __VLS_417;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_418 = __VLS_asFunctionalComponent1(__VLS_417, new __VLS_417({
    value: "1",
}));
const __VLS_419 = __VLS_418({
    value: "1",
}, ...__VLS_functionalComponentArgsRest(__VLS_418));
const { default: __VLS_422 } = __VLS_420.slots;
// @ts-ignore
[];
var __VLS_420;
let __VLS_423;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_424 = __VLS_asFunctionalComponent1(__VLS_423, new __VLS_423({
    value: "2",
}));
const __VLS_425 = __VLS_424({
    value: "2",
}, ...__VLS_functionalComponentArgsRest(__VLS_424));
const { default: __VLS_428 } = __VLS_426.slots;
// @ts-ignore
[];
var __VLS_426;
// @ts-ignore
[];
var __VLS_414;
// @ts-ignore
[];
var __VLS_395;
var __VLS_396;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_429;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_430 = __VLS_asFunctionalComponent1(__VLS_429, new __VLS_429({}));
const __VLS_431 = __VLS_430({}, ...__VLS_functionalComponentArgsRest(__VLS_430));
const { default: __VLS_434 } = __VLS_432.slots;
// @ts-ignore
[];
var __VLS_432;
let __VLS_435;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_436 = __VLS_asFunctionalComponent1(__VLS_435, new __VLS_435({
    modelValue: (__VLS_ctx.formData.phone),
    placeholder: "请输入手机号",
}));
const __VLS_437 = __VLS_436({
    modelValue: (__VLS_ctx.formData.phone),
    placeholder: "请输入手机号",
}, ...__VLS_functionalComponentArgsRest(__VLS_436));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_440;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_441 = __VLS_asFunctionalComponent1(__VLS_440, new __VLS_440({}));
const __VLS_442 = __VLS_441({}, ...__VLS_functionalComponentArgsRest(__VLS_441));
const { default: __VLS_445 } = __VLS_443.slots;
// @ts-ignore
[formData,];
var __VLS_443;
let __VLS_446;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_447 = __VLS_asFunctionalComponent1(__VLS_446, new __VLS_446({
    modelValue: (__VLS_ctx.formData.address),
    placeholder: "请输入地址",
}));
const __VLS_448 = __VLS_447({
    modelValue: (__VLS_ctx.formData.address),
    placeholder: "请输入地址",
}, ...__VLS_functionalComponentArgsRest(__VLS_447));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
let __VLS_451;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_452 = __VLS_asFunctionalComponent1(__VLS_451, new __VLS_451({}));
const __VLS_453 = __VLS_452({}, ...__VLS_functionalComponentArgsRest(__VLS_452));
const { default: __VLS_456 } = __VLS_454.slots;
// @ts-ignore
[formData,];
var __VLS_454;
let __VLS_457;
/** @ts-ignore @type { | typeof __VLS_components.Switch} */
Switch;
// @ts-ignore
const __VLS_458 = __VLS_asFunctionalComponent1(__VLS_457, new __VLS_457({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.formData.status === 1),
}));
const __VLS_459 = __VLS_458({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.formData.status === 1),
}, ...__VLS_functionalComponentArgsRest(__VLS_458));
let __VLS_462;
const __VLS_463 = ({ 'update:checked': {} },
    { 'onUpdate:checked': ((v) => (__VLS_ctx.formData.status = v ? 1 : 0)) });
var __VLS_460;
var __VLS_461;
let __VLS_464;
/** @ts-ignore @type { | typeof __VLS_components.DialogFooter | typeof __VLS_components.DialogFooter} */
DialogFooter;
// @ts-ignore
const __VLS_465 = __VLS_asFunctionalComponent1(__VLS_464, new __VLS_464({}));
const __VLS_466 = __VLS_465({}, ...__VLS_functionalComponentArgsRest(__VLS_465));
const { default: __VLS_469 } = __VLS_467.slots;
let __VLS_470;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_471 = __VLS_asFunctionalComponent1(__VLS_470, new __VLS_470({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_472 = __VLS_471({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_471));
let __VLS_475;
const __VLS_476 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.dialogOpen = false;
            // @ts-ignore
            [dialogOpen, formData, formData,];
        } });
const { default: __VLS_477 } = __VLS_473.slots;
// @ts-ignore
[];
var __VLS_473;
var __VLS_474;
let __VLS_478;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_479 = __VLS_asFunctionalComponent1(__VLS_478, new __VLS_478({
    ...{ 'onClick': {} },
}));
const __VLS_480 = __VLS_479({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_479));
let __VLS_483;
const __VLS_484 = ({ click: {} },
    { onClick: (__VLS_ctx.handleSubmit) });
const { default: __VLS_485 } = __VLS_481.slots;
// @ts-ignore
[handleSubmit,];
var __VLS_481;
var __VLS_482;
// @ts-ignore
[];
var __VLS_467;
// @ts-ignore
[];
var __VLS_349;
// @ts-ignore
[];
var __VLS_341;
var __VLS_342;
let __VLS_486;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialog | typeof __VLS_components.AlertDialog} */
AlertDialog;
// @ts-ignore
const __VLS_487 = __VLS_asFunctionalComponent1(__VLS_486, new __VLS_486({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteDialogOpen),
}));
const __VLS_488 = __VLS_487({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.deleteDialogOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_487));
let __VLS_491;
const __VLS_492 = ({ 'update:open': {} },
    { 'onUpdate:open': (...[$event]) => {
            __VLS_ctx.deleteDialogOpen = $event;
            // @ts-ignore
            [deleteDialogOpen, deleteDialogOpen,];
        } });
const { default: __VLS_493 } = __VLS_489.slots;
let __VLS_494;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogContent | typeof __VLS_components.AlertDialogContent} */
AlertDialogContent;
// @ts-ignore
const __VLS_495 = __VLS_asFunctionalComponent1(__VLS_494, new __VLS_494({}));
const __VLS_496 = __VLS_495({}, ...__VLS_functionalComponentArgsRest(__VLS_495));
const { default: __VLS_499 } = __VLS_497.slots;
let __VLS_500;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogHeader | typeof __VLS_components.AlertDialogHeader} */
AlertDialogHeader;
// @ts-ignore
const __VLS_501 = __VLS_asFunctionalComponent1(__VLS_500, new __VLS_500({}));
const __VLS_502 = __VLS_501({}, ...__VLS_functionalComponentArgsRest(__VLS_501));
const { default: __VLS_505 } = __VLS_503.slots;
let __VLS_506;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogTitle | typeof __VLS_components.AlertDialogTitle} */
AlertDialogTitle;
// @ts-ignore
const __VLS_507 = __VLS_asFunctionalComponent1(__VLS_506, new __VLS_506({}));
const __VLS_508 = __VLS_507({}, ...__VLS_functionalComponentArgsRest(__VLS_507));
const { default: __VLS_511 } = __VLS_509.slots;
// @ts-ignore
[];
var __VLS_509;
let __VLS_512;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogDescription | typeof __VLS_components.AlertDialogDescription} */
AlertDialogDescription;
// @ts-ignore
const __VLS_513 = __VLS_asFunctionalComponent1(__VLS_512, new __VLS_512({}));
const __VLS_514 = __VLS_513({}, ...__VLS_functionalComponentArgsRest(__VLS_513));
const { default: __VLS_517 } = __VLS_515.slots;
// @ts-ignore
[];
var __VLS_515;
// @ts-ignore
[];
var __VLS_503;
let __VLS_518;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogFooter | typeof __VLS_components.AlertDialogFooter} */
AlertDialogFooter;
// @ts-ignore
const __VLS_519 = __VLS_asFunctionalComponent1(__VLS_518, new __VLS_518({}));
const __VLS_520 = __VLS_519({}, ...__VLS_functionalComponentArgsRest(__VLS_519));
const { default: __VLS_523 } = __VLS_521.slots;
let __VLS_524;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogCancel | typeof __VLS_components.AlertDialogCancel} */
AlertDialogCancel;
// @ts-ignore
const __VLS_525 = __VLS_asFunctionalComponent1(__VLS_524, new __VLS_524({}));
const __VLS_526 = __VLS_525({}, ...__VLS_functionalComponentArgsRest(__VLS_525));
const { default: __VLS_529 } = __VLS_527.slots;
// @ts-ignore
[];
var __VLS_527;
let __VLS_530;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogAction | typeof __VLS_components.AlertDialogAction} */
AlertDialogAction;
// @ts-ignore
const __VLS_531 = __VLS_asFunctionalComponent1(__VLS_530, new __VLS_530({
    ...{ 'onClick': {} },
}));
const __VLS_532 = __VLS_531({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_531));
let __VLS_535;
const __VLS_536 = ({ click: {} },
    { onClick: (__VLS_ctx.confirmDelete) });
const { default: __VLS_537 } = __VLS_533.slots;
// @ts-ignore
[confirmDelete,];
var __VLS_533;
var __VLS_534;
// @ts-ignore
[];
var __VLS_521;
// @ts-ignore
[];
var __VLS_497;
// @ts-ignore
[];
var __VLS_489;
var __VLS_490;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=curd-single.vue.js.map