import { ref, reactive, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { ChevronRightIcon, SettingsIcon, LayoutGridIcon, EyeIcon, CopyIcon, DownloadIcon, Loader2Icon, } from "@lucide/vue";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { getGenConfig, saveGenConfig, getPreviewData, downloadZip, getMenuOptions, } from "@/api/codegen";
import { formTypeOptions, queryTypeOptions } from "@/enums/codegen";
const props = defineProps();
const emit = defineEmits();
const { t } = useI18n();
const currentStep = ref(0);
const generating = ref(false);
const steps = [
    { label: t("codegen.stepBasic"), icon: SettingsIcon },
    { label: t("codegen.stepField"), icon: LayoutGridIcon },
    { label: t("codegen.stepPreview"), icon: EyeIcon },
];
// ==================== 基础配置 ====================
const config = reactive({});
const menuOptions = ref([]);
async function loadConfig(tableName) {
    const data = await getGenConfig(tableName);
    Object.assign(config, data);
    menuOptions.value = await getMenuOptions();
}
// ==================== 字段配置 ====================
const fields = computed(() => config.fieldConfigs ?? []);
const queryCount = computed(() => fields.value.filter((f) => f.isShowInQuery === 1).length);
const listCount = computed(() => fields.value.filter((f) => f.isShowInList === 1).length);
const formCount = computed(() => fields.value.filter((f) => f.isShowInForm === 1).length);
function batchSet(target, value) {
    const fieldKey = target === "query" ? "isShowInQuery" : target === "list" ? "isShowInList" : "isShowInForm";
    config.fieldConfigs?.forEach((f) => {
        f[fieldKey] = value;
    });
}
// ==================== 预览 ====================
const previewFiles = ref([]);
const selectedFile = ref(null);
const previewScope = ref("all");
const scopeOptions = computed(() => [
    { value: "all", label: t("codegen.scopeAll") },
    { value: "frontend", label: t("codegen.scopeFrontend") },
    { value: "backend", label: t("codegen.scopeBackend") },
]);
const filteredPreviewFiles = computed(() => {
    if (previewScope.value === "all")
        return previewFiles.value;
    return previewFiles.value.filter((f) => f.scope === previewScope.value);
});
async function loadPreview(tableName) {
    previewFiles.value = await getPreviewData(tableName, config.pageType);
    selectedFile.value = previewFiles.value[0] ?? null;
}
function handleCopyCode() {
    if (!selectedFile.value)
        return;
    navigator.clipboard.writeText(selectedFile.value.content).then(() => {
        toast.success(t("codegen.copySuccess"));
    });
}
async function handleDownloadZip() {
    try {
        await downloadZip(props.tableName, config.pageType);
        toast.success(t("codegen.downloadSuccess"));
    }
    catch {
        toast.error(t("codegen.downloadFailed"));
    }
}
// ==================== 步骤切换 ====================
async function handleNext() {
    if (currentStep.value === 0) {
        // 验证基础配置
        if (!config.businessName) {
            toast.error(t("codegen.businessNameRequired"));
            return;
        }
        if (!config.entityName) {
            toast.error(t("codegen.entityNameRequired"));
            return;
        }
        currentStep.value = 1;
    }
    else if (currentStep.value === 1) {
        // 保存配置 → 生成预览
        generating.value = true;
        try {
            await saveGenConfig(props.tableName, { ...config });
            await loadPreview(props.tableName);
            currentStep.value = 2;
        }
        finally {
            generating.value = false;
        }
    }
}
// ==================== 监听 ====================
watch(() => props.visible, (v) => {
    if (v && props.tableName) {
        currentStep.value = 0;
        generating.value = false;
        previewFiles.value = [];
        selectedFile.value = null;
        loadConfig(props.tableName);
    }
});
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
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Sheet | typeof __VLS_components.Sheet} */
Sheet;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.visible),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ 'update:open': {} },
    { 'onUpdate:open': ((v) => __VLS_ctx.emit('update:visible', v)) });
var __VLS_7;
const { default: __VLS_8 } = __VLS_3.slots;
let __VLS_9;
/** @ts-ignore @type { | typeof __VLS_components.SheetContent | typeof __VLS_components.SheetContent} */
SheetContent;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent1(__VLS_9, new __VLS_9({
    ...{ class: "sm:max-w-5xl overflow-auto" },
}));
const __VLS_11 = __VLS_10({
    ...{ class: "sm:max-w-5xl overflow-auto" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
/** @type {__VLS_StyleScopedClasses['sm:max-w-5xl']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
const { default: __VLS_14 } = __VLS_12.slots;
let __VLS_15;
/** @ts-ignore @type { | typeof __VLS_components.SheetHeader | typeof __VLS_components.SheetHeader} */
SheetHeader;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({}));
const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const { default: __VLS_20 } = __VLS_18.slots;
let __VLS_21;
/** @ts-ignore @type { | typeof __VLS_components.SheetTitle | typeof __VLS_components.SheetTitle} */
SheetTitle;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({}));
const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_26 } = __VLS_24.slots;
(__VLS_ctx.title);
// @ts-ignore
[visible, emit, title,];
var __VLS_24;
// @ts-ignore
[];
var __VLS_18;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2 py-4" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
for (const [step, idx] of __VLS_vFor((__VLS_ctx.steps))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.template)({
        key: (idx),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                idx < __VLS_ctx.currentStep && (__VLS_ctx.currentStep = idx);
                // @ts-ignore
                [steps, currentStep, currentStep,];
            } },
        ...{ class: "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors" },
        ...{ class: (__VLS_ctx.currentStep === idx
                ? 'bg-primary text-primary-foreground font-medium'
                : idx < __VLS_ctx.currentStep
                    ? 'bg-primary/10 text-primary cursor-pointer'
                    : 'bg-muted text-muted-foreground') },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    const __VLS_27 = (step.icon);
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
        ...{ class: "size-4" },
    }));
    const __VLS_29 = __VLS_28({
        ...{ class: "size-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
    (step.label);
    if (idx < __VLS_ctx.steps.length - 1) {
        let __VLS_32;
        /** @ts-ignore @type { | typeof __VLS_components.ChevronRightIcon} */
        ChevronRightIcon;
        // @ts-ignore
        const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
            ...{ class: "size-4 text-muted-foreground" },
        }));
        const __VLS_34 = __VLS_33({
            ...{ class: "size-4 text-muted-foreground" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_33));
        /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    }
    // @ts-ignore
    [steps, currentStep, currentStep,];
}
if (__VLS_ctx.generating) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col items-center justify-center py-20 gap-3" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-20']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    let __VLS_37;
    /** @ts-ignore @type { | typeof __VLS_components.Loader2Icon} */
    Loader2Icon;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
        ...{ class: "size-8 animate-spin text-primary" },
    }));
    const __VLS_39 = __VLS_38({
        ...{ class: "size-8 animate-spin text-primary" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    /** @type {__VLS_StyleScopedClasses['size-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("codegen.generating"));
}
else if (__VLS_ctx.currentStep === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-4" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
    let __VLS_42;
    /** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
    Card;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({}));
    const __VLS_44 = __VLS_43({}, ...__VLS_functionalComponentArgsRest(__VLS_43));
    const { default: __VLS_47 } = __VLS_45.slots;
    let __VLS_48;
    /** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
    CardContent;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
        ...{ class: "pt-5 space-y-3" },
    }));
    const __VLS_50 = __VLS_49({
        ...{ class: "pt-5 space-y-3" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    /** @type {__VLS_StyleScopedClasses['pt-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
    const { default: __VLS_53 } = __VLS_51.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-sm font-semibold text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("codegen.tableInfo"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-2 gap-3" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
    let __VLS_54;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({}));
    const __VLS_56 = __VLS_55({}, ...__VLS_functionalComponentArgsRest(__VLS_55));
    const { default: __VLS_59 } = __VLS_57.slots;
    (__VLS_ctx.t("codegen.tableNameLabel"));
    // @ts-ignore
    [currentStep, generating, t, t, t,];
    var __VLS_57;
    let __VLS_60;
    /** @ts-ignore @type { | typeof __VLS_components.Input} */
    Input;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
        modelValue: (__VLS_ctx.config.tableName),
        disabled: true,
        ...{ class: "bg-muted" },
    }));
    const __VLS_62 = __VLS_61({
        modelValue: (__VLS_ctx.config.tableName),
        disabled: true,
        ...{ class: "bg-muted" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    /** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
    let __VLS_65;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({}));
    const __VLS_67 = __VLS_66({}, ...__VLS_functionalComponentArgsRest(__VLS_66));
    const { default: __VLS_70 } = __VLS_68.slots;
    (__VLS_ctx.t("codegen.businessName"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-destructive" },
    });
    /** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
    // @ts-ignore
    [t, config,];
    var __VLS_68;
    let __VLS_71;
    /** @ts-ignore @type { | typeof __VLS_components.Input} */
    Input;
    // @ts-ignore
    const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({
        modelValue: (__VLS_ctx.config.businessName),
        placeholder: (__VLS_ctx.t('codegen.businessNamePlaceholder')),
    }));
    const __VLS_73 = __VLS_72({
        modelValue: (__VLS_ctx.config.businessName),
        placeholder: (__VLS_ctx.t('codegen.businessNamePlaceholder')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_72));
    // @ts-ignore
    [t, config,];
    var __VLS_51;
    // @ts-ignore
    [];
    var __VLS_45;
    let __VLS_76;
    /** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
    Card;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({}));
    const __VLS_78 = __VLS_77({}, ...__VLS_functionalComponentArgsRest(__VLS_77));
    const { default: __VLS_81 } = __VLS_79.slots;
    let __VLS_82;
    /** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
    CardContent;
    // @ts-ignore
    const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({
        ...{ class: "pt-5 space-y-3" },
    }));
    const __VLS_84 = __VLS_83({
        ...{ class: "pt-5 space-y-3" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_83));
    /** @type {__VLS_StyleScopedClasses['pt-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
    const { default: __VLS_87 } = __VLS_85.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-sm font-semibold text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("codegen.packageInfo"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-2 gap-3" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
    let __VLS_88;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_89 = __VLS_asFunctionalComponent1(__VLS_88, new __VLS_88({}));
    const __VLS_90 = __VLS_89({}, ...__VLS_functionalComponentArgsRest(__VLS_89));
    const { default: __VLS_93 } = __VLS_91.slots;
    (__VLS_ctx.t("codegen.packageName"));
    // @ts-ignore
    [t, t,];
    var __VLS_91;
    let __VLS_94;
    /** @ts-ignore @type { | typeof __VLS_components.Input} */
    Input;
    // @ts-ignore
    const __VLS_95 = __VLS_asFunctionalComponent1(__VLS_94, new __VLS_94({
        modelValue: (__VLS_ctx.config.packageName),
        placeholder: (__VLS_ctx.t('codegen.packageNamePlaceholder')),
    }));
    const __VLS_96 = __VLS_95({
        modelValue: (__VLS_ctx.config.packageName),
        placeholder: (__VLS_ctx.t('codegen.packageNamePlaceholder')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_95));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
    let __VLS_99;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({}));
    const __VLS_101 = __VLS_100({}, ...__VLS_functionalComponentArgsRest(__VLS_100));
    const { default: __VLS_104 } = __VLS_102.slots;
    (__VLS_ctx.t("codegen.moduleName"));
    // @ts-ignore
    [t, t, config,];
    var __VLS_102;
    let __VLS_105;
    /** @ts-ignore @type { | typeof __VLS_components.Input} */
    Input;
    // @ts-ignore
    const __VLS_106 = __VLS_asFunctionalComponent1(__VLS_105, new __VLS_105({
        modelValue: (__VLS_ctx.config.moduleName),
        placeholder: (__VLS_ctx.t('codegen.moduleNamePlaceholder')),
    }));
    const __VLS_107 = __VLS_106({
        modelValue: (__VLS_ctx.config.moduleName),
        placeholder: (__VLS_ctx.t('codegen.moduleNamePlaceholder')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_106));
    // @ts-ignore
    [t, config,];
    var __VLS_85;
    // @ts-ignore
    [];
    var __VLS_79;
    let __VLS_110;
    /** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
    Card;
    // @ts-ignore
    const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({}));
    const __VLS_112 = __VLS_111({}, ...__VLS_functionalComponentArgsRest(__VLS_111));
    const { default: __VLS_115 } = __VLS_113.slots;
    let __VLS_116;
    /** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
    CardContent;
    // @ts-ignore
    const __VLS_117 = __VLS_asFunctionalComponent1(__VLS_116, new __VLS_116({
        ...{ class: "pt-5 space-y-3" },
    }));
    const __VLS_118 = __VLS_117({
        ...{ class: "pt-5 space-y-3" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_117));
    /** @type {__VLS_StyleScopedClasses['pt-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
    const { default: __VLS_121 } = __VLS_119.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-sm font-semibold text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("codegen.genConfig"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-2 gap-3" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
    let __VLS_122;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_123 = __VLS_asFunctionalComponent1(__VLS_122, new __VLS_122({}));
    const __VLS_124 = __VLS_123({}, ...__VLS_functionalComponentArgsRest(__VLS_123));
    const { default: __VLS_127 } = __VLS_125.slots;
    (__VLS_ctx.t("codegen.entityName"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-destructive" },
    });
    /** @type {__VLS_StyleScopedClasses['text-destructive']} */ ;
    // @ts-ignore
    [t, t,];
    var __VLS_125;
    let __VLS_128;
    /** @ts-ignore @type { | typeof __VLS_components.Input} */
    Input;
    // @ts-ignore
    const __VLS_129 = __VLS_asFunctionalComponent1(__VLS_128, new __VLS_128({
        modelValue: (__VLS_ctx.config.entityName),
        placeholder: (__VLS_ctx.t('codegen.entityNamePlaceholder')),
    }));
    const __VLS_130 = __VLS_129({
        modelValue: (__VLS_ctx.config.entityName),
        placeholder: (__VLS_ctx.t('codegen.entityNamePlaceholder')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_129));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
    let __VLS_133;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_134 = __VLS_asFunctionalComponent1(__VLS_133, new __VLS_133({}));
    const __VLS_135 = __VLS_134({}, ...__VLS_functionalComponentArgsRest(__VLS_134));
    const { default: __VLS_138 } = __VLS_136.slots;
    (__VLS_ctx.t("codegen.author"));
    // @ts-ignore
    [t, t, config,];
    var __VLS_136;
    let __VLS_139;
    /** @ts-ignore @type { | typeof __VLS_components.Input} */
    Input;
    // @ts-ignore
    const __VLS_140 = __VLS_asFunctionalComponent1(__VLS_139, new __VLS_139({
        modelValue: (__VLS_ctx.config.author),
        placeholder: (__VLS_ctx.t('codegen.authorPlaceholder')),
    }));
    const __VLS_141 = __VLS_140({
        modelValue: (__VLS_ctx.config.author),
        placeholder: (__VLS_ctx.t('codegen.authorPlaceholder')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_140));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
    let __VLS_144;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_145 = __VLS_asFunctionalComponent1(__VLS_144, new __VLS_144({}));
    const __VLS_146 = __VLS_145({}, ...__VLS_functionalComponentArgsRest(__VLS_145));
    const { default: __VLS_149 } = __VLS_147.slots;
    (__VLS_ctx.t("codegen.removePrefix"));
    // @ts-ignore
    [t, t, config,];
    var __VLS_147;
    let __VLS_150;
    /** @ts-ignore @type { | typeof __VLS_components.Input} */
    Input;
    // @ts-ignore
    const __VLS_151 = __VLS_asFunctionalComponent1(__VLS_150, new __VLS_150({
        modelValue: (__VLS_ctx.config.removeTablePrefix),
        placeholder: (__VLS_ctx.t('codegen.removePrefixPlaceholder')),
    }));
    const __VLS_152 = __VLS_151({
        modelValue: (__VLS_ctx.config.removeTablePrefix),
        placeholder: (__VLS_ctx.t('codegen.removePrefixPlaceholder')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_151));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
    let __VLS_155;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_156 = __VLS_asFunctionalComponent1(__VLS_155, new __VLS_155({}));
    const __VLS_157 = __VLS_156({}, ...__VLS_functionalComponentArgsRest(__VLS_156));
    const { default: __VLS_160 } = __VLS_158.slots;
    (__VLS_ctx.t("codegen.pageType"));
    // @ts-ignore
    [t, t, config,];
    var __VLS_158;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-3 pt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['pt-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "flex items-center gap-1.5 cursor-pointer text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        type: "radio",
        value: "classic",
        ...{ class: "accent-primary" },
    });
    (__VLS_ctx.config.pageType);
    /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
    (__VLS_ctx.t("codegen.pageTypeClassic"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "flex items-center gap-1.5 cursor-pointer text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        type: "radio",
        value: "curd",
        ...{ class: "accent-primary" },
    });
    (__VLS_ctx.config.pageType);
    /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
    (__VLS_ctx.t("codegen.pageTypeCurd"));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
    let __VLS_161;
    /** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
    Label;
    // @ts-ignore
    const __VLS_162 = __VLS_asFunctionalComponent1(__VLS_161, new __VLS_161({}));
    const __VLS_163 = __VLS_162({}, ...__VLS_functionalComponentArgsRest(__VLS_162));
    const { default: __VLS_166 } = __VLS_164.slots;
    (__VLS_ctx.t("codegen.parentMenu"));
    // @ts-ignore
    [t, t, t, config, config,];
    var __VLS_164;
    let __VLS_167;
    /** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
    Select;
    // @ts-ignore
    const __VLS_168 = __VLS_asFunctionalComponent1(__VLS_167, new __VLS_167({
        modelValue: (__VLS_ctx.config.parentMenuId),
    }));
    const __VLS_169 = __VLS_168({
        modelValue: (__VLS_ctx.config.parentMenuId),
    }, ...__VLS_functionalComponentArgsRest(__VLS_168));
    const { default: __VLS_172 } = __VLS_170.slots;
    let __VLS_173;
    /** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
    SelectTrigger;
    // @ts-ignore
    const __VLS_174 = __VLS_asFunctionalComponent1(__VLS_173, new __VLS_173({}));
    const __VLS_175 = __VLS_174({}, ...__VLS_functionalComponentArgsRest(__VLS_174));
    const { default: __VLS_178 } = __VLS_176.slots;
    let __VLS_179;
    /** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
    SelectValue;
    // @ts-ignore
    const __VLS_180 = __VLS_asFunctionalComponent1(__VLS_179, new __VLS_179({
        placeholder: (__VLS_ctx.t('codegen.parentMenuPlaceholder')),
    }));
    const __VLS_181 = __VLS_180({
        placeholder: (__VLS_ctx.t('codegen.parentMenuPlaceholder')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_180));
    // @ts-ignore
    [t, config,];
    var __VLS_176;
    let __VLS_184;
    /** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
    SelectContent;
    // @ts-ignore
    const __VLS_185 = __VLS_asFunctionalComponent1(__VLS_184, new __VLS_184({}));
    const __VLS_186 = __VLS_185({}, ...__VLS_functionalComponentArgsRest(__VLS_185));
    const { default: __VLS_189 } = __VLS_187.slots;
    for (const [opt] of __VLS_vFor((__VLS_ctx.menuOptions))) {
        let __VLS_190;
        /** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
        SelectItem;
        // @ts-ignore
        const __VLS_191 = __VLS_asFunctionalComponent1(__VLS_190, new __VLS_190({
            key: (String(opt.value)),
            value: (String(opt.value)),
        }));
        const __VLS_192 = __VLS_191({
            key: (String(opt.value)),
            value: (String(opt.value)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_191));
        const { default: __VLS_195 } = __VLS_193.slots;
        (opt.label);
        // @ts-ignore
        [menuOptions,];
        var __VLS_193;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_187;
    // @ts-ignore
    [];
    var __VLS_170;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-xs text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("codegen.parentMenuTip"));
    // @ts-ignore
    [t,];
    var __VLS_119;
    // @ts-ignore
    [];
    var __VLS_113;
}
else if (__VLS_ctx.currentStep === 1) {
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
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-3 text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    let __VLS_196;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_197 = __VLS_asFunctionalComponent1(__VLS_196, new __VLS_196({
        variant: "outline",
    }));
    const __VLS_198 = __VLS_197({
        variant: "outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_197));
    const { default: __VLS_201 } = __VLS_199.slots;
    (__VLS_ctx.t("codegen.fieldTotal"));
    (__VLS_ctx.fields.length);
    // @ts-ignore
    [currentStep, t, fields,];
    var __VLS_199;
    let __VLS_202;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_203 = __VLS_asFunctionalComponent1(__VLS_202, new __VLS_202({
        variant: "outline",
        ...{ class: "text-green-600" },
    }));
    const __VLS_204 = __VLS_203({
        variant: "outline",
        ...{ class: "text-green-600" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_203));
    /** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
    const { default: __VLS_207 } = __VLS_205.slots;
    (__VLS_ctx.t("codegen.fieldQuery"));
    (__VLS_ctx.queryCount);
    // @ts-ignore
    [t, queryCount,];
    var __VLS_205;
    let __VLS_208;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_209 = __VLS_asFunctionalComponent1(__VLS_208, new __VLS_208({
        variant: "outline",
        ...{ class: "text-yellow-600" },
    }));
    const __VLS_210 = __VLS_209({
        variant: "outline",
        ...{ class: "text-yellow-600" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_209));
    /** @type {__VLS_StyleScopedClasses['text-yellow-600']} */ ;
    const { default: __VLS_213 } = __VLS_211.slots;
    (__VLS_ctx.t("codegen.fieldList"));
    (__VLS_ctx.listCount);
    // @ts-ignore
    [t, listCount,];
    var __VLS_211;
    let __VLS_214;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_215 = __VLS_asFunctionalComponent1(__VLS_214, new __VLS_214({
        variant: "outline",
        ...{ class: "text-blue-600" },
    }));
    const __VLS_216 = __VLS_215({
        variant: "outline",
        ...{ class: "text-blue-600" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_215));
    /** @type {__VLS_StyleScopedClasses['text-blue-600']} */ ;
    const { default: __VLS_219 } = __VLS_217.slots;
    (__VLS_ctx.t("codegen.fieldForm"));
    (__VLS_ctx.formCount);
    // @ts-ignore
    [t, formCount,];
    var __VLS_217;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    let __VLS_220;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_221 = __VLS_asFunctionalComponent1(__VLS_220, new __VLS_220({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
    }));
    const __VLS_222 = __VLS_221({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
    }, ...__VLS_functionalComponentArgsRest(__VLS_221));
    let __VLS_225;
    const __VLS_226 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!!(__VLS_ctx.generating))
                    return;
                if (!!(__VLS_ctx.currentStep === 0))
                    return;
                if (!(__VLS_ctx.currentStep === 1))
                    return;
                __VLS_ctx.batchSet('query', 1);
                // @ts-ignore
                [batchSet,];
            } });
    const { default: __VLS_227 } = __VLS_223.slots;
    (__VLS_ctx.t("codegen.queryLabel"));
    (__VLS_ctx.t("codegen.selectAll"));
    // @ts-ignore
    [t, t,];
    var __VLS_223;
    var __VLS_224;
    let __VLS_228;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_229 = __VLS_asFunctionalComponent1(__VLS_228, new __VLS_228({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
    }));
    const __VLS_230 = __VLS_229({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
    }, ...__VLS_functionalComponentArgsRest(__VLS_229));
    let __VLS_233;
    const __VLS_234 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!!(__VLS_ctx.generating))
                    return;
                if (!!(__VLS_ctx.currentStep === 0))
                    return;
                if (!(__VLS_ctx.currentStep === 1))
                    return;
                __VLS_ctx.batchSet('query', 0);
                // @ts-ignore
                [batchSet,];
            } });
    const { default: __VLS_235 } = __VLS_231.slots;
    (__VLS_ctx.t("codegen.queryLabel"));
    (__VLS_ctx.t("codegen.deselectAll"));
    // @ts-ignore
    [t, t,];
    var __VLS_231;
    var __VLS_232;
    let __VLS_236;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_237 = __VLS_asFunctionalComponent1(__VLS_236, new __VLS_236({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
    }));
    const __VLS_238 = __VLS_237({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
    }, ...__VLS_functionalComponentArgsRest(__VLS_237));
    let __VLS_241;
    const __VLS_242 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!!(__VLS_ctx.generating))
                    return;
                if (!!(__VLS_ctx.currentStep === 0))
                    return;
                if (!(__VLS_ctx.currentStep === 1))
                    return;
                __VLS_ctx.batchSet('list', 1);
                // @ts-ignore
                [batchSet,];
            } });
    const { default: __VLS_243 } = __VLS_239.slots;
    (__VLS_ctx.t("codegen.listLabel"));
    (__VLS_ctx.t("codegen.selectAll"));
    // @ts-ignore
    [t, t,];
    var __VLS_239;
    var __VLS_240;
    let __VLS_244;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_245 = __VLS_asFunctionalComponent1(__VLS_244, new __VLS_244({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
    }));
    const __VLS_246 = __VLS_245({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
    }, ...__VLS_functionalComponentArgsRest(__VLS_245));
    let __VLS_249;
    const __VLS_250 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!!(__VLS_ctx.generating))
                    return;
                if (!!(__VLS_ctx.currentStep === 0))
                    return;
                if (!(__VLS_ctx.currentStep === 1))
                    return;
                __VLS_ctx.batchSet('list', 0);
                // @ts-ignore
                [batchSet,];
            } });
    const { default: __VLS_251 } = __VLS_247.slots;
    (__VLS_ctx.t("codegen.listLabel"));
    (__VLS_ctx.t("codegen.deselectAll"));
    // @ts-ignore
    [t, t,];
    var __VLS_247;
    var __VLS_248;
    let __VLS_252;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_253 = __VLS_asFunctionalComponent1(__VLS_252, new __VLS_252({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
    }));
    const __VLS_254 = __VLS_253({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
    }, ...__VLS_functionalComponentArgsRest(__VLS_253));
    let __VLS_257;
    const __VLS_258 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!!(__VLS_ctx.generating))
                    return;
                if (!!(__VLS_ctx.currentStep === 0))
                    return;
                if (!(__VLS_ctx.currentStep === 1))
                    return;
                __VLS_ctx.batchSet('form', 1);
                // @ts-ignore
                [batchSet,];
            } });
    const { default: __VLS_259 } = __VLS_255.slots;
    (__VLS_ctx.t("codegen.formLabel"));
    (__VLS_ctx.t("codegen.selectAll"));
    // @ts-ignore
    [t, t,];
    var __VLS_255;
    var __VLS_256;
    let __VLS_260;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_261 = __VLS_asFunctionalComponent1(__VLS_260, new __VLS_260({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
    }));
    const __VLS_262 = __VLS_261({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
    }, ...__VLS_functionalComponentArgsRest(__VLS_261));
    let __VLS_265;
    const __VLS_266 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!!(__VLS_ctx.generating))
                    return;
                if (!!(__VLS_ctx.currentStep === 0))
                    return;
                if (!(__VLS_ctx.currentStep === 1))
                    return;
                __VLS_ctx.batchSet('form', 0);
                // @ts-ignore
                [batchSet,];
            } });
    const { default: __VLS_267 } = __VLS_263.slots;
    (__VLS_ctx.t("codegen.formLabel"));
    (__VLS_ctx.t("codegen.deselectAll"));
    // @ts-ignore
    [t, t,];
    var __VLS_263;
    var __VLS_264;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "rounded-md border overflow-x-auto" },
    });
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
    let __VLS_268;
    /** @ts-ignore @type { | typeof __VLS_components.Table | typeof __VLS_components.Table} */
    Table;
    // @ts-ignore
    const __VLS_269 = __VLS_asFunctionalComponent1(__VLS_268, new __VLS_268({}));
    const __VLS_270 = __VLS_269({}, ...__VLS_functionalComponentArgsRest(__VLS_269));
    const { default: __VLS_273 } = __VLS_271.slots;
    let __VLS_274;
    /** @ts-ignore @type { | typeof __VLS_components.TableHeader | typeof __VLS_components.TableHeader} */
    TableHeader;
    // @ts-ignore
    const __VLS_275 = __VLS_asFunctionalComponent1(__VLS_274, new __VLS_274({}));
    const __VLS_276 = __VLS_275({}, ...__VLS_functionalComponentArgsRest(__VLS_275));
    const { default: __VLS_279 } = __VLS_277.slots;
    let __VLS_280;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_281 = __VLS_asFunctionalComponent1(__VLS_280, new __VLS_280({}));
    const __VLS_282 = __VLS_281({}, ...__VLS_functionalComponentArgsRest(__VLS_281));
    const { default: __VLS_285 } = __VLS_283.slots;
    let __VLS_286;
    /** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
    TableHead;
    // @ts-ignore
    const __VLS_287 = __VLS_asFunctionalComponent1(__VLS_286, new __VLS_286({
        ...{ class: "w-32" },
    }));
    const __VLS_288 = __VLS_287({
        ...{ class: "w-32" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_287));
    /** @type {__VLS_StyleScopedClasses['w-32']} */ ;
    const { default: __VLS_291 } = __VLS_289.slots;
    (__VLS_ctx.t("codegen.columnName"));
    // @ts-ignore
    [t,];
    var __VLS_289;
    let __VLS_292;
    /** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
    TableHead;
    // @ts-ignore
    const __VLS_293 = __VLS_asFunctionalComponent1(__VLS_292, new __VLS_292({
        ...{ class: "w-28" },
    }));
    const __VLS_294 = __VLS_293({
        ...{ class: "w-28" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_293));
    /** @type {__VLS_StyleScopedClasses['w-28']} */ ;
    const { default: __VLS_297 } = __VLS_295.slots;
    (__VLS_ctx.t("codegen.columnType"));
    // @ts-ignore
    [t,];
    var __VLS_295;
    let __VLS_298;
    /** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
    TableHead;
    // @ts-ignore
    const __VLS_299 = __VLS_asFunctionalComponent1(__VLS_298, new __VLS_298({
        ...{ class: "w-28" },
    }));
    const __VLS_300 = __VLS_299({
        ...{ class: "w-28" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_299));
    /** @type {__VLS_StyleScopedClasses['w-28']} */ ;
    const { default: __VLS_303 } = __VLS_301.slots;
    (__VLS_ctx.t("codegen.fieldName"));
    // @ts-ignore
    [t,];
    var __VLS_301;
    let __VLS_304;
    /** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
    TableHead;
    // @ts-ignore
    const __VLS_305 = __VLS_asFunctionalComponent1(__VLS_304, new __VLS_304({}));
    const __VLS_306 = __VLS_305({}, ...__VLS_functionalComponentArgsRest(__VLS_305));
    const { default: __VLS_309 } = __VLS_307.slots;
    (__VLS_ctx.t("codegen.fieldComment"));
    // @ts-ignore
    [t,];
    var __VLS_307;
    let __VLS_310;
    /** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
    TableHead;
    // @ts-ignore
    const __VLS_311 = __VLS_asFunctionalComponent1(__VLS_310, new __VLS_310({
        ...{ class: "w-14 text-center" },
    }));
    const __VLS_312 = __VLS_311({
        ...{ class: "w-14 text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_311));
    /** @type {__VLS_StyleScopedClasses['w-14']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_315 } = __VLS_313.slots;
    (__VLS_ctx.t("codegen.queryLabel"));
    // @ts-ignore
    [t,];
    var __VLS_313;
    let __VLS_316;
    /** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
    TableHead;
    // @ts-ignore
    const __VLS_317 = __VLS_asFunctionalComponent1(__VLS_316, new __VLS_316({
        ...{ class: "w-28" },
    }));
    const __VLS_318 = __VLS_317({
        ...{ class: "w-28" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_317));
    /** @type {__VLS_StyleScopedClasses['w-28']} */ ;
    const { default: __VLS_321 } = __VLS_319.slots;
    (__VLS_ctx.t("codegen.queryTypeLabel"));
    // @ts-ignore
    [t,];
    var __VLS_319;
    let __VLS_322;
    /** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
    TableHead;
    // @ts-ignore
    const __VLS_323 = __VLS_asFunctionalComponent1(__VLS_322, new __VLS_322({
        ...{ class: "w-14 text-center" },
    }));
    const __VLS_324 = __VLS_323({
        ...{ class: "w-14 text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_323));
    /** @type {__VLS_StyleScopedClasses['w-14']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_327 } = __VLS_325.slots;
    (__VLS_ctx.t("codegen.listLabel"));
    // @ts-ignore
    [t,];
    var __VLS_325;
    let __VLS_328;
    /** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
    TableHead;
    // @ts-ignore
    const __VLS_329 = __VLS_asFunctionalComponent1(__VLS_328, new __VLS_328({
        ...{ class: "w-14 text-center" },
    }));
    const __VLS_330 = __VLS_329({
        ...{ class: "w-14 text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_329));
    /** @type {__VLS_StyleScopedClasses['w-14']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_333 } = __VLS_331.slots;
    (__VLS_ctx.t("codegen.formLabel"));
    // @ts-ignore
    [t,];
    var __VLS_331;
    let __VLS_334;
    /** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
    TableHead;
    // @ts-ignore
    const __VLS_335 = __VLS_asFunctionalComponent1(__VLS_334, new __VLS_334({
        ...{ class: "w-28" },
    }));
    const __VLS_336 = __VLS_335({
        ...{ class: "w-28" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_335));
    /** @type {__VLS_StyleScopedClasses['w-28']} */ ;
    const { default: __VLS_339 } = __VLS_337.slots;
    (__VLS_ctx.t("codegen.formTypeLabel"));
    // @ts-ignore
    [t,];
    var __VLS_337;
    let __VLS_340;
    /** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
    TableHead;
    // @ts-ignore
    const __VLS_341 = __VLS_asFunctionalComponent1(__VLS_340, new __VLS_340({
        ...{ class: "w-14 text-center" },
    }));
    const __VLS_342 = __VLS_341({
        ...{ class: "w-14 text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_341));
    /** @type {__VLS_StyleScopedClasses['w-14']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    const { default: __VLS_345 } = __VLS_343.slots;
    (__VLS_ctx.t("codegen.requiredLabel"));
    // @ts-ignore
    [t,];
    var __VLS_343;
    // @ts-ignore
    [];
    var __VLS_283;
    // @ts-ignore
    [];
    var __VLS_277;
    let __VLS_346;
    /** @ts-ignore @type { | typeof __VLS_components.TableBody | typeof __VLS_components.TableBody} */
    TableBody;
    // @ts-ignore
    const __VLS_347 = __VLS_asFunctionalComponent1(__VLS_346, new __VLS_346({}));
    const __VLS_348 = __VLS_347({}, ...__VLS_functionalComponentArgsRest(__VLS_347));
    const { default: __VLS_351 } = __VLS_349.slots;
    if (__VLS_ctx.fields.length === 0) {
        let __VLS_352;
        /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
        TableRow;
        // @ts-ignore
        const __VLS_353 = __VLS_asFunctionalComponent1(__VLS_352, new __VLS_352({}));
        const __VLS_354 = __VLS_353({}, ...__VLS_functionalComponentArgsRest(__VLS_353));
        const { default: __VLS_357 } = __VLS_355.slots;
        let __VLS_358;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_359 = __VLS_asFunctionalComponent1(__VLS_358, new __VLS_358({
            colspan: (10),
            ...{ class: "h-20 text-center text-muted-foreground" },
        }));
        const __VLS_360 = __VLS_359({
            colspan: (10),
            ...{ class: "h-20 text-center text-muted-foreground" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_359));
        /** @type {__VLS_StyleScopedClasses['h-20']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        const { default: __VLS_363 } = __VLS_361.slots;
        (__VLS_ctx.t("codegen.noFields"));
        // @ts-ignore
        [t, fields,];
        var __VLS_361;
        // @ts-ignore
        [];
        var __VLS_355;
    }
    for (const [field, idx] of __VLS_vFor((__VLS_ctx.fields))) {
        let __VLS_364;
        /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
        TableRow;
        // @ts-ignore
        const __VLS_365 = __VLS_asFunctionalComponent1(__VLS_364, new __VLS_364({
            key: (idx),
            ...{ class: "hover:bg-muted/50" },
        }));
        const __VLS_366 = __VLS_365({
            key: (idx),
            ...{ class: "hover:bg-muted/50" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_365));
        /** @type {__VLS_StyleScopedClasses['hover:bg-muted/50']} */ ;
        const { default: __VLS_369 } = __VLS_367.slots;
        let __VLS_370;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_371 = __VLS_asFunctionalComponent1(__VLS_370, new __VLS_370({
            ...{ class: "font-mono text-xs" },
        }));
        const __VLS_372 = __VLS_371({
            ...{ class: "font-mono text-xs" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_371));
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        const { default: __VLS_375 } = __VLS_373.slots;
        (field.columnName);
        // @ts-ignore
        [fields,];
        var __VLS_373;
        let __VLS_376;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_377 = __VLS_asFunctionalComponent1(__VLS_376, new __VLS_376({
            ...{ class: "text-xs text-muted-foreground" },
        }));
        const __VLS_378 = __VLS_377({
            ...{ class: "text-xs text-muted-foreground" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_377));
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        const { default: __VLS_381 } = __VLS_379.slots;
        (field.columnType);
        // @ts-ignore
        [];
        var __VLS_379;
        let __VLS_382;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_383 = __VLS_asFunctionalComponent1(__VLS_382, new __VLS_382({
            ...{ class: "text-sm" },
        }));
        const __VLS_384 = __VLS_383({
            ...{ class: "text-sm" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_383));
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        const { default: __VLS_387 } = __VLS_385.slots;
        (field.fieldName);
        // @ts-ignore
        [];
        var __VLS_385;
        let __VLS_388;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_389 = __VLS_asFunctionalComponent1(__VLS_388, new __VLS_388({
            ...{ class: "text-sm" },
        }));
        const __VLS_390 = __VLS_389({
            ...{ class: "text-sm" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_389));
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        const { default: __VLS_393 } = __VLS_391.slots;
        (field.fieldComment);
        // @ts-ignore
        [];
        var __VLS_391;
        let __VLS_394;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_395 = __VLS_asFunctionalComponent1(__VLS_394, new __VLS_394({
            ...{ class: "text-center" },
        }));
        const __VLS_396 = __VLS_395({
            ...{ class: "text-center" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_395));
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        const { default: __VLS_399 } = __VLS_397.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            type: "checkbox",
            'true-value': (1),
            'false-value': (0),
            ...{ class: "size-4 rounded accent-primary" },
        });
        (field.isShowInQuery);
        /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
        // @ts-ignore
        [];
        var __VLS_397;
        let __VLS_400;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_401 = __VLS_asFunctionalComponent1(__VLS_400, new __VLS_400({}));
        const __VLS_402 = __VLS_401({}, ...__VLS_functionalComponentArgsRest(__VLS_401));
        const { default: __VLS_405 } = __VLS_403.slots;
        let __VLS_406;
        /** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
        Select;
        // @ts-ignore
        const __VLS_407 = __VLS_asFunctionalComponent1(__VLS_406, new __VLS_406({
            ...{ 'onUpdate:modelValue': {} },
            modelValue: (String(field.queryType)),
        }));
        const __VLS_408 = __VLS_407({
            ...{ 'onUpdate:modelValue': {} },
            modelValue: (String(field.queryType)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_407));
        let __VLS_411;
        const __VLS_412 = ({ 'update:modelValue': {} },
            { 'onUpdate:modelValue': ((v) => (field.queryType = Number(v))) });
        const { default: __VLS_413 } = __VLS_409.slots;
        let __VLS_414;
        /** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
        SelectTrigger;
        // @ts-ignore
        const __VLS_415 = __VLS_asFunctionalComponent1(__VLS_414, new __VLS_414({
            ...{ class: "h-7 text-xs" },
        }));
        const __VLS_416 = __VLS_415({
            ...{ class: "h-7 text-xs" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_415));
        /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        const { default: __VLS_419 } = __VLS_417.slots;
        let __VLS_420;
        /** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
        SelectValue;
        // @ts-ignore
        const __VLS_421 = __VLS_asFunctionalComponent1(__VLS_420, new __VLS_420({}));
        const __VLS_422 = __VLS_421({}, ...__VLS_functionalComponentArgsRest(__VLS_421));
        // @ts-ignore
        [];
        var __VLS_417;
        let __VLS_425;
        /** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
        SelectContent;
        // @ts-ignore
        const __VLS_426 = __VLS_asFunctionalComponent1(__VLS_425, new __VLS_425({}));
        const __VLS_427 = __VLS_426({}, ...__VLS_functionalComponentArgsRest(__VLS_426));
        const { default: __VLS_430 } = __VLS_428.slots;
        for (const [qt] of __VLS_vFor((__VLS_ctx.queryTypeOptions))) {
            let __VLS_431;
            /** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
            SelectItem;
            // @ts-ignore
            const __VLS_432 = __VLS_asFunctionalComponent1(__VLS_431, new __VLS_431({
                key: (String(qt.value)),
                value: (String(qt.value)),
            }));
            const __VLS_433 = __VLS_432({
                key: (String(qt.value)),
                value: (String(qt.value)),
            }, ...__VLS_functionalComponentArgsRest(__VLS_432));
            const { default: __VLS_436 } = __VLS_434.slots;
            (qt.label);
            // @ts-ignore
            [queryTypeOptions,];
            var __VLS_434;
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_428;
        // @ts-ignore
        [];
        var __VLS_409;
        var __VLS_410;
        // @ts-ignore
        [];
        var __VLS_403;
        let __VLS_437;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_438 = __VLS_asFunctionalComponent1(__VLS_437, new __VLS_437({
            ...{ class: "text-center" },
        }));
        const __VLS_439 = __VLS_438({
            ...{ class: "text-center" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_438));
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        const { default: __VLS_442 } = __VLS_440.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            type: "checkbox",
            'true-value': (1),
            'false-value': (0),
            ...{ class: "size-4 rounded accent-primary" },
        });
        (field.isShowInList);
        /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
        // @ts-ignore
        [];
        var __VLS_440;
        let __VLS_443;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_444 = __VLS_asFunctionalComponent1(__VLS_443, new __VLS_443({
            ...{ class: "text-center" },
        }));
        const __VLS_445 = __VLS_444({
            ...{ class: "text-center" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_444));
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        const { default: __VLS_448 } = __VLS_446.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            type: "checkbox",
            'true-value': (1),
            'false-value': (0),
            ...{ class: "size-4 rounded accent-primary" },
        });
        (field.isShowInForm);
        /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
        // @ts-ignore
        [];
        var __VLS_446;
        let __VLS_449;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_450 = __VLS_asFunctionalComponent1(__VLS_449, new __VLS_449({}));
        const __VLS_451 = __VLS_450({}, ...__VLS_functionalComponentArgsRest(__VLS_450));
        const { default: __VLS_454 } = __VLS_452.slots;
        let __VLS_455;
        /** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
        Select;
        // @ts-ignore
        const __VLS_456 = __VLS_asFunctionalComponent1(__VLS_455, new __VLS_455({
            ...{ 'onUpdate:modelValue': {} },
            modelValue: (String(field.formType)),
        }));
        const __VLS_457 = __VLS_456({
            ...{ 'onUpdate:modelValue': {} },
            modelValue: (String(field.formType)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_456));
        let __VLS_460;
        const __VLS_461 = ({ 'update:modelValue': {} },
            { 'onUpdate:modelValue': ((v) => (field.formType = Number(v))) });
        const { default: __VLS_462 } = __VLS_458.slots;
        let __VLS_463;
        /** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
        SelectTrigger;
        // @ts-ignore
        const __VLS_464 = __VLS_asFunctionalComponent1(__VLS_463, new __VLS_463({
            ...{ class: "h-7 text-xs" },
        }));
        const __VLS_465 = __VLS_464({
            ...{ class: "h-7 text-xs" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_464));
        /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        const { default: __VLS_468 } = __VLS_466.slots;
        let __VLS_469;
        /** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
        SelectValue;
        // @ts-ignore
        const __VLS_470 = __VLS_asFunctionalComponent1(__VLS_469, new __VLS_469({}));
        const __VLS_471 = __VLS_470({}, ...__VLS_functionalComponentArgsRest(__VLS_470));
        // @ts-ignore
        [];
        var __VLS_466;
        let __VLS_474;
        /** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
        SelectContent;
        // @ts-ignore
        const __VLS_475 = __VLS_asFunctionalComponent1(__VLS_474, new __VLS_474({}));
        const __VLS_476 = __VLS_475({}, ...__VLS_functionalComponentArgsRest(__VLS_475));
        const { default: __VLS_479 } = __VLS_477.slots;
        for (const [ft] of __VLS_vFor((__VLS_ctx.formTypeOptions))) {
            let __VLS_480;
            /** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
            SelectItem;
            // @ts-ignore
            const __VLS_481 = __VLS_asFunctionalComponent1(__VLS_480, new __VLS_480({
                key: (String(ft.value)),
                value: (String(ft.value)),
            }));
            const __VLS_482 = __VLS_481({
                key: (String(ft.value)),
                value: (String(ft.value)),
            }, ...__VLS_functionalComponentArgsRest(__VLS_481));
            const { default: __VLS_485 } = __VLS_483.slots;
            (ft.label);
            // @ts-ignore
            [formTypeOptions,];
            var __VLS_483;
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_477;
        // @ts-ignore
        [];
        var __VLS_458;
        var __VLS_459;
        // @ts-ignore
        [];
        var __VLS_452;
        let __VLS_486;
        /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
        TableCell;
        // @ts-ignore
        const __VLS_487 = __VLS_asFunctionalComponent1(__VLS_486, new __VLS_486({
            ...{ class: "text-center" },
        }));
        const __VLS_488 = __VLS_487({
            ...{ class: "text-center" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_487));
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        const { default: __VLS_491 } = __VLS_489.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            type: "checkbox",
            'true-value': (1),
            'false-value': (0),
            ...{ class: "size-4 rounded accent-primary" },
        });
        (field.isRequired);
        /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
        // @ts-ignore
        [];
        var __VLS_489;
        // @ts-ignore
        [];
        var __VLS_367;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_349;
    // @ts-ignore
    [];
    var __VLS_271;
}
else if (__VLS_ctx.currentStep === 2) {
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
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    for (const [s] of __VLS_vFor((__VLS_ctx.scopeOptions))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            key: (s.value),
            ...{ class: "flex items-center gap-1.5 cursor-pointer text-sm" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            type: "radio",
            value: (s.value),
            ...{ class: "accent-primary" },
        });
        (__VLS_ctx.previewScope);
        /** @type {__VLS_StyleScopedClasses['accent-primary']} */ ;
        (s.label);
        // @ts-ignore
        [currentStep, scopeOptions, previewScope,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    let __VLS_492;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_493 = __VLS_asFunctionalComponent1(__VLS_492, new __VLS_492({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
    }));
    const __VLS_494 = __VLS_493({
        ...{ 'onClick': {} },
        variant: "outline",
        size: "sm",
    }, ...__VLS_functionalComponentArgsRest(__VLS_493));
    let __VLS_497;
    const __VLS_498 = ({ click: {} },
        { onClick: (__VLS_ctx.handleCopyCode) });
    const { default: __VLS_499 } = __VLS_495.slots;
    let __VLS_500;
    /** @ts-ignore @type { | typeof __VLS_components.CopyIcon} */
    CopyIcon;
    // @ts-ignore
    const __VLS_501 = __VLS_asFunctionalComponent1(__VLS_500, new __VLS_500({
        ...{ class: "size-3.5 mr-1" },
    }));
    const __VLS_502 = __VLS_501({
        ...{ class: "size-3.5 mr-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_501));
    /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
    (__VLS_ctx.t("codegen.copyCode"));
    // @ts-ignore
    [t, handleCopyCode,];
    var __VLS_495;
    var __VLS_496;
    let __VLS_505;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_506 = __VLS_asFunctionalComponent1(__VLS_505, new __VLS_505({
        ...{ 'onClick': {} },
        size: "sm",
    }));
    const __VLS_507 = __VLS_506({
        ...{ 'onClick': {} },
        size: "sm",
    }, ...__VLS_functionalComponentArgsRest(__VLS_506));
    let __VLS_510;
    const __VLS_511 = ({ click: {} },
        { onClick: (__VLS_ctx.handleDownloadZip) });
    const { default: __VLS_512 } = __VLS_508.slots;
    let __VLS_513;
    /** @ts-ignore @type { | typeof __VLS_components.DownloadIcon} */
    DownloadIcon;
    // @ts-ignore
    const __VLS_514 = __VLS_asFunctionalComponent1(__VLS_513, new __VLS_513({
        ...{ class: "size-3.5 mr-1" },
    }));
    const __VLS_515 = __VLS_514({
        ...{ class: "size-3.5 mr-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_514));
    /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
    (__VLS_ctx.t("codegen.downloadZip"));
    // @ts-ignore
    [t, handleDownloadZip,];
    var __VLS_508;
    var __VLS_509;
    if (__VLS_ctx.previewFiles.length === 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "py-16 text-center text-muted-foreground" },
        });
        /** @type {__VLS_StyleScopedClasses['py-16']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        (__VLS_ctx.t("codegen.noPreview"));
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex border rounded-md overflow-hidden" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
        /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-64 border-r overflow-auto bg-muted/30 shrink-0" },
        });
        /** @type {__VLS_StyleScopedClasses['w-64']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-r']} */ ;
        /** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-muted/30']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "p-2 text-xs font-semibold text-muted-foreground border-b" },
        });
        /** @type {__VLS_StyleScopedClasses['p-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
        (__VLS_ctx.t("codegen.fileTree"));
        (__VLS_ctx.filteredPreviewFiles.length);
        (__VLS_ctx.t("codegen.files"));
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "p-1" },
        });
        /** @type {__VLS_StyleScopedClasses['p-1']} */ ;
        for (const [file] of __VLS_vFor((__VLS_ctx.filteredPreviewFiles))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.generating))
                            return;
                        if (!!(__VLS_ctx.currentStep === 0))
                            return;
                        if (!!(__VLS_ctx.currentStep === 1))
                            return;
                        if (!(__VLS_ctx.currentStep === 2))
                            return;
                        if (!!(__VLS_ctx.previewFiles.length === 0))
                            return;
                        __VLS_ctx.selectedFile = file;
                        // @ts-ignore
                        [t, t, t, previewFiles, filteredPreviewFiles, filteredPreviewFiles, selectedFile,];
                    } },
                key: (file.path),
                ...{ class: "w-full text-left px-2 py-1.5 rounded text-xs hover:bg-muted transition-colors flex items-center gap-1.5" },
                ...{ class: ({
                        'bg-primary/10 text-primary font-medium': __VLS_ctx.selectedFile?.path === file.path,
                    }) },
            });
            /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
            /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:bg-muted']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-primary/10']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
            let __VLS_518;
            /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
            Badge;
            // @ts-ignore
            const __VLS_519 = __VLS_asFunctionalComponent1(__VLS_518, new __VLS_518({
                variant: "outline",
                ...{ class: "text-[10px] px-1 py-0 h-4" },
                ...{ class: (file.scope === 'frontend' ? 'text-green-600' : 'text-orange-500') },
            }));
            const __VLS_520 = __VLS_519({
                variant: "outline",
                ...{ class: "text-[10px] px-1 py-0 h-4" },
                ...{ class: (file.scope === 'frontend' ? 'text-green-600' : 'text-orange-500') },
            }, ...__VLS_functionalComponentArgsRest(__VLS_519));
            /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
            /** @type {__VLS_StyleScopedClasses['px-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['py-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
            const { default: __VLS_523 } = __VLS_521.slots;
            (file.scope === "frontend" ? "FE" : "BE");
            // @ts-ignore
            [selectedFile,];
            var __VLS_521;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "truncate" },
            });
            /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
            (file.fileName);
            // @ts-ignore
            [];
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex-1 overflow-auto" },
        });
        /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
        if (__VLS_ctx.selectedFile) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "h-full flex flex-col" },
            });
            /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "px-3 py-1.5 border-b bg-muted/50 flex items-center gap-2 shrink-0" },
            });
            /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-muted/50']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-xs font-mono text-muted-foreground truncate" },
            });
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
            /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
            (__VLS_ctx.selectedFile.path);
            let __VLS_524;
            /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
            Badge;
            // @ts-ignore
            const __VLS_525 = __VLS_asFunctionalComponent1(__VLS_524, new __VLS_524({
                variant: "outline",
                ...{ class: "text-[10px] px-1 py-0 h-4 shrink-0" },
            }));
            const __VLS_526 = __VLS_525({
                variant: "outline",
                ...{ class: "text-[10px] px-1 py-0 h-4 shrink-0" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_525));
            /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
            /** @type {__VLS_StyleScopedClasses['px-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['py-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
            const { default: __VLS_529 } = __VLS_527.slots;
            (__VLS_ctx.selectedFile.language.toUpperCase());
            // @ts-ignore
            [selectedFile, selectedFile, selectedFile,];
            var __VLS_527;
            __VLS_asFunctionalElement1(__VLS_intrinsics.pre, __VLS_intrinsics.pre)({
                ...{ class: "flex-1 p-3 text-xs font-mono overflow-auto whitespace-pre-wrap" },
            });
            /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
            /** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
            /** @type {__VLS_StyleScopedClasses['whitespace-pre-wrap']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({});
            (__VLS_ctx.selectedFile.content);
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "h-full flex items-center justify-center text-muted-foreground text-sm" },
            });
            /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
            (__VLS_ctx.t("codegen.noFileSelected"));
        }
    }
}
let __VLS_530;
/** @ts-ignore @type { | typeof __VLS_components.SheetFooter | typeof __VLS_components.SheetFooter} */
SheetFooter;
// @ts-ignore
const __VLS_531 = __VLS_asFunctionalComponent1(__VLS_530, new __VLS_530({
    ...{ class: "mt-4" },
}));
const __VLS_532 = __VLS_531({
    ...{ class: "mt-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_531));
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
const { default: __VLS_535 } = __VLS_533.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between w-full" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
if (__VLS_ctx.currentStep > 0) {
    let __VLS_536;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_537 = __VLS_asFunctionalComponent1(__VLS_536, new __VLS_536({
        ...{ 'onClick': {} },
        variant: "outline",
    }));
    const __VLS_538 = __VLS_537({
        ...{ 'onClick': {} },
        variant: "outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_537));
    let __VLS_541;
    const __VLS_542 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.currentStep > 0))
                    return;
                __VLS_ctx.currentStep--;
                // @ts-ignore
                [currentStep, currentStep, t, selectedFile,];
            } });
    const { default: __VLS_543 } = __VLS_539.slots;
    (__VLS_ctx.t("codegen.prev"));
    // @ts-ignore
    [t,];
    var __VLS_539;
    var __VLS_540;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({});
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
let __VLS_544;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_545 = __VLS_asFunctionalComponent1(__VLS_544, new __VLS_544({
    ...{ 'onClick': {} },
    variant: "outline",
}));
const __VLS_546 = __VLS_545({
    ...{ 'onClick': {} },
    variant: "outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_545));
let __VLS_549;
const __VLS_550 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.emit('update:visible', false);
            // @ts-ignore
            [emit,];
        } });
const { default: __VLS_551 } = __VLS_547.slots;
(__VLS_ctx.t("codegen.cancel"));
// @ts-ignore
[t,];
var __VLS_547;
var __VLS_548;
if (__VLS_ctx.currentStep < 2) {
    let __VLS_552;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_553 = __VLS_asFunctionalComponent1(__VLS_552, new __VLS_552({
        ...{ 'onClick': {} },
    }));
    const __VLS_554 = __VLS_553({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_553));
    let __VLS_557;
    const __VLS_558 = ({ click: {} },
        { onClick: (__VLS_ctx.handleNext) });
    const { default: __VLS_559 } = __VLS_555.slots;
    (__VLS_ctx.t("codegen.next"));
    // @ts-ignore
    [currentStep, t, handleNext,];
    var __VLS_555;
    var __VLS_556;
}
// @ts-ignore
[];
var __VLS_533;
// @ts-ignore
[];
var __VLS_12;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=GeneratorSheet.vue.js.map