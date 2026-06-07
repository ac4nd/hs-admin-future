import { useForwardPropsEmits } from "reka-ui";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import Command from "./Command.vue";
const props = withDefaults(defineProps(), {
    title: "Command Palette",
    description: "Search for a command to run...",
    showCloseButton: false,
});
const emits = defineEmits();
const forwarded = useForwardPropsEmits(props, emits);
const __VLS_defaults = {
    title: "Command Palette",
    description: "Search for a command to run...",
    showCloseButton: false,
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
/** @ts-ignore @type { | typeof __VLS_components.Dialog | typeof __VLS_components.Dialog} */
Dialog;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...(__VLS_ctx.forwarded),
}));
const __VLS_2 = __VLS_1({
    ...(__VLS_ctx.forwarded),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
{
    const { default: __VLS_6 } = __VLS_3.slots;
    const [slotProps] = __VLS_vSlot(__VLS_6);
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.DialogContent | typeof __VLS_components.DialogContent} */
    DialogContent;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        ...{ class: (__VLS_ctx.cn('rounded-xl! top-1/3 translate-y-0 overflow-hidden p-0', props.class)) },
        showCloseButton: (__VLS_ctx.showCloseButton),
    }));
    const __VLS_9 = __VLS_8({
        ...{ class: (__VLS_ctx.cn('rounded-xl! top-1/3 translate-y-0 overflow-hidden p-0', props.class)) },
        showCloseButton: (__VLS_ctx.showCloseButton),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const { default: __VLS_12 } = __VLS_10.slots;
    let __VLS_13;
    /** @ts-ignore @type { | typeof __VLS_components.DialogHeader | typeof __VLS_components.DialogHeader} */
    DialogHeader;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
        ...{ class: "sr-only" },
    }));
    const __VLS_15 = __VLS_14({
        ...{ class: "sr-only" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
    const { default: __VLS_18 } = __VLS_16.slots;
    let __VLS_19;
    /** @ts-ignore @type { | typeof __VLS_components.DialogTitle | typeof __VLS_components.DialogTitle} */
    DialogTitle;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({}));
    const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const { default: __VLS_24 } = __VLS_22.slots;
    (__VLS_ctx.title);
    // @ts-ignore
    [forwarded, cn, showCloseButton, title,];
    var __VLS_22;
    let __VLS_25;
    /** @ts-ignore @type { | typeof __VLS_components.DialogDescription | typeof __VLS_components.DialogDescription} */
    DialogDescription;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
    const { default: __VLS_30 } = __VLS_28.slots;
    (__VLS_ctx.description);
    // @ts-ignore
    [description,];
    var __VLS_28;
    // @ts-ignore
    [];
    var __VLS_16;
    const __VLS_31 = Command || Command;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({}));
    const __VLS_33 = __VLS_32({}, ...__VLS_functionalComponentArgsRest(__VLS_32));
    const { default: __VLS_36 } = __VLS_34.slots;
    var __VLS_37 = {
        ...(slotProps),
    };
    // @ts-ignore
    [];
    var __VLS_34;
    // @ts-ignore
    [];
    var __VLS_10;
    // @ts-ignore
    [];
    __VLS_3.slots['' /* empty slot name completion */];
}
var __VLS_3;
// @ts-ignore
var __VLS_38 = __VLS_37;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=CommandDialog.vue.js.map