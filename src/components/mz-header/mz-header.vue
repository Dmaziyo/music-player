<template>
  <header class="mz-header">
    <h1 class="header">
      <a href="https://github.com/Dmaziyo?tab=repositories" target="_blank">MaZiYo在线音乐播放器</a>
    </h1>
    <div class="user">
      <div class="user-btn" @click="openDialog(0)">登录</div>
    </div>
    <!-- 登录 -->
    <mz-dialog
      ref="loginDialog"
      head-text="登录"
      confirm-btn-text="登录"
      cancel-btn-text="关闭"
      @confirm="login"
    >
      <div class="mz-dialog-text">
        <input
          class="mz-dialog-input"
          v-model.trim="uidValue"
          autofocus
          placeholder="请输入您的网易云UID"
          type="number"
        />
      </div>
      <div slot="btn" @click="openDialog(1)">帮助</div>
    </mz-dialog>
    <!-- helper -->
    <mz-dialog
      ref="helpDialog"
      head-text="登录帮助"
      confirm-btn-text="去登录"
      cancel-btn-text="关闭"
      @confirm="openDialog(0)"
    >
      <div class="mz-dialog-text">
        <ol>
          <li>
            <a target="_blank" href="https://music.163.com/">点我(https://music.163.com/)</a>打开网易云音乐官网
          </li>
          <li>点击右上角的"登录"</li>
          <li>点击您的头像，进入我的主页</li>
          <li>复制浏览器地址栏/user/home?id=后面的数字</li>
        </ol>
      </div>
    </mz-dialog>
  </header>
</template>

<script>
import MzDialog from '../../base/mz-dialog/mz-dialog.vue'
export default {
  data() {
    return {
      user: {},
      uidValue: '',
    }
  },
  components: {
    MzDialog,
  },
  methods: {
    openDialog(key) {
      switch (key) {
        case 0: {
          this.$refs.loginDialog.show()
          break
        }
        case 1: {
          this.$refs.loginDialog.hide()
          this.$refs.helpDialog.show()
        }
      }
    },
    login() {
      if (this.uidValue === '') {
        console.log('UID 不能为空')
        // 因为组件内部设置的是hide
        this.openDialog(0)
        return
      }
    },
  },
}
</script>

<style lang="less">
.mz-header {
  position: absolute;
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  @media (max-width: 768px) {
    background-color: @header_bg_color;
  }
  .header {
    text-align: center;
    line-height: 60px;
    color: @text_color_active;
    font-weight: 400;
    font-size: 18px;
    @media (max-width: 768px) {
      padding-left: 15px;
      text-align: left;
    }
  }
  .user {
    position: absolute;
    top: 50%;
    right: 15px;
    text-align: right;
    transform: translateY(-50%);
    &-btn {
      cursor: pointer;
      color: @text_color;
      &:hover {
        color: @text_color_active;
      }
    }
  }
  // 设置input框和文本样式
  .mz-dialog-text {
    .mz-dialog-input {
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      padding: 0 15px;
      outline: none;
      border: 1px solid @btn_color;
      background: transparent;
      color: @text_color_active;
      box-shadow: 0 0 1px 0 #fff inset; //使得上部分更亮一些
      &::placeholder {
        color: @text_color;
      }
    }
    a:hover {
      color: #d43c33;
    }
  }
}
</style>