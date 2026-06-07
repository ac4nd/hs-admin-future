import { ref, computed } from "vue";
import { toast } from "vue-sonner";
import { SearchIcon, SettingsIcon, UserIcon, BellIcon, MailIcon, HomeIcon, StarIcon, HeartIcon, BookmarkIcon, ShareIcon, CopyIcon, TrashIcon, EditIcon, PlusIcon, MinusIcon, CheckIcon, XIcon, AlertCircleIcon, InfoIcon, HelpCircleIcon, FileIcon, FolderIcon, ImageIcon, CameraIcon, DownloadIcon, UploadIcon, RefreshCcwIcon, LockIcon, UnlockIcon, EyeIcon, EyeOffIcon, GlobeIcon, MapIcon, CalendarIcon, ClockIcon, FilterIcon, SortAscIcon, ChevronRightIcon, ArrowRightIcon, MoreHorizontalIcon, DatabaseIcon, CodeIcon, TerminalIcon, CpuIcon, SmartphoneIcon, PrinterIcon, MicIcon, VolumeIcon, WifiIcon, BluetoothIcon, BatteryIcon, PowerIcon, SunIcon, MoonIcon, CloudIcon, CloudRainIcon, WindIcon, ThermometerIcon, ZapIcon, ShieldIcon, KeyIcon, UsersIcon, UserPlusIcon, UserMinusIcon, LogInIcon, LogOutIcon, MenuIcon, LayoutGridIcon, ListIcon, GridIcon, ShoppingCartIcon, PackageIcon, GiftIcon, CreditCardIcon, WalletIcon, ScanIcon, QrCodeIcon, BarChartIcon, PieChartIcon, ActivityIcon, TrendingUpIcon, TrendingDownIcon, TargetIcon, CrosshairIcon, CompassIcon, NavigationIcon, MapPinIcon, FlagIcon, ExternalLinkIcon, LinkIcon, UnlinkIcon, PaperclipIcon, SendIcon, InboxIcon, ArchiveIcon, Trash2Icon, FolderOpenIcon, FileTextIcon, FilePlusIcon, FileCheckIcon, FileXIcon, FileMinusIcon, ClipboardIcon, ClipboardCopyIcon, ClipboardCheckIcon, ClipboardListIcon, PencilIcon, PenToolIcon, BrushIcon, EraserIcon, TypeIcon, BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon, IndentIcon, OutdentIcon, MessageSquareIcon, MessageCircleIcon, PhoneIcon, PhoneCallIcon, PhoneForwardedIcon, VideoIcon, VideoOffIcon, MonitorIcon, MonitorOffIcon, MaximizeIcon, MinimizeIcon, MoveIcon, ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon, ChevronsLeftIcon, ChevronsRightIcon, ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon, ArrowLeftRightIcon, ArrowUpDownIcon, RotateCwIcon, RotateCcwIcon, RefreshCwIcon, RewindIcon, FastForwardIcon, SkipBackIcon, SkipForwardIcon, PlayIcon, PauseIcon, StopCircleIcon, CircleIcon, SquareIcon, TriangleIcon, HexagonIcon, OctagonIcon, CheckCircleIcon, XCircleIcon, AlertTriangleIcon, BanIcon, ShieldCheckIcon, ShieldAlertIcon, ShieldXIcon, FingerprintIcon, ScanFaceIcon, ScanLineIcon, TimerIcon, TimerOffIcon, AlarmClockIcon, SaveIcon, DownloadCloudIcon, UploadCloudIcon, HardDriveIcon, ServerIcon, Globe2Icon, GlobeLockIcon, AtomIcon, FlameIcon, SparklesIcon, WandIcon, PaletteIcon, SwatchBookIcon, PipetteIcon, } from "@lucide/vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
    SunIcon,
    MoonIcon,
    CloudIcon,
    CloudRainIcon,
    WindIcon,
    ThermometerIcon,
    ZapIcon,
    ShieldIcon,
    KeyIcon,
    UsersIcon,
    UserPlusIcon,
    UserMinusIcon,
    LogInIcon,
    LogOutIcon,
    MenuIcon,
    LayoutGridIcon,
    ListIcon,
    GridIcon,
    ShoppingCartIcon,
    PackageIcon,
    GiftIcon,
    CreditCardIcon,
    WalletIcon,
    ScanIcon,
    QrCodeIcon,
    BarChartIcon,
    PieChartIcon,
    ActivityIcon,
    TrendingUpIcon,
    TrendingDownIcon,
    TargetIcon,
    CrosshairIcon,
    CompassIcon,
    NavigationIcon,
    MapPinIcon,
    FlagIcon,
    ExternalLinkIcon,
    LinkIcon,
    UnlinkIcon,
    PaperclipIcon,
    SendIcon,
    InboxIcon,
    ArchiveIcon,
    Trash2Icon,
    FolderOpenIcon,
    FileTextIcon,
    FilePlusIcon,
    FileCheckIcon,
    FileXIcon,
    FileMinusIcon,
    ClipboardIcon,
    ClipboardCopyIcon,
    ClipboardCheckIcon,
    ClipboardListIcon,
    PencilIcon,
    PenToolIcon,
    BrushIcon,
    EraserIcon,
    TypeIcon,
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    StrikethroughIcon,
    AlignLeftIcon,
    AlignCenterIcon,
    AlignRightIcon,
    AlignJustifyIcon,
    IndentIcon,
    OutdentIcon,
    MessageSquareIcon,
    MessageCircleIcon,
    PhoneIcon,
    PhoneCallIcon,
    PhoneForwardedIcon,
    VideoIcon,
    VideoOffIcon,
    MonitorIcon,
    MonitorOffIcon,
    MaximizeIcon,
    MinimizeIcon,
    MoveIcon,
    ChevronLeftIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    ArrowLeftIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    ArrowLeftRightIcon,
    ArrowUpDownIcon,
    RotateCwIcon,
    RotateCcwIcon,
    RefreshCwIcon,
    RewindIcon,
    FastForwardIcon,
    SkipBackIcon,
    SkipForwardIcon,
    PlayIcon,
    PauseIcon,
    StopCircleIcon,
    CircleIcon,
    SquareIcon,
    TriangleIcon,
    HexagonIcon,
    OctagonIcon,
    CheckCircleIcon,
    XCircleIcon,
    AlertTriangleIcon,
    BanIcon,
    ShieldCheckIcon,
    ShieldAlertIcon,
    ShieldXIcon,
    FingerprintIcon,
    ScanFaceIcon,
    ScanLineIcon,
    TimerIcon,
    TimerOffIcon,
    AlarmClockIcon,
    SaveIcon,
    DownloadCloudIcon,
    UploadCloudIcon,
    HardDriveIcon,
    ServerIcon,
    Globe2Icon,
    GlobeLockIcon,
    AtomIcon,
    FlameIcon,
    SparklesIcon,
    WandIcon,
    PaletteIcon,
    SwatchBookIcon,
    PipetteIcon,
};
const iconNames = Object.keys(iconMap);
const keyword = ref("");
const filteredIcons = computed(() => {
    if (!keyword.value)
        return iconNames;
    const kw = keyword.value.toLowerCase().replace("icon", "");
    return iconNames.filter((n) => n.toLowerCase().replace("icon", "").includes(kw));
});
function copyIcon(name) {
    const code = `<${name} class="size-4" />`;
    navigator.clipboard.writeText(code).then(() => {
        toast.success(`已复制: ${code}`);
    });
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-5 space-y-4" },
});
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
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
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
Badge;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    variant: "outline",
}));
const __VLS_20 = __VLS_19({
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_23 } = __VLS_21.slots;
(__VLS_ctx.filteredIcons.length);
(__VLS_ctx.iconNames.length);
// @ts-ignore
[filteredIcons, iconNames,];
var __VLS_21;
// @ts-ignore
[];
var __VLS_9;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const { default: __VLS_29 } = __VLS_27.slots;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    modelValue: (__VLS_ctx.keyword),
    placeholder: "搜索图标名称...",
    ...{ class: "w-64 h-8 mb-4" },
}));
const __VLS_32 = __VLS_31({
    modelValue: (__VLS_ctx.keyword),
    placeholder: "搜索图标名称...",
    ...{ class: "w-64 h-8 mb-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
/** @type {__VLS_StyleScopedClasses['w-64']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-6']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-8']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-10']} */ ;
/** @type {__VLS_StyleScopedClasses['xl:grid-cols-12']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
let __VLS_35;
/** @ts-ignore @type { | typeof __VLS_components.TooltipProvider | typeof __VLS_components.TooltipProvider} */
TooltipProvider;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    delayDuration: (300),
}));
const __VLS_37 = __VLS_36({
    delayDuration: (300),
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
const { default: __VLS_40 } = __VLS_38.slots;
for (const [name] of __VLS_vFor((__VLS_ctx.filteredIcons))) {
    let __VLS_41;
    /** @ts-ignore @type { | typeof __VLS_components.Tooltip | typeof __VLS_components.Tooltip} */
    Tooltip;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
        key: (name),
    }));
    const __VLS_43 = __VLS_42({
        key: (name),
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    const { default: __VLS_46 } = __VLS_44.slots;
    let __VLS_47;
    /** @ts-ignore @type { | typeof __VLS_components.TooltipTrigger | typeof __VLS_components.TooltipTrigger} */
    TooltipTrigger;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
        asChild: true,
    }));
    const __VLS_49 = __VLS_48({
        asChild: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    const { default: __VLS_52 } = __VLS_50.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.copyIcon(name);
                // @ts-ignore
                [filteredIcons, keyword, copyIcon,];
            } },
        ...{ class: "flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border hover:bg-muted/50 hover:border-primary/30 transition-colors cursor-pointer group" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-muted/50']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:border-primary/30']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['group']} */ ;
    const __VLS_53 = (__VLS_ctx.iconMap[name]);
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
        ...{ class: "size-5 text-muted-foreground group-hover:text-foreground" },
    }));
    const __VLS_55 = __VLS_54({
        ...{ class: "size-5 text-muted-foreground group-hover:text-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    /** @type {__VLS_StyleScopedClasses['size-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-hover:text-foreground']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-[10px] text-muted-foreground truncate w-full text-center" },
    });
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    (name.replace("Icon", ""));
    // @ts-ignore
    [iconMap,];
    var __VLS_50;
    let __VLS_58;
    /** @ts-ignore @type { | typeof __VLS_components.TooltipContent | typeof __VLS_components.TooltipContent} */
    TooltipContent;
    // @ts-ignore
    const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({
        side: "bottom",
        ...{ class: "font-mono text-xs" },
    }));
    const __VLS_60 = __VLS_59({
        side: "bottom",
        ...{ class: "font-mono text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_59));
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    const { default: __VLS_63 } = __VLS_61.slots;
    (name);
    // @ts-ignore
    [];
    var __VLS_61;
    // @ts-ignore
    [];
    var __VLS_44;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_38;
if (__VLS_ctx.filteredIcons.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "py-12 text-center text-muted-foreground text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['py-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
}
// @ts-ignore
[filteredIcons,];
var __VLS_27;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=icons.vue.js.map