<template>
  <Button variant="ghost" size="icon" @click="open = true">
    <Search class="h-4 w-4" />
  </Button>

  <CommandDialog v-model:open="open">
    <CommandInput :placeholder="t('navbar.search') + '...'" />
    <CommandList>
      <CommandEmpty>{{ t("navbar.search") }} — 0</CommandEmpty>
      <CommandGroup>
        <CommandItem
          v-for="item in flatMenus"
          :key="item.fullPath"
          :value="item.title"
          @select="handleSelect(item)"
        >
          <MenuIcon :icon="item.icon" class="mr-2 size-3.5" />
          <span>{{ translateRouteTitle(item.title) }}</span>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { Search } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { usePermissionStore } from "@/stores";
import { generateMenus } from "@/utils/menu";
import { translateRouteTitle } from "@/utils/i18n";
import type { MenuItem } from "@/utils/menu";

const { t } = useI18n();
const router = useRouter();
const permissionStore = usePermissionStore();

const open = ref(false);

/** 将菜单树展平为一级列表用于搜索 */
const flatMenus = flattenMenus(generateMenus(permissionStore.routes));

function flattenMenus(items: MenuItem[]): MenuItem[] {
  const result: MenuItem[] = [];
  for (const item of items) {
    if (item.children?.length) {
      result.push(...flattenMenus(item.children));
    } else {
      result.push(item);
    }
  }
  return result;
}

function handleSelect(item: MenuItem) {
  open.value = false;
  if (item.fullPath.startsWith("http")) {
    window.open(item.fullPath, "_blank");
  } else {
    router.push(item.fullPath);
  }
}

/** 全局 Ctrl+K 快捷键 */
function handleKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
    e.preventDefault();
    open.value = true;
  }
}
window.addEventListener("keydown", handleKeydown);
</script>
