<template>
  <Sheet :open="settingsStore.settingsVisible" @update:open="settingsStore.settingsVisible = $event">
    <SheetContent side="right" class="w-[380px] overflow-y-auto">
      <SheetHeader>
        <SheetTitle>系统设置</SheetTitle>
        <SheetDescription>自定义界面外观和行为</SheetDescription>
      </SheetHeader>

      <div class="mt-6 space-y-6">
        <!-- 主题 -->
        <section>
          <h3 class="text-sm font-medium mb-3">主题模式</h3>
          <div class="grid grid-cols-3 gap-2">
            <Button
              v-for="mode in themeModes"
              :key="mode.value"
              :variant="settingsStore.theme === mode.value ? 'default' : 'outline'"
              size="sm"
              @click="settingsStore.theme = mode.value"
            >
              {{ mode.label }}
            </Button>
          </div>
        </section>

        <!-- 主题色 -->
        <section>
          <h3 class="text-sm font-medium mb-3">主题色</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="color in themeColorPresets"
              :key="color"
              class="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
              :class="settingsStore.themeColor === color ? 'border-foreground scale-110' : 'border-transparent'"
              :style="{ backgroundColor: color }"
              @click="settingsStore.themeColor = color"
            />
          </div>
        </section>

        <!-- 界面设置 -->
        <section>
          <h3 class="text-sm font-medium mb-3">界面</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">显示标签栏</span>
              <Switch :checked="settingsStore.showTagsView" @update:checked="settingsStore.showTagsView = $event" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">显示 Logo</span>
              <Switch :checked="settingsStore.showAppLogo" @update:checked="settingsStore.showAppLogo = $event" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">灰色模式</span>
              <Switch :checked="settingsStore.grayMode" @update:checked="settingsStore.grayMode = $event" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">色弱模式</span>
              <Switch :checked="settingsStore.colorWeak" @update:checked="settingsStore.colorWeak = $event" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">液态玻璃效果</span>
              <Switch :checked="settingsStore.glassEffect" @update:checked="settingsStore.glassEffect = $event" />
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
                  @input="settingsStore.setGlassParam(item.key, +($event.target as HTMLInputElement).value)"
                  class="glass-slider w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- 布局选择 -->
        <section>
          <h3 class="text-sm font-medium mb-3">布局模式</h3>
          <div class="grid grid-cols-3 gap-2">
            <Button
              v-for="item in layouts"
              :key="item.value"
              :variant="settingsStore.layout === item.value ? 'default' : 'outline'"
              size="sm"
              @click="settingsStore.layout = item.value"
            >
              {{ item.label }}
            </Button>
          </div>
        </section>

        <!-- 侧边栏配色 -->
        <section v-if="settingsStore.resolvedTheme !== ThemeMode.DARK">
          <h3 class="text-sm font-medium mb-3">侧边栏配色</h3>
          <div class="grid grid-cols-2 gap-2">
            <Button
              :variant="settingsStore.sidebarColorScheme === SidebarColor.MINIMAL_WHITE ? 'default' : 'outline'"
              size="sm"
              @click="settingsStore.sidebarColorScheme = SidebarColor.MINIMAL_WHITE"
            >
              极简白
            </Button>
            <Button
              :variant="settingsStore.sidebarColorScheme === SidebarColor.CLASSIC_BLUE ? 'default' : 'outline'"
              size="sm"
              @click="settingsStore.sidebarColorScheme = SidebarColor.CLASSIC_BLUE"
            >
              经典蓝
            </Button>
          </div>
        </section>

        <!-- 重置 -->
        <Button variant="outline" class="w-full" @click="settingsStore.resetSettings()">
          重置设置
        </Button>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { LayoutMode, SidebarColor, ThemeMode } from "@/enums/settings";
import { themeColorPresets } from "@/settings";
import { useSettingsStore } from "@/stores";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const settingsStore = useSettingsStore();

const themeModes = [
  { value: ThemeMode.LIGHT, label: "亮色" },
  { value: ThemeMode.DARK, label: "暗色" },
  { value: ThemeMode.AUTO, label: "自动" },
];

const layouts = [
  { value: LayoutMode.LEFT, label: "左侧" },
  { value: LayoutMode.TOP, label: "顶部" },
  { value: LayoutMode.MIX, label: "混合" },
];

const glassSliders = [
  { key: "displacementScale" as const, label: "折射强度", min: 0, max: 200, step: 1, color: "#3b82f6" },
  { key: "blur" as const, label: "背景模糊", min: 0, max: 30, step: 1, color: "#22c55e", suffix: "px" },
  { key: "saturation" as const, label: "饱和度", min: 100, max: 300, step: 10, color: "#a855f7", suffix: "%" },
  { key: "aberrationIntensity" as const, label: "色散强度", min: 0, max: 20, step: 0.5, color: "#06b6d4" },
  { key: "elasticity" as const, label: "弹性系数", min: 0, max: 1, step: 0.05, color: "#f97316" },
  { key: "cornerRadius" as const, label: "圆角", min: 0, max: 100, step: 1, color: "#ec4899", suffix: "px" },
];
</script>

<style>
/* 滑块 — 使用全局样式避免 scoped 伪元素问题 */
.glass-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e5e7eb;
  outline: none;
  cursor: pointer;
}
.glass-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
.glass-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  background: #2563eb;
}
.glass-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
.glass-slider::-moz-range-track {
  height: 6px;
  border-radius: 3px;
  background: #e5e7eb;
}
</style>
