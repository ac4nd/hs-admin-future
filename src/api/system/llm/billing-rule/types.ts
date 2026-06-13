import type { BaseQueryParams } from "@/api/common";

export interface BillingRuleQueryParams extends BaseQueryParams {
  keywords?: string;
  vendorConfigId?: number;
  status?: number;
}

export interface BillingRuleItem {
  id: string;
  ruleName: string;
  vendorConfigId: number;
  vendorName: string;
  vendorCode: string;
  modelName: string;
  inputPrice: number;
  outputPrice: number;
  priceUnit: string;
  currency: string;
  billingType: number;
  status: number;
  sort: number;
  remark: string;
  createTime: string;
}

export interface BillingRuleForm {
  id?: string;
  ruleName?: string;
  vendorConfigId?: number;
  modelName?: string;
  inputPrice?: number;
  outputPrice?: number;
  priceUnit?: string;
  currency?: string;
  billingType?: number;
  status?: number;
  sort?: number;
  remark?: string;
}
