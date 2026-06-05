<template>
  <!-- 隐藏 SVG，在 DOM 中注册滤镜定义 -->
  <svg style="position: absolute; width: 0; height: 0; overflow: hidden" aria-hidden="true">
    <defs>
      <!-- 共享边缘渐变遮罩 -->
      <radialGradient
        v-for="f in filters"
        :id="`${f.id}-edge-mask`"
        :key="`${f.id}-edge-mask`"
        cx="50%"
        cy="50%"
        r="50%"
      >
        <stop offset="0%" stop-color="black" stop-opacity="0" />
        <stop
          :offset="`${Math.max(30, 80 - f.aberrationIntensity * 2)}%`"
          stop-color="black"
          stop-opacity="0"
        />
        <stop offset="100%" stop-color="white" stop-opacity="1" />
      </radialGradient>

      <!-- 三个折射滤镜 -->
      <filter
        v-for="f in filters"
        :id="f.id"
        :key="f.id"
        x="-35%"
        y="-35%"
        width="170%"
        height="170%"
        color-interpolation-filters="sRGB"
      >
        <!-- 1. 加载位移贴图 -->
        <feImage
          x="0"
          y="0"
          width="100%"
          height="100%"
          result="DISPLACEMENT_MAP"
          :href="displacementMapStandard"
          preserveAspectRatio="xMidYMid slice"
        />

        <!-- 2. 提取边缘强度 -->
        <feColorMatrix
          in="DISPLACEMENT_MAP"
          type="matrix"
          values="0.3 0.3 0.3 0 0  0.3 0.3 0.3 0 0  0.3 0.3 0.3 0 0  0 0 0 1 0"
          result="EDGE_INTENSITY"
        />
        <!-- 阶梯函数：边缘区域才保留色散 -->
        <feComponentTransfer in="EDGE_INTENSITY" result="EDGE_MASK">
          <feFuncA type="discrete" :tableValues="`0 ${f.aberrationIntensity * 0.05} 1`" />
        </feComponentTransfer>

        <!-- 3. 原始未偏移图像（中心参考） -->
        <feOffset in="SourceGraphic" dx="0" dy="0" result="CENTER_ORIGINAL" />

        <!-- 4. R 通道位移（完整缩放） -->
        <feDisplacementMap
          in="SourceGraphic"
          in2="DISPLACEMENT_MAP"
          :scale="-f.displacementScale"
          xChannelSelector="R"
          yChannelSelector="B"
          result="RED_DISPLACED"
        />
        <feColorMatrix
          in="RED_DISPLACED"
          type="matrix"
          values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
          result="RED_CHANNEL"
        />

        <!-- 5. G 通道位移（色差增强） -->
        <feDisplacementMap
          in="SourceGraphic"
          in2="DISPLACEMENT_MAP"
          :scale="-f.displacementScale - f.displacementScale * f.aberrationIntensity * 0.05"
          xChannelSelector="R"
          yChannelSelector="B"
          result="GREEN_DISPLACED"
        />
        <feColorMatrix
          in="GREEN_DISPLACED"
          type="matrix"
          values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
          result="GREEN_CHANNEL"
        />

        <!-- 6. B 通道位移（色差进一步增强，模拟蓝光折射率更高） -->
        <feDisplacementMap
          in="SourceGraphic"
          in2="DISPLACEMENT_MAP"
          :scale="-f.displacementScale - f.displacementScale * f.aberrationIntensity * 0.1"
          xChannelSelector="R"
          yChannelSelector="B"
          result="BLUE_DISPLACED"
        />
        <feColorMatrix
          in="BLUE_DISPLACED"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
          result="BLUE_CHANNEL"
        />

        <!-- 7. Screen 混合合成 RGB -->
        <feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="screen" result="GB_COMBINED" />
        <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="RGB_COMBINED" />

        <!-- 8. 高斯模糊柔化色散（模糊随 aberration 反向变化） -->
        <feGaussianBlur
          in="RGB_COMBINED"
          :stdDeviation="Math.max(0.1, 0.5 - f.aberrationIntensity * 0.1)"
          result="ABERRATED_BLURRED"
        />

        <!-- 9. 用边缘遮罩裁切色散效果 -->
        <feComposite
          in="ABERRATED_BLURRED"
          in2="EDGE_MASK"
          operator="in"
          result="EDGE_ABERRATION"
        />

        <!-- 10. 反转遮罩取中心清洁区 -->
        <feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK">
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feComposite in="CENTER_ORIGINAL" in2="INVERTED_MASK" operator="in" result="CENTER_CLEAN" />

        <!-- 11. 边缘色散 + 清洁中心合成 -->
        <feComposite in="EDGE_ABERRATION" in2="CENTER_CLEAN" operator="over" />
      </filter>
    </defs>
  </svg>
</template>

<script lang="ts" setup>
import { displacementMapStandard } from "./displacementMaps";

/**
 * SVG 滤镜提供者 (单例，挂载于 App.vue)
 *
 * 定义三个折射层级的 SVG filter：
 * - liq-high: 高透高折射 (displacementScale=25, aberration=2.5)
 * - liq-med:  中透平滑 (displacementScale=15, aberration=1.5)
 * - liq-clear: 高清晰展示 (displacementScale=8, aberration=0.8)
 *
 * 每个滤镜遵循完整的色散管线：
 * feImage → 灰度 → 边缘遮罩 → 三通道位移 → 通道分离 → screen 合成 → 高斯柔化 → 遮罩合成
 */

interface FilterConfig {
  id: string;
  displacementScale: number;
  aberrationIntensity: number;
  gaussianBlur: number;
}

const filters: FilterConfig[] = [
  { id: "liq-high", displacementScale: 70, aberrationIntensity: 2, gaussianBlur: 0.3 },
  { id: "liq-med", displacementScale: 15, aberrationIntensity: 1.5, gaussianBlur: 0.35 },
  { id: "liq-clear", displacementScale: 8, aberrationIntensity: 0.8, gaussianBlur: 0.42 },
];
</script>
