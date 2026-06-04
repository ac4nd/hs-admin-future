<script lang="ts" setup>
import { type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import GlassSurface from './GlassSurface.vue'
import { useGlassFilter } from './core/useGlassFilter'

const props = defineProps<{
  class?: HTMLAttributes['class']
  modelValue?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { isEnabled } = useGlassFilter('switch')
</script>

<template>
  <!-- glassEffect 开启：用 Switch 原生组件 + 玻璃外框 -->
  <div v-if="isEnabled" :class="cn('inline-flex items-center', props.class)">
    <GlassSurface
      preset="switch"
      :class="cn('relative cursor-pointer', disabled && 'opacity-50 pointer-events-none')"
      :on-click="disabled ? undefined : () => emit('update:modelValue', !modelValue)"
      :mouse-tracking="true"
      :style="{ width: '44px', height: '24px', padding: '0', borderRadius: '999px' }"
    >
      <div class="relative w-full h-full">
        <!-- 轨道背景色 -->
        <div
          :class="cn('absolute inset-0 rounded-full transition-colors duration-200', modelValue ? 'bg-primary/30' : 'bg-foreground/10')"
        />
        <!-- 滑块圆点 -->
        <div
          class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200"
          :style="{ transform: modelValue ? 'translateX(20px)' : 'translateX(0)' }"
        />
      </div>
    </GlassSurface>
  </div>

  <!-- glassEffect 关闭：原生 Switch -->
  <Switch
    v-else
    :checked="modelValue"
    :disabled="disabled"
    :class="props.class"
    @update:checked="emit('update:modelValue', $event)"
  />
</template>
