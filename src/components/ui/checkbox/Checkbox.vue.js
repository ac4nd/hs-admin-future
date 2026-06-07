import { CheckIcon } from "@lucide/vue";
import { reactiveOmit } from "@vueuse/core";
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui";
import { cn } from "@/lib/utils";
const props = defineProps();
const emits = defineEmits();
const delegatedProps = reactiveOmit(props, "class");
const forwarded = useForwardPropsEmits(delegatedProps, emits);
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
/** @ts-ignore @type { | typeof __VLS_components.CheckboxRoot | typeof __VLS_components.CheckboxRoot} */
CheckboxRoot;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    dataSlot: "checkbox",
    ...(__VLS_ctx.forwarded),
    ...{ class: (__VLS_ctx.cn('border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex size-4 items-center justify-center rounded-[4px] border transition-colors group-has-disabled/field:opacity-50 focus-visible:ring-3 aria-invalid:ring-3 peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50', props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "checkbox",
    ...(__VLS_ctx.forwarded),
    ...{ class: (__VLS_ctx.cn('border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex size-4 items-center justify-center rounded-[4px] border transition-colors group-has-disabled/field:opacity-50 focus-visible:ring-3 aria-invalid:ring-3 peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
{
    const { default: __VLS_6 } = __VLS_3.slots;
    const [slotProps] = __VLS_vSlot(__VLS_6);
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.CheckboxIndicator | typeof __VLS_components.CheckboxIndicator} */
    CheckboxIndicator;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        dataSlot: "checkbox-indicator",
        ...{ class: "[&>svg]:size-3.5 grid place-content-center text-current transition-none" },
    }));
    const __VLS_9 = __VLS_8({
        dataSlot: "checkbox-indicator",
        ...{ class: "[&>svg]:size-3.5 grid place-content-center text-current transition-none" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    /** @type {__VLS_StyleScopedClasses['[&>svg]:size-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['place-content-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-current']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-none']} */ ;
    const { default: __VLS_12 } = __VLS_10.slots;
    var __VLS_13 = {
        ...(slotProps),
    };
    let __VLS_15;
    /** @ts-ignore @type { | typeof __VLS_components.CheckIcon} */
    CheckIcon;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({}));
    const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
    // @ts-ignore
    [forwarded, cn,];
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
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=Checkbox.vue.js.map