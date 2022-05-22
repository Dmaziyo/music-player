<template>
  <div class="music-btn">
    <!-- tag将router渲染成对应的标签 -->
    <router-link to="/music/playlist" tag="span">正在播放</router-link>
    <router-link to="/music/toplist" tag="span">推荐</router-link>
    <router-link to="/music/search" tag="span">搜索</router-link>
    <router-link to="/music/userlist" tag="span">我的歌单</router-link>
    <!-- 在宽度小于960px时，显示跳出歌词的按钮，并把右边的歌词删除 -->
    <span class="show_960" @click="$emit('onClickLyric')">歌词</span>
    <router-link to="/music/historylist" tag="span">我听过的</router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.music-btn {
  width: 100%;
  height: 60px;
  white-space: nowrap;
  overflow: hidden;
  overflow-x: auto;
  span {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    margin-right: 8px;
    padding: 0 23px;
    border-radius: 2px;
    cursor: pointer;
    font-size: 14px;
    color: @text_color;
    border: 1px solid @btn_color;
    &:nth-last-of-type(1) {
      //父元素中所有span，从最后一个开始计数
      margin: 0;
    }
    &:hover,
    &.active {
      border-color: @btn_color_active;
      color: @text_color_active;
    }
  }
  @media (min-width: 960px) {
    span.show_960 {
      display: none;
    }
  }
  @media (max-width: 960px) {
    span.show_960 {
      display: inline-block;
    }
  }
  @media (max-width: 768px) {
    height: 50px;
    span {
      height: 35px;
      padding: 0 10px;
      margin-right: 6px;
      line-height: 35px;
    }
  }
}
</style>