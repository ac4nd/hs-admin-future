import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import { translateRouteTitle } from "@/utils/i18n";
const route = useRoute();
const router = useRouter();
const breadcrumbs = computed(() => route.matched
    .filter((r) => r.meta?.title && !r.meta?.hidden && !r.meta?.hideInBreadcrumb)
    .map((r) => ({
    title: r.meta.title,
    icon: r.meta.icon,
    path: r.path,
})));
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (__VLS_ctx.breadcrumbs.length > 0) {
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.Breadcrumb | typeof __VLS_components.Breadcrumb} */
    Breadcrumb;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.BreadcrumbList | typeof __VLS_components.BreadcrumbList} */
    BreadcrumbList;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({}));
    const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const { default: __VLS_12 } = __VLS_10.slots;
    for (const [crumb, idx] of __VLS_vFor((__VLS_ctx.breadcrumbs))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.template)({
            key: (crumb.path),
        });
        let __VLS_13;
        /** @ts-ignore @type { | typeof __VLS_components.BreadcrumbItem | typeof __VLS_components.BreadcrumbItem} */
        BreadcrumbItem;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({}));
        const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
        const { default: __VLS_18 } = __VLS_16.slots;
        if (idx < __VLS_ctx.breadcrumbs.length - 1) {
            let __VLS_19;
            /** @ts-ignore @type { | typeof __VLS_components.BreadcrumbLink | typeof __VLS_components.BreadcrumbLink} */
            BreadcrumbLink;
            // @ts-ignore
            const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
                ...{ 'onClick': {} },
                ...{ class: "cursor-pointer text-muted-foreground text-sm inline-flex items-center" },
            }));
            const __VLS_21 = __VLS_20({
                ...{ 'onClick': {} },
                ...{ class: "cursor-pointer text-muted-foreground text-sm inline-flex items-center" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_20));
            let __VLS_24;
            const __VLS_25 = ({ click: {} },
                { onClick: (...[$event]) => {
                        if (!(__VLS_ctx.breadcrumbs.length > 0))
                            return;
                        if (!(idx < __VLS_ctx.breadcrumbs.length - 1))
                            return;
                        __VLS_ctx.router.push(crumb.path);
                        // @ts-ignore
                        [breadcrumbs, breadcrumbs, breadcrumbs, router,];
                    } });
            /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            const { default: __VLS_26 } = __VLS_22.slots;
            if (crumb.icon) {
                let __VLS_27;
                /** @ts-ignore @type { | typeof __VLS_components.MenuIcon} */
                MenuIcon;
                // @ts-ignore
                const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
                    icon: (crumb.icon),
                    ...{ class: "mr-1" },
                }));
                const __VLS_29 = __VLS_28({
                    icon: (crumb.icon),
                    ...{ class: "mr-1" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_28));
                /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
            }
            (__VLS_ctx.translateRouteTitle(crumb.title));
            // @ts-ignore
            [translateRouteTitle,];
            var __VLS_22;
            var __VLS_23;
        }
        else {
            let __VLS_32;
            /** @ts-ignore @type { | typeof __VLS_components.BreadcrumbPage | typeof __VLS_components.BreadcrumbPage} */
            BreadcrumbPage;
            // @ts-ignore
            const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
                ...{ class: "text-sm font-medium inline-flex items-center" },
            }));
            const __VLS_34 = __VLS_33({
                ...{ class: "text-sm font-medium inline-flex items-center" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_33));
            /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
            /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            const { default: __VLS_37 } = __VLS_35.slots;
            if (crumb.icon) {
                let __VLS_38;
                /** @ts-ignore @type { | typeof __VLS_components.MenuIcon} */
                MenuIcon;
                // @ts-ignore
                const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
                    icon: (crumb.icon),
                    ...{ class: "mr-1" },
                }));
                const __VLS_40 = __VLS_39({
                    icon: (crumb.icon),
                    ...{ class: "mr-1" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_39));
                /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
            }
            (__VLS_ctx.translateRouteTitle(crumb.title));
            // @ts-ignore
            [translateRouteTitle,];
            var __VLS_35;
        }
        // @ts-ignore
        [];
        var __VLS_16;
        if (idx < __VLS_ctx.breadcrumbs.length - 1) {
            let __VLS_43;
            /** @ts-ignore @type { | typeof __VLS_components.BreadcrumbSeparator} */
            BreadcrumbSeparator;
            // @ts-ignore
            const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({}));
            const __VLS_45 = __VLS_44({}, ...__VLS_functionalComponentArgsRest(__VLS_44));
        }
        // @ts-ignore
        [breadcrumbs,];
    }
    // @ts-ignore
    [];
    var __VLS_10;
    // @ts-ignore
    [];
    var __VLS_3;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=LayoutBreadcrumb.vue.js.map