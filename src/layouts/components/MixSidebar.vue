<template>
  <ScrollArea v-if="menuTree.length > 0" class="flex-1 min-h-0 overflow-hidden px-2 py-1">
    <div class="space-y-0.5">
      <SidebarMenuItem
        v-for="item in menuTree"
        :key="item.fullPath"
        :item="item"
        :collapse="false"
        :level="0"
        :active-path="route.path"
        @select="handleSelect"
      />
    </div>
  </ScrollArea>
  <!-- 无子菜单时显示占位 -->
  <div v-else class="flex-1 flex items-center justify-center text-sm text-muted-foreground py-10">
    {{ t("mixSidebar.empty") }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePermissionStore } from "@/stores";
import { generateMenus } from "@/utils/menu";
import type { MenuItem } from "@/utils/menu";
import SidebarMenuItem from "./SidebarMenuItem.vue";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const permissionStore = usePermissionStore();

/** 从混合布局侧边栏路由生成菜单树 */
const menuTree = computed(() => generateMenus(permissionStore.mixLayoutSideMenus));

function handleSelect(item: MenuItem) {
  if (item.params && Object.keys(item.params).length > 0) {
    router.push({ path: item.fullPath, query: item.params });
  } else {
    router.push(item.fullPath);
  }
}
</script>
