import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
const props = withDefaults(defineProps(), {
    size: "icon",
    isActive: false,
});
const __VLS_defaults = {
    size: "icon",
    isActive: false,
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
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: (__VLS_ctx.href),
    'data-slot': "pagination-link",
    'data-active': (__VLS_ctx.isActive ? '' : undefined),
    'aria-current': (__VLS_ctx.isActive ? 'page' : undefined),
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.buttonVariants({
            variant: __VLS_ctx.isActive ? 'outline' : 'ghost',
            size: __VLS_ctx.size,
        }), '', props.class)) },
});
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[href, isActive, isActive, isActive, cn, buttonVariants, size,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=PaginationLink.vue.js.map