import { computed } from "vue";
import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = withDefaults(defineProps(), { pageSize: 10, current: 1 });
const emit = defineEmits();
const { isEnabled } = useGlassFilter("pagination");
const totalPages = computed(() => Math.ceil(props.total / props.pageSize));
const current = computed({
    get: () => props.current,
    set: (v) => emit("update:current", v),
});
const pages = computed(() => {
    const total = totalPages.value;
    const cur = current.value;
    const result = [];
    if (total <= 7) {
        for (let i = 1; i <= total; i++)
            result.push(i);
    }
    else {
        result.push(1);
        if (cur > 3)
            result.push("ellipsis");
        for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++)
            result.push(i);
        if (cur < total - 2)
            result.push("ellipsis");
        result.push(total);
    }
    return result;
});
const btnBase = "inline-flex items-center justify-center h-8 min-w-8 px-1.5 text-sm rounded-md transition-colors cursor-pointer select-none";
const btnDefault = "hover:bg-white/10 text-foreground/70";
const btnActive = "bg-primary text-primary-foreground font-medium";
const btnDisabled = "opacity-40 pointer-events-none";
const __VLS_defaults = { pageSize: 10, current: 1 };
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
if (__VLS_ctx.isEnabled) {
    const __VLS_0 = GlassSurface || GlassSurface;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        preset: "pagination",
        ...{ class: (__VLS_ctx.cn('inline-flex items-center gap-1', props.class)) },
        mouseTracking: (false),
    }));
    const __VLS_2 = __VLS_1({
        preset: "pagination",
        ...{ class: (__VLS_ctx.cn('inline-flex items-center gap-1', props.class)) },
        mouseTracking: (false),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5;
    const { default: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isEnabled))
                    return;
                __VLS_ctx.current = Math.max(1, __VLS_ctx.current - 1);
                // @ts-ignore
                [isEnabled, cn, current, current,];
            } },
        ...{ class: (__VLS_ctx.cn(__VLS_ctx.btnBase, __VLS_ctx.btnDefault, __VLS_ctx.current <= 1 && __VLS_ctx.btnDisabled)) },
    });
    for (const [p, i] of __VLS_vFor((__VLS_ctx.pages))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.template)({
            key: (i),
        });
        if (p === 'ellipsis') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "px-1 text-muted-foreground text-sm select-none" },
            });
            /** @type {__VLS_StyleScopedClasses['px-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.isEnabled))
                            return;
                        if (!!(p === 'ellipsis'))
                            return;
                        __VLS_ctx.current = p;
                        // @ts-ignore
                        [cn, current, current, btnBase, btnDefault, btnDisabled, pages,];
                    } },
                ...{ class: (__VLS_ctx.cn(__VLS_ctx.btnBase, p === __VLS_ctx.current ? __VLS_ctx.btnActive : __VLS_ctx.btnDefault)) },
            });
            (p);
        }
        // @ts-ignore
        [cn, current, btnBase, btnDefault, btnActive,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isEnabled))
                    return;
                __VLS_ctx.current = Math.min(__VLS_ctx.totalPages, __VLS_ctx.current + 1);
                // @ts-ignore
                [current, current, totalPages,];
            } },
        ...{ class: (__VLS_ctx.cn(__VLS_ctx.btnBase, __VLS_ctx.btnDefault, __VLS_ctx.current >= __VLS_ctx.totalPages && __VLS_ctx.btnDisabled)) },
    });
    // @ts-ignore
    [cn, current, btnBase, btnDefault, btnDisabled, totalPages,];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (__VLS_ctx.cn('inline-flex items-center gap-1', props.class)) },
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.isEnabled))
                    return;
                __VLS_ctx.current = Math.max(1, __VLS_ctx.current - 1);
                // @ts-ignore
                [cn, current, current,];
            } },
        ...{ class: (__VLS_ctx.cn(__VLS_ctx.btnBase, 'border', __VLS_ctx.btnDefault, __VLS_ctx.current <= 1 && __VLS_ctx.btnDisabled)) },
    });
    for (const [p, i] of __VLS_vFor((__VLS_ctx.pages))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.template)({
            key: (i),
        });
        if (p === 'ellipsis') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "px-1 text-muted-foreground text-sm" },
            });
            /** @type {__VLS_StyleScopedClasses['px-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.isEnabled))
                            return;
                        if (!!(p === 'ellipsis'))
                            return;
                        __VLS_ctx.current = p;
                        // @ts-ignore
                        [cn, current, current, btnBase, btnDefault, btnDisabled, pages,];
                    } },
                ...{ class: (__VLS_ctx.cn(__VLS_ctx.btnBase, 'border', p === __VLS_ctx.current ? __VLS_ctx.btnActive : __VLS_ctx.btnDefault)) },
            });
            (p);
        }
        // @ts-ignore
        [cn, current, btnBase, btnDefault, btnActive,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.isEnabled))
                    return;
                __VLS_ctx.current = Math.min(__VLS_ctx.totalPages, __VLS_ctx.current + 1);
                // @ts-ignore
                [current, current, totalPages,];
            } },
        ...{ class: (__VLS_ctx.cn(__VLS_ctx.btnBase, 'border', __VLS_ctx.btnDefault, __VLS_ctx.current >= __VLS_ctx.totalPages && __VLS_ctx.btnDisabled)) },
    });
}
// @ts-ignore
[cn, current, btnBase, btnDefault, btnDisabled, totalPages,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=GlassPagination.vue.js.map