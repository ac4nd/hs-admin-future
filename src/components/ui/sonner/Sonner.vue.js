import { CircleCheckIcon, CircleXIcon, InfoIcon, Loader2Icon, TriangleAlertIcon, } from "@lucide/vue";
import { Toaster as ToasterLib } from "vue-sonner";
import "vue-sonner/style.css";
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.ToasterLib | typeof __VLS_components.ToasterLib} */
ToasterLib;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    position: "top-center",
    richColors: (true),
    closeButton: (false),
    duration: (2000),
    gap: (8),
    toastOptions: ({
        classes: {
            toast: 'rounded-lg shadow-md',
            description: 'text-xs',
        },
    }),
}));
const __VLS_2 = __VLS_1({
    position: "top-center",
    richColors: (true),
    closeButton: (false),
    duration: (2000),
    gap: (8),
    toastOptions: ({
        classes: {
            toast: 'rounded-lg shadow-md',
            description: 'text-xs',
        },
    }),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
{
    const { 'success-icon': __VLS_7 } = __VLS_3.slots;
    let __VLS_8;
    /** @ts-ignore @type { | typeof __VLS_components.CircleCheckIcon} */
    CircleCheckIcon;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        ...{ class: "size-4 text-green-500" },
    }));
    const __VLS_10 = __VLS_9({
        ...{ class: "size-4 text-green-500" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-green-500']} */ ;
}
{
    const { 'info-icon': __VLS_13 } = __VLS_3.slots;
    let __VLS_14;
    /** @ts-ignore @type { | typeof __VLS_components.InfoIcon} */
    InfoIcon;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
        ...{ class: "size-4 text-blue-500" },
    }));
    const __VLS_16 = __VLS_15({
        ...{ class: "size-4 text-blue-500" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-blue-500']} */ ;
}
{
    const { 'warning-icon': __VLS_19 } = __VLS_3.slots;
    let __VLS_20;
    /** @ts-ignore @type { | typeof __VLS_components.TriangleAlertIcon} */
    TriangleAlertIcon;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
        ...{ class: "size-4 text-yellow-500" },
    }));
    const __VLS_22 = __VLS_21({
        ...{ class: "size-4 text-yellow-500" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-yellow-500']} */ ;
}
{
    const { 'error-icon': __VLS_25 } = __VLS_3.slots;
    let __VLS_26;
    /** @ts-ignore @type { | typeof __VLS_components.CircleXIcon} */
    CircleXIcon;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
        ...{ class: "size-5 text-red-500" },
    }));
    const __VLS_28 = __VLS_27({
        ...{ class: "size-5 text-red-500" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    /** @type {__VLS_StyleScopedClasses['size-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
}
{
    const { 'loading-icon': __VLS_31 } = __VLS_3.slots;
    let __VLS_32;
    /** @ts-ignore @type { | typeof __VLS_components.Loader2Icon} */
    Loader2Icon;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
        ...{ class: "size-4 animate-spin" },
    }));
    const __VLS_34 = __VLS_33({
        ...{ class: "size-4 animate-spin" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
}
var __VLS_3;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=Sonner.vue.js.map