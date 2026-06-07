import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = withDefaults(defineProps(), {
    size: "default",
});
const { isEnabled } = useGlassFilter("badge");
const sizeClasses = {
    sm: "h-5 min-w-5 px-1.5 text-[10px]",
    default: "h-6 min-w-6 px-2.5 text-xs",
};
const __VLS_defaults = {
    size: "default",
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
        preset: "badge",
        ...{ class: (__VLS_ctx.cn(__VLS_ctx.sizeClasses[__VLS_ctx.size], props.class)) },
        ...{ style: ({
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                fontWeight: 500,
                whiteSpace: 'nowrap',
            }) },
    }));
    const __VLS_2 = __VLS_1({
        preset: "badge",
        ...{ class: (__VLS_ctx.cn(__VLS_ctx.sizeClasses[__VLS_ctx.size], props.class)) },
        ...{ style: ({
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                fontWeight: 500,
                whiteSpace: 'nowrap',
            }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    var __VLS_7 = {};
    // @ts-ignore
    [isEnabled, cn, sizeClasses, size,];
    var __VLS_3;
}
else {
    let __VLS_9;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent1(__VLS_9, new __VLS_9({
        variant: "secondary",
        ...{ class: (__VLS_ctx.cn(__VLS_ctx.sizeClasses[__VLS_ctx.size], props.class)) },
    }));
    const __VLS_11 = __VLS_10({
        variant: "secondary",
        ...{ class: (__VLS_ctx.cn(__VLS_ctx.sizeClasses[__VLS_ctx.size], props.class)) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    var __VLS_14;
    const { default: __VLS_15 } = __VLS_12.slots;
    var __VLS_16 = {};
    // @ts-ignore
    [cn, sizeClasses, size,];
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
//# sourceMappingURL=GlassBadge.vue.js.map