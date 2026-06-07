import { reactiveOmit } from "@vueuse/core";
import { AlertDialogContent, AlertDialogOverlay, AlertDialogPortal, useForwardPropsEmits, } from "reka-ui";
import { cn } from "@/lib/utils";
defineOptions({
    inheritAttrs: false,
});
const props = withDefaults(defineProps(), {
    size: "default",
});
const emits = defineEmits();
const delegatedProps = reactiveOmit(props, "class", "size");
const forwarded = useForwardPropsEmits(delegatedProps, emits);
const __VLS_defaults = {
    size: "default",
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogPortal | typeof __VLS_components.AlertDialogPortal} */
AlertDialogPortal;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogOverlay} */
AlertDialogOverlay;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    dataSlot: "alert-dialog-overlay",
    ...{ class: "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50" },
}));
const __VLS_9 = __VLS_8({
    dataSlot: "alert-dialog-overlay",
    ...{ class: "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['data-open:animate-in']} */ ;
/** @type {__VLS_StyleScopedClasses['data-closed:animate-out']} */ ;
/** @type {__VLS_StyleScopedClasses['data-closed:fade-out-0']} */ ;
/** @type {__VLS_StyleScopedClasses['data-open:fade-in-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/10']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-100']} */ ;
/** @type {__VLS_StyleScopedClasses['supports-backdrop-filter:backdrop-blur-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogContent | typeof __VLS_components.AlertDialogContent} */
AlertDialogContent;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    dataSlot: "alert-dialog-content",
    dataSize: (__VLS_ctx.size),
    ...({ ...__VLS_ctx.$attrs, ...__VLS_ctx.forwarded }),
    ...{ class: (__VLS_ctx.cn('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 bg-popover text-popover-foreground ring-foreground/10 gap-4 rounded-xl p-4 ring-1 duration-100 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 outline-none', props.class)) },
}));
const __VLS_14 = __VLS_13({
    dataSlot: "alert-dialog-content",
    dataSize: (__VLS_ctx.size),
    ...({ ...__VLS_ctx.$attrs, ...__VLS_ctx.forwarded }),
    ...{ class: (__VLS_ctx.cn('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 bg-popover text-popover-foreground ring-foreground/10 gap-4 rounded-xl p-4 ring-1 duration-100 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 outline-none', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const { default: __VLS_17 } = __VLS_15.slots;
var __VLS_18 = {};
// @ts-ignore
[size, $attrs, forwarded, cn,];
var __VLS_15;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_19 = __VLS_18;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=AlertDialogContent.vue.js.map