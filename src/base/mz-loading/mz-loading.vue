<template>
  <!-- 加载时的转圈 -->
  <div v-show="value" class="mz-loading" :style="{backgroundColor:loadingBgColor}">
    <div class="mz-loading-content">
      <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
            <stop stop-color="#fff" stop-opacity="0" offset="0%" />
            <stop stop-color="#fff" stop-opacity=".631" offset="63.146%" />
            <stop stop-color="#fff" offset="100%" />
          </linearGradient>
        </defs>
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)">
            <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.9s"
                repeatCount="indefinite"
              />
            </path>
            <circle fill="#fff" cx="36" cy="18" r="1">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.9s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MzLoading',
  props: {
    // 是否显示
    value: {
      type: Boolean,
      default: true,
    },
    loadingBgColor: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="less">
.mz-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: @load_bg_color;
  .mz-loading-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>