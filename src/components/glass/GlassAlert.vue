<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import GlassSurface from './GlassSurface.vue'
import { useGlassFilter } from './core/useGlassFilter'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    variant?: 'default' | 'destructive' | 'success' | 'warning'
    closable?: boolean
  }>(),
  {
    variant: 'default',
    closable: false,
  },
)

const emit = defineEmits<{
  close: []
}>()

const { isEnabled } = useGlassFilter('alert')

const variantIcons: Record<string, string> = {
  default: 'i',
  destructive: '!',
  success: '✓',
  warning: '⚠',
}

const variantColors: Record<string, string> = {
  default: 'text-foreground',
  destructive: 'text-destructive',
  success: 'text-green-500',
  warning: 'text-yellow-500',
}
</script>

<template>
  <GlassSurface
    v-if="isEnabled"
    preset="alert"
    :class="cn('w-full', props.class)"
    :mouse-tracking="false"
  >
    <div class="flex items-start gap-3 px-4 py-3">
      <span :class="cn('text-sm font-bold mt-0.5', variantColors[variant])">{{ variantIcons[variant] }}</span>
      <div class="flex-1 text-sm">
        <slot />
      </div>
      <button v-if="closable" class="text-muted-foreground hover:text-foreground text-sm" @click="emit('close')">✕</button>
    </div>
  </GlassSurface>

  <div
    v-else
    :class="cn(
      'relative w-full rounded-lg border p-4',
      variant === 'destructive' && 'border-destructive/50 text-destructive',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
