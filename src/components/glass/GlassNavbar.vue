<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import GlassSurface from './GlassSurface.vue'
import { useGlassFilter } from './core/useGlassFilter'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    fixed?: boolean
    height?: string
  }>(),
  {
    fixed: false,
    height: 'var(--navbar-height)',
  },
)

const { isEnabled } = useGlassFilter('navbar')
</script>

<template>
  <GlassSurface
    v-if="isEnabled"
    preset="navbar"
    :class="cn('w-full', fixed && 'fixed top-0 inset-x-0 z-50', props.class)"
    :style="{ height }"
  >
    <nav class="flex items-center gap-4 text-sm h-full px-4">
      <slot />
    </nav>
  </GlassSurface>

  <div
    v-else
    :class="cn('w-full border-b border-border', fixed && 'fixed top-0 inset-x-0 z-50 bg-background', props.class)"
    :style="{ height }"
  >
    <nav class="flex items-center gap-4 text-sm h-full px-4">
      <slot />
    </nav>
  </div>
</template>
