import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePermissionStore } from "@/stores";
import { generateMenus } from "@/utils/menu";
import SidebarMenuItem from "./SidebarMenuItem.vue";
const __VLS_props = withDefaults(defineProps(), {
    collapse: false,
});
const route = useRoute();
const router = useRouter();
const permissionStore = usePermissionStore();
/** 从路由配置生成菜单树 */
const menuTree = computed(() => generateMenus(permissionStore.routes));
function handleSelect(item) {
    if (item.params && Object.keys(item.params).length > 0) {
        router.push({ path: item.fullPath, query: item.params });
    }
    else {
        router.push(item.fullPath);
    }
}
const __VLS_defaults = {
    collapse: false,
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
for (const [item] of __VLS_vFor((__VLS_ctx.menuTree))) {
    const __VLS_7 = SidebarMenuItem;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        ...{ 'onSelect': {} },
        key: (item.fullPath),
        item: (item),
        collapse: (__VLS_ctx.collapse),
        level: (0),
        activePath: (__VLS_ctx.route.path),
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onSelect': {} },
        key: (item.fullPath),
        item: (item),
        collapse: (__VLS_ctx.collapse),
        level: (0),
        activePath: (__VLS_ctx.route.path),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_12;
    const __VLS_13 = ({ select: {} },
        { onSelect: (__VLS_ctx.handleSelect) });
    var __VLS_10;
    var __VLS_11;
    // @ts-ignore
    [menuTree, collapse, route, handleSelect,];
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=LayoutSidebar.vue.js.map