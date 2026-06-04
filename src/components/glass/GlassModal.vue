<script lang="ts" setup>
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useGlassFilter } from './core/useGlassFilter'

const props = defineProps<{
  class?: HTMLAttributes['class']
  open?: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const { isEnabled, filterStyle, cornerRadius } = useGlassFilter('modal')

const openModel = computed({
  get: () => props.open,
  set: (v: boolean) => emit('update:open', v),
})
</script>

<template>
  <Dialog v-model:open="openModel">
    <!-- 仅在有 trigger slot 时渲染 -->
    <DialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>

    <DialogContent
      :class="cn(
        isEnabled && 'border-white/10',
        isEnabled && '[&>button]:text-white',
        props.class,
      )"
      :style="isEnabled ? {
        ...filterStyle,
        background: 'rgba(18,18,20,0.72)',
        isolation: 'isolate',
        overflow: 'hidden',
        borderRadius: `${cornerRadius}px`,
      } : {}"
    >
      <DialogHeader>
        <DialogTitle v-if="$slots.title"><slot name="title" /></DialogTitle>
        <DialogDescription v-if="$slots.description"><slot name="description" /></DialogDescription>
      </DialogHeader>
      <slot />
      <DialogFooter v-if="$slots.footer">
        <slot name="footer" />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
