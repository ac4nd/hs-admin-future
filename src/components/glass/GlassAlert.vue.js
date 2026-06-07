import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = withDefaults(defineProps(), {
    variant: "default",
    closable: false,
});
const emit = defineEmits();
const { isEnabled } = useGlassFilter("alert");
const variantIcons = {
    default: "i",
    destructive: "!",
    success: "✓",
    warning: "⚠",
};
const variantColors = {
    default: "text-foreground",
    destructive: "text-destructive",
    success: "text-green-500",
    warning: "text-yellow-500",
};
const __VLS_defaults = {
    variant: "default",
    closable: false,
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
        preset: "alert",
        ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
        mouseTracking: (false),
    }));
    const __VLS_2 = __VLS_1({
        preset: "alert",
        ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
        mouseTracking: (false),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-start gap-3 px-4 py-3" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: (__VLS_ctx.cn('text-sm font-bold mt-0.5', __VLS_ctx.variantColors[__VLS_ctx.variant])) },
    });
    (__VLS_ctx.variantIcons[__VLS_ctx.variant]);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    var __VLS_7 = {};
    if (__VLS_ctx.closable) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.isEnabled))
                        return;
                    if (!(__VLS_ctx.closable))
                        return;
                    __VLS_ctx.emit('close');
                    // @ts-ignore
                    [isEnabled, cn, cn, variantColors, variant, variant, variantIcons, closable, emit,];
                } },
            ...{ class: "text-muted-foreground hover:text-foreground text-sm" },
        });
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:text-foreground']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    }
    // @ts-ignore
    [];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.cn('relative w-full rounded-lg border p-4', __VLS_ctx.variant === 'destructive' && 'border-destructive/50 text-destructive', props.class)) },
    });
    var __VLS_9 = {};
}
// @ts-ignore
var __VLS_8 = __VLS_7, __VLS_10 = __VLS_9;
// @ts-ignore
[cn, variant,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=GlassAlert.vue.js.map