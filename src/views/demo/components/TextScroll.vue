<template>
  <div
    v-if="visible"
    :class="['flex items-center gap-2 px-4 py-2 rounded-lg text-sm', typeClass]"
  >
    <button v-if="showClose" class="shrink-0 opacity-60 hover:opacity-100" @click="visible = false">
      <XIcon class="size-3.5" />
    </button>

    <!-- 打字机模式 -->
    <template v-if="typewriter">
      <span class="whitespace-nowrap overflow-hidden">{{ displayedText }}<span class="animate-pulse">|</span></span>
    </template>

    <!-- 滚动模式 -->
    <template v-else>
      <div class="overflow-hidden flex-1 relative">
        <div
          ref="scrollRef"
          class="whitespace-nowrap inline-block"
          :style="{ animation: scrollAnim }"
        >
          {{ text }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { XIcon } from "@lucide/vue";

const props = withDefaults(
  defineProps<{
    text: string;
    type?: "default" | "success" | "warning" | "danger" | "info";
    speed?: number;
    direction?: "left" | "right";
    typewriter?: boolean;
    showClose?: boolean;
  }>(),
  {
    type: "default",
    speed: 50,
    direction: "left",
    typewriter: false,
    showClose: false,
  }
);

const visible = ref(true);
const scrollRef = ref<HTMLElement>();
const displayedText = ref("");
let twTimer: ReturnType<typeof setTimeout> | null = null;

const typeClass = computed(() => {
  const map: Record<string, string> = {
    default: "bg-muted/50 text-foreground",
    success: "bg-green-500/10 text-green-700 dark:text-green-400",
    warning: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    danger: "bg-red-500/10 text-red-700 dark:text-red-400",
    info: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  };
  return map[props.type] ?? map.default;
});

const scrollAnim = computed(() => {
  const dir = props.direction === "right" ? "scrollRight" : "scrollLeft";
  const duration = Math.max(5, props.text.length * 0.15);
  return `${dir} ${duration}s linear infinite`;
});

// 打字机效果
function startTypewriter() {
  displayedText.value = "";
  let idx = 0;
  const tick = () => {
    if (idx < props.text.length) {
      displayedText.value += props.text[idx++];
      twTimer = setTimeout(tick, 80);
    } else {
      // 完成后暂停再重新开始
      twTimer = setTimeout(() => {
        idx = 0;
        displayedText.value = "";
        tick();
      }, 3000);
    }
  };
  tick();
}

watch(() => props.text, () => {
  if (props.typewriter) {
    if (twTimer) clearTimeout(twTimer);
    startTypewriter();
  }
});

onMounted(() => {
  if (props.typewriter) startTypewriter();
});

onUnmounted(() => {
  if (twTimer) clearTimeout(twTimer);
});
</script>

<style scoped>
@keyframes scrollLeft {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
@keyframes scrollRight {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>
