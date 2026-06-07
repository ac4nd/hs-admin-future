import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = withDefaults(defineProps(), {
    alt: "",
    fallback: "?",
    size: "default",
});
const { isEnabled } = useGlassFilter("avatar");
const sizeMap = { sm: 32, default: 40, lg: 56 };
const __VLS_defaults = {
    alt: "",
    fallback: "?",
    size: "default",
};
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
        preset: "avatar",
        ...{ class: (__VLS_ctx.cn('inline-flex items-center justify-center', props.class)) },
        mouseTracking: (false),
        ...{ style: ({ width: `${__VLS_ctx.sizeMap[__VLS_ctx.size]}px`, height: `${__VLS_ctx.sizeMap[__VLS_ctx.size]}px` }) },
    }));
    const __VLS_2 = __VLS_1({
        preset: "avatar",
        ...{ class: (__VLS_ctx.cn('inline-flex items-center justify-center', props.class)) },
        mouseTracking: (false),
        ...{ style: ({ width: `${__VLS_ctx.sizeMap[__VLS_ctx.size]}px`, height: `${__VLS_ctx.sizeMap[__VLS_ctx.size]}px` }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.Avatar | typeof __VLS_components.Avatar} */
    Avatar;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        ...{ class: "w-full h-full" },
    }));
    const __VLS_9 = __VLS_8({
        ...{ class: "w-full h-full" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    const { default: __VLS_12 } = __VLS_10.slots;
    if (__VLS_ctx.src) {
        let __VLS_13;
        /** @ts-ignore @type { | typeof __VLS_components.AvatarImage} */
        AvatarImage;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
            src: (__VLS_ctx.src),
            alt: (__VLS_ctx.alt),
        }));
        const __VLS_15 = __VLS_14({
            src: (__VLS_ctx.src),
            alt: (__VLS_ctx.alt),
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    }
    let __VLS_18;
    /** @ts-ignore @type { | typeof __VLS_components.AvatarFallback | typeof __VLS_components.AvatarFallback} */
    AvatarFallback;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({}));
    const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
    const { default: __VLS_23 } = __VLS_21.slots;
    (__VLS_ctx.fallback);
    // @ts-ignore
    [isEnabled, cn, sizeMap, sizeMap, size, size, src, src, alt, fallback,];
    var __VLS_21;
    // @ts-ignore
    [];
    var __VLS_10;
    // @ts-ignore
    [];
    var __VLS_3;
}
else {
    let __VLS_24;
    /** @ts-ignore @type { | typeof __VLS_components.Avatar | typeof __VLS_components.Avatar} */
    Avatar;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
        ...{ class: (props.class) },
    }));
    const __VLS_26 = __VLS_25({
        ...{ class: (props.class) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    var __VLS_29;
    const { default: __VLS_30 } = __VLS_27.slots;
    if (__VLS_ctx.src) {
        let __VLS_31;
        /** @ts-ignore @type { | typeof __VLS_components.AvatarImage} */
        AvatarImage;
        // @ts-ignore
        const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
            src: (__VLS_ctx.src),
            alt: (__VLS_ctx.alt),
        }));
        const __VLS_33 = __VLS_32({
            src: (__VLS_ctx.src),
            alt: (__VLS_ctx.alt),
        }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    }
    let __VLS_36;
    /** @ts-ignore @type { | typeof __VLS_components.AvatarFallback | typeof __VLS_components.AvatarFallback} */
    AvatarFallback;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({}));
    const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
    const { default: __VLS_41 } = __VLS_39.slots;
    (__VLS_ctx.fallback);
    // @ts-ignore
    [src, src, alt, fallback,];
    var __VLS_39;
    // @ts-ignore
    [];
    var __VLS_27;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=GlassAvatar.vue.js.map