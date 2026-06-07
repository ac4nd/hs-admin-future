import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { Bell } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
const { t } = useI18n();
const router = useRouter();
// Mock 数据 — 未来替换为 API/SSE
const notifications = ref([
    {
        id: 1,
        title: "系统升级通知：将于本周六凌晨进行系统维护",
        type: "通知",
        time: "10分钟前",
        read: false,
    },
    { id: 2, title: "新用户注册审核待处理", type: "待办", time: "1小时前", read: false },
    { id: 3, title: "服务器 CPU 使用率超过 80%", type: "告警", time: "2小时前", read: false },
]);
const unreadCount = ref(3);
function readAll() {
    notifications.value.forEach((n) => (n.read = true));
    unreadCount.value = 0;
}
function handleNoticeClick(item) {
    item.read = true;
    if (unreadCount.value > 0)
        unreadCount.value--;
}
function handleViewMore() {
    router.push("/system/notice");
}
function getBadgeVariant(type) {
    switch (type) {
        case "告警":
            return "destructive";
        case "待办":
            return "outline";
        default:
            return "secondary";
    }
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
    size: "icon",
    ...{ class: "relative" },
}));
const __VLS_15 = __VLS_14({
    variant: "ghost",
    size: "icon",
    ...{ class: "relative" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
const { default: __VLS_18 } = __VLS_16.slots;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.Bell} */
Bell;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    ...{ class: "h-4 w-4" },
}));
const __VLS_21 = __VLS_20({
    ...{ class: "h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
if (__VLS_ctx.unreadCount > 0) {
    let __VLS_24;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
        variant: "destructive",
        ...{ class: "absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[10px] leading-none" },
    }));
    const __VLS_26 = __VLS_25({
        variant: "destructive",
        ...{ class: "absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[10px] leading-none" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['-top-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['-right-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-none']} */ ;
    const { default: __VLS_29 } = __VLS_27.slots;
    (__VLS_ctx.unreadCount > 99 ? "99+" : __VLS_ctx.unreadCount);
    // @ts-ignore
    [unreadCount, unreadCount, unreadCount,];
    var __VLS_27;
}
// @ts-ignore
[];
var __VLS_16;
// @ts-ignore
[];
var __VLS_10;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuContent | typeof __VLS_components.DropdownMenuContent} */
DropdownMenuContent;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    align: "end",
    ...{ class: "w-72" },
}));
const __VLS_32 = __VLS_31({
    align: "end",
    ...{ class: "w-72" },
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
/** @type {__VLS_StyleScopedClasses['w-72']} */ ;
const { default: __VLS_35 } = __VLS_33.slots;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuLabel | typeof __VLS_components.DropdownMenuLabel} */
DropdownMenuLabel;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    ...{ class: "flex items-center justify-between" },
}));
const __VLS_38 = __VLS_37({
    ...{ class: "flex items-center justify-between" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
const { default: __VLS_41 } = __VLS_39.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.t("navbar.notification"));
if (__VLS_ctx.unreadCount > 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ onClick: (__VLS_ctx.readAll) },
        ...{ class: "text-xs text-primary cursor-pointer hover:underline" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
    (__VLS_ctx.t("navbar.notificationReadAll"));
}
// @ts-ignore
[unreadCount, t, t, readAll,];
var __VLS_39;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSeparator} */
DropdownMenuSeparator;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({}));
const __VLS_44 = __VLS_43({}, ...__VLS_functionalComponentArgsRest(__VLS_43));
if (__VLS_ctx.notifications.length > 0) {
    for (const [item] of __VLS_vFor((__VLS_ctx.notifications))) {
        let __VLS_47;
        /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
        DropdownMenuItem;
        // @ts-ignore
        const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
            ...{ 'onClick': {} },
            key: (item.id),
            ...{ class: "flex flex-col items-start gap-1 py-2" },
        }));
        const __VLS_49 = __VLS_48({
            ...{ 'onClick': {} },
            key: (item.id),
            ...{ class: "flex flex-col items-start gap-1 py-2" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_48));
        let __VLS_52;
        const __VLS_53 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.notifications.length > 0))
                        return;
                    __VLS_ctx.handleNoticeClick(item);
                    // @ts-ignore
                    [notifications, notifications, handleNoticeClick,];
                } });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
        const { default: __VLS_54 } = __VLS_50.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center gap-2 w-full" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        let __VLS_55;
        /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
        Badge;
        // @ts-ignore
        const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
            variant: (__VLS_ctx.getBadgeVariant(item.type)),
            ...{ class: "text-[10px] shrink-0" },
        }));
        const __VLS_57 = __VLS_56({
            variant: (__VLS_ctx.getBadgeVariant(item.type)),
            ...{ class: "text-[10px] shrink-0" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_56));
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        const { default: __VLS_60 } = __VLS_58.slots;
        (item.type);
        // @ts-ignore
        [getBadgeVariant,];
        var __VLS_58;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs text-muted-foreground ml-auto" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        /** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
        (item.time);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-sm truncate w-full" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        (item.title);
        // @ts-ignore
        [];
        var __VLS_50;
        var __VLS_51;
        // @ts-ignore
        [];
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "py-6 text-center text-sm text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['py-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("navbar.notificationEmpty"));
}
if (__VLS_ctx.notifications.length > 0) {
    let __VLS_61;
    /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuSeparator} */
    DropdownMenuSeparator;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent1(__VLS_61, new __VLS_61({}));
    const __VLS_63 = __VLS_62({}, ...__VLS_functionalComponentArgsRest(__VLS_62));
}
if (__VLS_ctx.notifications.length > 0) {
    let __VLS_66;
    /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
    DropdownMenuItem;
    // @ts-ignore
    const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
        ...{ 'onClick': {} },
        ...{ class: "justify-center text-primary" },
    }));
    const __VLS_68 = __VLS_67({
        ...{ 'onClick': {} },
        ...{ class: "justify-center text-primary" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_67));
    let __VLS_71;
    const __VLS_72 = ({ click: {} },
        { onClick: (__VLS_ctx.handleViewMore) });
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
    const { default: __VLS_73 } = __VLS_69.slots;
    (__VLS_ctx.t("navbar.notificationMore"));
    // @ts-ignore
    [t, t, notifications, notifications, handleViewMore,];
    var __VLS_69;
    var __VLS_70;
}
// @ts-ignore
[];
var __VLS_33;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=NoticeDropdown.vue.js.map