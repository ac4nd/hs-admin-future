<template>
  <GlassSurface v-if="isEnabled" preset="carousel" :class="cn('w-full', props.class)">
    <div class="relative overflow-hidden">
      <div
        class="flex transition-transform duration-300"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div v-for="item in items" :key="item.id" class="w-full shrink-0">
          <slot :item="item" />
        </div>
      </div>
    </div>
    <div v-if="items.length > 1" class="flex items-center justify-center gap-2 pt-3">
      <button
        class="text-sm text-muted-foreground hover:text-foreground transition-colors px-2"
        @click="prev"
      >
        &lt;
      </button>
      <div class="flex gap-1">
        <span
          v-for="(_, i) in items"
          :key="i"
          :class="
            cn(
              'inline-block h-1.5 rounded-full transition-all',
              i === currentIndex ? 'w-4 bg-foreground' : 'w-1.5 bg-foreground/30'
            )
          "
        />
      </div>
      <button
        class="text-sm text-muted-foreground hover:text-foreground transition-colors px-2"
        @click="next"
      >
        &gt;
      </button>
    </div>
  </GlassSurface>

  <div v-else :class="cn('w-full border rounded-xl overflow-hidden', props.class)">
    <div class="relative overflow-hidden">
      <div
        class="flex transition-transform duration-300"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div v-for="item in items" :key="item.id" class="w-full shrink-0">
          <slot :item="item" />
        </div>
      </div>
    </div>
    <div v-if="items.length > 1" class="flex items-center justify-center gap-2 pt-3 pb-2">
      <button
        class="text-sm text-muted-foreground hover:text-foreground transition-colors px-2"
        @click="prev"
      >
        &lt;
      </button>
      <div class="flex gap-1">
        <span
          v-for="(_, i) in items"
          :key="i"
          :class="
            cn(
              'inline-block h-1.5 rounded-full transition-all',
              i === currentIndex ? 'w-4 bg-foreground' : 'w-1.5 bg-foreground/30'
            )
          "
        />
      </div>
      <button
        class="text-sm text-muted-foreground hover:text-foreground transition-colors px-2"
        @click="next"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  items: Array<{ id: string | number }>;
}>();

const { isEnabled } = useGlassFilter("carousel");

const currentIndex = ref(0);

function prev() {
  currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length;
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.items.length;
}
</script>
