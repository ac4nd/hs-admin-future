import { reactiveOmit } from "@vueuse/core";
import { Separator } from "reka-ui";
import { cn } from "@/lib/utils";
const props = withDefaults(defineProps(), {
    orientation: "horizontal",
    decorative: true,
});
const delegatedProps = reactiveOmit(props, "class");
const __VLS_defaults = {
    orientation: "horizontal",
    decorative: true,
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
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Separator} */
Separator;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    dataSlot: "separator",
    ...(__VLS_ctx.delegatedProps),
    ...{ class: (__VLS_ctx.cn('shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch', props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "separator",
    ...(__VLS_ctx.delegatedProps),
    ...{ class: (__VLS_ctx.cn('shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
var __VLS_3;
// @ts-ignore
[delegatedProps, cn,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=Separator.vue.js.map