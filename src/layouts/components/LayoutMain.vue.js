import { computed } from "vue";
import { useSettingsStore } from "@/stores";
const settingsStore = useSettingsStore();
const glassEffect = computed(() => settingsStore.glassEffect);
const appMainHeight = computed(() => {
    const navbar = "var(--navbar-height)";
    const tags = "var(--tags-view-height)";
    return settingsStore.showTagsView
        ? `calc(100vh - ${navbar} - ${tags})`
        : `calc(100vh - ${navbar})`;
});
const transitionName = computed(() => settingsStore.pageSwitchingAnimation ?? "");
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "app-main" },
    ...{ class: (__VLS_ctx.glassEffect ? 'bg-transparent' : 'bg-[var(--page-bg)]') },
    ...{ style: ({ height: __VLS_ctx.appMainHeight }) },
});
/** @type {__VLS_StyleScopedClasses['app-main']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.routerView | typeof __VLS_components.RouterView | typeof __VLS_components['router-view'] | typeof __VLS_components.routerView | typeof __VLS_components.RouterView | typeof __VLS_components['router-view']} */
routerView;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
{
    const { default: __VLS_5 } = __VLS_3.slots;
    const [{ Component, route }] = __VLS_vSlot(__VLS_5);
    let __VLS_6;
    /** @ts-ignore @type { | typeof __VLS_components.transition | typeof __VLS_components.Transition | typeof __VLS_components.transition | typeof __VLS_components.Transition} */
    transition;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        name: (__VLS_ctx.transitionName),
        mode: "out-in",
    }));
    const __VLS_8 = __VLS_7({
        name: (__VLS_ctx.transitionName),
        mode: "out-in",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const { default: __VLS_11 } = __VLS_9.slots;
    const __VLS_12 = (Component);
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        key: (route.fullPath),
    }));
    const __VLS_14 = __VLS_13({
        key: (route.fullPath),
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    // @ts-ignore
    [glassEffect, appMainHeight, transitionName,];
    var __VLS_9;
    // @ts-ignore
    [];
    __VLS_3.slots['' /* empty slot name completion */];
}
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=LayoutMain.vue.js.map