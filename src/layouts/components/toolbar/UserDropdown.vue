<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="sm" class="gap-2 h-8">
        <Avatar class="h-6 w-6">
          <AvatarImage :src="userStore.userInfo.avatar" />
          <AvatarFallback class="text-[10px]">
            {{ (userStore.userInfo.username || "U").charAt(0).toUpperCase() }}
          </AvatarFallback>
        </Avatar>
        <span class="text-sm max-w-[80px] truncate">
          {{ userStore.userInfo.username || "Admin" }}
        </span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-40">
      <DropdownMenuItem @click="handleProfile">
        <User class="mr-2 h-4 w-4" />
        {{ t('navbar.profile') }}
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="handleLogout">
        <LogOut class="mr-2 h-4 w-4" />
        {{ t('navbar.logout') }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { LogOut, User } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore, usePermissionStore } from "@/stores";

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const permissionStore = usePermissionStore();

function handleProfile() {
  router.push("/profile");
}

async function handleLogout() {
  try {
    await userStore.logout();
  } catch {
    // 即使 API 调用失败也清除本地状态
  }
  permissionStore.resetRoutes();
  router.push(`/login?redirect=${encodeURIComponent(router.currentRoute.value.fullPath)}`);
}
</script>
