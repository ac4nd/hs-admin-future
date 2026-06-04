<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import GlassSurface from './GlassSurface.vue'
import { useGlassFilter } from './core/useGlassFilter'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    size?: number
    rounded?: boolean
  }>(),
  {
    size: 36,
    rounded: true,
  },
)

const { isEnabled } = useGlassFilter('icon')
</script>

<template>
  <GlassSurface
    v-if="isEnabled"
    preset="icon"
    :class="cn(
      'inline-flex items-center justify-center',
      rounded ? 'rounded-full' : 'rounded-xl',
      props.class,
    )"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <slot />
  </GlassSurface>

  <span
    v-else
    :class="cn(
      'inline-flex items-center justify-center bg-muted rounded-full',
      props.class,
    )"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <slot />
  </span>
</template>
