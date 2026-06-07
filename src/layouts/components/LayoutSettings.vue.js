import { ref } from "vue";
import { toast } from "vue-sonner";
import { SunIcon, MoonIcon, MonitorIcon, CheckIcon, CopyIcon, RotateCcwIcon, PipetteIcon, } from "@lucide/vue";
import { PageSwitchingAnimationOptions, } from "@/enums/settings";
import { themeColorPresets } from "@/settings";
import { useSettingsStore } from "@/stores";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, } from "@/components/ui/sheet";
const settingsStore = useSettingsStore();
const colorInputRef = ref();
const copyLoading = ref(false);
const themeModes = [
    { value: "light" /* ThemeMode.LIGHT */, label: "亮色", icon: SunIcon },
    { value: "dark" /* ThemeMode.DARK */, label: "暗色", icon: MoonIcon },
    { value: "auto" /* ThemeMode.AUTO */, label: "自动", icon: MonitorIcon },
];
const layoutOptions = [
    { value: "left" /* LayoutMode.LEFT */, label: "左侧" },
    { value: "top" /* LayoutMode.TOP */, label: "顶部" },
    { value: "mix" /* LayoutMode.MIX */, label: "混合" },
];
const animationOptions = Object.values(PageSwitchingAnimationOptions);
const glassSliders = [
    {
        key: "displacementScale",
        label: "折射强度",
        min: 0,
        max: 200,
        step: 1,
        color: "#3b82f6",
    },
    {
        key: "blur",
        label: "背景模糊",
        min: 0,
        max: 30,
        step: 1,
        color: "#22c55e",
        suffix: "px",
    },
    {
        key: "saturation",
        label: "饱和度",
        min: 100,
        max: 300,
        step: 10,
        color: "#a855f7",
        suffix: "%",
    },
    {
        key: "aberrationIntensity",
        label: "色散强度",
        min: 0,
        max: 20,
        step: 0.5,
        color: "#06b6d4",
    },
    { key: "elasticity", label: "弹性系数", min: 0, max: 1, step: 0.05, color: "#f97316" },
    {
        key: "cornerRadius",
        label: "圆角",
        min: 0,
        max: 100,
        step: 1,
        color: "#ec4899",
        suffix: "px",
    },
];
async function handleCopySettings() {
    copyLoading.value = true;
    try {
        const code = `import { LayoutMode, SidebarColor, ThemeMode, LanguageEnum } from "@/enums/settings";

export const defaults = {
  theme: ThemeMode.${settingsStore.theme.toUpperCase()},
  themeColor: "${settingsStore.themeColor}",
  sidebarColorScheme: SidebarColor.${settingsStore.sidebarColorScheme.toUpperCase().replace("-", "_")},
  layout: LayoutMode.${settingsStore.layout.toUpperCase()},
  language: LanguageEnum.ZH_CN,
  showTagsView: ${settingsStore.showTagsView},
  showAppLogo: ${settingsStore.showAppLogo},
  showWatermark: ${settingsStore.showWatermark},
  pageSwitchingAnimation: "${settingsStore.pageSwitchingAnimation}",
  showSettings: true,
  glassEffect: ${settingsStore.glassEffect},
  glassParams: {
    displacementScale: ${settingsStore.glassParams?.displacementScale},
    blur: ${settingsStore.glassParams?.blur},
    saturation: ${settingsStore.glassParams?.saturation},
    aberrationIntensity: ${settingsStore.glassParams?.aberrationIntensity},
    elasticity: ${settingsStore.glassParams?.elasticity},
    cornerRadius: ${settingsStore.glassParams?.cornerRadius},
  },
} as const;`;
        await navigator.clipboard.writeText(code);
        toast.success("配置已复制到剪贴板");
    }
    catch {
        toast.error("复制失败");
    }
    finally {
        copyLoading.value = false;
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
/** @ts-ignore @type { | typeof __VLS_components.Sheet | typeof __VLS_components.Sheet} */
Sheet;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.settingsStore.settingsVisible),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.settingsStore.settingsVisible),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ 'update:open': {} },
    { 'onUpdate:open': (...[$event]) => {
            __VLS_ctx.settingsStore.settingsVisible = $event;
            // @ts-ignore
            [settingsStore, settingsStore,];
        } });
var __VLS_7;
const { default: __VLS_8 } = __VLS_3.slots;
let __VLS_9;
/** @ts-ignore @type { | typeof __VLS_components.SheetContent | typeof __VLS_components.SheetContent} */
SheetContent;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent1(__VLS_9, new __VLS_9({
    side: "right",
    ...{ class: "w-[380px] flex flex-col p-0" },
}));
const __VLS_11 = __VLS_10({
    side: "right",
    ...{ class: "w-[380px] flex flex-col p-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
/** @type {__VLS_StyleScopedClasses['w-[380px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['p-0']} */ ;
const { default: __VLS_14 } = __VLS_12.slots;
let __VLS_15;
/** @ts-ignore @type { | typeof __VLS_components.SheetHeader | typeof __VLS_components.SheetHeader} */
SheetHeader;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
    ...{ class: "px-6 pt-6 pb-4 border-b" },
}));
const __VLS_17 = __VLS_16({
    ...{ class: "px-6 pt-6 pb-4 border-b" },
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
const { default: __VLS_20 } = __VLS_18.slots;
let __VLS_21;
/** @ts-ignore @type { | typeof __VLS_components.SheetTitle | typeof __VLS_components.SheetTitle} */
SheetTitle;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({}));
const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_26 } = __VLS_24.slots;
// @ts-ignore
[];
var __VLS_24;
let __VLS_27;
/** @ts-ignore @type { | typeof __VLS_components.SheetDescription | typeof __VLS_components.SheetDescription} */
SheetDescription;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({}));
const __VLS_29 = __VLS_28({}, ...__VLS_functionalComponentArgsRest(__VLS_28));
const { default: __VLS_32 } = __VLS_30.slots;
// @ts-ignore
[];
var __VLS_30;
// @ts-ignore
[];
var __VLS_18;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex-1 overflow-y-auto px-6 py-5 space-y-6" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-5']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "text-sm font-medium mb-3" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-3 gap-2" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
for (const [mode] of __VLS_vFor((__VLS_ctx.themeModes))) {
    let __VLS_33;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
        ...{ 'onClick': {} },
        key: (mode.value),
        variant: (__VLS_ctx.settingsStore.theme === mode.value ? 'default' : 'outline'),
        size: "sm",
        ...{ class: "gap-1.5" },
    }));
    const __VLS_35 = __VLS_34({
        ...{ 'onClick': {} },
        key: (mode.value),
        variant: (__VLS_ctx.settingsStore.theme === mode.value ? 'default' : 'outline'),
        size: "sm",
        ...{ class: "gap-1.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    let __VLS_38;
    const __VLS_39 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.settingsStore.theme = mode.value;
                // @ts-ignore
                [settingsStore, settingsStore, themeModes,];
            } });
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    const { default: __VLS_40 } = __VLS_36.slots;
    const __VLS_41 = (mode.icon);
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
        ...{ class: "size-3.5" },
    }));
    const __VLS_43 = __VLS_42({
        ...{ class: "size-3.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
    (mode.label);
    // @ts-ignore
    [];
    var __VLS_36;
    var __VLS_37;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "text-sm font-medium mb-3" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-wrap gap-2.5" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
for (const [color] of __VLS_vFor((__VLS_ctx.themeColorPresets))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.settingsStore.themeColor = color;
                // @ts-ignore
                [settingsStore, themeColorPresets,];
            } },
        key: (color),
        ...{ class: "w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer" },
        ...{ class: (__VLS_ctx.settingsStore.themeColor === color
                ? 'border-foreground scale-110 ring-2 ring-foreground/20'
                : 'border-transparent') },
        ...{ style: ({ backgroundColor: color }) },
    });
    /** @type {__VLS_StyleScopedClasses['w-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:scale-110']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    // @ts-ignore
    [settingsStore,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.colorInputRef?.click();
            // @ts-ignore
            [colorInputRef,];
        } },
    ...{ class: "w-7 h-7 rounded-full border-2 border-dashed border-muted-foreground/40 flex items-center justify-center hover:border-primary/50 transition-colors cursor-pointer" },
    ...{ class: ({
            'border-primary ring-2 ring-primary/20': !__VLS_ctx.themeColorPresets.includes(__VLS_ctx.settingsStore.themeColor),
        }) },
});
/** @type {__VLS_StyleScopedClasses['w-7']} */ ;
/** @type {__VLS_StyleScopedClasses['h-7']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-dashed']} */ ;
/** @type {__VLS_StyleScopedClasses['border-muted-foreground/40']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-primary/50']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['ring-primary/20']} */ ;
let __VLS_46;
/** @ts-ignore @type { | typeof __VLS_components.PipetteIcon} */
PipetteIcon;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
    ...{ class: "size-3 text-muted-foreground" },
}));
const __VLS_48 = __VLS_47({
    ...{ class: "size-3 text-muted-foreground" },
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
/** @type {__VLS_StyleScopedClasses['size-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.settingsStore.themeColor = $event.target.value;
            // @ts-ignore
            [settingsStore, settingsStore, themeColorPresets,];
        } },
    ref: "colorInputRef",
    type: "color",
    value: (__VLS_ctx.settingsStore.themeColor),
    ...{ class: "absolute opacity-0 w-0 h-0" },
});
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "text-sm font-medium mb-3" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-3" },
});
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
let __VLS_51;
/** @ts-ignore @type { | typeof __VLS_components.Switch} */
Switch;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.settingsStore.showTagsView),
}));
const __VLS_53 = __VLS_52({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.settingsStore.showTagsView),
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
let __VLS_56;
const __VLS_57 = ({ 'update:checked': {} },
    { 'onUpdate:checked': (...[$event]) => {
            __VLS_ctx.settingsStore.showTagsView = $event;
            // @ts-ignore
            [settingsStore, settingsStore, settingsStore,];
        } });
var __VLS_54;
var __VLS_55;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
let __VLS_58;
/** @ts-ignore @type { | typeof __VLS_components.Switch} */
Switch;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.settingsStore.showAppLogo),
}));
const __VLS_60 = __VLS_59({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.settingsStore.showAppLogo),
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
let __VLS_63;
const __VLS_64 = ({ 'update:checked': {} },
    { 'onUpdate:checked': (...[$event]) => {
            __VLS_ctx.settingsStore.showAppLogo = $event;
            // @ts-ignore
            [settingsStore, settingsStore,];
        } });
var __VLS_61;
var __VLS_62;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
let __VLS_65;
/** @ts-ignore @type { | typeof __VLS_components.Switch} */
Switch;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.settingsStore.showWatermark),
}));
const __VLS_67 = __VLS_66({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.settingsStore.showWatermark),
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
let __VLS_70;
const __VLS_71 = ({ 'update:checked': {} },
    { 'onUpdate:checked': (...[$event]) => {
            __VLS_ctx.settingsStore.showWatermark = $event;
            // @ts-ignore
            [settingsStore, settingsStore,];
        } });
var __VLS_68;
var __VLS_69;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
let __VLS_72;
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.settingsStore.pageSwitchingAnimation),
}));
const __VLS_74 = __VLS_73({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.settingsStore.pageSwitchingAnimation),
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_77;
const __VLS_78 = ({ 'update:modelValue': {} },
    { 'onUpdate:modelValue': (...[$event]) => {
            __VLS_ctx.settingsStore.pageSwitchingAnimation = $event;
            // @ts-ignore
            [settingsStore, settingsStore,];
        } });
const { default: __VLS_79 } = __VLS_75.slots;
let __VLS_80;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent1(__VLS_80, new __VLS_80({
    ...{ class: "w-32 h-7 text-xs" },
}));
const __VLS_82 = __VLS_81({
    ...{ class: "w-32 h-7 text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
/** @type {__VLS_StyleScopedClasses['w-32']} */ ;
/** @type {__VLS_StyleScopedClasses['h-7']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_85 } = __VLS_83.slots;
let __VLS_86;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({}));
const __VLS_88 = __VLS_87({}, ...__VLS_functionalComponentArgsRest(__VLS_87));
// @ts-ignore
[];
var __VLS_83;
let __VLS_91;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_92 = __VLS_asFunctionalComponent1(__VLS_91, new __VLS_91({}));
const __VLS_93 = __VLS_92({}, ...__VLS_functionalComponentArgsRest(__VLS_92));
const { default: __VLS_96 } = __VLS_94.slots;
for (const [opt] of __VLS_vFor((__VLS_ctx.animationOptions))) {
    let __VLS_97;
    /** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
    SelectItem;
    // @ts-ignore
    const __VLS_98 = __VLS_asFunctionalComponent1(__VLS_97, new __VLS_97({
        key: (opt.value),
        value: (opt.value),
    }));
    const __VLS_99 = __VLS_98({
        key: (opt.value),
        value: (opt.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_98));
    const { default: __VLS_102 } = __VLS_100.slots;
    (opt.label);
    // @ts-ignore
    [animationOptions,];
    var __VLS_100;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_94;
// @ts-ignore
[];
var __VLS_75;
var __VLS_76;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
let __VLS_103;
/** @ts-ignore @type { | typeof __VLS_components.Switch} */
Switch;
// @ts-ignore
const __VLS_104 = __VLS_asFunctionalComponent1(__VLS_103, new __VLS_103({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.settingsStore.grayMode),
}));
const __VLS_105 = __VLS_104({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.settingsStore.grayMode),
}, ...__VLS_functionalComponentArgsRest(__VLS_104));
let __VLS_108;
const __VLS_109 = ({ 'update:checked': {} },
    { 'onUpdate:checked': (...[$event]) => {
            __VLS_ctx.settingsStore.grayMode = $event;
            // @ts-ignore
            [settingsStore, settingsStore,];
        } });
var __VLS_106;
var __VLS_107;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
let __VLS_110;
/** @ts-ignore @type { | typeof __VLS_components.Switch} */
Switch;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.settingsStore.colorWeak),
}));
const __VLS_112 = __VLS_111({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.settingsStore.colorWeak),
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
let __VLS_115;
const __VLS_116 = ({ 'update:checked': {} },
    { 'onUpdate:checked': (...[$event]) => {
            __VLS_ctx.settingsStore.colorWeak = $event;
            // @ts-ignore
            [settingsStore, settingsStore,];
        } });
var __VLS_113;
var __VLS_114;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
let __VLS_117;
/** @ts-ignore @type { | typeof __VLS_components.Switch} */
Switch;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.settingsStore.glassEffect),
}));
const __VLS_119 = __VLS_118({
    ...{ 'onUpdate:checked': {} },
    checked: (__VLS_ctx.settingsStore.glassEffect),
}, ...__VLS_functionalComponentArgsRest(__VLS_118));
let __VLS_122;
const __VLS_123 = ({ 'update:checked': {} },
    { 'onUpdate:checked': (...[$event]) => {
            __VLS_ctx.settingsStore.glassEffect = $event;
            // @ts-ignore
            [settingsStore, settingsStore,];
        } });
var __VLS_120;
var __VLS_121;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-3 pl-2 border-l-2 border-primary/20 pt-1" },
    ...{ class: ({ 'opacity-40 pointer-events-none': !__VLS_ctx.settingsStore.glassEffect }) },
});
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-l-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary/20']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-40']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.glassSliders))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (item.key),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between mb-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (item.label);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs font-mono" },
        ...{ style: ({ color: item.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    (__VLS_ctx.settingsStore.glassParams?.[item.key]);
    (item.suffix);
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onInput: (...[$event]) => {
                __VLS_ctx.settingsStore.setGlassParam(item.key, +$event.target.value);
                // @ts-ignore
                [settingsStore, settingsStore, settingsStore, glassSliders,];
            } },
        type: "range",
        min: (item.min),
        max: (item.max),
        step: (item.step),
        value: (__VLS_ctx.settingsStore.glassParams?.[item.key]),
        ...{ class: "glass-slider w-full" },
    });
    /** @type {__VLS_StyleScopedClasses['glass-slider']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    // @ts-ignore
    [settingsStore,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "text-sm font-medium mb-3" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-3 gap-3" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.layoutOptions))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.settingsStore.layout = item.value;
                // @ts-ignore
                [settingsStore, layoutOptions,];
            } },
        key: (item.value),
        ...{ class: "relative w-full aspect-[3/4] rounded-lg border-2 overflow-hidden cursor-pointer transition-all hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-md" },
        ...{ class: (__VLS_ctx.settingsStore.layout === item.value
                ? 'border-primary shadow-sm ring-1 ring-primary/20'
                : 'border-border') },
    });
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['aspect-[3/4]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:border-primary/40']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:-translate-y-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:shadow-md']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full h-full p-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-1.5']} */ ;
    if (item.value !== "left" /* __VLS_ctx.LayoutMode.LEFT */) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "rounded-[2px] mb-1" },
            ...{ class: (__VLS_ctx.settingsStore.layout === item.value ? 'bg-primary/60' : 'bg-muted-foreground/20') },
            ...{ style: ({ height: item.value === "top" /* __VLS_ctx.LayoutMode.TOP */ ? '12px' : '10px' }) },
        });
        /** @type {__VLS_StyleScopedClasses['rounded-[2px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
    }
    if (item.value !== "top" /* __VLS_ctx.LayoutMode.TOP */) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "rounded-[2px] float-left mr-1" },
            ...{ class: (__VLS_ctx.settingsStore.layout === item.value ? 'bg-primary/40' : 'bg-muted-foreground/15') },
            ...{ style: ({
                    width: '14px',
                    height: item.value === "mix" /* __VLS_ctx.LayoutMode.MIX */ ? 'calc(100% - 14px)' : '100%',
                }) },
        });
        /** @type {__VLS_StyleScopedClasses['rounded-[2px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['float-left']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "rounded-[2px]" },
        ...{ class: (__VLS_ctx.settingsStore.layout === item.value
                ? 'bg-primary/10 border border-primary/20'
                : 'bg-muted/50') },
        ...{ style: ({ height: item.value === "top" /* __VLS_ctx.LayoutMode.TOP */ ? 'calc(100% - 16px)' : '100%' }) },
    });
    /** @type {__VLS_StyleScopedClasses['rounded-[2px]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "absolute bottom-1 left-0 right-0 text-center text-[10px] font-medium" },
        ...{ class: (__VLS_ctx.settingsStore.layout === item.value ? 'text-primary' : 'text-muted-foreground') },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['bottom-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['left-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['right-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    (item.label);
    if (__VLS_ctx.settingsStore.layout === item.value) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "absolute top-1 right-1 size-4 rounded-full bg-primary flex items-center justify-center" },
        });
        /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
        /** @type {__VLS_StyleScopedClasses['top-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['right-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        let __VLS_124;
        /** @ts-ignore @type { | typeof __VLS_components.CheckIcon} */
        CheckIcon;
        // @ts-ignore
        const __VLS_125 = __VLS_asFunctionalComponent1(__VLS_124, new __VLS_124({
            ...{ class: "size-2.5 text-primary-foreground" },
        }));
        const __VLS_126 = __VLS_125({
            ...{ class: "size-2.5 text-primary-foreground" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_125));
        /** @type {__VLS_StyleScopedClasses['size-2.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary-foreground']} */ ;
    }
    // @ts-ignore
    [settingsStore, settingsStore, settingsStore, settingsStore, settingsStore, settingsStore, LayoutMode, LayoutMode, LayoutMode, LayoutMode, LayoutMode,];
}
if (__VLS_ctx.settingsStore.resolvedTheme !== "dark" /* __VLS_ctx.ThemeMode.DARK */) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-sm font-medium mb-3" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-2 gap-2" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    let __VLS_129;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_130 = __VLS_asFunctionalComponent1(__VLS_129, new __VLS_129({
        ...{ 'onClick': {} },
        variant: (__VLS_ctx.settingsStore.sidebarColorScheme === "minimal-white" /* __VLS_ctx.SidebarColor.MINIMAL_WHITE */
            ? 'default'
            : 'outline'),
        size: "sm",
    }));
    const __VLS_131 = __VLS_130({
        ...{ 'onClick': {} },
        variant: (__VLS_ctx.settingsStore.sidebarColorScheme === "minimal-white" /* __VLS_ctx.SidebarColor.MINIMAL_WHITE */
            ? 'default'
            : 'outline'),
        size: "sm",
    }, ...__VLS_functionalComponentArgsRest(__VLS_130));
    let __VLS_134;
    const __VLS_135 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.settingsStore.resolvedTheme !== "dark" /* __VLS_ctx.ThemeMode.DARK */))
                    return;
                __VLS_ctx.settingsStore.sidebarColorScheme = "minimal-white" /* __VLS_ctx.SidebarColor.MINIMAL_WHITE */;
                // @ts-ignore
                [settingsStore, settingsStore, settingsStore, ThemeMode, SidebarColor, SidebarColor,];
            } });
    const { default: __VLS_136 } = __VLS_132.slots;
    // @ts-ignore
    [];
    var __VLS_132;
    var __VLS_133;
    let __VLS_137;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_138 = __VLS_asFunctionalComponent1(__VLS_137, new __VLS_137({
        ...{ 'onClick': {} },
        variant: (__VLS_ctx.settingsStore.sidebarColorScheme === "classic-blue" /* __VLS_ctx.SidebarColor.CLASSIC_BLUE */
            ? 'default'
            : 'outline'),
        size: "sm",
    }));
    const __VLS_139 = __VLS_138({
        ...{ 'onClick': {} },
        variant: (__VLS_ctx.settingsStore.sidebarColorScheme === "classic-blue" /* __VLS_ctx.SidebarColor.CLASSIC_BLUE */
            ? 'default'
            : 'outline'),
        size: "sm",
    }, ...__VLS_functionalComponentArgsRest(__VLS_138));
    let __VLS_142;
    const __VLS_143 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.settingsStore.resolvedTheme !== "dark" /* __VLS_ctx.ThemeMode.DARK */))
                    return;
                __VLS_ctx.settingsStore.sidebarColorScheme = "classic-blue" /* __VLS_ctx.SidebarColor.CLASSIC_BLUE */;
                // @ts-ignore
                [settingsStore, settingsStore, SidebarColor, SidebarColor,];
            } });
    const { default: __VLS_144 } = __VLS_140.slots;
    // @ts-ignore
    [];
    var __VLS_140;
    var __VLS_141;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "px-6 py-4 border-t flex gap-3" },
});
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
let __VLS_145;
/** @ts-ignore @type { | typeof __VLS_components.Tooltip | typeof __VLS_components.Tooltip} */
Tooltip;
// @ts-ignore
const __VLS_146 = __VLS_asFunctionalComponent1(__VLS_145, new __VLS_145({}));
const __VLS_147 = __VLS_146({}, ...__VLS_functionalComponentArgsRest(__VLS_146));
const { default: __VLS_150 } = __VLS_148.slots;
let __VLS_151;
/** @ts-ignore @type { | typeof __VLS_components.TooltipTrigger | typeof __VLS_components.TooltipTrigger} */
TooltipTrigger;
// @ts-ignore
const __VLS_152 = __VLS_asFunctionalComponent1(__VLS_151, new __VLS_151({
    asChild: true,
}));
const __VLS_153 = __VLS_152({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_152));
const { default: __VLS_156 } = __VLS_154.slots;
let __VLS_157;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_158 = __VLS_asFunctionalComponent1(__VLS_157, new __VLS_157({
    ...{ 'onClick': {} },
    variant: "default",
    size: "sm",
    ...{ class: "flex-1 gap-1.5" },
    disabled: (__VLS_ctx.copyLoading),
}));
const __VLS_159 = __VLS_158({
    ...{ 'onClick': {} },
    variant: "default",
    size: "sm",
    ...{ class: "flex-1 gap-1.5" },
    disabled: (__VLS_ctx.copyLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_158));
let __VLS_162;
const __VLS_163 = ({ click: {} },
    { onClick: (__VLS_ctx.handleCopySettings) });
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
const { default: __VLS_164 } = __VLS_160.slots;
let __VLS_165;
/** @ts-ignore @type { | typeof __VLS_components.CopyIcon} */
CopyIcon;
// @ts-ignore
const __VLS_166 = __VLS_asFunctionalComponent1(__VLS_165, new __VLS_165({
    ...{ class: "size-3.5" },
}));
const __VLS_167 = __VLS_166({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_166));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
(__VLS_ctx.copyLoading ? "复制中..." : "复制配置");
// @ts-ignore
[copyLoading, copyLoading, handleCopySettings,];
var __VLS_160;
var __VLS_161;
// @ts-ignore
[];
var __VLS_154;
let __VLS_170;
/** @ts-ignore @type { | typeof __VLS_components.TooltipContent | typeof __VLS_components.TooltipContent} */
TooltipContent;
// @ts-ignore
const __VLS_171 = __VLS_asFunctionalComponent1(__VLS_170, new __VLS_170({
    side: "top",
    ...{ class: "max-w-[260px] text-xs" },
}));
const __VLS_172 = __VLS_171({
    side: "top",
    ...{ class: "max-w-[260px] text-xs" },
}, ...__VLS_functionalComponentArgsRest(__VLS_171));
/** @type {__VLS_StyleScopedClasses['max-w-[260px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_175 } = __VLS_173.slots;
// @ts-ignore
[];
var __VLS_173;
// @ts-ignore
[];
var __VLS_148;
let __VLS_176;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_177 = __VLS_asFunctionalComponent1(__VLS_176, new __VLS_176({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
    ...{ class: "flex-1 gap-1.5" },
}));
const __VLS_178 = __VLS_177({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
    ...{ class: "flex-1 gap-1.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_177));
let __VLS_181;
const __VLS_182 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.settingsStore.resetSettings();
            // @ts-ignore
            [settingsStore,];
        } });
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
const { default: __VLS_183 } = __VLS_179.slots;
let __VLS_184;
/** @ts-ignore @type { | typeof __VLS_components.RotateCcwIcon} */
RotateCcwIcon;
// @ts-ignore
const __VLS_185 = __VLS_asFunctionalComponent1(__VLS_184, new __VLS_184({
    ...{ class: "size-3.5" },
}));
const __VLS_186 = __VLS_185({
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_185));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
// @ts-ignore
[];
var __VLS_179;
var __VLS_180;
// @ts-ignore
[];
var __VLS_12;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=LayoutSettings.vue.js.map