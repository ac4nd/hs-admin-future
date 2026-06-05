<template>
  <GlassSurface
    v-if="isEnabled"
    preset="breadcrumb"
    :class="cn('inline-flex items-center', props.class)"
  >
    <Breadcrumb>
      <BreadcrumbList>
        <slot />
      </BreadcrumbList>
    </Breadcrumb>
  </GlassSurface>

  <Breadcrumb v-else :class="props.class">
    <BreadcrumbList>
      <slot />
    </BreadcrumbList>
  </Breadcrumb>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Breadcrumb, BreadcrumbList } from "@/components/ui/breadcrumb";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const { isEnabled } = useGlassFilter("breadcrumb");
</script>
