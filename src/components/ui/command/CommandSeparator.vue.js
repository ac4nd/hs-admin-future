import { reactiveOmit } from "@vueuse/core";
import { Separator } from "reka-ui";
import { cn } from "@/lib/utils";
const props = defineProps();
const delegatedProps = reactiveOmit(props, "class");
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
/** @ts-ignore @type { | typeof __VLS_components.Separator | typeof __VLS_components.Separator} */
Separator;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    dataSlot: "command-separator",
    ...(__VLS_ctx.delegatedProps),
    ...{ class: (__VLS_ctx.cn('bg-border -mx-1 h-px', props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "command-separator",
    ...(__VLS_ctx.delegatedProps),
    ...{ class: (__VLS_ctx.cn('bg-border -mx-1 h-px', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
// @ts-ignore
[delegatedProps, cn,];
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=CommandSeparator.vue.js.map