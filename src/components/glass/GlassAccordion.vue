<template>
  <div :class="cn('w-full space-y-2', props.class)">
    <GlassSurface
      v-for="item in items"
      :key="item.id"
      :preset="isEnabled ? 'accordion' : 'button'"
      :class="cn('w-full', !isEnabled && 'border rounded-lg')"
      :mouse-tracking="false"
    >
      <button
        class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium"
        @click="toggle(item.id)"
      >
        <span>{{ item.title }}</span>
        <svg
          :class="cn('size-4 transition-transform', openItems.has(item.id) && 'rotate-180')"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div v-if="openItems.has(item.id)" class="px-4 pb-3 text-sm text-muted-foreground">
        {{ item.content }}
      </div>
    </GlassSurface>
  </div>
</template>

<script lang="ts" setup>
import { ref, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  items: Array<{ id: string | number; title: string; content: string }>;
  multiple?: boolean;
}>();

const { isEnabled } = useGlassFilter("accordion");

const openItems = ref<Set<string | number>>(new Set());

function toggle(id: string | number) {
  if (openItems.value.has(id)) {
    openItems.value.delete(id);
  } else {
    if (!props.multiple) openItems.value.clear();
    openItems.value.add(id);
  }
  // 触发响应式更新
  openItems.value = new Set(openItems.value);
}
</script>
