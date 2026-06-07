import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { usePermissionStore } from "@/stores";
import { translateRouteTitle } from "@/utils/i18n";
import MenuIcon from "./MenuIcon.vue";
const route = useRoute();
const router = useRouter();
const permissionStore = usePermissionStore();
/**
 * 从动态路由中提取一级菜单项
 * 单子节点优化：只有一个可见子菜单时，提升子菜单的标题/图标
 */
const topMenuItems = computed(() => {
    const dynamicRoutes = permissionStore.routes.filter((r) => !r.meta?.hidden && r.children?.length);
    return dynamicRoutes.map((route) => {
        const meta = route.meta;
        const visibleChildren = (route.children ?? []).filter((c) => !c.meta?.hidden);
        // alwaysShow 或多子节点 → 显示一级菜单自身
        if (meta?.alwaysShow || visibleChildren.length !== 1) {
            return {
                path: route.path,
                title: translateRouteTitle(meta?.title ?? ""),
                icon: meta?.icon ?? "📄",
                hasChildren: visibleChildren.length > 0,
            };
        }
        // 单子节点 → 提升子菜单标题/图标
        const child = visibleChildren[0];
        const childMeta = child.meta;
        return {
            path: route.path,
            title: translateRouteTitle(childMeta?.title ?? meta?.title ?? ""),
            icon: childMeta?.icon ?? meta?.icon ?? "📄",
            hasChildren: true,
        };
    });
});
/** 判断一级菜单是否激活 */
function isActive(path) {
    if (path === "/") {
        // 根路由：仅当前路由实际匹配到根时激活
        return route.matched.some((r) => r.path === "/");
    }
    return route.path === path || route.path.startsWith(path + "/");
}
function handleSelect(item) {
    if (!item.hasChildren) {
        // 无子菜单直接导航到一级路径
        router.push(item.path);
        return;
    }
    // 有子菜单：找第一个可访问的叶子节点导航
    const parentRoute = permissionStore.routes.find((r) => r.path === item.path);
    if (!parentRoute?.children?.length) {
        router.push(item.path);
        return;
    }
    const firstVisible = findFirstLeaf(parentRoute.children, item.path);
    router.push(firstVisible ?? item.path);
}
/** 递归查找第一个可见叶子路由的完整路径 */
function findFirstLeaf(children, basePath) {
    for (const child of children) {
        const meta = child.meta;
        if (meta?.hidden)
            continue;
        const fullPath = child.path.startsWith("/") ? child.path : `${basePath}/${child.path}`;
        if (child.children?.length) {
            const leaf = findFirstLeaf(child.children, fullPath);
            if (leaf)
                return leaf;
        }
        else {
            return fullPath;
        }
    }
    return null;
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "flex items-center gap-1 h-full min-w-0 flex-1 overflow-hidden" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.topMenuItems))) {
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        key: (item.path),
        variant: "ghost",
        size: "sm",
        ...{ class: "h-8 gap-1.5 text-sm shrink-0" },
        ...{ class: ({ 'bg-accent text-accent-foreground': __VLS_ctx.isActive(item.path) }) },
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        key: (item.path),
        variant: "ghost",
        size: "sm",
        ...{ class: "h-8 gap-1.5 text-sm shrink-0" },
        ...{ class: ({ 'bg-accent text-accent-foreground': __VLS_ctx.isActive(item.path) }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleSelect(item);
                // @ts-ignore
                [topMenuItems, isActive, handleSelect,];
            } });
    /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-accent']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-accent-foreground']} */ ;
    const { default: __VLS_7 } = __VLS_3.slots;
    const __VLS_8 = MenuIcon;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        icon: (item.icon),
    }));
    const __VLS_10 = __VLS_9({
        icon: (item.icon),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (item.title);
    // @ts-ignore
    [];
    var __VLS_3;
    var __VLS_4;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=MixTopMenu.vue.js.map