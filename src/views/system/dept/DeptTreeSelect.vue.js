import { ref, computed } from "vue";
import { ChevronDown } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import DeptTreeSelectNode from "./DeptTreeSelectNode.vue";
const props = defineProps();
const emit = defineEmits();
const popoverOpen = ref(false);
const selectedLabel = computed(() => {
    if (!props.modelValue)
        return "";
    return findLabel(props.options, props.modelValue);
});
function findLabel(nodes, value) {
    for (const node of nodes) {
        if (String(node.value) === String(value))
            return node.label;
        if (node.children) {
            const found = findLabel(node.children, value);
            if (found)
                return found;
        }
    }
    return "";
}
function handleSelect(value) {
    emit("update:modelValue", String(value));
    popoverOpen.value = false;
}
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
/** @ts-ignore @type { | typeof __VLS_components.Popover | typeof __VLS_components.Popover} */
Popover;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    open: (__VLS_ctx.popoverOpen),
}));
const __VLS_2 = __VLS_1({
    open: (__VLS_ctx.popoverOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.PopoverTrigger | typeof __VLS_components.PopoverTrigger} */
PopoverTrigger;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    asChild: true,
}));
const __VLS_9 = __VLS_8({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    variant: "outline",
    ...{ class: "w-full justify-between font-normal" },
}));
const __VLS_15 = __VLS_14({
    variant: "outline",
    ...{ class: "w-full justify-between font-normal" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
const { default: __VLS_18 } = __VLS_16.slots;
if (__VLS_ctx.selectedLabel) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "truncate" },
    });
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    (__VLS_ctx.selectedLabel);
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.placeholder);
}
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.ChevronDown} */
ChevronDown;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    ...{ class: "ml-2 h-4 w-4 shrink-0 opacity-50" },
}));
const __VLS_21 = __VLS_20({
    ...{ class: "ml-2 h-4 w-4 shrink-0 opacity-50" },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
// @ts-ignore
[popoverOpen, selectedLabel, selectedLabel, placeholder,];
var __VLS_16;
// @ts-ignore
[];
var __VLS_10;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.PopoverContent | typeof __VLS_components.PopoverContent} */
PopoverContent;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    ...{ class: "w-[--reka-popper-anchor-width] p-2 max-h-60 overflow-auto" },
    align: "start",
}));
const __VLS_26 = __VLS_25({
    ...{ class: "w-[--reka-popper-anchor-width] p-2 max-h-60 overflow-auto" },
    align: "start",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
/** @type {__VLS_StyleScopedClasses['w-[--reka-popper-anchor-width]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-60']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
const { default: __VLS_29 } = __VLS_27.slots;
for (const [opt] of __VLS_vFor((__VLS_ctx.options))) {
    const __VLS_30 = DeptTreeSelectNode;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
        ...{ 'onSelect': {} },
        key: (String(opt.value)),
        option: (opt),
        modelValue: (__VLS_ctx.modelValue),
    }));
    const __VLS_32 = __VLS_31({
        ...{ 'onSelect': {} },
        key: (String(opt.value)),
        option: (opt),
        modelValue: (__VLS_ctx.modelValue),
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    let __VLS_35;
    const __VLS_36 = ({ select: {} },
        { onSelect: (__VLS_ctx.handleSelect) });
    var __VLS_33;
    var __VLS_34;
    // @ts-ignore
    [options, modelValue, handleSelect,];
}
// @ts-ignore
[];
var __VLS_27;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=DeptTreeSelect.vue.js.map