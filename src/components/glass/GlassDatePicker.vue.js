import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = defineProps();
const emit = defineEmits();
const { isEnabled } = useGlassFilter("date-picker");
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
        preset: "date-picker",
        ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
    }));
    const __VLS_2 = __VLS_1({
        preset: "date-picker",
        ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onInput: (...[$event]) => {
                if (!(__VLS_ctx.isEnabled))
                    return;
                __VLS_ctx.emit('update:modelValue', $event.target.value);
                // @ts-ignore
                [isEnabled, cn, emit,];
            } },
        type: "date",
        value: (__VLS_ctx.modelValue),
        disabled: (__VLS_ctx.disabled),
        min: (__VLS_ctx.min),
        max: (__VLS_ctx.max),
        ...{ class: "w-full bg-transparent outline-none text-sm h-8 px-3 disabled:opacity-50 disabled:cursor-not-allowed [color-scheme:dark]" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
    /** @type {__VLS_StyleScopedClasses['[color-scheme:dark]']} */ ;
    // @ts-ignore
    [modelValue, disabled, min, max,];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.isEnabled))
                    return;
                __VLS_ctx.emit('update:modelValue', $event.target.value);
                // @ts-ignore
                [emit,];
            } },
        type: "date",
        value: (__VLS_ctx.modelValue),
        disabled: (__VLS_ctx.disabled),
        min: (__VLS_ctx.min),
        max: (__VLS_ctx.max),
        ...{ class: (__VLS_ctx.cn('flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50', props.class)) },
    });
}
// @ts-ignore
[cn, modelValue, disabled, min, max,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=GlassDatePicker.vue.js.map