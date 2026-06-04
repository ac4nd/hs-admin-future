<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import GlassSurface from './GlassSurface.vue'
import { useGlassFilter } from './core/useGlassFilter'

const props = defineProps<{
  class?: HTMLAttributes['class']
  modelValue?: string
  disabled?: boolean
  min?: string
  max?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { isEnabled } = useGlassFilter('date-picker')
</script>

<template>
  <GlassSurface
    v-if="isEnabled"
    preset="date-picker"
    :class="cn('w-full', props.class)"
  >
    <input
      type="date"
      :value="modelValue"
      :disabled="disabled"
      :min="min"
      :max="max"
      class="w-full bg-transparent outline-none text-sm h-8 px-3 disabled:opacity-50 disabled:cursor-not-allowed [color-scheme:dark]"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </GlassSurface>

  <input
    v-else
    type="date"
    :value="modelValue"
    :disabled="disabled"
    :min="min"
    :max="max"
    :class="cn(
      'flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
