import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = defineProps();
const emit = defineEmits();
const { isEnabled } = useGlassFilter("switch");
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
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.cn('inline-flex items-center', props.class)) },
    });
    const __VLS_0 = GlassSurface || GlassSurface;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        preset: "switch",
        ...{ class: (__VLS_ctx.cn('relative cursor-pointer', __VLS_ctx.disabled && 'opacity-50 pointer-events-none')) },
        onClick: (__VLS_ctx.disabled ? undefined : () => __VLS_ctx.emit('update:modelValue', !__VLS_ctx.modelValue)),
        mouseTracking: (true),
        ...{ style: ({ width: '44px', height: '24px', padding: '0', borderRadius: '999px' }) },
    }));
    const __VLS_2 = __VLS_1({
        preset: "switch",
        ...{ class: (__VLS_ctx.cn('relative cursor-pointer', __VLS_ctx.disabled && 'opacity-50 pointer-events-none')) },
        onClick: (__VLS_ctx.disabled ? undefined : () => __VLS_ctx.emit('update:modelValue', !__VLS_ctx.modelValue)),
        mouseTracking: (true),
        ...{ style: ({ width: '44px', height: '24px', padding: '0', borderRadius: '999px' }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const { default: __VLS_5 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "relative w-full h-full" },
    });
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.cn('absolute inset-0 rounded-full transition-colors duration-200', __VLS_ctx.modelValue ? 'bg-primary/30' : 'bg-foreground/10')) },
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200" },
        ...{ style: ({ transform: __VLS_ctx.modelValue ? 'translateX(20px)' : 'translateX(0)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['left-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    // @ts-ignore
    [isEnabled, cn, cn, cn, disabled, disabled, emit, modelValue, modelValue, modelValue,];
    var __VLS_3;
}
else {
    let __VLS_6;
    /** @ts-ignore @type { | typeof __VLS_components.Switch} */
    Switch;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        ...{ 'onUpdate:checked': {} },
        checked: (__VLS_ctx.modelValue),
        disabled: (__VLS_ctx.disabled),
        ...{ class: (props.class) },
    }));
    const __VLS_8 = __VLS_7({
        ...{ 'onUpdate:checked': {} },
        checked: (__VLS_ctx.modelValue),
        disabled: (__VLS_ctx.disabled),
        ...{ class: (props.class) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_11;
    const __VLS_12 = ({ 'update:checked': {} },
        { 'onUpdate:checked': (...[$event]) => {
                if (!!(__VLS_ctx.isEnabled))
                    return;
                __VLS_ctx.emit('update:modelValue', $event);
                // @ts-ignore
                [disabled, emit, modelValue,];
            } });
    var __VLS_13;
    var __VLS_9;
    var __VLS_10;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=GlassSwitch.vue.js.map