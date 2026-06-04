<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import GlassSurface from './GlassSurface.vue'
import { useGlassFilter } from './core/useGlassFilter'

const props = defineProps<{
  class?: HTMLAttributes['class']
  bordered?: boolean
}>()

const { isEnabled } = useGlassFilter('list')
</script>

<template>
  <GlassSurface
    v-if="isEnabled"
    preset="list"
    :class="cn('w-full', props.class)"
    :mouse-tracking="false"
  >
    <div :class="cn('divide-y divide-white/5', bordered && 'divide-white/10')">
      <slot />
    </div>
  </GlassSurface>

  <div v-else :class="cn('w-full border rounded-lg divide-y', props.class)">
    <slot />
  </div>
</template>
