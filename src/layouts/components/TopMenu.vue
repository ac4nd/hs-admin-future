<template>
  <nav
    ref="navRef"
    class="relative flex items-center gap-1 h-full px-2 min-w-0 flex-1 overflow-hidden"
  >
    <!-- 统一菜单项 — isDesktop 控制图标+文字 vs 仅图标 -->
    <div
      v-for="(item, idx) in menuTree"
      :key="item.fullPath"
      data-menu-item
      class="shrink-0"
      :class="{ invisible: idx >= visibleCount }"
    >
      <!-- 有子菜单 -->
      <DropdownMenu v-if="item.children?.length">
        <DropdownMenuTrigger as-child>
          <Button
            variant="ghost"
            :size="isDesktop ? 'sm' : 'icon'"
            class="h-8"
            :class="[isDesktop ? 'gap-1.5 text-sm' : 'w-8', itemClass(item)]"
          >
            <span :class="{ 'text-base': !isDesktop }">{{ item.icon || "📄" }}</span>
            <template v-if="isDesktop">
              <span>{{ translateRouteTitle(item.title) }}</span>
              <ChevronDown class="h-3 w-3 opacity-50" />
            </template>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <!-- 移动端显示父菜单标题 -->
          <template v-if="!isDesktop">
            <DropdownMenuLabel class="text-xs text-muted-foreground">
              {{ translateRouteTitle(item.title) }}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </template>
          <template v-for="child in item.children" :key="child.fullPath">
            <DropdownMenuSub v-if="child.children?.length">
              <DropdownMenuSubTrigger class="gap-2">
                <span>{{ child.icon || "📄" }}</span>
                <span>{{ translateRouteTitle(child.title) }}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  v-for="grand in child.children"
                  :key="grand.fullPath"
                  class="gap-2"
                  @click="handleSelect(grand)"
                >
                  <span>{{ grand.icon || "📄" }}</span>
                  <span>{{ translateRouteTitle(grand.title) }}</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem v-else class="gap-2" @click="handleSelect(child)">
              <span>{{ child.icon || "📄" }}</span>
              <span>{{ translateRouteTitle(child.title) }}</span>
            </DropdownMenuItem>
          </template>
        </DropdownMenuContent>
      </DropdownMenu>

      <!-- 叶子节点 -->
      <template v-else>
        <Button
          v-if="isDesktop"
          variant="ghost"
          size="sm"
          class="gap-1.5 text-sm h-8"
          :class="itemClass(item)"
          @click="handleSelect(item)"
        >
          <span>{{ item.icon || "📄" }}</span>
          <span>{{ translateRouteTitle(item.title) }}</span>
        </Button>
        <Tooltip v-else>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8"
              :class="itemClass(item)"
              @click="handleSelect(item)"
            >
              <span class="text-base">{{ item.icon || "📄" }}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" :side-offset="4">
            {{ translateRouteTitle(item.title) }}
          </TooltipContent>
        </Tooltip>
      </template>
    </div>

    <!-- 省略号 "..." — 桌面/移动端通用 -->
    <div
      v-if="hiddenItems.length > 0"
      class="absolute right-1 top-0 bottom-0 flex items-center z-10"
    >
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8"
            :class="{ 'bg-accent text-accent-foreground': hasActiveHidden }"
          >
            <MoreHorizontal class="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="max-h-[60vh] overflow-y-auto">
          <template v-for="item in hiddenItems" :key="item.fullPath">
            <DropdownMenuSub v-if="item.children?.length">
              <DropdownMenuSubTrigger
                class="gap-2"
                :class="{ 'text-primary font-medium': isItemActive(item) }"
              >
                <span>{{ item.icon || "📄" }}</span>
                <span>{{ translateRouteTitle(item.title) }}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  v-for="child in item.children"
                  :key="child.fullPath"
                  class="gap-2"
                  @click="handleSelect(child)"
                >
                  <span>{{ child.icon || "📄" }}</span>
                  <span>{{ translateRouteTitle(child.title) }}</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem v-else class="gap-2" @click="handleSelect(item)">
              <span>{{ item.icon || "📄" }}</span>
              <span>{{ translateRouteTitle(item.title) }}</span>
            </DropdownMenuItem>
          </template>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ChevronDown, MoreHorizontal } from "@lucide/vue";
import { useWindowSize } from "@vueuse/core";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { usePermissionStore } from "@/stores";
import { generateMenus } from "@/utils/menu";
import { translateRouteTitle } from "@/utils/i18n";
import type { MenuItem } from "@/utils/menu";

const route = useRoute();
const router = useRouter();
const permissionStore = usePermissionStore();
const menuTree = computed(() => generateMenus(permissionStore.routes));

const { width: windowWidth } = useWindowSize();
const isDesktop = computed(() => windowWidth.value >= 768);

const navRef = ref<HTMLElement>();
const visibleCount = ref(999);

/** 溢出的菜单项 */
const hiddenItems = computed(() => menuTree.value.slice(visibleCount.value));

/** 溢出项中是否有激活项 */
const hasActiveHidden = computed(() => hiddenItems.value.some((item) => isItemActive(item)));

/** "..." 按钮预留宽度 */
const MORE_BTN_WIDTH = 44;

/** 判断菜单项是否激活（叶子直接匹配 / 有子菜单时检测子孙路径） */
function isItemActive(item: MenuItem): boolean {
  if (!item.children?.length) {
    return route.path === item.fullPath;
  }
  return matchDescendant(item.children, route.path);
}

function matchDescendant(children: MenuItem[], path: string): boolean {
  for (const child of children) {
    if (child.fullPath === path) return true;
    if (child.children?.length && matchDescendant(child.children, path)) return true;
  }
  return false;
}

function itemClass(item: MenuItem) {
  return {
    "bg-accent text-accent-foreground": isItemActive(item),
  };
}

/**
 * 测量每个菜单项的位置，计算可见数量
 * 桌面/移动端统一执行，移动端图标更窄自然放得下更多
 */
function recalculate() {
  const nav = navRef.value;
  if (!nav) return;
  const items = nav.querySelectorAll("[data-menu-item]");
  if (!items.length) return;

  const containerWidth = nav.clientWidth;
  let count = items.length;

  for (let i = 0; i < items.length; i++) {
    const el = items[i] as HTMLElement;
    if (el.offsetLeft + el.offsetWidth > containerWidth - MORE_BTN_WIDTH) {
      count = i;
      break;
    }
  }

  if (count === items.length) {
    const last = items[items.length - 1] as HTMLElement;
    if (last.offsetLeft + last.offsetWidth <= containerWidth) {
      visibleCount.value = count;
      return;
    }
    count = items.length - 1;
  }

  visibleCount.value = count;
}

let observer: ResizeObserver | null = null;

onMounted(() => {
  nextTick(recalculate);
  if (navRef.value) {
    observer = new ResizeObserver(recalculate);
    observer.observe(navRef.value);
  }
});

onUnmounted(() => observer?.disconnect());

watch(menuTree, () => nextTick(recalculate));
watch(isDesktop, () => nextTick(recalculate));

function handleSelect(item: MenuItem) {
  if (item.fullPath.startsWith("http")) {
    window.open(item.fullPath, "_blank");
  } else {
    router.push(item.fullPath);
  }
}
</script>
