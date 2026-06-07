/** 菜单类型枚举 */
export var MenuTypeEnum;
(function (MenuTypeEnum) {
    /** 目录 */
    MenuTypeEnum["CATALOG"] = "C";
    /** 菜单 */
    MenuTypeEnum["MENU"] = "M";
    /** 按钮 */
    MenuTypeEnum["BUTTON"] = "B";
})(MenuTypeEnum || (MenuTypeEnum = {}));
/** 菜单范围枚举 */
export var MenuScopeEnum;
(function (MenuScopeEnum) {
    /** 平台 */
    MenuScopeEnum[MenuScopeEnum["PLATFORM"] = 1] = "PLATFORM";
    /** 业务 */
    MenuScopeEnum[MenuScopeEnum["TENANT"] = 2] = "TENANT";
})(MenuScopeEnum || (MenuScopeEnum = {}));
//# sourceMappingURL=menu.js.map