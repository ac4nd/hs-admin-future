<template>
  <div>
    <div
      class="flex items-center gap-2 py-1 px-2 rounded hover:bg-muted/50 cursor-pointer select-none"
      :style="{ paddingLeft: `${level * 16 + 4}px` }"
      @click="hasChildren && (localExpanded = !localExpanded)"
    >
      <span v-if="hasChildren" class="text-muted-foreground text-xs w-4 shrink-0">
        {{ localExpanded ? "▼" : "▶" }}
      </span>
      <span v-else class="w-4 shrink-0" />

      <input
        type="checkbox"
        :checked="isChecked"
        class="size-4 rounded border-border shrink-0"
        @click.stop="$emit('toggle', String(option.value))"
      />

      <span class="text-sm truncate">{{ option.label }}</span>
    </div>

    <div v-if="hasChildren && localExpanded">
      <DepartmentTree
        v-for="child in option.children"
        :key="String(child.value)"
        :option="child"
        :level="level + 1"
        :checked="checked"
        @toggle="$emit('toggle', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { OptionItem } from "@/api/common";

const props = defineProps<{
  option: OptionItem;
  level: number;
  checked: string[];
}>();

defineEmits<{
  toggle: [id: string];
}>();

const localExpanded = ref(true);

const hasChildren = computed(() => (props.option.children?.length ?? 0) > 0);

const isChecked = computed(() => props.checked.includes(String(props.option.value)));
</script>
