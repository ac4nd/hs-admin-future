import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import { useLayout } from "./useLayout";
import { useAppStore, useSettingsStore } from "@/stores";
import BaseLayout from "./BaseLayout.vue";
import LayoutLogo from "./components/LayoutLogo.vue";
import TopMenu from "./components/TopMenu.vue";
import LayoutNavbar from "./components/LayoutNavbar.vue";
import LayoutTagsView from "./components/LayoutTagsView.vue";
import LayoutMain from "./components/LayoutMain.vue";
const { showTagsView } = useLayout();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const glassEffect = computed(() => settingsStore.glassEffect);
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = BaseLayout || BaseLayout;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "layout-top" },
});
/** @type {__VLS_StyleScopedClasses['layout-top']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "layout-top__header" },
    ...{ class: (__VLS_ctx.glassEffect
            ? 'backdrop-blur-2xl bg-white/10 dark:bg-black/25 border-b border-white/20 dark:border-white/10 shadow-lg shadow-black/5'
            : 'bg-[var(--content-bg)] border-b border-[var(--card-border)]') },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.appStore.contentFullscreen) }, null, null);
/** @type {__VLS_StyleScopedClasses['layout-top__header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "layout-top__header-left" },
    ...{ class: ({ 'layout-top__header-left--mobile': __VLS_ctx.isMobile }) },
});
/** @type {__VLS_StyleScopedClasses['layout-top__header-left']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-top__header-left--mobile']} */ ;
const __VLS_7 = LayoutLogo;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    collapse: (__VLS_ctx.isMobile),
}));
const __VLS_9 = __VLS_8({
    collapse: (__VLS_ctx.isMobile),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const __VLS_12 = TopMenu;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const __VLS_17 = LayoutNavbar;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
    showSidebarToggle: (false),
    showBreadcrumb: (false),
}));
const __VLS_19 = __VLS_18({
    showSidebarToggle: (false),
    showBreadcrumb: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "layout-top__body" },
});
/** @type {__VLS_StyleScopedClasses['layout-top__body']} */ ;
if (__VLS_ctx.showTagsView) {
    const __VLS_22 = LayoutTagsView;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({}));
    const __VLS_24 = __VLS_23({}, ...__VLS_functionalComponentArgsRest(__VLS_23));
}
const __VLS_27 = LayoutMain;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({}));
const __VLS_29 = __VLS_28({}, ...__VLS_functionalComponentArgsRest(__VLS_28));
// @ts-ignore
[glassEffect, appStore, isMobile, isMobile, showTagsView,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=TopLayout.vue.js.map