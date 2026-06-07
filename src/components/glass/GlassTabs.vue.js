import { cn } from "@/lib/utils";
import { Tabs, TabsList } from "@/components/ui/tabs";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";
const props = defineProps();
const emit = defineEmits();
const { isEnabled } = useGlassFilter("tabs");
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
/** @ts-ignore @type { | typeof __VLS_components.Tabs | typeof __VLS_components.Tabs} */
Tabs;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:modelValue': {} },
    defaultValue: (__VLS_ctx.defaultValue),
    modelValue: (__VLS_ctx.modelValue),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:modelValue': {} },
    defaultValue: (__VLS_ctx.defaultValue),
    modelValue: (__VLS_ctx.modelValue),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ 'update:modelValue': {} },
    { 'onUpdate:modelValue': (...[$event]) => {
            __VLS_ctx.emit('update:modelValue', $event);
            // @ts-ignore
            [defaultValue, modelValue, emit,];
        } });
var __VLS_7;
const { default: __VLS_8 } = __VLS_3.slots;
if (__VLS_ctx.isEnabled) {
    const __VLS_9 = GlassSurface || GlassSurface;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent1(__VLS_9, new __VLS_9({
        preset: "tabs",
        ...{ class: (__VLS_ctx.cn('inline-flex w-fit mb-2', props.class)) },
        mouseTracking: (false),
    }));
    const __VLS_11 = __VLS_10({
        preset: "tabs",
        ...{ class: (__VLS_ctx.cn('inline-flex w-fit mb-2', props.class)) },
        mouseTracking: (false),
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    const { default: __VLS_14 } = __VLS_12.slots;
    let __VLS_15;
    /** @ts-ignore @type { | typeof __VLS_components.TabsList | typeof __VLS_components.TabsList} */
    TabsList;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
        ...{ class: "bg-transparent" },
    }));
    const __VLS_17 = __VLS_16({
        ...{ class: "bg-transparent" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    /** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
    const { default: __VLS_20 } = __VLS_18.slots;
    var __VLS_21 = {};
    // @ts-ignore
    [isEnabled, cn,];
    var __VLS_18;
    // @ts-ignore
    [];
    var __VLS_12;
}
else {
    let __VLS_23;
    /** @ts-ignore @type { | typeof __VLS_components.TabsList | typeof __VLS_components.TabsList} */
    TabsList;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
        ...{ class: (props.class) },
    }));
    const __VLS_25 = __VLS_24({
        ...{ class: (props.class) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    const { default: __VLS_28 } = __VLS_26.slots;
    var __VLS_29 = {};
    // @ts-ignore
    [];
    var __VLS_26;
}
var __VLS_31 = {};
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
// @ts-ignore
var __VLS_22 = __VLS_21, __VLS_30 = __VLS_29, __VLS_32 = __VLS_31;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=GlassTabs.vue.js.map