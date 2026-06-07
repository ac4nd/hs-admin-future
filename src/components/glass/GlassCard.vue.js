import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
// 子组件导出（无独立玻璃效果，继承父级 Card 的玻璃壳）
export { default as GlassCardHeader } from "@/components/ui/card/CardHeader.vue";
export { default as GlassCardTitle } from "@/components/ui/card/CardTitle.vue";
export { default as GlassCardDescription } from "@/components/ui/card/CardDescription.vue";
export { default as GlassCardContent } from "@/components/ui/card/CardContent.vue";
export { default as GlassCardFooter } from "@/components/ui/card/CardFooter.vue";
export default {};
const __VLS_export = await (async () => {
    const props = defineProps();
    const { isEnabled } = useGlassFilter("card");
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
            preset: "card",
            ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
        }));
        const __VLS_2 = __VLS_1({
            preset: "card",
            ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        var __VLS_5;
        const { default: __VLS_6 } = __VLS_3.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex flex-col gap-4 text-sm" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        var __VLS_7 = {};
        // @ts-ignore
        [isEnabled, cn,];
        var __VLS_3;
    }
    else {
        let __VLS_9;
        /** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
        Card;
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent1(__VLS_9, new __VLS_9({
            ...{ class: (props.class) },
        }));
        const __VLS_11 = __VLS_10({
            ...{ class: (props.class) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_10));
        var __VLS_14;
        const { default: __VLS_15 } = __VLS_12.slots;
        var __VLS_16 = {};
        // @ts-ignore
        [];
        var __VLS_12;
    }
    // @ts-ignore
    var __VLS_8 = __VLS_7, __VLS_17 = __VLS_16;
    // @ts-ignore
    [];
    const __VLS_base = (await import('vue')).defineComponent({
        __typeProps: {},
    });
    return {};
})();
//# sourceMappingURL=GlassCard.vue.js.map