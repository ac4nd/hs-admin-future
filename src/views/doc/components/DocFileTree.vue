<template>
  <div>
    <DocSection :title="title" />
    <GlassCard class="p-5">
      <pre
        class="text-[13px] leading-7 whitespace-pre text-muted-foreground font-mono"
        v-html="tree"
      />
    </GlassCard>
  </div>
</template>

<script setup lang="ts">
import GlassCard from "@/components/glass/GlassCard.vue";
import DocSection from "./DocSection.vue";

defineProps<{
  title: string;
  tree: string;
}>();
</script>
