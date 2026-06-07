import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePermissionStore } from "@/stores";
import SidebarMenuItem from "./SidebarMenuItem.vue";
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const permissionStore = usePermissionStore();
/** 直接使用已解析好路径的菜单项 */
const menuItems = permissionStore.mixLayoutSideMenus;
function handleSelect(item) {
    if (item.params && Object.keys(item.params).length > 0) {
        router.push({ path: item.fullPath, query: item.params });
    }
    else {
        router.push(item.fullPath);
    }
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (__VLS_ctx.menuItems.length > 0) {
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.ScrollArea | typeof __VLS_components.ScrollArea} */
    ScrollArea;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ class: "flex-1 min-h-0 overflow-hidden px-2 py-1" },
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "flex-1 min-h-0 overflow-hidden px-2 py-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-h-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    const { default: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-0.5" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-0.5']} */ ;
    for (const [item] of __VLS_vFor((__VLS_ctx.menuItems))) {
        const __VLS_7 = SidebarMenuItem;
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
            ...{ 'onSelect': {} },
            key: (item.fullPath),
            item: (item),
            collapse: (false),
            level: (0),
            activePath: (__VLS_ctx.route.path),
        }));
        const __VLS_9 = __VLS_8({
            ...{ 'onSelect': {} },
            key: (item.fullPath),
            item: (item),
            collapse: (false),
            level: (0),
            activePath: (__VLS_ctx.route.path),
        }, ...__VLS_functionalComponentArgsRest(__VLS_8));
        let __VLS_12;
        const __VLS_13 = ({ select: {} },
            { onSelect: (__VLS_ctx.handleSelect) });
        var __VLS_10;
        var __VLS_11;
        // @ts-ignore
        [menuItems, menuItems, route, handleSelect,];
    }
    // @ts-ignore
    [];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 flex items-center justify-center text-sm text-muted-foreground py-10" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-10']} */ ;
    (__VLS_ctx.t("mixSidebar.empty"));
}
// @ts-ignore
[t,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=MixSidebar.vue.js.map