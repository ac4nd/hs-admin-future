import type { BaseQueryParams } from "@/api/common";

export interface ApiKeyConfigQueryParams extends BaseQueryParams {
  keywords?: string;
  vendorConfigId?: number;
  status?: number;
}

export interface ApiKeyConfigItem {
  id: string;
  keyName: string;
  secret: string;
  vendorConfigId: number;
  vendorName: string;
  vendorCode: string;
  rateLimitRpm: number | null;
  rateLimitTpd: number | null;
  maxTokensPerDay: number | null;
  usedTokens: number;
  totalCost: number;
  expiresAt: string | null;
  status: number;
  remark: string;
  createTime: string;
}

export interface ApiKeyConfigForm {
  id?: string;
  keyName?: string;
  vendorConfigId?: number;
  rateLimitRpm?: number | null;
  rateLimitTpd?: number | null;
  maxTokensPerDay?: number | null;
  expiresAt?: string | null;
  status?: number;
  remark?: string;
}
