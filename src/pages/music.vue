<template>
  <div class="music">
    <!-- 主内容 -->
    <div class="music-content">
      <!-- 歌单list -->
      <div class="music-left">
        <music-btn></music-btn>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="music-list" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" class="music-list" />
      </div>
      <!-- 歌词部分 -->
      <div class="music-right">
        <lyric ref="lyric" :lyric="lyric" :nolyric="nolyric" :lyric-index="lyricIndex" :currentMusic="currentMusic"></lyric>
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="music-bar" :class="{ disable: !musicReady || !currentMusic.id }">
      <!-- 左部分的按钮 -->
      <div class="music-bar-btns">
        <mz-icon title="上一首 Ctrl+Left" type="prev" class="pointer" :size="36" @click="prev" />
        <div title="播放暂停 Ctrl+Space" class="control-play pointer">
          <mz-icon :type="playing ? 'pause' : 'play'" @click="play" :size="24" />
        </div>
        <mz-icon class="pointer" type="next" :size="36" title="下一首 Ctrl + Right" @click="next"></mz-icon>
      </div>
      <!-- 按钮中间部分 -->
      <div class="music-music">
        <div class="music-bar-info">
          <template v-if="currentMusic && currentMusic.id">
            {{ currentMusic.name }}
            <span>-{{ currentMusic.singer }}</span>
          </template>
          <template v-else>欢迎使用MaZiYo在线播放器</template>
        </div>
        <div v-if="currentMusic.id" class="music-bar-time">{{ currentTime | format }}/{{ currentMusic.duration % 3600 | format }}</div>
        <mz-progress
          class="music-progress"
          :percent="percentMusic"
          :percent-progress="currentProgress"
          @percent-change-end="progressMusicEnd"
          @percent-change="progressMusic"
        ></mz-progress>
      </div>
      <!-- 播放模式 -->
      <mz-icon class="pointer mode" :type="ModeIconType" :title="ModeIconTitle" :size="30" @click="modeChange"></mz-icon>
      <!-- 评论 -->
      <router-link :to="`/music/comment/${this.currentMusic.id}`">
        <mz-icon class="pointer comment" type="comment" :size="30"></mz-icon>
      </router-link>
      <!-- 音量控制 -->
      <div class="music-bar-volume" title="音量加减[Ctrl+Up/Down]">
        <volume :volume="volume" @volume-change="volumeChange" />
      </div>
    </div>
    <!-- 用于遮罩，显示背景 -->
    <div class="mzPlayer-bg" :style="{ 'background-image': backgroundUrl }"></div>
    <div class="mzPlayer-mask"></div>
  </div>
</template>

<script>
import mzPlayer from './mzPlayer'
import { format, parseLyric } from '@/utils/util'
import { getVolume, setVolume } from '@/utils/storage'
import { getLyric } from '@/api'

import MzIcon from '../base/mz-icon/mz-icon'
import MzProgress from '../base/mz-progress/mz-progress'
import MusicBtn from '../components/music-btn/music-btn'
import Lyric from '../components/lyric/lyric'
import Volume from '../components/volume/volume'
import { playMode } from '@/config'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    MzIcon,
    MzProgress,
    MusicBtn,
    Lyric,
    Volume
  },
  data() {
    const volume = getVolume()
    return {
      lyric: [], //歌词
      // 暂时的list
      nolyric: false, //是否有无歌词
      lyricIndex: 0, //当前歌词下标
      musicReady: false, //是否可以使用播放器,false则不能上一首和下一首
      currentTime: 0, //当前播放时间
      currentProgress: 0, //当前音乐缓存进度
      mode: 1,
      volume
    }
  },
  // 定义过滤器
  filters: {
    format
  },
  computed: {
    // 播放进度
    percentMusic() {
      const duration = this.currentMusic.duration
      return this.currentTime && duration ? this.currentTime / duration : 0
    },
    // 背景图片
    backgroundUrl() {
      console.log('1')
      return this.currentMusic.id ? `url(${this.currentMusic.image})` : 'url(' + require('../assets/background/bg_1.jpg') + ')'
    },
    // 获取播放模式
    ModeIconType() {
      return {
        [playMode.listLoop]: 'loop',
        [playMode.order]: 'sequence',
        [playMode.random]: 'random',
        [playMode.loop]: 'loop-one'
      }[this.mode]
    }, // 获取播放模式title
    ModeIconTitle() {
      const key = 'Ctrl+O'
      return {
        [playMode.listLoop]: `列表循环${key}`,
        [playMode.order]: `顺序播放${key}`,
        [playMode.random]: `随机播放${key}`,
        [playMode.loop]: `单曲循环${key}`
      }[this.mode]
    },
    ...mapGetters(['audioEle', 'currentIndex', 'currentMusic', 'playList', 'playing', 'historyList'])
  },
  watch: {
    // 当前音乐变更，是在playList下变更的
    currentMusic(newMusic, oldMusic) {
      if (!newMusic.id) {
        this.lyric = []
        return
      }
      if (newMusic.id === oldMusic.id) {
        return
      }
      this.audioEle.src = newMusic.url
      // 歌曲变更后播放
      this.audioEle.play()
      // 重置歌词
      this.$nextTick(() => {
        this._getLyric(newMusic.id)
      })
      this.lyricIndex = this.currentTime = this.currentProgress = 0
    },
    // 播放音乐
    playing(newPlaying) {
      const audio = this.audioEle
      this.$nextTick(() => {
        newPlaying ? audio.play().then(null, () => {}) : audio.pause()
        this.musicReady = true
      })
    },
    // 歌词时间变换歌词
    currentTime(newTime) {
      if (this.nolyric) {
        return
      }
      let lyricIndex = 0
      for (let i = 0; i < this.lyric.length; i++) {
        if (newTime > this.lyric[i].time) {
          // 找到最新的那个部分
          lyricIndex = i
        }
      }

      this.lyricIndex = lyricIndex
    },
    ...mapActions(['setHistory'])
  },
  mounted() {
    this.$nextTick(() => {
      mzPlayer.initAudio(this)
    })
  },
  methods: {
    // 上一首:当前音乐的序号的上一首
    prev() {
      if (!this.musicReady) {
        return
      }
      let index = this.currentIndex - 1 >= 0 ? this.currentIndex - 1 : this.playList.length - 1
      this.setCurrentIndex(index)
    },
    // 播放音乐
    play() {
      if (!this.musicReady) {
        return
      }
      this.setPlaying(!this.playing)
    },
    // 下一首歌
    next() {
      if (!this.musicReady) {
        return
      }
      let index = this.currentIndex + 1 < this.playList.length ? this.currentIndex + 1 : 0
      this.setCurrentIndex(index)
    },
    // 获取歌词
    _getLyric(id) {
      getLyric(id).then(res => {
        if (res.nolyric) {
          this.nolyric = true
        } else {
          this.nolyric = false
          this.lyric = parseLyric(res.lrc.lyric)
        }
        this.audioEle.play()
      })
    },

    // 切换播放顺序
    modeChange() {
      const mode = (this.mode + 1) % 4
      this.mode = mode
      // 之后便会更换播放列表
    },
    progressMusic(percent) {
      this.currentTime = this.currentMusic.duration * percent
    },
    progressMusicEnd(percent) {
      this.audioEle.currentTime = this.currentMusic.duration * percent
    },
    volumeChange(volumePercent) {
      this.volume = volumePercent
      this.audioEle.volume = volumePercent
      setVolume(volumePercent) //缓存记录volume
    },
    ...mapMutations({
      setPlaying: 'SET_PLAYING',
      setPlayList: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENTINDEX'
    }),
    ...mapActions(['setHistory'])
  }
}
</script>

<style lang="less">
.music {
  padding: 70px 25px 25px 25px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  box-sizing: border-box;
  // 内容展示区
  .music-content {
    display: flex;
    width: 100%;
    height: calc(~'100% - 80px'); //留下80px给剩下的music-bar
    .music-left {
      flex: 1; //相当于规定了flex-grow的值,根据flex-grow定义的比例来进行分配
      height: 100%;
      overflow: hidden;
      .music-list {
        height: calc(~'100% - 60px'); //给上面留出60px
      }
    }
    .music-right {
      position: relative;
      width: 310px;
    }
  }
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.music-bar {
  display: flex;
  color: #fff;
  // 当前没有音乐播放
  &.disable {
    pointer-events: none; //限制了鼠标所有事件在这个元素上
    opacity: 0.5;
  }
  .music-bar-btns {
    width: 180px;
    display: flex;
    justify-content: space-between;
    .control-play {
      .flex-center;
      width: 40px;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
    }
  }
  .music-music {
    position: relative;
    width: 100%;
    flex: 1;
    box-sizing: border-box;
    padding-left: 40px;
    font-size: @font_size_small;
    color: @text_color_active;
    .music-bar-info {
      height: 15px;
      line-height: 15px;
      padding-right: 80px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .music-bar-time {
      position: absolute;
      top: 0;
      right: 5px;
    }
  }
  .mode,
  .comment,
  .music-bar-volume {
    margin-left: 20px;
  }
}
@media (max-width: 450px) {
  .music-bar {
    display: block;
    position: relative;
    width: 100%;
    .music-music {
      padding: 0px;
    }
    .music-bar-btns {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 40px;
    }
    .music-bar-volume {
      display: none;
    }
    .mode {
      position: absolute;
      top: 45px;
      left: 5px;
    }
    .comment {
      position: absolute;
      top: 45px;
      right: 5px;
    }
  }
}
// 设置遮罩
.mzPlayer-bg,
.mzPlayer-mask {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
// 用于遮罩加深背景色
.mzPlayer-mask {
  z-index: -1;
  background-color: @mask_color;
}
.mzPlayer-bg {
  z-index: -2;
  background-repeat: no-repeat;
  background-size: cover; //缩放背景图，等比例，但是会裁剪
  filter: blur(12px); //高斯模糊
  opacity: 0.7;
  transition: all 0.8s;
}
@media (max-width: 960px) {
  .music-right {
    display: none;
  }
}
</style>
