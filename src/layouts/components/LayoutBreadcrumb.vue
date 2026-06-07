<template>
  <Breadcrumb v-if="breadcrumbs.length > 0">
    <BreadcrumbList>
      <template v-for="(crumb, idx) in breadcrumbs" :key="crumb.path">
        <BreadcrumbItem>
          <BreadcrumbLink
            v-if="idx < breadcrumbs.length - 1"
            class="cursor-pointer text-muted-foreground text-sm inline-flex items-center"
            @click="router.push(crumb.path)"
          >
            <MenuIcon v-if="crumb.icon" :icon="crumb.icon" class="mr-1" />
            {{ translateRouteTitle(crumb.title) }}
          </BreadcrumbLink>
          <BreadcrumbPage v-else class="text-sm font-medium inline-flex items-center">
            <MenuIcon v-if="crumb.icon" :icon="crumb.icon" class="mr-1" />
            {{ translateRouteTitle(crumb.title) }}
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="idx < breadcrumbs.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { translateRouteTitle } from "@/utils/i18n";

interface BreadcrumbItem {
  title: string;
  icon?: string;
  path: string;
}

const route = useRoute();
const router = useRouter();

const breadcrumbs = computed(() =>
  route.matched
    .filter((r) => r.meta?.title && !r.meta?.hidden && !r.meta?.hideInBreadcrumb)
    .map((r) => ({
      title: r.meta.title as string,
      icon: r.meta.icon as string | undefined,
      path: r.path,
    }))
);
</script>
