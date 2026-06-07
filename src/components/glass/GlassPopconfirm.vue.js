import { cn } from "@/lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { useGlassFilter } from "./core/useGlassFilter";
const props = defineProps();
const emit = defineEmits();
const { isEnabled, filterStyle } = useGlassFilter("popconfirm");
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
/** @ts-ignore @type { | typeof __VLS_components.AlertDialog | typeof __VLS_components.AlertDialog} */
AlertDialog;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogTrigger | typeof __VLS_components.AlertDialogTrigger} */
AlertDialogTrigger;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    asChild: true,
}));
const __VLS_9 = __VLS_8({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
var __VLS_13 = {};
var __VLS_10;
let __VLS_15;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogContent | typeof __VLS_components.AlertDialogContent} */
AlertDialogContent;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
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
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogHeader | typeof __VLS_components.AlertDialogHeader} */
AlertDialogHeader;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({}));
const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_26 } = __VLS_24.slots;
let __VLS_27;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogTitle | typeof __VLS_components.AlertDialogTitle} */
AlertDialogTitle;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({}));
const __VLS_29 = __VLS_28({}, ...__VLS_functionalComponentArgsRest(__VLS_28));
const { default: __VLS_32 } = __VLS_30.slots;
(__VLS_ctx.title);
// @ts-ignore
[cn, isEnabled, isEnabled, filterStyle, title,];
var __VLS_30;
if (__VLS_ctx.description) {
    let __VLS_33;
    /** @ts-ignore @type { | typeof __VLS_components.AlertDialogDescription | typeof __VLS_components.AlertDialogDescription} */
    AlertDialogDescription;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({}));
    const __VLS_35 = __VLS_34({}, ...__VLS_functionalComponentArgsRest(__VLS_34));
    const { default: __VLS_38 } = __VLS_36.slots;
    (__VLS_ctx.description);
    // @ts-ignore
    [description, description,];
    var __VLS_36;
}
// @ts-ignore
[];
var __VLS_24;
let __VLS_39;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogFooter | typeof __VLS_components.AlertDialogFooter} */
AlertDialogFooter;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({}));
const __VLS_41 = __VLS_40({}, ...__VLS_functionalComponentArgsRest(__VLS_40));
const { default: __VLS_44 } = __VLS_42.slots;
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogCancel | typeof __VLS_components.AlertDialogCancel} */
AlertDialogCancel;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
    ...{ 'onClick': {} },
}));
const __VLS_47 = __VLS_46({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
let __VLS_50;
const __VLS_51 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.emit('cancel');
            // @ts-ignore
            [emit,];
        } });
const { default: __VLS_52 } = __VLS_48.slots;
(__VLS_ctx.cancelText ?? "取消");
// @ts-ignore
[cancelText,];
var __VLS_48;
var __VLS_49;
let __VLS_53;
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogAction | typeof __VLS_components.AlertDialogAction} */
AlertDialogAction;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
    ...{ 'onClick': {} },
}));
const __VLS_55 = __VLS_54({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
let __VLS_58;
const __VLS_59 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.emit('confirm');
            // @ts-ignore
            [emit,];
        } });
const { default: __VLS_60 } = __VLS_56.slots;
(__VLS_ctx.confirmText ?? "确认");
// @ts-ignore
[confirmText,];
var __VLS_56;
var __VLS_57;
// @ts-ignore
[];
var __VLS_42;
// @ts-ignore
[];
var __VLS_18;
// @ts-ignore
[];
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
//# sourceMappingURL=GlassPopconfirm.vue.js.map