import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
const genderOptions = [
    { value: 1, label: "男", tagVariant: "default" },
    { value: 2, label: "女", tagVariant: "secondary" },
    { value: 0, label: "保密", tagVariant: "outline" },
];
const stringValue = ref("1");
const numberValue = ref(1);
const radioValue = ref(1);
const arrayValue = ref([1, 2]);
function toggleCheck(val) {
    const idx = arrayValue.value.indexOf(val);
    if (idx >= 0)
        arrayValue.value.splice(idx, 1);
    else
        arrayValue.value.push(val);
}
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
var __VLS_9;
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    ...{ class: "space-y-4" },
}));
const __VLS_20 = __VLS_19({
    ...{ class: "space-y-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
const { default: __VLS_23 } = __VLS_21.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    ...{ class: "w-28 text-sm" },
}));
const __VLS_26 = __VLS_25({
    ...{ class: "w-28 text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
/** @type {__VLS_StyleScopedClasses['w-28']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_29 } = __VLS_27.slots;
var __VLS_27;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    modelValue: (__VLS_ctx.stringValue),
}));
const __VLS_32 = __VLS_31({
    modelValue: (__VLS_ctx.stringValue),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    ...{ class: "w-40 h-8" },
}));
const __VLS_38 = __VLS_37({
    ...{ class: "w-40 h-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
/** @type {__VLS_StyleScopedClasses['w-40']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
const { default: __VLS_41 } = __VLS_39.slots;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    placeholder: "请选择",
}));
const __VLS_44 = __VLS_43({
    placeholder: "请选择",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
// @ts-ignore
[stringValue,];
var __VLS_39;
let __VLS_47;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({}));
const __VLS_49 = __VLS_48({}, ...__VLS_functionalComponentArgsRest(__VLS_48));
const { default: __VLS_52 } = __VLS_50.slots;
for (const [item] of __VLS_vFor((__VLS_ctx.genderOptions))) {
    let __VLS_53;
    /** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
    SelectItem;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
        key: (item.value),
        value: (item.value),
    }));
    const __VLS_55 = __VLS_54({
        key: (item.value),
        value: (item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    const { default: __VLS_58 } = __VLS_56.slots;
    (item.label);
    // @ts-ignore
    [genderOptions,];
    var __VLS_56;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_50;
// @ts-ignore
[];
var __VLS_33;
__VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({
    ...{ class: "text-xs bg-muted px-2 py-1 rounded" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
(__VLS_ctx.stringValue);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
let __VLS_59;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
    ...{ class: "w-28 text-sm" },
}));
const __VLS_61 = __VLS_60({
    ...{ class: "w-28 text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
/** @type {__VLS_StyleScopedClasses['w-28']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_64 } = __VLS_62.slots;
// @ts-ignore
[stringValue,];
var __VLS_62;
let __VLS_65;
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
    modelValue: (__VLS_ctx.numberValue),
    modelModifiers: { number: true, },
}));
const __VLS_67 = __VLS_66({
    modelValue: (__VLS_ctx.numberValue),
    modelModifiers: { number: true, },
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
const { default: __VLS_70 } = __VLS_68.slots;
let __VLS_71;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({
    ...{ class: "w-40 h-8" },
}));
const __VLS_73 = __VLS_72({
    ...{ class: "w-40 h-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_72));
/** @type {__VLS_StyleScopedClasses['w-40']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
const { default: __VLS_76 } = __VLS_74.slots;
let __VLS_77;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
    placeholder: "请选择",
}));
const __VLS_79 = __VLS_78({
    placeholder: "请选择",
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
// @ts-ignore
[numberValue,];
var __VLS_74;
let __VLS_82;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({}));
const __VLS_84 = __VLS_83({}, ...__VLS_functionalComponentArgsRest(__VLS_83));
const { default: __VLS_87 } = __VLS_85.slots;
for (const [item] of __VLS_vFor((__VLS_ctx.genderOptions))) {
    let __VLS_88;
    /** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
    SelectItem;
    // @ts-ignore
    const __VLS_89 = __VLS_asFunctionalComponent1(__VLS_88, new __VLS_88({
        key: (item.value),
        value: (item.value),
    }));
    const __VLS_90 = __VLS_89({
        key: (item.value),
        value: (item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_89));
    const { default: __VLS_93 } = __VLS_91.slots;
    (item.label);
    // @ts-ignore
    [genderOptions,];
    var __VLS_91;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_85;
// @ts-ignore
[];
var __VLS_68;
__VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({
    ...{ class: "text-xs bg-muted px-2 py-1 rounded" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
(__VLS_ctx.numberValue);
// @ts-ignore
[numberValue,];
var __VLS_21;
// @ts-ignore
[];
var __VLS_3;
let __VLS_94;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent1(__VLS_94, new __VLS_94({}));
const __VLS_96 = __VLS_95({}, ...__VLS_functionalComponentArgsRest(__VLS_95));
const { default: __VLS_99 } = __VLS_97.slots;
let __VLS_100;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({}));
const __VLS_102 = __VLS_101({}, ...__VLS_functionalComponentArgsRest(__VLS_101));
const { default: __VLS_105 } = __VLS_103.slots;
let __VLS_106;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent1(__VLS_106, new __VLS_106({
    ...{ class: "text-sm" },
}));
const __VLS_108 = __VLS_107({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_107));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_111 } = __VLS_109.slots;
// @ts-ignore
[];
var __VLS_109;
// @ts-ignore
[];
var __VLS_103;
let __VLS_112;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_113 = __VLS_asFunctionalComponent1(__VLS_112, new __VLS_112({}));
const __VLS_114 = __VLS_113({}, ...__VLS_functionalComponentArgsRest(__VLS_113));
const { default: __VLS_117 } = __VLS_115.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-4" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
let __VLS_118;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({
    ...{ class: "w-28 text-sm" },
}));
const __VLS_120 = __VLS_119({
    ...{ class: "w-28 text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
/** @type {__VLS_StyleScopedClasses['w-28']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_123 } = __VLS_121.slots;
// @ts-ignore
[];
var __VLS_121;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.genderOptions))) {
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
    (__VLS_ctx.radioValue);
    /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
    (item.label);
    // @ts-ignore
    [genderOptions, radioValue,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({
    ...{ class: "text-xs bg-muted px-2 py-1 rounded" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
(__VLS_ctx.radioValue);
// @ts-ignore
[radioValue,];
var __VLS_115;
// @ts-ignore
[];
var __VLS_97;
let __VLS_124;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_125 = __VLS_asFunctionalComponent1(__VLS_124, new __VLS_124({}));
const __VLS_126 = __VLS_125({}, ...__VLS_functionalComponentArgsRest(__VLS_125));
const { default: __VLS_129 } = __VLS_127.slots;
let __VLS_130;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent1(__VLS_130, new __VLS_130({}));
const __VLS_132 = __VLS_131({}, ...__VLS_functionalComponentArgsRest(__VLS_131));
const { default: __VLS_135 } = __VLS_133.slots;
let __VLS_136;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_137 = __VLS_asFunctionalComponent1(__VLS_136, new __VLS_136({
    ...{ class: "text-sm" },
}));
const __VLS_138 = __VLS_137({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_137));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_141 } = __VLS_139.slots;
// @ts-ignore
[];
var __VLS_139;
// @ts-ignore
[];
var __VLS_133;
let __VLS_142;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_143 = __VLS_asFunctionalComponent1(__VLS_142, new __VLS_142({}));
const __VLS_144 = __VLS_143({}, ...__VLS_functionalComponentArgsRest(__VLS_143));
const { default: __VLS_147 } = __VLS_145.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-start gap-4" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
let __VLS_148;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_149 = __VLS_asFunctionalComponent1(__VLS_148, new __VLS_148({
    ...{ class: "w-28 text-sm mt-1" },
}));
const __VLS_150 = __VLS_149({
    ...{ class: "w-28 text-sm mt-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_149));
/** @type {__VLS_StyleScopedClasses['w-28']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
const { default: __VLS_153 } = __VLS_151.slots;
// @ts-ignore
[];
var __VLS_151;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.genderOptions))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        key: (item.value),
        ...{ class: "flex items-center gap-1.5 cursor-pointer text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    let __VLS_154;
    /** @ts-ignore @type { | typeof __VLS_components.Checkbox} */
    Checkbox;
    // @ts-ignore
    const __VLS_155 = __VLS_asFunctionalComponent1(__VLS_154, new __VLS_154({
        ...{ 'onUpdate:checked': {} },
        checked: (__VLS_ctx.arrayValue.includes(item.value)),
    }));
    const __VLS_156 = __VLS_155({
        ...{ 'onUpdate:checked': {} },
        checked: (__VLS_ctx.arrayValue.includes(item.value)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_155));
    let __VLS_159;
    const __VLS_160 = ({ 'update:checked': {} },
        { 'onUpdate:checked': (...[$event]) => {
                __VLS_ctx.toggleCheck(item.value);
                // @ts-ignore
                [genderOptions, arrayValue, toggleCheck,];
            } });
    var __VLS_157;
    var __VLS_158;
    (item.label);
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({
    ...{ class: "text-xs bg-muted px-2 py-1 rounded" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
(JSON.stringify(__VLS_ctx.arrayValue));
// @ts-ignore
[arrayValue,];
var __VLS_145;
// @ts-ignore
[];
var __VLS_127;
let __VLS_161;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_162 = __VLS_asFunctionalComponent1(__VLS_161, new __VLS_161({}));
const __VLS_163 = __VLS_162({}, ...__VLS_functionalComponentArgsRest(__VLS_162));
const { default: __VLS_166 } = __VLS_164.slots;
let __VLS_167;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_168 = __VLS_asFunctionalComponent1(__VLS_167, new __VLS_167({}));
const __VLS_169 = __VLS_168({}, ...__VLS_functionalComponentArgsRest(__VLS_168));
const { default: __VLS_172 } = __VLS_170.slots;
let __VLS_173;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_174 = __VLS_asFunctionalComponent1(__VLS_173, new __VLS_173({
    ...{ class: "text-sm" },
}));
const __VLS_175 = __VLS_174({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_174));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_178 } = __VLS_176.slots;
// @ts-ignore
[];
var __VLS_176;
// @ts-ignore
[];
var __VLS_170;
let __VLS_179;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_180 = __VLS_asFunctionalComponent1(__VLS_179, new __VLS_179({}));
const __VLS_181 = __VLS_180({}, ...__VLS_functionalComponentArgsRest(__VLS_180));
const { default: __VLS_184 } = __VLS_182.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-wrap items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.genderOptions))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        key: (item.value),
        ...{ class: "flex items-center gap-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    let __VLS_185;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_186 = __VLS_asFunctionalComponent1(__VLS_185, new __VLS_185({
        variant: (item.tagVariant),
        ...{ class: "text-[10px]" },
    }));
    const __VLS_187 = __VLS_186({
        variant: (item.tagVariant),
        ...{ class: "text-[10px]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_186));
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    const { default: __VLS_190 } = __VLS_188.slots;
    (item.label);
    // @ts-ignore
    [genderOptions,];
    var __VLS_188;
    __VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({
        ...{ class: "text-xs text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (item.value);
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_182;
// @ts-ignore
[];
var __VLS_164;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=dictionary.vue.js.map