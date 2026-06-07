/**
 * 通用枚举
 *
 * @description 包含对话框模式、通用状态等跨业务的枚举定义
 */
/** 对话框模式 */
export var DialogMode;
(function (DialogMode) {
    DialogMode["CREATE"] = "create";
    DialogMode["EDIT"] = "edit";
    DialogMode["VIEW"] = "view";
})(DialogMode || (DialogMode = {}));
/** 通用状态 */
export var CommonStatus;
(function (CommonStatus) {
    CommonStatus[CommonStatus["DISABLED"] = 0] = "DISABLED";
    CommonStatus[CommonStatus["ENABLED"] = 1] = "ENABLED";
})(CommonStatus || (CommonStatus = {}));
/** 审核状态 */
export var AuditStatus;
(function (AuditStatus) {
    AuditStatus[AuditStatus["PENDING"] = 0] = "PENDING";
    AuditStatus[AuditStatus["APPROVED"] = 1] = "APPROVED";
    AuditStatus[AuditStatus["REJECTED"] = 2] = "REJECTED";
})(AuditStatus || (AuditStatus = {}));
//# sourceMappingURL=common.js.map