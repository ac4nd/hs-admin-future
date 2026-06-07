import { reactiveOmit } from "@vueuse/core";
import { ListboxRoot, useFilter, useForwardPropsEmits } from "reka-ui";
import { reactive, ref, watch } from "vue";
import { cn } from "@/lib/utils";
import { provideCommandContext } from ".";
const props = withDefaults(defineProps(), {
    modelValue: "",
});
const emits = defineEmits();
const delegatedProps = reactiveOmit(props, "class");
const forwarded = useForwardPropsEmits(delegatedProps, emits);
const allItems = ref(new Map());
const allGroups = ref(new Map());
const { contains } = useFilter({ sensitivity: "base" });
const filterState = reactive({
    search: "",
    filtered: {
        /** The count of all visible items. */
        count: 0,
        /** Map from visible item id to its search score. */
        items: new Map(),
        /** Set of groups with at least one visible item. */
        groups: new Set(),
    },
});
function filterItems() {
    if (!filterState.search) {
        filterState.filtered.count = allItems.value.size;
        // Do nothing, each item will know to show itself because search is empty
        return;
    }
    // Reset the groups
    filterState.filtered.groups = new Set();
    let itemCount = 0;
    // Check which items should be included
    for (const [id, value] of allItems.value) {
        const score = contains(value, filterState.search);
        filterState.filtered.items.set(id, score ? 1 : 0);
        if (score)
            itemCount++;
    }
    // Check which groups have at least 1 item shown
    for (const [groupId, group] of allGroups.value) {
        for (const itemId of group) {
            if (filterState.filtered.items.get(itemId) > 0) {
                filterState.filtered.groups.add(groupId);
                break;
            }
        }
    }
    filterState.filtered.count = itemCount;
}
watch(() => filterState.search, () => {
    filterItems();
});
provideCommandContext({
    allItems,
    allGroups,
    filterState,
});
const __VLS_defaults = {
    modelValue: "",
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
/** @ts-ignore @type { | typeof __VLS_components.ListboxRoot | typeof __VLS_components.ListboxRoot} */
ListboxRoot;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    dataSlot: "command",
    ...(__VLS_ctx.forwarded),
    ...{ class: (__VLS_ctx.cn('bg-popover text-popover-foreground rounded-xl! p-1 flex size-full flex-col overflow-hidden', props.class)) },
}));
const __VLS_2 = __VLS_1({
    dataSlot: "command",
    ...(__VLS_ctx.forwarded),
    ...{ class: (__VLS_ctx.cn('bg-popover text-popover-foreground rounded-xl! p-1 flex size-full flex-col overflow-hidden', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
// @ts-ignore
[forwarded, cn,];
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=Command.vue.js.map