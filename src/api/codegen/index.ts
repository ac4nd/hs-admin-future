/**
 * 代码生成 API（Mock 实现）
 *
 * TODO: 接入后端 API 后替换为 HTTP 请求
 */
import type { PageResult, OptionItem } from "@/api/common";
import type { TableQuery, TableItem, GenConfigForm, FieldConfig, GeneratorPreviewItem } from "./types";

const TABLE_STORAGE_KEY = "mock_codegen_tables";
const CONFIG_STORAGE_KEY = "mock_codegen_configs";

// ==================== 默认数据 ====================

function getDefaultTables(): TableItem[] {
  return [
    { tableName: "sys_user", tableComment: "用户信息表", isConfigured: 1, engine: "InnoDB", tableCollation: "utf8mb4_general_ci", createTime: "2026-01-15 10:00:00" },
    { tableName: "sys_role", tableComment: "角色信息表", isConfigured: 1, engine: "InnoDB", tableCollation: "utf8mb4_general_ci", createTime: "2026-01-15 10:00:00" },
    { tableName: "sys_menu", tableComment: "菜单权限表", isConfigured: 0, engine: "InnoDB", tableCollation: "utf8mb4_general_ci", createTime: "2026-01-15 10:00:00" },
    { tableName: "sys_dept", tableComment: "部门表", isConfigured: 0, engine: "InnoDB", tableCollation: "utf8mb4_general_ci", createTime: "2026-01-15 10:00:00" },
    { tableName: "sys_dict_type", tableComment: "字典类型表", isConfigured: 0, engine: "InnoDB", tableCollation: "utf8mb4_general_ci", createTime: "2026-01-16 14:30:00" },
    { tableName: "sys_dict_data", tableComment: "字典数据表", isConfigured: 0, engine: "InnoDB", tableCollation: "utf8mb4_general_ci", createTime: "2026-01-16 14:30:00" },
    { tableName: "sys_log", tableComment: "系统操作日志表", isConfigured: 0, engine: "InnoDB", tableCollation: "utf8mb4_general_ci", createTime: "2026-01-17 09:00:00" },
    { tableName: "sys_config", tableComment: "参数配置表", isConfigured: 0, engine: "InnoDB", tableCollation: "utf8mb4_general_ci", createTime: "2026-01-17 09:00:00" },
    { tableName: "sys_notice", tableComment: "通知公告表", isConfigured: 0, engine: "InnoDB", tableCollation: "utf8mb4_general_ci", createTime: "2026-01-18 11:20:00" },
    { tableName: "sys_tenant", tableComment: "租户表", isConfigured: 0, engine: "InnoDB", tableCollation: "utf8mb4_general_ci", createTime: "2026-02-01 08:00:00" },
    { tableName: "biz_product", tableComment: "商品信息表", isConfigured: 0, engine: "InnoDB", tableCollation: "utf8mb4_general_ci", createTime: "2026-03-10 16:45:00" },
    { tableName: "biz_order", tableComment: "订单信息表", isConfigured: 0, engine: "InnoDB", tableCollation: "utf8mb4_general_ci", createTime: "2026-03-12 10:30:00" },
  ];
}

function loadTables(): TableItem[] {
  try {
    const raw = localStorage.getItem(TABLE_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  const defaults = getDefaultTables();
  saveTables(defaults);
  return defaults;
}

function saveTables(tables: TableItem[]) {
  localStorage.setItem(TABLE_STORAGE_KEY, JSON.stringify(tables));
}

function loadConfigs(): Record<string, GenConfigForm> {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  // 预置已配置表的默认配置
  const defaults: Record<string, GenConfigForm> = {
    sys_user: {
      id: "1", tableName: "sys_user", businessName: "用户管理", moduleName: "system",
      packageName: "com.hypersense.boot", entityName: "User", author: "hypersense",
      parentMenuId: "1", backendAppName: "godlikeagents", frontendAppName: "hs-admin",
      pageType: "classic", removeTablePrefix: "sys_",
      fieldConfigs: getDefaultUserFields(),
    },
    sys_role: {
      id: "2", tableName: "sys_role", businessName: "角色管理", moduleName: "system",
      packageName: "com.hypersense.boot", entityName: "Role", author: "hypersense",
      parentMenuId: "1", backendAppName: "godlikeagents", frontendAppName: "hs-admin",
      pageType: "classic", removeTablePrefix: "sys_",
      fieldConfigs: getDefaultRoleFields(),
    },
  };
  saveConfigs(defaults);
  return defaults;
}

function saveConfigs(configs: Record<string, GenConfigForm>) {
  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(configs));
}

// ==================== 字段 Mock 数据 ====================

function getDefaultUserFields(): FieldConfig[] {
  return [
    { id: "1", columnName: "id", columnType: "bigint", fieldName: "id", fieldType: "Long", fieldComment: "用户ID", isShowInList: 0, isShowInForm: 0, isShowInQuery: 0, isRequired: 0, formType: 10, queryType: 1, fieldSort: 1 },
    { id: "2", columnName: "username", columnType: "varchar(50)", fieldName: "username", fieldType: "String", fieldComment: "用户名", isShowInList: 1, isShowInForm: 1, isShowInQuery: 1, isRequired: 1, formType: 1, queryType: 2, fieldSort: 2 },
    { id: "3", columnName: "nickname", columnType: "varchar(50)", fieldName: "nickname", fieldType: "String", fieldComment: "昵称", isShowInList: 1, isShowInForm: 1, isShowInQuery: 0, isRequired: 0, formType: 1, queryType: 1, fieldSort: 3 },
    { id: "4", columnName: "email", columnType: "varchar(100)", fieldName: "email", fieldType: "String", fieldComment: "邮箱", isShowInList: 1, isShowInForm: 1, isShowInQuery: 0, isRequired: 0, formType: 1, queryType: 1, fieldSort: 4 },
    { id: "5", columnName: "phone", columnType: "varchar(20)", fieldName: "phone", fieldType: "String", fieldComment: "手机号", isShowInList: 1, isShowInForm: 1, isShowInQuery: 1, isRequired: 0, formType: 1, queryType: 1, fieldSort: 5 },
    { id: "6", columnName: "gender", columnType: "tinyint", fieldName: "gender", fieldType: "Integer", fieldComment: "性别", isShowInList: 1, isShowInForm: 1, isShowInQuery: 0, isRequired: 0, formType: 3, queryType: 1, fieldSort: 6, dictType: "gender" },
    { id: "7", columnName: "status", columnType: "tinyint", fieldName: "status", fieldType: "Integer", fieldComment: "状态", isShowInList: 1, isShowInForm: 1, isShowInQuery: 1, isRequired: 0, formType: 3, queryType: 1, fieldSort: 7, dictType: "status" },
    { id: "8", columnName: "dept_id", columnType: "bigint", fieldName: "deptId", fieldType: "Long", fieldComment: "部门ID", isShowInList: 0, isShowInForm: 1, isShowInQuery: 0, isRequired: 0, formType: 2, queryType: 1, fieldSort: 8 },
    { id: "9", columnName: "create_time", columnType: "datetime", fieldName: "createTime", fieldType: "LocalDateTime", fieldComment: "创建时间", isShowInList: 1, isShowInForm: 0, isShowInQuery: 0, isRequired: 0, formType: 9, queryType: 4, fieldSort: 9 },
  ];
}

function getDefaultRoleFields(): FieldConfig[] {
  return [
    { id: "1", columnName: "id", columnType: "bigint", fieldName: "id", fieldType: "Long", fieldComment: "角色ID", isShowInList: 0, isShowInForm: 0, isShowInQuery: 0, isRequired: 0, formType: 10, queryType: 1, fieldSort: 1 },
    { id: "2", columnName: "name", columnType: "varchar(50)", fieldName: "name", fieldType: "String", fieldComment: "角色名称", isShowInList: 1, isShowInForm: 1, isShowInQuery: 1, isRequired: 1, formType: 1, queryType: 2, fieldSort: 2 },
    { id: "3", columnName: "code", columnType: "varchar(50)", fieldName: "code", fieldType: "String", fieldComment: "角色编码", isShowInList: 1, isShowInForm: 1, isShowInQuery: 0, isRequired: 1, formType: 1, queryType: 1, fieldSort: 3 },
    { id: "4", columnName: "data_scope", columnType: "tinyint", fieldName: "dataScope", fieldType: "Integer", fieldComment: "数据权限", isShowInList: 1, isShowInForm: 1, isShowInQuery: 0, isRequired: 0, formType: 2, queryType: 1, fieldSort: 4 },
    { id: "5", columnName: "status", columnType: "tinyint", fieldName: "status", fieldType: "Integer", fieldComment: "状态", isShowInList: 1, isShowInForm: 1, isShowInQuery: 0, isRequired: 0, formType: 3, queryType: 1, fieldSort: 5, dictType: "status" },
    { id: "6", columnName: "sort", columnType: "int", fieldName: "sort", fieldType: "Integer", fieldComment: "排序", isShowInList: 1, isShowInForm: 1, isShowInQuery: 0, isRequired: 0, formType: 5, queryType: 1, fieldSort: 6 },
    { id: "7", columnName: "create_time", columnType: "datetime", fieldName: "createTime", fieldType: "LocalDateTime", fieldComment: "创建时间", isShowInList: 1, isShowInForm: 0, isShowInQuery: 0, isRequired: 0, formType: 9, queryType: 4, fieldSort: 7 },
  ];
}

/** 根据表名自动生成默认字段配置 */
function generateDefaultFields(_tableName: string): FieldConfig[] {
  const commonFields: FieldConfig[] = [
    { columnName: "id", columnType: "bigint", fieldName: "id", fieldType: "Long", fieldComment: "主键", isShowInList: 0, isShowInForm: 0, isShowInQuery: 0, isRequired: 0, formType: 10, queryType: 1, fieldSort: 1 },
    { columnName: "name", columnType: "varchar(100)", fieldName: "name", fieldType: "String", fieldComment: "名称", isShowInList: 1, isShowInForm: 1, isShowInQuery: 1, isRequired: 1, formType: 1, queryType: 2, fieldSort: 2 },
    { columnName: "status", columnType: "tinyint", fieldName: "status", fieldType: "Integer", fieldComment: "状态", isShowInList: 1, isShowInForm: 1, isShowInQuery: 1, isRequired: 0, formType: 3, queryType: 1, fieldSort: 3, dictType: "status" },
    { columnName: "sort", columnType: "int", fieldName: "sort", fieldType: "Integer", fieldComment: "排序", isShowInList: 1, isShowInForm: 1, isShowInQuery: 0, isRequired: 0, formType: 5, queryType: 1, fieldSort: 4 },
    { columnName: "create_time", columnType: "datetime", fieldName: "createTime", fieldType: "LocalDateTime", fieldComment: "创建时间", isShowInList: 1, isShowInForm: 0, isShowInQuery: 0, isRequired: 0, formType: 9, queryType: 4, fieldSort: 5 },
    { columnName: "update_time", columnType: "datetime", fieldName: "updateTime", fieldType: "LocalDateTime", fieldComment: "更新时间", isShowInList: 0, isShowInForm: 0, isShowInQuery: 0, isRequired: 0, formType: 10, queryType: 1, fieldSort: 6 },
  ];
  return commonFields.map((f, i) => ({ ...f, id: String(i + 1) }));
}

/** 自动从表名生成实体名 */
function tableNameToEntityName(tableName: string, prefix?: string): string {
  let result = tableName;
  if (prefix && result.startsWith(prefix)) {
    result = result.slice(prefix.length);
  }
  return result
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

// ==================== Mock 代码生成 ====================

function generateMockPreview(config: GenConfigForm): GeneratorPreviewItem[] {
  const entity = config.entityName || "Entity";
  const module = config.moduleName || "system";
  const pkg = config.packageName || "com.hypersense.boot";
  const businessName = config.businessName || "示例";
  const entityLower = entity.charAt(0).toLowerCase() + entity.slice(1);
  const pkgPath = pkg.replace(/\./g, "/");

  return [
    {
      path: `src/main/java/${pkgPath}/${module}/controller/${entity}Controller.java`,
      fileName: `${entity}Controller.java`,
      content: `package ${pkg}.${module}.controller;\n\nimport ${pkg}.${module}.service.${entity}Service;\nimport ${pkg}.${module}.model.entity.${entity};\nimport ${pkg}.${module}.model.form.${entity}Form;\nimport ${pkg}.${module}.model.query.${entity}Query;\nimport ${pkg}.${module}.model.vo.${entity}VO;\nimport ${pkg}.common.model.PageResult;\nimport ${pkg}.common.model.Result;\nimport io.swagger.v3.oas.annotations.tags.Tag;\nimport lombok.RequiredArgsConstructor;\nimport org.springframework.web.bind.annotation.*;\n\n/**\n * ${businessName} Controller\n *\n * @author ${config.author || "codegen"}\n */\n@Tag(name = "${businessName}")\n@RestController\n@RequestMapping("/api/v1/${entityLower}")\n@RequiredArgsConstructor\npublic class ${entity}Controller {\n\n    private final ${entity}Service ${entityLower}Service;\n\n    @GetMapping\n    public Result<PageResult<${entity}VO>> list(${entity}Query query) {\n        return Result.success(${entityLower}Service.list(query));\n    }\n\n    @GetMapping("/{id}")\n    public Result<${entity}Form> getDetail(@PathVariable Long id) {\n        return Result.success(${entityLower}Service.getDetail(id));\n    }\n\n    @PostMapping\n    public Result<Void> create(@RequestBody ${entity}Form form) {\n        ${entityLower}Service.create(form);\n        return Result.success();\n    }\n\n    @PutMapping("/{id}")\n    public Result<Void> update(@PathVariable Long id, @RequestBody ${entity}Form form) {\n        ${entityLower}Service.update(id, form);\n        return Result.success();\n    }\n\n    @DeleteMapping("/{ids}")\n    public Result<Void> delete(@PathVariable String ids) {\n        ${entityLower}Service.deleteByIds(ids);\n        return Result.success();\n    }\n}\n`,
      scope: "backend",
      language: "java",
    },
    {
      path: `src/main/java/${pkgPath}/${module}/service/${entity}Service.java`,
      fileName: `${entity}Service.java`,
      content: `package ${pkg}.${module}.service;\n\nimport ${pkg}.${module}.model.entity.${entity};\nimport ${pkg}.${module}.model.form.${entity}Form;\nimport ${pkg}.${module}.model.query.${entity}Query;\nimport ${pkg}.${module}.model.vo.${entity}VO;\nimport ${pkg}.common.model.PageResult;\n\n/**\n * ${businessName} Service\n *\n * @author ${config.author || "codegen"}\n */\npublic interface ${entity}Service {\n    PageResult<${entity}VO> list(${entity}Query query);\n    ${entity}Form getDetail(Long id);\n    void create(${entity}Form form);\n    void update(Long id, ${entity}Form form);\n    void deleteByIds(String ids);\n}\n`,
      scope: "backend",
      language: "java",
    },
    {
      path: `src/main/java/${pkgPath}/${module}/service/impl/${entity}ServiceImpl.java`,
      fileName: `${entity}ServiceImpl.java`,
      content: `package ${pkg}.${module}.service.impl;\n\nimport ${pkg}.${module}.model.entity.${entity};\nimport ${pkg}.${module}.model.form.${entity}Form;\nimport ${pkg}.${module}.model.query.${entity}Query;\nimport ${pkg}.${module}.model.vo.${entity}VO;\nimport ${pkg}.${module}.service.${entity}Service;\nimport ${pkg}.${module}.mapper.${entity}Mapper;\nimport ${pkg}.common.model.PageResult;\nimport lombok.RequiredArgsConstructor;\nimport org.springframework.stereotype.Service;\n\n/**\n * ${businessName} Service Implementation\n *\n * @author ${config.author || "codegen"}\n */\n@Service\n@RequiredArgsConstructor\npublic class ${entity}ServiceImpl implements ${entity}Service {\n\n    private final ${entity}Mapper ${entityLower}Mapper;\n\n    @Override\n    public PageResult<${entity}VO> list(${entity}Query query) {\n        // TODO: implement\n        return PageResult.empty();\n    }\n\n    @Override\n    public ${entity}Form getDetail(Long id) {\n        // TODO: implement\n        return null;\n    }\n\n    @Override\n    public void create(${entity}Form form) {\n        // TODO: implement\n    }\n\n    @Override\n    public void update(Long id, ${entity}Form form) {\n        // TODO: implement\n    }\n\n    @Override\n    public void deleteByIds(String ids) {\n        // TODO: implement\n    }\n}\n`,
      scope: "backend",
      language: "java",
    },
    {
      path: `src/main/java/${pkgPath}/${module}/model/entity/${entity}.java`,
      fileName: `${entity}.java`,
      content: `package ${pkg}.${module}.model.entity;\n\nimport ${pkg}.common.model.BaseEntity;\nimport com.baomidou.mybatisplus.annotation.TableName;\nimport lombok.Data;\nimport lombok.EqualsAndHashCode;\n\n/**\n * ${businessName}实体\n *\n * @author ${config.author || "codegen"}\n */\n@EqualsAndHashCode(callSuper = true)\n@Data\n@TableName("${config.tableName}")\npublic class ${entity} extends BaseEntity {\n    // 字段由代码生成器根据配置自动填充\n}\n`,
      scope: "backend",
      language: "java",
    },
    {
      path: `src/main/java/${pkgPath}/${module}/mapper/${entity}Mapper.java`,
      fileName: `${entity}Mapper.java`,
      content: `package ${pkg}.${module}.mapper;\n\nimport ${pkg}.${module}.model.entity.${entity};\nimport ${pkg}.common.mapper.BaseMapper;\nimport org.apache.ibatis.annotations.Mapper;\n\n/**\n * ${businessName} Mapper\n *\n * @author ${config.author || "codegen"}\n */\n@Mapper\npublic interface ${entity}Mapper extends BaseMapper<${entity}> {\n}\n`,
      scope: "backend",
      language: "java",
    },
    {
      path: `src/main/resources/mapper/${entity}Mapper.xml`,
      fileName: `${entity}Mapper.xml`,
      content: `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">\n<mapper namespace="${pkg}.${module}.mapper.${entity}Mapper">\n\n</mapper>\n`,
      scope: "backend",
      language: "xml",
    },
    {
      path: `src/views/${module}/${entityLower}/index.vue`,
      fileName: `index.vue`,
      content: `<script setup lang="ts">\n// ${businessName}页面 - 由代码生成器自动生成\n// TODO: 接入 API 后替换 mock 数据\nimport { ref, reactive, onMounted } from "vue";\n\nconst loading = ref(false);\nconst total = ref(0);\nconst list = ref([]);\n\nonMounted(() => {\n  // fetchData();\n});\n</script>\n\n<template>\n  <div class="p-5 space-y-4">\n    <p>${businessName} - Generated by Codegen</p>\n  </div>\n</template>\n`,
      scope: "frontend",
      language: "vue",
    },
    {
      path: `src/api/${module}/${entityLower}/index.ts`,
      fileName: `index.ts`,
      content: `import http from "@/utils/request";\nimport type { ${entity}Query, ${entity}Item, ${entity}Form } from "./types";\nimport type { PageResult } from "@/api/common";\n\nconst BASE_URL = "/api/v1/${entityLower}";\n\nexport function get${entity}Page(params: ${entity}Query) {\n  return http.get<unknown, PageResult<${entity}Item>>(BASE_URL, { params });\n}\n\nexport function get${entity}FormData(id: string) {\n  return http.get<unknown, ${entity}Form>(\`\${BASE_URL}/\${id}/form\`);\n}\n\nexport function create${entity}(data: ${entity}Form) {\n  return http.post(BASE_URL, data);\n}\n\nexport function update${entity}(id: string, data: ${entity}Form) {\n  return http.put(\`\${BASE_URL}/\${id}\`, data);\n}\n\nexport function delete${entity}(ids: string) {\n  return http.delete(\`\${BASE_URL}/\${ids}\`);\n}\n`,
      scope: "frontend",
      language: "ts",
    },
    {
      path: `src/api/${module}/${entityLower}/types.ts`,
      fileName: `types.ts`,
      content: `import type { BaseQueryParams } from "@/api/common";\n\nexport interface ${entity}Query extends BaseQueryParams {\n  keywords?: string;\n}\n\nexport interface ${entity}Item {\n  id: string;\n  // TODO: 添加字段\n}\n\nexport interface ${entity}Form {\n  id?: string;\n  // TODO: 添加字段\n}\n`,
      scope: "frontend",
      language: "ts",
    },
  ];
}

// ==================== API 方法 ====================

/** 获取数据表分页列表 */
export function getTablePage(params: TableQuery): PageResult<TableItem> {
  const tables = loadTables();
  let filtered = [...tables];

  if (params.keywords) {
    const kw = params.keywords.toLowerCase();
    filtered = filtered.filter(
      (t) => t.tableName.toLowerCase().includes(kw) || t.tableComment.toLowerCase().includes(kw),
    );
  }

  const total = filtered.length;
  const start = (params.pageNum - 1) * params.pageSize;
  const list = filtered.slice(start, start + params.pageSize);

  return { list, total };
}

/** 获取代码生成配置 */
export function getGenConfig(tableName: string): GenConfigForm {
  const configs = loadConfigs();
  if (configs[tableName]) return configs[tableName];

  // 未配置时生成默认配置
  const prefix = tableName.startsWith("sys_") ? "sys_" : tableName.startsWith("biz_") ? "biz_" : "";
  const entityName = tableNameToEntityName(tableName, prefix);
  const fields = generateDefaultFields(tableName);

  const config: GenConfigForm = {
    tableName,
    businessName: "",
    moduleName: "system",
    packageName: "com.hypersense.boot",
    entityName,
    author: "hypersense",
    backendAppName: "godlikeagents",
    frontendAppName: "hs-admin",
    pageType: "classic",
    removeTablePrefix: prefix,
    fieldConfigs: fields,
  };
  return config;
}

/** 保存代码生成配置 */
export function saveGenConfig(tableName: string, data: GenConfigForm): boolean {
  const configs = loadConfigs();
  configs[tableName] = { ...data, tableName };
  saveConfigs(configs);

  // 更新表的配置状态
  const tables = loadTables();
  const table = tables.find((t) => t.tableName === tableName);
  if (table) {
    table.isConfigured = 1;
    saveTables(tables);
  }
  return true;
}

/** 重置代码生成配置 */
export function resetGenConfig(tableName: string): boolean {
  const configs = loadConfigs();
  delete configs[tableName];
  saveConfigs(configs);

  const tables = loadTables();
  const table = tables.find((t) => t.tableName === tableName);
  if (table) {
    table.isConfigured = 0;
    saveTables(tables);
  }
  return true;
}

/** 获取代码生成预览 */
export function getPreviewData(tableName: string): GeneratorPreviewItem[] {
  const config = getGenConfig(tableName);
  return generateMockPreview(config);
}

/** 获取菜单下拉选项 */
export function getMenuOptions(): OptionItem[] {
  return [
    { value: "1", label: "系统管理" },
    { value: "2", label: "系统监控" },
    { value: "3", label: "系统工具" },
  ];
}
