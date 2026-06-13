import type { BaseQueryParams } from "@/api/common";

export interface ModelConfigQueryParams extends BaseQueryParams {
  keywords?: string;
  apiKeyConfigId?: number;
  status?: number;
}

export interface ModelConfigItem {
  id: string;
  apiKeyConfigId: number;
  keyName: string;
  modelName: string;
  modelDisplayName: string;
  contextWindowSize: number;
  maxOutputTokens: number;
  modelCapabilities: string;
  temperature: number;
  topP: number;
  isStreaming: number;
  status: number;
  sort: number;
  remark: string;
  createTime: string;
}

export interface ModelConfigForm {
  id?: string;
  apiKeyConfigId?: number;
  modelName?: string;
  modelDisplayName?: string;
  contextWindowSize?: number;
  maxOutputTokens?: number;
  modelCapabilities?: string;
  temperature?: number;
  topP?: number;
  isStreaming?: number;
  status?: number;
  sort?: number;
  remark?: string;
}
