import type { BaseQueryParams } from "@/api/common";

export interface UsageLogQueryParams extends BaseQueryParams {
  modelName?: string;
  apiKeyConfigId?: number;
  vendorConfigId?: number;
  status?: number;
  startTime?: string;
  endTime?: string;
}

export interface UsageLogItem {
  id: string;
  apiKeyConfigId: number;
  apiKeyName: string;
  vendorConfigId: number;
  vendorName: string;
  modelName: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
  requestId: string;
  userId: number;
  durationMs: number;
  status: number;
  errorMessage: string;
  createTime: string;
}
