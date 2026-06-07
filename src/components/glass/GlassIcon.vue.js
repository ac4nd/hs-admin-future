import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = withDefaults(defineProps(), {
    size: 36,
    rounded: true,
});
const { isEnabled } = useGlassFilter("icon");
const __VLS_defaults = {
    size: 36,
    rounded: true,
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
        preset: "icon",
        ...{ class: (__VLS_ctx.cn('inline-flex items-center justify-center', __VLS_ctx.rounded ? 'rounded-full' : 'rounded-xl', props.class)) },
        ...{ style: ({ width: `${__VLS_ctx.size}px`, height: `${__VLS_ctx.size}px` }) },
    }));
    const __VLS_2 = __VLS_1({
        preset: "icon",
        ...{ class: (__VLS_ctx.cn('inline-flex items-center justify-center', __VLS_ctx.rounded ? 'rounded-full' : 'rounded-xl', props.class)) },
        ...{ style: ({ width: `${__VLS_ctx.size}px`, height: `${__VLS_ctx.size}px` }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    var __VLS_7 = {};
    // @ts-ignore
    [isEnabled, cn, rounded, size, size,];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: (__VLS_ctx.cn('inline-flex items-center justify-center bg-muted rounded-full', props.class)) },
        ...{ style: ({ width: `${__VLS_ctx.size}px`, height: `${__VLS_ctx.size}px` }) },
    });
    var __VLS_9 = {};
}
// @ts-ignore
var __VLS_8 = __VLS_7, __VLS_10 = __VLS_9;
// @ts-ignore
[cn, size, size,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=GlassIcon.vue.js.map