<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from "vue";
import { useSettingsStore } from "@/stores";
import { ThemeMode } from "@/enums/settings";
import { appConfig } from "@/settings";

const settingsStore = useSettingsStore();

const enabled = computed(() => settingsStore.showWatermark);
const fontColor = computed(() =>
  settingsStore.resolvedTheme === ThemeMode.DARK
    ? "rgba(255, 255, 255, 0.12)"
    : "rgba(0, 0, 0, 0.12)",
);

const watermarkUrl = ref("");
let observer: MutationObserver | null = null;
const containerRef = ref<HTMLElement>();

function generateWatermark(text: string, color: string): string {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const fontSize = 14;
  const gapX = 120;
  const gapY = 80;
  const rotate = -22 * (Math.PI / 180);

  ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;

  const width = textWidth + gapX;
  const height = fontSize + gapY;

  canvas.width = width * 2;
  canvas.height = height * 2;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rotate);
  ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 0, 0);

  return canvas.toDataURL();
}

function updateWatermark() {
  watermarkUrl.value = enabled.value
    ? generateWatermark(appConfig.title, fontColor.value)
    : "";
}

watch([enabled, fontColor], updateWatermark);
onMounted(updateWatermark);

// 防止水印被删除
onMounted(() => {
  if (!containerRef.value) return;
  observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === "attributes" && m.target === containerRef.value) {
        updateWatermark();
      }
    }
  });
  observer.observe(containerRef.value, { attributes: true, attributeFilter: ["style", "class"] });
});
onUnmounted(() => observer?.disconnect());
</script>

<template>
  <div
    v-if="enabled"
    ref="containerRef"
    class="fixed inset-0 pointer-events-none"
    :style="{
      zIndex: 9999,
      backgroundImage: watermarkUrl ? `url(${watermarkUrl})` : 'none',
      backgroundRepeat: 'repeat',
      backgroundSize: '240px 160px',
    }"
  />
</template>
