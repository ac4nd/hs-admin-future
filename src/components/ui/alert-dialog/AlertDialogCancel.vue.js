import { reactiveOmit } from "@vueuse/core";
import { AlertDialogCancel } from "reka-ui";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
const props = withDefaults(defineProps(), {
    variant: "outline",
    size: "default",
});
const delegatedProps = reactiveOmit(props, "class", "variant", "size");
const __VLS_defaults = {
    variant: "outline",
    size: "default",
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
/** @ts-ignore @type { | typeof __VLS_components.AlertDialogCancel | typeof __VLS_components.AlertDialogCancel} */
AlertDialogCancel;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    dataSlot: "alert-dialog-cancel",
    ...(__VLS_ctx.delegatedProps),
    ...{ class: (__VLS_ctx.cn('', __VLS_ctx.buttonVariants({ variant: __VLS_ctx.variant, size: __VLS_ctx.size }), props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "alert-dialog-cancel",
    ...(__VLS_ctx.delegatedProps),
    ...{ class: (__VLS_ctx.cn('', __VLS_ctx.buttonVariants({ variant: __VLS_ctx.variant, size: __VLS_ctx.size }), props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
// @ts-ignore
[delegatedProps, cn, buttonVariants, variant, size,];
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
//# sourceMappingURL=AlertDialogCancel.vue.js.map