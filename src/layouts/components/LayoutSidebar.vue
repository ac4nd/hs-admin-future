<template>
  <ScrollArea class="flex-1 min-h-0 overflow-hidden px-2 py-1">
    <div class="space-y-0.5">
      <SidebarMenuItem
        v-for="item in menuTree"
        :key="item.fullPath"
        :item="item"
        :collapse="collapse"
        :level="0"
        :active-path="route.path"
        @select="handleSelect"
      />
    </div>
  </ScrollArea>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePermissionStore } from "@/stores";
import { generateMenus } from "@/utils/menu";
import type { MenuItem } from "@/utils/menu";
import SidebarMenuItem from "./SidebarMenuItem.vue";

withDefaults(defineProps<{
  collapse?: boolean;
}>(), {
  collapse: false,
});

const route = useRoute();
const router = useRouter();
const permissionStore = usePermissionStore();

/** 从路由配置生成菜单树 */
const menuTree = computed(() => generateMenus(permissionStore.routes));

function handleSelect(item: MenuItem) {
  if (item.params && Object.keys(item.params).length > 0) {
    router.push({ path: item.fullPath, query: item.params });
  } else {
    router.push(item.fullPath);
  }
}
</script>
