<template>
  <div class="p-5 space-y-4">
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle class="text-sm">Lucide Icons</CardTitle>
          <Badge variant="outline">{{ filteredIcons.length }} / {{ iconNames.length }}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Input v-model="keyword" placeholder="搜索图标名称..." class="w-64 h-8 mb-4" />
        <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
          <TooltipProvider :delay-duration="300">
            <Tooltip v-for="name in filteredIcons" :key="name">
              <TooltipTrigger as-child>
                <button
                  class="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border hover:bg-muted/50 hover:border-primary/30 transition-colors cursor-pointer group"
                  @click="copyIcon(name)"
                >
                  <component :is="iconMap[name]" class="size-5 text-muted-foreground group-hover:text-foreground" />
                  <span class="text-[10px] text-muted-foreground truncate w-full text-center">{{ name.replace('Icon', '') }}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" class="font-mono text-xs">
                &lt;{{ name }} class="size-4" /&gt;
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div v-if="filteredIcons.length === 0" class="py-12 text-center text-muted-foreground text-sm">
          未找到匹配的图标
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Component } from "vue";
import { toast } from "vue-sonner";
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
  SunIcon, MoonIcon, CloudIcon, CloudRainIcon, WindIcon, ThermometerIcon,
  ZapIcon, ShieldIcon, KeyIcon, UsersIcon, UserPlusIcon, UserMinusIcon,
  LogInIcon, LogOutIcon, MenuIcon, LayoutGridIcon, ListIcon, GridIcon,
  ShoppingCartIcon, PackageIcon, GiftIcon, CreditCardIcon, WalletIcon,
  ScanIcon, QrCodeIcon, BarChartIcon, PieChartIcon,
  ActivityIcon, TrendingUpIcon, TrendingDownIcon, TargetIcon, CrosshairIcon,
  CompassIcon, NavigationIcon, MapPinIcon, FlagIcon,
  ExternalLinkIcon, LinkIcon, UnlinkIcon, PaperclipIcon, SendIcon,
  InboxIcon, ArchiveIcon, Trash2Icon, FolderOpenIcon,
  FileTextIcon, FilePlusIcon, FileCheckIcon, FileXIcon, FileMinusIcon,
  ClipboardIcon, ClipboardCopyIcon, ClipboardCheckIcon, ClipboardListIcon,
  PencilIcon, PenToolIcon, BrushIcon, EraserIcon, TypeIcon,
  BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, AlignLeftIcon,
  AlignCenterIcon, AlignRightIcon, AlignJustifyIcon, IndentIcon, OutdentIcon,
  MessageSquareIcon, MessageCircleIcon, PhoneIcon, PhoneCallIcon, PhoneForwardedIcon,
  VideoIcon, VideoOffIcon, MonitorIcon, MonitorOffIcon, MaximizeIcon,
  MinimizeIcon, MoveIcon,
  ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon, ChevronsLeftIcon, ChevronsRightIcon,
  ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon, ArrowLeftRightIcon, ArrowUpDownIcon,
  RotateCwIcon, RotateCcwIcon, RefreshCwIcon, RewindIcon, FastForwardIcon,
  SkipBackIcon, SkipForwardIcon, PlayIcon, PauseIcon, StopCircleIcon,
  CircleIcon, SquareIcon, TriangleIcon, HexagonIcon, OctagonIcon,
  CheckCircleIcon, XCircleIcon, AlertTriangleIcon, BanIcon, ShieldCheckIcon,
  ShieldAlertIcon, ShieldXIcon, FingerprintIcon, ScanFaceIcon, ScanLineIcon,
  TimerIcon, TimerOffIcon, AlarmClockIcon,
  SaveIcon, DownloadCloudIcon, UploadCloudIcon, HardDriveIcon, ServerIcon,
  Globe2Icon, GlobeLockIcon, AtomIcon, FlameIcon,
  SparklesIcon, WandIcon, PaletteIcon, SwatchBookIcon, PipetteIcon,
} from "@lucide/vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  SunIcon, MoonIcon, CloudIcon, CloudRainIcon, WindIcon, ThermometerIcon,
  ZapIcon, ShieldIcon, KeyIcon, UsersIcon, UserPlusIcon, UserMinusIcon,
  LogInIcon, LogOutIcon, MenuIcon, LayoutGridIcon, ListIcon, GridIcon,
  ShoppingCartIcon, PackageIcon, GiftIcon, CreditCardIcon, WalletIcon,
  ScanIcon, QrCodeIcon, BarChartIcon, PieChartIcon,
  ActivityIcon, TrendingUpIcon, TrendingDownIcon, TargetIcon, CrosshairIcon,
  CompassIcon, NavigationIcon, MapPinIcon, FlagIcon,
  ExternalLinkIcon, LinkIcon, UnlinkIcon, PaperclipIcon, SendIcon,
  InboxIcon, ArchiveIcon, Trash2Icon, FolderOpenIcon,
  FileTextIcon, FilePlusIcon, FileCheckIcon, FileXIcon, FileMinusIcon,
  ClipboardIcon, ClipboardCopyIcon, ClipboardCheckIcon, ClipboardListIcon,
  PencilIcon, PenToolIcon, BrushIcon, EraserIcon, TypeIcon,
  BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, AlignLeftIcon,
  AlignCenterIcon, AlignRightIcon, AlignJustifyIcon, IndentIcon, OutdentIcon,
  MessageSquareIcon, MessageCircleIcon, PhoneIcon, PhoneCallIcon, PhoneForwardedIcon,
  VideoIcon, VideoOffIcon, MonitorIcon, MonitorOffIcon, MaximizeIcon,
  MinimizeIcon, MoveIcon,
  ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon, ChevronsLeftIcon, ChevronsRightIcon,
  ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon, ArrowLeftRightIcon, ArrowUpDownIcon,
  RotateCwIcon, RotateCcwIcon, RefreshCwIcon, RewindIcon, FastForwardIcon,
  SkipBackIcon, SkipForwardIcon, PlayIcon, PauseIcon, StopCircleIcon,
  CircleIcon, SquareIcon, TriangleIcon, HexagonIcon, OctagonIcon,
  CheckCircleIcon, XCircleIcon, AlertTriangleIcon, BanIcon, ShieldCheckIcon,
  ShieldAlertIcon, ShieldXIcon, FingerprintIcon, ScanFaceIcon, ScanLineIcon,
  TimerIcon, TimerOffIcon, AlarmClockIcon,
  SaveIcon, DownloadCloudIcon, UploadCloudIcon, HardDriveIcon, ServerIcon,
  Globe2Icon, GlobeLockIcon, AtomIcon, FlameIcon,
  SparklesIcon, WandIcon, PaletteIcon, SwatchBookIcon, PipetteIcon,
};

const iconNames = Object.keys(iconMap);
const keyword = ref("");

const filteredIcons = computed(() => {
  if (!keyword.value) return iconNames;
  const kw = keyword.value.toLowerCase().replace("icon", "");
  return iconNames.filter((n) => n.toLowerCase().replace("icon", "").includes(kw));
});

function copyIcon(name: string) {
  const code = `<${name} class="size-4" />`;
  navigator.clipboard.writeText(code).then(() => {
    toast.success(`已复制: ${code}`);
  });
}
</script>
