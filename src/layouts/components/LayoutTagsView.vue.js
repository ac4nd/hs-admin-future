import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ChevronDown, ChevronLeft, ChevronRight, Expand, FolderX, RefreshCw, X, XCircle, } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppStore, useSettingsStore, useTagsViewStore } from "@/stores";
import TagsViewItem from "./TagsViewItem.vue";
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const tagsViewStore = useTagsViewStore();
const glassEffect = computed(() => settingsStore.glassEffect);
/** 当前路由对应的标签 */
const currentTag = computed(() => tagsViewStore.visitedViews.find((v) => v.path === route.path));
/** 路由变化时自动添加标签 */
watch(() => route.path, () => {
    if (route.meta?.title && !route.meta?.hidden) {
        tagsViewStore.addView(route);
    }
}, { immediate: true });
function handleTagClick(tag) {
    router.push(tag.fullPath);
}
function handleTagClose(tag) {
    const wasActive = tag.path === route.path;
    tagsViewStore.deleteView(tag);
    if (wasActive)
        toLastView();
}
/** 刷新当前页：清除缓存后跳转 redirect 中转页 */
function handleRefresh() {
    const tag = currentTag.value;
    if (!tag)
        return;
    tagsViewStore.deleteCachedView(tag);
    router.replace("/redirect" + tag.fullPath);
}
function handleCloseCurrent() {
    const tag = currentTag.value;
    if (!tag || tag.affix)
        return;
    handleTagClose(tag);
}
function handleCloseOthers() {
    tagsViewStore.deleteOthersViews({
        path: route.path,
        name: route.name,
        title: route.meta?.title ?? "",
        fullPath: route.fullPath,
    });
}
function handleCloseLeft() {
    tagsViewStore.deleteLeftViews({
        path: route.path,
        name: route.name,
        title: route.meta?.title ?? "",
        fullPath: route.fullPath,
    });
    // 若当前路由被关掉了，跳到最后一个
    if (!tagsViewStore.visitedViews.some((v) => v.path === route.path)) {
        toLastView();
    }
}
function handleCloseRight() {
    tagsViewStore.deleteRightViews({
        path: route.path,
        name: route.name,
        title: route.meta?.title ?? "",
        fullPath: route.fullPath,
    });
    if (!tagsViewStore.visitedViews.some((v) => v.path === route.path)) {
        toLastView();
    }
}
function handleCloseAll() {
    tagsViewStore.deleteAllViews();
    toLastView();
}
function toLastView() {
    const views = tagsViewStore.visitedViews;
    const last = views[views.length - 1];
    router.push(last ? last.fullPath : "/");
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "tags-container" },
    ...{ class: (__VLS_ctx.glassEffect
            ? 'backdrop-blur-xl bg-white/8 dark:bg-black/20 border-b border-white/15 dark:border-white/8'
            : 'bg-[var(--content-bg)] border-b border-[var(--border-color)]') },
});
/** @type {__VLS_StyleScopedClasses['tags-container']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.ScrollArea | typeof __VLS_components.ScrollArea} */
ScrollArea;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "flex-1" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "flex-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-1 px-2 h-full" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
for (const [tag] of __VLS_vFor((__VLS_ctx.tagsViewStore.visitedViews))) {
    const __VLS_6 = TagsViewItem;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        ...{ 'onClick': {} },
        ...{ 'onClose': {} },
        key: (tag.path),
        tag: (tag),
        active: (tag.path === __VLS_ctx.route.path),
    }));
    const __VLS_8 = __VLS_7({
        ...{ 'onClick': {} },
        ...{ 'onClose': {} },
        key: (tag.path),
        tag: (tag),
        active: (tag.path === __VLS_ctx.route.path),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_11;
    const __VLS_12 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleTagClick(tag);
                // @ts-ignore
                [glassEffect, tagsViewStore, route, handleTagClick,];
            } });
    const __VLS_13 = ({ close: {} },
        { onClose: (...[$event]) => {
                __VLS_ctx.handleTagClose(tag);
                // @ts-ignore
                [handleTagClose,];
            } });
    var __VLS_9;
    var __VLS_10;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-0.5 shrink-0 px-1" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['px-1']} */ ;
let __VLS_14;
/** @ts-ignore @type { | typeof __VLS_components.Tooltip | typeof __VLS_components.Tooltip} */
Tooltip;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({}));
const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
const { default: __VLS_19 } = __VLS_17.slots;
let __VLS_20;
/** @ts-ignore @type { | typeof __VLS_components.TooltipTrigger | typeof __VLS_components.TooltipTrigger} */
TooltipTrigger;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
    asChild: true,
}));
const __VLS_22 = __VLS_21({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const { default: __VLS_25 } = __VLS_23.slots;
let __VLS_26;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "icon",
    ...{ class: "h-6 w-6" },
}));
const __VLS_28 = __VLS_27({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "icon",
    ...{ class: "h-6 w-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
let __VLS_31;
const __VLS_32 = ({ click: {} },
    { onClick: (__VLS_ctx.handleRefresh) });
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
const { default: __VLS_33 } = __VLS_29.slots;
let __VLS_34;
/** @ts-ignore @type { | typeof __VLS_components.RefreshCw} */
RefreshCw;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
    ...{ class: "h-3.5 w-3.5" },
}));
const __VLS_36 = __VLS_35({
    ...{ class: "h-3.5 w-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
// @ts-ignore
[handleRefresh,];
var __VLS_29;
var __VLS_30;
// @ts-ignore
[];
var __VLS_23;
let __VLS_39;
/** @ts-ignore @type { | typeof __VLS_components.TooltipContent | typeof __VLS_components.TooltipContent} */
TooltipContent;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
    side: "bottom",
    sideOffset: (4),
}));
const __VLS_41 = __VLS_40({
    side: "bottom",
    sideOffset: (4),
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
const { default: __VLS_44 } = __VLS_42.slots;
(__VLS_ctx.t("tagsView.refresh"));
// @ts-ignore
[t,];
var __VLS_42;
// @ts-ignore
[];
var __VLS_17;
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.Tooltip | typeof __VLS_components.Tooltip} */
Tooltip;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({}));
const __VLS_47 = __VLS_46({}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const { default: __VLS_50 } = __VLS_48.slots;
let __VLS_51;
/** @ts-ignore @type { | typeof __VLS_components.TooltipTrigger | typeof __VLS_components.TooltipTrigger} */
TooltipTrigger;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
    asChild: true,
}));
const __VLS_53 = __VLS_52({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
const { default: __VLS_56 } = __VLS_54.slots;
let __VLS_57;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "icon",
    ...{ class: "h-6 w-6" },
}));
const __VLS_59 = __VLS_58({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "icon",
    ...{ class: "h-6 w-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
let __VLS_62;
const __VLS_63 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.appStore.toggleContentFullscreen();
            // @ts-ignore
            [appStore,];
        } });
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
const { default: __VLS_64 } = __VLS_60.slots;
if (__VLS_ctx.appStore.contentFullscreen) {
    let __VLS_65;
    /** @ts-ignore @type { | typeof __VLS_components.X} */
    X;
    // @ts-ignore
    const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
        ...{ class: "h-3.5 w-3.5" },
    }));
    const __VLS_67 = __VLS_66({
        ...{ class: "h-3.5 w-3.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_66));
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
}
else {
    let __VLS_70;
    /** @ts-ignore @type { | typeof __VLS_components.Expand} */
    Expand;
    // @ts-ignore
    const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
        ...{ class: "h-3.5 w-3.5" },
    }));
    const __VLS_72 = __VLS_71({
        ...{ class: "h-3.5 w-3.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_71));
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
}
// @ts-ignore
[appStore,];
var __VLS_60;
var __VLS_61;
// @ts-ignore
[];
var __VLS_54;
let __VLS_75;
/** @ts-ignore @type { | typeof __VLS_components.TooltipContent | typeof __VLS_components.TooltipContent} */
TooltipContent;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
    side: "bottom",
    sideOffset: (4),
}));
const __VLS_77 = __VLS_76({
    side: "bottom",
    sideOffset: (4),
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
const { default: __VLS_80 } = __VLS_78.slots;
(__VLS_ctx.appStore.contentFullscreen ? __VLS_ctx.t("navbar.fullscreenExit") : __VLS_ctx.t("navbar.fullscreen"));
// @ts-ignore
[t, t, appStore,];
var __VLS_78;
// @ts-ignore
[];
var __VLS_48;
let __VLS_81;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenu | typeof __VLS_components.DropdownMenu} */
DropdownMenu;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({}));
const __VLS_83 = __VLS_82({}, ...__VLS_functionalComponentArgsRest(__VLS_82));
const { default: __VLS_86 } = __VLS_84.slots;
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuTrigger | typeof __VLS_components.DropdownMenuTrigger} */
DropdownMenuTrigger;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
    asChild: true,
}));
const __VLS_89 = __VLS_88({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
const { default: __VLS_92 } = __VLS_90.slots;
let __VLS_93;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
    variant: "ghost",
    size: "icon",
    ...{ class: "h-6 w-6" },
}));
const __VLS_95 = __VLS_94({
    variant: "ghost",
    size: "icon",
    ...{ class: "h-6 w-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
const { default: __VLS_98 } = __VLS_96.slots;
let __VLS_99;
/** @ts-ignore @type { | typeof __VLS_components.ChevronDown} */
ChevronDown;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
    ...{ class: "h-3.5 w-3.5" },
}));
const __VLS_101 = __VLS_100({
    ...{ class: "h-3.5 w-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
// @ts-ignore
[];
var __VLS_96;
// @ts-ignore
[];
var __VLS_90;
let __VLS_104;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuContent | typeof __VLS_components.DropdownMenuContent} */
DropdownMenuContent;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent1(__VLS_104, new __VLS_104({
    align: "end",
}));
const __VLS_106 = __VLS_105({
    align: "end",
}, ...__VLS_functionalComponentArgsRest(__VLS_105));
const { default: __VLS_109 } = __VLS_107.slots;
let __VLS_110;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
DropdownMenuItem;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({
    ...{ 'onClick': {} },
}));
const __VLS_112 = __VLS_111({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
let __VLS_115;
const __VLS_116 = ({ click: {} },
    { onClick: (__VLS_ctx.handleRefresh) });
const { default: __VLS_117 } = __VLS_113.slots;
let __VLS_118;
/** @ts-ignore @type { | typeof __VLS_components.RefreshCw} */
RefreshCw;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({
    ...{ class: "mr-2 h-4 w-4" },
}));
const __VLS_120 = __VLS_119({
    ...{ class: "mr-2 h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
(__VLS_ctx.t("tagsView.refresh"));
// @ts-ignore
[handleRefresh, t,];
var __VLS_113;
var __VLS_114;
if (__VLS_ctx.currentTag && !__VLS_ctx.currentTag.affix) {
    let __VLS_123;
    /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
    DropdownMenuItem;
    // @ts-ignore
    const __VLS_124 = __VLS_asFunctionalComponent1(__VLS_123, new __VLS_123({
        ...{ 'onClick': {} },
    }));
    const __VLS_125 = __VLS_124({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_124));
    let __VLS_128;
    const __VLS_129 = ({ click: {} },
        { onClick: (__VLS_ctx.handleCloseCurrent) });
    const { default: __VLS_130 } = __VLS_126.slots;
    let __VLS_131;
    /** @ts-ignore @type { | typeof __VLS_components.X} */
    X;
    // @ts-ignore
    const __VLS_132 = __VLS_asFunctionalComponent1(__VLS_131, new __VLS_131({
        ...{ class: "mr-2 h-4 w-4" },
    }));
    const __VLS_133 = __VLS_132({
        ...{ class: "mr-2 h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_132));
    /** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    (__VLS_ctx.t("tagsView.closeCurrent"));
    // @ts-ignore
    [t, currentTag, currentTag, handleCloseCurrent,];
    var __VLS_126;
    var __VLS_127;
}
let __VLS_136;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSeparator} */
DropdownMenuSeparator;
// @ts-ignore
const __VLS_137 = __VLS_asFunctionalComponent1(__VLS_136, new __VLS_136({}));
const __VLS_138 = __VLS_137({}, ...__VLS_functionalComponentArgsRest(__VLS_137));
let __VLS_141;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
DropdownMenuItem;
// @ts-ignore
const __VLS_142 = __VLS_asFunctionalComponent1(__VLS_141, new __VLS_141({
    ...{ 'onClick': {} },
}));
const __VLS_143 = __VLS_142({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_142));
let __VLS_146;
const __VLS_147 = ({ click: {} },
    { onClick: (__VLS_ctx.handleCloseOthers) });
const { default: __VLS_148 } = __VLS_144.slots;
let __VLS_149;
/** @ts-ignore @type { | typeof __VLS_components.FolderX} */
FolderX;
// @ts-ignore
const __VLS_150 = __VLS_asFunctionalComponent1(__VLS_149, new __VLS_149({
    ...{ class: "mr-2 h-4 w-4" },
}));
const __VLS_151 = __VLS_150({
    ...{ class: "mr-2 h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_150));
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
(__VLS_ctx.t("tagsView.closeOthers"));
// @ts-ignore
[t, handleCloseOthers,];
var __VLS_144;
var __VLS_145;
let __VLS_154;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
DropdownMenuItem;
// @ts-ignore
const __VLS_155 = __VLS_asFunctionalComponent1(__VLS_154, new __VLS_154({
    ...{ 'onClick': {} },
}));
const __VLS_156 = __VLS_155({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_155));
let __VLS_159;
const __VLS_160 = ({ click: {} },
    { onClick: (__VLS_ctx.handleCloseLeft) });
const { default: __VLS_161 } = __VLS_157.slots;
let __VLS_162;
/** @ts-ignore @type { | typeof __VLS_components.ChevronLeft} */
ChevronLeft;
// @ts-ignore
const __VLS_163 = __VLS_asFunctionalComponent1(__VLS_162, new __VLS_162({
    ...{ class: "mr-2 h-4 w-4" },
}));
const __VLS_164 = __VLS_163({
    ...{ class: "mr-2 h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_163));
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
(__VLS_ctx.t("tagsView.closeLeft"));
// @ts-ignore
[t, handleCloseLeft,];
var __VLS_157;
var __VLS_158;
let __VLS_167;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
DropdownMenuItem;
// @ts-ignore
const __VLS_168 = __VLS_asFunctionalComponent1(__VLS_167, new __VLS_167({
    ...{ 'onClick': {} },
}));
const __VLS_169 = __VLS_168({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_168));
let __VLS_172;
const __VLS_173 = ({ click: {} },
    { onClick: (__VLS_ctx.handleCloseRight) });
const { default: __VLS_174 } = __VLS_170.slots;
let __VLS_175;
/** @ts-ignore @type { | typeof __VLS_components.ChevronRight} */
ChevronRight;
// @ts-ignore
const __VLS_176 = __VLS_asFunctionalComponent1(__VLS_175, new __VLS_175({
    ...{ class: "mr-2 h-4 w-4" },
}));
const __VLS_177 = __VLS_176({
    ...{ class: "mr-2 h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_176));
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
(__VLS_ctx.t("tagsView.closeRight"));
// @ts-ignore
[t, handleCloseRight,];
var __VLS_170;
var __VLS_171;
let __VLS_180;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSeparator} */
DropdownMenuSeparator;
// @ts-ignore
const __VLS_181 = __VLS_asFunctionalComponent1(__VLS_180, new __VLS_180({}));
const __VLS_182 = __VLS_181({}, ...__VLS_functionalComponentArgsRest(__VLS_181));
let __VLS_185;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
DropdownMenuItem;
// @ts-ignore
const __VLS_186 = __VLS_asFunctionalComponent1(__VLS_185, new __VLS_185({
    ...{ 'onClick': {} },
}));
const __VLS_187 = __VLS_186({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_186));
let __VLS_190;
const __VLS_191 = ({ click: {} },
    { onClick: (__VLS_ctx.handleCloseAll) });
const { default: __VLS_192 } = __VLS_188.slots;
let __VLS_193;
/** @ts-ignore @type { | typeof __VLS_components.XCircle} */
XCircle;
// @ts-ignore
const __VLS_194 = __VLS_asFunctionalComponent1(__VLS_193, new __VLS_193({
    ...{ class: "mr-2 h-4 w-4" },
}));
const __VLS_195 = __VLS_194({
    ...{ class: "mr-2 h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_194));
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
(__VLS_ctx.t("tagsView.closeAll"));
// @ts-ignore
[t, handleCloseAll,];
var __VLS_188;
var __VLS_189;
// @ts-ignore
[];
var __VLS_107;
// @ts-ignore
[];
var __VLS_84;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=LayoutTagsView.vue.js.map