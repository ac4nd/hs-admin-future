import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = withDefaults(defineProps(), {
    size: 36,
});
const { isEnabled } = useGlassFilter("loading");
const __VLS_defaults = {
    size: 36,
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
        preset: "loading",
        ...{ class: (__VLS_ctx.cn('inline-flex items-center justify-center gap-2', props.class)) },
        mouseTracking: (false),
        ...{ style: ({
                borderRadius: '999px',
                width: __VLS_ctx.text ? 'auto' : `${__VLS_ctx.size}px`,
                height: __VLS_ctx.text ? 'auto' : `${__VLS_ctx.size}px`,
                padding: __VLS_ctx.text ? '8px 16px' : '0',
            }) },
    }));
    const __VLS_2 = __VLS_1({
        preset: "loading",
        ...{ class: (__VLS_ctx.cn('inline-flex items-center justify-center gap-2', props.class)) },
        mouseTracking: (false),
        ...{ style: ({
                borderRadius: '999px',
                width: __VLS_ctx.text ? 'auto' : `${__VLS_ctx.size}px`,
                height: __VLS_ctx.text ? 'auto' : `${__VLS_ctx.size}px`,
                padding: __VLS_ctx.text ? '8px 16px' : '0',
            }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        width: (__VLS_ctx.text ? 16 : __VLS_ctx.size * 0.5),
        height: (__VLS_ctx.text ? 16 : __VLS_ctx.size * 0.5),
        viewBox: "0 0 24 24",
        ...{ class: "animate-spin" },
        fill: "none",
    });
    /** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
        cx: "12",
        cy: "12",
        r: "10",
        stroke: "currentColor",
        'stroke-width': "3",
        ...{ class: "opacity-20" },
    });
    /** @type {__VLS_StyleScopedClasses['opacity-20']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: "M4 12a8 8 0 018-8",
        stroke: "currentColor",
        'stroke-width': "3",
        'stroke-linecap': "round",
    });
    if (__VLS_ctx.text) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-sm text-muted-foreground" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        (__VLS_ctx.text);
    }
    // @ts-ignore
    [isEnabled, cn, text, text, text, text, text, text, text, size, size, size, size,];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.cn('inline-flex items-center gap-2', props.class)) },
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        width: (__VLS_ctx.size * 0.5),
        height: (__VLS_ctx.size * 0.5),
        viewBox: "0 0 24 24",
        ...{ class: "animate-spin" },
        fill: "none",
    });
    /** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
        cx: "12",
        cy: "12",
        r: "10",
        stroke: "currentColor",
        'stroke-width': "3",
        ...{ class: "opacity-20" },
    });
    /** @type {__VLS_StyleScopedClasses['opacity-20']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: "M4 12a8 8 0 018-8",
        stroke: "currentColor",
        'stroke-width': "3",
        'stroke-linecap': "round",
    });
    if (__VLS_ctx.text) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-sm text-muted-foreground" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        (__VLS_ctx.text);
    }
}
// @ts-ignore
[cn, text, text, size, size,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=GlassLoading.vue.js.map