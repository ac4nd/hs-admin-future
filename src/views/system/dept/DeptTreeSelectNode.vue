<template>
  <div class="space-y-0.5">
    <div
      class="flex items-center gap-2 py-1.5 px-3 rounded hover:bg-muted/50 cursor-pointer select-none text-sm"
      :class="{ 'bg-muted/40 font-medium': String(modelValue) === String(option.value) }"
      @click="selectOption(option.value)"
    >
      <!-- 展开/折叠 -->
      <button
        v-if="hasChildren"
        class="text-muted-foreground text-xs w-4 shrink-0"
        @click.stop="localExpanded = !localExpanded"
      >
        {{ localExpanded ? '▼' : '▶' }}
      </button>
      <span v-else class="w-4 shrink-0" />

      <span class="truncate">{{ option.label }}</span>
    </div>

    <!-- 子节点 -->
    <div v-if="hasChildren && localExpanded" :style="{ paddingLeft: '16px' }">
      <DeptTreeSelectNode
        v-for="child in option.children"
        :key="String(child.value)"
        :option="child"
        :model-value="modelValue"
        @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { OptionItem } from "@/api/common";

const props = defineProps<{
  option: OptionItem;
  modelValue: string;
}>();

const emit = defineEmits<{
  select: [value: string | number];
}>();

const localExpanded = ref(true);

const hasChildren = computed(() => (props.option.children?.length ?? 0) > 0);

function selectOption(value: string | number) {
  emit("select", value);
}
</script>
