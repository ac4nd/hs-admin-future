<template>
  <GlassSurface
    v-if="isEnabled"
    preset="table"
    :class="cn('w-full', props.class)"
    :mouse-tracking="false"
  >
    <div class="w-full overflow-auto">
      <table class="w-full caption-bottom text-sm">
        <slot />
      </table>
    </div>
  </GlassSurface>

  <Table v-else :class="props.class">
    <slot />
  </Table>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Table } from "@/components/ui/table";
import GlassSurface from "./GlassSurface.vue";
import { useGlassFilter } from "./core/useGlassFilter";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const { isEnabled } = useGlassFilter("table");
</script>
