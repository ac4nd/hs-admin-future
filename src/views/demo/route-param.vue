<template>
  <div class="p-5 space-y-4">
    <!-- 参数展示 -->
    <Card>
      <CardHeader>
        <CardTitle>{{ t("routeParam.title") }}</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- type 参数 -->
          <div class="rounded-lg border p-4 space-y-2">
            <p class="text-sm text-muted-foreground">type</p>
            <p class="text-2xl font-bold">
              <Badge
                :variant="typeValue === '1' ? 'default' : 'secondary'"
                class="text-base px-3 py-1"
              >
                {{ typeValue || "-" }}
              </Badge>
            </p>
          </div>
          <!-- 当前路径 -->
          <div class="rounded-lg border p-4 space-y-2">
            <p class="text-sm text-muted-foreground">{{ t("routeParam.currentPath") }}</p>
            <p class="text-sm font-mono bg-muted px-2 py-1 rounded">
              {{ route.fullPath }}
            </p>
          </div>
        </div>

        <!-- 参数说明 -->
        <div class="rounded-lg border p-4">
          <p class="text-sm text-muted-foreground mb-2">{{ t("routeParam.description") }}</p>
          <div class="bg-muted rounded-md p-3 font-mono text-sm space-y-1">
            <p>// {{ t("routeParam.getCodeTip") }}</p>
            <p>const type = useRoute().query.type</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 参数对比 -->
    <Card>
      <CardHeader>
        <CardTitle>{{ t("routeParam.compareTitle") }}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{{ t("routeParam.colParam") }}</TableHead>
              <TableHead>{{ t("routeParam.colValue") }}</TableHead>
              <TableHead>{{ t("routeParam.colRoute") }}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="row in paramRows"
              :key="row.route"
              :class="{ 'bg-primary/5': row.active }"
            >
              <TableCell class="font-mono text-sm">type</TableCell>
              <TableCell>
                <Badge :variant="row.active ? 'default' : 'outline'">{{ row.value }}</Badge>
              </TableCell>
              <TableCell class="text-sm text-muted-foreground">{{ row.route }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const { t } = useI18n();
const route = useRoute();

const typeValue = computed(() => (route.query.type as string) || "");

const paramRows = computed(() => [
  {
    param: "type",
    value: "1",
    route: "/route-param/route-param-type1?type=1",
    active: typeValue.value === "1",
  },
  {
    param: "type",
    value: "2",
    route: "/route-param/route-param-type2?type=2",
    active: typeValue.value === "2",
  },
]);
</script>
