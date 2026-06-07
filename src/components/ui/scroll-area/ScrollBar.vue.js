import { reactiveOmit } from "@vueuse/core";
import { ScrollAreaScrollbar, ScrollAreaThumb } from "reka-ui";
import { cn } from "@/lib/utils";
const props = withDefaults(defineProps(), {
    orientation: "vertical",
});
const delegatedProps = reactiveOmit(props, "class");
const __VLS_defaults = {
    orientation: "vertical",
};
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
/** @ts-ignore @type { | typeof __VLS_components.ScrollAreaScrollbar | typeof __VLS_components.ScrollAreaScrollbar} */
ScrollAreaScrollbar;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    dataSlot: "scroll-area-scrollbar",
    dataOrientation: (__VLS_ctx.orientation),
    ...(__VLS_ctx.delegatedProps),
    ...{ class: (__VLS_ctx.cn('data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent flex touch-none p-px transition-colors select-none', props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "scroll-area-scrollbar",
    dataOrientation: (__VLS_ctx.orientation),
    ...(__VLS_ctx.delegatedProps),
    ...{ class: (__VLS_ctx.cn('data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent flex touch-none p-px transition-colors select-none', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.ScrollAreaThumb} */
ScrollAreaThumb;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    dataSlot: "scroll-area-thumb",
    ...{ class: "rounded-full relative flex-1 bg-border" },
}));
const __VLS_9 = __VLS_8({
    dataSlot: "scroll-area-thumb",
    ...{ class: "rounded-full relative flex-1 bg-border" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-border']} */ ;
// @ts-ignore
[orientation, delegatedProps, cn,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=ScrollBar.vue.js.map