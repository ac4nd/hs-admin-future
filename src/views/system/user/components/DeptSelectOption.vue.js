import { SelectItem } from "@/components/ui/select";
const props = withDefaults(defineProps(), { depth: 0 });
const { option, depth } = props;
const __VLS_defaults = { depth: 0 };
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
/** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
SelectItem;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    value: (__VLS_ctx.option.value),
    textValue: (__VLS_ctx.option.label),
}));
const __VLS_2 = __VLS_1({
    value: (__VLS_ctx.option.value),
    textValue: (__VLS_ctx.option.label),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "pl-[calc(var(--depth,0)*16px)]" },
});
/** @type {__VLS_StyleScopedClasses['pl-[calc(var(--depth,0)*16px)]']} */ ;
(__VLS_ctx.option.label);
// @ts-ignore
[option, option, option,];
var __VLS_3;
if (__VLS_ctx.option.children?.length) {
    for (const [child] of __VLS_vFor((__VLS_ctx.option.children))) {
        let __VLS_6;
        /** @ts-ignore @type { | typeof __VLS_components.DeptSelectOption} */
        DeptSelectOption;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
            key: (child.value),
            option: (child),
            depth: (__VLS_ctx.depth + 1),
        }));
        const __VLS_8 = __VLS_7({
            key: (child.value),
            option: (child),
            depth: (__VLS_ctx.depth + 1),
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        // @ts-ignore
        [option, option, depth,];
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=DeptSelectOption.vue.js.map