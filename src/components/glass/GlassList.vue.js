import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = defineProps();
const { isEnabled } = useGlassFilter("list");
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
        preset: "list",
        ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
        mouseTracking: (false),
    }));
    const __VLS_2 = __VLS_1({
        preset: "list",
        ...{ class: (__VLS_ctx.cn('w-full', props.class)) },
        mouseTracking: (false),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.cn('divide-y divide-white/5', __VLS_ctx.bordered && 'divide-white/10')) },
    });
    var __VLS_7 = {};
    // @ts-ignore
    [isEnabled, cn, cn, bordered,];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.cn('w-full border rounded-lg divide-y', props.class)) },
    });
    var __VLS_9 = {};
}
// @ts-ignore
var __VLS_8 = __VLS_7, __VLS_10 = __VLS_9;
// @ts-ignore
[cn,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=GlassList.vue.js.map