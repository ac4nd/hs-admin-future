/**
 * 应用常量定义
 */
export const APP_PREFIX = "hsf";
/** 超级管理员角色标识 */
export const ROLE_ROOT = "ROOT";
export const STORAGE_KEYS = {
    // ===== 认证相关 =====
    ACCESS_TOKEN: `${APP_PREFIX}:auth:access_token`,
    REFRESH_TOKEN: `${APP_PREFIX}:auth:refresh_token`,
    REMEMBER_ME: `${APP_PREFIX}:auth:remember_me`,
    // ===== UI 设置 =====
    SHOW_TAGS_VIEW: `${APP_PREFIX}:ui:show_tags_view`,
    SHOW_APP_LOGO: `${APP_PREFIX}:ui:show_app_logo`,
    SHOW_WATERMARK: `${APP_PREFIX}:ui:show_watermark`,
    PAGE_SWITCHING_ANIMATION: `${APP_PREFIX}:ui:page_switching_animation`,
    LAYOUT: `${APP_PREFIX}:ui:layout`,
    SIDEBAR_COLOR_SCHEME: `${APP_PREFIX}:ui:sidebar_color_scheme`,
    THEME: `${APP_PREFIX}:ui:theme`,
    THEME_COLOR: `${APP_PREFIX}:ui:theme_color`,
    GRAY_MODE: `${APP_PREFIX}:ui:gray_mode`,
    COLOR_WEAK: `${APP_PREFIX}:ui:color_weak`,
    GLASS_EFFECT: `${APP_PREFIX}:ui:glass_effect`,
    GLASS_PARAMS: `${APP_PREFIX}:ui:glass_params`,
    // ===== 应用状态 =====
    DEVICE: `${APP_PREFIX}:app:device`,
    SIDEBAR_STATUS: `${APP_PREFIX}:app:sidebar_status`,
    LANGUAGE: `${APP_PREFIX}:app:language`,
    ACTIVE_TOP_MENU_PATH: `${APP_PREFIX}:app:active_top_menu_path`,
};
//# sourceMappingURL=index.js.map