<template>
  <div class="p-5 space-y-4">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- 左侧个人信息卡片 -->
      <Card>
        <CardContent class="pt-6">
          <div class="flex flex-col items-center space-y-3">
            <!-- 头像 -->
            <div class="relative group">
              <Avatar class="size-24">
                <AvatarImage :src="userProfile.avatar ?? ''" :alt="userProfile.nickname" />
                <AvatarFallback class="text-2xl">
                  {{ userProfile.nickname?.charAt(0) ?? "U" }}
                </AvatarFallback>
              </Avatar>
              <button
                class="absolute bottom-0 right-0 flex items-center justify-center size-7 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                @click="triggerFileUpload"
              >
                <CameraIcon class="size-4" />
              </button>
              <input
                ref="fileInput"
                type="file"
                class="hidden"
                accept="image/*"
                @change="handleFileChange"
              />
            </div>

            <!-- 昵称 + 编辑 -->
            <div class="flex items-center gap-2">
              <span class="text-lg font-semibold">{{ userProfile.nickname }}</span>
              <button
                class="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                @click="handleOpenDialog(DialogType.ACCOUNT)"
              >
                <PencilIcon class="size-4" />
              </button>
            </div>

            <!-- 角色 -->
            <span class="text-sm text-muted-foreground">{{ userProfile.roleNames || "-" }}</span>

            <!-- 详细信息 -->
            <div class="w-full space-y-3 mt-4">
              <div class="flex items-center gap-2 text-sm">
                <UserIcon class="size-4 text-muted-foreground shrink-0" />
                <span class="text-muted-foreground w-16 shrink-0">{{ t("profile.username") }}</span>
                <span>{{ userProfile.username }}</span>
                <span v-if="userProfile.gender === 1" class="text-blue-500 text-base leading-none">
                  ♂
                </span>
                <span
                  v-else-if="userProfile.gender === 2"
                  class="text-pink-500 text-base leading-none"
                >
                  ♀
                </span>
              </div>

              <div class="flex items-center gap-2 text-sm">
                <SmartphoneIcon class="size-4 text-muted-foreground shrink-0" />
                <span class="text-muted-foreground w-16 shrink-0">{{ t("profile.mobile") }}</span>
                <span :class="{ 'text-muted-foreground': !userProfile.mobile }">
                  {{ userProfile.mobile || t("profile.notBound") }}
                </span>
              </div>

              <div class="flex items-center gap-2 text-sm">
                <MailIcon class="size-4 text-muted-foreground shrink-0" />
                <span class="text-muted-foreground w-16 shrink-0">{{ t("profile.email") }}</span>
                <span :class="{ 'text-muted-foreground': !userProfile.email }">
                  {{ userProfile.email || t("profile.notBound") }}
                </span>
              </div>

              <div class="flex items-center gap-2 text-sm">
                <Building2Icon class="size-4 text-muted-foreground shrink-0" />
                <span class="text-muted-foreground w-16 shrink-0">{{ t("profile.dept") }}</span>
                <span>{{ userProfile.deptName || "-" }}</span>
              </div>

              <div class="flex items-center gap-2 text-sm">
                <CalendarIcon class="size-4 text-muted-foreground shrink-0" />
                <span class="text-muted-foreground w-16 shrink-0">
                  {{ t("profile.createTime") }}
                </span>
                <span>{{ userProfile.createTime || "-" }}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- 右侧安全设置 -->
      <Card class="lg:col-span-2">
        <CardHeader>
          <div class="flex items-center gap-2 font-semibold">
            <ShieldCheckIcon class="size-5" />
            {{ t("profile.securitySettings") }}
          </div>
        </CardHeader>
        <CardContent class="space-y-0">
          <!-- 修改密码 -->
          <div
            class="flex items-center justify-between py-4 border-b last:border-b-0 hover:bg-muted/50 rounded-lg px-3 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary"
              >
                <LockIcon class="size-5" />
              </div>
              <div>
                <div class="font-medium">{{ t("profile.accountPassword") }}</div>
                <div class="text-sm text-muted-foreground">{{ t("profile.passwordHint") }}</div>
              </div>
            </div>
            <Button variant="link" @click="handleOpenDialog(DialogType.PASSWORD)">
              {{ t("profile.modify") }}
            </Button>
          </div>

          <!-- 手机号 -->
          <div
            class="flex items-center justify-between py-4 border-b last:border-b-0 hover:bg-muted/50 rounded-lg px-3 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center size-10 rounded-lg bg-green-500/10 text-green-600"
              >
                <SmartphoneIcon class="size-5" />
              </div>
              <div>
                <div class="font-medium">{{ t("profile.mobile") }}</div>
                <div class="text-sm text-muted-foreground">{{ mobileSecurityDesc }}</div>
              </div>
            </div>
            <div class="flex gap-2">
              <Button
                v-if="userProfile.mobile"
                variant="link"
                @click="handleOpenDialog(DialogType.MOBILE)"
              >
                {{ t("profile.change") }}
              </Button>
              <Button
                v-if="userProfile.mobile"
                variant="link"
                class="text-destructive"
                @click="openUnbindDialog('mobile')"
              >
                {{ t("profile.unbind") }}
              </Button>
              <Button
                v-if="!userProfile.mobile"
                variant="link"
                @click="handleOpenDialog(DialogType.MOBILE)"
              >
                {{ t("profile.bind") }}
              </Button>
            </div>
          </div>

          <!-- 邮箱 -->
          <div
            class="flex items-center justify-between py-4 border-b last:border-b-0 hover:bg-muted/50 rounded-lg px-3 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center size-10 rounded-lg bg-amber-500/10 text-amber-600"
              >
                <MailIcon class="size-5" />
              </div>
              <div>
                <div class="font-medium">{{ t("profile.email") }}</div>
                <div class="text-sm text-muted-foreground">{{ emailSecurityDesc }}</div>
              </div>
            </div>
            <div class="flex gap-2">
              <Button
                v-if="userProfile.email"
                variant="link"
                @click="handleOpenDialog(DialogType.EMAIL)"
              >
                {{ t("profile.change") }}
              </Button>
              <Button
                v-if="userProfile.email"
                variant="link"
                class="text-destructive"
                @click="openUnbindDialog('email')"
              >
                {{ t("profile.unbind") }}
              </Button>
              <Button
                v-if="!userProfile.email"
                variant="link"
                @click="handleOpenDialog(DialogType.EMAIL)"
              >
                {{ t("profile.bind") }}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- 编辑资料弹窗 -->
    <Dialog
      :open="dialogState.visible"
      @update:open="
        (v) => {
          if (!v) handleCancel();
        }
      "
    >
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{{ dialogState.title }}</DialogTitle>
        </DialogHeader>

        <!-- 账号资料 -->
        <div v-if="dialogState.type === DialogType.ACCOUNT" class="space-y-4 py-2">
          <div class="space-y-1.5">
            <Label>{{ t("profile.nickname") }}</Label>
            <Input v-model="userProfileForm.nickname" />
          </div>
          <div class="space-y-1.5">
            <Label>{{ t("profile.gender") }}</Label>
            <Select v-model="userProfileForm.gender">
              <SelectTrigger>
                <SelectValue :placeholder="t('profile.selectGender')" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem :value="1">{{ t("profile.male") }}</SelectItem>
                <SelectItem :value="2">{{ t("profile.female") }}</SelectItem>
                <SelectItem :value="0">{{ t("profile.unknown") }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- 修改密码 -->
        <div v-if="dialogState.type === DialogType.PASSWORD" class="space-y-4 py-2">
          <div class="space-y-1.5">
            <Label>{{ t("profile.oldPassword") }}</Label>
            <Input v-model="passwordChangeForm.oldPassword" type="password" />
          </div>
          <div class="space-y-1.5">
            <Label>{{ t("profile.newPassword") }}</Label>
            <Input v-model="passwordChangeForm.newPassword" type="password" />
          </div>
          <div class="space-y-1.5">
            <Label>{{ t("profile.confirmPassword") }}</Label>
            <Input v-model="passwordChangeForm.confirmPassword" type="password" />
          </div>
        </div>

        <!-- 绑定手机 -->
        <div v-if="dialogState.type === DialogType.MOBILE" class="space-y-4 py-2">
          <div class="space-y-1.5">
            <Label>{{ t("profile.mobile") }}</Label>
            <Input v-model="mobileUpdateForm.mobile" class="w-full" />
          </div>
          <div class="space-y-1.5">
            <Label>{{ t("profile.verifyCode") }}</Label>
            <div class="flex gap-2">
              <Input v-model="mobileUpdateForm.code" class="flex-1" />
              <Button
                variant="outline"
                :disabled="mobileCountdown > 0"
                @click="handleSendMobileCode"
              >
                {{
                  mobileCountdown > 0
                    ? t("profile.countdown", { seconds: mobileCountdown })
                    : t("profile.sendCode")
                }}
              </Button>
            </div>
          </div>
          <div class="space-y-1.5">
            <Label>{{ t("profile.currentPassword") }}</Label>
            <Input v-model="mobileUpdateForm.password" type="password" />
          </div>
        </div>

        <!-- 绑定邮箱 -->
        <div v-if="dialogState.type === DialogType.EMAIL" class="space-y-4 py-2">
          <div class="space-y-1.5">
            <Label>{{ t("profile.email") }}</Label>
            <Input v-model="emailUpdateForm.email" class="w-full" />
          </div>
          <div class="space-y-1.5">
            <Label>{{ t("profile.verifyCode") }}</Label>
            <div class="flex gap-2">
              <Input v-model="emailUpdateForm.code" class="flex-1" />
              <Button variant="outline" :disabled="emailCountdown > 0" @click="handleSendEmailCode">
                {{
                  emailCountdown > 0
                    ? t("profile.countdown", { seconds: emailCountdown })
                    : t("profile.sendCode")
                }}
              </Button>
            </div>
          </div>
          <div class="space-y-1.5">
            <Label>{{ t("profile.currentPassword") }}</Label>
            <Input v-model="emailUpdateForm.password" type="password" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" @click="handleCancel">{{ t("profile.cancel") }}</Button>
          <Button @click="handleSubmit">{{ t("profile.confirm") }}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- 解绑确认弹窗 -->
    <Dialog
      :open="unbindDialogVisible"
      @update:open="
        (v) => {
          if (!v) closeUnbindDialog();
        }
      "
    >
      <DialogContent class="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{{ unbindDialogTitle }}</DialogTitle>
        </DialogHeader>
        <div class="space-y-1.5 py-2">
          <Label>{{ t("profile.currentPassword") }}</Label>
          <Input v-model="unbindPassword" type="password" @keyup.enter="confirmUnbind" />
        </div>
        <DialogFooter>
          <Button variant="outline" @click="closeUnbindDialog">{{ t("profile.cancel") }}</Button>
          <Button variant="destructive" :disabled="!unbindPassword" @click="confirmUnbind">
            {{ t("profile.confirm") }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import {
  CameraIcon,
  PencilIcon,
  UserIcon,
  SmartphoneIcon,
  MailIcon,
  Building2Icon,
  CalendarIcon,
  ShieldCheckIcon,
  LockIcon,
} from "@lucide/vue";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import UserAPI from "@/api/system/user";
import type {
  UserProfileDetail,
  PasswordChangeForm,
  MobileUpdateForm,
  EmailUpdateForm,
  UserProfileForm,
} from "@/api/system/user";
import FileAPI from "@/api/file";
import { useUserStore } from "@/stores";

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();

const userProfile = ref<UserProfileDetail>({});

const enum DialogType {
  ACCOUNT = "account",
  PASSWORD = "password",
  MOBILE = "mobile",
  EMAIL = "email",
}

const dialogState = reactive({
  visible: false,
  title: "",
  type: null as DialogType | null,
});

const userProfileForm = reactive<UserProfileForm>({});
const passwordChangeForm = reactive<PasswordChangeForm>({});
const mobileUpdateForm = reactive<MobileUpdateForm>({});
const emailUpdateForm = reactive<EmailUpdateForm>({});

const mobileCountdown = ref(0);
const emailCountdown = ref(0);
const mobileTimer = ref<ReturnType<typeof setInterval>>();
const emailTimer = ref<ReturnType<typeof setInterval>>();

// 解绑弹窗状态
const unbindDialogVisible = ref(false);
const unbindType = ref<"mobile" | "email">("mobile");
const unbindPassword = ref("");

// 工具函数
function maskMobile(mobile?: string) {
  if (!mobile) return "";
  return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
}

function maskEmail(email?: string) {
  if (!email) return "";
  const atIndex = email.indexOf("@");
  if (atIndex < 0) return email;
  const name = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);
  if (!domain) return email;
  if (name.length <= 2) return `${name[0] ?? ""}***@${domain}`;
  return `${name.slice(0, 2)}***@${domain}`;
}

const mobileSecurityDesc = computed(() =>
  userProfile.value.mobile
    ? t("profile.bound", { value: maskMobile(userProfile.value.mobile) })
    : t("profile.mobileNotBound")
);

const emailSecurityDesc = computed(() =>
  userProfile.value.email
    ? t("profile.bound", { value: maskEmail(userProfile.value.email) })
    : t("profile.emailNotBound")
);

const unbindDialogTitle = computed(() =>
  unbindType.value === "mobile" ? t("profile.unbindMobileTitle") : t("profile.unbindEmailTitle")
);

/** 通用倒计时启动器 */
function startCountdown(
  countdown: Ref<number>,
  timerRef: Ref<ReturnType<typeof setInterval> | undefined>
) {
  countdown.value = 60;
  timerRef.value = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1;
    } else if (timerRef.value) {
      clearInterval(timerRef.value);
    }
  }, 1000);
}

function handleOpenDialog(type: DialogType) {
  dialogState.type = type;
  dialogState.visible = true;
  switch (type) {
    case DialogType.ACCOUNT:
      dialogState.title = t("profile.editProfile");
      userProfileForm.nickname = userProfile.value.nickname;
      userProfileForm.avatar = userProfile.value.avatar;
      userProfileForm.gender = userProfile.value.gender;
      break;
    case DialogType.PASSWORD:
      dialogState.title = t("profile.changePassword");
      passwordChangeForm.oldPassword = "";
      passwordChangeForm.newPassword = "";
      passwordChangeForm.confirmPassword = "";
      break;
    case DialogType.MOBILE:
      dialogState.title = userProfile.value.mobile
        ? t("profile.changeMobile")
        : t("profile.bindMobile");
      mobileUpdateForm.mobile = "";
      mobileUpdateForm.code = "";
      mobileUpdateForm.password = "";
      break;
    case DialogType.EMAIL:
      dialogState.title = userProfile.value.email
        ? t("profile.changeEmail")
        : t("profile.bindEmail");
      emailUpdateForm.email = "";
      emailUpdateForm.code = "";
      emailUpdateForm.password = "";
      break;
  }
}

// 解绑操作 — 使用 Dialog 替代浏览器原生 prompt
function openUnbindDialog(type: "mobile" | "email") {
  unbindType.value = type;
  unbindPassword.value = "";
  unbindDialogVisible.value = true;
}

function closeUnbindDialog() {
  unbindDialogVisible.value = false;
  unbindPassword.value = "";
}

async function confirmUnbind() {
  if (!unbindPassword.value) return;
  try {
    if (unbindType.value === "mobile") {
      await UserAPI.unbindMobile({ password: unbindPassword.value });
      toast.success(t("profile.unbindMobileSuccess"));
    } else {
      await UserAPI.unbindEmail({ password: unbindPassword.value });
      toast.success(t("profile.unbindEmailSuccess"));
    }
    closeUnbindDialog();
    await loadUserProfile();
  } catch {
    // error handled by global handler
  }
}

async function handleSendMobileCode() {
  if (!mobileUpdateForm.mobile) {
    toast.error(t("profile.enterMobile"));
    return;
  }
  const reg = /^1[3-9]\d{9}$/;
  if (!reg.test(mobileUpdateForm.mobile)) {
    toast.error(t("profile.invalidMobile"));
    return;
  }
  try {
    await UserAPI.sendMobileCode(mobileUpdateForm.mobile);
    toast.success(t("profile.codeSent"));
    startCountdown(mobileCountdown, mobileTimer);
  } catch {
    // error handled by global handler
  }
}

async function handleSendEmailCode() {
  if (!emailUpdateForm.email) {
    toast.error(t("profile.enterEmail"));
    return;
  }
  const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
  if (!reg.test(emailUpdateForm.email)) {
    toast.error(t("profile.invalidEmail"));
    return;
  }
  try {
    await UserAPI.sendEmailCode(emailUpdateForm.email);
    toast.success(t("profile.codeSent"));
    startCountdown(emailCountdown, emailTimer);
  } catch {
    // error handled by global handler
  }
}

async function handleSubmit() {
  try {
    if (dialogState.type === DialogType.ACCOUNT) {
      if (!userProfileForm.nickname?.trim()) {
        toast.error(t("profile.enterNickname"));
        return;
      }
      await UserAPI.updateProfile(userProfileForm);
      toast.success(t("profile.profileUpdated"));
      dialogState.visible = false;
      await loadUserProfile();
    } else if (dialogState.type === DialogType.PASSWORD) {
      if (!passwordChangeForm.oldPassword || !passwordChangeForm.newPassword) {
        toast.error(t("profile.enterAllPasswords"));
        return;
      }
      if (passwordChangeForm.newPassword !== passwordChangeForm.confirmPassword) {
        toast.error(t("profile.passwordMismatch"));
        return;
      }
      await UserAPI.changePassword(passwordChangeForm);
      dialogState.visible = false;
      toast.success(t("profile.passwordChanged"));
      userStore.resetUserState();
      router.push("/login");
    } else if (dialogState.type === DialogType.MOBILE) {
      if (!mobileUpdateForm.mobile || !mobileUpdateForm.code || !mobileUpdateForm.password) {
        toast.error(t("profile.fillAllFields"));
        return;
      }
      await UserAPI.bindOrChangeMobile(mobileUpdateForm);
      toast.success(
        userProfile.value.mobile ? t("profile.mobileChanged") : t("profile.mobileBound")
      );
      dialogState.visible = false;
      await loadUserProfile();
    } else if (dialogState.type === DialogType.EMAIL) {
      if (!emailUpdateForm.email || !emailUpdateForm.code || !emailUpdateForm.password) {
        toast.error(t("profile.fillAllFields"));
        return;
      }
      await UserAPI.bindOrChangeEmail(emailUpdateForm);
      toast.success(userProfile.value.email ? t("profile.emailChanged") : t("profile.emailBound"));
      dialogState.visible = false;
      await loadUserProfile();
    }
  } catch {
    // error handled by global handler
  }
}

function handleCancel() {
  dialogState.visible = false;
}

// 头像上传
const fileInput = ref<HTMLInputElement | null>(null);

function triggerFileUpload() {
  fileInput.value?.click();
}

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  try {
    const data = await FileAPI.uploadFile(file);
    await UserAPI.updateProfile({ avatar: data.url });
    userStore.userInfo.avatar = data.url;
    await loadUserProfile();
    toast.success(t("profile.avatarUpdated"));
  } catch {
    // error handled by global handler
  }
  target.value = "";
}

async function loadUserProfile() {
  const data = await UserAPI.getProfile();
  userProfile.value = data;
}

function clearTimers() {
  if (mobileTimer.value) clearInterval(mobileTimer.value);
  if (emailTimer.value) clearInterval(emailTimer.value);
}

onMounted(() => {
  loadUserProfile();
});

onBeforeUnmount(() => {
  clearTimers();
});
</script>
