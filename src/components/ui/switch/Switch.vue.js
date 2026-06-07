import { reactiveOmit } from "@vueuse/core";
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from "reka-ui";
import { cn } from "@/lib/utils";
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
/** @ts-ignore @type { | typeof __VLS_components.SwitchRoot | typeof __VLS_components.SwitchRoot} */
SwitchRoot;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    dataSlot: "switch",
    dataSize: (__VLS_ctx.size),
    ...(__VLS_ctx.forwarded),
    ...{ class: (__VLS_ctx.cn('data-checked:bg-primary data-unchecked:bg-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 dark:data-unchecked:bg-input/80 shrink-0 rounded-full border border-transparent focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] peer group/switch relative inline-flex items-center transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50', props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "switch",
    dataSize: (__VLS_ctx.size),
    ...(__VLS_ctx.forwarded),
    ...{ class: (__VLS_ctx.cn('data-checked:bg-primary data-unchecked:bg-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 dark:data-unchecked:bg-input/80 shrink-0 rounded-full border border-transparent focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] peer group/switch relative inline-flex items-center transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
{
    const { default: __VLS_6 } = __VLS_3.slots;
    const [slotProps] = __VLS_vSlot(__VLS_6);
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.SwitchThumb | typeof __VLS_components.SwitchThumb} */
    SwitchThumb;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        dataSlot: "switch-thumb",
        ...{ class: "bg-background dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground rounded-full group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 pointer-events-none block ring-0 transition-transform" },
    }));
    const __VLS_9 = __VLS_8({
        dataSlot: "switch-thumb",
        ...{ class: "bg-background dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground rounded-full group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 pointer-events-none block ring-0 transition-transform" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    /** @type {__VLS_StyleScopedClasses['bg-background']} */ ;
    /** @type {__VLS_StyleScopedClasses['dark:data-unchecked:bg-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['dark:data-checked:bg-primary-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-data-[size=default]/switch:size-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-data-[size=sm]/switch:size-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-data-[size=default]/switch:data-unchecked:translate-x-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-data-[size=sm]/switch:data-unchecked:translate-x-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['block']} */ ;
    /** @type {__VLS_StyleScopedClasses['ring-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
    const { default: __VLS_12 } = __VLS_10.slots;
    var __VLS_13 = {
        ...(slotProps),
    };
    // @ts-ignore
    [size, forwarded, cn,];
    var __VLS_10;
    // @ts-ignore
    [];
    __VLS_3.slots['' /* empty slot name completion */];
}
var __VLS_3;
// @ts-ignore
var __VLS_14 = __VLS_13;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=Switch.vue.js.map