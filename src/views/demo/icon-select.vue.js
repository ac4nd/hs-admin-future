import { ref, computed } from "vue";
import { SearchIcon, SettingsIcon, UserIcon, BellIcon, MailIcon, HomeIcon, StarIcon, HeartIcon, BookmarkIcon, ShareIcon, CopyIcon, TrashIcon, EditIcon, PlusIcon, MinusIcon, CheckIcon, XIcon, AlertCircleIcon, InfoIcon, HelpCircleIcon, FileIcon, FolderIcon, ImageIcon, CameraIcon, DownloadIcon, UploadIcon, RefreshCcwIcon, LockIcon, UnlockIcon, EyeIcon, EyeOffIcon, GlobeIcon, MapIcon, CalendarIcon, ClockIcon, FilterIcon, SortAscIcon, ChevronRightIcon, ArrowRightIcon, MoreHorizontalIcon, DatabaseIcon, CodeIcon, TerminalIcon, CpuIcon, SmartphoneIcon, PrinterIcon, MicIcon, VolumeIcon, WifiIcon, BluetoothIcon, BatteryIcon, PowerIcon, } from "@lucide/vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
const iconMap = {
    SearchIcon,
    SettingsIcon,
    UserIcon,
    BellIcon,
    MailIcon,
    HomeIcon,
    StarIcon,
    HeartIcon,
    BookmarkIcon,
    ShareIcon,
    CopyIcon,
    TrashIcon,
    EditIcon,
    PlusIcon,
    MinusIcon,
    CheckIcon,
    XIcon,
    AlertCircleIcon,
    InfoIcon,
    HelpCircleIcon,
    FileIcon,
    FolderIcon,
    ImageIcon,
    CameraIcon,
    DownloadIcon,
    UploadIcon,
    RefreshCcwIcon,
    LockIcon,
    UnlockIcon,
    EyeIcon,
    EyeOffIcon,
    GlobeIcon,
    MapIcon,
    CalendarIcon,
    ClockIcon,
    FilterIcon,
    SortAscIcon,
    ChevronRightIcon,
    ArrowRightIcon,
    MoreHorizontalIcon,
    DatabaseIcon,
    CodeIcon,
    TerminalIcon,
    CpuIcon,
    SmartphoneIcon,
    PrinterIcon,
    MicIcon,
    VolumeIcon,
    WifiIcon,
    BluetoothIcon,
    BatteryIcon,
    PowerIcon,
};
const iconNames = Object.keys(iconMap);
const selectedIcon = ref("EditIcon");
const keyword = ref("");
const popoverOpen = ref(false);
const currentIcon = computed(() => (selectedIcon.value ? iconMap[selectedIcon.value] : null));
const filteredIcons = computed(() => {
    if (!keyword.value)
        return iconNames;
    const kw = keyword.value.toLowerCase();
    return iconNames.filter((n) => n.toLowerCase().includes(kw));
});
function selectIcon(name) {
    selectedIcon.value = name;
    popoverOpen.value = false;
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-5 space-y-5" },
});
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-5']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    ...{ class: "text-sm" },
}));
const __VLS_14 = __VLS_13({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_17 } = __VLS_15.slots;
var __VLS_15;
var __VLS_9;
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    ...{ class: "space-y-4" },
}));
const __VLS_20 = __VLS_19({
    ...{ class: "space-y-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
const { default: __VLS_23 } = __VLS_21.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    ...{ class: "w-20 text-sm" },
}));
const __VLS_26 = __VLS_25({
    ...{ class: "w-20 text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_29 } = __VLS_27.slots;
var __VLS_27;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.Popover | typeof __VLS_components.Popover} */
Popover;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    open: (__VLS_ctx.popoverOpen),
}));
const __VLS_32 = __VLS_31({
    open: (__VLS_ctx.popoverOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.PopoverTrigger | typeof __VLS_components.PopoverTrigger} */
PopoverTrigger;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    asChild: true,
}));
const __VLS_38 = __VLS_37({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_41 } = __VLS_39.slots;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    variant: "outline",
    ...{ class: "w-64 justify-start gap-2" },
}));
const __VLS_44 = __VLS_43({
    variant: "outline",
    ...{ class: "w-64 justify-start gap-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
/** @type {__VLS_StyleScopedClasses['w-64']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
const { default: __VLS_47 } = __VLS_45.slots;
if (__VLS_ctx.currentIcon) {
    const __VLS_48 = (__VLS_ctx.currentIcon);
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
        ...{ class: "size-4" },
    }));
    const __VLS_50 = __VLS_49({
        ...{ class: "size-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
}
if (__VLS_ctx.currentIcon) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.selectedIcon);
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
}
// @ts-ignore
[popoverOpen, currentIcon, currentIcon, currentIcon, selectedIcon,];
var __VLS_45;
// @ts-ignore
[];
var __VLS_39;
let __VLS_53;
/** @ts-ignore @type { | typeof __VLS_components.PopoverContent | typeof __VLS_components.PopoverContent} */
PopoverContent;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
    ...{ class: "w-80 p-3" },
    align: "start",
}));
const __VLS_55 = __VLS_54({
    ...{ class: "w-80 p-3" },
    align: "start",
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
/** @type {__VLS_StyleScopedClasses['w-80']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
const { default: __VLS_58 } = __VLS_56.slots;
let __VLS_59;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
    modelValue: (__VLS_ctx.keyword),
    placeholder: "搜索图标...",
    ...{ class: "mb-3 h-8" },
}));
const __VLS_61 = __VLS_60({
    modelValue: (__VLS_ctx.keyword),
    placeholder: "搜索图标...",
    ...{ class: "mb-3 h-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
let __VLS_64;
/** @ts-ignore @type { | typeof __VLS_components.ScrollArea | typeof __VLS_components.ScrollArea} */
ScrollArea;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
    ...{ class: "h-64" },
}));
const __VLS_66 = __VLS_65({
    ...{ class: "h-64" },
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
/** @type {__VLS_StyleScopedClasses['h-64']} */ ;
const { default: __VLS_69 } = __VLS_67.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-6 gap-1" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-6']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
for (const [name] of __VLS_vFor((__VLS_ctx.filteredIcons))) {
    let __VLS_70;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
        ...{ 'onClick': {} },
        key: (name),
        variant: "ghost",
        size: "icon-sm",
        ...{ class: ({ 'bg-primary text-primary-foreground': name === __VLS_ctx.selectedIcon }) },
    }));
    const __VLS_72 = __VLS_71({
        ...{ 'onClick': {} },
        key: (name),
        variant: "ghost",
        size: "icon-sm",
        ...{ class: ({ 'bg-primary text-primary-foreground': name === __VLS_ctx.selectedIcon }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_71));
    let __VLS_75;
    const __VLS_76 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.selectIcon(name);
                // @ts-ignore
                [selectedIcon, keyword, filteredIcons, selectIcon,];
            } });
    /** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary-foreground']} */ ;
    const { default: __VLS_77 } = __VLS_73.slots;
    const __VLS_78 = (__VLS_ctx.iconMap[name]);
    // @ts-ignore
    const __VLS_79 = __VLS_asFunctionalComponent1(__VLS_78, new __VLS_78({
        ...{ class: "size-4" },
    }));
    const __VLS_80 = __VLS_79({
        ...{ class: "size-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_79));
    /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
    // @ts-ignore
    [iconMap,];
    var __VLS_73;
    var __VLS_74;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_67;
// @ts-ignore
[];
var __VLS_56;
// @ts-ignore
[];
var __VLS_33;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
let __VLS_83;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
    ...{ class: "w-20 text-sm" },
}));
const __VLS_85 = __VLS_84({
    ...{ class: "w-20 text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_88 } = __VLS_86.slots;
// @ts-ignore
[];
var __VLS_86;
__VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({
    ...{ class: "text-xs bg-muted px-2 py-1 rounded" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
(__VLS_ctx.selectedIcon || "无");
// @ts-ignore
[selectedIcon,];
var __VLS_21;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=icon-select.vue.js.map