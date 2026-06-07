import { Maximize, Minimize } from "@lucide/vue";
import { useFullscreen } from "@vueuse/core";
import { Button } from "@/components/ui/button";
const { isFullscreen, toggle } = useFullscreen();
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
            __VLS_ctx.toggle();
            // @ts-ignore
            [toggle,];
        } });
var __VLS_7;
const { default: __VLS_8 } = __VLS_3.slots;
const __VLS_9 = (__VLS_ctx.isFullscreen ? __VLS_ctx.Minimize : __VLS_ctx.Maximize);
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent1(__VLS_9, new __VLS_9({
    ...{ class: "h-4 w-4" },
}));
const __VLS_11 = __VLS_10({
    ...{ class: "h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
// @ts-ignore
[isFullscreen, Minimize, Maximize,];
var __VLS_3;
var __VLS_4;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=FullscreenButton.vue.js.map