import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
const props = defineProps();
const __VLS_emit = defineEmits();
const { t } = useI18n();
const enabledText = t("dept.statusEnabled");
const disabledText = t("dept.statusDisabled");
const addText = t("dept.add");
const editText = t("dept.edit");
const deleteText = t("dept.delete");
const hasChildren = computed(() => (props.dept.children?.length ?? 0) > 0);
const isExpanded = computed(() => props.expandedIds.has(props.dept.id));
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
/** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
TableRow;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "hover:bg-muted/50" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "hover:bg-muted/50" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['hover:bg-muted/50']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
TableCell;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.$emit('toggleSelect', __VLS_ctx.dept.id);
            // @ts-ignore
            [$emit, dept,];
        } },
    type: "checkbox",
    checked: (__VLS_ctx.selectedIds.includes(__VLS_ctx.dept.id)),
    ...{ class: "size-4 rounded border-border" },
});
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
// @ts-ignore
[dept, selectedIds,];
var __VLS_9;
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
TableCell;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const { default: __VLS_17 } = __VLS_15.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-1.5" },
    ...{ style: ({ paddingLeft: `${__VLS_ctx.level * 24}px` }) },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
if (__VLS_ctx.hasChildren) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.hasChildren))
                    return;
                __VLS_ctx.$emit('toggleExpand', __VLS_ctx.dept.id);
                // @ts-ignore
                [$emit, dept, level, hasChildren,];
            } },
        ...{ class: "inline-flex items-center justify-center w-5 h-5 rounded hover:bg-muted text-muted-foreground text-xs shrink-0" },
    });
    /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-muted']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    (__VLS_ctx.isExpanded ? "▼" : "▶");
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "w-5 shrink-0" },
    });
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "font-medium text-sm" },
});
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
(__VLS_ctx.dept.name);
// @ts-ignore
[dept, isExpanded,];
var __VLS_15;
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
TableCell;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    ...{ class: "text-center" },
}));
const __VLS_20 = __VLS_19({
    ...{ class: "text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_23 } = __VLS_21.slots;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
Badge;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    variant: (__VLS_ctx.dept.status === 1 ? 'default' : 'secondary'),
}));
const __VLS_26 = __VLS_25({
    variant: (__VLS_ctx.dept.status === 1 ? 'default' : 'secondary'),
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const { default: __VLS_29 } = __VLS_27.slots;
(__VLS_ctx.dept.status === 1 ? __VLS_ctx.enabledText : __VLS_ctx.disabledText);
// @ts-ignore
[dept, dept, enabledText, disabledText,];
var __VLS_27;
// @ts-ignore
[];
var __VLS_21;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
TableCell;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    ...{ class: "text-center" },
}));
const __VLS_32 = __VLS_31({
    ...{ class: "text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_35 } = __VLS_33.slots;
(__VLS_ctx.dept.sort);
// @ts-ignore
[dept,];
var __VLS_33;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
TableCell;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    ...{ class: "text-center" },
}));
const __VLS_38 = __VLS_37({
    ...{ class: "text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_41 } = __VLS_39.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-center gap-1" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: "h-7 text-xs" },
}));
const __VLS_44 = __VLS_43({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: "h-7 text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
let __VLS_47;
const __VLS_48 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.$emit('create', __VLS_ctx.dept.id);
            // @ts-ignore
            [$emit, dept,];
        } });
/** @type {__VLS_StyleScopedClasses['h-7']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_49 } = __VLS_45.slots;
(__VLS_ctx.addText);
// @ts-ignore
[addText,];
var __VLS_45;
var __VLS_46;
let __VLS_50;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: "h-7 text-xs" },
}));
const __VLS_52 = __VLS_51({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: "h-7 text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
let __VLS_55;
const __VLS_56 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.$emit('edit', __VLS_ctx.dept.id);
            // @ts-ignore
            [$emit, dept,];
        } });
/** @type {__VLS_StyleScopedClasses['h-7']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_57 } = __VLS_53.slots;
(__VLS_ctx.editText);
// @ts-ignore
[editText,];
var __VLS_53;
var __VLS_54;
let __VLS_58;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: "h-7 text-xs text-destructive hover:text-destructive" },
}));
const __VLS_60 = __VLS_59({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: "h-7 text-xs text-destructive hover:text-destructive" },
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
let __VLS_63;
const __VLS_64 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.$emit('delete', __VLS_ctx.dept.id);
            // @ts-ignore
            [$emit, dept,];
        } });
/** @type {__VLS_StyleScopedClasses['h-7']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-destructive']} */ ;
const { default: __VLS_65 } = __VLS_61.slots;
(__VLS_ctx.deleteText);
// @ts-ignore
[deleteText,];
var __VLS_61;
var __VLS_62;
// @ts-ignore
[];
var __VLS_39;
// @ts-ignore
[];
var __VLS_3;
if (__VLS_ctx.hasChildren && __VLS_ctx.isExpanded) {
    for (const [child] of __VLS_vFor((__VLS_ctx.dept.children))) {
        let __VLS_66;
        /** @ts-ignore @type { | typeof __VLS_components.DeptTableRow} */
        DeptTableRow;
        // @ts-ignore
        const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
            ...{ 'onToggleExpand': {} },
            ...{ 'onToggleSelect': {} },
            ...{ 'onCreate': {} },
            ...{ 'onEdit': {} },
            ...{ 'onDelete': {} },
            key: (child.id),
            dept: (child),
            level: (__VLS_ctx.level + 1),
            expandedIds: (__VLS_ctx.expandedIds),
            selectedIds: (__VLS_ctx.selectedIds),
        }));
        const __VLS_68 = __VLS_67({
            ...{ 'onToggleExpand': {} },
            ...{ 'onToggleSelect': {} },
            ...{ 'onCreate': {} },
            ...{ 'onEdit': {} },
            ...{ 'onDelete': {} },
            key: (child.id),
            dept: (child),
            level: (__VLS_ctx.level + 1),
            expandedIds: (__VLS_ctx.expandedIds),
            selectedIds: (__VLS_ctx.selectedIds),
        }, ...__VLS_functionalComponentArgsRest(__VLS_67));
        let __VLS_71;
        const __VLS_72 = ({ toggleExpand: {} },
            { onToggleExpand: (...[$event]) => {
                    if (!(__VLS_ctx.hasChildren && __VLS_ctx.isExpanded))
                        return;
                    __VLS_ctx.$emit('toggleExpand', $event);
                    // @ts-ignore
                    [$emit, dept, selectedIds, level, hasChildren, isExpanded, expandedIds,];
                } });
        const __VLS_73 = ({ toggleSelect: {} },
            { onToggleSelect: (...[$event]) => {
                    if (!(__VLS_ctx.hasChildren && __VLS_ctx.isExpanded))
                        return;
                    __VLS_ctx.$emit('toggleSelect', $event);
                    // @ts-ignore
                    [$emit,];
                } });
        const __VLS_74 = ({ create: {} },
            { onCreate: (...[$event]) => {
                    if (!(__VLS_ctx.hasChildren && __VLS_ctx.isExpanded))
                        return;
                    __VLS_ctx.$emit('create', $event);
                    // @ts-ignore
                    [$emit,];
                } });
        const __VLS_75 = ({ edit: {} },
            { onEdit: (...[$event]) => {
                    if (!(__VLS_ctx.hasChildren && __VLS_ctx.isExpanded))
                        return;
                    __VLS_ctx.$emit('edit', $event);
                    // @ts-ignore
                    [$emit,];
                } });
        const __VLS_76 = ({ delete: {} },
            { onDelete: (...[$event]) => {
                    if (!(__VLS_ctx.hasChildren && __VLS_ctx.isExpanded))
                        return;
                    __VLS_ctx.$emit('delete', $event);
                    // @ts-ignore
                    [$emit,];
                } });
        var __VLS_69;
        var __VLS_70;
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
//# sourceMappingURL=DeptTableRow.vue.js.map