<script lang="ts" setup>
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useGlassFilter } from './core/useGlassFilter'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    open?: boolean
    side?: 'top' | 'right' | 'bottom' | 'left'
  }>(),
  { side: 'right' },
)

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const { isEnabled, filterStyle } = useGlassFilter('drawer')

const openModel = computed({
  get: () => props.open,
  set: (v: boolean) => emit('update:open', v),
})
</script>

<template>
  <Sheet v-model:open="openModel">
    <!-- 仅在有 trigger slot 时渲染 -->
    <SheetTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </SheetTrigger>

    <SheetContent
      :side="side"
      :class="cn(
        isEnabled && 'border-white/10',
        props.class,
      )"
      :style="isEnabled ? {
        ...filterStyle,
        background: 'rgba(18,18,20,0.72)',
        isolation: 'isolate',
        overflow: 'hidden',
      } : {}"
    >
      <SheetHeader>
        <SheetTitle v-if="$slots.title"><slot name="title" /></SheetTitle>
        <SheetDescription v-if="$slots.description"><slot name="description" /></SheetDescription>
      </SheetHeader>
      <slot />
      <SheetFooter v-if="$slots.footer">
        <slot name="footer" />
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
