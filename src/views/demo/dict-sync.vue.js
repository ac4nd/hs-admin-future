import { ref, reactive, onMounted, onUnmounted } from "vue";
import { toast } from "vue-sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
const tagTypeOptions = [
    { value: "default", label: "default", variant: "default" },
    { value: "success", label: "success", variant: "default" },
    { value: "warning", label: "warning", variant: "secondary" },
    { value: "danger", label: "danger", variant: "destructive" },
    { value: "info", label: "info", variant: "outline" },
];
const tagVariantMap = {
    default: "default",
    success: "default",
    warning: "secondary",
    danger: "destructive",
    info: "outline",
};
const defaultDictItems = [
    { value: "1", label: "男", tagType: "default", sort: 1 },
    { value: "2", label: "女", tagType: "secondary", sort: 2 },
    { value: "0", label: "保密", tagType: "outline", sort: 3 },
];
const dictItems = ref([...defaultDictItems]);
const selectedValue = ref("1");
const lastUpdateTime = ref("-");
const syncConnected = ref(true);
const dictForm = reactive({
    dictCode: "gender",
    label: "男",
    value: "1",
    tagType: "default",
    sort: 1,
});
let syncTimer = null;
function resetForm() {
    const male = dictItems.value.find((d) => d.value === "1");
    if (male) {
        dictForm.label = male.label;
        dictForm.tagType = male.tagType;
        dictForm.sort = male.sort;
    }
}
function saveDict() {
    if (!dictForm.label.trim()) {
        toast.error("请输入标签名称");
        return;
    }
    const idx = dictItems.value.findIndex((d) => d.value === dictForm.value);
    if (idx >= 0) {
        dictItems.value[idx] = {
            value: dictForm.value,
            label: dictForm.label,
            tagType: dictForm.tagType,
            sort: dictForm.sort,
        };
    }
    lastUpdateTime.value = new Date().toLocaleString("zh-CN");
    toast.success("保存成功，字典数据已同步");
}
function refreshComponent() {
    toast.success("字典组件已刷新");
}
onMounted(() => {
    lastUpdateTime.value = new Date().toLocaleString("zh-CN");
    syncTimer = setInterval(() => {
        syncConnected.value = Math.random() > 0.05;
    }, 5000);
});
onUnmounted(() => {
    if (syncTimer)
        clearInterval(syncTimer);
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-5 space-y-5" },
});
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-5']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    ...{ class: "text-sm" },
}));
const __VLS_14 = __VLS_13({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_17 } = __VLS_15.slots;
var __VLS_15;
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
Badge;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    variant: (__VLS_ctx.syncConnected ? 'default' : 'destructive'),
    ...{ class: "text-[10px]" },
}));
const __VLS_20 = __VLS_19({
    variant: (__VLS_ctx.syncConnected ? 'default' : 'destructive'),
    ...{ class: "text-[10px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
const { default: __VLS_23 } = __VLS_21.slots;
(__VLS_ctx.syncConnected ? "已连接" : "未连接");
// @ts-ignore
[syncConnected, syncConnected,];
var __VLS_21;
// @ts-ignore
[];
var __VLS_9;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const { default: __VLS_29 } = __VLS_27.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-3 mb-4 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400 text-sm" },
});
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-500/10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-blue-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-1 lg:grid-cols-3 gap-5" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({}));
const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    ...{ class: "pb-3" },
}));
const __VLS_38 = __VLS_37({
    ...{ class: "pb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
/** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
const { default: __VLS_41 } = __VLS_39.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    ...{ class: "text-sm" },
}));
const __VLS_44 = __VLS_43({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_47 } = __VLS_45.slots;
// @ts-ignore
[];
var __VLS_45;
let __VLS_48;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}));
const __VLS_50 = __VLS_49({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
let __VLS_53;
const __VLS_54 = ({ click: {} },
    { onClick: (__VLS_ctx.resetForm) });
const { default: __VLS_55 } = __VLS_51.slots;
// @ts-ignore
[resetForm,];
var __VLS_51;
var __VLS_52;
// @ts-ignore
[];
var __VLS_39;
let __VLS_56;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
    ...{ class: "space-y-3" },
}));
const __VLS_58 = __VLS_57({
    ...{ class: "space-y-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
const { default: __VLS_61 } = __VLS_59.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_62;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
    ...{ class: "text-xs" },
}));
const __VLS_64 = __VLS_63({
    ...{ class: "text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_67 } = __VLS_65.slots;
// @ts-ignore
[];
var __VLS_65;
let __VLS_68;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
    modelValue: (__VLS_ctx.dictForm.dictCode),
    disabled: true,
    ...{ class: "h-8 bg-muted" },
}));
const __VLS_70 = __VLS_69({
    modelValue: (__VLS_ctx.dictForm.dictCode),
    disabled: true,
    ...{ class: "h-8 bg-muted" },
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_73;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent1(__VLS_73, new __VLS_73({
    ...{ class: "text-xs" },
}));
const __VLS_75 = __VLS_74({
    ...{ class: "text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_78 } = __VLS_76.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-destructive" },
});
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
// @ts-ignore
[dictForm,];
var __VLS_76;
let __VLS_79;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
    modelValue: (__VLS_ctx.dictForm.label),
    placeholder: "请输入标签",
    ...{ class: "h-8" },
}));
const __VLS_81 = __VLS_80({
    modelValue: (__VLS_ctx.dictForm.label),
    placeholder: "请输入标签",
    ...{ class: "h-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_84;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
    ...{ class: "text-xs" },
}));
const __VLS_86 = __VLS_85({
    ...{ class: "text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_89 } = __VLS_87.slots;
// @ts-ignore
[dictForm,];
var __VLS_87;
let __VLS_90;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent1(__VLS_90, new __VLS_90({
    modelValue: (__VLS_ctx.dictForm.value),
    disabled: true,
    ...{ class: "h-8 bg-muted" },
}));
const __VLS_92 = __VLS_91({
    modelValue: (__VLS_ctx.dictForm.value),
    disabled: true,
    ...{ class: "h-8 bg-muted" },
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_95;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent1(__VLS_95, new __VLS_95({
    ...{ class: "text-xs" },
}));
const __VLS_97 = __VLS_96({
    ...{ class: "text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_96));
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_100 } = __VLS_98.slots;
// @ts-ignore
[dictForm,];
var __VLS_98;
let __VLS_101;
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent1(__VLS_101, new __VLS_101({
    modelValue: (__VLS_ctx.dictForm.tagType),
}));
const __VLS_103 = __VLS_102({
    modelValue: (__VLS_ctx.dictForm.tagType),
}, ...__VLS_functionalComponentArgsRest(__VLS_102));
const { default: __VLS_106 } = __VLS_104.slots;
let __VLS_107;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({
    ...{ class: "h-8" },
}));
const __VLS_109 = __VLS_108({
    ...{ class: "h-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_108));
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
const { default: __VLS_112 } = __VLS_110.slots;
let __VLS_113;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent1(__VLS_113, new __VLS_113({}));
const __VLS_115 = __VLS_114({}, ...__VLS_functionalComponentArgsRest(__VLS_114));
// @ts-ignore
[dictForm,];
var __VLS_110;
let __VLS_118;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({}));
const __VLS_120 = __VLS_119({}, ...__VLS_functionalComponentArgsRest(__VLS_119));
const { default: __VLS_123 } = __VLS_121.slots;
for (const [opt] of __VLS_vFor((__VLS_ctx.tagTypeOptions))) {
    let __VLS_124;
    /** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
    SelectItem;
    // @ts-ignore
    const __VLS_125 = __VLS_asFunctionalComponent1(__VLS_124, new __VLS_124({
        key: (opt.value),
        value: (opt.value),
    }));
    const __VLS_126 = __VLS_125({
        key: (opt.value),
        value: (opt.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_125));
    const { default: __VLS_129 } = __VLS_127.slots;
    let __VLS_130;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_131 = __VLS_asFunctionalComponent1(__VLS_130, new __VLS_130({
        variant: (opt.variant),
        ...{ class: "text-[10px]" },
    }));
    const __VLS_132 = __VLS_131({
        variant: (opt.variant),
        ...{ class: "text-[10px]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_131));
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    const { default: __VLS_135 } = __VLS_133.slots;
    (opt.label);
    // @ts-ignore
    [tagTypeOptions,];
    var __VLS_133;
    // @ts-ignore
    [];
    var __VLS_127;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_121;
// @ts-ignore
[];
var __VLS_104;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
let __VLS_136;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_137 = __VLS_asFunctionalComponent1(__VLS_136, new __VLS_136({
    ...{ class: "text-xs" },
}));
const __VLS_138 = __VLS_137({
    ...{ class: "text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_137));
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_141 } = __VLS_139.slots;
// @ts-ignore
[];
var __VLS_139;
let __VLS_142;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_143 = __VLS_asFunctionalComponent1(__VLS_142, new __VLS_142({
    modelValue: (__VLS_ctx.dictForm.sort),
    modelModifiers: { number: true, },
    type: "number",
    ...{ class: "h-8" },
}));
const __VLS_144 = __VLS_143({
    modelValue: (__VLS_ctx.dictForm.sort),
    modelModifiers: { number: true, },
    type: "number",
    ...{ class: "h-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_143));
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex gap-2 pt-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
let __VLS_147;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_148 = __VLS_asFunctionalComponent1(__VLS_147, new __VLS_147({
    ...{ 'onClick': {} },
    size: "sm",
}));
const __VLS_149 = __VLS_148({
    ...{ 'onClick': {} },
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_148));
let __VLS_152;
const __VLS_153 = ({ click: {} },
    { onClick: (__VLS_ctx.saveDict) });
const { default: __VLS_154 } = __VLS_150.slots;
// @ts-ignore
[dictForm, saveDict,];
var __VLS_150;
var __VLS_151;
let __VLS_155;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_156 = __VLS_asFunctionalComponent1(__VLS_155, new __VLS_155({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}));
const __VLS_157 = __VLS_156({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_156));
let __VLS_160;
const __VLS_161 = ({ click: {} },
    { onClick: (__VLS_ctx.resetForm) });
const { default: __VLS_162 } = __VLS_158.slots;
// @ts-ignore
[resetForm,];
var __VLS_158;
var __VLS_159;
// @ts-ignore
[];
var __VLS_59;
// @ts-ignore
[];
var __VLS_33;
let __VLS_163;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_164 = __VLS_asFunctionalComponent1(__VLS_163, new __VLS_163({}));
const __VLS_165 = __VLS_164({}, ...__VLS_functionalComponentArgsRest(__VLS_164));
const { default: __VLS_168 } = __VLS_166.slots;
let __VLS_169;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_170 = __VLS_asFunctionalComponent1(__VLS_169, new __VLS_169({
    ...{ class: "pb-3" },
}));
const __VLS_171 = __VLS_170({
    ...{ class: "pb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_170));
/** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
const { default: __VLS_174 } = __VLS_172.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
let __VLS_175;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_176 = __VLS_asFunctionalComponent1(__VLS_175, new __VLS_175({
    ...{ class: "text-sm" },
}));
const __VLS_177 = __VLS_176({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_176));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_180 } = __VLS_178.slots;
// @ts-ignore
[];
var __VLS_178;
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
    { onClick: (__VLS_ctx.refreshComponent) });
const { default: __VLS_188 } = __VLS_184.slots;
// @ts-ignore
[refreshComponent,];
var __VLS_184;
var __VLS_185;
// @ts-ignore
[];
var __VLS_172;
let __VLS_189;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_190 = __VLS_asFunctionalComponent1(__VLS_189, new __VLS_189({
    ...{ class: "space-y-4" },
}));
const __VLS_191 = __VLS_190({
    ...{ class: "space-y-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_190));
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
const { default: __VLS_194 } = __VLS_192.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-sm font-medium mb-2" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.dictItems))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        key: (item.value),
        ...{ class: "flex items-center gap-1.5 cursor-pointer text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        type: "radio",
        value: (item.value),
        ...{ class: "accent-primary" },
    });
    (__VLS_ctx.selectedValue);
    /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
    (item.label);
    // @ts-ignore
    [dictItems, selectedValue,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-sm font-medium mb-2" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-wrap gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.dictItems))) {
    let __VLS_195;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_196 = __VLS_asFunctionalComponent1(__VLS_195, new __VLS_195({
        key: (item.value),
        variant: (__VLS_ctx.tagVariantMap[item.tagType] || 'outline'),
        ...{ class: "text-[10px]" },
    }));
    const __VLS_197 = __VLS_196({
        key: (item.value),
        variant: (__VLS_ctx.tagVariantMap[item.tagType] || 'outline'),
        ...{ class: "text-[10px]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_196));
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    const { default: __VLS_200 } = __VLS_198.slots;
    (item.label);
    // @ts-ignore
    [dictItems, tagVariantMap,];
    var __VLS_198;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-sm font-medium mb-2" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
let __VLS_201;
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_202 = __VLS_asFunctionalComponent1(__VLS_201, new __VLS_201({
    modelValue: (__VLS_ctx.selectedValue),
}));
const __VLS_203 = __VLS_202({
    modelValue: (__VLS_ctx.selectedValue),
}, ...__VLS_functionalComponentArgsRest(__VLS_202));
const { default: __VLS_206 } = __VLS_204.slots;
let __VLS_207;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_208 = __VLS_asFunctionalComponent1(__VLS_207, new __VLS_207({
    ...{ class: "h-8 w-40" },
}));
const __VLS_209 = __VLS_208({
    ...{ class: "h-8 w-40" },
}, ...__VLS_functionalComponentArgsRest(__VLS_208));
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-40']} */ ;
const { default: __VLS_212 } = __VLS_210.slots;
let __VLS_213;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_214 = __VLS_asFunctionalComponent1(__VLS_213, new __VLS_213({
    placeholder: "请选择",
}));
const __VLS_215 = __VLS_214({
    placeholder: "请选择",
}, ...__VLS_functionalComponentArgsRest(__VLS_214));
// @ts-ignore
[selectedValue,];
var __VLS_210;
let __VLS_218;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_219 = __VLS_asFunctionalComponent1(__VLS_218, new __VLS_218({}));
const __VLS_220 = __VLS_219({}, ...__VLS_functionalComponentArgsRest(__VLS_219));
const { default: __VLS_223 } = __VLS_221.slots;
for (const [item] of __VLS_vFor((__VLS_ctx.dictItems))) {
    let __VLS_224;
    /** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
    SelectItem;
    // @ts-ignore
    const __VLS_225 = __VLS_asFunctionalComponent1(__VLS_224, new __VLS_224({
        key: (item.value),
        value: (item.value),
    }));
    const __VLS_226 = __VLS_225({
        key: (item.value),
        value: (item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_225));
    const { default: __VLS_229 } = __VLS_227.slots;
    (item.label);
    // @ts-ignore
    [dictItems,];
    var __VLS_227;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_221;
// @ts-ignore
[];
var __VLS_204;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pt-3 border-t text-xs text-muted-foreground space-y-1" },
});
/** @type {__VLS_StyleScopedClasses['pt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
(__VLS_ctx.selectedValue);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
(__VLS_ctx.lastUpdateTime);
// @ts-ignore
[selectedValue, lastUpdateTime,];
var __VLS_192;
// @ts-ignore
[];
var __VLS_166;
let __VLS_230;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_231 = __VLS_asFunctionalComponent1(__VLS_230, new __VLS_230({}));
const __VLS_232 = __VLS_231({}, ...__VLS_functionalComponentArgsRest(__VLS_231));
const { default: __VLS_235 } = __VLS_233.slots;
let __VLS_236;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_237 = __VLS_asFunctionalComponent1(__VLS_236, new __VLS_236({
    ...{ class: "pb-3" },
}));
const __VLS_238 = __VLS_237({
    ...{ class: "pb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_237));
/** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
const { default: __VLS_241 } = __VLS_239.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
let __VLS_242;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_243 = __VLS_asFunctionalComponent1(__VLS_242, new __VLS_242({
    ...{ class: "text-sm" },
}));
const __VLS_244 = __VLS_243({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_243));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_247 } = __VLS_245.slots;
// @ts-ignore
[];
var __VLS_245;
let __VLS_248;
/** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
Badge;
// @ts-ignore
const __VLS_249 = __VLS_asFunctionalComponent1(__VLS_248, new __VLS_248({
    variant: "outline",
    ...{ class: "text-[10px]" },
}));
const __VLS_250 = __VLS_249({
    variant: "outline",
    ...{ class: "text-[10px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_249));
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
const { default: __VLS_253 } = __VLS_251.slots;
(__VLS_ctx.dictItems.length);
// @ts-ignore
[dictItems,];
var __VLS_251;
// @ts-ignore
[];
var __VLS_239;
let __VLS_254;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_255 = __VLS_asFunctionalComponent1(__VLS_254, new __VLS_254({}));
const __VLS_256 = __VLS_255({}, ...__VLS_functionalComponentArgsRest(__VLS_255));
const { default: __VLS_259 } = __VLS_257.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.pre, __VLS_intrinsics.pre)({
    ...{ class: "p-3 rounded-lg bg-muted/50 text-xs font-mono overflow-auto max-h-[400px] whitespace-pre-wrap" },
});
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-muted/50']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-[400px]']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-pre-wrap']} */ ;
(JSON.stringify(__VLS_ctx.dictItems, null, 2));
// @ts-ignore
[dictItems,];
var __VLS_257;
// @ts-ignore
[];
var __VLS_233;
// @ts-ignore
[];
var __VLS_27;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=dict-sync.vue.js.map