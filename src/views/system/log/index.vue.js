import { ref, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import LogAPI from "@/api/system/log";
const { t } = useI18n();
// ==================== 查询参数 ====================
const queryParams = reactive({
    pageNum: 1,
    pageSize: 10,
    keywords: "",
});
const startDate = ref("");
const endDate = ref("");
// ==================== 列表 ====================
const loading = ref(false);
const logList = ref([]);
const total = ref(0);
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
        const params = { ...queryParams };
        if (startDate.value && endDate.value) {
            params.createTime = [startDate.value, endDate.value];
        }
        const result = await LogAPI.getPage(params);
        logList.value = result.list ?? [];
        total.value = result.total ?? 0;
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
    startDate.value = "";
    endDate.value = "";
    handleQuery();
}
// ==================== 详情 ====================
const detailVisible = ref(false);
const detailData = ref(null);
function handleDetail(row) {
    detailData.value = row;
    detailVisible.value = true;
}
// ==================== 辅助方法 ====================
/** HTTP 方法对应的 Badge 变体 */
function getMethodVariant(method) {
    const map = {
        GET: "outline",
        POST: "default",
        PUT: "secondary",
        DELETE: "destructive",
        PATCH: "outline",
    };
    return map[method?.toUpperCase() ?? ""] ?? "outline";
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
    placeholder: (__VLS_ctx.t('log.keywordPlaceholder')),
    ...{ class: "w-60" },
}));
const __VLS_14 = __VLS_13({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.queryParams.keywords),
    modelModifiers: { trim: true, },
    placeholder: (__VLS_ctx.t('log.keywordPlaceholder')),
    ...{ class: "w-60" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_17;
const __VLS_18 = ({ keyup: {} },
    { onKeyup: (__VLS_ctx.handleQuery) });
/** @type {__VLS_StyleScopedClasses['w-60']} */ ;
var __VLS_15;
var __VLS_16;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-1.5" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    modelValue: (__VLS_ctx.startDate),
    type: "date",
    ...{ class: "w-40" },
    placeholder: (__VLS_ctx.t('log.startDate')),
}));
const __VLS_21 = __VLS_20({
    modelValue: (__VLS_ctx.startDate),
    type: "date",
    ...{ class: "w-40" },
    placeholder: (__VLS_ctx.t('log.startDate')),
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {__VLS_StyleScopedClasses['w-40']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    modelValue: (__VLS_ctx.endDate),
    type: "date",
    ...{ class: "w-40" },
    placeholder: (__VLS_ctx.t('log.endDate')),
}));
const __VLS_26 = __VLS_25({
    modelValue: (__VLS_ctx.endDate),
    type: "date",
    ...{ class: "w-40" },
    placeholder: (__VLS_ctx.t('log.endDate')),
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
/** @type {__VLS_StyleScopedClasses['w-40']} */ ;
let __VLS_29;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
    ...{ 'onClick': {} },
}));
const __VLS_31 = __VLS_30({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
let __VLS_34;
const __VLS_35 = ({ click: {} },
    { onClick: (__VLS_ctx.handleQuery) });
const { default: __VLS_36 } = __VLS_32.slots;
(__VLS_ctx.t("log.search"));
// @ts-ignore
[queryParams, t, t, t, t, handleQuery, handleQuery, startDate, endDate,];
var __VLS_32;
var __VLS_33;
let __VLS_37;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_39 = __VLS_38({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
let __VLS_42;
const __VLS_43 = ({ click: {} },
    { onClick: (__VLS_ctx.handleResetQuery) });
const { default: __VLS_44 } = __VLS_40.slots;
(__VLS_ctx.t("log.reset"));
// @ts-ignore
[t, handleResetQuery,];
var __VLS_40;
var __VLS_41;
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({}));
const __VLS_47 = __VLS_46({}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const { default: __VLS_50 } = __VLS_48.slots;
let __VLS_51;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
    ...{ class: "pt-6" },
}));
const __VLS_53 = __VLS_52({
    ...{ class: "pt-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
/** @type {__VLS_StyleScopedClasses['pt-6']} */ ;
const { default: __VLS_56 } = __VLS_54.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "rounded-md border overflow-x-auto" },
});
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
let __VLS_57;
/** @ts-ignore @type { | typeof __VLS_components.Table | typeof __VLS_components.Table} */
Table;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({}));
const __VLS_59 = __VLS_58({}, ...__VLS_functionalComponentArgsRest(__VLS_58));
const { default: __VLS_62 } = __VLS_60.slots;
let __VLS_63;
/** @ts-ignore @type { | typeof __VLS_components.TableHeader | typeof __VLS_components.TableHeader} */
TableHeader;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({}));
const __VLS_65 = __VLS_64({}, ...__VLS_functionalComponentArgsRest(__VLS_64));
const { default: __VLS_68 } = __VLS_66.slots;
let __VLS_69;
/** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
TableRow;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({}));
const __VLS_71 = __VLS_70({}, ...__VLS_functionalComponentArgsRest(__VLS_70));
const { default: __VLS_74 } = __VLS_72.slots;
let __VLS_75;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
    ...{ class: "min-w-[180px]" },
}));
const __VLS_77 = __VLS_76({
    ...{ class: "min-w-[180px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
/** @type {__VLS_StyleScopedClasses['min-w-[180px]']} */ ;
const { default: __VLS_80 } = __VLS_78.slots;
(__VLS_ctx.t("log.logTitle"));
// @ts-ignore
[t,];
var __VLS_78;
let __VLS_81;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
    ...{ class: "w-20 text-center" },
}));
const __VLS_83 = __VLS_82({
    ...{ class: "w-20 text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_86 } = __VLS_84.slots;
(__VLS_ctx.t("log.status"));
// @ts-ignore
[t,];
var __VLS_84;
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
    ...{ class: "w-32" },
}));
const __VLS_89 = __VLS_88({
    ...{ class: "w-32" },
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
/** @type {__VLS_StyleScopedClasses['w-32']} */ ;
const { default: __VLS_92 } = __VLS_90.slots;
(__VLS_ctx.t("log.ipAddress"));
// @ts-ignore
[t,];
var __VLS_90;
let __VLS_93;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
    ...{ class: "min-w-[180px]" },
}));
const __VLS_95 = __VLS_94({
    ...{ class: "min-w-[180px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
/** @type {__VLS_StyleScopedClasses['min-w-[180px]']} */ ;
const { default: __VLS_98 } = __VLS_96.slots;
(__VLS_ctx.t("log.requestUri"));
// @ts-ignore
[t,];
var __VLS_96;
let __VLS_99;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
    ...{ class: "w-24 text-center" },
}));
const __VLS_101 = __VLS_100({
    ...{ class: "w-24 text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_104 } = __VLS_102.slots;
(__VLS_ctx.t("log.requestMethod"));
// @ts-ignore
[t,];
var __VLS_102;
let __VLS_105;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent1(__VLS_105, new __VLS_105({
    ...{ class: "w-28 text-center" },
}));
const __VLS_107 = __VLS_106({
    ...{ class: "w-28 text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
/** @type {__VLS_StyleScopedClasses['w-28']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_110 } = __VLS_108.slots;
(__VLS_ctx.t("log.executionTime"));
// @ts-ignore
[t,];
var __VLS_108;
let __VLS_111;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_112 = __VLS_asFunctionalComponent1(__VLS_111, new __VLS_111({
    ...{ class: "w-24" },
}));
const __VLS_113 = __VLS_112({
    ...{ class: "w-24" },
}, ...__VLS_functionalComponentArgsRest(__VLS_112));
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
const { default: __VLS_116 } = __VLS_114.slots;
(__VLS_ctx.t("log.operator"));
// @ts-ignore
[t,];
var __VLS_114;
let __VLS_117;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({
    ...{ class: "w-44" },
}));
const __VLS_119 = __VLS_118({
    ...{ class: "w-44" },
}, ...__VLS_functionalComponentArgsRest(__VLS_118));
/** @type {__VLS_StyleScopedClasses['w-44']} */ ;
const { default: __VLS_122 } = __VLS_120.slots;
(__VLS_ctx.t("log.createTime"));
// @ts-ignore
[t,];
var __VLS_120;
let __VLS_123;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_124 = __VLS_asFunctionalComponent1(__VLS_123, new __VLS_123({
    ...{ class: "w-20 text-center" },
}));
const __VLS_125 = __VLS_124({
    ...{ class: "w-20 text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_124));
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_128 } = __VLS_126.slots;
(__VLS_ctx.t("log.action"));
// @ts-ignore
[t,];
var __VLS_126;
// @ts-ignore
[];
var __VLS_72;
// @ts-ignore
[];
var __VLS_66;
let __VLS_129;
/** @ts-ignore @type { | typeof __VLS_components.TableBody | typeof __VLS_components.TableBody} */
TableBody;
// @ts-ignore
const __VLS_130 = __VLS_asFunctionalComponent1(__VLS_129, new __VLS_129({}));
const __VLS_131 = __VLS_130({}, ...__VLS_functionalComponentArgsRest(__VLS_130));
const { default: __VLS_134 } = __VLS_132.slots;
if (__VLS_ctx.loading) {
    let __VLS_135;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_136 = __VLS_asFunctionalComponent1(__VLS_135, new __VLS_135({}));
    const __VLS_137 = __VLS_136({}, ...__VLS_functionalComponentArgsRest(__VLS_136));
    const { default: __VLS_140 } = __VLS_138.slots;
    let __VLS_141;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_142 = __VLS_asFunctionalComponent1(__VLS_141, new __VLS_141({
        colspan: (9),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }));
    const __VLS_143 = __VLS_142({
        colspan: (9),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_142));
    /** @type {__VLS_StyleScopedClasses['h-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_146 } = __VLS_144.slots;
    (__VLS_ctx.t("log.loading"));
    // @ts-ignore
    [t, loading,];
    var __VLS_144;
    // @ts-ignore
    [];
    var __VLS_138;
}
else if (__VLS_ctx.logList.length === 0) {
    let __VLS_147;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_148 = __VLS_asFunctionalComponent1(__VLS_147, new __VLS_147({}));
    const __VLS_149 = __VLS_148({}, ...__VLS_functionalComponentArgsRest(__VLS_148));
    const { default: __VLS_152 } = __VLS_150.slots;
    let __VLS_153;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_154 = __VLS_asFunctionalComponent1(__VLS_153, new __VLS_153({
        colspan: (9),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }));
    const __VLS_155 = __VLS_154({
        colspan: (9),
        ...{ class: "h-24 text-center text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_154));
    /** @type {__VLS_StyleScopedClasses['h-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_158 } = __VLS_156.slots;
    (__VLS_ctx.t("log.noData"));
    // @ts-ignore
    [t, logList,];
    var __VLS_156;
    // @ts-ignore
    [];
    var __VLS_150;
}
for (const [log] of __VLS_vFor((__VLS_ctx.logList))) {
    let __VLS_159;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_160 = __VLS_asFunctionalComponent1(__VLS_159, new __VLS_159({
        key: (log.id),
        ...{ class: "hover:bg-muted/50" },
    }));
    const __VLS_161 = __VLS_160({
        key: (log.id),
        ...{ class: "hover:bg-muted/50" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_160));
    /** @type {__VLS_StyleScopedClasses['hover:bg-muted/50']} */ ;
    const { default: __VLS_164 } = __VLS_162.slots;
    let __VLS_165;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_166 = __VLS_asFunctionalComponent1(__VLS_165, new __VLS_165({}));
    const __VLS_167 = __VLS_166({}, ...__VLS_functionalComponentArgsRest(__VLS_166));
    const { default: __VLS_170 } = __VLS_168.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "truncate block max-w-[260px]" },
        title: (log.title),
    });
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    /** @type {__VLS_StyleScopedClasses['block']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-[260px]']} */ ;
    (log.title || "-");
    // @ts-ignore
    [logList,];
    var __VLS_168;
    let __VLS_171;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_172 = __VLS_asFunctionalComponent1(__VLS_171, new __VLS_171({
        ...{ class: "text-center" },
    }));
    const __VLS_173 = __VLS_172({
        ...{ class: "text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_172));
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_176 } = __VLS_174.slots;
    let __VLS_177;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_178 = __VLS_asFunctionalComponent1(__VLS_177, new __VLS_177({
        variant: (log.status === 1 ? 'default' : 'destructive'),
    }));
    const __VLS_179 = __VLS_178({
        variant: (log.status === 1 ? 'default' : 'destructive'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_178));
    const { default: __VLS_182 } = __VLS_180.slots;
    (log.status === 1 ? __VLS_ctx.t("log.statusSuccess") : __VLS_ctx.t("log.statusFail"));
    // @ts-ignore
    [t, t,];
    var __VLS_180;
    // @ts-ignore
    [];
    var __VLS_174;
    let __VLS_183;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_184 = __VLS_asFunctionalComponent1(__VLS_183, new __VLS_183({
        ...{ class: "text-sm text-muted-foreground" },
    }));
    const __VLS_185 = __VLS_184({
        ...{ class: "text-sm text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_184));
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_188 } = __VLS_186.slots;
    (log.ip || "-");
    // @ts-ignore
    [];
    var __VLS_186;
    let __VLS_189;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_190 = __VLS_asFunctionalComponent1(__VLS_189, new __VLS_189({}));
    const __VLS_191 = __VLS_190({}, ...__VLS_functionalComponentArgsRest(__VLS_190));
    const { default: __VLS_194 } = __VLS_192.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "truncate block max-w-[260px] font-mono text-xs text-muted-foreground" },
        title: (log.requestUri),
    });
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    /** @type {__VLS_StyleScopedClasses['block']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-[260px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (log.requestUri || "-");
    // @ts-ignore
    [];
    var __VLS_192;
    let __VLS_195;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_196 = __VLS_asFunctionalComponent1(__VLS_195, new __VLS_195({
        ...{ class: "text-center" },
    }));
    const __VLS_197 = __VLS_196({
        ...{ class: "text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_196));
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_200 } = __VLS_198.slots;
    let __VLS_201;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_202 = __VLS_asFunctionalComponent1(__VLS_201, new __VLS_201({
        variant: (__VLS_ctx.getMethodVariant(log.requestMethod)),
        ...{ class: "font-mono text-xs" },
    }));
    const __VLS_203 = __VLS_202({
        variant: (__VLS_ctx.getMethodVariant(log.requestMethod)),
        ...{ class: "font-mono text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_202));
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    const { default: __VLS_206 } = __VLS_204.slots;
    (log.requestMethod || "-");
    // @ts-ignore
    [getMethodVariant,];
    var __VLS_204;
    // @ts-ignore
    [];
    var __VLS_198;
    let __VLS_207;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_208 = __VLS_asFunctionalComponent1(__VLS_207, new __VLS_207({
        ...{ class: "text-center text-sm" },
    }));
    const __VLS_209 = __VLS_208({
        ...{ class: "text-center text-sm" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_208));
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    const { default: __VLS_212 } = __VLS_210.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: (log.executionTime && log.executionTime > 1000
                ? 'text-destructive font-medium'
                : 'text-muted-foreground') },
    });
    (log.executionTime ?? "-");
    // @ts-ignore
    [];
    var __VLS_210;
    let __VLS_213;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_214 = __VLS_asFunctionalComponent1(__VLS_213, new __VLS_213({
        ...{ class: "text-sm" },
    }));
    const __VLS_215 = __VLS_214({
        ...{ class: "text-sm" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_214));
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    const { default: __VLS_218 } = __VLS_216.slots;
    (log.operatorName || "-");
    // @ts-ignore
    [];
    var __VLS_216;
    let __VLS_219;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_220 = __VLS_asFunctionalComponent1(__VLS_219, new __VLS_219({
        ...{ class: "text-sm text-muted-foreground" },
    }));
    const __VLS_221 = __VLS_220({
        ...{ class: "text-sm text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_220));
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    const { default: __VLS_224 } = __VLS_222.slots;
    (log.createTime || "-");
    // @ts-ignore
    [];
    var __VLS_222;
    let __VLS_225;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_226 = __VLS_asFunctionalComponent1(__VLS_225, new __VLS_225({
        ...{ class: "text-center" },
    }));
    const __VLS_227 = __VLS_226({
        ...{ class: "text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_226));
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_230 } = __VLS_228.slots;
    let __VLS_231;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_232 = __VLS_asFunctionalComponent1(__VLS_231, new __VLS_231({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs" },
    }));
    const __VLS_233 = __VLS_232({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_232));
    let __VLS_236;
    const __VLS_237 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleDetail(log);
                // @ts-ignore
                [handleDetail,];
            } });
    /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    const { default: __VLS_238 } = __VLS_234.slots;
    (__VLS_ctx.t("log.detail"));
    // @ts-ignore
    [t,];
    var __VLS_234;
    var __VLS_235;
    // @ts-ignore
    [];
    var __VLS_228;
    // @ts-ignore
    [];
    var __VLS_162;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_132;
// @ts-ignore
[];
var __VLS_60;
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
    (__VLS_ctx.t("log.total", { count: __VLS_ctx.total }));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    let __VLS_239;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_240 = __VLS_asFunctionalComponent1(__VLS_239, new __VLS_239({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.queryParams.pageNum <= 1),
    }));
    const __VLS_241 = __VLS_240({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.queryParams.pageNum <= 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_240));
    let __VLS_244;
    const __VLS_245 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.total > 0))
                    return;
                __VLS_ctx.goPage(__VLS_ctx.queryParams.pageNum - 1);
                // @ts-ignore
                [queryParams, queryParams, t, total, total, goPage,];
            } });
    const { default: __VLS_246 } = __VLS_242.slots;
    // @ts-ignore
    [];
    var __VLS_242;
    var __VLS_243;
    for (const [page] of __VLS_vFor((__VLS_ctx.displayedPages))) {
        let __VLS_247;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_248 = __VLS_asFunctionalComponent1(__VLS_247, new __VLS_247({
            ...{ 'onClick': {} },
            key: (page),
            variant: (page === __VLS_ctx.queryParams.pageNum ? 'default' : 'outline'),
            size: "sm",
            ...{ class: "min-w-8" },
        }));
        const __VLS_249 = __VLS_248({
            ...{ 'onClick': {} },
            key: (page),
            variant: (page === __VLS_ctx.queryParams.pageNum ? 'default' : 'outline'),
            size: "sm",
            ...{ class: "min-w-8" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_248));
        let __VLS_252;
        const __VLS_253 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.total > 0))
                        return;
                    __VLS_ctx.goPage(page);
                    // @ts-ignore
                    [queryParams, goPage, displayedPages,];
                } });
        /** @type {__VLS_StyleScopedClasses['min-w-8']} */ ;
        const { default: __VLS_254 } = __VLS_250.slots;
        (page);
        // @ts-ignore
        [];
        var __VLS_250;
        var __VLS_251;
        // @ts-ignore
        [];
    }
    let __VLS_255;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_256 = __VLS_asFunctionalComponent1(__VLS_255, new __VLS_255({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.queryParams.pageNum >= __VLS_ctx.totalPages),
    }));
    const __VLS_257 = __VLS_256({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
        disabled: (__VLS_ctx.queryParams.pageNum >= __VLS_ctx.totalPages),
    }, ...__VLS_functionalComponentArgsRest(__VLS_256));
    let __VLS_260;
    const __VLS_261 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.total > 0))
                    return;
                __VLS_ctx.goPage(__VLS_ctx.queryParams.pageNum + 1);
                // @ts-ignore
                [queryParams, queryParams, goPage, totalPages,];
            } });
    const { default: __VLS_262 } = __VLS_258.slots;
    // @ts-ignore
    [];
    var __VLS_258;
    var __VLS_259;
}
// @ts-ignore
[];
var __VLS_54;
// @ts-ignore
[];
var __VLS_48;
let __VLS_263;
/** @ts-ignore @type { | typeof __VLS_components.Dialog | typeof __VLS_components.Dialog} */
Dialog;
// @ts-ignore
const __VLS_264 = __VLS_asFunctionalComponent1(__VLS_263, new __VLS_263({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.detailVisible),
}));
const __VLS_265 = __VLS_264({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.detailVisible),
}, ...__VLS_functionalComponentArgsRest(__VLS_264));
let __VLS_268;
const __VLS_269 = ({ 'update:open': {} },
    { 'onUpdate:open': ((v) => {
            if (!v)
                __VLS_ctx.detailVisible = false;
        }) });
const { default: __VLS_270 } = __VLS_266.slots;
let __VLS_271;
/** @ts-ignore @type { | typeof __VLS_components.DialogContent | typeof __VLS_components.DialogContent} */
DialogContent;
// @ts-ignore
const __VLS_272 = __VLS_asFunctionalComponent1(__VLS_271, new __VLS_271({
    ...{ class: "sm:max-w-2xl" },
}));
const __VLS_273 = __VLS_272({
    ...{ class: "sm:max-w-2xl" },
}, ...__VLS_functionalComponentArgsRest(__VLS_272));
/** @type {__VLS_StyleScopedClasses['sm:max-w-2xl']} */ ;
const { default: __VLS_276 } = __VLS_274.slots;
let __VLS_277;
/** @ts-ignore @type { | typeof __VLS_components.DialogHeader | typeof __VLS_components.DialogHeader} */
DialogHeader;
// @ts-ignore
const __VLS_278 = __VLS_asFunctionalComponent1(__VLS_277, new __VLS_277({}));
const __VLS_279 = __VLS_278({}, ...__VLS_functionalComponentArgsRest(__VLS_278));
const { default: __VLS_282 } = __VLS_280.slots;
let __VLS_283;
/** @ts-ignore @type { | typeof __VLS_components.DialogTitle | typeof __VLS_components.DialogTitle} */
DialogTitle;
// @ts-ignore
const __VLS_284 = __VLS_asFunctionalComponent1(__VLS_283, new __VLS_283({}));
const __VLS_285 = __VLS_284({}, ...__VLS_functionalComponentArgsRest(__VLS_284));
const { default: __VLS_288 } = __VLS_286.slots;
(__VLS_ctx.t("log.detailTitle"));
// @ts-ignore
[t, detailVisible, detailVisible,];
var __VLS_286;
// @ts-ignore
[];
var __VLS_280;
if (__VLS_ctx.detailData) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-3 py-2" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-[100px_1fr] gap-2 items-start" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-[100px_1fr]']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("log.logTitle"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm font-medium" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    (__VLS_ctx.detailData.title || "-");
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-2 gap-4" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-[100px_1fr] gap-2 items-center" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-[100px_1fr]']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("log.status"));
    let __VLS_289;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_290 = __VLS_asFunctionalComponent1(__VLS_289, new __VLS_289({
        variant: (__VLS_ctx.detailData.status === 1 ? 'default' : 'destructive'),
    }));
    const __VLS_291 = __VLS_290({
        variant: (__VLS_ctx.detailData.status === 1 ? 'default' : 'destructive'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_290));
    const { default: __VLS_294 } = __VLS_292.slots;
    (__VLS_ctx.detailData.status === 1 ? __VLS_ctx.t("log.statusSuccess") : __VLS_ctx.t("log.statusFail"));
    // @ts-ignore
    [t, t, t, t, detailData, detailData, detailData, detailData,];
    var __VLS_292;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-[100px_1fr] gap-2 items-center" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-[100px_1fr]']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("log.executionTime"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    (__VLS_ctx.detailData.executionTime);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-2 gap-4" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-[100px_1fr] gap-2 items-center" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-[100px_1fr]']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("log.operator"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    (__VLS_ctx.detailData.operatorName || "-");
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-[100px_1fr] gap-2 items-center" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-[100px_1fr]']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("log.createTime"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    (__VLS_ctx.detailData.createTime || "-");
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-2 gap-4" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-[100px_1fr] gap-2 items-center" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-[100px_1fr]']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("log.ipAddress"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    (__VLS_ctx.detailData.ip || "-");
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-[100px_1fr] gap-2 items-center" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-[100px_1fr]']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("log.requestMethod"));
    let __VLS_295;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_296 = __VLS_asFunctionalComponent1(__VLS_295, new __VLS_295({
        variant: (__VLS_ctx.getMethodVariant(__VLS_ctx.detailData.requestMethod)),
        ...{ class: "font-mono text-xs" },
    }));
    const __VLS_297 = __VLS_296({
        variant: (__VLS_ctx.getMethodVariant(__VLS_ctx.detailData.requestMethod)),
        ...{ class: "font-mono text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_296));
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    const { default: __VLS_300 } = __VLS_298.slots;
    (__VLS_ctx.detailData.requestMethod || "-");
    // @ts-ignore
    [t, t, t, t, t, getMethodVariant, detailData, detailData, detailData, detailData, detailData, detailData,];
    var __VLS_298;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-[100px_1fr] gap-2 items-center" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-[100px_1fr]']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("log.requestUri"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm font-mono" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    (__VLS_ctx.detailData.requestUri || "-");
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-2 gap-4" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-[100px_1fr] gap-2 items-center" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-[100px_1fr]']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("log.browser"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    (__VLS_ctx.detailData.browser || "-");
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-[100px_1fr] gap-2 items-center" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-[100px_1fr]']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("log.os"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    (__VLS_ctx.detailData.os || "-");
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-[100px_1fr] gap-2 items-start" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-[100px_1fr]']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("log.content"));
    if (__VLS_ctx.detailData.content) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-sm whitespace-pre-wrap" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['whitespace-pre-wrap']} */ ;
        (__VLS_ctx.detailData.content);
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-sm text-muted-foreground" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        (__VLS_ctx.t("log.contentEmpty"));
    }
    if (__VLS_ctx.detailData.errorMsg) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "grid grid-cols-[100px_1fr] gap-2 items-start" },
        });
        /** @type {__VLS_StyleScopedClasses['grid']} */ ;
        /** @type {__VLS_StyleScopedClasses['grid-cols-[100px_1fr]']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-sm text-muted-foreground" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        (__VLS_ctx.t("log.errorMsg"));
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-sm text-destructive" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
        (__VLS_ctx.detailData.errorMsg);
    }
}
let __VLS_301;
/** @ts-ignore @type { | typeof __VLS_components.DialogFooter | typeof __VLS_components.DialogFooter} */
DialogFooter;
// @ts-ignore
const __VLS_302 = __VLS_asFunctionalComponent1(__VLS_301, new __VLS_301({}));
const __VLS_303 = __VLS_302({}, ...__VLS_functionalComponentArgsRest(__VLS_302));
const { default: __VLS_306 } = __VLS_304.slots;
let __VLS_307;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_308 = __VLS_asFunctionalComponent1(__VLS_307, new __VLS_307({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_309 = __VLS_308({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_308));
let __VLS_312;
const __VLS_313 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.detailVisible = false;
            // @ts-ignore
            [t, t, t, t, t, t, detailVisible, detailData, detailData, detailData, detailData, detailData, detailData, detailData,];
        } });
const { default: __VLS_314 } = __VLS_310.slots;
(__VLS_ctx.t("log.close", "关闭"));
// @ts-ignore
[t,];
var __VLS_310;
var __VLS_311;
// @ts-ignore
[];
var __VLS_304;
// @ts-ignore
[];
var __VLS_274;
// @ts-ignore
[];
var __VLS_266;
var __VLS_267;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map