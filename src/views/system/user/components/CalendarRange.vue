<template>
  <div class="p-3">
    <div class="flex items-center justify-between mb-3">
      <Button variant="ghost" size="icon-xs" @click="prevMonth">
        <ChevronLeftIcon class="size-4" />
      </Button>
      <span class="text-sm font-medium">{{ monthLabel }}</span>
      <Button variant="ghost" size="icon-xs" @click="nextMonth">
        <ChevronRightIcon class="size-4" />
      </Button>
    </div>

    <div class="grid grid-cols-7 gap-0 text-center text-xs">
      <div v-for="d in weekDays" :key="d" class="py-1 text-muted-foreground font-medium">
        {{ d }}
      </div>
      <button
        v-for="day in calendarDays"
        :key="day.dateStr"
        class="h-8 text-sm rounded-md transition-colors"
        :class="dayClass(day)"
        :disabled="day.otherMonth"
        @click="selectDay(day)"
      >
        {{ day.day }}
      </button>
    </div>

    <Separator class="my-3" />

    <div class="flex items-center justify-between">
      <span class="text-xs text-muted-foreground">
        <template v-if="modelValue?.start">
          {{ modelValue.start.toLocaleDateString() }}
          <template v-if="modelValue.end">~ {{ modelValue.end.toLocaleDateString() }}</template>
        </template>
        <template v-else>选择日期范围</template>
      </span>
      <div class="flex gap-1">
        <Button variant="ghost" size="xs" @click="clearRange">清除</Button>
        <Button size="xs" @click="confirmRange">确定</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const props = defineProps<{
  modelValue?: { start: Date; end: Date };
}>();

const emit = defineEmits<{
  "update:modelValue": [value: { start: Date; end: Date } | undefined];
}>();

const weekDays = ["一", "二", "三", "四", "五", "六", "日"];

const viewDate = ref(new Date());
const tempStart = ref<Date | undefined>(props.modelValue?.start);
const tempEnd = ref<Date | undefined>(props.modelValue?.end);

const monthLabel = computed(() => {
  const d = viewDate.value;
  return `${d.getFullYear()}年${d.getMonth() + 1}月`;
});

interface CalendarDay {
  date: Date;
  dateStr: string;
  day: number;
  otherMonth: boolean;
}

const calendarDays = computed<CalendarDay[]>(() => {
  const year = viewDate.value.getFullYear();
  const month = viewDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 周一为第一天
  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;

  const days: CalendarDay[] = [];

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

function toStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function dayClass(day: CalendarDay) {
  if (day.otherMonth) return "text-muted-foreground/40 cursor-default";

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

function selectDay(day: CalendarDay) {
  if (day.otherMonth) return;

  if (!tempStart.value || (tempStart.value && tempEnd.value)) {
    // 开始新的选择
    tempStart.value = day.date;
    tempEnd.value = undefined;
  } else {
    // 选择结束日期
    if (day.date < tempStart.value) {
      tempEnd.value = tempStart.value;
      tempStart.value = day.date;
    } else {
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
</script>
