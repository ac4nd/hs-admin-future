import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useLayout } from "./useLayout";
import { useAppStore, useSettingsStore, useTagsViewStore, usePermissionStore } from "@/stores";
import BaseLayout from "./BaseLayout.vue";
import LayoutLogo from "./components/LayoutLogo.vue";
import LayoutNavbar from "./components/LayoutNavbar.vue";
import LayoutTagsView from "./components/LayoutTagsView.vue";
import LayoutMain from "./components/LayoutMain.vue";
import LayoutSidebar from "./components/LayoutSidebar.vue";
const { showTagsView, showLogo, isSidebarOpen, isMobile } = useLayout();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const route = useRoute();
const glassEffect = computed(() => settingsStore.glassEffect);
/** 移动端路由切换后自动收起侧边栏 */
watch(() => route.path, () => {
    if (isMobile.value) {
        appStore.closeSidebar();
    }
});
/** 初始化 affix 标签页 */
onMounted(() => {
    const tagsViewStore = useTagsViewStore();
    const permissionStore = usePermissionStore();
    tagsViewStore.initAffixTags(permissionStore.routes);
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['layout-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-main']} */ ;
const __VLS_0 = BaseLayout || BaseLayout;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "layout-sidebar" },
    ...{ class: ({ 'layout-sidebar--collapsed': !__VLS_ctx.isSidebarOpen }) },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.appStore.contentFullscreen) }, null, null);
/** @type {__VLS_StyleScopedClasses['layout-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-sidebar--collapsed']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "layout-sidebar__inner" },
    ...{ class: ([
            { 'has-logo': __VLS_ctx.showLogo },
            __VLS_ctx.glassEffect
                ? 'backdrop-blur-2xl bg-white/10 dark:bg-black/25 border-r border-white/20 dark:border-white/10 shadow-lg shadow-black/5'
                : 'bg-[var(--menu-bg)] border-r border-[var(--card-border)]',
        ]) },
});
/** @type {__VLS_StyleScopedClasses['layout-sidebar__inner']} */ ;
/** @type {__VLS_StyleScopedClasses['has-logo']} */ ;
if (__VLS_ctx.showLogo) {
    const __VLS_7 = LayoutLogo;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        collapse: (!__VLS_ctx.isSidebarOpen),
    }));
    const __VLS_9 = __VLS_8({
        collapse: (!__VLS_ctx.isSidebarOpen),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
}
const __VLS_12 = LayoutSidebar;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    collapse: (!__VLS_ctx.isSidebarOpen),
}));
const __VLS_14 = __VLS_13({
    collapse: (!__VLS_ctx.isSidebarOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "layout-main" },
    ...{ class: ({
            'has-tags-view': __VLS_ctx.showTagsView,
            'layout-main--collapsed': !__VLS_ctx.isSidebarOpen,
            'layout-main--fullscreen': __VLS_ctx.appStore.contentFullscreen,
        }) },
});
/** @type {__VLS_StyleScopedClasses['layout-main']} */ ;
/** @type {__VLS_StyleScopedClasses['has-tags-view']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-main--collapsed']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-main--fullscreen']} */ ;
const __VLS_17 = LayoutNavbar;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({}));
const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.appStore.contentFullscreen) }, null, null);
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
[isSidebarOpen, isSidebarOpen, isSidebarOpen, isSidebarOpen, appStore, appStore, appStore, showLogo, showLogo, glassEffect, showTagsView, showTagsView,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=LeftLayout.vue.js.map