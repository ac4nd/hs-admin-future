import { computed, ref, watch } from "vue";
import { ChevronRight } from "@lucide/vue";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { translateRouteTitle } from "@/utils/i18n";
import MenuIcon from "./MenuIcon.vue";
const props = defineProps();
const emit = defineEmits();
const hasVisibleChildren = computed(() => props.item.children && props.item.children.length > 0);
const isActive = computed(() => props.item.fullPath === props.activePath);
const isParentActive = computed(() => {
    if (!props.item.children)
        return false;
    return matchChildPath(props.item.children, props.activePath);
});
/** 子孙路径是否匹配 */
function matchChildPath(children, path) {
    for (const child of children) {
        if (child.fullPath === path)
            return true;
        if (child.children?.length && matchChildPath(child.children, path))
            return true;
    }
    return false;
}
/** 展开态控制 — 激活时自动展开，同时允许手动折叠 */
const isOpen = ref(false);
watch(() => isParentActive.value, (active) => {
    if (active)
        isOpen.value = true;
}, { immediate: true });
function handleClick() {
    if (props.item.fullPath.startsWith("http")) {
        window.open(props.item.fullPath, "_blank");
        return;
    }
    emit("select", props.item);
}
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['sidebar-menu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-menu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-menu-item-collapsed']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-menu-item-collapsed']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
if (!__VLS_ctx.collapse) {
    if (__VLS_ctx.hasVisibleChildren) {
        let __VLS_0;
        /** @ts-ignore @type { | typeof __VLS_components.Collapsible | typeof __VLS_components.Collapsible} */
        Collapsible;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            open: (__VLS_ctx.isOpen),
            ...{ class: "w-full" },
        }));
        const __VLS_2 = __VLS_1({
            open: (__VLS_ctx.isOpen),
            ...{ class: "w-full" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        var __VLS_5;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        const { default: __VLS_6 } = __VLS_3.slots;
        let __VLS_7;
        /** @ts-ignore @type { | typeof __VLS_components.CollapsibleTrigger | typeof __VLS_components.CollapsibleTrigger} */
        CollapsibleTrigger;
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
            asChild: true,
        }));
        const __VLS_9 = __VLS_8({
            asChild: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_8));
        const { default: __VLS_12 } = __VLS_10.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "sidebar-menu-item flex items-center gap-3 rounded-lg text-sm cursor-pointer transition-colors w-full" },
            ...{ class: ({ 'text-primary font-medium': __VLS_ctx.isParentActive }) },
            ...{ style: ({ paddingLeft: `${(__VLS_ctx.level + 1) * 12}px` }) },
        });
        /** @type {__VLS_StyleScopedClasses['sidebar-menu-item']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
        const __VLS_13 = MenuIcon;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
            icon: (__VLS_ctx.item.icon),
        }));
        const __VLS_15 = __VLS_14({
            icon: (__VLS_ctx.item.icon),
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "flex-1 truncate" },
        });
        /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
        (__VLS_ctx.translateRouteTitle(__VLS_ctx.item.title));
        let __VLS_18;
        /** @ts-ignore @type { | typeof __VLS_components.ChevronRight} */
        ChevronRight;
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
            ...{ class: "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200" },
            ...{ class: ({ 'rotate-90': __VLS_ctx.isOpen }) },
        }));
        const __VLS_20 = __VLS_19({
            ...{ class: "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200" },
            ...{ class: ({ 'rotate-90': __VLS_ctx.isOpen }) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
        /** @type {__VLS_StyleScopedClasses['rotate-90']} */ ;
        // @ts-ignore
        [collapse, hasVisibleChildren, isOpen, isOpen, isParentActive, level, item, item, translateRouteTitle,];
        var __VLS_10;
        let __VLS_23;
        /** @ts-ignore @type { | typeof __VLS_components.CollapsibleContent | typeof __VLS_components.CollapsibleContent} */
        CollapsibleContent;
        // @ts-ignore
        const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({}));
        const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
        const { default: __VLS_28 } = __VLS_26.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "mt-0.5" },
        });
        /** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
        for (const [child] of __VLS_vFor((__VLS_ctx.item.children))) {
            let __VLS_29;
            /** @ts-ignore @type { | typeof __VLS_components.SidebarMenuItem} */
            SidebarMenuItem;
            // @ts-ignore
            const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
                ...{ 'onSelect': {} },
                key: (child.fullPath),
                item: (child),
                collapse: (false),
                level: (__VLS_ctx.level + 1),
                activePath: (__VLS_ctx.activePath),
            }));
            const __VLS_31 = __VLS_30({
                ...{ 'onSelect': {} },
                key: (child.fullPath),
                item: (child),
                collapse: (false),
                level: (__VLS_ctx.level + 1),
                activePath: (__VLS_ctx.activePath),
            }, ...__VLS_functionalComponentArgsRest(__VLS_30));
            let __VLS_34;
            const __VLS_35 = ({ select: {} },
                { onSelect: (...[$event]) => {
                        if (!(!__VLS_ctx.collapse))
                            return;
                        if (!(__VLS_ctx.hasVisibleChildren))
                            return;
                        __VLS_ctx.emit('select', $event);
                        // @ts-ignore
                        [level, item, activePath, emit,];
                    } });
            var __VLS_32;
            var __VLS_33;
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_26;
        // @ts-ignore
        [];
        var __VLS_3;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: (__VLS_ctx.handleClick) },
            ...{ class: "sidebar-menu-item flex items-center gap-3 rounded-lg text-sm cursor-pointer transition-colors" },
            ...{ class: ({ active: __VLS_ctx.isActive }) },
            ...{ style: ({ paddingLeft: `${(__VLS_ctx.level + 1) * 12}px` }) },
        });
        /** @type {__VLS_StyleScopedClasses['sidebar-menu-item']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['active']} */ ;
        const __VLS_36 = MenuIcon;
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
            icon: (__VLS_ctx.item.icon),
        }));
        const __VLS_38 = __VLS_37({
            icon: (__VLS_ctx.item.icon),
        }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "flex-1 truncate" },
        });
        /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
        (__VLS_ctx.translateRouteTitle(__VLS_ctx.item.title));
    }
}
else {
    if (__VLS_ctx.hasVisibleChildren) {
        let __VLS_41;
        /** @ts-ignore @type { | typeof __VLS_components.DropdownMenu | typeof __VLS_components.DropdownMenu} */
        DropdownMenu;
        // @ts-ignore
        const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({}));
        const __VLS_43 = __VLS_42({}, ...__VLS_functionalComponentArgsRest(__VLS_42));
        var __VLS_46;
        const { default: __VLS_47 } = __VLS_44.slots;
        let __VLS_48;
        /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuTrigger | typeof __VLS_components.DropdownMenuTrigger} */
        DropdownMenuTrigger;
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
            asChild: true,
        }));
        const __VLS_50 = __VLS_49({
            asChild: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        const { default: __VLS_53 } = __VLS_51.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "sidebar-menu-item-collapsed flex items-center justify-center h-10 w-full rounded-lg cursor-pointer transition-colors" },
            ...{ class: ({ 'text-primary': __VLS_ctx.isParentActive }) },
        });
        /** @type {__VLS_StyleScopedClasses['sidebar-menu-item-collapsed']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
        const __VLS_54 = MenuIcon;
        // @ts-ignore
        const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
            icon: (__VLS_ctx.item.icon),
        }));
        const __VLS_56 = __VLS_55({
            icon: (__VLS_ctx.item.icon),
        }, ...__VLS_functionalComponentArgsRest(__VLS_55));
        // @ts-ignore
        [hasVisibleChildren, isParentActive, level, item, item, item, translateRouteTitle, handleClick, isActive,];
        var __VLS_51;
        let __VLS_59;
        /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuContent | typeof __VLS_components.DropdownMenuContent} */
        DropdownMenuContent;
        // @ts-ignore
        const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
            side: "right",
            align: "start",
            ...{ class: "min-w-[180px]" },
        }));
        const __VLS_61 = __VLS_60({
            side: "right",
            align: "start",
            ...{ class: "min-w-[180px]" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_60));
        /** @type {__VLS_StyleScopedClasses['min-w-[180px]']} */ ;
        const { default: __VLS_64 } = __VLS_62.slots;
        let __VLS_65;
        /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuLabel | typeof __VLS_components.DropdownMenuLabel} */
        DropdownMenuLabel;
        // @ts-ignore
        const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
            ...{ class: "text-xs text-muted-foreground" },
        }));
        const __VLS_67 = __VLS_66({
            ...{ class: "text-xs text-muted-foreground" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_66));
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        const { default: __VLS_70 } = __VLS_68.slots;
        (__VLS_ctx.translateRouteTitle(__VLS_ctx.item.title));
        // @ts-ignore
        [item, translateRouteTitle,];
        var __VLS_68;
        let __VLS_71;
        /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSeparator} */
        DropdownMenuSeparator;
        // @ts-ignore
        const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({}));
        const __VLS_73 = __VLS_72({}, ...__VLS_functionalComponentArgsRest(__VLS_72));
        for (const [child] of __VLS_vFor((__VLS_ctx.item.children))) {
            __VLS_asFunctionalElement(__VLS_intrinsics.template)({
                key: (child.fullPath),
            });
            if (child.children?.length) {
                let __VLS_76;
                /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSub | typeof __VLS_components.DropdownMenuSub} */
                DropdownMenuSub;
                // @ts-ignore
                const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({}));
                const __VLS_78 = __VLS_77({}, ...__VLS_functionalComponentArgsRest(__VLS_77));
                const { default: __VLS_81 } = __VLS_79.slots;
                let __VLS_82;
                /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSubTrigger | typeof __VLS_components.DropdownMenuSubTrigger} */
                DropdownMenuSubTrigger;
                // @ts-ignore
                const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({
                    ...{ class: "gap-2" },
                }));
                const __VLS_84 = __VLS_83({
                    ...{ class: "gap-2" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_83));
                /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
                const { default: __VLS_87 } = __VLS_85.slots;
                const __VLS_88 = MenuIcon;
                // @ts-ignore
                const __VLS_89 = __VLS_asFunctionalComponent1(__VLS_88, new __VLS_88({
                    icon: (child.icon),
                }));
                const __VLS_90 = __VLS_89({
                    icon: (child.icon),
                }, ...__VLS_functionalComponentArgsRest(__VLS_89));
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
                (__VLS_ctx.translateRouteTitle(child.title));
                // @ts-ignore
                [item, translateRouteTitle,];
                var __VLS_85;
                let __VLS_93;
                /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSubContent | typeof __VLS_components.DropdownMenuSubContent} */
                DropdownMenuSubContent;
                // @ts-ignore
                const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({}));
                const __VLS_95 = __VLS_94({}, ...__VLS_functionalComponentArgsRest(__VLS_94));
                const { default: __VLS_98 } = __VLS_96.slots;
                for (const [grand] of __VLS_vFor((child.children))) {
                    let __VLS_99;
                    /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
                    DropdownMenuItem;
                    // @ts-ignore
                    const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
                        ...{ 'onClick': {} },
                        key: (grand.fullPath),
                        ...{ class: "gap-2" },
                    }));
                    const __VLS_101 = __VLS_100({
                        ...{ 'onClick': {} },
                        key: (grand.fullPath),
                        ...{ class: "gap-2" },
                    }, ...__VLS_functionalComponentArgsRest(__VLS_100));
                    let __VLS_104;
                    const __VLS_105 = ({ click: {} },
                        { onClick: (...[$event]) => {
                                if (!!(!__VLS_ctx.collapse))
                                    return;
                                if (!(__VLS_ctx.hasVisibleChildren))
                                    return;
                                if (!(child.children?.length))
                                    return;
                                __VLS_ctx.emit('select', grand);
                                // @ts-ignore
                                [emit,];
                            } });
                    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
                    const { default: __VLS_106 } = __VLS_102.slots;
                    const __VLS_107 = MenuIcon;
                    // @ts-ignore
                    const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({
                        icon: (grand.icon),
                    }));
                    const __VLS_109 = __VLS_108({
                        icon: (grand.icon),
                    }, ...__VLS_functionalComponentArgsRest(__VLS_108));
                    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
                    (__VLS_ctx.translateRouteTitle(grand.title));
                    // @ts-ignore
                    [translateRouteTitle,];
                    var __VLS_102;
                    var __VLS_103;
                    // @ts-ignore
                    [];
                }
                // @ts-ignore
                [];
                var __VLS_96;
                // @ts-ignore
                [];
                var __VLS_79;
            }
            else {
                let __VLS_112;
                /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
                DropdownMenuItem;
                // @ts-ignore
                const __VLS_113 = __VLS_asFunctionalComponent1(__VLS_112, new __VLS_112({
                    ...{ 'onClick': {} },
                    ...{ class: "gap-2" },
                }));
                const __VLS_114 = __VLS_113({
                    ...{ 'onClick': {} },
                    ...{ class: "gap-2" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_113));
                let __VLS_117;
                const __VLS_118 = ({ click: {} },
                    { onClick: (...[$event]) => {
                            if (!!(!__VLS_ctx.collapse))
                                return;
                            if (!(__VLS_ctx.hasVisibleChildren))
                                return;
                            if (!!(child.children?.length))
                                return;
                            __VLS_ctx.emit('select', child);
                            // @ts-ignore
                            [emit,];
                        } });
                /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
                const { default: __VLS_119 } = __VLS_115.slots;
                const __VLS_120 = MenuIcon;
                // @ts-ignore
                const __VLS_121 = __VLS_asFunctionalComponent1(__VLS_120, new __VLS_120({
                    icon: (child.icon),
                }));
                const __VLS_122 = __VLS_121({
                    icon: (child.icon),
                }, ...__VLS_functionalComponentArgsRest(__VLS_121));
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
                (__VLS_ctx.translateRouteTitle(child.title));
                // @ts-ignore
                [translateRouteTitle,];
                var __VLS_115;
                var __VLS_116;
            }
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_62;
        // @ts-ignore
        [];
        var __VLS_44;
    }
    else {
        let __VLS_125;
        /** @ts-ignore @type { | typeof __VLS_components.Tooltip | typeof __VLS_components.Tooltip} */
        Tooltip;
        // @ts-ignore
        const __VLS_126 = __VLS_asFunctionalComponent1(__VLS_125, new __VLS_125({}));
        const __VLS_127 = __VLS_126({}, ...__VLS_functionalComponentArgsRest(__VLS_126));
        var __VLS_130;
        const { default: __VLS_131 } = __VLS_128.slots;
        let __VLS_132;
        /** @ts-ignore @type { | typeof __VLS_components.TooltipTrigger | typeof __VLS_components.TooltipTrigger} */
        TooltipTrigger;
        // @ts-ignore
        const __VLS_133 = __VLS_asFunctionalComponent1(__VLS_132, new __VLS_132({
            asChild: true,
        }));
        const __VLS_134 = __VLS_133({
            asChild: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_133));
        const { default: __VLS_137 } = __VLS_135.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: (__VLS_ctx.handleClick) },
            ...{ class: "sidebar-menu-item-collapsed flex items-center justify-center h-10 w-full rounded-lg cursor-pointer transition-colors" },
            ...{ class: ({ active: __VLS_ctx.isActive }) },
        });
        /** @type {__VLS_StyleScopedClasses['sidebar-menu-item-collapsed']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['active']} */ ;
        const __VLS_138 = MenuIcon;
        // @ts-ignore
        const __VLS_139 = __VLS_asFunctionalComponent1(__VLS_138, new __VLS_138({
            icon: (__VLS_ctx.item.icon),
        }));
        const __VLS_140 = __VLS_139({
            icon: (__VLS_ctx.item.icon),
        }, ...__VLS_functionalComponentArgsRest(__VLS_139));
        // @ts-ignore
        [item, handleClick, isActive,];
        var __VLS_135;
        let __VLS_143;
        /** @ts-ignore @type { | typeof __VLS_components.TooltipContent | typeof __VLS_components.TooltipContent} */
        TooltipContent;
        // @ts-ignore
        const __VLS_144 = __VLS_asFunctionalComponent1(__VLS_143, new __VLS_143({
            side: "right",
            sideOffset: (8),
        }));
        const __VLS_145 = __VLS_144({
            side: "right",
            sideOffset: (8),
        }, ...__VLS_functionalComponentArgsRest(__VLS_144));
        const { default: __VLS_148 } = __VLS_146.slots;
        (__VLS_ctx.translateRouteTitle(__VLS_ctx.item.title));
        // @ts-ignore
        [item, translateRouteTitle,];
        var __VLS_146;
        // @ts-ignore
        [];
        var __VLS_128;
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=SidebarMenuItem.vue.js.map