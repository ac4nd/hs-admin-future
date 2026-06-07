import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = withDefaults(defineProps(), {
    modelValue: "",
    placeholder: "",
    disabled: false,
    type: "text",
});
const emit = defineEmits();
const { isEnabled } = useGlassFilter("input");
const handleInput = (e) => {
    emit("update:modelValue", e.target.value);
};
const __VLS_defaults = {
    modelValue: "",
    placeholder: "",
    disabled: false,
    type: "text",
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
        preset: "input",
        ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
    }));
    const __VLS_2 = __VLS_1({
        preset: "input",
        ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onInput: (__VLS_ctx.handleInput) },
        value: (__VLS_ctx.modelValue),
        placeholder: (__VLS_ctx.placeholder),
        disabled: (__VLS_ctx.disabled),
        type: (__VLS_ctx.type),
        ...{ class: "w-full bg-transparent outline-none text-sm h-8 px-3 placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['placeholder:text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
    // @ts-ignore
    [isEnabled, cn, handleInput, modelValue, placeholder, disabled, type,];
    var __VLS_3;
}
else {
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.Input} */
    Input;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        ...{ 'onUpdate:modelValue': {} },
        modelValue: (String(__VLS_ctx.modelValue)),
        placeholder: (__VLS_ctx.placeholder),
        disabled: (__VLS_ctx.disabled),
        type: (__VLS_ctx.type),
        ...{ class: (props.class) },
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onUpdate:modelValue': {} },
        modelValue: (String(__VLS_ctx.modelValue)),
        placeholder: (__VLS_ctx.placeholder),
        disabled: (__VLS_ctx.disabled),
        type: (__VLS_ctx.type),
        ...{ class: (props.class) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_12;
    const __VLS_13 = ({ 'update:modelValue': {} },
        { 'onUpdate:modelValue': ((v) => __VLS_ctx.emit('update:modelValue', v)) });
    var __VLS_14;
    var __VLS_10;
    var __VLS_11;
}
// @ts-ignore
[modelValue, placeholder, disabled, type, emit,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=GlassInput.vue.js.map