import { computed, ref } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
const props = defineProps();
const emit = defineEmits();
const weekDays = ["一", "二", "三", "四", "五", "六", "日"];
const viewDate = ref(new Date());
const tempStart = ref(props.modelValue?.start);
const tempEnd = ref(props.modelValue?.end);
const monthLabel = computed(() => {
    const d = viewDate.value;
    return `${d.getFullYear()}年${d.getMonth() + 1}月`;
});
const calendarDays = computed(() => {
    const year = viewDate.value.getFullYear();
    const month = viewDate.value.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    // 周一为第一天
    let startDow = firstDay.getDay() - 1;
    if (startDow < 0)
        startDow = 6;
    const days = [];
    // 上月填充
    for (let i = startDow - 1; i >= 0; i--) {
        const d = new Date(year, month, -i);
        days.push({ date: d, dateStr: toStr(d), day: d.getDate(), otherMonth: true });
    }
    // 本月
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const d = new Date(year, month, i);
        days.push({ date: d, dateStr: toStr(d), day: i, otherMonth: false });
    }
    // 下月填充
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
        const d = new Date(year, month + 1, i);
        days.push({ date: d, dateStr: toStr(d), day: i, otherMonth: true });
    }
    return days;
});
function toStr(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function dayClass(day) {
    if (day.otherMonth)
        return "text-muted-foreground/40 cursor-default";
    const str = day.dateStr;
    const startStr = tempStart.value ? toStr(tempStart.value) : "";
    const endStr = tempEnd.value ? toStr(tempEnd.value) : "";
    const isStart = str === startStr;
    const isEnd = str === endStr;
    if (isStart || isEnd) {
        return "bg-primary text-primary-foreground";
    }
    if (tempStart.value && tempEnd.value && day.date > tempStart.value && day.date < tempEnd.value) {
        return "bg-primary/10";
    }
    return "hover:bg-muted";
}
function selectDay(day) {
    if (day.otherMonth)
        return;
    if (!tempStart.value || (tempStart.value && tempEnd.value)) {
        // 开始新的选择
        tempStart.value = day.date;
        tempEnd.value = undefined;
    }
    else {
        // 选择结束日期
        if (day.date < tempStart.value) {
            tempEnd.value = tempStart.value;
            tempStart.value = day.date;
        }
        else {
            tempEnd.value = day.date;
        }
    }
}
function prevMonth() {
    const d = new Date(viewDate.value);
    d.setMonth(d.getMonth() - 1);
    viewDate.value = d;
}
function nextMonth() {
    const d = new Date(viewDate.value);
    d.setMonth(d.getMonth() + 1);
    viewDate.value = d;
}
function clearRange() {
    tempStart.value = undefined;
    tempEnd.value = undefined;
    emit("update:modelValue", undefined);
}
function confirmRange() {
    if (tempStart.value && tempEnd.value) {
        emit("update:modelValue", { start: tempStart.value, end: tempEnd.value });
    }
}
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
    ...{ class: "p-3" },
});
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between mb-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "icon-xs",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "icon-xs",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (__VLS_ctx.prevMonth) });
const { default: __VLS_7 } = __VLS_3.slots;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.ChevronLeftIcon} */
ChevronLeftIcon;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    ...{ class: "size-4" },
}));
const __VLS_10 = __VLS_9({
    ...{ class: "size-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
// @ts-ignore
[prevMonth,];
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-sm font-medium" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
(__VLS_ctx.monthLabel);
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "icon-xs",
}));
const __VLS_15 = __VLS_14({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "icon-xs",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_18;
const __VLS_19 = ({ click: {} },
    { onClick: (__VLS_ctx.nextMonth) });
const { default: __VLS_20 } = __VLS_16.slots;
let __VLS_21;
/** @ts-ignore @type { | typeof __VLS_components.ChevronRightIcon} */
ChevronRightIcon;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
    ...{ class: "size-4" },
}));
const __VLS_23 = __VLS_22({
    ...{ class: "size-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
// @ts-ignore
[monthLabel, nextMonth,];
var __VLS_16;
var __VLS_17;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-7 gap-0 text-center text-xs" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-7']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
for (const [d] of __VLS_vFor((__VLS_ctx.weekDays))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (d),
        ...{ class: "py-1 text-muted-foreground font-medium" },
    });
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    (d);
    // @ts-ignore
    [weekDays,];
}
for (const [day] of __VLS_vFor((__VLS_ctx.calendarDays))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selectDay(day);
                // @ts-ignore
                [calendarDays, selectDay,];
            } },
        key: (day.dateStr),
        ...{ class: "h-8 text-sm rounded-md transition-colors" },
        ...{ class: (__VLS_ctx.dayClass(day)) },
        disabled: (day.otherMonth),
    });
    /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    (day.day);
    // @ts-ignore
    [dayClass,];
}
let __VLS_26;
/** @ts-ignore @type { | typeof __VLS_components.Separator} */
Separator;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
    ...{ class: "my-3" },
}));
const __VLS_28 = __VLS_27({
    ...{ class: "my-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
/** @type {__VLS_StyleScopedClasses['my-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
if (__VLS_ctx.modelValue?.start) {
    (__VLS_ctx.modelValue.start.toLocaleDateString());
    if (__VLS_ctx.modelValue.end) {
        (__VLS_ctx.modelValue.end.toLocaleDateString());
    }
}
else {
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex gap-1" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
let __VLS_31;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "xs",
}));
const __VLS_33 = __VLS_32({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "xs",
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
let __VLS_36;
const __VLS_37 = ({ click: {} },
    { onClick: (__VLS_ctx.clearRange) });
const { default: __VLS_38 } = __VLS_34.slots;
// @ts-ignore
[modelValue, modelValue, modelValue, modelValue, clearRange,];
var __VLS_34;
var __VLS_35;
let __VLS_39;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
    ...{ 'onClick': {} },
    size: "xs",
}));
const __VLS_41 = __VLS_40({
    ...{ 'onClick': {} },
    size: "xs",
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
let __VLS_44;
const __VLS_45 = ({ click: {} },
    { onClick: (__VLS_ctx.confirmRange) });
const { default: __VLS_46 } = __VLS_42.slots;
// @ts-ignore
[confirmRange,];
var __VLS_42;
var __VLS_43;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=CalendarRange.vue.js.map