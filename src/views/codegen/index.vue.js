import { ref, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { getTablePage, resetGenConfig } from "@/api/codegen";
import GeneratorSheet from "./GeneratorSheet.vue";
const { t } = useI18n();
const loading = ref(false);
const tableList = ref([]);
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
        const result = await getTablePage(queryParams);
        tableList.value = result.list;
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
// 代码生成向导
const sheetVisible = ref(false);
const sheetTitle = ref("");
const sheetTableName = ref("");
function handleOpenSheet(tableName) {
    sheetTableName.value = tableName;
    sheetTitle.value = `${t("codegen.generate")} - ${tableName}`;
    sheetVisible.value = true;
}
// 重置配置
const resetConfirmVisible = ref(false);
const pendingResetTable = ref("");
function handleResetConfig(tableName) {
    pendingResetTable.value = tableName;
    resetConfirmVisible.value = true;
}
async function confirmReset() {
    try {
        await resetGenConfig(pendingResetTable.value);
        toast.success(t("codegen.resetSuccess"));
    }
    finally {
        resetConfirmVisible.value = false;
        fetchList();
    }
}
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
    placeholder: (__VLS_ctx.t('codegen.keywordPlaceholder')),
    ...{ class: "w-60" },
}));
const __VLS_14 = __VLS_13({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.keywords),
    placeholder: (__VLS_ctx.t('codegen.keywordPlaceholder')),
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
(__VLS_ctx.t("codegen.search"));
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
(__VLS_ctx.t("codegen.reset"));
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
    ...{ class: "rounded-md border overflow-x-auto" },
});
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
let __VLS_47;
/** @ts-ignore @type { | typeof __VLS_components.Table | typeof __VLS_components.Table} */
Table;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({}));
const __VLS_49 = __VLS_48({}, ...__VLS_functionalComponentArgsRest(__VLS_48));
const { default: __VLS_52 } = __VLS_50.slots;
let __VLS_53;
/** @ts-ignore @type { | typeof __VLS_components.TableHeader | typeof __VLS_components.TableHeader} */
TableHeader;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({}));
const __VLS_55 = __VLS_54({}, ...__VLS_functionalComponentArgsRest(__VLS_54));
const { default: __VLS_58 } = __VLS_56.slots;
let __VLS_59;
/** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
TableRow;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({}));
const __VLS_61 = __VLS_60({}, ...__VLS_functionalComponentArgsRest(__VLS_60));
const { default: __VLS_64 } = __VLS_62.slots;
let __VLS_65;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
    ...{ class: "min-w-[160px]" },
}));
const __VLS_67 = __VLS_66({
    ...{ class: "min-w-[160px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
/** @type {__VLS_StyleScopedClasses['min-w-[160px]']} */ ;
const { default: __VLS_70 } = __VLS_68.slots;
(__VLS_ctx.t("codegen.tableName"));
// @ts-ignore
[t,];
var __VLS_68;
let __VLS_71;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({}));
const __VLS_73 = __VLS_72({}, ...__VLS_functionalComponentArgsRest(__VLS_72));
const { default: __VLS_76 } = __VLS_74.slots;
(__VLS_ctx.t("codegen.tableComment"));
// @ts-ignore
[t,];
var __VLS_74;
let __VLS_77;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
    ...{ class: "w-28" },
}));
const __VLS_79 = __VLS_78({
    ...{ class: "w-28" },
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
/** @type {__VLS_StyleScopedClasses['w-28']} */ ;
const { default: __VLS_82 } = __VLS_80.slots;
(__VLS_ctx.t("codegen.engine"));
// @ts-ignore
[t,];
var __VLS_80;
let __VLS_83;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
    ...{ class: "w-44" },
}));
const __VLS_85 = __VLS_84({
    ...{ class: "w-44" },
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
/** @type {__VLS_StyleScopedClasses['w-44']} */ ;
const { default: __VLS_88 } = __VLS_86.slots;
(__VLS_ctx.t("codegen.collation"));
// @ts-ignore
[t,];
var __VLS_86;
let __VLS_89;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent1(__VLS_89, new __VLS_89({
    ...{ class: "w-20 text-center" },
}));
const __VLS_91 = __VLS_90({
    ...{ class: "w-20 text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_94 } = __VLS_92.slots;
(__VLS_ctx.t("codegen.configured"));
// @ts-ignore
[t,];
var __VLS_92;
let __VLS_95;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent1(__VLS_95, new __VLS_95({
    ...{ class: "w-44" },
}));
const __VLS_97 = __VLS_96({
    ...{ class: "w-44" },
}, ...__VLS_functionalComponentArgsRest(__VLS_96));
/** @type {__VLS_StyleScopedClasses['w-44']} */ ;
const { default: __VLS_100 } = __VLS_98.slots;
(__VLS_ctx.t("codegen.createTime"));
// @ts-ignore
[t,];
var __VLS_98;
let __VLS_101;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent1(__VLS_101, new __VLS_101({
    ...{ class: "w-40 text-center" },
}));
const __VLS_103 = __VLS_102({
    ...{ class: "w-40 text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_102));
/** @type {__VLS_StyleScopedClasses['w-40']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_106 } = __VLS_104.slots;
(__VLS_ctx.t("codegen.action"));
// @ts-ignore
[t,];
var __VLS_104;
// @ts-ignore
[];
var __VLS_62;
// @ts-ignore
[];
var __VLS_56;
let __VLS_107;
/** @ts-ignore @type { | typeof __VLS_components.TableBody | typeof __VLS_components.TableBody} */
TableBody;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({}));
const __VLS_109 = __VLS_108({}, ...__VLS_functionalComponentArgsRest(__VLS_108));
const { default: __VLS_112 } = __VLS_110.slots;
if (__VLS_ctx.loading) {
    let __VLS_113;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_114 = __VLS_asFunctionalComponent1(__VLS_113, new __VLS_113({}));
    const __VLS_115 = __VLS_114({}, ...__VLS_functionalComponentArgsRest(__VLS_114));
    const { default: __VLS_118 } = __VLS_116.slots;
    let __VLS_119;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_120 = __VLS_asFunctionalComponent1(__VLS_119, new __VLS_119({
        colspan: (7),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }));
    const __VLS_121 = __VLS_120({
        colspan: (7),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_120));
    /** @type {__VLS_StyleScopedClasses['h-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_124 } = __VLS_122.slots;
    (__VLS_ctx.t("codegen.loading"));
    // @ts-ignore
    [t, loading,];
    var __VLS_122;
    // @ts-ignore
    [];
    var __VLS_116;
}
else if (__VLS_ctx.tableList.length === 0) {
    let __VLS_125;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_126 = __VLS_asFunctionalComponent1(__VLS_125, new __VLS_125({}));
    const __VLS_127 = __VLS_126({}, ...__VLS_functionalComponentArgsRest(__VLS_126));
    const { default: __VLS_130 } = __VLS_128.slots;
    let __VLS_131;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_132 = __VLS_asFunctionalComponent1(__VLS_131, new __VLS_131({
        colspan: (7),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }));
    const __VLS_133 = __VLS_132({
        colspan: (7),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_132));
    /** @type {__VLS_StyleScopedClasses['h-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_136 } = __VLS_134.slots;
    (__VLS_ctx.t("codegen.noData"));
    // @ts-ignore
    [t, tableList,];
    var __VLS_134;
    // @ts-ignore
    [];
    var __VLS_128;
}
for (const [table] of __VLS_vFor((__VLS_ctx.tableList))) {
    let __VLS_137;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_138 = __VLS_asFunctionalComponent1(__VLS_137, new __VLS_137({
        key: (table.tableName),
        ...{ class: "hover:bg-muted/50" },
    }));
    const __VLS_139 = __VLS_138({
        key: (table.tableName),
        ...{ class: "hover:bg-muted/50" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_138));
    /** @type {__VLS_StyleScopedClasses['hover:bg-muted/50']} */ ;
    const { default: __VLS_142 } = __VLS_140.slots;
    let __VLS_143;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_144 = __VLS_asFunctionalComponent1(__VLS_143, new __VLS_143({
        ...{ class: "font-mono text-sm" },
    }));
    const __VLS_145 = __VLS_144({
        ...{ class: "font-mono text-sm" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_144));
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    const { default: __VLS_148 } = __VLS_146.slots;
    (table.tableName);
    // @ts-ignore
    [tableList,];
    var __VLS_146;
    let __VLS_149;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_150 = __VLS_asFunctionalComponent1(__VLS_149, new __VLS_149({}));
    const __VLS_151 = __VLS_150({}, ...__VLS_functionalComponentArgsRest(__VLS_150));
    const { default: __VLS_154 } = __VLS_152.slots;
    (table.tableComment || "-");
    // @ts-ignore
    [];
    var __VLS_152;
    let __VLS_155;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_156 = __VLS_asFunctionalComponent1(__VLS_155, new __VLS_155({
        ...{ class: "text-sm text-muted-foreground" },
    }));
    const __VLS_157 = __VLS_156({
        ...{ class: "text-sm text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_156));
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_160 } = __VLS_158.slots;
    (table.engine);
    // @ts-ignore
    [];
    var __VLS_158;
    let __VLS_161;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_162 = __VLS_asFunctionalComponent1(__VLS_161, new __VLS_161({
        ...{ class: "text-sm text-muted-foreground" },
    }));
    const __VLS_163 = __VLS_162({
        ...{ class: "text-sm text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_162));
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_166 } = __VLS_164.slots;
    (table.tableCollation);
    // @ts-ignore
    [];
    var __VLS_164;
    let __VLS_167;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_168 = __VLS_asFunctionalComponent1(__VLS_167, new __VLS_167({
        ...{ class: "text-center" },
    }));
    const __VLS_169 = __VLS_168({
        ...{ class: "text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_168));
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_172 } = __VLS_170.slots;
    let __VLS_173;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_174 = __VLS_asFunctionalComponent1(__VLS_173, new __VLS_173({
        variant: (table.isConfigured === 1 ? 'default' : 'secondary'),
    }));
    const __VLS_175 = __VLS_174({
        variant: (table.isConfigured === 1 ? 'default' : 'secondary'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_174));
    const { default: __VLS_178 } = __VLS_176.slots;
    (table.isConfigured === 1
        ? __VLS_ctx.t("codegen.configured")
        : __VLS_ctx.t("codegen.notConfigured"));
    // @ts-ignore
    [t, t,];
    var __VLS_176;
    // @ts-ignore
    [];
    var __VLS_170;
    let __VLS_179;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_180 = __VLS_asFunctionalComponent1(__VLS_179, new __VLS_179({
        ...{ class: "text-sm text-muted-foreground" },
    }));
    const __VLS_181 = __VLS_180({
        ...{ class: "text-sm text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_180));
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_184 } = __VLS_182.slots;
    (table.createTime);
    // @ts-ignore
    [];
    var __VLS_182;
    let __VLS_185;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_186 = __VLS_asFunctionalComponent1(__VLS_185, new __VLS_185({
        ...{ class: "text-center" },
    }));
    const __VLS_187 = __VLS_186({
        ...{ class: "text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_186));
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_190 } = __VLS_188.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-center gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    let __VLS_191;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_192 = __VLS_asFunctionalComponent1(__VLS_191, new __VLS_191({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs" },
    }));
    const __VLS_193 = __VLS_192({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_192));
    let __VLS_196;
    const __VLS_197 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleOpenSheet(table.tableName);
                // @ts-ignore
                [handleOpenSheet,];
            } });
    /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    const { default: __VLS_198 } = __VLS_194.slots;
    (__VLS_ctx.t("codegen.generate"));
    // @ts-ignore
    [t,];
    var __VLS_194;
    var __VLS_195;
    if (table.isConfigured === 1) {
        let __VLS_199;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_200 = __VLS_asFunctionalComponent1(__VLS_199, new __VLS_199({
            ...{ 'onClick': {} },
            variant: "ghost",
            size: "sm",
            ...{ class: "h-7 text-xs text-destructive hover:text-destructive" },
        }));
        const __VLS_201 = __VLS_200({
            ...{ 'onClick': {} },
            variant: "ghost",
            size: "sm",
            ...{ class: "h-7 text-xs text-destructive hover:text-destructive" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_200));
        let __VLS_204;
        const __VLS_205 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(table.isConfigured === 1))
                        return;
                    __VLS_ctx.handleResetConfig(table.tableName);
                    // @ts-ignore
                    [handleResetConfig,];
                } });
        /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:text-destructive']} */ ;
        const { default: __VLS_206 } = __VLS_202.slots;
        (__VLS_ctx.t("codegen.resetConfig"));
        // @ts-ignore
        [t,];
        var __VLS_202;
        var __VLS_203;
    }
    // @ts-ignore
    [];
    var __VLS_188;
    // @ts-ignore
    [];
    var __VLS_140;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_110;
// @ts-ignore
[];
var __VLS_50;
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
    (__VLS_ctx.t("codegen.total", { count: __VLS_ctx.total }));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    let __VLS_207;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_208 = __VLS_asFunctionalComponent1(__VLS_207, new __VLS_207({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.queryParams.pageNum <= 1),
    }));
    const __VLS_209 = __VLS_208({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.queryParams.pageNum <= 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_208));
    let __VLS_212;
    const __VLS_213 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.total > 0))
                    return;
                __VLS_ctx.goPage(__VLS_ctx.queryParams.pageNum - 1);
                // @ts-ignore
                [queryParams, queryParams, t, total, total, goPage,];
            } });
    const { default: __VLS_214 } = __VLS_210.slots;
    // @ts-ignore
    [];
    var __VLS_210;
    var __VLS_211;
    for (const [page] of __VLS_vFor((__VLS_ctx.displayedPages))) {
        let __VLS_215;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_216 = __VLS_asFunctionalComponent1(__VLS_215, new __VLS_215({
            ...{ 'onClick': {} },
            key: (page),
            variant: (page === __VLS_ctx.queryParams.pageNum ? 'default' : 'outline'),
            size: "sm",
            ...{ class: "min-w-8" },
        }));
        const __VLS_217 = __VLS_216({
            ...{ 'onClick': {} },
            key: (page),
            variant: (page === __VLS_ctx.queryParams.pageNum ? 'default' : 'outline'),
            size: "sm",
            ...{ class: "min-w-8" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_216));
        let __VLS_220;
        const __VLS_221 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.total > 0))
                        return;
                    __VLS_ctx.goPage(page);
                    // @ts-ignore
                    [queryParams, goPage, displayedPages,];
                } });
        /** @type {__VLS_StyleScopedClasses['min-w-8']} */ ;
        const { default: __VLS_222 } = __VLS_218.slots;
        (page);
        // @ts-ignore
        [];
        var __VLS_218;
        var __VLS_219;
        // @ts-ignore
        [];
    }
    let __VLS_223;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_224 = __VLS_asFunctionalComponent1(__VLS_223, new __VLS_223({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.queryParams.pageNum >= __VLS_ctx.totalPages),
    }));
    const __VLS_225 = __VLS_224({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.queryParams.pageNum >= __VLS_ctx.totalPages),
    }, ...__VLS_functionalComponentArgsRest(__VLS_224));
    let __VLS_228;
    const __VLS_229 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.total > 0))
                    return;
                __VLS_ctx.goPage(__VLS_ctx.queryParams.pageNum + 1);
                // @ts-ignore
                [queryParams, queryParams, goPage, totalPages,];
            } });
    const { default: __VLS_230 } = __VLS_226.slots;
    // @ts-ignore
    [];
    var __VLS_226;
    var __VLS_227;
}
// @ts-ignore
[];
var __VLS_44;
// @ts-ignore
[];
var __VLS_38;
let __VLS_231;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialog | typeof __VLS_components.AlertDialog} */
AlertDialog;
// @ts-ignore
const __VLS_232 = __VLS_asFunctionalComponent1(__VLS_231, new __VLS_231({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.resetConfirmVisible),
}));
const __VLS_233 = __VLS_232({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.resetConfirmVisible),
}, ...__VLS_functionalComponentArgsRest(__VLS_232));
let __VLS_236;
const __VLS_237 = ({ 'update:open': {} },
    { 'onUpdate:open': ((v) => (__VLS_ctx.resetConfirmVisible = v)) });
const { default: __VLS_238 } = __VLS_234.slots;
let __VLS_239;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogContent | typeof __VLS_components.AlertDialogContent} */
AlertDialogContent;
// @ts-ignore
const __VLS_240 = __VLS_asFunctionalComponent1(__VLS_239, new __VLS_239({}));
const __VLS_241 = __VLS_240({}, ...__VLS_functionalComponentArgsRest(__VLS_240));
const { default: __VLS_244 } = __VLS_242.slots;
let __VLS_245;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogHeader | typeof __VLS_components.AlertDialogHeader} */
AlertDialogHeader;
// @ts-ignore
const __VLS_246 = __VLS_asFunctionalComponent1(__VLS_245, new __VLS_245({}));
const __VLS_247 = __VLS_246({}, ...__VLS_functionalComponentArgsRest(__VLS_246));
const { default: __VLS_250 } = __VLS_248.slots;
let __VLS_251;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogTitle | typeof __VLS_components.AlertDialogTitle} */
AlertDialogTitle;
// @ts-ignore
const __VLS_252 = __VLS_asFunctionalComponent1(__VLS_251, new __VLS_251({}));
const __VLS_253 = __VLS_252({}, ...__VLS_functionalComponentArgsRest(__VLS_252));
const { default: __VLS_256 } = __VLS_254.slots;
(__VLS_ctx.t("codegen.resetWarning"));
// @ts-ignore
[t, resetConfirmVisible, resetConfirmVisible,];
var __VLS_254;
let __VLS_257;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogDescription | typeof __VLS_components.AlertDialogDescription} */
AlertDialogDescription;
// @ts-ignore
const __VLS_258 = __VLS_asFunctionalComponent1(__VLS_257, new __VLS_257({}));
const __VLS_259 = __VLS_258({}, ...__VLS_functionalComponentArgsRest(__VLS_258));
const { default: __VLS_262 } = __VLS_260.slots;
(__VLS_ctx.t("codegen.resetConfirm"));
// @ts-ignore
[t,];
var __VLS_260;
// @ts-ignore
[];
var __VLS_248;
let __VLS_263;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogFooter | typeof __VLS_components.AlertDialogFooter} */
AlertDialogFooter;
// @ts-ignore
const __VLS_264 = __VLS_asFunctionalComponent1(__VLS_263, new __VLS_263({}));
const __VLS_265 = __VLS_264({}, ...__VLS_functionalComponentArgsRest(__VLS_264));
const { default: __VLS_268 } = __VLS_266.slots;
let __VLS_269;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogCancel | typeof __VLS_components.AlertDialogCancel} */
AlertDialogCancel;
// @ts-ignore
const __VLS_270 = __VLS_asFunctionalComponent1(__VLS_269, new __VLS_269({
    ...{ 'onClick': {} },
}));
const __VLS_271 = __VLS_270({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_270));
let __VLS_274;
const __VLS_275 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.resetConfirmVisible = false;
            // @ts-ignore
            [resetConfirmVisible,];
        } });
const { default: __VLS_276 } = __VLS_272.slots;
(__VLS_ctx.t("codegen.cancel"));
// @ts-ignore
[t,];
var __VLS_272;
var __VLS_273;
let __VLS_277;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogAction | typeof __VLS_components.AlertDialogAction} */
AlertDialogAction;
// @ts-ignore
const __VLS_278 = __VLS_asFunctionalComponent1(__VLS_277, new __VLS_277({
    ...{ 'onClick': {} },
}));
const __VLS_279 = __VLS_278({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_278));
let __VLS_282;
const __VLS_283 = ({ click: {} },
    { onClick: (__VLS_ctx.confirmReset) });
const { default: __VLS_284 } = __VLS_280.slots;
(__VLS_ctx.t("codegen.confirm"));
// @ts-ignore
[t, confirmReset,];
var __VLS_280;
var __VLS_281;
// @ts-ignore
[];
var __VLS_266;
// @ts-ignore
[];
var __VLS_242;
// @ts-ignore
[];
var __VLS_234;
var __VLS_235;
const __VLS_285 = GeneratorSheet;
// @ts-ignore
const __VLS_286 = __VLS_asFunctionalComponent1(__VLS_285, new __VLS_285({
    visible: (__VLS_ctx.sheetVisible),
    title: (__VLS_ctx.sheetTitle),
    tableName: (__VLS_ctx.sheetTableName),
}));
const __VLS_287 = __VLS_286({
    visible: (__VLS_ctx.sheetVisible),
    title: (__VLS_ctx.sheetTitle),
    tableName: (__VLS_ctx.sheetTableName),
}, ...__VLS_functionalComponentArgsRest(__VLS_286));
// @ts-ignore
[sheetVisible, sheetTitle, sheetTableName,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map