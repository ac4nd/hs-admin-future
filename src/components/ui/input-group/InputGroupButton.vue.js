import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { inputGroupButtonVariants } from ".";
const props = withDefaults(defineProps(), {
    size: "xs",
    variant: "ghost",
});
const __VLS_defaults = {
    size: "xs",
    variant: "ghost",
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
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    type: "button",
    dataSize: (props.size),
    variant: (props.variant),
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.inputGroupButtonVariants({ size: props.size }), props.class)) },
}));
const __VLS_2 = __VLS_1({
    type: "button",
    dataSize: (props.size),
    variant: (props.variant),
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.inputGroupButtonVariants({ size: props.size }), props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
// @ts-ignore
[cn, inputGroupButtonVariants,];
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
//# sourceMappingURL=InputGroupButton.vue.js.map