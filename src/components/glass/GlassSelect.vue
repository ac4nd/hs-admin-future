<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGlassFilter } from './core/useGlassFilter'

const props = defineProps<{
  class?: HTMLAttributes['class']
  modelValue?: string
  placeholder?: string
  options: Array<{ value: string; label: string; disabled?: boolean }>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { isEnabled, filterStyle } = useGlassFilter('select')
</script>

<template>
  <Select :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)">
    <SelectTrigger :class="cn(isEnabled && 'glass-surface border-white/10 bg-transparent', props.class)">
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent
      :class="isEnabled ? 'glass-surface border-white/10' : ''"
      :style="isEnabled ? {
        ...filterStyle,
        background: 'rgba(18,18,20,0.72)',
        border: '1px solid rgba(255,255,255,0.06)',
      } : {}"
    >
      <SelectGroup>
        <SelectItem v-for="opt in options" :key="opt.value" :value="opt.value" :disabled="opt.disabled">
          {{ opt.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
