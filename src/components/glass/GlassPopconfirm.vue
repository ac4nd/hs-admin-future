<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent
      :class="cn(isEnabled && 'border-white/10', props.class)"
      :style="
        isEnabled
          ? {
              ...filterStyle,
              background: 'rgba(18,18,20,0.72)',
              isolation: 'isolate',
              overflow: 'hidden',
            }
          : {}
      "
    >
      <AlertDialogHeader>
        <AlertDialogTitle>{{ title }}</AlertDialogTitle>
        <AlertDialogDescription v-if="description">{{ description }}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="emit('cancel')">{{ cancelText ?? "取消" }}</AlertDialogCancel>
        <AlertDialogAction @click="emit('confirm')">{{ confirmText ?? "确认" }}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script lang="ts" setup>
import { type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useGlassFilter } from "./core/useGlassFilter";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}>();

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();

const { isEnabled, filterStyle } = useGlassFilter("popconfirm");
</script>
