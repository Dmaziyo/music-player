<!-- 音量控制组件 -->
<template>
  <div class="volume">
    <mz-icon
      class="pointer volume-icon"
      :type="getVolumeIconType"
      :size="30"
      @click="handleToggleVolume"
    ></mz-icon>
    <div class="volume-progress-wrapper">
      <mz-progress
        :percent="volume"
        @percent-change-end="handleVolumeChange"
        @percent-change="handleVolumeChange"
      ></mz-progress>
    </div>
  </div>
</template>

<script>
import MzProgress from '../../base/mz-progress/mz-progress'
import MzIcon from '../../base/mz-icon/mz-icon'
export default {
  components: {
    MzProgress,
    MzIcon
  },
  props: {
    // 音量
    volume: {
      type: Number,
      required: true
    }
  },
  computed: {
    // 是否静音
    isMute: {
      get() {
        return this.volume === 0
      },
      set(newMute) {
        const volume = newMute ? 0 : this.lastVolume
        if (newMute) {
          // 如果是静音，则记录当前的进度
          this.lastVolume = this.volume
        }
        this.handleVolumeChange(volume)
      }
    },
    // 获取音量图标
    getVolumeIconType() {
      return this.isMute ? 'volume-off' : 'volume'
    }
  },
  methods: {
    //将新数据返回给父组件
    handleVolumeChange(percent) {
      this.$emit('volume-change', percent)
    },
    handleToggleVolume() {
      this.isMute = !this.isMute
    }
  }
}
</script>

<style lang="less" scoped>
.volume {
  display: flex;
  align-items: center;
  width: 150px;
  &-icon {
    margin-right: 5px;
  }
  &-progress-wrapper {
    // 自动填满剩余区域
    flex: 1;
  }
  @media (max-width: 768px) {
    top: 2px;
    width: 31px;
    &-progress-wrapper {
      display: none;
    }
  }
}
</style>