import { X } from "@lucide/vue";
import { translateRouteTitle } from "@/utils/i18n";
const __VLS_props = defineProps();
const emit = defineEmits();
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('click');
            // @ts-ignore
            [emit,];
        } },
    ...{ onContextmenu: () => { } },
    ...{ class: "tags-view-item inline-flex items-center gap-1.5 px-3 h-7 rounded-md text-xs cursor-pointer whitespace-nowrap transition-colors select-none" },
    ...{ class: ({
            'bg-primary/10 text-primary border border-primary/20': __VLS_ctx.active,
            'hover:bg-muted/50': !__VLS_ctx.active,
        }) },
});
/** @type {__VLS_StyleScopedClasses['tags-view-item']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-7']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary/10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary/20']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-muted/50']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.MenuIcon} */
MenuIcon;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    icon: (__VLS_ctx.tag.icon),
    ...{ class: "size-3.5" },
}));
const __VLS_2 = __VLS_1({
    icon: (__VLS_ctx.tag.icon),
    ...{ class: "size-3.5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.translateRouteTitle(__VLS_ctx.tag.title));
if (!__VLS_ctx.tag.affix) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ onClick: (...[$event]) => {
                if (!(!__VLS_ctx.tag.affix))
                    return;
                __VLS_ctx.emit('close');
                // @ts-ignore
                [emit, active, active, tag, tag, tag, translateRouteTitle,];
            } },
        ...{ class: "ml-0.5 rounded-sm hover:bg-foreground/10 p-0.5 transition-colors" },
    });
    /** @type {__VLS_StyleScopedClasses['ml-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-foreground/10']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    let __VLS_5;
    /** @ts-ignore @type { | typeof __VLS_components.X} */
    X;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        ...{ class: "h-3 w-3" },
    }));
    const __VLS_7 = __VLS_6({
        ...{ class: "h-3 w-3" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=TagsViewItem.vue.js.map