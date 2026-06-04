<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import GlassSurface from './GlassSurface.vue'
import { useGlassFilter } from './core/useGlassFilter'

const props = defineProps<{
  class?: HTMLAttributes['class']
  items: Array<{
    id: string | number
    title: string
    description?: string
    time?: string
    dotColor?: string
  }>
}>()

const { isEnabled } = useGlassFilter('timeline')
</script>

<template>
  <GlassSurface
    v-if="isEnabled"
    preset="timeline"
    :class="cn('w-full', props.class)"
    :mouse-tracking="false"
  >
    <div class="relative pl-6 space-y-4">
      <!-- 竖线 -->
      <div class="absolute left-[7px] top-2 bottom-2 w-px bg-foreground/10" />
      <div v-for="item in items" :key="item.id" class="relative">
        <div
          :class="cn('absolute -left-6 top-1.5 size-3.5 rounded-full border-2 border-background', item.dotColor ?? 'bg-primary')"
        />
        <div class="text-sm font-medium">{{ item.title }}</div>
        <div v-if="item.description" class="text-xs text-muted-foreground mt-0.5">{{ item.description }}</div>
        <div v-if="item.time" class="text-xs text-muted-foreground/60 mt-0.5">{{ item.time }}</div>
      </div>
    </div>
  </GlassSurface>

  <div v-else :class="cn('relative pl-6 space-y-4', props.class)">
    <div class="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
    <div v-for="item in items" :key="item.id" class="relative">
      <div
        :class="cn('absolute -left-6 top-1.5 size-3.5 rounded-full border-2 border-background', item.dotColor ?? 'bg-primary')"
      />
      <div class="text-sm font-medium">{{ item.title }}</div>
      <div v-if="item.description" class="text-xs text-muted-foreground mt-0.5">{{ item.description }}</div>
      <div v-if="item.time" class="text-xs text-muted-foreground/60 mt-0.5">{{ item.time }}</div>
    </div>
  </div>
</template>
