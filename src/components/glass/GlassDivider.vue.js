import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = withDefaults(defineProps(), {
    orientation: "horizontal",
    decorative: true,
});
const { isEnabled } = useGlassFilter("divider");
const __VLS_defaults = {
    orientation: "horizontal",
    decorative: true,
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
        preset: "divider",
        ...{ class: (__VLS_ctx.cn('shrink-0', __VLS_ctx.orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', props.class)) },
        mouseTracking: (false),
        ...{ style: ({
                borderRadius: '0',
                minHeight: __VLS_ctx.orientation === 'horizontal' ? '1px' : undefined,
                minWidth: __VLS_ctx.orientation === 'vertical' ? '1px' : undefined,
            }) },
    }));
    const __VLS_2 = __VLS_1({
        preset: "divider",
        ...{ class: (__VLS_ctx.cn('shrink-0', __VLS_ctx.orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', props.class)) },
        mouseTracking: (false),
        ...{ style: ({
                borderRadius: '0',
                minHeight: __VLS_ctx.orientation === 'horizontal' ? '1px' : undefined,
                minWidth: __VLS_ctx.orientation === 'vertical' ? '1px' : undefined,
            }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({});
    // @ts-ignore
    [isEnabled, cn, orientation, orientation, orientation,];
    var __VLS_3;
}
else {
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.Separator} */
    Separator;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        orientation: (__VLS_ctx.orientation),
        decorative: (__VLS_ctx.decorative),
        ...{ class: (props.class) },
    }));
    const __VLS_9 = __VLS_8({
        orientation: (__VLS_ctx.orientation),
        decorative: (__VLS_ctx.decorative),
        ...{ class: (props.class) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    var __VLS_12;
    var __VLS_10;
}
// @ts-ignore
[orientation, decorative,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=GlassDivider.vue.js.map