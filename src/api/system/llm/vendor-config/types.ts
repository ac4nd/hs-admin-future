import type { BaseQueryParams } from "@/api/common";

export interface VendorConfigQueryParams extends BaseQueryParams {
  keywords?: string;
  status?: number;
}

export interface VendorConfigItem {
  id: string;
  vendorName: string;
  vendorCode: string;
  configKey: string;
  isCodingPlan: number;
  accessLevel: number;
  baseUrl: string;
  availableQuota: number | null;
  usedQuota: number;
  quotaUnit: string;
  status: number;
  sort: number;
  remark: string;
  createTime: string;
}

export interface VendorConfigForm {
  id?: string;
  vendorName?: string;
  vendorCode?: string;
  configKey?: string;
  isCodingPlan?: number;
  accessLevel?: number;
  baseUrl?: string;
  availableQuota?: number | null;
  quotaUnit?: string;
  status?: number;
  sort?: number;
  remark?: string;
}
