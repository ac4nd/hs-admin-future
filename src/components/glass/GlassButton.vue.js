import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = withDefaults(defineProps(), {
    variant: "ghost",
    size: "default",
    disabled: false,
    type: "button",
    as: "button",
    asChild: false,
});
const emit = defineEmits();
const { isEnabled } = useGlassFilter("button");
const handleClick = () => {
    if (!props.disabled)
        emit("click");
};
const __VLS_defaults = {
    variant: "ghost",
    size: "default",
    disabled: false,
    type: "button",
    as: "button",
    asChild: false,
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
if (!__VLS_ctx.isEnabled) {
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        variant: (__VLS_ctx.variant),
        size: (__VLS_ctx.size),
        disabled: (__VLS_ctx.disabled),
        type: (__VLS_ctx.type),
        as: (__VLS_ctx.as),
        asChild: (__VLS_ctx.asChild),
        ...{ class: (__VLS_ctx.cn('cursor-pointer', props.class)) },
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        variant: (__VLS_ctx.variant),
        size: (__VLS_ctx.size),
        disabled: (__VLS_ctx.disabled),
        type: (__VLS_ctx.type),
        as: (__VLS_ctx.as),
        asChild: (__VLS_ctx.asChild),
        ...{ class: (__VLS_ctx.cn('cursor-pointer', props.class)) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = ({ click: {} },
        { onClick: (__VLS_ctx.handleClick) });
    var __VLS_7;
    const { default: __VLS_8 } = __VLS_3.slots;
    var __VLS_9 = {};
    // @ts-ignore
    [isEnabled, variant, size, disabled, type, as, asChild, cn, handleClick,];
    var __VLS_3;
    var __VLS_4;
}
else {
    const __VLS_11 = GlassSurface || GlassSurface;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
        preset: "button",
        ...{ class: (__VLS_ctx.cn('inline-flex', props.class)) },
        onClick: (__VLS_ctx.disabled ? undefined : __VLS_ctx.handleClick),
    }));
    const __VLS_13 = __VLS_12({
        preset: "button",
        ...{ class: (__VLS_ctx.cn('inline-flex', props.class)) },
        onClick: (__VLS_ctx.disabled ? undefined : __VLS_ctx.handleClick),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    var __VLS_16;
    const { default: __VLS_17 } = __VLS_14.slots;
    let __VLS_18;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
        variant: ('ghost'),
        size: (__VLS_ctx.size),
        disabled: (__VLS_ctx.disabled),
        type: (__VLS_ctx.type),
        ...{ class: "w-full bg-transparent border-0 shadow-none hover:bg-transparent dark:hover:bg-transparent" },
    }));
    const __VLS_20 = __VLS_19({
        variant: ('ghost'),
        size: (__VLS_ctx.size),
        disabled: (__VLS_ctx.disabled),
        type: (__VLS_ctx.type),
        ...{ class: "w-full bg-transparent border-0 shadow-none hover:bg-transparent dark:hover:bg-transparent" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-transparent']} */ ;
    /** @type {__VLS_StyleScopedClasses['dark:hover:bg-transparent']} */ ;
    const { default: __VLS_23 } = __VLS_21.slots;
    var __VLS_24 = {};
    // @ts-ignore
    [size, disabled, disabled, type, cn, handleClick,];
    var __VLS_21;
    // @ts-ignore
    [];
    var __VLS_14;
}
// @ts-ignore
var __VLS_10 = __VLS_9, __VLS_25 = __VLS_24;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=GlassButton.vue.js.map