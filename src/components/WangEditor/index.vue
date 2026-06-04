<template>
  <div class="border rounded-lg overflow-hidden">
    <!-- 工具栏 -->
    <Toolbar
      v-if="editorInstance"
      :editor="editorInstance"
      :default-config="toolbarConfig"
      mode="simple"
      class="border-b"
    />
    <!-- 编辑器 -->
    <Editor
      v-model="modelValue"
      :style="{ height: height, overflowY: 'hidden' }"
      :default-config="editorConfig"
      mode="simple"
      @on-created="handleCreated"
      @on-change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, watch, onBeforeUnmount } from "vue";
import "@wangeditor-next/editor/dist/css/style.css";
import { Toolbar, Editor } from "@wangeditor-next/editor-for-vue";
import type { IToolbarConfig, IEditorConfig } from "@wangeditor-next/editor";

type InsertFnType = (_url: string, _alt: string, _href: string) => void;

const props = withDefaults(
  defineProps<{
    height?: string;
    placeholder?: string;
  }>(),
  {
    height: "400px",
    placeholder: "请输入内容...",
  }
);

const modelValue = defineModel<string>({
  type: String,
  required: false,
  default: "",
});

// 编辑器实例，必须用 shallowRef
const editorInstance = shallowRef();
const innerUpdating = ref(false);

const toolbarConfig: Partial<IToolbarConfig> = {};

const editorConfig: Partial<IEditorConfig> = {
  placeholder: props.placeholder,
  MENU_CONF: {
    uploadImage: {
      async customUpload(file: File, insertFn: InsertFnType) {
        // Mock: 使用 ObjectURL 模拟上传，实际接入后端时替换为 FileAPI.uploadFile(file)
        const url = URL.createObjectURL(file);
        insertFn(url, file.name, url);
      },
    } as any,
  },
};

function handleCreated(editor: any) {
  editorInstance.value = editor;
}

function handleChange() {
  innerUpdating.value = true;
  Promise.resolve().then(() => {
    innerUpdating.value = false;
  });
}

watch(
  () => modelValue.value,
  () => {
    if (innerUpdating.value) return;
    // 外部赋值时重建编辑器以同步内容
    editorInstance.value = null;
  }
);

onBeforeUnmount(() => {
  const editor = editorInstance.value;
  if (editor == null) return;
  editor.destroy();
});
</script>
