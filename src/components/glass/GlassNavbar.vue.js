import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = withDefaults(defineProps(), {
    fixed: false,
    height: "var(--navbar-height)",
});
const { isEnabled } = useGlassFilter("navbar");
const __VLS_defaults = {
    fixed: false,
    height: "var(--navbar-height)",
};
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
        preset: "navbar",
        ...{ class: (__VLS_ctx.cn('w-full', __VLS_ctx.fixed && 'fixed top-0 inset-x-0 z-50', props.class)) },
        ...{ style: ({ height: __VLS_ctx.height }) },
    }));
    const __VLS_2 = __VLS_1({
        preset: "navbar",
        ...{ class: (__VLS_ctx.cn('w-full', __VLS_ctx.fixed && 'fixed top-0 inset-x-0 z-50', props.class)) },
        ...{ style: ({ height: __VLS_ctx.height }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
        ...{ class: "flex items-center gap-4 text-sm h-full px-4" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    var __VLS_7 = {};
    // @ts-ignore
    [isEnabled, cn, fixed, height,];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.cn('w-full border-b border-border', __VLS_ctx.fixed && 'fixed top-0 inset-x-0 z-50 bg-background', props.class)) },
        ...{ style: ({ height: __VLS_ctx.height }) },
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
        ...{ class: "flex items-center gap-4 text-sm h-full px-4" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    var __VLS_9 = {};
}
// @ts-ignore
var __VLS_8 = __VLS_7, __VLS_10 = __VLS_9;
// @ts-ignore
[cn, fixed, height,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=GlassNavbar.vue.js.map