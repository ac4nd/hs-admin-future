import { ref, reactive, computed } from "vue";
import { toast } from "vue-sonner";
import { ChevronRightIcon } from "@lucide/vue";
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
const mockData = [
    {
        id: 1,
        username: "Richard Clark",
        roles: "editor",
        phone: "18185826431",
        email: "y.djf@xiswx.fk",
        status: true,
        createTime: "2010-04-17 12:39:20",
    },
    {
        id: 2,
        username: "Robert Garcia",
        roles: "admin",
        phone: "18125716043",
        email: "z.japgndxosu@inoudjxc.ie",
        status: false,
        createTime: "2020-01-02 11:51:58",
    },
    {
        id: 3,
        username: "Thomas Moore",
        roles: "admin",
        phone: "18106622048",
        email: "j.fvsgnjjutm@fmjw.se",
        status: true,
        createTime: "1983-10-12 10:06:41",
    },
    {
        id: 4,
        username: "Dorothy Lewis",
        roles: "admin",
        phone: "13321357284",
        email: "o.htso@iwxvehrs.tj",
        status: true,
        createTime: "1970-03-03 00:26:45",
    },
    {
        id: 5,
        username: "George Rodriguez",
        roles: "admin",
        phone: "18158641167",
        email: "x.sigizx@fwknokiqn.tr",
        status: true,
        createTime: "1988-03-16 14:46:26",
    },
    {
        id: 6,
        username: "Angela Jackson",
        roles: "admin",
        phone: "19810721230",
        email: "j.gqrdqaqtu@ipthgm.fj",
        status: true,
        createTime: "2006-09-26 12:53:37",
    },
    {
        id: 7,
        username: "James Walker",
        roles: "admin",
        phone: "18123903251",
        email: "k.axmdcsl@mcmeudog.cl",
        status: true,
        createTime: "1981-01-19 12:51:34",
    },
    {
        id: 8,
        username: "Paul Garcia",
        roles: "admin",
        phone: "18617930381",
        email: "c.glufsn@vwqntlllj.es",
        status: false,
        createTime: "2009-12-04 20:40:57",
    },
    {
        id: 9,
        username: "Jeffrey Miller",
        roles: "admin",
        phone: "18145245413",
        email: "u.poqrqw@arto.rw",
        status: false,
        createTime: "1991-04-01 05:16:52",
    },
    {
        id: 10,
        username: "Donna Lewis",
        roles: "editor",
        phone: "19839835537",
        email: "l.lmpeoupu@rujdlzdbk.gf",
        status: true,
        createTime: "1987-11-29 21:47:37",
    },
    {
        id: 11,
        username: "Jennifer Smith",
        roles: "editor",
        phone: "18145245413",
        email: "j.jqx@xjxqx.jp",
        status: true,
        createTime: "1991-04-01 05:16:52",
    },
];
const dataList = ref([...mockData]);
const queryParams = reactive({ keywords: "", status: "all" });
const checkedIds = ref(new Set());
const expandedIds = ref(new Set());
const sortField = ref("");
const sortOrder = ref("asc");
const currentPage = ref(1);
const pageSize = 5;
const filteredList = computed(() => {
    let list = [...dataList.value];
    if (queryParams.keywords) {
        const kw = queryParams.keywords.toLowerCase();
        list = list.filter((r) => r.username.toLowerCase().includes(kw) || r.email.toLowerCase().includes(kw));
    }
    if (queryParams.status !== "all") {
        const st = queryParams.status === "true";
        list = list.filter((r) => r.status === st);
    }
    if (sortField.value) {
        list.sort((a, b) => {
            const aVal = sortField.value === "status"
                ? a.status
                    ? 1
                    : 0
                : a[sortField.value];
            const bVal = sortField.value === "status"
                ? b.status
                    ? 1
                    : 0
                : b[sortField.value];
            return sortOrder.value === "asc" ? (aVal > bVal ? 1 : -1) : aVal < bVal ? 1 : -1;
        });
    }
    return list;
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
const allExpanded = computed(() => paginatedList.value.length > 0 && paginatedList.value.every((r) => expandedIds.value.has(r.id)));
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
function toggleExpand(id) {
    const s = new Set(expandedIds.value);
    s.has(id) ? s.delete(id) : s.add(id);
    expandedIds.value = s;
}
function toggleExpandAll() {
    if (allExpanded.value)
        expandedIds.value = new Set();
    else {
        const s = new Set();
        paginatedList.value.forEach((r) => s.add(r.id));
        expandedIds.value = s;
    }
}
function toggleSort(field) {
    if (sortField.value === field)
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    else {
        sortField.value = field;
        sortOrder.value = "asc";
    }
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
    username: "",
    roles: "user",
    status: true,
});
function openAdd() {
    isEdit.value = false;
    Object.assign(formData, { id: undefined, username: "", roles: "user", status: true });
    dialogOpen.value = true;
}
function openEdit(row) {
    isEdit.value = true;
    Object.assign(formData, {
        id: row.id,
        username: row.username,
        roles: row.roles,
        status: row.status,
    });
    dialogOpen.value = true;
}
function handleSubmit() {
    if (!formData.username) {
        toast.error("请输入用户名");
        return;
    }
    if (isEdit.value && formData.id) {
        const idx = dataList.value.findIndex((r) => r.id === formData.id);
        if (idx >= 0)
            dataList.value[idx] = {
                ...dataList.value[idx],
                username: formData.username,
                roles: formData.roles,
                status: formData.status,
            };
        toast.success("修改成功");
    }
    else {
        dataList.value.push({
            id: Date.now(),
            username: formData.username,
            roles: formData.roles,
            phone: "181" + Math.random().toString().slice(2, 9),
            email: `${formData.username.toLowerCase().replace(/\s/g, ".")}@example.com`,
            status: formData.status,
            createTime: new Date().toISOString().slice(0, 19).replace("T", " "),
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
    placeholder: "用户名/邮箱",
    ...{ class: "w-52 h-8 text-sm" },
}));
const __VLS_20 = __VLS_19({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.keywords),
    placeholder: "用户名/邮箱",
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
    value: "true",
}));
const __VLS_62 = __VLS_61({
    value: "true",
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
    value: "false",
}));
const __VLS_68 = __VLS_67({
    value: "false",
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
let __VLS_116;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_117 = __VLS_asFunctionalComponent1(__VLS_116, new __VLS_116({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}));
const __VLS_118 = __VLS_117({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_117));
let __VLS_121;
const __VLS_122 = ({ click: {} },
    { onClick: (__VLS_ctx.toggleExpandAll) });
const { default: __VLS_123 } = __VLS_119.slots;
(__VLS_ctx.allExpanded ? "收起全部" : "展开全部");
// @ts-ignore
[toggleExpandAll, allExpanded,];
var __VLS_119;
var __VLS_120;
// @ts-ignore
[];
var __VLS_97;
let __VLS_124;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_125 = __VLS_asFunctionalComponent1(__VLS_124, new __VLS_124({}));
const __VLS_126 = __VLS_125({}, ...__VLS_functionalComponentArgsRest(__VLS_125));
const { default: __VLS_129 } = __VLS_127.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "rounded-md border overflow-x-auto" },
});
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
let __VLS_130;
/** @ts-ignore @type { | typeof __VLS_components.Table | typeof __VLS_components.Table} */
Table;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent1(__VLS_130, new __VLS_130({}));
const __VLS_132 = __VLS_131({}, ...__VLS_functionalComponentArgsRest(__VLS_131));
const { default: __VLS_135 } = __VLS_133.slots;
let __VLS_136;
/** @ts-ignore @type { | typeof __VLS_components.TableHeader | typeof __VLS_components.TableHeader} */
TableHeader;
// @ts-ignore
const __VLS_137 = __VLS_asFunctionalComponent1(__VLS_136, new __VLS_136({}));
const __VLS_138 = __VLS_137({}, ...__VLS_functionalComponentArgsRest(__VLS_137));
const { default: __VLS_141 } = __VLS_139.slots;
let __VLS_142;
/** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
TableRow;
// @ts-ignore
const __VLS_143 = __VLS_asFunctionalComponent1(__VLS_142, new __VLS_142({}));
const __VLS_144 = __VLS_143({}, ...__VLS_functionalComponentArgsRest(__VLS_143));
const { default: __VLS_147 } = __VLS_145.slots;
let __VLS_148;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_149 = __VLS_asFunctionalComponent1(__VLS_148, new __VLS_148({
    ...{ class: "w-10" },
}));
const __VLS_150 = __VLS_149({
    ...{ class: "w-10" },
}, ...__VLS_functionalComponentArgsRest(__VLS_149));
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
const { default: __VLS_153 } = __VLS_151.slots;
let __VLS_154;
/** @ts-ignore @type { | typeof __VLS_components.Checkbox} */
Checkbox;
// @ts-ignore
const __VLS_155 = __VLS_asFunctionalComponent1(__VLS_154, new __VLS_154({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.isAllSelected),
}));
const __VLS_156 = __VLS_155({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.isAllSelected),
}, ...__VLS_functionalComponentArgsRest(__VLS_155));
let __VLS_159;
const __VLS_160 = ({ 'update:checked': {} },
    { 'onUpdate:checked': (__VLS_ctx.toggleAll) });
var __VLS_157;
var __VLS_158;
// @ts-ignore
[isAllSelected, toggleAll,];
var __VLS_151;
let __VLS_161;
/** @ts-ignore @type { | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_162 = __VLS_asFunctionalComponent1(__VLS_161, new __VLS_161({
    ...{ class: "w-10" },
}));
const __VLS_163 = __VLS_162({
    ...{ class: "w-10" },
}, ...__VLS_functionalComponentArgsRest(__VLS_162));
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
let __VLS_166;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_167 = __VLS_asFunctionalComponent1(__VLS_166, new __VLS_166({
    ...{ class: "w-12" },
}));
const __VLS_168 = __VLS_167({
    ...{ class: "w-12" },
}, ...__VLS_functionalComponentArgsRest(__VLS_167));
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
const { default: __VLS_171 } = __VLS_169.slots;
// @ts-ignore
[];
var __VLS_169;
let __VLS_172;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_173 = __VLS_asFunctionalComponent1(__VLS_172, new __VLS_172({}));
const __VLS_174 = __VLS_173({}, ...__VLS_functionalComponentArgsRest(__VLS_173));
const { default: __VLS_177 } = __VLS_175.slots;
// @ts-ignore
[];
var __VLS_175;
let __VLS_178;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_179 = __VLS_asFunctionalComponent1(__VLS_178, new __VLS_178({}));
const __VLS_180 = __VLS_179({}, ...__VLS_functionalComponentArgsRest(__VLS_179));
const { default: __VLS_183 } = __VLS_181.slots;
// @ts-ignore
[];
var __VLS_181;
let __VLS_184;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_185 = __VLS_asFunctionalComponent1(__VLS_184, new __VLS_184({}));
const __VLS_186 = __VLS_185({}, ...__VLS_functionalComponentArgsRest(__VLS_185));
const { default: __VLS_189 } = __VLS_187.slots;
// @ts-ignore
[];
var __VLS_187;
let __VLS_190;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_191 = __VLS_asFunctionalComponent1(__VLS_190, new __VLS_190({}));
const __VLS_192 = __VLS_191({}, ...__VLS_functionalComponentArgsRest(__VLS_191));
const { default: __VLS_195 } = __VLS_193.slots;
// @ts-ignore
[];
var __VLS_193;
let __VLS_196;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_197 = __VLS_asFunctionalComponent1(__VLS_196, new __VLS_196({
    ...{ class: "w-20" },
}));
const __VLS_198 = __VLS_197({
    ...{ class: "w-20" },
}, ...__VLS_functionalComponentArgsRest(__VLS_197));
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
const { default: __VLS_201 } = __VLS_199.slots;
let __VLS_202;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_203 = __VLS_asFunctionalComponent1(__VLS_202, new __VLS_202({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: "h-6 px-1 text-xs" },
}));
const __VLS_204 = __VLS_203({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: "h-6 px-1 text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_203));
let __VLS_207;
const __VLS_208 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.toggleSort('status');
            // @ts-ignore
            [toggleSort,];
        } });
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['px-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_209 } = __VLS_205.slots;
(__VLS_ctx.sortField === "status" ? (__VLS_ctx.sortOrder === "asc" ? "↑" : "↓") : "");
// @ts-ignore
[sortField, sortOrder,];
var __VLS_205;
var __VLS_206;
// @ts-ignore
[];
var __VLS_199;
let __VLS_210;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_211 = __VLS_asFunctionalComponent1(__VLS_210, new __VLS_210({
    ...{ class: "w-36" },
}));
const __VLS_212 = __VLS_211({
    ...{ class: "w-36" },
}, ...__VLS_functionalComponentArgsRest(__VLS_211));
/** @type {__VLS_StyleScopedClasses['w-36']} */ ;
const { default: __VLS_215 } = __VLS_213.slots;
let __VLS_216;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_217 = __VLS_asFunctionalComponent1(__VLS_216, new __VLS_216({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: "h-6 px-1 text-xs" },
}));
const __VLS_218 = __VLS_217({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: "h-6 px-1 text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_217));
let __VLS_221;
const __VLS_222 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.toggleSort('createTime');
            // @ts-ignore
            [toggleSort,];
        } });
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['px-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_223 } = __VLS_219.slots;
(__VLS_ctx.sortField === "createTime" ? (__VLS_ctx.sortOrder === "asc" ? "↑" : "↓") : "");
// @ts-ignore
[sortField, sortOrder,];
var __VLS_219;
var __VLS_220;
// @ts-ignore
[];
var __VLS_213;
let __VLS_224;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_225 = __VLS_asFunctionalComponent1(__VLS_224, new __VLS_224({
    ...{ class: "w-28 text-right" },
}));
const __VLS_226 = __VLS_225({
    ...{ class: "w-28 text-right" },
}, ...__VLS_functionalComponentArgsRest(__VLS_225));
/** @type {__VLS_StyleScopedClasses['w-28']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
const { default: __VLS_229 } = __VLS_227.slots;
// @ts-ignore
[];
var __VLS_227;
// @ts-ignore
[];
var __VLS_145;
// @ts-ignore
[];
var __VLS_139;
let __VLS_230;
/** @ts-ignore @type { | typeof __VLS_components.TableBody | typeof __VLS_components.TableBody} */
TableBody;
// @ts-ignore
const __VLS_231 = __VLS_asFunctionalComponent1(__VLS_230, new __VLS_230({}));
const __VLS_232 = __VLS_231({}, ...__VLS_functionalComponentArgsRest(__VLS_231));
const { default: __VLS_235 } = __VLS_233.slots;
if (__VLS_ctx.filteredList.length === 0) {
    let __VLS_236;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_237 = __VLS_asFunctionalComponent1(__VLS_236, new __VLS_236({}));
    const __VLS_238 = __VLS_237({}, ...__VLS_functionalComponentArgsRest(__VLS_237));
    const { default: __VLS_241 } = __VLS_239.slots;
    let __VLS_242;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_243 = __VLS_asFunctionalComponent1(__VLS_242, new __VLS_242({
        colspan: (10),
        ...{ class: "h-20 text-center text-muted-foreground" },
    }));
    const __VLS_244 = __VLS_243({
        colspan: (10),
        ...{ class: "h-20 text-center text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_243));
    /** @type {__VLS_StyleScopedClasses['h-20']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_247 } = __VLS_245.slots;
    // @ts-ignore
    [filteredList,];
    var __VLS_245;
    // @ts-ignore
    [];
    var __VLS_239;
}
for (const [row, idx] of __VLS_vFor((__VLS_ctx.paginatedList))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.template)({
        key: (row.id),
    });
    let __VLS_248;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_249 = __VLS_asFunctionalComponent1(__VLS_248, new __VLS_248({
        dataState: (__VLS_ctx.checkedIds.has(row.id) ? 'selected' : undefined),
    }));
    const __VLS_250 = __VLS_249({
        dataState: (__VLS_ctx.checkedIds.has(row.id) ? 'selected' : undefined),
    }, ...__VLS_functionalComponentArgsRest(__VLS_249));
    const { default: __VLS_253 } = __VLS_251.slots;
    let __VLS_254;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_255 = __VLS_asFunctionalComponent1(__VLS_254, new __VLS_254({}));
    const __VLS_256 = __VLS_255({}, ...__VLS_functionalComponentArgsRest(__VLS_255));
    const { default: __VLS_259 } = __VLS_257.slots;
    let __VLS_260;
    /** @ts-ignore @type { | typeof __VLS_components.Checkbox} */
    Checkbox;
    // @ts-ignore
    const __VLS_261 = __VLS_asFunctionalComponent1(__VLS_260, new __VLS_260({
        ...{ 'onUpdate:checked': {} },
        checked: (__VLS_ctx.checkedIds.has(row.id)),
    }));
    const __VLS_262 = __VLS_261({
        ...{ 'onUpdate:checked': {} },
        checked: (__VLS_ctx.checkedIds.has(row.id)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_261));
    let __VLS_265;
    const __VLS_266 = ({ 'update:checked': {} },
        { 'onUpdate:checked': (...[$event]) => {
                __VLS_ctx.toggleRow(row);
                // @ts-ignore
                [checkedIds, checkedIds, paginatedList, toggleRow,];
            } });
    var __VLS_263;
    var __VLS_264;
    // @ts-ignore
    [];
    var __VLS_257;
    let __VLS_267;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_268 = __VLS_asFunctionalComponent1(__VLS_267, new __VLS_267({}));
    const __VLS_269 = __VLS_268({}, ...__VLS_functionalComponentArgsRest(__VLS_268));
    const { default: __VLS_272 } = __VLS_270.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.toggleExpand(row.id);
                // @ts-ignore
                [toggleExpand,];
            } },
        ...{ class: "p-0.5 hover:bg-muted rounded" },
    });
    /** @type {__VLS_StyleScopedClasses['p-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-muted']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
    let __VLS_273;
    /** @ts-ignore @type { | typeof __VLS_components.ChevronRightIcon} */
    ChevronRightIcon;
    // @ts-ignore
    const __VLS_274 = __VLS_asFunctionalComponent1(__VLS_273, new __VLS_273({
        ...{ class: "size-3.5 transition-transform" },
        ...{ class: ({ 'rotate-90': __VLS_ctx.expandedIds.has(row.id) }) },
    }));
    const __VLS_275 = __VLS_274({
        ...{ class: "size-3.5 transition-transform" },
        ...{ class: ({ 'rotate-90': __VLS_ctx.expandedIds.has(row.id) }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_274));
    /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
    /** @type {__VLS_StyleScopedClasses['rotate-90']} */ ;
    // @ts-ignore
    [expandedIds,];
    var __VLS_270;
    let __VLS_278;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_279 = __VLS_asFunctionalComponent1(__VLS_278, new __VLS_278({
        ...{ class: "text-muted-foreground text-xs" },
    }));
    const __VLS_280 = __VLS_279({
        ...{ class: "text-muted-foreground text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_279));
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    const { default: __VLS_283 } = __VLS_281.slots;
    ((__VLS_ctx.currentPage - 1) * __VLS_ctx.pageSize + idx + 1);
    // @ts-ignore
    [currentPage, pageSize,];
    var __VLS_281;
    let __VLS_284;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_285 = __VLS_asFunctionalComponent1(__VLS_284, new __VLS_284({
        ...{ class: "font-medium" },
    }));
    const __VLS_286 = __VLS_285({
        ...{ class: "font-medium" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_285));
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    const { default: __VLS_289 } = __VLS_287.slots;
    (row.username);
    // @ts-ignore
    [];
    var __VLS_287;
    let __VLS_290;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_291 = __VLS_asFunctionalComponent1(__VLS_290, new __VLS_290({}));
    const __VLS_292 = __VLS_291({}, ...__VLS_functionalComponentArgsRest(__VLS_291));
    const { default: __VLS_295 } = __VLS_293.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    for (const [role] of __VLS_vFor((row.roles.split(',')))) {
        let __VLS_296;
        /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
        Badge;
        // @ts-ignore
        const __VLS_297 = __VLS_asFunctionalComponent1(__VLS_296, new __VLS_296({
            key: (role),
            variant: (role === 'admin' ? 'default' : 'secondary'),
            ...{ class: "text-[10px]" },
        }));
        const __VLS_298 = __VLS_297({
            key: (role),
            variant: (role === 'admin' ? 'default' : 'secondary'),
            ...{ class: "text-[10px]" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_297));
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        const { default: __VLS_301 } = __VLS_299.slots;
        (role);
        // @ts-ignore
        [];
        var __VLS_299;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_293;
    let __VLS_302;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_303 = __VLS_asFunctionalComponent1(__VLS_302, new __VLS_302({
        ...{ class: "text-sm" },
    }));
    const __VLS_304 = __VLS_303({
        ...{ class: "text-sm" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_303));
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    const { default: __VLS_307 } = __VLS_305.slots;
    (row.phone);
    // @ts-ignore
    [];
    var __VLS_305;
    let __VLS_308;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_309 = __VLS_asFunctionalComponent1(__VLS_308, new __VLS_308({
        ...{ class: "text-sm text-muted-foreground" },
    }));
    const __VLS_310 = __VLS_309({
        ...{ class: "text-sm text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_309));
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_313 } = __VLS_311.slots;
    (row.email);
    // @ts-ignore
    [];
    var __VLS_311;
    let __VLS_314;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_315 = __VLS_asFunctionalComponent1(__VLS_314, new __VLS_314({}));
    const __VLS_316 = __VLS_315({}, ...__VLS_functionalComponentArgsRest(__VLS_315));
    const { default: __VLS_319 } = __VLS_317.slots;
    let __VLS_320;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_321 = __VLS_asFunctionalComponent1(__VLS_320, new __VLS_320({
        variant: (row.status ? 'default' : 'outline'),
        ...{ class: "text-[10px]" },
    }));
    const __VLS_322 = __VLS_321({
        variant: (row.status ? 'default' : 'outline'),
        ...{ class: "text-[10px]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_321));
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    const { default: __VLS_325 } = __VLS_323.slots;
    (row.status ? "启用" : "禁用");
    // @ts-ignore
    [];
    var __VLS_323;
    // @ts-ignore
    [];
    var __VLS_317;
    let __VLS_326;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_327 = __VLS_asFunctionalComponent1(__VLS_326, new __VLS_326({
        ...{ class: "text-xs text-muted-foreground" },
    }));
    const __VLS_328 = __VLS_327({
        ...{ class: "text-xs text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_327));
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_331 } = __VLS_329.slots;
    (row.createTime);
    // @ts-ignore
    [];
    var __VLS_329;
    let __VLS_332;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_333 = __VLS_asFunctionalComponent1(__VLS_332, new __VLS_332({
        ...{ class: "text-right" },
    }));
    const __VLS_334 = __VLS_333({
        ...{ class: "text-right" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_333));
    /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
    const { default: __VLS_337 } = __VLS_335.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex justify-end gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    let __VLS_338;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_339 = __VLS_asFunctionalComponent1(__VLS_338, new __VLS_338({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
    }));
    const __VLS_340 = __VLS_339({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
    }, ...__VLS_functionalComponentArgsRest(__VLS_339));
    let __VLS_343;
    const __VLS_344 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.openEdit(row);
                // @ts-ignore
                [openEdit,];
            } });
    const { default: __VLS_345 } = __VLS_341.slots;
    // @ts-ignore
    [];
    var __VLS_341;
    var __VLS_342;
    let __VLS_346;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_347 = __VLS_asFunctionalComponent1(__VLS_346, new __VLS_346({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "text-destructive" },
    }));
    const __VLS_348 = __VLS_347({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "text-destructive" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_347));
    let __VLS_351;
    const __VLS_352 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleDelete(row.id);
                // @ts-ignore
                [handleDelete,];
            } });
    /** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
    const { default: __VLS_353 } = __VLS_349.slots;
    // @ts-ignore
    [];
    var __VLS_349;
    var __VLS_350;
    // @ts-ignore
    [];
    var __VLS_335;
    // @ts-ignore
    [];
    var __VLS_251;
    if (__VLS_ctx.expandedIds.has(row.id)) {
        let __VLS_354;
        /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
        TableRow;
        // @ts-ignore
        const __VLS_355 = __VLS_asFunctionalComponent1(__VLS_354, new __VLS_354({}));
        const __VLS_356 = __VLS_355({}, ...__VLS_functionalComponentArgsRest(__VLS_355));
        const { default: __VLS_359 } = __VLS_357.slots;
        let __VLS_360;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_361 = __VLS_asFunctionalComponent1(__VLS_360, new __VLS_360({
            colspan: (10),
            ...{ class: "bg-muted/30 px-8 py-3" },
        }));
        const __VLS_362 = __VLS_361({
            colspan: (10),
            ...{ class: "bg-muted/30 px-8 py-3" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_361));
        /** @type {__VLS_StyleScopedClasses['bg-muted/30']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
        const { default: __VLS_365 } = __VLS_363.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "grid grid-cols-3 gap-4 text-sm" },
        });
        /** @type {__VLS_StyleScopedClasses['grid']} */ ;
        /** @type {__VLS_StyleScopedClasses['grid-cols-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-muted-foreground" },
        });
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        (row.id);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-muted-foreground" },
        });
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        (row.username);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-muted-foreground" },
        });
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        (row.roles);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-muted-foreground" },
        });
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        (row.phone);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-muted-foreground" },
        });
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        (row.email);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-muted-foreground" },
        });
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        (row.createTime);
        // @ts-ignore
        [expandedIds,];
        var __VLS_363;
        // @ts-ignore
        [];
        var __VLS_357;
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_233;
// @ts-ignore
[];
var __VLS_133;
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
(__VLS_ctx.filteredList.filter((r) => r.status).length);
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
let __VLS_366;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_367 = __VLS_asFunctionalComponent1(__VLS_366, new __VLS_366({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
    disabled: (__VLS_ctx.currentPage <= 1),
}));
const __VLS_368 = __VLS_367({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
    disabled: (__VLS_ctx.currentPage <= 1),
}, ...__VLS_functionalComponentArgsRest(__VLS_367));
let __VLS_371;
const __VLS_372 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.currentPage--;
            // @ts-ignore
            [filteredList, filteredList, currentPage, currentPage, currentPage, totalPages,];
        } });
const { default: __VLS_373 } = __VLS_369.slots;
// @ts-ignore
[];
var __VLS_369;
var __VLS_370;
for (const [p] of __VLS_vFor((__VLS_ctx.displayedPages))) {
    let __VLS_374;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_375 = __VLS_asFunctionalComponent1(__VLS_374, new __VLS_374({
        ...{ 'onClick': {} },
        key: (p),
        variant: (p === __VLS_ctx.currentPage ? 'default' : 'outline'),
        size: "sm",
        ...{ class: "w-8" },
    }));
    const __VLS_376 = __VLS_375({
        ...{ 'onClick': {} },
        key: (p),
        variant: (p === __VLS_ctx.currentPage ? 'default' : 'outline'),
        size: "sm",
        ...{ class: "w-8" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_375));
    let __VLS_379;
    const __VLS_380 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.currentPage = p;
                // @ts-ignore
                [currentPage, currentPage, displayedPages,];
            } });
    /** @type {__VLS_StyleScopedClasses['w-8']} */ ;
    const { default: __VLS_381 } = __VLS_377.slots;
    (p);
    // @ts-ignore
    [];
    var __VLS_377;
    var __VLS_378;
    // @ts-ignore
    [];
}
let __VLS_382;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_383 = __VLS_asFunctionalComponent1(__VLS_382, new __VLS_382({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
    disabled: (__VLS_ctx.currentPage >= __VLS_ctx.totalPages),
}));
const __VLS_384 = __VLS_383({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
    disabled: (__VLS_ctx.currentPage >= __VLS_ctx.totalPages),
}, ...__VLS_functionalComponentArgsRest(__VLS_383));
let __VLS_387;
const __VLS_388 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.currentPage++;
            // @ts-ignore
            [currentPage, currentPage, totalPages,];
        } });
const { default: __VLS_389 } = __VLS_385.slots;
// @ts-ignore
[];
var __VLS_385;
var __VLS_386;
// @ts-ignore
[];
var __VLS_127;
// @ts-ignore
[];
var __VLS_91;
let __VLS_390;
/** @ts-ignore @type { | typeof __VLS_components.Dialog | typeof __VLS_components.Dialog} */
Dialog;
// @ts-ignore
const __VLS_391 = __VLS_asFunctionalComponent1(__VLS_390, new __VLS_390({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogOpen),
}));
const __VLS_392 = __VLS_391({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.dialogOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_391));
let __VLS_395;
const __VLS_396 = ({ 'update:open': {} },
    { 'onUpdate:open': (...[$event]) => {
            __VLS_ctx.dialogOpen = $event;
            // @ts-ignore
            [dialogOpen, dialogOpen,];
        } });
const { default: __VLS_397 } = __VLS_393.slots;
let __VLS_398;
/** @ts-ignore @type { | typeof __VLS_components.DialogContent | typeof __VLS_components.DialogContent} */
DialogContent;
// @ts-ignore
const __VLS_399 = __VLS_asFunctionalComponent1(__VLS_398, new __VLS_398({
    ...{ class: "sm:max-w-md" },
}));
const __VLS_400 = __VLS_399({
    ...{ class: "sm:max-w-md" },
}, ...__VLS_functionalComponentArgsRest(__VLS_399));
/** @type {__VLS_StyleScopedClasses['sm:max-w-md']} */ ;
const { default: __VLS_403 } = __VLS_401.slots;
let __VLS_404;
/** @ts-ignore @type { | typeof __VLS_components.DialogHeader | typeof __VLS_components.DialogHeader} */
DialogHeader;
// @ts-ignore
const __VLS_405 = __VLS_asFunctionalComponent1(__VLS_404, new __VLS_404({}));
const __VLS_406 = __VLS_405({}, ...__VLS_functionalComponentArgsRest(__VLS_405));
const { default: __VLS_409 } = __VLS_407.slots;
let __VLS_410;
/** @ts-ignore @type { | typeof __VLS_components.DialogTitle | typeof __VLS_components.DialogTitle} */
DialogTitle;
// @ts-ignore
const __VLS_411 = __VLS_asFunctionalComponent1(__VLS_410, new __VLS_410({}));
const __VLS_412 = __VLS_411({}, ...__VLS_functionalComponentArgsRest(__VLS_411));
const { default: __VLS_415 } = __VLS_413.slots;
(__VLS_ctx.isEdit ? "修改用户" : "新增用户");
// @ts-ignore
[isEdit,];
var __VLS_413;
// @ts-ignore
[];
var __VLS_407;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-4 py-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_416;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_417 = __VLS_asFunctionalComponent1(__VLS_416, new __VLS_416({}));
const __VLS_418 = __VLS_417({}, ...__VLS_functionalComponentArgsRest(__VLS_417));
const { default: __VLS_421 } = __VLS_419.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[];
var __VLS_419;
let __VLS_422;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_423 = __VLS_asFunctionalComponent1(__VLS_422, new __VLS_422({
    modelValue: (__VLS_ctx.formData.username),
    placeholder: "请输入用户名",
    readonly: (__VLS_ctx.isEdit),
}));
const __VLS_424 = __VLS_423({
    modelValue: (__VLS_ctx.formData.username),
    placeholder: "请输入用户名",
    readonly: (__VLS_ctx.isEdit),
}, ...__VLS_functionalComponentArgsRest(__VLS_423));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_427;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_428 = __VLS_asFunctionalComponent1(__VLS_427, new __VLS_427({}));
const __VLS_429 = __VLS_428({}, ...__VLS_functionalComponentArgsRest(__VLS_428));
const { default: __VLS_432 } = __VLS_430.slots;
// @ts-ignore
[isEdit, formData,];
var __VLS_430;
let __VLS_433;
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_434 = __VLS_asFunctionalComponent1(__VLS_433, new __VLS_433({
    modelValue: (__VLS_ctx.formData.roles),
}));
const __VLS_435 = __VLS_434({
    modelValue: (__VLS_ctx.formData.roles),
}, ...__VLS_functionalComponentArgsRest(__VLS_434));
const { default: __VLS_438 } = __VLS_436.slots;
let __VLS_439;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_440 = __VLS_asFunctionalComponent1(__VLS_439, new __VLS_439({}));
const __VLS_441 = __VLS_440({}, ...__VLS_functionalComponentArgsRest(__VLS_440));
const { default: __VLS_444 } = __VLS_442.slots;
let __VLS_445;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_446 = __VLS_asFunctionalComponent1(__VLS_445, new __VLS_445({
    placeholder: "请选择",
}));
const __VLS_447 = __VLS_446({
    placeholder: "请选择",
}, ...__VLS_functionalComponentArgsRest(__VLS_446));
// @ts-ignore
[formData,];
var __VLS_442;
let __VLS_450;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_451 = __VLS_asFunctionalComponent1(__VLS_450, new __VLS_450({}));
const __VLS_452 = __VLS_451({}, ...__VLS_functionalComponentArgsRest(__VLS_451));
const { default: __VLS_455 } = __VLS_453.slots;
let __VLS_456;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_457 = __VLS_asFunctionalComponent1(__VLS_456, new __VLS_456({
    value: "admin",
}));
const __VLS_458 = __VLS_457({
    value: "admin",
}, ...__VLS_functionalComponentArgsRest(__VLS_457));
const { default: __VLS_461 } = __VLS_459.slots;
// @ts-ignore
[];
var __VLS_459;
let __VLS_462;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_463 = __VLS_asFunctionalComponent1(__VLS_462, new __VLS_462({
    value: "editor",
}));
const __VLS_464 = __VLS_463({
    value: "editor",
}, ...__VLS_functionalComponentArgsRest(__VLS_463));
const { default: __VLS_467 } = __VLS_465.slots;
// @ts-ignore
[];
var __VLS_465;
let __VLS_468;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_469 = __VLS_asFunctionalComponent1(__VLS_468, new __VLS_468({
    value: "user",
}));
const __VLS_470 = __VLS_469({
    value: "user",
}, ...__VLS_functionalComponentArgsRest(__VLS_469));
const { default: __VLS_473 } = __VLS_471.slots;
// @ts-ignore
[];
var __VLS_471;
let __VLS_474;
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_475 = __VLS_asFunctionalComponent1(__VLS_474, new __VLS_474({
    value: "guest",
}));
const __VLS_476 = __VLS_475({
    value: "guest",
}, ...__VLS_functionalComponentArgsRest(__VLS_475));
const { default: __VLS_479 } = __VLS_477.slots;
// @ts-ignore
[];
var __VLS_477;
// @ts-ignore
[];
var __VLS_453;
// @ts-ignore
[];
var __VLS_436;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
let __VLS_480;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_481 = __VLS_asFunctionalComponent1(__VLS_480, new __VLS_480({}));
const __VLS_482 = __VLS_481({}, ...__VLS_functionalComponentArgsRest(__VLS_481));
const { default: __VLS_485 } = __VLS_483.slots;
// @ts-ignore
[];
var __VLS_483;
let __VLS_486;
/** @ts-ignore @type { | typeof __VLS_components.Switch} */
Switch;
// @ts-ignore
const __VLS_487 = __VLS_asFunctionalComponent1(__VLS_486, new __VLS_486({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.formData.status),
}));
const __VLS_488 = __VLS_487({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.formData.status),
}, ...__VLS_functionalComponentArgsRest(__VLS_487));
let __VLS_491;
const __VLS_492 = ({ 'update:checked': {} },
    { 'onUpdate:checked': ((v) => (__VLS_ctx.formData.status = v)) });
var __VLS_489;
var __VLS_490;
let __VLS_493;
/** @ts-ignore @type { | typeof __VLS_components.DialogFooter | typeof __VLS_components.DialogFooter} */
DialogFooter;
// @ts-ignore
const __VLS_494 = __VLS_asFunctionalComponent1(__VLS_493, new __VLS_493({}));
const __VLS_495 = __VLS_494({}, ...__VLS_functionalComponentArgsRest(__VLS_494));
const { default: __VLS_498 } = __VLS_496.slots;
let __VLS_499;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_500 = __VLS_asFunctionalComponent1(__VLS_499, new __VLS_499({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_501 = __VLS_500({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_500));
let __VLS_504;
const __VLS_505 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.dialogOpen = false;
            // @ts-ignore
            [dialogOpen, formData, formData,];
        } });
const { default: __VLS_506 } = __VLS_502.slots;
// @ts-ignore
[];
var __VLS_502;
var __VLS_503;
let __VLS_507;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_508 = __VLS_asFunctionalComponent1(__VLS_507, new __VLS_507({
    ...{ 'onClick': {} },
}));
const __VLS_509 = __VLS_508({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_508));
let __VLS_512;
const __VLS_513 = ({ click: {} },
    { onClick: (__VLS_ctx.handleSubmit) });
const { default: __VLS_514 } = __VLS_510.slots;
// @ts-ignore
[handleSubmit,];
var __VLS_510;
var __VLS_511;
// @ts-ignore
[];
var __VLS_496;
// @ts-ignore
[];
var __VLS_401;
// @ts-ignore
[];
var __VLS_393;
var __VLS_394;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map