<template>
  <Sheet
    :open="settingsStore.settingsVisible"
    @update:open="settingsStore.settingsVisible = $event"
  >
    <SheetContent side="right" class="w-[380px] flex flex-col p-0">
      <SheetHeader class="px-6 pt-6 pb-4 border-b">
        <SheetTitle>系统设置</SheetTitle>
        <SheetDescription>自定义界面外观和行为</SheetDescription>
      </SheetHeader>

      <div class="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        <!-- 主题模式 -->
        <section>
          <h3 class="text-sm font-medium mb-3">主题模式</h3>
          <div class="grid grid-cols-3 gap-2">
            <Button
              v-for="mode in themeModes"
              :key="mode.value"
              :variant="settingsStore.theme === mode.value ? 'default' : 'outline'"
              size="sm"
              class="gap-1.5"
              @click="settingsStore.theme = mode.value"
            >
              <component :is="mode.icon" class="size-3.5" />
              {{ mode.label }}
            </Button>
          </div>
        </section>

        <!-- 界面设置 -->
        <section>
          <h3 class="text-sm font-medium mb-3">界面</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">显示标签栏</span>
              <Switch v-model="showTagsView" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">显示 Logo</span>
              <Switch v-model="showAppLogo" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">水印</span>
              <Switch v-model="showWatermark" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">页面动画</span>
              <Select
                :model-value="settingsStore.pageSwitchingAnimation"
                @update:model-value="settingsStore.pageSwitchingAnimation = $event as string"
              >
                <SelectTrigger class="w-32 h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="opt in animationOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">灰色模式</span>
              <Switch v-model="grayMode" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">色弱模式</span>
              <Switch v-model="colorWeak" />
            </div>
          </div>
        </section>

        <!-- 布局选择 - 可视化预览 -->
        <section>
          <h3 class="text-sm font-medium mb-3">布局模式</h3>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="item in layoutOptions"
              :key="item.value"
              class="relative w-full aspect-[3/4] rounded-lg border-2 overflow-hidden cursor-pointer transition-all hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-md"
              :class="
                settingsStore.layout === item.value
                  ? 'border-primary shadow-sm ring-1 ring-primary/20'
                  : 'border-border'
              "
              @click="settingsStore.layout = item.value"
            >
              <!-- 布局预览 -->
              <div class="w-full h-full p-1.5">
                <!-- 顶部导航栏 -->
                <div
                  v-if="item.value !== LayoutMode.LEFT"
                  class="rounded-[2px] mb-1"
                  :class="
                    settingsStore.layout === item.value ? 'bg-primary/60' : 'bg-muted-foreground/20'
                  "
                  :style="{ height: item.value === LayoutMode.TOP ? '12px' : '10px' }"
                />
                <!-- 侧边栏 -->
                <div
                  v-if="item.value !== LayoutMode.TOP"
                  class="rounded-[2px] float-left mr-1"
                  :class="
                    settingsStore.layout === item.value ? 'bg-primary/40' : 'bg-muted-foreground/15'
                  "
                  :style="{
                    width: '14px',
                    height: item.value === LayoutMode.MIX ? 'calc(100% - 14px)' : '100%',
                  }"
                />
                <!-- 主内容区 -->
                <div
                  class="rounded-[2px]"
                  :class="
                    settingsStore.layout === item.value
                      ? 'bg-primary/10 border border-primary/20'
                      : 'bg-muted/50'
                  "
                  :style="{ height: item.value === LayoutMode.TOP ? 'calc(100% - 16px)' : '100%' }"
                />
              </div>
              <!-- 布局名称 -->
              <span
                class="absolute bottom-1 left-0 right-0 text-center text-[10px] font-medium"
                :class="
                  settingsStore.layout === item.value ? 'text-primary' : 'text-muted-foreground'
                "
              >
                {{ item.label }}
              </span>
              <!-- 选中标记 -->
              <div
                v-if="settingsStore.layout === item.value"
                class="absolute top-1 right-1 size-4 rounded-full bg-primary flex items-center justify-center"
              >
                <CheckIcon class="size-2.5 text-primary-foreground" />
              </div>
            </button>
          </div>
        </section>
      </div>

      <!-- 底部固定按钮 -->
      <div class="px-6 py-4 border-t flex gap-3">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="default"
              size="sm"
              class="flex-1 gap-1.5"
              :disabled="copyLoading"
              @click="handleCopySettings"
            >
              <CopyIcon class="size-3.5" />
              {{ copyLoading ? "复制中..." : "复制配置" }}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" class="max-w-[260px] text-xs">
            复制当前设置的代码，可覆盖到 src/settings.ts 的 defaults 变量
          </TooltipContent>
        </Tooltip>
        <Button
          variant="outline"
          size="sm"
          class="flex-1 gap-1.5"
          @click="settingsStore.resetSettings()"
        >
          <RotateCcwIcon class="size-3.5" />
          重置设置
        </Button>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { ref, type Component } from "vue";
import { storeToRefs } from "pinia";
import { toast } from "vue-sonner";
import { SunIcon, MoonIcon, MonitorIcon, CheckIcon, CopyIcon, RotateCcwIcon } from "@lucide/vue";
import { LayoutMode, ThemeMode, PageSwitchingAnimationOptions } from "@/enums/settings";
import { useSettingsStore } from "@/stores";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const settingsStore = useSettingsStore();
const { showTagsView, showAppLogo, showWatermark, grayMode, colorWeak } =
  storeToRefs(settingsStore);

const copyLoading = ref(false);

const themeModes: { value: string; label: string; icon: Component }[] = [
  { value: ThemeMode.LIGHT, label: "亮色", icon: SunIcon },
  { value: ThemeMode.DARK, label: "暗色", icon: MoonIcon },
  { value: ThemeMode.AUTO, label: "自动", icon: MonitorIcon },
];

const layoutOptions = [
  { value: LayoutMode.LEFT, label: "左侧" },
  { value: LayoutMode.TOP, label: "顶部" },
  { value: LayoutMode.MIX, label: "混合" },
];

const animationOptions = Object.values(PageSwitchingAnimationOptions);

async function handleCopySettings() {
  copyLoading.value = true;
  try {
    const code = `import { LayoutMode, SidebarColor, ThemeMode, LanguageEnum } from "@/enums/settings";

export const defaults = {
  theme: ThemeMode.${settingsStore.theme.toUpperCase()},
  themeColor: "${settingsStore.themeColor}",
  sidebarColorScheme: SidebarColor.${settingsStore.sidebarColorScheme.toUpperCase().replace("-", "_")},
  layout: LayoutMode.${settingsStore.layout.toUpperCase()},
  language: LanguageEnum.ZH_CN,
  showTagsView: ${settingsStore.showTagsView},
  showAppLogo: ${settingsStore.showAppLogo},
  showWatermark: ${settingsStore.showWatermark},
  pageSwitchingAnimation: "${settingsStore.pageSwitchingAnimation}",
  showSettings: true,
} as const;`;
    await navigator.clipboard.writeText(code);
    toast.success("配置已复制到剪贴板");
  } catch {
    toast.error("复制失败");
  } finally {
    copyLoading.value = false;
  }
}
</script>
