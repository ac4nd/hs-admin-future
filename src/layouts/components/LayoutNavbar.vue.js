import { computed } from "vue";
import { PanelLeft, PanelLeftClose, Settings } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { useAppStore, useSettingsStore } from "@/stores";
import { useLayout } from "../useLayout";
import LayoutBreadcrumb from "./LayoutBreadcrumb.vue";
import SearchMenu from "./toolbar/SearchMenu.vue";
import FullscreenButton from "./toolbar/FullscreenButton.vue";
import LangSelect from "./toolbar/LangSelect.vue";
import NoticeDropdown from "./toolbar/NoticeDropdown.vue";
import TenantSwitcher from "./toolbar/TenantSwitcher.vue";
import UserDropdown from "./toolbar/UserDropdown.vue";
const __VLS_props = withDefaults(defineProps(), {
    showSidebarToggle: true,
    showBreadcrumb: true,
});
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const { isSidebarOpen, isDesktop } = useLayout();
const glassEffect = computed(() => settingsStore.glassEffect);
const __VLS_defaults = {
    showSidebarToggle: true,
    showBreadcrumb: true,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "navbar" },
    ...{ class: (__VLS_ctx.glassEffect
            ? 'backdrop-blur-2xl bg-white/10 dark:bg-black/25 shadow-lg shadow-black/5'
            : 'bg-[var(--content-bg)]') },
});
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2 min-w-0 flex-1 overflow-hidden" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
if (__VLS_ctx.showSidebarToggle) {
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "icon",
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "icon",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.showSidebarToggle))
                    return;
                __VLS_ctx.appStore.toggleSidebar();
                // @ts-ignore
                [glassEffect, showSidebarToggle, appStore,];
            } });
    const { default: __VLS_7 } = __VLS_3.slots;
    const __VLS_8 = (__VLS_ctx.isSidebarOpen ? __VLS_ctx.PanelLeftClose : __VLS_ctx.PanelLeft);
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_10 = __VLS_9({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    // @ts-ignore
    [isSidebarOpen, PanelLeftClose, PanelLeft,];
    var __VLS_3;
    var __VLS_4;
}
if (__VLS_ctx.showBreadcrumb) {
    const __VLS_13 = LayoutBreadcrumb;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-0.5 h-full shrink-0" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
if (__VLS_ctx.isDesktop) {
    const __VLS_18 = SearchMenu;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({}));
    const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
    const __VLS_23 = FullscreenButton;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({}));
    const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
    const __VLS_28 = LangSelect;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({}));
    const __VLS_30 = __VLS_29({}, ...__VLS_functionalComponentArgsRest(__VLS_29));
    const __VLS_33 = NoticeDropdown;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({}));
    const __VLS_35 = __VLS_34({}, ...__VLS_functionalComponentArgsRest(__VLS_34));
    const __VLS_38 = TenantSwitcher;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({}));
    const __VLS_40 = __VLS_39({}, ...__VLS_functionalComponentArgsRest(__VLS_39));
}
const __VLS_43 = UserDropdown;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({}));
const __VLS_45 = __VLS_44({}, ...__VLS_functionalComponentArgsRest(__VLS_44));
let __VLS_48;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "icon",
}));
const __VLS_50 = __VLS_49({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "icon",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
let __VLS_53;
const __VLS_54 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.settingsStore.settingsVisible = true;
            // @ts-ignore
            [showBreadcrumb, isDesktop, settingsStore,];
        } });
const { default: __VLS_55 } = __VLS_51.slots;
let __VLS_56;
/** @ts-ignore @type { | typeof __VLS_components.Settings} */
Settings;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
    ...{ class: "h-4 w-4" },
}));
const __VLS_58 = __VLS_57({
    ...{ class: "h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
// @ts-ignore
[];
var __VLS_51;
var __VLS_52;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=LayoutNavbar.vue.js.map