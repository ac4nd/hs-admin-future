import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = defineProps();
const { isEnabled } = useGlassFilter("steps");
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
        preset: "steps",
        ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
        mouseTracking: (false),
    }));
    const __VLS_2 = __VLS_1({
        preset: "steps",
        ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
        mouseTracking: (false),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-2 px-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
    for (const [step, i] of __VLS_vFor((__VLS_ctx.steps))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.template)({
            key: (i),
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center gap-2" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: (__VLS_ctx.cn('flex items-center justify-center rounded-full text-xs font-medium transition-all size-7', i < __VLS_ctx.current && 'bg-primary text-primary-foreground', i === __VLS_ctx.current && 'bg-primary text-primary-foreground ring-2 ring-primary/30', i > __VLS_ctx.current && 'bg-muted text-muted-foreground')) },
        });
        (i + 1);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "hidden sm:block" },
        });
        /** @type {__VLS_StyleScopedClasses['hidden']} */ ;
        /** @type {__VLS_StyleScopedClasses['sm:block']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: (__VLS_ctx.cn('text-sm font-medium', i > __VLS_ctx.current && 'text-muted-foreground')) },
        });
        (step.title);
        if (step.description) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "text-xs text-muted-foreground" },
            });
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
            (step.description);
        }
        if (i < __VLS_ctx.steps.length - 1) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
                ...{ class: (__VLS_ctx.cn('flex-1 h-0.5 mx-2', i < __VLS_ctx.current ? 'bg-primary' : 'bg-muted')) },
            });
        }
        // @ts-ignore
        [isEnabled, cn, cn, cn, cn, steps, steps, current, current, current, current, current,];
    }
    // @ts-ignore
    [];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    for (const [step, i] of __VLS_vFor((__VLS_ctx.steps))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.template)({
            key: (i),
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center gap-2" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: (__VLS_ctx.cn('flex items-center justify-center rounded-full text-xs font-medium transition-all size-7', i < __VLS_ctx.current && 'bg-primary text-primary-foreground', i === __VLS_ctx.current && 'bg-primary text-primary-foreground ring-2 ring-primary/30', i > __VLS_ctx.current && 'bg-muted text-muted-foreground')) },
        });
        (i + 1);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "hidden sm:block" },
        });
        /** @type {__VLS_StyleScopedClasses['hidden']} */ ;
        /** @type {__VLS_StyleScopedClasses['sm:block']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: (__VLS_ctx.cn('text-sm font-medium', i > __VLS_ctx.current && 'text-muted-foreground')) },
        });
        (step.title);
        if (step.description) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "text-xs text-muted-foreground" },
            });
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
            (step.description);
        }
        if (i < __VLS_ctx.steps.length - 1) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
                ...{ class: (__VLS_ctx.cn('flex-1 h-0.5 mx-2', i < __VLS_ctx.current ? 'bg-primary' : 'bg-muted')) },
            });
        }
        // @ts-ignore
        [cn, cn, cn, cn, steps, steps, current, current, current, current, current,];
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=GlassSteps.vue.js.map