import { ref, watch } from "vue";
import { ChevronRightIcon } from "@lucide/vue";
const props = defineProps();
const emit = defineEmits();
const expanded = ref(false);
// 关键字搜索时自动展开匹配的父节点
watch(() => props.keyword, (kw) => {
    if (kw && hasMatch(props.node, kw)) {
        expanded.value = true;
    }
}, { immediate: true });
function hasMatch(node, kw) {
    if (node.label.includes(kw))
        return true;
    return (node.children ?? []).some((child) => hasMatch(child, kw));
}
function handleToggle() {
    if (props.node.children?.length) {
        expanded.value = !expanded.value;
    }
    emit("select", props.node.value);
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.handleToggle) },
    ...{ class: "w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-muted transition-colors flex items-center gap-1" },
    ...{ class: ({ 'bg-primary/10 text-primary font-medium': String(__VLS_ctx.node.value) === __VLS_ctx.selectedId }) },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary/10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
if (__VLS_ctx.node.children?.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "shrink-0 transition-transform duration-200" },
        ...{ class: ({ 'rotate-90': __VLS_ctx.expanded }) },
    });
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['rotate-90']} */ ;
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.ChevronRightIcon} */
    ChevronRightIcon;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ class: "size-3.5" },
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "size-3.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "w-3.5" },
    });
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.node.label);
if (__VLS_ctx.expanded && __VLS_ctx.node.children?.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ml-3" },
    });
    /** @type {__VLS_StyleScopedClasses['ml-3']} */ ;
    for (const [child] of __VLS_vFor((__VLS_ctx.node.children))) {
        let __VLS_5;
        /** @ts-ignore @type { | typeof __VLS_components.DeptTreeNode} */
        DeptTreeNode;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
            ...{ 'onSelect': {} },
            key: (child.value),
            node: (child),
            keyword: (__VLS_ctx.keyword),
            selectedId: (__VLS_ctx.selectedId),
        }));
        const __VLS_7 = __VLS_6({
            ...{ 'onSelect': {} },
            key: (child.value),
            node: (child),
            keyword: (__VLS_ctx.keyword),
            selectedId: (__VLS_ctx.selectedId),
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
        let __VLS_10;
        const __VLS_11 = ({ select: {} },
            { onSelect: ((v) => __VLS_ctx.emit('select', v)) });
        var __VLS_8;
        var __VLS_9;
        // @ts-ignore
        [handleToggle, node, node, node, node, node, selectedId, selectedId, expanded, expanded, keyword, emit,];
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=DeptTreeNode.vue.js.map