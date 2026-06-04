<template>
  <TooltipProvider>
    <GlassFilterProvider />
    <RouterView />
    <Toaster />
  </TooltipProvider>
</template>

<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import { GlassFilterProvider } from "@/components/glass";
import { TooltipProvider } from "@/components/ui/tooltip";
</script>
