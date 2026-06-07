import { computed } from "vue";
const props = defineProps();
const __VLS_emit = defineEmits();
const hasChildren = computed(() => (props.node.children?.length ?? 0) > 0);
const isChecked = computed(() => props.checkedIds.includes(String(props.node.value)));
const isPartial = computed(() => {
    if (!hasChildren.value || !props.parentLinked)
        return false;
    const childIds = collectChildIds(props.node.children ?? []);
    if (childIds.length === 0)
        return false;
    const checkedCount = childIds.filter((id) => props.checkedIds.includes(id)).length;
    return checkedCount > 0 && checkedCount < childIds.length;
});
function collectChildIds(nodes) {
    const ids = [];
    for (const node of nodes) {
        ids.push(String(node.value));
        if (node.children)
            ids.push(...collectChildIds(node.children));
    }
    return ids;
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.hasChildren && __VLS_ctx.$emit('toggle', String(__VLS_ctx.node.value));
            // @ts-ignore
            [hasChildren, $emit, node,];
        } },
    ...{ class: "flex items-center gap-2 py-1.5 px-2 rounded hover:bg-muted/50 cursor-pointer select-none" },
    ...{ style: ({ paddingLeft: `${__VLS_ctx.level * 20 + 8}px` }) },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-muted/50']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
if (__VLS_ctx.hasChildren) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-muted-foreground text-xs w-4 shrink-0" },
    });
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    (__VLS_ctx.expanded ? "▼" : "▶");
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "w-4 shrink-0" },
    });
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('toggle', String(__VLS_ctx.node.value));
            // @ts-ignore
            [hasChildren, $emit, node, level, expanded,];
        } },
    type: "checkbox",
    checked: (__VLS_ctx.isChecked),
    indeterminate: (__VLS_ctx.isPartial),
    ...{ class: "size-4 rounded border-border shrink-0" },
});
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-sm truncate" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
(__VLS_ctx.node.label);
if (__VLS_ctx.hasChildren && __VLS_ctx.expanded) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    for (const [child] of __VLS_vFor((__VLS_ctx.node.children))) {
        let __VLS_0;
        /** @ts-ignore @type { | typeof __VLS_components.PermTreeItem} */
        PermTreeItem;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            ...{ 'onToggle': {} },
            key: (String(child.value)),
            node: (child),
            level: (__VLS_ctx.level + 1),
            expanded: (__VLS_ctx.expanded),
            checkedIds: (__VLS_ctx.checkedIds),
            parentLinked: (__VLS_ctx.parentLinked),
        }));
        const __VLS_2 = __VLS_1({
            ...{ 'onToggle': {} },
            key: (String(child.value)),
            node: (child),
            level: (__VLS_ctx.level + 1),
            expanded: (__VLS_ctx.expanded),
            checkedIds: (__VLS_ctx.checkedIds),
            parentLinked: (__VLS_ctx.parentLinked),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        let __VLS_5;
        const __VLS_6 = ({ toggle: {} },
            { onToggle: (...[$event]) => {
                    if (!(__VLS_ctx.hasChildren && __VLS_ctx.expanded))
                        return;
                    __VLS_ctx.$emit('toggle', $event);
                    // @ts-ignore
                    [hasChildren, $emit, node, node, level, expanded, expanded, isChecked, isPartial, checkedIds, parentLinked,];
                } });
        var __VLS_3;
        var __VLS_4;
        // @ts-ignore
        [];
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=PermTreeItem.vue.js.map