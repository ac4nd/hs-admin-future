import { reactiveOmit } from "@vueuse/core";
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaViewport } from "reka-ui";
import { cn } from "@/lib/utils";
import ScrollBar from "./ScrollBar.vue";
const props = defineProps();
const delegatedProps = reactiveOmit(props, "class");
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.ScrollAreaRoot | typeof __VLS_components.ScrollAreaRoot} */
ScrollAreaRoot;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    dataSlot: "scroll-area",
    ...(__VLS_ctx.delegatedProps),
    ...{ class: (__VLS_ctx.cn('relative', props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "scroll-area",
    ...(__VLS_ctx.delegatedProps),
    ...{ class: (__VLS_ctx.cn('relative', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.ScrollAreaViewport | typeof __VLS_components.ScrollAreaViewport} */
ScrollAreaViewport;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    dataSlot: "scroll-area-viewport",
    ...{ class: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1" },
}));
const __VLS_9 = __VLS_8({
    dataSlot: "scroll-area-viewport",
    ...{ class: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['size-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[inherit]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-[color,box-shadow]']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:ring-[3px]']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:ring-ring/50']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:outline-1']} */ ;
const { default: __VLS_12 } = __VLS_10.slots;
var __VLS_13 = {};
// @ts-ignore
[delegatedProps, cn,];
var __VLS_10;
const __VLS_15 = ScrollBar;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({}));
const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
let __VLS_20;
/** @ts-ignore @type { | typeof __VLS_components.ScrollAreaCorner} */
ScrollAreaCorner;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({}));
const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_14 = __VLS_13;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=ScrollArea.vue.js.map