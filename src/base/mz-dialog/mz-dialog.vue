  <!-- 弹窗对话组件 -->
<template>
  <transition name="mz-dialog-fade">
    <!-- 控制整个盒子是否显示 -->
    <div v-show="dialogShow" class="mz-dialog-box">
      <div class="mz-dialog-wrapper">
        <div class="mz-dialog-content">
          <div class="mz-dialog-head" v-text="headText"></div>
          <!-- 添加对话框内容 -->
          <slot></slot>
          <div class="mz-dialog-btns">
            <div
              class="mz-dialog-cancel"
              v-if="dialogType!=='alert'"
              @click="cancel"
              v-text="cancelBtnText"
            ></div>
            <slot name="btn"></slot>
            <div class="mz-btn-confirm" @click="confirm" v-text="confirmBtnText"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MzDialog',
  props: {
    // confirm包含取消按钮，而alert不包含取消按钮
    type: {
      type: String,
      default: 'confirm'
    },
    //设置标题
    headText: {
      type: String,
      default: '提示'
    },
    // 取消按钮的文字
    cancelBtnText: {
      type: String,
      default: '关闭'
    },
    // 确认按钮的文字
    confirmBtnText: {
      type: String,
      default: '确定'
    }
  },
  data() {
    return {
      // 显示对话框
      dialogShow: false
    }
  },
  computed: {
    // type属性格式化
    dialogType() {
      return this.type.toLowerCase()
    }
  },

  methods: {
    // 显示对话框
    show() {
      this.dialogShow = true
    },
    // 隐藏对话框
    hide() {
      this.dialogShow = false
    },
    // 确认事件
    confirm() {
      this.hide()
      this.$emit('confirm')
    },
    // 取消事件
    cancel() {
      this.hide()
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="less">
// less自定义变量
@dialog-prefix-cls: mz-dialog;

.mz-dialog-head{
  font-size: 18px;
  color: #fff;
  padding: 15px;
}

// 变量选择器需要.@{变量名}
.@{dialog-prefix-cls}-box {
  // 设置遮罩
  z-index: 1400;
  position: fixed;
  // 为了实现0px，只能延长宽高了
  left: 0px;
  right: 0px;
  top :0px;
  bottom: 0px;
  // 使用户不能选择文本
  background-color: @dialog_bg_color;
  user-select: none;
  // &表示当前选择器的父级
  &.@{dialog-prefix-cls}-fade-enter-active{
    animation: mz-dialog-fadein 0.3s;
    .@{dialog-prefix-cls}-content{
      animation: mz-dialog-zoom 0.3s;
    }
  }
  .@{dialog-prefix-cls}-wrapper{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .@{dialog-prefix-cls}-content{
      width: 420px;
      border-radius: 5px;
      background: @dialog_content_bg_color;
      @media(max-width:767px){
        width: 270px;
        border-radius: 10px;
        text-align: center;
      }
      .@{dialog-prefix-cls}-text{
        padding: 20px 15px;
        line-height: 22px;
        font-size: @font_size_medium;
        color:@dialog_text_color;
      }
      .@{dialog-prefix-cls}-btns{
        display: flex;
        align-items: center;
        padding: 0 15px 10px;
        text-align: center;
        color: @dialog_text_color;
        // 在大于768px时自适应
        @media(min-width:768px){
          justify-content: flex-end;
          div{
            display: block;
            padding: 8px 15px;
            border-radius: 3px;
            border: 1px solid @btn_color;
            font-size: @font_size_medium;
            cursor: pointer;
            &:not(:nth-of-type(1)){
              margin-left: 10px;
            }
            &.mz-btn-confirm{
              border-style: @btn_color_active;
            }
            &:hover{
              color:@text_color_active;
              border:1px solid @btn_color_active
            }
          }
        }
        // 在小于768px时自适应
        @media(max-width:767px){
          &{
            padding: 0;
            justify-content: center;
            div{
              flex:1;
              line-height: 22px;
              padding: 10px 0;
              border-top: 1px solid @dialog_line_color;
              font-size: @font_size_large;
              &:not(:nth-of-type(1)){
                border-left: 1px solid @dialog_line_color;
              }
            }
          }
        }
      }
    }
  }
}
// 自制动画
@keyframes mz-dialog-fadein{
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
@keyframes mz-dialog-zoom{
  0%{
    transform: scale(0);
  }
  50%{
    transform: scale(1.2);
  }
  100%{
    transform: scale(1);
  }
}
</style>