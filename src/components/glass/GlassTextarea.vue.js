import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = withDefaults(defineProps(), {
    modelValue: "",
    placeholder: "",
    disabled: false,
    rows: 3,
});
const emit = defineEmits();
const { isEnabled } = useGlassFilter("textarea");
const __VLS_defaults = {
    modelValue: "",
    placeholder: "",
    disabled: false,
    rows: 3,
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
        preset: "textarea",
        ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
    }));
    const __VLS_2 = __VLS_1({
        preset: "textarea",
        ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.textarea)({
        ...{ onInput: (...[$event]) => {
                if (!(__VLS_ctx.isEnabled))
                    return;
                __VLS_ctx.emit('update:modelValue', $event.target.value);
                // @ts-ignore
                [isEnabled, cn, emit,];
            } },
        value: (__VLS_ctx.modelValue),
        placeholder: (__VLS_ctx.placeholder),
        disabled: (__VLS_ctx.disabled),
        rows: (__VLS_ctx.rows),
        maxlength: (__VLS_ctx.maxlength),
        ...{ class: "w-full bg-transparent outline-none text-sm px-3 py-2 resize-y placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['resize-y']} */ ;
    /** @type {__VLS_StyleScopedClasses['placeholder:text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
    // @ts-ignore
    [modelValue, placeholder, disabled, rows, maxlength,];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.textarea)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.isEnabled))
                    return;
                __VLS_ctx.emit('update:modelValue', $event.target.value);
                // @ts-ignore
                [emit,];
            } },
        value: (__VLS_ctx.modelValue),
        placeholder: (__VLS_ctx.placeholder),
        disabled: (__VLS_ctx.disabled),
        rows: (__VLS_ctx.rows),
        maxlength: (__VLS_ctx.maxlength),
        ...{ class: (__VLS_ctx.cn('flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50', props.class)) },
    });
}
// @ts-ignore
[cn, modelValue, placeholder, disabled, rows, maxlength,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=GlassTextarea.vue.js.map