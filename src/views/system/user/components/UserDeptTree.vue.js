import { ref, computed } from "vue";
import { SearchIcon } from "@lucide/vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import DeptAPI from "@/api/system/dept";
import DeptTreeNode from "./DeptTreeNode.vue";
const props = defineProps();
const emit = defineEmits();
const deptList = ref([]);
const keyword = ref("");
const modelValue = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});
/** 递归过滤部门树 */
function filterTree(nodes, kw) {
    if (!kw)
        return nodes;
    return nodes
        .map((node) => {
        const children = node.children ? filterTree(node.children, kw) : [];
        const match = node.label.includes(kw);
        if (match || children.length > 0) {
            return { ...node, children: children.length > 0 ? children : node.children };
        }
        return null;
    })
        .filter(Boolean);
}
const filteredTree = computed(() => filterTree(deptList.value, keyword.value));
function handleSelect(value) {
    modelValue.value = value ? String(value) : undefined;
    emit("node-click");
}
import { onBeforeMount } from "vue";
onBeforeMount(async () => {
    deptList.value = await DeptAPI.getOptions();
});
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
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "h-full" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "h-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    ...{ class: "pb-3" },
}));
const __VLS_9 = __VLS_8({
    ...{ class: "pb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
const { default: __VLS_12 } = __VLS_10.slots;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    ...{ class: "text-sm" },
}));
const __VLS_15 = __VLS_14({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_18 } = __VLS_16.slots;
var __VLS_16;
var __VLS_10;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({}));
const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_24 } = __VLS_22.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative mb-3" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.SearchIcon} */
SearchIcon;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    ...{ class: "absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" },
}));
const __VLS_27 = __VLS_26({
    ...{ class: "absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" },
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    modelValue: (__VLS_ctx.keyword),
    placeholder: "搜索部门",
    ...{ class: "pl-8 h-8 text-sm" },
}));
const __VLS_32 = __VLS_31({
    modelValue: (__VLS_ctx.keyword),
    placeholder: "搜索部门",
    ...{ class: "pl-8 h-8 text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
/** @type {__VLS_StyleScopedClasses['pl-8']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
let __VLS_35;
/** @ts-ignore @type { | typeof __VLS_components.ScrollArea | typeof __VLS_components.ScrollArea} */
ScrollArea;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    ...{ class: "h-[calc(100vh-260px)]" },
}));
const __VLS_37 = __VLS_36({
    ...{ class: "h-[calc(100vh-260px)]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
/** @type {__VLS_StyleScopedClasses['h-[calc(100vh-260px)]']} */ ;
const { default: __VLS_40 } = __VLS_38.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-0.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-0.5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.handleSelect(undefined);
            // @ts-ignore
            [keyword, handleSelect,];
        } },
    ...{ class: "w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-muted transition-colors" },
    ...{ class: ({ 'bg-primary/10 text-primary font-medium': !__VLS_ctx.modelValue }) },
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
for (const [node] of __VLS_vFor((__VLS_ctx.filteredTree))) {
    const __VLS_41 = DeptTreeNode;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
        ...{ 'onSelect': {} },
        key: (node.value),
        node: (node),
        keyword: (__VLS_ctx.keyword),
        selectedId: (__VLS_ctx.modelValue),
    }));
    const __VLS_43 = __VLS_42({
        ...{ 'onSelect': {} },
        key: (node.value),
        node: (node),
        keyword: (__VLS_ctx.keyword),
        selectedId: (__VLS_ctx.modelValue),
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    let __VLS_46;
    const __VLS_47 = ({ select: {} },
        { onSelect: (__VLS_ctx.handleSelect) });
    var __VLS_44;
    var __VLS_45;
    // @ts-ignore
    [keyword, handleSelect, modelValue, modelValue, filteredTree,];
}
// @ts-ignore
[];
var __VLS_38;
// @ts-ignore
[];
var __VLS_22;
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
//# sourceMappingURL=UserDeptTree.vue.js.map