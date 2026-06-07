import { ref } from "vue";
import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = defineProps();
const { isEnabled } = useGlassFilter("accordion");
const openItems = ref(new Set());
function toggle(id) {
    if (openItems.value.has(id)) {
        openItems.value.delete(id);
    }
    else {
        if (!props.multiple)
            openItems.value.clear();
        openItems.value.add(id);
    }
    // 触发响应式更新
    openItems.value = new Set(openItems.value);
}
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.cn('w-full space-y-2', props.class)) },
});
for (const [item] of __VLS_vFor((__VLS_ctx.items))) {
    const __VLS_0 = GlassSurface || GlassSurface;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        key: (item.id),
        preset: (__VLS_ctx.isEnabled ? 'accordion' : 'button'),
        ...{ class: (__VLS_ctx.cn('w-full', !__VLS_ctx.isEnabled && 'border rounded-lg')) },
        mouseTracking: (false),
    }));
    const __VLS_2 = __VLS_1({
        key: (item.id),
        preset: (__VLS_ctx.isEnabled ? 'accordion' : 'button'),
        ...{ class: (__VLS_ctx.cn('w-full', !__VLS_ctx.isEnabled && 'border rounded-lg')) },
        mouseTracking: (false),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const { default: __VLS_5 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.toggle(item.id);
                // @ts-ignore
                [cn, cn, items, isEnabled, isEnabled, toggle,];
            } },
        ...{ class: "w-full flex items-center justify-between px-4 py-3 text-sm font-medium" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (item.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: (__VLS_ctx.cn('size-4 transition-transform', __VLS_ctx.openItems.has(item.id) && 'rotate-180')) },
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        'stroke-width': "2",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        d: "M19 9l-7 7-7-7",
    });
    if (__VLS_ctx.openItems.has(item.id)) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "px-4 pb-3 text-sm text-muted-foreground" },
        });
        /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        (item.content);
    }
    // @ts-ignore
    [cn, openItems, openItems,];
    var __VLS_3;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=GlassAccordion.vue.js.map