<!-- 文件上传组件示例 -->
<template>
  <div class="p-5 space-y-5">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- 单图上传 -->
      <Card>
        <CardHeader><CardTitle class="text-sm">单图上传</CardTitle></CardHeader>
        <CardContent>
          <div class="space-y-3">
            <div
              class="relative group w-40 h-40 rounded-lg border-2 border-dashed border-muted-foreground/25 overflow-hidden"
            >
              <img
                v-if="singleUrl"
                :src="singleUrl"
                alt="preview"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="flex flex-col items-center justify-center h-full text-muted-foreground"
              >
                <ImageIcon class="size-8 mb-1" />
                <span class="text-xs">点击上传</span>
              </div>
              <input
                ref="singleInputRef"
                type="file"
                accept="image/*"
                class="hidden"
                @change="onSingleUpload"
              />
              <div
                class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
              >
                <Button variant="secondary" size="sm" @click="singleInputRef?.click()">选择</Button>
                <Button v-if="singleUrl" variant="destructive" size="sm" @click="singleUrl = ''">
                  <TrashIcon class="size-3" />
                </Button>
              </div>
            </div>
            <p class="text-xs text-muted-foreground">支持 jpg/png/gif，建议尺寸 400x400</p>
          </div>
        </CardContent>
      </Card>

      <!-- 多图上传 -->
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle class="text-sm">多图上传</CardTitle>
            <span class="text-xs text-muted-foreground">
              {{ multiUrls.length }}/{{ multiLimit }}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div class="flex flex-wrap gap-3">
            <div
              v-for="(url, idx) in multiUrls"
              :key="idx"
              class="relative group w-28 h-28 rounded-lg border overflow-hidden"
            >
              <img :src="url" alt="" class="w-full h-full object-cover" />
              <div
                class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <Button variant="destructive" size="icon-xs" @click="multiUrls.splice(idx, 1)">
                  <XIcon class="size-3" />
                </Button>
              </div>
            </div>
            <label
              v-if="multiUrls.length < multiLimit"
              class="w-28 h-28 rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
            >
              <input type="file" accept="image/*" multiple class="hidden" @change="onMultiUpload" />
              <PlusIcon class="size-6 text-muted-foreground" />
              <span class="text-xs text-muted-foreground mt-1">上传</span>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- 文件上传 -->
    <Card>
      <CardHeader><CardTitle class="text-sm">文件上传</CardTitle></CardHeader>
      <CardContent>
        <div class="space-y-2">
          <div
            v-for="(file, idx) in fileList"
            :key="idx"
            class="flex items-center gap-3 px-3 py-2 rounded-lg border"
          >
            <FileIcon class="size-4 text-muted-foreground shrink-0" />
            <span class="flex-1 text-sm truncate">{{ file.name }}</span>
            <span class="text-xs text-muted-foreground">{{ file.size }}</span>
            <Button variant="ghost" size="icon-xs" @click="fileList.splice(idx, 1)">
              <XIcon class="size-3" />
            </Button>
          </div>
          <label
            class="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-muted-foreground/25 cursor-pointer hover:border-primary/50 transition-colors"
          >
            <input type="file" multiple class="hidden" @change="onFileUpload" />
            <UploadIcon class="size-4 text-muted-foreground" />
            <span class="text-sm text-muted-foreground">点击或拖拽文件到此处上传</span>
          </label>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { toast } from "vue-sonner";
import { ImageIcon, TrashIcon, XIcon, PlusIcon, FileIcon, UploadIcon } from "@lucide/vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const singleUrl = ref("https://picsum.photos/400/400?random=1");
const singleInputRef = ref<HTMLInputElement>();

const multiLimit = 4;
const multiUrls = ref([
  "https://picsum.photos/200/200?random=2",
  "https://picsum.photos/200/200?random=3",
]);

const fileList = ref([
  { name: "项目需求文档.pdf", size: "2.3 MB" },
  { name: "设计稿-v2.fig", size: "15.8 MB" },
]);

function onSingleUpload(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  singleUrl.value = URL.createObjectURL(file);
  toast.success("上传成功");
  input.value = "";
}

function onMultiUpload(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (!files) return;
  for (const f of files) {
    if (multiUrls.value.length >= multiLimit) break;
    multiUrls.value.push(URL.createObjectURL(f));
  }
  toast.success(
    `已上传 ${Math.min(files.length, multiLimit - multiUrls.value.length + files.length)} 张图片`
  );
}

function onFileUpload(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (!files) return;
  for (const f of files) {
    fileList.value.push({
      name: f.name,
      size:
        f.size > 1024 * 1024
          ? `${(f.size / 1024 / 1024).toFixed(1)} MB`
          : `${(f.size / 1024).toFixed(0)} KB`,
    });
  }
  toast.success(`已添加 ${files.length} 个文件`);
}
</script>
