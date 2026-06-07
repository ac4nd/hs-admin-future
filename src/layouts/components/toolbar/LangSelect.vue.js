import { Check, Languages } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { useAppStore } from "@/stores";
import i18n from "@/lang";
const appStore = useAppStore();
const langOptions = [
    { label: "中文", value: "zh-cn" },
    { label: "English", value: "en" },
];
function handleLanguageChange(lang) {
    appStore.changeLanguage(lang);
    i18n.global.locale.value = lang;
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
}));
const __VLS_15 = __VLS_14({
    variant: "ghost",
    size: "icon",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const { default: __VLS_18 } = __VLS_16.slots;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.Languages} */
Languages;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    ...{ class: "h-4 w-4" },
}));
const __VLS_21 = __VLS_20({
    ...{ class: "h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
var __VLS_16;
var __VLS_10;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.DropdownMenuContent | typeof __VLS_components.DropdownMenuContent} */
DropdownMenuContent;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    align: "end",
}));
const __VLS_26 = __VLS_25({
    align: "end",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const { default: __VLS_29 } = __VLS_27.slots;
for (const [item] of __VLS_vFor((__VLS_ctx.langOptions))) {
    let __VLS_30;
    /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
    DropdownMenuItem;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
        ...{ 'onClick': {} },
        key: (item.value),
        disabled: (__VLS_ctx.appStore.language === item.value),
    }));
    const __VLS_32 = __VLS_31({
        ...{ 'onClick': {} },
        key: (item.value),
        disabled: (__VLS_ctx.appStore.language === item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    let __VLS_35;
    const __VLS_36 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleLanguageChange(item.value);
                // @ts-ignore
                [langOptions, appStore, handleLanguageChange,];
            } });
    const { default: __VLS_37 } = __VLS_33.slots;
    if (__VLS_ctx.appStore.language === item.value) {
        let __VLS_38;
        /** @ts-ignore @type { | typeof __VLS_components.Check} */
        Check;
        // @ts-ignore
        const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
            ...{ class: "mr-2 h-4 w-4" },
        }));
        const __VLS_40 = __VLS_39({
            ...{ class: "mr-2 h-4 w-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_39));
        /** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
            ...{ class: "mr-2 w-4" },
        });
        /** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    }
    (item.label);
    // @ts-ignore
    [appStore,];
    var __VLS_33;
    var __VLS_34;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_27;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=LangSelect.vue.js.map