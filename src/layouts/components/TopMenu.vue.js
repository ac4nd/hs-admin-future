import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ChevronDown, MoreHorizontal } from "@lucide/vue";
import { useWindowSize } from "@vueuse/core";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { usePermissionStore } from "@/stores";
import { generateMenus } from "@/utils/menu";
import { translateRouteTitle } from "@/utils/i18n";
import MenuIcon from "./MenuIcon.vue";
const route = useRoute();
const router = useRouter();
const permissionStore = usePermissionStore();
const menuTree = computed(() => generateMenus(permissionStore.routes));
const { width: windowWidth } = useWindowSize();
const isDesktop = computed(() => windowWidth.value >= 768);
const navRef = ref();
const visibleCount = ref(999);
/** 溢出的菜单项 */
const hiddenItems = computed(() => menuTree.value.slice(visibleCount.value));
/** 溢出项中是否有激活项 */
const hasActiveHidden = computed(() => hiddenItems.value.some((item) => isItemActive(item)));
/** "..." 按钮预留宽度 */
const MORE_BTN_WIDTH = 44;
/** 判断菜单项是否激活（叶子直接匹配 / 有子菜单时检测子孙路径） */
function isItemActive(item) {
    if (!item.children?.length) {
        return route.path === item.fullPath;
    }
    return matchDescendant(item.children, route.path);
}
function matchDescendant(children, path) {
    for (const child of children) {
        if (child.fullPath === path)
            return true;
        if (child.children?.length && matchDescendant(child.children, path))
            return true;
    }
    return false;
}
function itemClass(item) {
    return {
        "bg-accent text-accent-foreground": isItemActive(item),
    };
}
/**
 * 测量每个菜单项的位置，计算可见数量
 * 桌面/移动端统一执行，移动端图标更窄自然放得下更多
 */
function recalculate() {
    const nav = navRef.value;
    if (!nav)
        return;
    const items = nav.querySelectorAll("[data-menu-item]");
    if (!items.length)
        return;
    const containerWidth = nav.clientWidth;
    let count = items.length;
    for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.offsetLeft + el.offsetWidth > containerWidth - MORE_BTN_WIDTH) {
            count = i;
            break;
        }
    }
    if (count === items.length) {
        const last = items[items.length - 1];
        if (last.offsetLeft + last.offsetWidth <= containerWidth) {
            visibleCount.value = count;
            return;
        }
        count = items.length - 1;
    }
    visibleCount.value = count;
}
let observer = null;
onMounted(() => {
    nextTick(recalculate);
    if (navRef.value) {
        observer = new ResizeObserver(recalculate);
        observer.observe(navRef.value);
    }
});
onUnmounted(() => observer?.disconnect());
watch(menuTree, () => nextTick(recalculate));
watch(isDesktop, () => nextTick(recalculate));
function handleSelect(item) {
    if (item.fullPath.startsWith("http")) {
        window.open(item.fullPath, "_blank");
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
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ref: "navRef",
    ...{ class: "relative flex items-center gap-1 h-full px-2 min-w-0 flex-1 overflow-hidden" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
for (const [item, idx] of __VLS_vFor((__VLS_ctx.menuTree))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (item.fullPath),
        'data-menu-item': true,
        ...{ class: "shrink-0" },
        ...{ class: ({ invisible: idx >= __VLS_ctx.visibleCount }) },
    });
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['invisible']} */ ;
    if (item.children?.length) {
        let __VLS_0;
        /** @ts-ignore @type { | typeof __VLS_components.DropdownMenu | typeof __VLS_components.DropdownMenu} */
        DropdownMenu;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
        const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
        const { default: __VLS_5 } = __VLS_3.slots;
        let __VLS_6;
        /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuTrigger | typeof __VLS_components.DropdownMenuTrigger} */
        DropdownMenuTrigger;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
            asChild: true,
        }));
        const __VLS_8 = __VLS_7({
            asChild: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        const { default: __VLS_11 } = __VLS_9.slots;
        let __VLS_12;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
            variant: "ghost",
            size: (__VLS_ctx.isDesktop ? 'sm' : 'icon'),
            ...{ class: "h-8" },
            ...{ class: ([__VLS_ctx.isDesktop ? 'gap-1.5 text-sm' : 'w-8', __VLS_ctx.itemClass(item)]) },
        }));
        const __VLS_14 = __VLS_13({
            variant: "ghost",
            size: (__VLS_ctx.isDesktop ? 'sm' : 'icon'),
            ...{ class: "h-8" },
            ...{ class: ([__VLS_ctx.isDesktop ? 'gap-1.5 text-sm' : 'w-8', __VLS_ctx.itemClass(item)]) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
        const { default: __VLS_17 } = __VLS_15.slots;
        const __VLS_18 = MenuIcon;
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
            icon: (item.icon),
            ...{ class: ({ 'text-base': !__VLS_ctx.isDesktop }) },
        }));
        const __VLS_20 = __VLS_19({
            icon: (item.icon),
            ...{ class: ({ 'text-base': !__VLS_ctx.isDesktop }) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        /** @type {__VLS_StyleScopedClasses['text-base']} */ ;
        if (__VLS_ctx.isDesktop) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (__VLS_ctx.translateRouteTitle(item.title));
            let __VLS_23;
            /** @ts-ignore @type { | typeof __VLS_components.ChevronDown} */
            ChevronDown;
            // @ts-ignore
            const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
                ...{ class: "h-3 w-3 opacity-50" },
            }));
            const __VLS_25 = __VLS_24({
                ...{ class: "h-3 w-3 opacity-50" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_24));
            /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
        }
        // @ts-ignore
        [menuTree, visibleCount, isDesktop, isDesktop, isDesktop, isDesktop, itemClass, translateRouteTitle,];
        var __VLS_15;
        // @ts-ignore
        [];
        var __VLS_9;
        let __VLS_28;
        /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuContent | typeof __VLS_components.DropdownMenuContent} */
        DropdownMenuContent;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
            align: "start",
        }));
        const __VLS_30 = __VLS_29({
            align: "start",
        }, ...__VLS_functionalComponentArgsRest(__VLS_29));
        const { default: __VLS_33 } = __VLS_31.slots;
        if (!__VLS_ctx.isDesktop) {
            let __VLS_34;
            /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuLabel | typeof __VLS_components.DropdownMenuLabel} */
            DropdownMenuLabel;
            // @ts-ignore
            const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
                ...{ class: "text-xs text-muted-foreground" },
            }));
            const __VLS_36 = __VLS_35({
                ...{ class: "text-xs text-muted-foreground" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_35));
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
            const { default: __VLS_39 } = __VLS_37.slots;
            (__VLS_ctx.translateRouteTitle(item.title));
            // @ts-ignore
            [isDesktop, translateRouteTitle,];
            var __VLS_37;
            let __VLS_40;
            /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSeparator} */
            DropdownMenuSeparator;
            // @ts-ignore
            const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({}));
            const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
        }
        for (const [child] of __VLS_vFor((item.children))) {
            __VLS_asFunctionalElement(__VLS_intrinsics.template)({
                key: (child.fullPath),
            });
            if (child.children?.length) {
                let __VLS_45;
                /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSub | typeof __VLS_components.DropdownMenuSub} */
                DropdownMenuSub;
                // @ts-ignore
                const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({}));
                const __VLS_47 = __VLS_46({}, ...__VLS_functionalComponentArgsRest(__VLS_46));
                const { default: __VLS_50 } = __VLS_48.slots;
                let __VLS_51;
                /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSubTrigger | typeof __VLS_components.DropdownMenuSubTrigger} */
                DropdownMenuSubTrigger;
                // @ts-ignore
                const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
                    ...{ class: "gap-2" },
                }));
                const __VLS_53 = __VLS_52({
                    ...{ class: "gap-2" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_52));
                /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
                const { default: __VLS_56 } = __VLS_54.slots;
                const __VLS_57 = MenuIcon;
                // @ts-ignore
                const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
                    icon: (child.icon),
                }));
                const __VLS_59 = __VLS_58({
                    icon: (child.icon),
                }, ...__VLS_functionalComponentArgsRest(__VLS_58));
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
                (__VLS_ctx.translateRouteTitle(child.title));
                // @ts-ignore
                [translateRouteTitle,];
                var __VLS_54;
                let __VLS_62;
                /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSubContent | typeof __VLS_components.DropdownMenuSubContent} */
                DropdownMenuSubContent;
                // @ts-ignore
                const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({}));
                const __VLS_64 = __VLS_63({}, ...__VLS_functionalComponentArgsRest(__VLS_63));
                const { default: __VLS_67 } = __VLS_65.slots;
                for (const [grand] of __VLS_vFor((child.children))) {
                    let __VLS_68;
                    /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
                    DropdownMenuItem;
                    // @ts-ignore
                    const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
                        ...{ 'onClick': {} },
                        key: (grand.fullPath),
                        ...{ class: "gap-2" },
                    }));
                    const __VLS_70 = __VLS_69({
                        ...{ 'onClick': {} },
                        key: (grand.fullPath),
                        ...{ class: "gap-2" },
                    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
                    let __VLS_73;
                    const __VLS_74 = ({ click: {} },
                        { onClick: (...[$event]) => {
                                if (!(item.children?.length))
                                    return;
                                if (!(child.children?.length))
                                    return;
                                __VLS_ctx.handleSelect(grand);
                                // @ts-ignore
                                [handleSelect,];
                            } });
                    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
                    const { default: __VLS_75 } = __VLS_71.slots;
                    const __VLS_76 = MenuIcon;
                    // @ts-ignore
                    const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
                        icon: (grand.icon),
                    }));
                    const __VLS_78 = __VLS_77({
                        icon: (grand.icon),
                    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
                    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
                    (__VLS_ctx.translateRouteTitle(grand.title));
                    // @ts-ignore
                    [translateRouteTitle,];
                    var __VLS_71;
                    var __VLS_72;
                    // @ts-ignore
                    [];
                }
                // @ts-ignore
                [];
                var __VLS_65;
                // @ts-ignore
                [];
                var __VLS_48;
            }
            else {
                let __VLS_81;
                /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
                DropdownMenuItem;
                // @ts-ignore
                const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
                    ...{ 'onClick': {} },
                    ...{ class: "gap-2" },
                }));
                const __VLS_83 = __VLS_82({
                    ...{ 'onClick': {} },
                    ...{ class: "gap-2" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_82));
                let __VLS_86;
                const __VLS_87 = ({ click: {} },
                    { onClick: (...[$event]) => {
                            if (!(item.children?.length))
                                return;
                            if (!!(child.children?.length))
                                return;
                            __VLS_ctx.handleSelect(child);
                            // @ts-ignore
                            [handleSelect,];
                        } });
                /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
                const { default: __VLS_88 } = __VLS_84.slots;
                const __VLS_89 = MenuIcon;
                // @ts-ignore
                const __VLS_90 = __VLS_asFunctionalComponent1(__VLS_89, new __VLS_89({
                    icon: (child.icon),
                }));
                const __VLS_91 = __VLS_90({
                    icon: (child.icon),
                }, ...__VLS_functionalComponentArgsRest(__VLS_90));
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
                (__VLS_ctx.translateRouteTitle(child.title));
                // @ts-ignore
                [translateRouteTitle,];
                var __VLS_84;
                var __VLS_85;
            }
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_31;
        // @ts-ignore
        [];
        var __VLS_3;
    }
    else {
        if (__VLS_ctx.isDesktop) {
            let __VLS_94;
            /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
            Button;
            // @ts-ignore
            const __VLS_95 = __VLS_asFunctionalComponent1(__VLS_94, new __VLS_94({
                ...{ 'onClick': {} },
                variant: "ghost",
                size: "sm",
                ...{ class: "gap-1.5 text-sm h-8" },
                ...{ class: (__VLS_ctx.itemClass(item)) },
            }));
            const __VLS_96 = __VLS_95({
                ...{ 'onClick': {} },
                variant: "ghost",
                size: "sm",
                ...{ class: "gap-1.5 text-sm h-8" },
                ...{ class: (__VLS_ctx.itemClass(item)) },
            }, ...__VLS_functionalComponentArgsRest(__VLS_95));
            let __VLS_99;
            const __VLS_100 = ({ click: {} },
                { onClick: (...[$event]) => {
                        if (!!(item.children?.length))
                            return;
                        if (!(__VLS_ctx.isDesktop))
                            return;
                        __VLS_ctx.handleSelect(item);
                        // @ts-ignore
                        [isDesktop, itemClass, handleSelect,];
                    } });
            /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
            const { default: __VLS_101 } = __VLS_97.slots;
            const __VLS_102 = MenuIcon;
            // @ts-ignore
            const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
                icon: (item.icon),
            }));
            const __VLS_104 = __VLS_103({
                icon: (item.icon),
            }, ...__VLS_functionalComponentArgsRest(__VLS_103));
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (__VLS_ctx.translateRouteTitle(item.title));
            // @ts-ignore
            [translateRouteTitle,];
            var __VLS_97;
            var __VLS_98;
        }
        else {
            let __VLS_107;
            /** @ts-ignore @type { | typeof __VLS_components.Tooltip | typeof __VLS_components.Tooltip} */
            Tooltip;
            // @ts-ignore
            const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({}));
            const __VLS_109 = __VLS_108({}, ...__VLS_functionalComponentArgsRest(__VLS_108));
            const { default: __VLS_112 } = __VLS_110.slots;
            let __VLS_113;
            /** @ts-ignore @type { | typeof __VLS_components.TooltipTrigger | typeof __VLS_components.TooltipTrigger} */
            TooltipTrigger;
            // @ts-ignore
            const __VLS_114 = __VLS_asFunctionalComponent1(__VLS_113, new __VLS_113({
                asChild: true,
            }));
            const __VLS_115 = __VLS_114({
                asChild: true,
            }, ...__VLS_functionalComponentArgsRest(__VLS_114));
            const { default: __VLS_118 } = __VLS_116.slots;
            let __VLS_119;
            /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
            Button;
            // @ts-ignore
            const __VLS_120 = __VLS_asFunctionalComponent1(__VLS_119, new __VLS_119({
                ...{ 'onClick': {} },
                variant: "ghost",
                size: "icon",
                ...{ class: "h-8 w-8" },
                ...{ class: (__VLS_ctx.itemClass(item)) },
            }));
            const __VLS_121 = __VLS_120({
                ...{ 'onClick': {} },
                variant: "ghost",
                size: "icon",
                ...{ class: "h-8 w-8" },
                ...{ class: (__VLS_ctx.itemClass(item)) },
            }, ...__VLS_functionalComponentArgsRest(__VLS_120));
            let __VLS_124;
            const __VLS_125 = ({ click: {} },
                { onClick: (...[$event]) => {
                        if (!!(item.children?.length))
                            return;
                        if (!!(__VLS_ctx.isDesktop))
                            return;
                        __VLS_ctx.handleSelect(item);
                        // @ts-ignore
                        [itemClass, handleSelect,];
                    } });
            /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
            /** @type {__VLS_StyleScopedClasses['w-8']} */ ;
            const { default: __VLS_126 } = __VLS_122.slots;
            const __VLS_127 = MenuIcon;
            // @ts-ignore
            const __VLS_128 = __VLS_asFunctionalComponent1(__VLS_127, new __VLS_127({
                icon: (item.icon),
            }));
            const __VLS_129 = __VLS_128({
                icon: (item.icon),
            }, ...__VLS_functionalComponentArgsRest(__VLS_128));
            // @ts-ignore
            [];
            var __VLS_122;
            var __VLS_123;
            // @ts-ignore
            [];
            var __VLS_116;
            let __VLS_132;
            /** @ts-ignore @type { | typeof __VLS_components.TooltipContent | typeof __VLS_components.TooltipContent} */
            TooltipContent;
            // @ts-ignore
            const __VLS_133 = __VLS_asFunctionalComponent1(__VLS_132, new __VLS_132({
                side: "bottom",
                sideOffset: (4),
            }));
            const __VLS_134 = __VLS_133({
                side: "bottom",
                sideOffset: (4),
            }, ...__VLS_functionalComponentArgsRest(__VLS_133));
            const { default: __VLS_137 } = __VLS_135.slots;
            (__VLS_ctx.translateRouteTitle(item.title));
            // @ts-ignore
            [translateRouteTitle,];
            var __VLS_135;
            // @ts-ignore
            [];
            var __VLS_110;
        }
    }
    // @ts-ignore
    [];
}
if (__VLS_ctx.hiddenItems.length > 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute right-1 top-0 bottom-0 flex items-center z-10" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['right-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-10']} */ ;
    let __VLS_138;
    /** @ts-ignore @type { | typeof __VLS_components.DropdownMenu | typeof __VLS_components.DropdownMenu} */
    DropdownMenu;
    // @ts-ignore
    const __VLS_139 = __VLS_asFunctionalComponent1(__VLS_138, new __VLS_138({}));
    const __VLS_140 = __VLS_139({}, ...__VLS_functionalComponentArgsRest(__VLS_139));
    const { default: __VLS_143 } = __VLS_141.slots;
    let __VLS_144;
    /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuTrigger | typeof __VLS_components.DropdownMenuTrigger} */
    DropdownMenuTrigger;
    // @ts-ignore
    const __VLS_145 = __VLS_asFunctionalComponent1(__VLS_144, new __VLS_144({
        asChild: true,
    }));
    const __VLS_146 = __VLS_145({
        asChild: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_145));
    const { default: __VLS_149 } = __VLS_147.slots;
    let __VLS_150;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_151 = __VLS_asFunctionalComponent1(__VLS_150, new __VLS_150({
        variant: "ghost",
        size: "icon",
        ...{ class: "h-8 w-8" },
        ...{ class: ({ 'bg-accent text-accent-foreground': __VLS_ctx.hasActiveHidden }) },
    }));
    const __VLS_152 = __VLS_151({
        variant: "ghost",
        size: "icon",
        ...{ class: "h-8 w-8" },
        ...{ class: ({ 'bg-accent text-accent-foreground': __VLS_ctx.hasActiveHidden }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_151));
    /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-accent']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-accent-foreground']} */ ;
    const { default: __VLS_155 } = __VLS_153.slots;
    let __VLS_156;
    /** @ts-ignore @type { | typeof __VLS_components.MoreHorizontal} */
    MoreHorizontal;
    // @ts-ignore
    const __VLS_157 = __VLS_asFunctionalComponent1(__VLS_156, new __VLS_156({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_158 = __VLS_157({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_157));
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    // @ts-ignore
    [hiddenItems, hasActiveHidden,];
    var __VLS_153;
    // @ts-ignore
    [];
    var __VLS_147;
    let __VLS_161;
    /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuContent | typeof __VLS_components.DropdownMenuContent} */
    DropdownMenuContent;
    // @ts-ignore
    const __VLS_162 = __VLS_asFunctionalComponent1(__VLS_161, new __VLS_161({
        align: "end",
        ...{ class: "max-h-[60vh] overflow-y-auto" },
    }));
    const __VLS_163 = __VLS_162({
        align: "end",
        ...{ class: "max-h-[60vh] overflow-y-auto" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_162));
    /** @type {__VLS_StyleScopedClasses['max-h-[60vh]']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
    const { default: __VLS_166 } = __VLS_164.slots;
    for (const [item] of __VLS_vFor((__VLS_ctx.hiddenItems))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.template)({
            key: (item.fullPath),
        });
        if (item.children?.length) {
            let __VLS_167;
            /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSub | typeof __VLS_components.DropdownMenuSub} */
            DropdownMenuSub;
            // @ts-ignore
            const __VLS_168 = __VLS_asFunctionalComponent1(__VLS_167, new __VLS_167({}));
            const __VLS_169 = __VLS_168({}, ...__VLS_functionalComponentArgsRest(__VLS_168));
            const { default: __VLS_172 } = __VLS_170.slots;
            let __VLS_173;
            /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSubTrigger | typeof __VLS_components.DropdownMenuSubTrigger} */
            DropdownMenuSubTrigger;
            // @ts-ignore
            const __VLS_174 = __VLS_asFunctionalComponent1(__VLS_173, new __VLS_173({
                ...{ class: "gap-2" },
                ...{ class: ({ 'text-primary font-medium': __VLS_ctx.isItemActive(item) }) },
            }));
            const __VLS_175 = __VLS_174({
                ...{ class: "gap-2" },
                ...{ class: ({ 'text-primary font-medium': __VLS_ctx.isItemActive(item) }) },
            }, ...__VLS_functionalComponentArgsRest(__VLS_174));
            /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
            const { default: __VLS_178 } = __VLS_176.slots;
            const __VLS_179 = MenuIcon;
            // @ts-ignore
            const __VLS_180 = __VLS_asFunctionalComponent1(__VLS_179, new __VLS_179({
                icon: (item.icon),
            }));
            const __VLS_181 = __VLS_180({
                icon: (item.icon),
            }, ...__VLS_functionalComponentArgsRest(__VLS_180));
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (__VLS_ctx.translateRouteTitle(item.title));
            // @ts-ignore
            [translateRouteTitle, hiddenItems, isItemActive,];
            var __VLS_176;
            let __VLS_184;
            /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSubContent | typeof __VLS_components.DropdownMenuSubContent} */
            DropdownMenuSubContent;
            // @ts-ignore
            const __VLS_185 = __VLS_asFunctionalComponent1(__VLS_184, new __VLS_184({}));
            const __VLS_186 = __VLS_185({}, ...__VLS_functionalComponentArgsRest(__VLS_185));
            const { default: __VLS_189 } = __VLS_187.slots;
            for (const [child] of __VLS_vFor((item.children))) {
                let __VLS_190;
                /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
                DropdownMenuItem;
                // @ts-ignore
                const __VLS_191 = __VLS_asFunctionalComponent1(__VLS_190, new __VLS_190({
                    ...{ 'onClick': {} },
                    key: (child.fullPath),
                    ...{ class: "gap-2" },
                }));
                const __VLS_192 = __VLS_191({
                    ...{ 'onClick': {} },
                    key: (child.fullPath),
                    ...{ class: "gap-2" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_191));
                let __VLS_195;
                const __VLS_196 = ({ click: {} },
                    { onClick: (...[$event]) => {
                            if (!(__VLS_ctx.hiddenItems.length > 0))
                                return;
                            if (!(item.children?.length))
                                return;
                            __VLS_ctx.handleSelect(child);
                            // @ts-ignore
                            [handleSelect,];
                        } });
                /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
                const { default: __VLS_197 } = __VLS_193.slots;
                const __VLS_198 = MenuIcon;
                // @ts-ignore
                const __VLS_199 = __VLS_asFunctionalComponent1(__VLS_198, new __VLS_198({
                    icon: (child.icon),
                }));
                const __VLS_200 = __VLS_199({
                    icon: (child.icon),
                }, ...__VLS_functionalComponentArgsRest(__VLS_199));
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
                (__VLS_ctx.translateRouteTitle(child.title));
                // @ts-ignore
                [translateRouteTitle,];
                var __VLS_193;
                var __VLS_194;
                // @ts-ignore
                [];
            }
            // @ts-ignore
            [];
            var __VLS_187;
            // @ts-ignore
            [];
            var __VLS_170;
        }
        else {
            let __VLS_203;
            /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
            DropdownMenuItem;
            // @ts-ignore
            const __VLS_204 = __VLS_asFunctionalComponent1(__VLS_203, new __VLS_203({
                ...{ 'onClick': {} },
                ...{ class: "gap-2" },
            }));
            const __VLS_205 = __VLS_204({
                ...{ 'onClick': {} },
                ...{ class: "gap-2" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_204));
            let __VLS_208;
            const __VLS_209 = ({ click: {} },
                { onClick: (...[$event]) => {
                        if (!(__VLS_ctx.hiddenItems.length > 0))
                            return;
                        if (!!(item.children?.length))
                            return;
                        __VLS_ctx.handleSelect(item);
                        // @ts-ignore
                        [handleSelect,];
                    } });
            /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
            const { default: __VLS_210 } = __VLS_206.slots;
            const __VLS_211 = MenuIcon;
            // @ts-ignore
            const __VLS_212 = __VLS_asFunctionalComponent1(__VLS_211, new __VLS_211({
                icon: (item.icon),
            }));
            const __VLS_213 = __VLS_212({
                icon: (item.icon),
            }, ...__VLS_functionalComponentArgsRest(__VLS_212));
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (__VLS_ctx.translateRouteTitle(item.title));
            // @ts-ignore
            [translateRouteTitle,];
            var __VLS_206;
            var __VLS_207;
        }
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_164;
    // @ts-ignore
    [];
    var __VLS_141;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=TopMenu.vue.js.map