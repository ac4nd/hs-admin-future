import { computed } from "vue";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { useGlassFilter } from "./core/useGlassFilter";
const props = withDefaults(defineProps(), { side: "right" });
const emit = defineEmits();
const { isEnabled, filterStyle } = useGlassFilter("drawer");
const openModel = computed({
    get: () => props.open,
    set: (v) => emit("update:open", v),
});
const __VLS_defaults = { side: "right" };
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
/** @ts-ignore @type { | typeof __VLS_components.Sheet | typeof __VLS_components.Sheet} */
Sheet;
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
    /** @ts-ignore @type { | typeof __VLS_components.SheetTrigger | typeof __VLS_components.SheetTrigger} */
    SheetTrigger;
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
/** @ts-ignore @type { | typeof __VLS_components.SheetContent | typeof __VLS_components.SheetContent} */
SheetContent;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
    side: (__VLS_ctx.side),
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.isEnabled && 'border-white/10', props.class)) },
    ...{ style: (__VLS_ctx.isEnabled
            ? {
                ...__VLS_ctx.filterStyle,
                background: 'rgba(18,18,20,0.72)',
                isolation: 'isolate',
                overflow: 'hidden',
            }
            : {}) },
}));
const __VLS_17 = __VLS_16({
    side: (__VLS_ctx.side),
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.isEnabled && 'border-white/10', props.class)) },
    ...{ style: (__VLS_ctx.isEnabled
            ? {
                ...__VLS_ctx.filterStyle,
                background: 'rgba(18,18,20,0.72)',
                isolation: 'isolate',
                overflow: 'hidden',
            }
            : {}) },
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const { default: __VLS_20 } = __VLS_18.slots;
let __VLS_21;
/** @ts-ignore @type { | typeof __VLS_components.SheetHeader | typeof __VLS_components.SheetHeader} */
SheetHeader;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({}));
const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_26 } = __VLS_24.slots;
if (__VLS_ctx.$slots.title) {
    let __VLS_27;
    /** @ts-ignore @type { | typeof __VLS_components.SheetTitle | typeof __VLS_components.SheetTitle} */
    SheetTitle;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({}));
    const __VLS_29 = __VLS_28({}, ...__VLS_functionalComponentArgsRest(__VLS_28));
    const { default: __VLS_32 } = __VLS_30.slots;
    var __VLS_33 = {};
    // @ts-ignore
    [$slots, side, cn, isEnabled, isEnabled, filterStyle,];
    var __VLS_30;
}
if (__VLS_ctx.$slots.description) {
    let __VLS_35;
    /** @ts-ignore @type { | typeof __VLS_components.SheetDescription | typeof __VLS_components.SheetDescription} */
    SheetDescription;
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
    /** @ts-ignore @type { | typeof __VLS_components.SheetFooter | typeof __VLS_components.SheetFooter} */
    SheetFooter;
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
    props: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=GlassDrawer.vue.js.map