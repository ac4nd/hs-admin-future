import { reactiveOmit } from "@vueuse/core";
import { ListboxGroup, ListboxGroupLabel, useId } from "reka-ui";
import { computed, onMounted, onUnmounted } from "vue";
import { cn } from "@/lib/utils";
import { provideCommandGroupContext, useCommand } from ".";
const props = defineProps();
const delegatedProps = reactiveOmit(props, "class");
const { allGroups, filterState } = useCommand();
const id = useId();
const isRender = computed(() => (!filterState.search ? true : filterState.filtered.groups.has(id)));
provideCommandGroupContext({ id });
onMounted(() => {
    if (!allGroups.value.has(id))
        allGroups.value.set(id, new Set());
});
onUnmounted(() => {
    allGroups.value.delete(id);
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.ListboxGroup | typeof __VLS_components.ListboxGroup} */
ListboxGroup;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...(__VLS_ctx.delegatedProps),
    id: (__VLS_ctx.id),
    dataSlot: "command-group",
    ...{ class: (__VLS_ctx.cn('text-foreground **:[[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium', props.class)) },
    hidden: (__VLS_ctx.isRender ? undefined : true),
}));
const __VLS_2 = __VLS_1({
    ...(__VLS_ctx.delegatedProps),
    id: (__VLS_ctx.id),
    dataSlot: "command-group",
    ...{ class: (__VLS_ctx.cn('text-foreground **:[[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium', props.class)) },
    hidden: (__VLS_ctx.isRender ? undefined : true),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
if (__VLS_ctx.heading) {
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.ListboxGroupLabel | typeof __VLS_components.ListboxGroupLabel} */
    ListboxGroupLabel;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        dataSlot: "command-group-heading",
        ...{ class: "" },
    }));
    const __VLS_9 = __VLS_8({
        dataSlot: "command-group-heading",
        ...{ class: "" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    /** @type {__VLS_StyleScopedClasses['']} */ ;
    const { default: __VLS_12 } = __VLS_10.slots;
    (__VLS_ctx.heading);
    // @ts-ignore
    [delegatedProps, id, cn, isRender, heading, heading,];
    var __VLS_10;
}
var __VLS_13 = {};
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_14 = __VLS_13;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=CommandGroup.vue.js.map