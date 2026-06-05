<template>
  <div
    class="tags-view-item inline-flex items-center gap-1.5 px-3 h-7 rounded-md text-xs cursor-pointer whitespace-nowrap transition-colors select-none"
    :class="{
      'bg-primary/10 text-primary border border-primary/20': active,
      'hover:bg-muted/50': !active,
    }"
    @click="emit('click')"
    @contextmenu.prevent
  >
    <span class="text-sm">{{ tag.icon || "📄" }}</span>
    <span>{{ translateRouteTitle(tag.title) }}</span>
    <span
      v-if="!tag.affix"
      class="ml-0.5 rounded-sm hover:bg-foreground/10 p-0.5 transition-colors"
      @click.stop="emit('close')"
    >
      <X class="h-3 w-3" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { X } from "@lucide/vue";
import { translateRouteTitle } from "@/utils/i18n";
import type { TagView } from "@/types/ui/tagsview";

defineProps<{
  tag: TagView;
  active: boolean;
}>();

const emit = defineEmits<{
  click: [];
  close: [];
}>();
</script>
