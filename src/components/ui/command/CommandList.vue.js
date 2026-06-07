import { reactiveOmit } from "@vueuse/core";
import { ListboxContent, useForwardProps } from "reka-ui";
import { cn } from "@/lib/utils";
const props = defineProps();
const delegatedProps = reactiveOmit(props, "class");
const forwarded = useForwardProps(delegatedProps);
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
/** @ts-ignore @type { | typeof __VLS_components.ListboxContent | typeof __VLS_components.ListboxContent} */
ListboxContent;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    dataSlot: "command-list",
    ...(__VLS_ctx.forwarded),
    ...{ class: (__VLS_ctx.cn('no-scrollbar max-h-72 scroll-py-1 outline-none overflow-x-hidden overflow-y-auto', props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "command-list",
    ...(__VLS_ctx.forwarded),
    ...{ class: (__VLS_ctx.cn('no-scrollbar max-h-72 scroll-py-1 outline-none overflow-x-hidden overflow-y-auto', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    role: "presentation",
});
var __VLS_7 = {};
// @ts-ignore
[forwarded, cn,];
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
//# sourceMappingURL=CommandList.vue.js.map