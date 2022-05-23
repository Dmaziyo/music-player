<template>
  <!-- 弹出层提示 -->
  <transition name="toast-fade">
    <div v-show="visible" class="mz-toast" :class="positionClass">{{message}}</div>
  </transition>
</template>

<script>
export default {
  name: 'MzToast',
  data() {
    return {
      position: 'center', //显示位置
      message: '默认消息', //显示消息
      duration: 1500, //显示时间
      visible: true //展示
    }
  },
  computed: {
    // 弹出框的位置
    positionClass() {
      return 'mz-toast-' + this.position
    }
  }
}
</script>

<style lang="less">
@prefix-cls:mz-toast;
.@{prefix-cls}{
  //fixed可以把div盒子变成inline-block
  z-index: 1400;
  position: fixed;
  left: 50%;
  box-sizing: border-box;
  border-radius: 5px;
  min-height: 40px;
  line-height: 20px;
  font-size: 14px;
  color: #fff;
  background: rgba(0,0,0,0.5);
  user-select: none;
  transform: translateX(-50%);
  padding: 10px 20px;
  text-align: center;
  //父元素 .父元素-top
  &-top{
    top: 10%;
  }
  &-center{
    top: 50%;
    transform: translate(-50%,-50%);
  }
  &-bottom{
    bottom: 10%;
  }
}
// 动画
.toast-fade-enter{
  opacity: 0;
}
.toast-fade-enter-active{
  transition: all 0.5s;
}
.toast-fade-enter-to{
  opacity: 1;
}
</style>