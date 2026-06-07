import { ref } from "vue";
import { toast } from "vue-sonner";
import { ImageIcon, TrashIcon, XIcon, PlusIcon, FileIcon, UploadIcon } from "@lucide/vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const singleUrl = ref("https://picsum.photos/400/400?random=1");
const singleInputRef = ref();
const multiLimit = 4;
const multiUrls = ref([
    "https://picsum.photos/200/200?random=2",
    "https://picsum.photos/200/200?random=3",
]);
const fileList = ref([
    { name: "项目需求文档.pdf", size: "2.3 MB" },
    { name: "设计稿-v2.fig", size: "15.8 MB" },
]);
function onSingleUpload(e) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file)
        return;
    singleUrl.value = URL.createObjectURL(file);
    toast.success("上传成功");
    input.value = "";
}
function onMultiUpload(e) {
    const files = e.target.files;
    if (!files)
        return;
    for (const f of files) {
        if (multiUrls.value.length >= multiLimit)
            break;
        multiUrls.value.push(URL.createObjectURL(f));
    }
    toast.success(`已上传 ${Math.min(files.length, multiLimit - multiUrls.value.length + files.length)} 张图片`);
}
function onFileUpload(e) {
    const files = e.target.files;
    if (!files)
        return;
    for (const f of files) {
        fileList.value.push({
            name: f.name,
            size: f.size > 1024 * 1024
                ? `${(f.size / 1024 / 1024).toFixed(1)} MB`
                : `${(f.size / 1024).toFixed(0)} KB`,
        });
    }
    toast.success(`已添加 ${files.length} 个文件`);
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-1 lg:grid-cols-2 gap-5" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
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
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({}));
const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_23 } = __VLS_21.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-3" },
});
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative group w-40 h-40 rounded-lg border-2 border-dashed border-muted-foreground/25 overflow-hidden" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['w-40']} */ ;
/** @type {__VLS_StyleScopedClasses['h-40']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-dashed']} */ ;
/** @type {__VLS_StyleScopedClasses['border-muted-foreground/25']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
if (__VLS_ctx.singleUrl) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (__VLS_ctx.singleUrl),
        alt: "preview",
        ...{ class: "w-full h-full object-cover" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col items-center justify-center h-full text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    let __VLS_24;
    /** @ts-ignore @type { | typeof __VLS_components.ImageIcon} */
    ImageIcon;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
        ...{ class: "size-8 mb-1" },
    }));
    const __VLS_26 = __VLS_25({
        ...{ class: "size-8 mb-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    /** @type {__VLS_StyleScopedClasses['size-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onChange: (__VLS_ctx.onSingleUpload) },
    ref: "singleInputRef",
    type: "file",
    accept: "image/*",
    ...{ class: "hidden" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2" },
});
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/40']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
let __VLS_29;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
    ...{ 'onClick': {} },
    variant: "secondary",
    size: "sm",
}));
const __VLS_31 = __VLS_30({
    ...{ 'onClick': {} },
    variant: "secondary",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
let __VLS_34;
const __VLS_35 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.singleInputRef?.click();
            // @ts-ignore
            [singleUrl, singleUrl, onSingleUpload, singleInputRef,];
        } });
const { default: __VLS_36 } = __VLS_32.slots;
// @ts-ignore
[];
var __VLS_32;
var __VLS_33;
if (__VLS_ctx.singleUrl) {
    let __VLS_37;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
        ...{ 'onClick': {} },
        variant: "destructive",
        size: "sm",
    }));
    const __VLS_39 = __VLS_38({
        ...{ 'onClick': {} },
        variant: "destructive",
        size: "sm",
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    let __VLS_42;
    const __VLS_43 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.singleUrl))
                    return;
                __VLS_ctx.singleUrl = '';
                // @ts-ignore
                [singleUrl, singleUrl,];
            } });
    const { default: __VLS_44 } = __VLS_40.slots;
    let __VLS_45;
    /** @ts-ignore @type { | typeof __VLS_components.TrashIcon} */
    TrashIcon;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
        ...{ class: "size-3" },
    }));
    const __VLS_47 = __VLS_46({
        ...{ class: "size-3" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    /** @type {__VLS_StyleScopedClasses['size-3']} */ ;
    // @ts-ignore
    [];
    var __VLS_40;
    var __VLS_41;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
// @ts-ignore
[];
var __VLS_21;
// @ts-ignore
[];
var __VLS_3;
let __VLS_50;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({}));
const __VLS_52 = __VLS_51({}, ...__VLS_functionalComponentArgsRest(__VLS_51));
const { default: __VLS_55 } = __VLS_53.slots;
let __VLS_56;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({}));
const __VLS_58 = __VLS_57({}, ...__VLS_functionalComponentArgsRest(__VLS_57));
const { default: __VLS_61 } = __VLS_59.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
let __VLS_62;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
    ...{ class: "text-sm" },
}));
const __VLS_64 = __VLS_63({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_67 } = __VLS_65.slots;
// @ts-ignore
[];
var __VLS_65;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
(__VLS_ctx.multiUrls.length);
(__VLS_ctx.multiLimit);
// @ts-ignore
[multiUrls, multiLimit,];
var __VLS_59;
let __VLS_68;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({}));
const __VLS_70 = __VLS_69({}, ...__VLS_functionalComponentArgsRest(__VLS_69));
const { default: __VLS_73 } = __VLS_71.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-wrap gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
for (const [url, idx] of __VLS_vFor((__VLS_ctx.multiUrls))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (idx),
        ...{ class: "relative group w-28 h-28 rounded-lg border overflow-hidden" },
    });
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['group']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-28']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-28']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (url),
        alt: "",
        ...{ class: "w-full h-full object-cover" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-black/40']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    let __VLS_74;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({
        ...{ 'onClick': {} },
        variant: "destructive",
        size: "icon-xs",
    }));
    const __VLS_76 = __VLS_75({
        ...{ 'onClick': {} },
        variant: "destructive",
        size: "icon-xs",
    }, ...__VLS_functionalComponentArgsRest(__VLS_75));
    let __VLS_79;
    const __VLS_80 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.multiUrls.splice(idx, 1);
                // @ts-ignore
                [multiUrls, multiUrls,];
            } });
    const { default: __VLS_81 } = __VLS_77.slots;
    let __VLS_82;
    /** @ts-ignore @type { | typeof __VLS_components.XIcon} */
    XIcon;
    // @ts-ignore
    const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({
        ...{ class: "size-3" },
    }));
    const __VLS_84 = __VLS_83({
        ...{ class: "size-3" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_83));
    /** @type {__VLS_StyleScopedClasses['size-3']} */ ;
    // @ts-ignore
    [];
    var __VLS_77;
    var __VLS_78;
    // @ts-ignore
    [];
}
if (__VLS_ctx.multiUrls.length < __VLS_ctx.multiLimit) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "w-28 h-28 rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors" },
    });
    /** @type {__VLS_StyleScopedClasses['w-28']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-28']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-dashed']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-muted-foreground/25']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:border-primary/50']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onChange: (__VLS_ctx.onMultiUpload) },
        type: "file",
        accept: "image/*",
        multiple: true,
        ...{ class: "hidden" },
    });
    /** @type {__VLS_StyleScopedClasses['hidden']} */ ;
    let __VLS_87;
    /** @ts-ignore @type { | typeof __VLS_components.PlusIcon} */
    PlusIcon;
    // @ts-ignore
    const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
        ...{ class: "size-6 text-muted-foreground" },
    }));
    const __VLS_89 = __VLS_88({
        ...{ class: "size-6 text-muted-foreground" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_88));
    /** @type {__VLS_StyleScopedClasses['size-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs text-muted-foreground mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
}
// @ts-ignore
[multiUrls, multiLimit, onMultiUpload,];
var __VLS_71;
// @ts-ignore
[];
var __VLS_53;
let __VLS_92;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({}));
const __VLS_94 = __VLS_93({}, ...__VLS_functionalComponentArgsRest(__VLS_93));
const { default: __VLS_97 } = __VLS_95.slots;
let __VLS_98;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({}));
const __VLS_100 = __VLS_99({}, ...__VLS_functionalComponentArgsRest(__VLS_99));
const { default: __VLS_103 } = __VLS_101.slots;
let __VLS_104;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent1(__VLS_104, new __VLS_104({
    ...{ class: "text-sm" },
}));
const __VLS_106 = __VLS_105({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_105));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_109 } = __VLS_107.slots;
// @ts-ignore
[];
var __VLS_107;
// @ts-ignore
[];
var __VLS_101;
let __VLS_110;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({}));
const __VLS_112 = __VLS_111({}, ...__VLS_functionalComponentArgsRest(__VLS_111));
const { default: __VLS_115 } = __VLS_113.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
for (const [file, idx] of __VLS_vFor((__VLS_ctx.fileList))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (idx),
        ...{ class: "flex items-center gap-3 px-3 py-2 rounded-lg border" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    let __VLS_116;
    /** @ts-ignore @type { | typeof __VLS_components.FileIcon} */
    FileIcon;
    // @ts-ignore
    const __VLS_117 = __VLS_asFunctionalComponent1(__VLS_116, new __VLS_116({
        ...{ class: "size-4 text-muted-foreground shrink-0" },
    }));
    const __VLS_118 = __VLS_117({
        ...{ class: "size-4 text-muted-foreground shrink-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_117));
    /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "flex-1 text-sm truncate" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    (file.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (file.size);
    let __VLS_121;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_122 = __VLS_asFunctionalComponent1(__VLS_121, new __VLS_121({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "icon-xs",
    }));
    const __VLS_123 = __VLS_122({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "icon-xs",
    }, ...__VLS_functionalComponentArgsRest(__VLS_122));
    let __VLS_126;
    const __VLS_127 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.fileList.splice(idx, 1);
                // @ts-ignore
                [fileList, fileList,];
            } });
    const { default: __VLS_128 } = __VLS_124.slots;
    let __VLS_129;
    /** @ts-ignore @type { | typeof __VLS_components.XIcon} */
    XIcon;
    // @ts-ignore
    const __VLS_130 = __VLS_asFunctionalComponent1(__VLS_129, new __VLS_129({
        ...{ class: "size-3" },
    }));
    const __VLS_131 = __VLS_130({
        ...{ class: "size-3" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_130));
    /** @type {__VLS_StyleScopedClasses['size-3']} */ ;
    // @ts-ignore
    [];
    var __VLS_124;
    var __VLS_125;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-muted-foreground/25 cursor-pointer hover:border-primary/50 transition-colors" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-dashed']} */ ;
/** @type {__VLS_StyleScopedClasses['border-muted-foreground/25']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-primary/50']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onChange: (__VLS_ctx.onFileUpload) },
    type: "file",
    multiple: true,
    ...{ class: "hidden" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
let __VLS_134;
/** @ts-ignore @type { | typeof __VLS_components.UploadIcon} */
UploadIcon;
// @ts-ignore
const __VLS_135 = __VLS_asFunctionalComponent1(__VLS_134, new __VLS_134({
    ...{ class: "size-4 text-muted-foreground" },
}));
const __VLS_136 = __VLS_135({
    ...{ class: "size-4 text-muted-foreground" },
}, ...__VLS_functionalComponentArgsRest(__VLS_135));
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-sm text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
// @ts-ignore
[onFileUpload,];
var __VLS_113;
// @ts-ignore
[];
var __VLS_95;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=upload.vue.js.map