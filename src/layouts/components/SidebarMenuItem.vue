<template>
  <!-- ========== 展开态 ========== -->
  <template v-if="!collapse">
    <!-- 有子菜单 -->
    <Collapsible v-if="hasVisibleChildren" v-model:open="isOpen" class="w-full">
      <CollapsibleTrigger as-child>
        <div
          class="sidebar-menu-item flex items-center gap-3 rounded-lg text-sm cursor-pointer transition-colors w-full"
          :class="{ 'text-primary font-medium': isParentActive }"
          :style="{ paddingLeft: `${(level + 1) * 12}px` }"
        >
          <span class="text-base shrink-0">{{ item.icon || '📄' }}</span>
          <span class="flex-1 truncate">{{ translateRouteTitle(item.title) }}</span>
          <ChevronRight
            class="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200"
            :class="{ 'rotate-90': isOpen }"
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div class="mt-0.5">
          <SidebarMenuItem
            v-for="child in item.children"
            :key="child.fullPath"
            :item="child"
            :collapse="false"
            :level="level + 1"
            :active-path="activePath"
            @select="emit('select', $event)"
          />
        </div>
      </CollapsibleContent>
    </Collapsible>

    <!-- 叶子节点 -->
    <div
      v-else
      class="sidebar-menu-item flex items-center gap-3 rounded-lg text-sm cursor-pointer transition-colors"
      :class="{ active: isActive }"
      :style="{ paddingLeft: `${(level + 1) * 12}px` }"
      @click="handleClick"
    >
      <span class="text-base shrink-0">{{ item.icon || '📄' }}</span>
      <span class="flex-1 truncate">{{ translateRouteTitle(item.title) }}</span>
    </div>
  </template>

  <!-- ========== 折叠态 ========== -->
  <template v-else>
    <!-- 有子菜单：hover 弹出 DropdownMenu -->
    <DropdownMenu v-if="hasVisibleChildren">
      <DropdownMenuTrigger as-child>
        <div
          class="sidebar-menu-item-collapsed flex items-center justify-center h-10 w-full rounded-lg cursor-pointer transition-colors"
          :class="{ 'text-primary': isParentActive }"
        >
          <span class="text-base">{{ item.icon || '📄' }}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" class="min-w-[180px]">
        <DropdownMenuLabel class="text-xs text-muted-foreground">
          {{ translateRouteTitle(item.title) }}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <template v-for="child in item.children" :key="child.fullPath">
          <!-- 子级有子菜单：嵌套 Sub -->
          <DropdownMenuSub v-if="child.children?.length">
            <DropdownMenuSubTrigger class="gap-2">
              <span>{{ child.icon || '📄' }}</span>
              <span>{{ translateRouteTitle(child.title) }}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                v-for="grand in child.children"
                :key="grand.fullPath"
                class="gap-2"
                @click="emit('select', grand)"
              >
                <span>{{ grand.icon || '📄' }}</span>
                <span>{{ translateRouteTitle(grand.title) }}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <!-- 子级叶子 -->
          <DropdownMenuItem v-else class="gap-2" @click="emit('select', child)">
            <span>{{ child.icon || '📄' }}</span>
            <span>{{ translateRouteTitle(child.title) }}</span>
          </DropdownMenuItem>
        </template>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- 叶子节点：Tooltip -->
    <Tooltip v-else>
      <TooltipTrigger as-child>
        <div
          class="sidebar-menu-item-collapsed flex items-center justify-center h-10 w-full rounded-lg cursor-pointer transition-colors"
          :class="{ active: isActive }"
          @click="handleClick"
        >
          <span class="text-base">{{ item.icon || '📄' }}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent side="right" :side-offset="8">
        {{ translateRouteTitle(item.title) }}
      </TooltipContent>
    </Tooltip>
  </template>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { ChevronRight } from "@lucide/vue";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { translateRouteTitle } from "@/utils/i18n";
import type { MenuItem } from "@/utils/menu";

const props = defineProps<{
  item: MenuItem;
  collapse: boolean;
  level: number;
  activePath: string;
}>();

const emit = defineEmits<{
  select: [item: MenuItem];
}>();

const hasVisibleChildren = computed(
  () => props.item.children && props.item.children.length > 0
);

const isActive = computed(() => props.item.fullPath === props.activePath);

const isParentActive = computed(() => {
  if (!props.item.children) return false;
  return matchChildPath(props.item.children, props.activePath);
});

/** 子孙路径是否匹配 */
function matchChildPath(children: MenuItem[], path: string): boolean {
  for (const child of children) {
    if (child.fullPath === path) return true;
    if (child.children?.length && matchChildPath(child.children, path))
      return true;
  }
  return false;
}

/** 展开态控制 — 激活时自动展开，同时允许手动折叠 */
const isOpen = ref(false);
watch(
  () => isParentActive.value,
  (active) => {
    if (active) isOpen.value = true;
  },
  { immediate: true }
);

function handleClick() {
  if (props.item.fullPath.startsWith("http")) {
    window.open(props.item.fullPath, "_blank");
    return;
  }
  emit("select", props.item);
}
</script>

<style scoped>
.sidebar-menu-item {
  color: var(--menu-text);
  padding: 8px 12px;
}
.sidebar-menu-item:hover {
  background: var(--menu-hover);
}
.sidebar-menu-item.active {
  color: var(--menu-active-text);
  font-weight: 500;
  background: var(--menu-hover);
}

.sidebar-menu-item-collapsed {
  color: var(--menu-text);
}
.sidebar-menu-item-collapsed:hover {
  background: var(--menu-hover);
}
.sidebar-menu-item-collapsed.active {
  color: var(--menu-active-text);
  font-weight: 500;
  background: var(--menu-hover);
}
</style>
