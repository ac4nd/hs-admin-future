import { SearchIcon } from "@lucide/vue";
import { reactiveOmit } from "@vueuse/core";
import { ListboxFilter, useForwardProps } from "reka-ui";
import { cn } from "@/lib/utils";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { useCommand } from ".";
defineOptions({
    inheritAttrs: false,
});
const props = defineProps();
const delegatedProps = reactiveOmit(props, "class");
const forwardedProps = useForwardProps(delegatedProps);
const { filterState } = useCommand();
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    'data-slot': "command-input-wrapper",
    ...{ class: "p-1 pb-0" },
});
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-0']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.InputGroup | typeof __VLS_components.InputGroup} */
InputGroup;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "bg-input/30 border-input/30 h-8! rounded-lg! shadow-none! *:data-[slot=input-group-addon]:pl-2!" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "bg-input/30 border-input/30 h-8! rounded-lg! shadow-none! *:data-[slot=input-group-addon]:pl-2!" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['bg-input/30']} */ ;
/** @type {__VLS_StyleScopedClasses['border-input/30']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8!']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg!']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-none!']} */ ;
/** @type {__VLS_StyleScopedClasses['*:data-[slot=input-group-addon]:pl-2!']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.ListboxFilter} */
ListboxFilter;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    ...({ ...__VLS_ctx.forwardedProps, ...__VLS_ctx.$attrs }),
    modelValue: (__VLS_ctx.filterState.search),
    dataSlot: "command-input",
    autoFocus: true,
    ...{ class: (__VLS_ctx.cn('w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50', props.class)) },
}));
const __VLS_8 = __VLS_7({
    ...({ ...__VLS_ctx.forwardedProps, ...__VLS_ctx.$attrs }),
    modelValue: (__VLS_ctx.filterState.search),
    dataSlot: "command-input",
    autoFocus: true,
    ...{ class: (__VLS_ctx.cn('w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_11;
/** @ts-ignore @type { | typeof __VLS_components.InputGroupAddon | typeof __VLS_components.InputGroupAddon} */
InputGroupAddon;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({}));
const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_16 } = __VLS_14.slots;
let __VLS_17;
/** @ts-ignore @type { | typeof __VLS_components.SearchIcon} */
SearchIcon;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
    ...{ class: "size-4 shrink-0 opacity-50" },
}));
const __VLS_19 = __VLS_18({
    ...{ class: "size-4 shrink-0 opacity-50" },
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
// @ts-ignore
[forwardedProps, $attrs, filterState, cn,];
var __VLS_14;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=CommandInput.vue.js.map