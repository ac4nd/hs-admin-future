import { CheckIcon } from "@lucide/vue";
import { reactiveOmit, useCurrentElement } from "@vueuse/core";
import { ListboxItem, useForwardPropsEmits, useId } from "reka-ui";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { cn } from "@/lib/utils";
import { useCommand, useCommandGroup } from ".";
const props = defineProps();
const emits = defineEmits();
const delegatedProps = reactiveOmit(props, "class");
const forwarded = useForwardPropsEmits(delegatedProps, emits);
const id = useId();
const { filterState, allItems, allGroups } = useCommand();
const groupContext = useCommandGroup();
const isRender = computed(() => {
    if (!filterState.search) {
        return true;
    }
    else {
        const filteredCurrentItem = filterState.filtered.items.get(id);
        // If the filtered items is undefined means not in the all times map yet
        // Do the first render to add into the map
        if (filteredCurrentItem === undefined) {
            return true;
        }
        // Check with filter
        return filteredCurrentItem > 0;
    }
});
const itemRef = ref();
const currentElement = useCurrentElement(itemRef);
onMounted(() => {
    if (!(currentElement.value instanceof HTMLElement))
        return;
    // textValue to perform filter
    allItems.value.set(id, currentElement.value.textContent ?? props.value?.toString() ?? "");
    const groupId = groupContext?.id;
    if (groupId) {
        if (!allGroups.value.has(groupId)) {
            allGroups.value.set(groupId, new Set([id]));
        }
        else {
            allGroups.value.get(groupId)?.add(id);
        }
    }
});
onUnmounted(() => {
    allItems.value.delete(id);
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
if (__VLS_ctx.isRender) {
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.ListboxItem | typeof __VLS_components.ListboxItem} */
    ListboxItem;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onSelect': {} },
        ...(__VLS_ctx.forwarded),
        id: (__VLS_ctx.id),
        ref: "itemRef",
        dataSlot: "command-item",
        ...{ class: (__VLS_ctx.cn('data-selected:bg-muted data-selected:text-foreground data-selected:*:[svg]:text-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! [&_svg:not([class*=size-])]:size-4 group/command-item data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0', props.class)) },
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onSelect': {} },
        ...(__VLS_ctx.forwarded),
        id: (__VLS_ctx.id),
        ref: "itemRef",
        dataSlot: "command-item",
        ...{ class: (__VLS_ctx.cn('data-selected:bg-muted data-selected:text-foreground data-selected:*:[svg]:text-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! [&_svg:not([class*=size-])]:size-4 group/command-item data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0', props.class)) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = ({ select: {} },
        { onSelect: (() => {
                __VLS_ctx.filterState.search = '';
            }) });
    var __VLS_7;
    const { default: __VLS_9 } = __VLS_3.slots;
    var __VLS_10 = {};
    let __VLS_12;
    /** @ts-ignore @type { | typeof __VLS_components.CheckIcon} */
    CheckIcon;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        ...{ class: "ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" },
    }));
    const __VLS_14 = __VLS_13({
        ...{ class: "ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    /** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-has-data-[slot=command-shortcut]/command-item:hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-data-[checked=true]/command-item:opacity-100']} */ ;
    // @ts-ignore
    [isRender, forwarded, id, cn, filterState,];
    var __VLS_3;
    var __VLS_4;
}
// @ts-ignore
var __VLS_8 = __VLS_7, __VLS_11 = __VLS_10;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=CommandItem.vue.js.map