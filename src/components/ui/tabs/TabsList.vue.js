import { reactiveOmit } from "@vueuse/core";
import { TabsList } from "reka-ui";
import { cn } from "@/lib/utils";
import { tabsListVariants } from ".";
const props = withDefaults(defineProps(), {
    variant: "default",
});
const delegatedProps = reactiveOmit(props, "class", "variant");
const __VLS_defaults = {
    variant: "default",
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
/** @ts-ignore @type { | typeof __VLS_components.TabsList | typeof __VLS_components.TabsList} */
TabsList;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    dataSlot: "tabs-list",
    dataVariant: (__VLS_ctx.variant),
    ...(__VLS_ctx.delegatedProps),
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.tabsListVariants({ variant: __VLS_ctx.variant }), props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "tabs-list",
    dataVariant: (__VLS_ctx.variant),
    ...(__VLS_ctx.delegatedProps),
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.tabsListVariants({ variant: __VLS_ctx.variant }), props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
// @ts-ignore
[variant, variant, delegatedProps, cn, tabsListVariants,];
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=TabsList.vue.js.map