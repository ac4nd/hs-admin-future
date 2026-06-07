import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useLayout } from "./useLayout";
import { useAppStore, useSettingsStore, usePermissionStore } from "@/stores";
import BaseLayout from "./BaseLayout.vue";
import LayoutLogo from "./components/LayoutLogo.vue";
import LayoutNavbar from "./components/LayoutNavbar.vue";
import LayoutTagsView from "./components/LayoutTagsView.vue";
import LayoutMain from "./components/LayoutMain.vue";
import MixTopMenu from "./components/MixTopMenu.vue";
import MixSidebar from "./components/MixSidebar.vue";
const { showTagsView, isMobile, isSidebarOpen } = useLayout();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();
const route = useRoute();
const glassEffect = computed(() => settingsStore.glassEffect);
/** 当前激活一级菜单是否有子菜单 */
const hasSideMenus = computed(() => permissionStore.mixLayoutSideMenus.length > 0);
/**
 * 从当前路由路径提取一级菜单路径
 * 例: /system/user → /system, /dashboard → /
 */
function extractTopMenuPath(path) {
    // 优先匹配非根的一级路由
    const match = permissionStore.routes.find((r) => r.path !== "/" && (path === r.path || path.startsWith(r.path + "/")));
    if (match)
        return match.path;
    // 检查是否属于根路由（首页、错误页）
    const rootRoute = permissionStore.routes.find((r) => r.path === "/");
    if (rootRoute?.children?.length) {
        const belongsToRoot = rootRoute.children.some((child) => {
            const childPath = child.path.startsWith("/") ? child.path : `/${child.path}`;
            return path === childPath || path.startsWith(childPath + "/");
        });
        if (belongsToRoot)
            return "/";
    }
    return "";
}
// 路由变化时同步一级菜单和侧边栏
watch(() => route.path, (newPath) => {
    const topPath = extractTopMenuPath(newPath);
    if (!topPath)
        return;
    // 始终设置（确保模式切换后也能初始化侧边栏）
    appStore.setActiveTopMenuPath(topPath);
    permissionStore.setMixLayoutSideMenus(topPath);
    // 移动端自动收起侧边栏
    if (isMobile.value) {
        appStore.closeSidebar();
    }
}, { immediate: true });
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
    ...{ class: "layout-mix" },
});
/** @type {__VLS_StyleScopedClasses['layout-mix']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "layout-mix__header" },
    ...{ class: (__VLS_ctx.glassEffect
            ? 'backdrop-blur-2xl bg-white/10 dark:bg-black/25 border-b border-white/20 dark:border-white/10 shadow-lg shadow-black/5'
            : 'bg-[var(--content-bg)] border-b border-[var(--card-border)]') },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.appStore.contentFullscreen) }, null, null);
/** @type {__VLS_StyleScopedClasses['layout-mix__header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "layout-mix__header-logo" },
});
/** @type {__VLS_StyleScopedClasses['layout-mix__header-logo']} */ ;
const __VLS_7 = LayoutLogo;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    collapse: (false),
}));
const __VLS_9 = __VLS_8({
    collapse: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const __VLS_12 = MixTopMenu;
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
    ...{ class: "layout-mix__body" },
});
/** @type {__VLS_StyleScopedClasses['layout-mix__body']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "layout-mix__sidebar" },
    ...{ class: ([
            __VLS_ctx.isMobile ? 'layout-mix__sidebar--mobile' : '',
            __VLS_ctx.isMobile && !__VLS_ctx.isSidebarOpen ? 'layout-mix__sidebar--hidden' : '',
            __VLS_ctx.glassEffect
                ? 'backdrop-blur-2xl bg-white/10 dark:bg-black/25 border-r border-white/20 dark:border-white/10'
                : 'bg-[var(--menu-bg)] border-r border-[var(--card-border)]',
        ]) },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.appStore.contentFullscreen && __VLS_ctx.hasSideMenus) }, null, null);
/** @type {__VLS_StyleScopedClasses['layout-mix__sidebar']} */ ;
const __VLS_22 = MixSidebar;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({}));
const __VLS_24 = __VLS_23({}, ...__VLS_functionalComponentArgsRest(__VLS_23));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "layout-mix__content" },
});
/** @type {__VLS_StyleScopedClasses['layout-mix__content']} */ ;
if (__VLS_ctx.showTagsView) {
    const __VLS_27 = LayoutTagsView;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({}));
    const __VLS_29 = __VLS_28({}, ...__VLS_functionalComponentArgsRest(__VLS_28));
}
const __VLS_32 = LayoutMain;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
// @ts-ignore
[glassEffect, glassEffect, appStore, appStore, isMobile, isMobile, isSidebarOpen, hasSideMenus, showTagsView,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=MixLayout.vue.js.map