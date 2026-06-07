import { ref, computed } from "vue";
import { Building2, ChevronDown, Check } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
// Mock 数据 — 未来替换为 API
const currentTenantId = ref("default");
const tenantList = ref([
    { label: "默认租户", value: "default" },
    { label: "演示租户", value: "demo" },
]);
const currentTenant = computed(() => tenantList.value.find((t) => t.value === currentTenantId.value));
function switchTenant(id) {
    currentTenantId.value = id;
    // TODO: 调用 API 切换租户，刷新页面
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (__VLS_ctx.tenantList.length > 0) {
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
        size: "sm",
        ...{ class: "gap-1.5 text-xs" },
    }));
    const __VLS_15 = __VLS_14({
        variant: "ghost",
        size: "sm",
        ...{ class: "gap-1.5 text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    const { default: __VLS_18 } = __VLS_16.slots;
    let __VLS_19;
    /** @ts-ignore @type { | typeof __VLS_components.Building2} */
    Building2;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
        ...{ class: "h-3.5 w-3.5" },
    }));
    const __VLS_21 = __VLS_20({
        ...{ class: "h-3.5 w-3.5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "max-w-[100px] truncate" },
    });
    /** @type {__VLS_StyleScopedClasses['max-w-[100px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
    (__VLS_ctx.currentTenant?.label);
    let __VLS_24;
    /** @ts-ignore @type { | typeof __VLS_components.ChevronDown} */
    ChevronDown;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
        ...{ class: "h-3 w-3 opacity-50" },
    }));
    const __VLS_26 = __VLS_25({
        ...{ class: "h-3 w-3 opacity-50" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
    // @ts-ignore
    [tenantList, currentTenant,];
    var __VLS_16;
    // @ts-ignore
    [];
    var __VLS_10;
    let __VLS_29;
    /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuContent | typeof __VLS_components.DropdownMenuContent} */
    DropdownMenuContent;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
        align: "end",
    }));
    const __VLS_31 = __VLS_30({
        align: "end",
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    const { default: __VLS_34 } = __VLS_32.slots;
    for (const [item] of __VLS_vFor((__VLS_ctx.tenantList))) {
        let __VLS_35;
        /** @ts-ignore @type { | typeof __VLS_components.DropdownMenuItem | typeof __VLS_components.DropdownMenuItem} */
        DropdownMenuItem;
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
            ...{ 'onClick': {} },
            key: (item.value),
            disabled: (item.value === __VLS_ctx.currentTenantId),
        }));
        const __VLS_37 = __VLS_36({
            ...{ 'onClick': {} },
            key: (item.value),
            disabled: (item.value === __VLS_ctx.currentTenantId),
        }, ...__VLS_functionalComponentArgsRest(__VLS_36));
        let __VLS_40;
        const __VLS_41 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.tenantList.length > 0))
                        return;
                    __VLS_ctx.switchTenant(item.value);
                    // @ts-ignore
                    [tenantList, currentTenantId, switchTenant,];
                } });
        const { default: __VLS_42 } = __VLS_38.slots;
        if (item.value === __VLS_ctx.currentTenantId) {
            let __VLS_43;
            /** @ts-ignore @type { | typeof __VLS_components.Check} */
            Check;
            // @ts-ignore
            const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
                ...{ class: "mr-2 h-4 w-4" },
            }));
            const __VLS_45 = __VLS_44({
                ...{ class: "mr-2 h-4 w-4" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_44));
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
        [currentTenantId,];
        var __VLS_38;
        var __VLS_39;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_32;
    // @ts-ignore
    [];
    var __VLS_3;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=TenantSwitcher.vue.js.map