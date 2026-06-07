import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { Search } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import { usePermissionStore } from "@/stores";
import { generateMenus } from "@/utils/menu";
import { translateRouteTitle } from "@/utils/i18n";
const { t } = useI18n();
const router = useRouter();
const permissionStore = usePermissionStore();
const open = ref(false);
/** 将菜单树展平为一级列表用于搜索 */
const flatMenus = flattenMenus(generateMenus(permissionStore.routes));
function flattenMenus(items) {
    const result = [];
    for (const item of items) {
        if (item.children?.length) {
            result.push(...flattenMenus(item.children));
        }
        else {
            result.push(item);
        }
    }
    return result;
}
function handleSelect(item) {
    open.value = false;
    if (item.fullPath.startsWith("http")) {
        window.open(item.fullPath, "_blank");
    }
    else {
        router.push(item.fullPath);
    }
}
/** 全局 Ctrl+K 快捷键 */
function handleKeydown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        open.value = true;
    }
}
window.addEventListener("keydown", handleKeydown);
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "icon",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "icon",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.open = true;
            // @ts-ignore
            [open,];
        } });
const { default: __VLS_7 } = __VLS_3.slots;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.Search} */
Search;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    ...{ class: "h-4 w-4" },
}));
const __VLS_10 = __VLS_9({
    ...{ class: "h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.CommandDialog | typeof __VLS_components.CommandDialog} */
CommandDialog;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    open: (__VLS_ctx.open),
}));
const __VLS_15 = __VLS_14({
    open: (__VLS_ctx.open),
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const { default: __VLS_18 } = __VLS_16.slots;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.CommandInput} */
CommandInput;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    placeholder: (__VLS_ctx.t('navbar.search') + '...'),
}));
const __VLS_21 = __VLS_20({
    placeholder: (__VLS_ctx.t('navbar.search') + '...'),
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.CommandList | typeof __VLS_components.CommandList} */
CommandList;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const { default: __VLS_29 } = __VLS_27.slots;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.CommandEmpty | typeof __VLS_components.CommandEmpty} */
CommandEmpty;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({}));
const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
(__VLS_ctx.t("navbar.search"));
// @ts-ignore
[open, t, t,];
var __VLS_33;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.CommandGroup | typeof __VLS_components.CommandGroup} */
CommandGroup;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({}));
const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_41 } = __VLS_39.slots;
for (const [item] of __VLS_vFor((__VLS_ctx.flatMenus))) {
    let __VLS_42;
    /** @ts-ignore @type { | typeof __VLS_components.CommandItem | typeof __VLS_components.CommandItem} */
    CommandItem;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
        ...{ 'onSelect': {} },
        key: (item.fullPath),
        value: (item.title),
    }));
    const __VLS_44 = __VLS_43({
        ...{ 'onSelect': {} },
        key: (item.fullPath),
        value: (item.title),
    }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    let __VLS_47;
    const __VLS_48 = ({ select: {} },
        { onSelect: (...[$event]) => {
                __VLS_ctx.handleSelect(item);
                // @ts-ignore
                [flatMenus, handleSelect,];
            } });
    const { default: __VLS_49 } = __VLS_45.slots;
    let __VLS_50;
    /** @ts-ignore @type { | typeof __VLS_components.MenuIcon} */
    MenuIcon;
    // @ts-ignore
    const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
        icon: (item.icon),
        ...{ class: "mr-2 size-3.5" },
    }));
    const __VLS_52 = __VLS_51({
        icon: (item.icon),
        ...{ class: "mr-2 size-3.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_51));
    /** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.translateRouteTitle(item.title));
    // @ts-ignore
    [translateRouteTitle,];
    var __VLS_45;
    var __VLS_46;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_39;
// @ts-ignore
[];
var __VLS_27;
// @ts-ignore
[];
var __VLS_16;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=SearchMenu.vue.js.map