import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = defineProps();
const emit = defineEmits();
const { isEnabled } = useGlassFilter("radio");
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.cn('flex flex-col gap-2', props.class)) },
});
for (const [opt] of __VLS_vFor((__VLS_ctx.options))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        key: (opt.value),
        ...{ class: (__VLS_ctx.cn('inline-flex items-center gap-2 cursor-pointer', (opt.disabled || __VLS_ctx.disabled) && 'cursor-not-allowed opacity-50')) },
    });
    if (__VLS_ctx.isEnabled) {
        const __VLS_0 = GlassSurface || GlassSurface;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            preset: "radio",
            ...{ style: ({ width: '18px', height: '18px', borderRadius: '999px' }) },
            onClick: (opt.disabled || __VLS_ctx.disabled ? undefined : () => __VLS_ctx.emit('update:modelValue', opt.value)),
        }));
        const __VLS_2 = __VLS_1({
            preset: "radio",
            ...{ style: ({ width: '18px', height: '18px', borderRadius: '999px' }) },
            onClick: (opt.disabled || __VLS_ctx.disabled ? undefined : () => __VLS_ctx.emit('update:modelValue', opt.value)),
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
        if (__VLS_ctx.modelValue === opt.value) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
                ...{ class: "size-2.5 rounded-full bg-primary" },
            });
            /** @type {__VLS_StyleScopedClasses['size-2.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
        }
        // @ts-ignore
        [cn, cn, options, disabled, disabled, isEnabled, emit, modelValue,];
        var __VLS_3;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            ...{ onChange: (...[$event]) => {
                    if (!!(__VLS_ctx.isEnabled))
                        return;
                    __VLS_ctx.emit('update:modelValue', opt.value);
                    // @ts-ignore
                    [emit,];
                } },
            type: "radio",
            checked: (__VLS_ctx.modelValue === opt.value),
            disabled: (opt.disabled || __VLS_ctx.disabled),
            ...{ class: "size-4 accent-primary" },
        });
        /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    (opt.label);
    // @ts-ignore
    [disabled, modelValue,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=GlassRadio.vue.js.map