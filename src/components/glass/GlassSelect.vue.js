import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useGlassFilter } from "./core/useGlassFilter";
const props = defineProps();
const emit = defineEmits();
const { isEnabled, filterStyle } = useGlassFilter("select");
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
/** @ts-ignore @type { | typeof __VLS_components.Select | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.modelValue),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.modelValue),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ 'update:modelValue': {} },
    { 'onUpdate:modelValue': (...[$event]) => {
            __VLS_ctx.emit('update:modelValue', $event);
            // @ts-ignore
            [modelValue, emit,];
        } });
var __VLS_7;
const { default: __VLS_8 } = __VLS_3.slots;
let __VLS_9;
/** @ts-ignore @type { | typeof __VLS_components.SelectTrigger | typeof __VLS_components.SelectTrigger} */
SelectTrigger;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent1(__VLS_9, new __VLS_9({
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.isEnabled && 'glass-surface border-white/10 bg-transparent', props.class)) },
}));
const __VLS_11 = __VLS_10({
    ...{ class: (__VLS_ctx.cn(__VLS_ctx.isEnabled && 'glass-surface border-white/10 bg-transparent', props.class)) },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
const { default: __VLS_14 } = __VLS_12.slots;
let __VLS_15;
/** @ts-ignore @type { | typeof __VLS_components.SelectValue} */
SelectValue;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
    placeholder: (__VLS_ctx.placeholder),
}));
const __VLS_17 = __VLS_16({
    placeholder: (__VLS_ctx.placeholder),
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
// @ts-ignore
[cn, isEnabled, placeholder,];
var __VLS_12;
let __VLS_20;
/** @ts-ignore @type { | typeof __VLS_components.SelectContent | typeof __VLS_components.SelectContent} */
SelectContent;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
    ...{ class: (__VLS_ctx.isEnabled ? 'glass-surface border-white/10' : '') },
    ...{ style: (__VLS_ctx.isEnabled
            ? {
                ...__VLS_ctx.filterStyle,
                background: 'rgba(18,18,20,0.72)',
                border: '1px solid rgba(255,255,255,0.06)',
            }
            : {}) },
}));
const __VLS_22 = __VLS_21({
    ...{ class: (__VLS_ctx.isEnabled ? 'glass-surface border-white/10' : '') },
    ...{ style: (__VLS_ctx.isEnabled
            ? {
                ...__VLS_ctx.filterStyle,
                background: 'rgba(18,18,20,0.72)',
                border: '1px solid rgba(255,255,255,0.06)',
            }
            : {}) },
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const { default: __VLS_25 } = __VLS_23.slots;
let __VLS_26;
/** @ts-ignore @type { | typeof __VLS_components.SelectGroup | typeof __VLS_components.SelectGroup} */
SelectGroup;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({}));
const __VLS_28 = __VLS_27({}, ...__VLS_functionalComponentArgsRest(__VLS_27));
const { default: __VLS_31 } = __VLS_29.slots;
for (const [opt] of __VLS_vFor((__VLS_ctx.options))) {
    let __VLS_32;
    /** @ts-ignore @type { | typeof __VLS_components.SelectItem | typeof __VLS_components.SelectItem} */
    SelectItem;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
        key: (opt.value),
        value: (opt.value),
        disabled: (opt.disabled),
    }));
    const __VLS_34 = __VLS_33({
        key: (opt.value),
        value: (opt.value),
        disabled: (opt.disabled),
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    const { default: __VLS_37 } = __VLS_35.slots;
    (opt.label);
    // @ts-ignore
    [isEnabled, isEnabled, filterStyle, options,];
    var __VLS_35;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_29;
// @ts-ignore
[];
var __VLS_23;
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
//# sourceMappingURL=GlassSelect.vue.js.map