<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipContent
        :side="side"
        :class="cn(isEnabled && 'glass-surface border-white/10', props.class)"
        :style="
          isEnabled
            ? {
                ...filterStyle,
                background: 'rgba(18,18,20,0.72)',
                border: '1px solid rgba(255,255,255,0.06)',
              }
            : {}
        "
      >
        {{ content }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useGlassFilter } from "./core/useGlassFilter";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  content: string;
  side?: "top" | "right" | "bottom" | "left";
}>();

const { isEnabled, filterStyle } = useGlassFilter("tooltip");
</script>
