<template>
  <GlassSurface v-if="isEnabled" preset="card" :class="cn('w-full', props.class)">
    <div class="flex flex-col gap-4 text-sm">
      <slot />
    </div>
  </GlassSurface>

  <Card v-else :class="props.class">
    <slot />
  </Card>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const { isEnabled } = useGlassFilter("card");
</script>

<script lang="ts">
// 子组件导出（无独立玻璃效果，继承父级 Card 的玻璃壳）
export { default as GlassCardHeader } from "@/components/ui/card/CardHeader.vue";
export { default as GlassCardTitle } from "@/components/ui/card/CardTitle.vue";
export { default as GlassCardDescription } from "@/components/ui/card/CardDescription.vue";
export { default as GlassCardContent } from "@/components/ui/card/CardContent.vue";
export { default as GlassCardFooter } from "@/components/ui/card/CardFooter.vue";
</script>
