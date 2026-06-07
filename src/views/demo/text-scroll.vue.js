import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextScroll from "./components/TextScroll.vue";
const customSpeed = ref(50);
const customDir = ref("left");
const customText = ref("这是一条可以自定义速度和内容的滚动公告");
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
const __VLS_24 = TextScroll;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    text: "这是一条基础的滚动公告，默认向左滚动",
}));
const __VLS_26 = __VLS_25({
    text: "这是一条基础的滚动公告，默认向左滚动",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const __VLS_29 = TextScroll;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
    type: "success",
    text: "这是一条成功类型的滚动公告",
}));
const __VLS_31 = __VLS_30({
    type: "success",
    text: "这是一条成功类型的滚动公告",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const __VLS_34 = TextScroll;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
    type: "warning",
    text: "这是一条警告类型的滚动公告",
}));
const __VLS_36 = __VLS_35({
    type: "warning",
    text: "这是一条警告类型的滚动公告",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
const __VLS_39 = TextScroll;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
    type: "danger",
    text: "这是一条危险类型的滚动公告",
}));
const __VLS_41 = __VLS_40({
    type: "danger",
    text: "这是一条危险类型的滚动公告",
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
const __VLS_44 = TextScroll;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
    type: "info",
    text: "这是一条信息类型的滚动公告",
}));
const __VLS_46 = __VLS_45({
    type: "info",
    text: "这是一条信息类型的滚动公告",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
const __VLS_49 = TextScroll;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
    text: "这是一条速度较慢、向右滚动的公告",
    speed: (30),
    direction: "right",
    showClose: true,
}));
const __VLS_51 = __VLS_50({
    text: "这是一条速度较慢、向右滚动的公告",
    speed: (30),
    direction: "right",
    showClose: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
var __VLS_21;
var __VLS_3;
let __VLS_54;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({}));
const __VLS_56 = __VLS_55({}, ...__VLS_functionalComponentArgsRest(__VLS_55));
const { default: __VLS_59 } = __VLS_57.slots;
let __VLS_60;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({}));
const __VLS_62 = __VLS_61({}, ...__VLS_functionalComponentArgsRest(__VLS_61));
const { default: __VLS_65 } = __VLS_63.slots;
let __VLS_66;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
    ...{ class: "text-sm" },
}));
const __VLS_68 = __VLS_67({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_71 } = __VLS_69.slots;
var __VLS_69;
var __VLS_63;
let __VLS_72;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
    ...{ class: "space-y-4" },
}));
const __VLS_74 = __VLS_73({
    ...{ class: "space-y-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
const { default: __VLS_77 } = __VLS_75.slots;
const __VLS_78 = TextScroll;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent1(__VLS_78, new __VLS_78({
    text: "欢迎使用 hs-admin-future 组件库，这里展示的是打字机逐字显示效果",
    typewriter: true,
}));
const __VLS_80 = __VLS_79({
    text: "欢迎使用 hs-admin-future 组件库，这里展示的是打字机逐字显示效果",
    typewriter: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
const __VLS_83 = TextScroll;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
    text: "支持自定义速度、方向和关闭按钮，可灵活配置",
    speed: (60),
    typewriter: true,
}));
const __VLS_85 = __VLS_84({
    text: "支持自定义速度、方向和关闭按钮，可灵活配置",
    speed: (60),
    typewriter: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
var __VLS_75;
var __VLS_57;
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
const __VLS_95 = __VLS_asFunctionalComponent1(__VLS_94, new __VLS_94({}));
const __VLS_96 = __VLS_95({}, ...__VLS_functionalComponentArgsRest(__VLS_95));
const { default: __VLS_99 } = __VLS_97.slots;
let __VLS_100;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({
    ...{ class: "text-sm" },
}));
const __VLS_102 = __VLS_101({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_101));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_105 } = __VLS_103.slots;
var __VLS_103;
var __VLS_97;
let __VLS_106;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent1(__VLS_106, new __VLS_106({
    ...{ class: "space-y-3" },
}));
const __VLS_108 = __VLS_107({
    ...{ class: "space-y-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_107));
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
const { default: __VLS_111 } = __VLS_109.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-4 text-sm" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
let __VLS_112;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_113 = __VLS_asFunctionalComponent1(__VLS_112, new __VLS_112({
    ...{ class: "w-20" },
}));
const __VLS_114 = __VLS_113({
    ...{ class: "w-20" },
}, ...__VLS_functionalComponentArgsRest(__VLS_113));
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
const { default: __VLS_117 } = __VLS_115.slots;
var __VLS_115;
let __VLS_118;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({
    modelValue: (__VLS_ctx.customSpeed),
    modelModifiers: { number: true, },
    type: "number",
    ...{ class: "w-24 h-8" },
}));
const __VLS_120 = __VLS_119({
    modelValue: (__VLS_ctx.customSpeed),
    modelModifiers: { number: true, },
    type: "number",
    ...{ class: "w-24 h-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
let __VLS_123;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_124 = __VLS_asFunctionalComponent1(__VLS_123, new __VLS_123({}));
const __VLS_125 = __VLS_124({}, ...__VLS_functionalComponentArgsRest(__VLS_124));
const { default: __VLS_128 } = __VLS_126.slots;
// @ts-ignore
[customSpeed,];
var __VLS_126;
const __VLS_129 = TextScroll;
// @ts-ignore
const __VLS_130 = __VLS_asFunctionalComponent1(__VLS_129, new __VLS_129({
    text: (__VLS_ctx.customText),
    speed: (__VLS_ctx.customSpeed),
    direction: (__VLS_ctx.customDir),
}));
const __VLS_131 = __VLS_130({
    text: (__VLS_ctx.customText),
    speed: (__VLS_ctx.customSpeed),
    direction: (__VLS_ctx.customDir),
}, ...__VLS_functionalComponentArgsRest(__VLS_130));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-4 text-sm" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
let __VLS_134;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_135 = __VLS_asFunctionalComponent1(__VLS_134, new __VLS_134({
    ...{ class: "w-20" },
}));
const __VLS_136 = __VLS_135({
    ...{ class: "w-20" },
}, ...__VLS_functionalComponentArgsRest(__VLS_135));
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
const { default: __VLS_139 } = __VLS_137.slots;
// @ts-ignore
[customSpeed, customText, customDir,];
var __VLS_137;
let __VLS_140;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_141 = __VLS_asFunctionalComponent1(__VLS_140, new __VLS_140({
    modelValue: (__VLS_ctx.customText),
    ...{ class: "flex-1 h-8" },
}));
const __VLS_142 = __VLS_141({
    modelValue: (__VLS_ctx.customText),
    ...{ class: "flex-1 h-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_141));
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
// @ts-ignore
[customText,];
var __VLS_109;
// @ts-ignore
[];
var __VLS_91;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=text-scroll.vue.js.map