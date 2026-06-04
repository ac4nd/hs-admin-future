<!-- 图标选择器示例 -->
<template>
  <div class="p-5 space-y-5">
    <Card>
      <CardHeader><CardTitle class="text-sm">图标选择器</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center gap-3">
          <Label class="w-20 text-sm">选中图标</Label>
          <div class="flex items-center gap-2">
            <Popover v-model:open="popoverOpen">
              <PopoverTrigger as-child>
                <Button variant="outline" class="w-64 justify-start gap-2">
                  <component :is="currentIcon" v-if="currentIcon" class="size-4" />
                  <span v-if="currentIcon">{{ selectedIcon }}</span>
                  <span v-else class="text-muted-foreground">请选择图标</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-80 p-3" align="start">
                <Input v-model="keyword" placeholder="搜索图标..." class="mb-3 h-8" />
                <ScrollArea class="h-64">
                  <div class="grid grid-cols-6 gap-1">
                    <Button
                      v-for="name in filteredIcons"
                      :key="name"
                      variant="ghost"
                      size="icon-sm"
                      :class="{ 'bg-primary text-primary-foreground': name === selectedIcon }"
                      @click="selectIcon(name)"
                    >
                      <component :is="iconMap[name]" class="size-4" />
                    </Button>
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <Label class="w-20 text-sm">当前值</Label>
          <code class="text-xs bg-muted px-2 py-1 rounded">{{ selectedIcon || "无" }}</code>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Component } from "vue";
import {
  SearchIcon, SettingsIcon, UserIcon, BellIcon, MailIcon, HomeIcon,
  StarIcon, HeartIcon, BookmarkIcon, ShareIcon, CopyIcon, TrashIcon,
  EditIcon, PlusIcon, MinusIcon, CheckIcon, XIcon, AlertCircleIcon,
  InfoIcon, HelpCircleIcon, FileIcon, FolderIcon, ImageIcon, CameraIcon,
  DownloadIcon, UploadIcon, RefreshCcwIcon, LockIcon, UnlockIcon,
  EyeIcon, EyeOffIcon, GlobeIcon, MapIcon, CalendarIcon, ClockIcon,
  FilterIcon, SortAscIcon, ChevronRightIcon, ArrowRightIcon, MoreHorizontalIcon,
  DatabaseIcon, CodeIcon, TerminalIcon, CpuIcon, SmartphoneIcon, PrinterIcon,
  MicIcon, VolumeIcon, WifiIcon, BluetoothIcon, BatteryIcon, PowerIcon,
} from "@lucide/vue";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

const iconMap: Record<string, Component> = {
  SearchIcon, SettingsIcon, UserIcon, BellIcon, MailIcon, HomeIcon,
  StarIcon, HeartIcon, BookmarkIcon, ShareIcon, CopyIcon, TrashIcon,
  EditIcon, PlusIcon, MinusIcon, CheckIcon, XIcon, AlertCircleIcon,
  InfoIcon, HelpCircleIcon, FileIcon, FolderIcon, ImageIcon, CameraIcon,
  DownloadIcon, UploadIcon, RefreshCcwIcon, LockIcon, UnlockIcon,
  EyeIcon, EyeOffIcon, GlobeIcon, MapIcon, CalendarIcon, ClockIcon,
  FilterIcon, SortAscIcon, ChevronRightIcon, ArrowRightIcon, MoreHorizontalIcon,
  DatabaseIcon, CodeIcon, TerminalIcon, CpuIcon, SmartphoneIcon, PrinterIcon,
  MicIcon, VolumeIcon, WifiIcon, BluetoothIcon, BatteryIcon, PowerIcon,
};

const iconNames = Object.keys(iconMap);
const selectedIcon = ref("EditIcon");
const keyword = ref("");
const popoverOpen = ref(false);

const currentIcon = computed(() => selectedIcon.value ? iconMap[selectedIcon.value] : null);

const filteredIcons = computed(() => {
  if (!keyword.value) return iconNames;
  const kw = keyword.value.toLowerCase();
  return iconNames.filter((n) => n.toLowerCase().includes(kw));
});

function selectIcon(name: string) {
  selectedIcon.value = name;
  popoverOpen.value = false;
}
</script>
