<template>
  <ToasterLib
    position="top-center"
    :rich-colors="true"
    :close-button="false"
    :duration="2000"
    :gap="8"
    :toast-options="{
      classes: {
        toast: 'rounded-lg shadow-md',
        description: 'text-xs',
      },
    }"
  >
    <template #success-icon>
      <CircleCheckIcon class="size-4 text-green-500" />
    </template>
    <template #info-icon>
      <InfoIcon class="size-4 text-blue-500" />
    </template>
    <template #warning-icon>
      <TriangleAlertIcon class="size-4 text-yellow-500" />
    </template>
    <template #error-icon>
      <CircleXIcon class="size-5 text-red-500" />
    </template>
    <template #loading-icon>
      <Loader2Icon class="size-4 animate-spin" />
    </template>
  </ToasterLib>
</template>

<script lang="ts" setup>
import {
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  Loader2Icon,
  TriangleAlertIcon,
} from "@lucide/vue";
import { Toaster as ToasterLib } from "vue-sonner";
import "vue-sonner/style.css";
</script>
