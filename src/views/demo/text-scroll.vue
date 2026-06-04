<!-- 滚动文本示例 -->
<template>
  <div class="p-5 space-y-5">
    <Card>
      <CardHeader><CardTitle class="text-sm">基础滚动公告</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <TextScroll text="这是一条基础的滚动公告，默认向左滚动" />
        <TextScroll type="success" text="这是一条成功类型的滚动公告" />
        <TextScroll type="warning" text="这是一条警告类型的滚动公告" />
        <TextScroll type="danger" text="这是一条危险类型的滚动公告" />
        <TextScroll type="info" text="这是一条信息类型的滚动公告" />
        <TextScroll text="这是一条速度较慢、向右滚动的公告" :speed="30" direction="right" show-close />
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle class="text-sm">打字机效果</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <TextScroll text="欢迎使用 hs-admin-future 组件库，这里展示的是打字机逐字显示效果" typewriter />
        <TextScroll text="支持自定义速度、方向和关闭按钮，可灵活配置" :speed="60" typewriter />
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle class="text-sm">自定义配置</CardTitle></CardHeader>
      <CardContent class="space-y-3">
        <div class="flex items-center gap-4 text-sm">
          <Label class="w-20">速度</Label>
          <Input v-model.number="customSpeed" type="number" class="w-24 h-8" />
          <Label>px/s</Label>
        </div>
        <TextScroll :text="customText" :speed="customSpeed" :direction="customDir" />
        <div class="flex items-center gap-4 text-sm">
          <Label class="w-20">内容</Label>
          <Input v-model="customText" class="flex-1 h-8" />
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextScroll from "./components/TextScroll.vue";

const customSpeed = ref(50);
const customDir = ref("left");
const customText = ref("这是一条可以自定义速度和内容的滚动公告");
</script>
