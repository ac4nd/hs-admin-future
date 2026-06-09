<template>
  <div>
    <DocSection :title="title" />
    <GlassCard class="p-6">
      <div class="flex flex-col gap-4 items-center">
        <template v-for="(layer, i) in layers" :key="i">
          <div
            class="text-[11px] text-muted-foreground tracking-widest uppercase w-full text-center -mb-2"
          >
            {{ layer.label }}
          </div>
          <div class="flex gap-2.5 flex-wrap justify-center w-full">
            <span v-for="node in layer.nodes" :key="node.name" :class="nodeClass(node.variant)">
              {{ node.name }}
            </span>
          </div>
          <ChevronDownIcon v-if="i < layers.length - 1" class="size-5 text-muted-foreground/30" />
        </template>
      </div>
    </GlassCard>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from "@lucide/vue";
import GlassCard from "@/components/glass/GlassCard.vue";
import DocSection from "./DocSection.vue";

interface ArchNode {
  name: string;
  variant: "primary" | "secondary" | "muted";
}

interface ArchLayer {
  label: string;
  nodes: ArchNode[];
}

defineProps<{
  title: string;
  layers: ArchLayer[];
}>();

function nodeClass(variant: string) {
  const base = "px-4 py-2 rounded-lg text-xs font-medium text-center transition-colors";
  const variants: Record<string, string> = {
    primary: " bg-emerald-400/10 border border-emerald-400/25 text-emerald-400",
    secondary: " bg-indigo-400/10 border border-indigo-400/20 text-indigo-300",
    muted: " bg-white/4 border border-white/8 text-muted-foreground",
  };
  return base + (variants[variant] || variants.muted);
}
</script>
