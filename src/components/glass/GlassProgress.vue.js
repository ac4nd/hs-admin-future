import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = defineProps();
const { isEnabled } = useGlassFilter("progress");
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
        preset: "progress",
        ...{ class: (__VLS_ctx.cn('w-full h-2', props.class)) },
        mouseTracking: (false),
        ...{ style: ({ borderRadius: '999px', padding: '0' }) },
    }));
    const __VLS_2 = __VLS_1({
        preset: "progress",
        ...{ class: (__VLS_ctx.cn('w-full h-2', props.class)) },
        mouseTracking: (false),
        ...{ style: ({ borderRadius: '999px', padding: '0' }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "h-full bg-primary transition-all duration-300 ease-in-out" },
        ...{ style: ({ width: `${__VLS_ctx.modelValue ?? 0}%`, borderRadius: '999px' }) },
    });
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
    // @ts-ignore
    [isEnabled, cn, modelValue,];
    var __VLS_3;
}
else {
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.Progress} */
    Progress;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        modelValue: (__VLS_ctx.modelValue),
        ...{ class: (props.class) },
    }));
    const __VLS_9 = __VLS_8({
        modelValue: (__VLS_ctx.modelValue),
        ...{ class: (props.class) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    var __VLS_12;
    var __VLS_10;
}
// @ts-ignore
[modelValue,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=GlassProgress.vue.js.map