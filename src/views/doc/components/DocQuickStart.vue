<template>
  <div>
    <DocSection :title="title" />
    <div class="flex flex-col gap-3">
      <GlassCard v-for="(step, i) in steps" :key="i" class="flex items-start gap-4 px-5 py-4">
        <div
          class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 bg-gradient-to-br from-emerald-400/20 to-indigo-400/20 border border-emerald-400/20 text-emerald-400"
        >
          {{ i + 1 }}
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-medium mb-1">{{ step.title }}</h4>
          <p v-if="step.desc" class="text-xs text-muted-foreground mb-2">{{ step.desc }}</p>
          <pre
            v-if="step.code"
            class="bg-black/25 border border-white/6 rounded-lg px-4 py-2.5 text-xs font-mono text-emerald-400 overflow-x-auto"
          ><code>{{ step.code }}</code></pre>
        </div>
      </GlassCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlassCard from "@/components/glass/GlassCard.vue";
import DocSection from "./DocSection.vue";

interface Step {
  title: string;
  desc?: string;
  code?: string;
}

defineProps<{
  title: string;
  steps: Step[];
}>();
</script>
