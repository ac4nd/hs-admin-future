<template>
  <Button variant="ghost" size="icon" @click="toggle()">
    <component :is="isFullscreen ? Minimize : Maximize" class="h-4 w-4" />
  </Button>
</template>

<script setup lang="ts">
import { Maximize, Minimize } from "@lucide/vue";
import { useFullscreen } from "@vueuse/core";
import { Button } from "@/components/ui/button";

const { isFullscreen, toggle } = useFullscreen();
</script>
