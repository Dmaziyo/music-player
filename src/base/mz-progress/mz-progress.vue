<template>
  <!-- 进度条 -->
  <div ref="mzProgress" @click="barClick" class="mzProgress">
    <div class="mzProgress-bar">
      <!-- 缓冲进度 -->
      <div ref="mzPercentProgress" class="mzProgress-outer"></div>
      <!-- 播放进度 -->
      <div ref="mzProgressInner" class="mzProgress-inner">
        <div class="mzProgress-dot" @mousedown="barDown"></div>
      </div>
    </div>
  </div>
</template>

<script>
const dotWidth = 10
export default {
  name: 'MzProgress',
  props: {
    // 进度值
    percent: {
      type: Number,
      default: 0
    },
    // 缓冲值
    percentProgress: {
      type: Number,
      default: 0
    }
  },
  watch: {
    // 监听播放进度，并控制进度
    percent(newPercent) {
      if (newPercent >= 0 && !this.move.status) {
        const barWidth = this.$refs.mzProgress.clientWidth - dotWidth
        const offsetWidth = newPercent * barWidth
        this.moveSlide(offsetWidth)
      }
    },
    percentProgress(newValue) {
      const barWidth = this.$refs.mzProgress.clientWidth - dotWidth
      let offsetWidth = barWidth * newValue
      this.$refs.mzPercentProgress.style.width = `${offsetWidth}px`
    }
  },
  data() {
    return {
      move: {
        status: false, //是否可拖动
        startX: 0, //鼠标按下时原位置
        left: 0 //记录已经移动的距离
      }
    }
  },
  // 在所有数据更新完毕后，绑定所有事件
  mounted() {
    this.$nextTick(() => {
      this.bindEvents()
      const barWidth = this.$refs.mzProgress.clientWidth - dotWidth //bar剩余的宽度
      const offsetWidth = this.percent * barWidth
      this.moveSlide(offsetWidth)
    })
  },
  beforeDestroy() {
    this.unbindEvents()
  },
  methods: {
    // 必须是document，因为拉开以后鼠标还会移动，而只需要通过点击来判断即可
    bindEvents() {
      document.addEventListener('mousemove', this.barMove)
      document.addEventListener('mouseup', this.barUp) //取消点击状态
    },
    // 取消绑定事件
    unbindEvents() {
      document.removeEventListener('mousemove', this.barMove)
      document.removeEventListener('mouseup', this.barUp)
    },
    // 鼠标按下
    barDown(e) {
      this.move.status = true
      // 记录按下时鼠标的水平位置
      this.move.startX = e.clientX
      // 根据这个进度条的宽度来判断已经播放的长度
      this.move.left = this.$refs.mzProgressInner.clientWidth
    },
    // 进度条移动
    barMove(e) {
      if (!this.move.status) {
        return false
      }
      e.preventDefault()
      let endX = e.clientX
      let dist = endX - this.move.startX //计算距离distance
      // 这样写是为了防止超过最左或最右的情况
      let offsetWidth = Math.min(this.$refs.mzProgress.clientWidth - dotWidth, Math.max(0, this.move.left + dist))
      this.moveSlide(offsetWidth)
      this.commitPercent()
    },
    // 鼠标松开
    barUp() {
      if (this.move.status) {
        this.commitPercent(true)
        this.move.status = false
      }
    },
    // 通过增大宽度来实现移动效果
    moveSlide(offsetWidth) {
      this.$refs.mzProgressInner.style.width = `${offsetWidth}px`
    },
    //鼠标点击
    barClick(e) {
      // rect为节点最左边至浏览器最左边的距离
      let rect = this.$refs.mzProgress.getBoundingClientRect()
      let offsetWidth = Math.min(this.$refs.mzProgress.clientWidth - dotWidth, Math.max(0, e.clientX - rect.left))
      this.moveSlide(offsetWidth)
      this.commitPercent(true)
    },
    // emit事件:分两种情况，拖动中，拖动完
    commitPercent(isEnd = false) {
      const { mzProgress, mzProgressInner } = this.$refs
      const lineWidth = mzProgress.clientWidth - dotWidth
      const percent = mzProgressInner.clientWidth / lineWidth
      this.$emit(isEnd ? 'percent-change-end' : 'percent-change', percent)
    }
  }
}
</script>

<style lang="less">
.mzProgress {
  position: relative;
  padding: 5px; //使两端有空隙
  user-select: none;
  cursor: pointer;
  // 整个进度条
  &-bar {
    height: 2px;
    width: 100%;
    background-color: @bar_color;
  }
  // 加载完成的进度
  &-outer {
    position: absolute;
    left: 5px;
    display: inline-block;
    width: 0;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.2);
  }
  // 正在播放的进度
  &-inner {
    position: absolute;
    left: 5px;
    display: inline-block;
    height: 2px;
    background: @line_color;
  }
  // 进度条的按钮
  &-dot {
    position: absolute;
    right: -5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: @dot_color;
    transform: translateY(-50%);
  }
}
</style>