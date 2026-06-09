<template>
  <div class="text-center pb-6 pt-4">
    <img
      :src="logoUrl"
      alt="Hypersense"
      class="w-16 h-16 rounded-2xl mx-auto mb-4 shadow-[0_0_32px_rgba(52,211,153,0.15),0_0_64px_rgba(99,102,241,0.08)]"
    />
    <h1
      class="text-2xl font-bold bg-gradient-to-r from-white via-emerald-400 to-indigo-400 bg-clip-text text-transparent"
    >
      {{ t("doc.hero.brandName") }}
    </h1>
    <p class="text-sm text-muted-foreground mt-1.5 tracking-widest">{{ t("doc.hero.orgName") }}</p>
    <p class="text-xs text-muted-foreground/60 mt-0.5 tracking-wider">
      {{ t("doc.hero.subtitle") }}
    </p>
    <div class="flex gap-3 justify-center mt-4">
      <span
        class="px-3 py-1 rounded-full text-xs border border-emerald-400/20 bg-emerald-400/8 text-emerald-400"
      >
        {{ t("doc.hero.explore") }}
      </span>
      <span
        class="px-3 py-1 rounded-full text-xs border border-emerald-400/20 bg-emerald-400/8 text-emerald-400"
      >
        {{ t("doc.hero.perceive") }}
      </span>
      <span
        class="px-3 py-1 rounded-full text-xs border border-emerald-400/20 bg-emerald-400/8 text-emerald-400"
      >
        {{ t("doc.hero.geek") }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import logoUrl from "@/assets/images/logo-dark.png";

const { t } = useI18n();
</script>
