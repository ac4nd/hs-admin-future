import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = withDefaults(defineProps(), {
    as: "p",
    size: "base",
    muted: false,
});
const { isEnabled } = useGlassFilter("text");
const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
};
const __VLS_defaults = {
    as: "p",
    size: "base",
    muted: false,
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
        preset: "text",
        as: (__VLS_ctx.as),
        ...{ class: (__VLS_ctx.cn(__VLS_ctx.sizeClasses[__VLS_ctx.size], __VLS_ctx.muted && 'text-muted-foreground', props.class)) },
    }));
    const __VLS_2 = __VLS_1({
        preset: "text",
        as: (__VLS_ctx.as),
        ...{ class: (__VLS_ctx.cn(__VLS_ctx.sizeClasses[__VLS_ctx.size], __VLS_ctx.muted && 'text-muted-foreground', props.class)) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    var __VLS_7 = {};
    // @ts-ignore
    [isEnabled, as, cn, sizeClasses, size, muted,];
    var __VLS_3;
}
else {
    const __VLS_9 = (__VLS_ctx.as);
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent1(__VLS_9, new __VLS_9({
        ...{ class: (__VLS_ctx.cn(__VLS_ctx.sizeClasses[__VLS_ctx.size], __VLS_ctx.muted && 'text-muted-foreground', props.class)) },
    }));
    const __VLS_11 = __VLS_10({
        ...{ class: (__VLS_ctx.cn(__VLS_ctx.sizeClasses[__VLS_ctx.size], __VLS_ctx.muted && 'text-muted-foreground', props.class)) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    var __VLS_14;
    const { default: __VLS_15 } = __VLS_12.slots;
    var __VLS_16 = {};
    // @ts-ignore
    [as, cn, sizeClasses, size, muted,];
    var __VLS_12;
}
// @ts-ignore
var __VLS_8 = __VLS_7, __VLS_17 = __VLS_16;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=GlassText.vue.js.map