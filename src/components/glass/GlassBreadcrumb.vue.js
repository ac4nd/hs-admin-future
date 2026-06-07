import { cn } from "@/lib/utils";
import { Breadcrumb, BreadcrumbList } from "@/components/ui/breadcrumb";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = defineProps();
const { isEnabled } = useGlassFilter("breadcrumb");
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (__VLS_ctx.isEnabled) {
    const __VLS_0 = GlassSurface || GlassSurface;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        preset: "breadcrumb",
        ...{ class: (__VLS_ctx.cn('inline-flex items-center', props.class)) },
    }));
    const __VLS_2 = __VLS_1({
        preset: "breadcrumb",
        ...{ class: (__VLS_ctx.cn('inline-flex items-center', props.class)) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.Breadcrumb | typeof __VLS_components.Breadcrumb} */
    Breadcrumb;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({}));
    const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const { default: __VLS_12 } = __VLS_10.slots;
    let __VLS_13;
    /** @ts-ignore @type { | typeof __VLS_components.BreadcrumbList | typeof __VLS_components.BreadcrumbList} */
    BreadcrumbList;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const { default: __VLS_18 } = __VLS_16.slots;
    var __VLS_19 = {};
    // @ts-ignore
    [isEnabled, cn,];
    var __VLS_16;
    // @ts-ignore
    [];
    var __VLS_10;
    // @ts-ignore
    [];
    var __VLS_3;
}
else {
    let __VLS_21;
    /** @ts-ignore @type { | typeof __VLS_components.Breadcrumb | typeof __VLS_components.Breadcrumb} */
    Breadcrumb;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
        ...{ class: (props.class) },
    }));
    const __VLS_23 = __VLS_22({
        ...{ class: (props.class) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    var __VLS_26;
    const { default: __VLS_27 } = __VLS_24.slots;
    let __VLS_28;
    /** @ts-ignore @type { | typeof __VLS_components.BreadcrumbList | typeof __VLS_components.BreadcrumbList} */
    BreadcrumbList;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({}));
    const __VLS_30 = __VLS_29({}, ...__VLS_functionalComponentArgsRest(__VLS_29));
    const { default: __VLS_33 } = __VLS_31.slots;
    var __VLS_34 = {};
    // @ts-ignore
    [];
    var __VLS_31;
    // @ts-ignore
    [];
    var __VLS_24;
}
// @ts-ignore
var __VLS_20 = __VLS_19, __VLS_35 = __VLS_34;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=GlassBreadcrumb.vue.js.map