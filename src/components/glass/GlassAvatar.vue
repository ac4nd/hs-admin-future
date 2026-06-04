<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import GlassSurface from './GlassSurface.vue'
import { useGlassFilter } from './core/useGlassFilter'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    src?: string
    alt?: string
    fallback?: string
    size?: 'sm' | 'default' | 'lg'
  }>(),
  {
    alt: '',
    fallback: '?',
    size: 'default',
  },
)

const { isEnabled } = useGlassFilter('avatar')

const sizeMap: Record<string, number> = { sm: 32, default: 40, lg: 56 }
</script>

<template>
  <GlassSurface
    v-if="isEnabled"
    preset="avatar"
    :class="cn('inline-flex items-center justify-center', props.class)"
    :mouse-tracking="false"
    :style="{ width: `${sizeMap[size]}px`, height: `${sizeMap[size]}px` }"
  >
    <Avatar class="w-full h-full">
      <AvatarImage v-if="src" :src="src" :alt="alt" />
      <AvatarFallback>{{ fallback }}</AvatarFallback>
    </Avatar>
  </GlassSurface>

  <Avatar v-else :class="props.class">
    <AvatarImage v-if="src" :src="src" :alt="alt" />
    <AvatarFallback>{{ fallback }}</AvatarFallback>
  </Avatar>
</template>
