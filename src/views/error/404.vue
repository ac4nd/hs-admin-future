<template>
  <div class="flex items-center justify-center min-h-[60vh]">
    <div class="text-center space-y-4">
      <h1 class="text-7xl font-bold text-muted-foreground/30">404</h1>
      <h2 class="text-xl font-semibold text-foreground">页面不存在</h2>
      <p class="text-sm text-muted-foreground">抱歉，您访问的页面不存在，请确认网址是否正确</p>
      <div class="flex items-center justify-center gap-3 pt-2">
        <Button variant="outline" size="sm" @click="router.back()">返回上页</Button>
        <Button size="sm" @click="router.push('/')">回到首页</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";

const router = useRouter();
</script>
