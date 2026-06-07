import { ref, computed } from "vue";
const props = defineProps();
const __VLS_emit = defineEmits();
const localExpanded = ref(true);
const hasChildren = computed(() => (props.option.children?.length ?? 0) > 0);
const isChecked = computed(() => props.checked.includes(String(props.option.value)));
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
            __VLS_ctx.hasChildren && (__VLS_ctx.localExpanded = !__VLS_ctx.localExpanded);
            // @ts-ignore
            [hasChildren, localExpanded, localExpanded,];
        } },
    ...{ class: "flex items-center gap-2 py-1 px-2 rounded hover:bg-muted/50 cursor-pointer select-none" },
    ...{ style: ({ paddingLeft: `${__VLS_ctx.level * 16 + 4}px` }) },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
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
    (__VLS_ctx.localExpanded ? "▼" : "▶");
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
            __VLS_ctx.$emit('toggle', String(__VLS_ctx.option.value));
            // @ts-ignore
            [hasChildren, localExpanded, level, $emit, option,];
        } },
    type: "checkbox",
    checked: (__VLS_ctx.isChecked),
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
(__VLS_ctx.option.label);
if (__VLS_ctx.hasChildren && __VLS_ctx.localExpanded) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    for (const [child] of __VLS_vFor((__VLS_ctx.option.children))) {
        let __VLS_0;
        /** @ts-ignore @type { | typeof __VLS_components.DepartmentTree} */
        DepartmentTree;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            ...{ 'onToggle': {} },
            key: (String(child.value)),
            option: (child),
            level: (__VLS_ctx.level + 1),
            checked: (__VLS_ctx.checked),
        }));
        const __VLS_2 = __VLS_1({
            ...{ 'onToggle': {} },
            key: (String(child.value)),
            option: (child),
            level: (__VLS_ctx.level + 1),
            checked: (__VLS_ctx.checked),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        let __VLS_5;
        const __VLS_6 = ({ toggle: {} },
            { onToggle: (...[$event]) => {
                    if (!(__VLS_ctx.hasChildren && __VLS_ctx.localExpanded))
                        return;
                    __VLS_ctx.$emit('toggle', $event);
                    // @ts-ignore
                    [hasChildren, localExpanded, level, $emit, option, option, isChecked, checked,];
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
//# sourceMappingURL=DepartmentTree.vue.js.map