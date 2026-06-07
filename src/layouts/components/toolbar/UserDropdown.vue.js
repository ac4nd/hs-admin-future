import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { LogOut, User } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { useUserStore, usePermissionStore } from "@/stores";
const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const permissionStore = usePermissionStore();
function handleProfile() {
    router.push("/profile");
}
async function handleLogout() {
    try {
        await userStore.logout();
    }
    catch {
        // 即使 API 调用失败也清除本地状态
    }
    permissionStore.resetRoutes();
    router.push(`/login?redirect=${encodeURIComponent(router.currentRoute.value.fullPath)}`);
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenu | typeof __VLS_components.DropdownMenu} */
DropdownMenu;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuTrigger | typeof __VLS_components.DropdownMenuTrigger} */
DropdownMenuTrigger;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    asChild: true,
}));
const __VLS_9 = __VLS_8({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    variant: "ghost",
    size: "sm",
    ...{ class: "gap-2 h-8" },
}));
const __VLS_15 = __VLS_14({
    variant: "ghost",
    size: "sm",
    ...{ class: "gap-2 h-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
const { default: __VLS_18 } = __VLS_16.slots;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.Avatar | typeof __VLS_components.Avatar} */
Avatar;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    ...{ class: "h-6 w-6" },
}));
const __VLS_21 = __VLS_20({
    ...{ class: "h-6 w-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
const { default: __VLS_24 } = __VLS_22.slots;
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.AvatarImage} */
AvatarImage;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    src: (__VLS_ctx.userStore.userInfo.avatar),
}));
const __VLS_27 = __VLS_26({
    src: (__VLS_ctx.userStore.userInfo.avatar),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.AvatarFallback | typeof __VLS_components.AvatarFallback} */
AvatarFallback;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    ...{ class: "text-[10px]" },
}));
const __VLS_32 = __VLS_31({
    ...{ class: "text-[10px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
const { default: __VLS_35 } = __VLS_33.slots;
((__VLS_ctx.userStore.userInfo.username || "U").charAt(0).toUpperCase());
// @ts-ignore
[userStore, userStore,];
var __VLS_33;
// @ts-ignore
[];
var __VLS_22;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-sm max-w-[80px] truncate" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[80px]']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
(__VLS_ctx.userStore.userInfo.username || "Admin");
// @ts-ignore
[userStore,];
var __VLS_16;
// @ts-ignore
[];
var __VLS_10;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuContent | typeof __VLS_components.DropdownMenuContent} */
DropdownMenuContent;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    align: "end",
    ...{ class: "w-40" },
}));
const __VLS_38 = __VLS_37({
    align: "end",
    ...{ class: "w-40" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
/** @type {__VLS_StyleScopedClasses['w-40']} */ ;
const { default: __VLS_41 } = __VLS_39.slots;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
DropdownMenuItem;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    ...{ 'onClick': {} },
}));
const __VLS_44 = __VLS_43({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
let __VLS_47;
const __VLS_48 = ({ click: {} },
    { onClick: (__VLS_ctx.handleProfile) });
const { default: __VLS_49 } = __VLS_45.slots;
let __VLS_50;
/** @ts-ignore @type { | typeof __VLS_components.User} */
User;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
    ...{ class: "mr-2 h-4 w-4" },
}));
const __VLS_52 = __VLS_51({
    ...{ class: "mr-2 h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
(__VLS_ctx.t("navbar.profile"));
// @ts-ignore
[handleProfile, t,];
var __VLS_45;
var __VLS_46;
let __VLS_55;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSeparator} */
DropdownMenuSeparator;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({}));
const __VLS_57 = __VLS_56({}, ...__VLS_functionalComponentArgsRest(__VLS_56));
let __VLS_60;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
DropdownMenuItem;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
    ...{ 'onClick': {} },
}));
const __VLS_62 = __VLS_61({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
let __VLS_65;
const __VLS_66 = ({ click: {} },
    { onClick: (__VLS_ctx.handleLogout) });
const { default: __VLS_67 } = __VLS_63.slots;
let __VLS_68;
/** @ts-ignore @type { | typeof __VLS_components.LogOut} */
LogOut;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
    ...{ class: "mr-2 h-4 w-4" },
}));
const __VLS_70 = __VLS_69({
    ...{ class: "mr-2 h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
(__VLS_ctx.t("navbar.logout"));
// @ts-ignore
[t, handleLogout,];
var __VLS_63;
var __VLS_64;
// @ts-ignore
[];
var __VLS_39;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=UserDropdown.vue.js.map