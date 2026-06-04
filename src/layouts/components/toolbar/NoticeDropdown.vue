<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="relative">
        <Bell class="h-4 w-4" />
        <Badge
          v-if="unreadCount > 0"
          variant="destructive"
          class="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[10px] leading-none"
        >
          {{ unreadCount > 99 ? '99+' : unreadCount }}
        </Badge>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-72">
      <DropdownMenuLabel class="flex items-center justify-between">
        <span>{{ t('navbar.notification') }}</span>
        <span
          v-if="unreadCount > 0"
          class="text-xs text-primary cursor-pointer hover:underline"
          @click="readAll"
        >
          {{ t('navbar.notificationReadAll') }}
        </span>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <template v-if="notifications.length > 0">
        <DropdownMenuItem
          v-for="item in notifications"
          :key="item.id"
          class="flex flex-col items-start gap-1 py-2"
          @click="handleNoticeClick(item)"
        >
          <div class="flex items-center gap-2 w-full">
            <Badge :variant="getBadgeVariant(item.type)" class="text-[10px] shrink-0">
              {{ item.type }}
            </Badge>
            <span class="text-xs text-muted-foreground ml-auto">{{ item.time }}</span>
          </div>
          <span class="text-sm truncate w-full">{{ item.title }}</span>
        </DropdownMenuItem>
      </template>
      <div v-else class="py-6 text-center text-sm text-muted-foreground">
        {{ t('navbar.notificationEmpty') }}
      </div>
      <DropdownMenuSeparator v-if="notifications.length > 0" />
      <DropdownMenuItem
        v-if="notifications.length > 0"
        class="justify-center text-primary"
        @click="handleViewMore"
      >
        {{ t('navbar.notificationMore') }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { Bell } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notice {
  id: number;
  title: string;
  type: string;
  time: string;
  read: boolean;
}

const { t } = useI18n();
const router = useRouter();

// Mock 数据 — 未来替换为 API/SSE
const notifications = ref<Notice[]>([
  { id: 1, title: "系统升级通知：将于本周六凌晨进行系统维护", type: "通知", time: "10分钟前", read: false },
  { id: 2, title: "新用户注册审核待处理", type: "待办", time: "1小时前", read: false },
  { id: 3, title: "服务器 CPU 使用率超过 80%", type: "告警", time: "2小时前", read: false },
]);

const unreadCount = ref(3);

function readAll() {
  notifications.value.forEach((n) => (n.read = true));
  unreadCount.value = 0;
}

function handleNoticeClick(item: Notice) {
  item.read = true;
  if (unreadCount.value > 0) unreadCount.value--;
}

function handleViewMore() {
  router.push("/system/notice");
}

function getBadgeVariant(type: string) {
  switch (type) {
    case "告警": return "destructive";
    case "待办": return "outline";
    default: return "secondary";
  }
}
</script>
