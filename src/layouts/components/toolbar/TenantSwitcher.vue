<template>
  <DropdownMenu v-if="tenantList.length > 0">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="sm" class="gap-1.5 text-xs">
        <Building2 class="h-3.5 w-3.5" />
        <span class="max-w-[100px] truncate">{{ currentTenant?.label }}</span>
        <ChevronDown class="h-3 w-3 opacity-50" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        v-for="item in tenantList"
        :key="item.value"
        :disabled="item.value === currentTenantId"
        @click="switchTenant(item.value)"
      >
        <Check v-if="item.value === currentTenantId" class="mr-2 h-4 w-4" />
        <span v-else class="mr-2 w-4" />
        {{ item.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Building2, ChevronDown, Check } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TenantOption {
  label: string;
  value: string;
}

// Mock 数据 — 未来替换为 API
const currentTenantId = ref("default");
const tenantList = ref<TenantOption[]>([
  { label: "默认租户", value: "default" },
  { label: "演示租户", value: "demo" },
]);

const currentTenant = computed(() =>
  tenantList.value.find((t) => t.value === currentTenantId.value)
);

function switchTenant(id: string) {
  currentTenantId.value = id;
  // TODO: 调用 API 切换租户，刷新页面
}
</script>
