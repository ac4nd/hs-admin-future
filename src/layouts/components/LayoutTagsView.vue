<template>
  <div
    class="tags-container"
    :class="
      glassEffect
        ? 'backdrop-blur-xl bg-white/8 dark:bg-black/20 border-b border-white/15 dark:border-white/8'
        : 'bg-[var(--content-bg)] border-b border-[var(--border-color)]'
    "
  >
    <!-- 标签列表 -->
    <ScrollArea class="flex-1">
      <div class="flex items-center gap-1 px-2 h-full">
        <TagsViewItem
          v-for="tag in tagsViewStore.visitedViews"
          :key="tag.path"
          :tag="tag"
          :active="tag.path === route.path"
          @click="handleTagClick(tag)"
          @close="handleTagClose(tag)"
        />
      </div>
    </ScrollArea>

    <!-- 右侧操作栏 -->
    <div class="flex items-center gap-0.5 shrink-0 px-1">
      <!-- 刷新当前页 -->
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="ghost" size="icon" class="h-6 w-6" @click="handleRefresh">
            <RefreshCw class="h-3.5 w-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" :side-offset="4">
          {{ t('tagsView.refresh') }}
        </TooltipContent>
      </Tooltip>

      <!-- 内容区全屏 -->
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="ghost" size="icon" class="h-6 w-6" @click="appStore.toggleContentFullscreen()">
            <X v-if="appStore.contentFullscreen" class="h-3.5 w-3.5" />
            <Expand v-else class="h-3.5 w-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" :side-offset="4">
          {{ appStore.contentFullscreen ? t('navbar.fullscreenExit') : t('navbar.fullscreen') }}
        </TooltipContent>
      </Tooltip>

      <!-- 下拉菜单 -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="icon" class="h-6 w-6">
            <ChevronDown class="h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem @click="handleRefresh">
            <RefreshCw class="mr-2 h-4 w-4" />
            {{ t('tagsView.refresh') }}
          </DropdownMenuItem>
          <DropdownMenuItem
            v-if="currentTag && !currentTag.affix"
            @click="handleCloseCurrent"
          >
            <X class="mr-2 h-4 w-4" />
            {{ t('tagsView.closeCurrent') }}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleCloseOthers">
            <FolderX class="mr-2 h-4 w-4" />
            {{ t('tagsView.closeOthers') }}
          </DropdownMenuItem>
          <DropdownMenuItem @click="handleCloseLeft">
            <ChevronLeft class="mr-2 h-4 w-4" />
            {{ t('tagsView.closeLeft') }}
          </DropdownMenuItem>
          <DropdownMenuItem @click="handleCloseRight">
            <ChevronRight class="mr-2 h-4 w-4" />
            {{ t('tagsView.closeRight') }}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleCloseAll">
            <XCircle class="mr-2 h-4 w-4" />
            {{ t('tagsView.closeAll') }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Expand,
  FolderX,
  RefreshCw,
  X,
  XCircle,
} from "@lucide/vue";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppStore, useSettingsStore, useTagsViewStore } from "@/stores";
import TagsViewItem from "./TagsViewItem.vue";
import type { TagView } from "@/types/ui/tagsview";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const tagsViewStore = useTagsViewStore();
const glassEffect = computed(() => settingsStore.glassEffect);

/** 当前路由对应的标签 */
const currentTag = computed(() =>
  tagsViewStore.visitedViews.find((v) => v.path === route.path)
);

/** 路由变化时自动添加标签 */
watch(
  () => route.path,
  () => {
    if (route.meta?.title && !route.meta?.hidden) {
      tagsViewStore.addView(route);
    }
  },
  { immediate: true }
);

function handleTagClick(tag: TagView) {
  router.push(tag.fullPath);
}

function handleTagClose(tag: TagView) {
  const wasActive = tag.path === route.path;
  tagsViewStore.deleteView(tag);
  if (wasActive) toLastView();
}

/** 刷新当前页：清除缓存后跳转 redirect 中转页 */
function handleRefresh() {
  const tag = currentTag.value;
  if (!tag) return;
  tagsViewStore.deleteCachedView(tag);
  router.replace("/redirect" + tag.fullPath);
}

function handleCloseCurrent() {
  const tag = currentTag.value;
  if (!tag || tag.affix) return;
  handleTagClose(tag);
}

function handleCloseOthers() {
  tagsViewStore.deleteOthersViews({
    path: route.path,
    name: route.name as string,
    title: (route.meta?.title as string) ?? "",
    fullPath: route.fullPath,
  });
}

function handleCloseLeft() {
  tagsViewStore.deleteLeftViews({
    path: route.path,
    name: route.name as string,
    title: (route.meta?.title as string) ?? "",
    fullPath: route.fullPath,
  });
  // 若当前路由被关掉了，跳到最后一个
  if (!tagsViewStore.visitedViews.some((v) => v.path === route.path)) {
    toLastView();
  }
}

function handleCloseRight() {
  tagsViewStore.deleteRightViews({
    path: route.path,
    name: route.name as string,
    title: (route.meta?.title as string) ?? "",
    fullPath: route.fullPath,
  });
  if (!tagsViewStore.visitedViews.some((v) => v.path === route.path)) {
    toLastView();
  }
}

function handleCloseAll() {
  tagsViewStore.deleteAllViews();
  toLastView();
}

function toLastView() {
  const views = tagsViewStore.visitedViews;
  const last = views[views.length - 1];
  router.push(last ? last.fullPath : "/");
}
</script>

<style scoped>
.tags-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tags-view-height);
  transition: background-color 0.3s, backdrop-filter 0.3s;
}
</style>
