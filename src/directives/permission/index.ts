import type { Directive, DirectiveBinding } from "vue";
import { useUserStore } from "@/stores";
import { ROLE_ROOT } from "@/constants";

/**
 * 按钮级权限指令
 *
 * 用法：
 * - 单个权限：v-hasPerm="'sys:user:create'"
 * - 多个权限（OR）：v-hasPerm="['sys:user:create', 'sys:user:update']"
 */
export const hasPerm: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const requiredPerms = binding.value;

    // 校验传入的权限值是否合法
    if (!requiredPerms || (typeof requiredPerms !== "string" && !Array.isArray(requiredPerms))) {
      throw new Error(
        "需要提供权限标识！例如：v-hasPerm=\"'sys:user:create'\" 或 v-hasPerm=\"['sys:user:create', 'sys:user:update']\"",
      );
    }

    const { roles, perms } = useUserStore().userInfo;

    // 超级管理员拥有所有权限，如果是 "*:*:*" 权限标识则不需要校验
    if (roles?.includes(ROLE_ROOT) || requiredPerms.includes("*:*:*")) {
      return;
    }

    // 检查权限
    const hasAuth = Array.isArray(requiredPerms)
      ? requiredPerms.some((perm) => perms?.includes(perm))
      : perms?.includes(requiredPerms);

    // 没有权限则移除该元素
    if (!hasAuth && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  },
};

/**
 * 角色权限指令
 *
 * 用法：
 * - 单个角色：v-hasRole="'ADMIN'"
 * - 多个角色（OR）：v-hasRole="['ADMIN', 'TEST']"
 */
export const hasRole: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const requiredRoles = binding.value;

    // 校验传入的角色值是否合法
    if (!requiredRoles || (typeof requiredRoles !== "string" && !Array.isArray(requiredRoles))) {
      throw new Error(
        "需要提供角色标识！例如：v-hasRole=\"'ADMIN'\" 或 v-hasRole=\"['ADMIN', 'TEST']\"",
      );
    }

    const { roles } = useUserStore().userInfo;

    // 检查是否有对应角色
    const hasAuth = Array.isArray(requiredRoles)
      ? requiredRoles.some((role) => roles?.includes(role))
      : roles?.includes(requiredRoles);

    // 没有权限则移除元素
    if (!hasAuth && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  },
};
