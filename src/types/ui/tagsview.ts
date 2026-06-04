import type { LocationQuery } from "vue-router";

export interface TagView {
  name: string;
  title: string;
  path: string;
  fullPath: string;
  icon?: string;
  affix?: boolean;
  keepAlive?: boolean;
  query?: LocationQuery;
}
