import type { BaseQueryParams } from "@/api/common";

/** 配置查询参数 */
export interface ConfigQuery extends BaseQueryParams {
  keywords?: string;
}

/** 配置列表项 */
export interface ConfigItem {
  id: string;
  configName: string;
  configKey: string;
  configValue: string;
  remark: string;
  updateTime: string;
}

/** 配置表单 */
export interface ConfigForm {
  id?: string;
  configName: string;
  configKey: string;
  configValue: string;
  remark: string;
}
