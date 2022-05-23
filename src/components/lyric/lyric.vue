<template>
  <!-- 歌词组件 -->
  <div>
    <!-- 封面区域，用一个列表,其实也是盒子咯 -->
    <dl class="music-info">
      <dt>
        <img :src="musicPicUrl" />
      </dt>
      <!-- 如果正在播放 -->
      <template v-if="currentMusic.id">
        <dd>歌曲名:{{currentMusic.name}}</dd>
        <dd>歌手名:{{currentMusic.singer}}</dd>
        <dd>专辑名:{{currentMusic.album}}</dd>
      </template>
      <!-- 无播放歌曲 -->
      <template v-else>
        <dd>MaZiYo在线音乐播放器</dd>
        <dd>
          <a href="https://github.com/Dmaziyo" class="hover" target="blank">
            <mz-icon type="github" :size="14"></mz-icon>&nbsp;D城兔MaZiYo
          </a>
        </dd>
      </template>
      <!-- 歌词部分 -->
      <div ref="musicLyric" class="music-lyric">
        <div class="music-lyric-items" :style="lyricTop">
          <p v-if="!currentMusic.id">还没有播放音乐哦!</p>
          <p v-if="nolyric">暂无歌词!</p>
          <template v-else-if="lyric.length>0">
            <!-- 只有当前index等于lyricIndex才会高亮 -->
            <p
              v-for="(item,index) in lyric"
              :key="index"
              :class="{on:lyricIndex===index}"
            >{{item.text}}</p>
          </template>
          <p v-else>歌词加载失败!</p>
        </div>
      </div>
    </dl>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MzIcon from '../../base/mz-icon/mz-icon'
export default {
  props: {
    // 歌词
    lyric: {
      type: Array,
      default: () => [] //对象类型必须从一个工厂中返回
    },
    // 是否有歌词
    nolyric: {
      type: Boolean,
      default: false
    },
    // 正在播放歌词下标
    lyricIndex: {
      type: Number,
      default: 0
    }
  },
  components: {
    MzIcon
  },
  data() {
    return {
      top: 0 //歌词居中
    }
  },
  computed: {
    // 音乐封面
    musicPicUrl() {
      return this.currentMusic.id ? `${this.currentMusic.image}?param=300y300` : require('../../assets/img/player_cover.png') //在js中引入图片必须使用require
    },
    // 控制歌词播放位置
    lyricTop() {
      return `transform:translate3d(0,${-34 * (this.lyricIndex - this.top)}px,0)`
    },
    ...mapGetters(['currentMusic'])
  },
  mounted() {
    // 窗口监听,当页面大小变化时，自动修改高度
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        this.calcTop()
      }, 60)
    })
    this.$nextTick(() => {
      this.calcTop()
    })
  },
  methods: {
    //移动端的歌词显示
    calcTop() {
      const dom = this.$refs.musicLyric //歌词DOM
      //获取元素的css样式，歌词不显示时则不需要进行调整
      const { display = '' } = window.getComputedStyle(dom)
      if (display === 'none') {
        return
      }
      const height = dom.offsetHeight //返回元素的高度
      this.top = Math.floor(height / 34 / 2) //一个p的高度是34px，然后居中就是第n个p，也就是除2
    }
  }
}
</script>

<style lang="less">
.music-info {
  padding-bottom: 20px;
  text-align: center;
  font-size: @font_size_medium;
  dt {
    position: relative;
    width: 186px;
    height: 186px;
    margin: 0 auto 15px;
    // 给当前图片后面添加一个挂件
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0px;
      width: 201px;
      height: 180px;
      background: url('../../assets/img/album_cover_player.png');
    }
    img {
      width: 186px;
      height: 186px;
    }
  }
  dd {
    height: 30px;
    line-height: 30px;
    .no-wrap();
  }
}
// 歌词部分
.music-lyric {
  position: absolute;
  //居中，并且与info产生间隔
  top: 315px;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: @font_size_small;
  overflow: hidden;
  .music-lyric-items {
    line-height: 34px;
    transition: 0.6s ease-out;
    transform: translate3d(0, 0, 0);
    .no-wrap();
    .on {
      color: @lyric_color_active;
    }
  }
}

// 当屏幕小于960时，歌词关闭为手动打开
@media (max-width: 960px) {
  .music-info {
    display: none;
  }
  .music-lyric {
    top: 0;
  }
}
</style>