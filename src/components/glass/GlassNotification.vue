<script lang="ts" setup>
import { ref, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import GlassSurface from './GlassSurface.vue'
import { useGlassFilter } from './core/useGlassFilter'

const props = defineProps<{
  class?: HTMLAttributes['class']
  title: string
  description?: string
  closable?: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { isEnabled } = useGlassFilter('notification')
</script>

<template>
  <GlassSurface
    v-if="isEnabled"
    preset="notification"
    :class="cn('w-full max-w-sm', props.class)"
    :mouse-tracking="true"
  >
    <div class="flex items-start gap-3 px-4 py-3">
      <div class="flex-1 min-w-0">
        <div class="text-sm font-medium">{{ title }}</div>
        <div v-if="description" class="text-xs text-muted-foreground mt-1">{{ description }}</div>
        <div class="mt-2"><slot /></div>
      </div>
      <button v-if="closable" class="text-muted-foreground hover:text-foreground text-sm shrink-0" @click="emit('close')">✕</button>
    </div>
  </GlassSurface>

  <div
    v-else
    :class="cn('w-full max-w-sm border rounded-lg p-4 bg-background shadow-lg', props.class)"
  >
    <div class="flex items-start gap-3">
      <div class="flex-1 min-w-0">
        <div class="text-sm font-medium">{{ title }}</div>
        <div v-if="description" class="text-xs text-muted-foreground mt-1">{{ description }}</div>
        <div class="mt-2"><slot /></div>
      </div>
      <button v-if="closable" class="text-muted-foreground hover:text-foreground text-sm shrink-0" @click="emit('close')">✕</button>
    </div>
  </div>
</template>
