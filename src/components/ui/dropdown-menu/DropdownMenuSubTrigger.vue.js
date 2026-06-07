import { ChevronRightIcon } from "@lucide/vue";
import { reactiveOmit } from "@vueuse/core";
import { DropdownMenuSubTrigger, useForwardProps } from "reka-ui";
import { cn } from "@/lib/utils";
const props = defineProps();
const delegatedProps = reactiveOmit(props, "class", "inset");
const forwardedProps = useForwardProps(delegatedProps);
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
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSubTrigger | typeof __VLS_components.DropdownMenuSubTrigger} */
DropdownMenuSubTrigger;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    dataSlot: "dropdown-menu-sub-trigger",
    dataInset: (__VLS_ctx.inset ? '' : undefined),
    ...(__VLS_ctx.forwardedProps),
    ...{ class: (__VLS_ctx.cn('focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm data-inset:pl-7 [&_svg:not([class*=size-])]:size-4 flex cursor-default items-center outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0', props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "dropdown-menu-sub-trigger",
    dataInset: (__VLS_ctx.inset ? '' : undefined),
    ...(__VLS_ctx.forwardedProps),
    ...{ class: (__VLS_ctx.cn('focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm data-inset:pl-7 [&_svg:not([class*=size-])]:size-4 flex cursor-default items-center outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
let __VLS_9;
/** @ts-ignore @type { | typeof __VLS_components.ChevronRightIcon} */
ChevronRightIcon;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent1(__VLS_9, new __VLS_9({
    ...{ class: "cn-rtl-flip ml-auto" },
}));
const __VLS_11 = __VLS_10({
    ...{ class: "cn-rtl-flip ml-auto" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
/** @type {__VLS_StyleScopedClasses['cn-rtl-flip']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
// @ts-ignore
[inset, forwardedProps, cn,];
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=DropdownMenuSubTrigger.vue.js.map