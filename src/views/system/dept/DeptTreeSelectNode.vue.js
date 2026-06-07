import { ref, computed } from "vue";
const props = defineProps();
const emit = defineEmits();
const localExpanded = ref(true);
const hasChildren = computed(() => (props.option.children?.length ?? 0) > 0);
function selectOption(value) {
    emit("select", value);
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-0.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-0.5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.selectOption(__VLS_ctx.option.value);
            // @ts-ignore
            [selectOption, option,];
        } },
    ...{ class: "flex items-center gap-2 py-1.5 px-3 rounded hover:bg-muted/50 cursor-pointer select-none text-sm" },
    ...{ class: ({ 'bg-muted/40 font-medium': String(__VLS_ctx.modelValue) === String(__VLS_ctx.option.value) }) },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-muted/50']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-muted/40']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
if (__VLS_ctx.hasChildren) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.hasChildren))
                    return;
                __VLS_ctx.localExpanded = !__VLS_ctx.localExpanded;
                // @ts-ignore
                [option, modelValue, hasChildren, localExpanded, localExpanded,];
            } },
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
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "truncate" },
});
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
(__VLS_ctx.option.label);
if (__VLS_ctx.hasChildren && __VLS_ctx.localExpanded) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: ({ paddingLeft: '16px' }) },
    });
    for (const [child] of __VLS_vFor((__VLS_ctx.option.children))) {
        let __VLS_0;
        /** @ts-ignore @type { | typeof __VLS_components.DeptTreeSelectNode} */
        DeptTreeSelectNode;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            ...{ 'onSelect': {} },
            key: (String(child.value)),
            option: (child),
            modelValue: (__VLS_ctx.modelValue),
        }));
        const __VLS_2 = __VLS_1({
            ...{ 'onSelect': {} },
            key: (String(child.value)),
            option: (child),
            modelValue: (__VLS_ctx.modelValue),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        let __VLS_5;
        const __VLS_6 = ({ select: {} },
            { onSelect: (...[$event]) => {
                    if (!(__VLS_ctx.hasChildren && __VLS_ctx.localExpanded))
                        return;
                    __VLS_ctx.$emit('select', $event);
                    // @ts-ignore
                    [option, option, modelValue, hasChildren, localExpanded, localExpanded, $emit,];
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
//# sourceMappingURL=DeptTreeSelectNode.vue.js.map