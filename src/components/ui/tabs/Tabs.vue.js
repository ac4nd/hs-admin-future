import { reactiveOmit } from "@vueuse/core";
import { TabsRoot, useForwardPropsEmits } from "reka-ui";
import { cn } from "@/lib/utils";
const props = defineProps();
const emits = defineEmits();
const delegatedProps = reactiveOmit(props, "class");
const forwarded = useForwardPropsEmits(delegatedProps, emits);
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
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.TabsRoot | typeof __VLS_components.TabsRoot} */
TabsRoot;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    dataSlot: "tabs",
    dataOrientation: (__VLS_ctx.forwarded.orientation || 'horizontal'),
    ...(__VLS_ctx.forwarded),
    ...{ class: (__VLS_ctx.cn('gap-2 group/tabs flex data-horizontal:flex-col', props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "tabs",
    dataOrientation: (__VLS_ctx.forwarded.orientation || 'horizontal'),
    ...(__VLS_ctx.forwarded),
    ...{ class: (__VLS_ctx.cn('gap-2 group/tabs flex data-horizontal:flex-col', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
{
    const { default: __VLS_6 } = __VLS_3.slots;
    const [slotProps] = __VLS_vSlot(__VLS_6);
    var __VLS_7 = {
        ...(slotProps),
    };
    // @ts-ignore
    [forwarded, forwarded, cn,];
    __VLS_3.slots['' /* empty slot name completion */];
}
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=Tabs.vue.js.map