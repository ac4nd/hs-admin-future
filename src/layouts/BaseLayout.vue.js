import { computed } from "vue";
import { useLayout } from "./useLayout";
import { useSettingsStore } from "@/stores";
import bgDarkUrl from "@/assets/images/bg-dark.webp";
const { layoutClass, isSidebarOpen, isMobile, closeSidebar } = useLayout();
const settingsStore = useSettingsStore();
const glassEffect = computed(() => settingsStore.glassEffect);
const isDark = computed(() => settingsStore.resolvedTheme === "dark" /* ThemeMode.DARK */);
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "layout" },
    ...{ class: (__VLS_ctx.layoutClass) },
});
/** @type {__VLS_StyleScopedClasses['layout']} */ ;
if (__VLS_ctx.glassEffect) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "layout-glass-bg" },
    });
    /** @type {__VLS_StyleScopedClasses['layout-glass-bg']} */ ;
    if (!__VLS_ctx.isDark) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "layout-gradient" },
        });
        /** @type {__VLS_StyleScopedClasses['layout-gradient']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "layout-deco layout-deco--1" },
        });
        /** @type {__VLS_StyleScopedClasses['layout-deco']} */ ;
        /** @type {__VLS_StyleScopedClasses['layout-deco--1']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "layout-deco layout-deco--2" },
        });
        /** @type {__VLS_StyleScopedClasses['layout-deco']} */ ;
        /** @type {__VLS_StyleScopedClasses['layout-deco--2']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "layout-deco layout-deco--3" },
        });
        /** @type {__VLS_StyleScopedClasses['layout-deco']} */ ;
        /** @type {__VLS_StyleScopedClasses['layout-deco--3']} */ ;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "layout-dark-img" },
            ...{ style: ({ backgroundImage: `url(${__VLS_ctx.bgDarkUrl})` }) },
        });
        /** @type {__VLS_StyleScopedClasses['layout-dark-img']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "layout-dark-overlay" },
        });
        /** @type {__VLS_StyleScopedClasses['layout-dark-overlay']} */ ;
    }
}
if (__VLS_ctx.isMobile && __VLS_ctx.isSidebarOpen) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.closeSidebar) },
        ...{ class: "layout__overlay" },
    });
    /** @type {__VLS_StyleScopedClasses['layout__overlay']} */ ;
}
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[layoutClass, glassEffect, isDark, bgDarkUrl, isMobile, isSidebarOpen, closeSidebar,];
const __VLS_base = (await import('vue')).defineComponent({});
const __VLS_export = {};
export default {};
//# sourceMappingURL=BaseLayout.vue.js.map