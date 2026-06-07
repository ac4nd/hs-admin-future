import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = defineProps();
const emit = defineEmits();
const { isEnabled } = useGlassFilter("checkbox");
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
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: (__VLS_ctx.cn('inline-flex items-center gap-2 cursor-pointer', __VLS_ctx.disabled && 'cursor-not-allowed opacity-50', props.class)) },
});
if (__VLS_ctx.isEnabled) {
    const __VLS_0 = GlassSurface || GlassSurface;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        preset: "checkbox",
        ...{ style: ({ width: '18px', height: '18px' }) },
        onClick: (__VLS_ctx.disabled ? undefined : () => __VLS_ctx.emit('update:modelValue', !__VLS_ctx.modelValue)),
    }));
    const __VLS_2 = __VLS_1({
        preset: "checkbox",
        ...{ style: ({ width: '18px', height: '18px' }) },
        onClick: (__VLS_ctx.disabled ? undefined : () => __VLS_ctx.emit('update:modelValue', !__VLS_ctx.modelValue)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const { default: __VLS_5 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full h-full flex items-center justify-center" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    if (__VLS_ctx.modelValue) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            ...{ class: "size-3.5 text-primary" },
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            'stroke-width': "3",
        });
        /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            d: "M5 13l4 4L19 7",
        });
    }
    // @ts-ignore
    [cn, disabled, disabled, isEnabled, emit, modelValue, modelValue,];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onChange: (...[$event]) => {
                if (!!(__VLS_ctx.isEnabled))
                    return;
                __VLS_ctx.emit('update:modelValue', $event.target.checked);
                // @ts-ignore
                [emit,];
            } },
        type: "checkbox",
        checked: (__VLS_ctx.modelValue),
        disabled: (__VLS_ctx.disabled),
        ...{ class: "size-4 rounded border border-input accent-primary" },
    });
    /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-input']} */ ;
    /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
}
if (__VLS_ctx.label) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    (__VLS_ctx.label);
}
// @ts-ignore
[disabled, modelValue, label, label,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=GlassCheckbox.vue.js.map