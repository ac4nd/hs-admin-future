<template>
  <div class="p-5 space-y-5">
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle class="text-sm">富文本编辑器</CardTitle>
          <div class="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              :class="{ 'bg-muted': mode === 'preview' }"
              @click="mode = 'preview'"
            >
              编辑
            </Button>
            <Button
              variant="ghost"
              size="sm"
              :class="{ 'bg-muted': mode === 'source' }"
              @click="mode = 'source'"
            >
              源码
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent class="space-y-4">
        <!-- 编辑器 -->
        <div v-show="mode === 'preview'">
          <WangEditor v-model="content" height="400px" />
        </div>

        <!-- HTML 源码 -->
        <div v-if="mode === 'source'">
          <textarea
            v-model="content"
            class="w-full h-[420px] p-3 text-xs font-mono bg-muted/30 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <!-- 内容预览 -->
        <div class="border rounded-lg p-4">
          <h4 class="text-sm font-medium mb-3 text-muted-foreground">内容预览</h4>
          <div class="prose prose-sm max-w-none" v-html="content" />
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WangEditor from "@/components/WangEditor/index.vue";

const mode = ref<"preview" | "source">("preview");
const content = ref(`
<h2>欢迎使用 wangEditor 富文本编辑器</h2>
<p>基于 <strong>@wangeditor-next</strong> 实现的富文本编辑器组件。</p>
<ul>
  <li>支持文本格式化（加粗、斜体、下划线等）</li>
  <li>支持插入图片、链接、表格</li>
  <li>支持代码块、引用、分割线</li>
  <li>支持撤销/重做</li>
  <li>支持颜色、字体大小设置</li>
</ul>
<p>点击工具栏按钮即可使用各种功能。</p>
`);
</script>
