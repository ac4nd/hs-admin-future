import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WangEditor from "@/components/WangEditor/index.vue";
const mode = ref("preview");
const content = ref(`
<h2>欢迎使用 wangEditor 富文本编辑器</h2>
<p>基于 <strong>@wangeditor-next</strong> 实现的富文本编辑器组件。</p>
<ul>
  <li>支持文本格式化（加粗、斜体、下划线等）</li>
  <li>支持插入图片、链接、表格</li>
  <li>支持代码块、引用、分割线</li>
  <li>支持撤销/重做</li>
  <li>支持颜色、字体大小设置</li>
</ul>
<p>点击工具栏按钮即可使用各种功能。</p>
`);
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex gap-1" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: ({ 'bg-muted': __VLS_ctx.mode === 'preview' }) },
}));
const __VLS_20 = __VLS_19({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: ({ 'bg-muted': __VLS_ctx.mode === 'preview' }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
let __VLS_23;
const __VLS_24 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.mode = 'preview';
            // @ts-ignore
            [mode, mode,];
        } });
/** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
const { default: __VLS_25 } = __VLS_21.slots;
// @ts-ignore
[];
var __VLS_21;
var __VLS_22;
let __VLS_26;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: ({ 'bg-muted': __VLS_ctx.mode === 'source' }) },
}));
const __VLS_28 = __VLS_27({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: ({ 'bg-muted': __VLS_ctx.mode === 'source' }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
let __VLS_31;
const __VLS_32 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.mode = 'source';
            // @ts-ignore
            [mode, mode,];
        } });
/** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
const { default: __VLS_33 } = __VLS_29.slots;
// @ts-ignore
[];
var __VLS_29;
var __VLS_30;
// @ts-ignore
[];
var __VLS_9;
let __VLS_34;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
    ...{ class: "space-y-4" },
}));
const __VLS_36 = __VLS_35({
    ...{ class: "space-y-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
const { default: __VLS_39 } = __VLS_37.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.mode === 'preview') }, null, null);
const __VLS_40 = WangEditor;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
    modelValue: (__VLS_ctx.content),
    height: "400px",
}));
const __VLS_42 = __VLS_41({
    modelValue: (__VLS_ctx.content),
    height: "400px",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
if (__VLS_ctx.mode === 'source') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.textarea)({
        value: (__VLS_ctx.content),
        ...{ class: "w-full h-[420px] p-3 text-xs font-mono bg-muted/30 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring/20" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-[420px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-muted/30']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['resize-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['focus:ring-ring/20']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "border rounded-lg p-4" },
});
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({
    ...{ class: "text-sm font-medium mb-3 text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "prose prose-sm max-w-none" },
});
__VLS_asFunctionalDirective(__VLS_directives.vHtml, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.content) }, null, null);
/** @type {__VLS_StyleScopedClasses['prose']} */ ;
/** @type {__VLS_StyleScopedClasses['prose-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-none']} */ ;
// @ts-ignore
[mode, mode, content, content, content,];
var __VLS_37;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=wang-editor.vue.js.map