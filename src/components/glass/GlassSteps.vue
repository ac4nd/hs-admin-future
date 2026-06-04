<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import GlassSurface from './GlassSurface.vue'
import { useGlassFilter } from './core/useGlassFilter'

const props = defineProps<{
  class?: HTMLAttributes['class']
  steps: Array<{ title: string; description?: string }>
  current: number
}>()

const { isEnabled } = useGlassFilter('steps')
</script>

<template>
  <GlassSurface
    v-if="isEnabled"
    preset="steps"
    :class="cn('w-full', props.class)"
    :mouse-tracking="false"
  >
    <div class="flex items-center gap-2 px-2">
      <template v-for="(step, i) in steps" :key="i">
        <!-- 步骤圆点 -->
        <div class="flex items-center gap-2">
          <div
            :class="cn(
              'flex items-center justify-center rounded-full text-xs font-medium transition-all size-7',
              i < current && 'bg-primary text-primary-foreground',
              i === current && 'bg-primary text-primary-foreground ring-2 ring-primary/30',
              i > current && 'bg-muted text-muted-foreground',
            )"
          >
            {{ i + 1 }}
          </div>
          <div class="hidden sm:block">
            <div :class="cn('text-sm font-medium', i > current && 'text-muted-foreground')">{{ step.title }}</div>
            <div v-if="step.description" class="text-xs text-muted-foreground">{{ step.description }}</div>
          </div>
        </div>
        <!-- 连接线 -->
        <div
          v-if="i < steps.length - 1"
          :class="cn('flex-1 h-0.5 mx-2', i < current ? 'bg-primary' : 'bg-muted')"
        />
      </template>
    </div>
  </GlassSurface>

  <div v-else :class="cn('w-full', props.class)">
    <div class="flex items-center gap-2">
      <template v-for="(step, i) in steps" :key="i">
        <div class="flex items-center gap-2">
          <div
            :class="cn(
              'flex items-center justify-center rounded-full text-xs font-medium transition-all size-7',
              i < current && 'bg-primary text-primary-foreground',
              i === current && 'bg-primary text-primary-foreground ring-2 ring-primary/30',
              i > current && 'bg-muted text-muted-foreground',
            )"
          >
            {{ i + 1 }}
          </div>
          <div class="hidden sm:block">
            <div :class="cn('text-sm font-medium', i > current && 'text-muted-foreground')">{{ step.title }}</div>
            <div v-if="step.description" class="text-xs text-muted-foreground">{{ step.description }}</div>
          </div>
        </div>
        <div
          v-if="i < steps.length - 1"
          :class="cn('flex-1 h-0.5 mx-2', i < current ? 'bg-primary' : 'bg-muted')"
        />
      </template>
    </div>
  </div>
</template>
