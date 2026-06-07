import { computed } from "vue";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { useGlassFilter } from "./core/useGlassFilter";
const props = defineProps();
const emit = defineEmits();
const { isEnabled, filterStyle, cornerRadius } = useGlassFilter("modal");
const openModel = computed({
    get: () => props.open,
    set: (v) => emit("update:open", v),
});
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
    open: (__VLS_ctx.openModel),
}));
const __VLS_2 = __VLS_1({
    open: (__VLS_ctx.openModel),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
if (__VLS_ctx.$slots.trigger) {
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.DialogTrigger | typeof __VLS_components.DialogTrigger} */
    DialogTrigger;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        asChild: true,
    }));
    const __VLS_9 = __VLS_8({
        asChild: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const { default: __VLS_12 } = __VLS_10.slots;
    var __VLS_13 = {};
    // @ts-ignore
    [openModel, $slots,];
    var __VLS_10;
}
let __VLS_15;
/** @ts-ignore @type { | typeof __VLS_components.DialogContent | typeof __VLS_components.DialogContent} */
DialogContent;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.isEnabled && 'border-white/10', __VLS_ctx.isEnabled && '[&>button]:text-white', props.class)) },
    ...{ style: (__VLS_ctx.isEnabled
            ? {
                ...__VLS_ctx.filterStyle,
                background: 'rgba(18,18,20,0.72)',
                isolation: 'isolate',
                overflow: 'hidden',
                borderRadius: `${__VLS_ctx.cornerRadius}px`,
            }
            : {}) },
}));
const __VLS_17 = __VLS_16({
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.isEnabled && 'border-white/10', __VLS_ctx.isEnabled && '[&>button]:text-white', props.class)) },
    ...{ style: (__VLS_ctx.isEnabled
            ? {
                ...__VLS_ctx.filterStyle,
                background: 'rgba(18,18,20,0.72)',
                isolation: 'isolate',
                overflow: 'hidden',
                borderRadius: `${__VLS_ctx.cornerRadius}px`,
            }
            : {}) },
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const { default: __VLS_20 } = __VLS_18.slots;
let __VLS_21;
/** @ts-ignore @type { | typeof __VLS_components.DialogHeader | typeof __VLS_components.DialogHeader} */
DialogHeader;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({}));
const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_26 } = __VLS_24.slots;
if (__VLS_ctx.$slots.title) {
    let __VLS_27;
    /** @ts-ignore @type { | typeof __VLS_components.DialogTitle | typeof __VLS_components.DialogTitle} */
    DialogTitle;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({}));
    const __VLS_29 = __VLS_28({}, ...__VLS_functionalComponentArgsRest(__VLS_28));
    const { default: __VLS_32 } = __VLS_30.slots;
    var __VLS_33 = {};
    // @ts-ignore
    [$slots, cn, isEnabled, isEnabled, isEnabled, filterStyle, cornerRadius,];
    var __VLS_30;
}
if (__VLS_ctx.$slots.description) {
    let __VLS_35;
    /** @ts-ignore @type { | typeof __VLS_components.DialogDescription | typeof __VLS_components.DialogDescription} */
    DialogDescription;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({}));
    const __VLS_37 = __VLS_36({}, ...__VLS_functionalComponentArgsRest(__VLS_36));
    const { default: __VLS_40 } = __VLS_38.slots;
    var __VLS_41 = {};
    // @ts-ignore
    [$slots,];
    var __VLS_38;
}
// @ts-ignore
[];
var __VLS_24;
var __VLS_43 = {};
if (__VLS_ctx.$slots.footer) {
    let __VLS_45;
    /** @ts-ignore @type { | typeof __VLS_components.DialogFooter | typeof __VLS_components.DialogFooter} */
    DialogFooter;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({}));
    const __VLS_47 = __VLS_46({}, ...__VLS_functionalComponentArgsRest(__VLS_46));
    const { default: __VLS_50 } = __VLS_48.slots;
    var __VLS_51 = {};
    // @ts-ignore
    [$slots,];
    var __VLS_48;
}
// @ts-ignore
[];
var __VLS_18;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_14 = __VLS_13, __VLS_34 = __VLS_33, __VLS_42 = __VLS_41, __VLS_44 = __VLS_43, __VLS_52 = __VLS_51;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=GlassModal.vue.js.map