import { cn } from "@/lib/utils";
import { Table } from "@/components/ui/table";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = defineProps();
const { isEnabled } = useGlassFilter("table");
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
        preset: "table",
        ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
        mouseTracking: (false),
    }));
    const __VLS_2 = __VLS_1({
        preset: "table",
        ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
        mouseTracking: (false),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full overflow-auto" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.table, __VLS_intrinsics.table)({
        ...{ class: "w-full caption-bottom text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['caption-bottom']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    var __VLS_7 = {};
    // @ts-ignore
    [isEnabled, cn,];
    var __VLS_3;
}
else {
    let __VLS_9;
    /** @ts-ignore @type { | typeof __VLS_components.Table | typeof __VLS_components.Table} */
    Table;
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
const __VLS_export = {};
export default {};
//# sourceMappingURL=GlassTable.vue.js.map