<template>
  <div>
    <DocSection :title="title" />
    <div class="flex flex-col gap-2.5">
      <GlassSurface
        v-for="item in items"
        :key="item.id"
        preset="accordion"
        :mouse-tracking="false"
        class="rounded-xl overflow-hidden"
      >
        <button
          class="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium hover:bg-white/4 transition-colors"
          @click="toggle(item.id)"
        >
          <span class="flex items-center gap-2.5">
            <span class="size-1.5 rounded-full bg-emerald-400" />
            {{ item.title }}
          </span>
          <ChevronDownIcon
            :class="
              cn(
                'size-4 text-muted-foreground transition-transform',
                openId === item.id && 'rotate-180'
              )
            "
          />
        </button>
        <div
          v-if="openId === item.id"
          class="px-4 pb-4 text-sm text-muted-foreground doc-manual-content"
          v-html="item.content"
        />
      </GlassSurface>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ChevronDownIcon } from "@lucide/vue";
import { cn } from "@/lib/utils";
import GlassSurface from "@/components/glass/GlassSurface.vue";
import DocSection from "./DocSection.vue";

interface ManualItem {
  id: string;
  title: string;
  content: string;
}

defineProps<{
  title: string;
  items: ManualItem[];
}>();

const openId = ref<string | null>(null);

function toggle(id: string) {
  openId.value = openId.value === id ? null : id;
}
</script>

<style scoped>
.doc-manual-content :deep(ul) {
  padding-left: 18px;
  list-style: disc;
}
.doc-manual-content :deep(li) {
  margin-bottom: 4px;
}
.doc-manual-content :deep(p) {
  margin-bottom: 8px;
}
.doc-manual-content :deep(code) {
  background: rgba(255, 255, 255, 0.06);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-family: "SF Mono", "Fira Code", monospace;
}
.doc-manual-content :deep(pre) {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 8px;
  font-size: 12px;
  font-family: "SF Mono", "Fira Code", monospace;
  overflow-x: auto;
}
.doc-manual-content :deep(pre code) {
  background: none;
  padding: 0;
}
.doc-manual-content :deep(.cmd) {
  color: #fff;
}
.doc-manual-content :deep(.comment) {
  color: rgba(255, 255, 255, 0.35);
}
.doc-manual-content :deep(strong) {
  color: #e2e8f0;
  font-weight: 600;
}
</style>
