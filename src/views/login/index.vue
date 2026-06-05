<template>
  <div
    class="login-page relative flex flex-col min-h-screen overflow-hidden"
    :class="{ 'login-dark': isDark }"
    @click="closeMenus"
  >
    <!-- 背景 -->
    <template v-if="isDark">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${bgDarkUrl})` }"
      />
      <div class="absolute inset-0 bg-black/40" />
    </template>
    <template v-else>
      <div class="login-gradient" />
      <div class="deco deco-1" />
      <div class="deco deco-2" />
      <div class="deco deco-3" />
    </template>

    <!-- 工具栏 -->
    <div class="relative z-20 flex justify-end p-3 sm:p-4">
      <div class="toolbar-pill flex items-center gap-1">
        <!-- 主题切换 -->
        <div class="relative">
          <button
            class="toolbar-item"
            :title="t('login.themeToggle')"
            @click.stop="
              showThemeMenu = !showThemeMenu;
              showLangMenu = false;
            "
          >
            <!-- Sun -->
            <svg
              v-if="themeIcon === 'sun'"
              class="w-4.5 h-4.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <!-- Moon -->
            <svg
              v-else-if="themeIcon === 'moon'"
              class="w-4.5 h-4.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <!-- Monitor -->
            <svg v-else class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </button>
          <!-- 主题下拉菜单 -->
          <Transition name="dropdown">
            <div v-if="showThemeMenu" class="dropdown-menu" @click.stop>
              <button
                v-for="opt in themeOptions"
                :key="opt.value"
                class="dropdown-item"
                :class="{ active: settingsStore.theme === opt.value }"
                @click="handleThemeChange(opt.value)"
              >
                {{ opt.label.value }}
                <svg
                  v-if="settingsStore.theme === opt.value"
                  class="w-3.5 h-3.5 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </div>
          </Transition>
        </div>

        <!-- 语言切换 -->
        <div class="relative">
          <button
            class="toolbar-item"
            :title="t('login.languageToggle')"
            @click.stop="
              showLangMenu = !showLangMenu;
              showThemeMenu = false;
            "
          >
            <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
          </button>
          <Transition name="dropdown">
            <div v-if="showLangMenu" class="dropdown-menu" @click.stop>
              <button
                v-for="opt in langOptions"
                :key="opt.value"
                class="dropdown-item"
                :class="{ active: appStore.language === opt.value }"
                @click="handleLangChange(opt.value)"
              >
                {{ opt.label }}
                <svg
                  v-if="appStore.language === opt.value"
                  class="w-3.5 h-3.5 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- 主内容区: 两栏布局 -->
    <div
      class="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 md:gap-8 items-center px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1280px] xl:max-w-[1400px] mx-auto w-full"
    >
      <!-- 左侧 Hero -->
      <section class="hidden md:flex flex-col self-start pt-[18vh] animate-slide-up">
        <h1 class="hero-title text-4xl lg:text-[56px] font-bold leading-tight tracking-tight">
          {{ appConfig.title }}
        </h1>
        <h2 class="hero-title text-2xl lg:text-[32px] font-bold leading-tight tracking-tight mt-2">
          {{ t("login.hero.subtitle") }}
        </h2>
        <p class="mt-2 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed opacity-70">
          {{ t("login.hero.description") }}
        </p>
        <ul class="grid gap-2 sm:gap-3">
          <li
            v-for="feature in features"
            :key="feature"
            class="feature-card flex items-center gap-3 px-4 py-3 text-sm font-medium"
          >
            <svg
              class="w-4 h-4 shrink-0 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {{ feature }}
          </li>
        </ul>
      </section>

      <!-- 右侧登录卡片 -->
      <GlassSurface preset="card" :mouse-tracking="true" class="login-card justify-self-center">
        <div class="w-full p-8 space-y-6">
          <!-- 品牌 -->
          <div class="flex items-center justify-center gap-3">
            <GlassAvatar :src="logoUrl" alt="HS Admin" size="lg" />
            <div>
              <h1 class="text-2xl font-bold tracking-tight login-text">HS Admin</h1>
              <p class="text-sm opacity-70 login-text-sub">{{ t("login.hero.subtitle") }}</p>
            </div>
          </div>

          <!-- 分割线 -->
          <div class="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <!-- 表单 -->
          <form class="space-y-5" @submit.prevent="handleLogin">
            <!-- 用户名 -->
            <div class="space-y-1.5">
              <label class="text-xs font-medium login-text">{{ t("login.username") }}</label>
              <GlassSurface
                preset="input"
                class="glass-field w-full"
                :class="{ 'field-error': usernameError }"
              >
                <div class="w-full flex items-center px-3 py-2.5 gap-2 relative z-[1]">
                  <svg
                    class="w-4 h-4 shrink-0 login-text-sub"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <input
                    v-model.trim="username"
                    type="text"
                    :placeholder="t('login.username')"
                    autocomplete="off"
                    class="login-input flex-1 min-w-0 text-sm outline-none"
                    @blur="validateUsername"
                    @keyup.enter="handleEnterLogin"
                  />
                </div>
              </GlassSurface>
              <p v-if="usernameError" class="text-xs text-red-400 mt-1">{{ usernameError }}</p>
            </div>

            <!-- 密码 -->
            <div class="space-y-1.5">
              <label class="text-xs font-medium login-text">{{ t("login.password") }}</label>
              <GlassSurface
                preset="input"
                class="glass-field w-full"
                :class="{ 'field-error': passwordError }"
              >
                <div class="w-full flex items-center px-3 py-2.5 gap-2 relative z-[1]">
                  <svg
                    class="w-4 h-4 shrink-0 login-text-sub"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <input
                    v-model.trim="password"
                    :type="showPassword ? 'text' : 'password'"
                    :placeholder="t('login.password')"
                    autocomplete="off"
                    class="login-input flex-1 min-w-0 text-sm outline-none"
                    @blur="validatePassword"
                    @keyup.enter="handleEnterLogin"
                  />
                  <button
                    type="button"
                    class="shrink-0 p-0.5 opacity-60 hover:opacity-100 transition-opacity"
                    @click="showPassword = !showPassword"
                  >
                    <svg
                      v-if="!showPassword"
                      class="w-4 h-4 login-text-sub"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <svg
                      v-else
                      class="w-4 h-4 login-text-sub"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  </button>
                </div>
              </GlassSurface>
              <p v-if="passwordError" class="text-xs text-red-400 mt-1">{{ passwordError }}</p>
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-medium login-text">{{ t("login.captchaCode") }}</label>
              <div class="flex gap-2">
                <GlassSurface preset="input" class="glass-field flex-1">
                  <div class="w-full flex items-center px-3 py-2.5 gap-2 relative z-[1]">
                    <svg
                      class="w-4 h-4 shrink-0 login-text-sub"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <input
                      v-model="captchaCode"
                      type="text"
                      :placeholder="t('login.captchaCode')"
                      autocomplete="off"
                      maxlength="4"
                      class="login-input flex-1 min-w-0 text-sm outline-none"
                    />
                  </div>
                </GlassSurface>
                <div
                  class="captcha-img shrink-0 cursor-pointer overflow-hidden"
                  :title="t('login.captchaCode')"
                  @click="loadCaptcha"
                >
                  <img
                    v-if="captchaBase64"
                    :src="captchaBase64"
                    alt="captcha"
                    class="h-full w-full object-contain"
                  />
                  <div
                    v-else
                    class="h-full w-full flex items-center justify-center text-xs opacity-40 login-text"
                  >
                    ...
                  </div>
                </div>
              </div>
            </div>

            <!-- 记住我 / 忘记密码 -->
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="rememberMe"
                  type="checkbox"
                  class="w-3.5 h-3.5 accent-blue-400 rounded"
                />
                <span class="text-xs login-text">{{ t("login.rememberMe") }}</span>
              </label>
              <button type="button" class="text-xs login-text hover:opacity-80 transition-opacity">
                {{ t("login.forgetPassword") }}
              </button>
            </div>

            <!-- 登录按钮 -->
            <GlassSurface
              preset="button"
              :mouse-tracking="true"
              :on-click="handleLogin"
              class="w-full"
            >
              <div class="w-full px-4 py-3 text-center text-sm font-semibold login-text">
                <template v-if="!loading">{{ t("login.login") }}</template>
                <span v-else class="inline-flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    />
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                </span>
              </div>
            </GlassSurface>
          </form>

          <!-- 注册提示 -->
          <div class="flex items-center justify-center gap-1.5 text-sm">
            <span class="opacity-60 login-text">{{ t("login.noAccount") }}</span>
            <button type="button" class="font-medium hover:underline login-text">
              {{ t("login.register") }}
            </button>
          </div>

          <!-- 其他登录方式分割线 -->
          <div class="flex items-center gap-3">
            <div
              class="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            <span class="text-xs opacity-40 whitespace-nowrap login-text">
              {{ t("login.otherLoginMethods") }}
            </span>
            <div
              class="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          </div>

          <!-- 社交登录图标 -->
          <div class="flex items-center justify-center gap-3">
            <button type="button" class="social-icon-btn" title="微信">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05a6.127 6.127 0 0 1-.253-1.726c0-3.573 3.26-6.47 7.278-6.47.122 0 .243.005.363.013C15.596 4.373 12.454 2.188 8.691 2.188zm-2.93 4.08a1.06 1.06 0 1 1 0 2.12 1.06 1.06 0 0 1 0-2.12zm5.713 0a1.06 1.06 0 1 1 0 2.12 1.06 1.06 0 0 1 0-2.12zM23.997 15.39c0-3.248-3.238-5.882-7.229-5.882-3.992 0-7.23 2.634-7.23 5.882 0 3.248 3.238 5.882 7.23 5.882.772 0 1.522-.107 2.227-.312a.72.72 0 0 1 .566.078l1.494.876a.262.262 0 0 0 .132.043.233.233 0 0 0 .229-.233c0-.058-.023-.115-.038-.17l-.305-1.165a.47.47 0 0 1 .168-.526c1.465-1.091 2.756-2.748 2.756-4.473zm-9.725-1.24a.834.834 0 1 1 0-1.67.834.834 0 0 1 0 1.67zm4.993 0a.834.834 0 1 1 0-1.67.834.834 0 0 1 0 1.67z"
                />
              </svg>
            </button>
            <button type="button" class="social-icon-btn" title="QQ">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2C7.589 2 4 5.589 4 9.996c0 1.928.691 3.691 1.835 5.07-.18.632-.485 1.513-.863 2.28-.534 1.085-.272 1.932.738 1.932.81 0 1.677-.392 2.388-.9.649.203 1.313.34 1.99.4-.12.364-.243.832-.316 1.312-.115.755.284 1.21.897 1.21.59 0 1.272-.382 1.905-.948.147-.131.287-.27.418-.414.13.144.27.283.417.414.634.566 1.316.948 1.906.948.613 0 1.012-.455.897-1.21-.073-.48-.196-.948-.316-1.312.677-.06 1.341-.197 1.99-.4.71.508 1.578.9 2.388.9 1.01 0 1.272-.847.738-1.932-.378-.767-.683-1.648-.863-2.28A7.963 7.963 0 0 0 20 9.996C20 5.589 16.411 2 12 2zm0 2.5a5.49 5.49 0 0 1 5.49 5.496c0 1.255-.42 2.41-1.125 3.334l.028.048c.202.648.536 1.478.961 2.232-.47-.158-.96-.458-1.422-.83l-.036-.028-.043.022a7.454 7.454 0 0 1-3.853 1.067 7.454 7.454 0 0 1-3.853-1.067l-.043-.022-.036.028c-.462.372-.952.672-1.422.83.425-.754.759-1.584.961-2.232l.028-.048A5.466 5.466 0 0 1 6.51 9.996 5.49 5.49 0 0 1 12 4.5z"
                />
              </svg>
            </button>
            <button type="button" class="social-icon-btn" title="GitHub">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                />
              </svg>
            </button>
            <button type="button" class="social-icon-btn" title="Gitee">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H8.37a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h5.85z"
                />
              </svg>
            </button>
          </div>

          <!-- 底部 -->
          <div class="text-center">
            <p class="text-xs login-text-sub">Copyright &copy; 2026 hypersense.tech</p>
          </div>
        </div>
      </GlassSurface>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { GlassSurface, GlassAvatar } from "@/components/glass";
import { useUserStore, useSettingsStore, useAppStore } from "@/stores";
import { ThemeMode } from "@/enums/settings";
import { LanguageEnum } from "@/enums/settings";
import { appConfig } from "@/settings";
import AuthAPI from "@/api/auth";
import logoUrl from "@/assets/images/logo-dark.png";
import bgDarkUrl from "@/assets/images/bg-dark.webp";

const router = useRouter();
const { t, locale } = useI18n();
const userStore = useUserStore();
const settingsStore = useSettingsStore();
const appStore = useAppStore();

const username = ref("");
const password = ref("");
const usernameError = ref("");
const passwordError = ref("");
const captchaCode = ref("");
const captchaId = ref("");
const captchaBase64 = ref("");
const rememberMe = ref(false);
const loading = ref(false);
const showPassword = ref(false);

// 工具栏下拉状态
const showThemeMenu = ref(false);
const showLangMenu = ref(false);

// 是否暗色
const isDark = computed(() => settingsStore.resolvedTheme === ThemeMode.DARK);

// Hero 特性
const featureKeys = ["auth", "tenant", "audit"] as const;
const features = computed(() => featureKeys.map((key) => t(`login.hero.features.${key}`)));

// 主题选项
const themeOptions = [
  { value: ThemeMode.LIGHT, label: computed(() => t("login.light")) },
  { value: ThemeMode.DARK, label: computed(() => t("login.dark")) },
  { value: ThemeMode.AUTO, label: computed(() => t("login.auto")) },
];

// 语言选项
const langOptions = [
  { value: LanguageEnum.ZH_CN, label: "中文" },
  { value: LanguageEnum.EN, label: "English" },
];

// 主题图标
const themeIcon = computed(() => {
  if (settingsStore.theme === ThemeMode.AUTO) return "monitor";
  return isDark.value ? "moon" : "sun";
});

// 切换主题
function handleThemeChange(mode: ThemeMode) {
  settingsStore.theme = mode;
  showThemeMenu.value = false;
}

// 切换语言
function handleLangChange(lang: string) {
  locale.value = lang;
  appStore.changeLanguage(lang);
  showLangMenu.value = false;
  toast.success(t("langSelect.message.success"));
}

// 点击外部关闭菜单
function closeMenus() {
  showThemeMenu.value = false;
  showLangMenu.value = false;
}

async function loadCaptcha() {
  try {
    const data = await AuthAPI.getCaptcha();
    captchaId.value = data.captchaId;
    captchaBase64.value = data.captchaBase64;
  } catch {
    captchaBase64.value = "";
  }
}

function validateUsername() {
  if (!username.value.trim()) {
    usernameError.value = t("login.usernameRequired");
    return false;
  }
  usernameError.value = "";
  return true;
}

function validatePassword() {
  if (!password.value) {
    passwordError.value = t("login.passwordRequired");
    return false;
  }
  passwordError.value = "";
  return true;
}

function handleEnterLogin() {
  const v1 = validateUsername();
  const v2 = validatePassword();
  if (v1 && v2) handleLogin();
}

async function handleLogin() {
  const v1 = validateUsername();
  const v2 = validatePassword();
  if (!v1 || !v2) return;
  loading.value = true;
  try {
    await userStore.login({
      username: username.value,
      password: password.value,
      captchaId: captchaId.value,
      captchaCode: captchaCode.value,
      rememberMe: rememberMe.value,
    });
    const redirect = (router.currentRoute.value.query.redirect as string) || "/";
    router.push(redirect);
  } catch {
    captchaCode.value = "";
    loadCaptcha();
  } finally {
    loading.value = false;
  }
}

onMounted(loadCaptcha);
</script>

<style scoped>
/* ====== 亮色背景 ====== */
.login-page {
  color: #fff;
}
.login-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    #005ec0 0%,
    #2a8ade 30%,
    #7ec8e3 55%,
    #f5d76e 80%,
    #fee070 100%
  );
  background-size: 100% 300%;
  animation: gradientShift 8s ease-in-out infinite alternate;
}
@keyframes gradientShift {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 0% 60%;
  }
  100% {
    background-position: 0% 100%;
  }
}

/* ====== 装饰浮动圆（亮色） ====== */
.deco {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.deco-1 {
  width: 400px;
  height: 400px;
  top: -10%;
  left: -8%;
  background: radial-gradient(circle, rgba(0, 94, 192, 0.4), transparent 70%);
  filter: blur(60px);
  animation: floatA 12s ease-in-out infinite alternate;
}
.deco-2 {
  width: 350px;
  height: 350px;
  bottom: -5%;
  right: -5%;
  background: radial-gradient(circle, rgba(254, 224, 112, 0.35), transparent 70%);
  filter: blur(55px);
  animation: floatB 10s ease-in-out infinite alternate;
}
.deco-3 {
  width: 250px;
  height: 250px;
  top: 50%;
  left: 60%;
  background: radial-gradient(circle, rgba(126, 200, 227, 0.25), transparent 70%);
  filter: blur(50px);
  animation: floatA 14s ease-in-out infinite alternate-reverse;
}
@keyframes floatA {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(30px, -40px) scale(1.1);
  }
}
@keyframes floatB {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(-20px, 30px) scale(1.08);
  }
}

/* ====== Hero 区域 ====== */
.hero-title {
  color: #fff;
}
.feature-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(8px);
  color: #fff;
}

/* ====== 暗色模式 ====== */
.login-dark .hero-title {
  color: #fff;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}
.login-dark .feature-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.login-dark .login-text {
  color: #fff;
}
.login-dark .login-text-sub {
  color: rgba(255, 255, 255, 0.6);
}
.login-dark .login-input {
  color: #fff;
  caret-color: #fff;
}

/* ====== 亮色模式文字 ====== */
.login-text {
  color: #fff;
}
.login-text-sub {
  color: rgba(255, 255, 255, 0.6);
}

/* ====== 登录卡片 ====== */
.login-card {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 400px;
  animation: cardEnter 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ====== 动画 ====== */
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slide-up {
  animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* ====== 输入框 ====== */
.glass-field {
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.glass-field:focus-within {
  border-color: #ffffff !important;
  border-width: 2px !important;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.25);
}
.glass-field.field-error {
  border-color: #ef4444 !important;
  border-width: 2px !important;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.3);
}
.glass-field.field-error:focus-within {
  border-color: #ef4444 !important;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
}
.login-input {
  background: transparent;
  color: #ffffff;
  caret-color: #ffffff;
}
.login-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
.login-input:-webkit-autofill,
.login-input:-webkit-autofill:hover,
.login-input:-webkit-autofill:focus,
.login-input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
  -webkit-text-fill-color: #ffffff !important;
  transition: background-color 9999s ease-in-out 0s;
}

/* ====== 验证码图片 ====== */
.captcha-img {
  width: 120px;
  height: 44px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.9);
  transition: border-color 0.2s;
}
.captcha-img:hover {
  border-color: rgba(255, 255, 255, 0.4);
}

/* ====== 社交登录按钮 ====== */
.social-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.2s;
  cursor: pointer;
}
.social-icon-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.35);
  color: #ffffff;
}

/* ====== 工具栏 ====== */
.toolbar-pill {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9999px;
  padding: 4px 6px;
  backdrop-filter: blur(12px);
}
.toolbar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s;
  border: none;
  background: transparent;
}
.toolbar-item:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}
.login-dark .toolbar-pill {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.08);
}

/* ====== 下拉菜单 ====== */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 130px;
  background: rgba(20, 30, 50, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  backdrop-filter: blur(16px);
  padding: 4px;
  z-index: 100;
}
.dropdown-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
.dropdown-item.active {
  color: #fff;
  font-weight: 500;
}

/* ====== 下拉动画 ====== */
.dropdown-enter-active {
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}
.dropdown-leave-active {
  transition: all 0.1s ease-in;
}
.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-4px) scale(0.96);
}
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-2px) scale(0.98);
}
</style>
