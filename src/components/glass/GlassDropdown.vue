<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useGlassFilter } from './core/useGlassFilter'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { isEnabled, filterStyle } = useGlassFilter('dropdown')
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <slot name="trigger" />
    </DropdownMenuTrigger>
    <DropdownMenuContent
      :class="cn(
        isEnabled && 'glass-surface',
        props.class,
      )"
      :style="isEnabled ? {
        ...filterStyle,
        background: 'rgba(18,18,20,0.72)',
        border: '1px solid rgba(255,255,255,0.06)',
      } : {}"
    >
      <!-- default slot 放菜单项 -->
      <slot />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
