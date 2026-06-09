<template>
  <div class="text-center py-8 text-xs text-muted-foreground/40">
    Hypersense · {{ t("doc.hero.orgName") }} · {{ t("doc.footer.tagline") }}
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
