<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon">
        <Languages class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        v-for="item in langOptions"
        :key="item.value"
        :disabled="appStore.language === item.value"
        @click="handleLanguageChange(item.value)"
      >
        <Check v-if="appStore.language === item.value" class="mr-2 h-4 w-4" />
        <span v-else class="mr-2 w-4" />
        {{ item.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { Check, Languages } from "@lucide/vue";
import { useI18n } from "vue-i18n";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore } from "@/stores";
import i18n from "@/lang";

const { t } = useI18n();
const appStore = useAppStore();

const langOptions = [
  { label: "中文", value: "zh-cn" },
  { label: "English", value: "en" },
];

function handleLanguageChange(lang: string) {
  appStore.changeLanguage(lang);
  i18n.global.locale.value = lang as any;
}
</script>
