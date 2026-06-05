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

        <!-- 主题色 -->
        <section>
          <h3 class="text-sm font-medium mb-3">主题色</h3>
          <div class="flex flex-wrap gap-2.5">
            <button
              v-for="color in themeColorPresets"
              :key="color"
              class="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer"
              :class="
                settingsStore.themeColor === color
                  ? 'border-foreground scale-110 ring-2 ring-foreground/20'
                  : 'border-transparent'
              "
              :style="{ backgroundColor: color }"
              @click="settingsStore.themeColor = color"
            />
            <!-- 自定义取色器 -->
            <div class="relative">
              <button
                class="w-7 h-7 rounded-full border-2 border-dashed border-muted-foreground/40 flex items-center justify-center hover:border-primary/50 transition-colors cursor-pointer"
                :class="{
                  'border-primary ring-2 ring-primary/20': !themeColorPresets.includes(
                    settingsStore.themeColor as any
                  ),
                }"
                @click="colorInputRef?.click()"
              >
                <PipetteIcon class="size-3 text-muted-foreground" />
              </button>
              <input
                ref="colorInputRef"
                type="color"
                :value="settingsStore.themeColor"
                class="absolute opacity-0 w-0 h-0"
                @input="settingsStore.themeColor = ($event.target as HTMLInputElement).value"
              />
            </div>
          </div>
        </section>

        <!-- 界面设置 -->
        <section>
          <h3 class="text-sm font-medium mb-3">界面</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">显示标签栏</span>
              <Switch
                :checked="settingsStore.showTagsView"
                @update:checked="settingsStore.showTagsView = $event"
              />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">显示 Logo</span>
              <Switch
                :checked="settingsStore.showAppLogo"
                @update:checked="settingsStore.showAppLogo = $event"
              />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">水印</span>
              <Switch
                :checked="settingsStore.showWatermark"
                @update:checked="settingsStore.showWatermark = $event"
              />
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
              <Switch
                :checked="settingsStore.grayMode"
                @update:checked="settingsStore.grayMode = $event"
              />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">色弱模式</span>
              <Switch
                :checked="settingsStore.colorWeak"
                @update:checked="settingsStore.colorWeak = $event"
              />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">液态玻璃效果</span>
              <Switch
                :checked="settingsStore.glassEffect"
                @update:checked="settingsStore.glassEffect = $event"
              />
            </div>

            <!-- 玻璃参数调节 -->
            <div
              class="space-y-3 pl-2 border-l-2 border-primary/20 pt-1"
              :class="{ 'opacity-40 pointer-events-none': !settingsStore.glassEffect }"
            >
              <div v-for="item in glassSliders" :key="item.key">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs text-muted-foreground">{{ item.label }}</span>
                  <span class="text-xs font-mono" :style="{ color: item.color }">
                    {{ settingsStore.glassParams?.[item.key] }}{{ item.suffix }}
                  </span>
                </div>
                <input
                  type="range"
                  :min="item.min"
                  :max="item.max"
                  :step="item.step"
                  :value="settingsStore.glassParams?.[item.key]"
                  class="glass-slider w-full"
                  @input="
                    settingsStore.setGlassParam(
                      item.key,
                      +($event.target as HTMLInputElement).value
                    )
                  "
                />
              </div>
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

        <!-- 侧边栏配色 -->
        <section v-if="settingsStore.resolvedTheme !== ThemeMode.DARK">
          <h3 class="text-sm font-medium mb-3">侧边栏配色</h3>
          <div class="grid grid-cols-2 gap-2">
            <Button
              :variant="
                settingsStore.sidebarColorScheme === SidebarColor.MINIMAL_WHITE
                  ? 'default'
                  : 'outline'
              "
              size="sm"
              @click="settingsStore.sidebarColorScheme = SidebarColor.MINIMAL_WHITE"
            >
              极简白
            </Button>
            <Button
              :variant="
                settingsStore.sidebarColorScheme === SidebarColor.CLASSIC_BLUE
                  ? 'default'
                  : 'outline'
              "
              size="sm"
              @click="settingsStore.sidebarColorScheme = SidebarColor.CLASSIC_BLUE"
            >
              经典蓝
            </Button>
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
import { toast } from "vue-sonner";
import {
  SunIcon,
  MoonIcon,
  MonitorIcon,
  CheckIcon,
  CopyIcon,
  RotateCcwIcon,
  PipetteIcon,
} from "@lucide/vue";
import {
  LayoutMode,
  SidebarColor,
  ThemeMode,
  PageSwitchingAnimationOptions,
} from "@/enums/settings";
import { themeColorPresets } from "@/settings";
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

const colorInputRef = ref<HTMLInputElement>();
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

const glassSliders = [
  {
    key: "displacementScale" as const,
    label: "折射强度",
    min: 0,
    max: 200,
    step: 1,
    color: "#3b82f6",
  },
  {
    key: "blur" as const,
    label: "背景模糊",
    min: 0,
    max: 30,
    step: 1,
    color: "#22c55e",
    suffix: "px",
  },
  {
    key: "saturation" as const,
    label: "饱和度",
    min: 100,
    max: 300,
    step: 10,
    color: "#a855f7",
    suffix: "%",
  },
  {
    key: "aberrationIntensity" as const,
    label: "色散强度",
    min: 0,
    max: 20,
    step: 0.5,
    color: "#06b6d4",
  },
  { key: "elasticity" as const, label: "弹性系数", min: 0, max: 1, step: 0.05, color: "#f97316" },
  {
    key: "cornerRadius" as const,
    label: "圆角",
    min: 0,
    max: 100,
    step: 1,
    color: "#ec4899",
    suffix: "px",
  },
];

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
  glassEffect: ${settingsStore.glassEffect},
  glassParams: {
    displacementScale: ${settingsStore.glassParams?.displacementScale},
    blur: ${settingsStore.glassParams?.blur},
    saturation: ${settingsStore.glassParams?.saturation},
    aberrationIntensity: ${settingsStore.glassParams?.aberrationIntensity},
    elasticity: ${settingsStore.glassParams?.elasticity},
    cornerRadius: ${settingsStore.glassParams?.cornerRadius},
  },
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

<style>
/* 滑块 — 使用全局样式避免 scoped 伪元素问题 */
.glass-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: hsl(var(--muted));
  outline: none;
  cursor: pointer;
}
.glass-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: hsl(var(--primary));
  cursor: pointer;
  border: 2px solid hsl(var(--background));
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
.glass-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}
.glass-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: hsl(var(--primary));
  cursor: pointer;
  border: 2px solid hsl(var(--background));
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
.glass-slider::-moz-range-track {
  height: 6px;
  border-radius: 3px;
  background: hsl(var(--muted));
}
</style>
