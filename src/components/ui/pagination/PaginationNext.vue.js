import { ChevronRightIcon } from "@lucide/vue";
import { reactiveOmit } from "@vueuse/core";
import { PaginationNext, useForwardProps } from "reka-ui";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
const props = withDefaults(defineProps(), {
    size: "default",
});
const delegatedProps = reactiveOmit(props, "class", "size");
const forwarded = useForwardProps(delegatedProps);
const __VLS_defaults = {
    size: "default",
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
/** @ts-ignore @type { | typeof __VLS_components.PaginationNext | typeof __VLS_components.PaginationNext} */
PaginationNext;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    dataSlot: "pagination-next",
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.buttonVariants({ variant: 'ghost', size: __VLS_ctx.size }), 'pr-1.5!', props.class)) },
    ...(__VLS_ctx.forwarded),
}));
const __VLS_2 = __VLS_1({
    dataSlot: "pagination-next",
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.buttonVariants({ variant: 'ghost', size: __VLS_ctx.size }), 'pr-1.5!', props.class)) },
    ...(__VLS_ctx.forwarded),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "hidden sm:block" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:block']} */ ;
let __VLS_9;
/** @ts-ignore @type { | typeof __VLS_components.ChevronRightIcon} */
ChevronRightIcon;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent1(__VLS_9, new __VLS_9({
    dataIcon: "inline-end",
    ...{ class: "cn-rtl-flip" },
}));
const __VLS_11 = __VLS_10({
    dataIcon: "inline-end",
    ...{ class: "cn-rtl-flip" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
/** @type {__VLS_StyleScopedClasses['cn-rtl-flip']} */ ;
// @ts-ignore
[cn, buttonVariants, size, forwarded,];
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=PaginationNext.vue.js.map