import { ref, computed } from "vue";
import { ChevronDownIcon } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import MenuTreeNode from "./MenuTreeNode.vue";
const props = withDefaults(defineProps(), {
    modelValue: "",
    placeholder: "请选择",
    topLevelLabel: "顶级菜单",
    searchPlaceholder: "搜索...",
});
const emit = defineEmits();
const popoverOpen = ref(false);
const keyword = ref("");
/** 递归查找选中项的标签 */
function findLabel(nodes, value) {
    for (const node of nodes) {
        if (String(node.value) === value)
            return node.label;
        if (node.children) {
            const found = findLabel(node.children, value);
            if (found)
                return found;
        }
    }
    return "";
}
const selectedLabel = computed(() => {
    if (!props.modelValue || props.modelValue === "0")
        return "";
    return findLabel(props.options, props.modelValue);
});
/** 递归过滤选项树 */
function filterTree(nodes, kw) {
    if (!kw)
        return nodes;
    return nodes
        .map((node) => {
        if (node.label.toLowerCase().includes(kw.toLowerCase()))
            return { ...node };
        if (node.children) {
            const filtered = filterTree(node.children, kw);
            if (filtered.length > 0)
                return { ...node, children: filtered };
        }
        return null;
    })
        .filter(Boolean);
}
const filteredOptions = computed(() => filterTree(props.options, keyword.value));
function handleSelect(value) {
    emit("update:modelValue", String(value));
    popoverOpen.value = false;
}
const __VLS_defaults = {
    modelValue: "",
    placeholder: "请选择",
    topLevelLabel: "顶级菜单",
    searchPlaceholder: "搜索...",
};
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
    role: "combobox",
    'aria-expanded': (__VLS_ctx.popoverOpen),
    ...{ class: "w-full justify-between font-normal" },
}));
const __VLS_15 = __VLS_14({
    variant: "outline",
    role: "combobox",
    'aria-expanded': (__VLS_ctx.popoverOpen),
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
/** @ts-ignore @type { | typeof __VLS_components.ChevronDownIcon} */
ChevronDownIcon;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    ...{ class: "ml-2 size-4 shrink-0 opacity-50" },
}));
const __VLS_21 = __VLS_20({
    ...{ class: "ml-2 size-4 shrink-0 opacity-50" },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
// @ts-ignore
[popoverOpen, popoverOpen, selectedLabel, selectedLabel, placeholder,];
var __VLS_16;
// @ts-ignore
[];
var __VLS_10;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.PopoverContent | typeof __VLS_components.PopoverContent} */
PopoverContent;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    ...{ class: "w-[--reka-popper-anchor-width] p-0" },
    align: "start",
}));
const __VLS_26 = __VLS_25({
    ...{ class: "w-[--reka-popper-anchor-width] p-0" },
    align: "start",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
/** @type {__VLS_StyleScopedClasses['w-[--reka-popper-anchor-width]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-0']} */ ;
const { default: __VLS_29 } = __VLS_27.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-2 border-b" },
});
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    modelValue: (__VLS_ctx.keyword),
    placeholder: (__VLS_ctx.searchPlaceholder),
    ...{ class: "h-8" },
}));
const __VLS_32 = __VLS_31({
    modelValue: (__VLS_ctx.keyword),
    placeholder: (__VLS_ctx.searchPlaceholder),
    ...{ class: "h-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
let __VLS_35;
/** @ts-ignore @type { | typeof __VLS_components.ScrollArea | typeof __VLS_components.ScrollArea} */
ScrollArea;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    ...{ class: "max-h-60" },
}));
const __VLS_37 = __VLS_36({
    ...{ class: "max-h-60" },
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
/** @type {__VLS_StyleScopedClasses['max-h-60']} */ ;
const { default: __VLS_40 } = __VLS_38.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-1" },
});
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.handleSelect('0');
            // @ts-ignore
            [keyword, searchPlaceholder, handleSelect,];
        } },
    ...{ class: "w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-muted transition-colors" },
    ...{ class: ({ 'bg-primary/10 text-primary font-medium': __VLS_ctx.modelValue === '0' }) },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary/10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
(__VLS_ctx.topLevelLabel);
for (const [node] of __VLS_vFor((__VLS_ctx.filteredOptions))) {
    const __VLS_41 = MenuTreeNode;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
        ...{ 'onSelect': {} },
        key: (String(node.value)),
        node: (node),
        keyword: (__VLS_ctx.keyword),
        selectedValue: (__VLS_ctx.modelValue),
    }));
    const __VLS_43 = __VLS_42({
        ...{ 'onSelect': {} },
        key: (String(node.value)),
        node: (node),
        keyword: (__VLS_ctx.keyword),
        selectedValue: (__VLS_ctx.modelValue),
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    let __VLS_46;
    const __VLS_47 = ({ select: {} },
        { onSelect: (__VLS_ctx.handleSelect) });
    var __VLS_44;
    var __VLS_45;
    // @ts-ignore
    [keyword, handleSelect, modelValue, modelValue, topLevelLabel, filteredOptions,];
}
// @ts-ignore
[];
var __VLS_38;
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
    props: {},
});
export default {};
//# sourceMappingURL=TreeSelect.vue.js.map