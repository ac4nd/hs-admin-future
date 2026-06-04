<script lang="ts" setup>
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import GlassSurface from './GlassSurface.vue'
import { useGlassFilter } from './core/useGlassFilter'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    total: number
    pageSize?: number
    current?: number
  }>(),
  { pageSize: 10, current: 1 },
)

const emit = defineEmits<{
  'update:current': [value: number]
}>()

const { isEnabled } = useGlassFilter('pagination')

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

const current = computed({
  get: () => props.current,
  set: (v: number) => emit('update:current', v),
})

const pages = computed(() => {
  const total = totalPages.value
  const cur = current.value
  const result: (number | 'ellipsis')[] = []
  if (total <= 7) {
    for (let i = 1; i <= total; i++) result.push(i)
  } else {
    result.push(1)
    if (cur > 3) result.push('ellipsis')
    for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) result.push(i)
    if (cur < total - 2) result.push('ellipsis')
    result.push(total)
  }
  return result
})

const btnBase = 'inline-flex items-center justify-center h-8 min-w-8 px-1.5 text-sm rounded-md transition-colors cursor-pointer select-none'
const btnDefault = 'hover:bg-white/10 text-foreground/70'
const btnActive = 'bg-primary text-primary-foreground font-medium'
const btnDisabled = 'opacity-40 pointer-events-none'
</script>

<template>
  <GlassSurface
    v-if="isEnabled"
    preset="pagination"
    :class="cn('inline-flex items-center gap-1', props.class)"
    :mouse-tracking="false"
  >
    <!-- 上一页 -->
    <button
      :class="cn(btnBase, btnDefault, current <= 1 && btnDisabled)"
      @click="current = Math.max(1, current - 1)"
    >&lsaquo;</button>

    <!-- 页码 -->
    <template v-for="(p, i) in pages" :key="i">
      <span v-if="p === 'ellipsis'" class="px-1 text-muted-foreground text-sm select-none">&hellip;</span>
      <button
        v-else
        :class="cn(btnBase, p === current ? btnActive : btnDefault)"
        @click="current = p as number"
      >{{ p }}</button>
    </template>

    <!-- 下一页 -->
    <button
      :class="cn(btnBase, btnDefault, current >= totalPages && btnDisabled)"
      @click="current = Math.min(totalPages, current + 1)"
    >&rsaquo;</button>
  </GlassSurface>

  <!-- 非玻璃模式 -->
  <div v-else :class="cn('inline-flex items-center gap-1', props.class)">
    <button
      :class="cn(btnBase, 'border', btnDefault, current <= 1 && btnDisabled)"
      @click="current = Math.max(1, current - 1)"
    >&lsaquo;</button>
    <template v-for="(p, i) in pages" :key="i">
      <span v-if="p === 'ellipsis'" class="px-1 text-muted-foreground text-sm">&hellip;</span>
      <button
        v-else
        :class="cn(btnBase, 'border', p === current ? btnActive : btnDefault)"
        @click="current = p as number"
      >{{ p }}</button>
    </template>
    <button
      :class="cn(btnBase, 'border', btnDefault, current >= totalPages && btnDisabled)"
      @click="current = Math.min(totalPages, current + 1)"
    >&rsaquo;</button>
  </div>
</template>
