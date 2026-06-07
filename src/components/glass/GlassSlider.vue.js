import { computed } from "vue";
import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = withDefaults(defineProps(), {
    modelValue: 0,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
});
const emit = defineEmits();
const { isEnabled } = useGlassFilter("slider");
const percentage = computed(() => {
    const range = props.max - props.min;
    return range === 0 ? 0 : ((props.modelValue - props.min) / range) * 100;
});
function handleInput(e) {
    const value = Number(e.target.value);
    emit("update:modelValue", value);
}
const __VLS_defaults = {
    modelValue: 0,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
};
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
if (__VLS_ctx.isEnabled) {
    const __VLS_0 = GlassSurface || GlassSurface;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        preset: "slider",
        ...{ class: (__VLS_ctx.cn('w-full px-3 py-2', props.class)) },
        mouseTracking: (true),
    }));
    const __VLS_2 = __VLS_1({
        preset: "slider",
        ...{ class: (__VLS_ctx.cn('w-full px-3 py-2', props.class)) },
        mouseTracking: (true),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "relative w-full h-5 flex items-center" },
    });
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute w-full h-1.5 rounded-full bg-foreground/10" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-foreground/10']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "h-full rounded-full bg-primary" },
        ...{ style: ({ width: `${__VLS_ctx.percentage}%` }) },
    });
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onInput: (__VLS_ctx.handleInput) },
        type: "range",
        min: (__VLS_ctx.min),
        max: (__VLS_ctx.max),
        step: (__VLS_ctx.step),
        value: (__VLS_ctx.modelValue),
        disabled: (__VLS_ctx.disabled),
        ...{ class: "absolute w-full h-5 opacity-0 cursor-pointer disabled:cursor-not-allowed z-10" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-10']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "absolute w-4 h-4 rounded-full bg-white shadow-md border-2 border-primary pointer-events-none" },
        ...{ style: ({
                left: `${__VLS_ctx.percentage}%`,
                transform: 'translateX(-50%)',
                transition: 'left 0.1s ease-out',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    // @ts-ignore
    [isEnabled, cn, percentage, percentage, handleInput, min, max, step, modelValue, disabled,];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onInput: (__VLS_ctx.handleInput) },
        type: "range",
        min: (__VLS_ctx.min),
        max: (__VLS_ctx.max),
        step: (__VLS_ctx.step),
        value: (__VLS_ctx.modelValue),
        disabled: (__VLS_ctx.disabled),
        ...{ class: "w-full accent-primary disabled:opacity-50" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
}
// @ts-ignore
[cn, handleInput, min, max, step, modelValue, disabled,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=GlassSlider.vue.js.map