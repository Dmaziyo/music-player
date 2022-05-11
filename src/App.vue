<template>
  <div id="app">
    <mz-header></mz-header>
    <router-view class="router-view"></router-view>
    <!-- 播放器 -->
    <audio ref="mzPlayer"></audio>
  </div>
</template>
<script>
import MzHeader from './components/mz-header/mz-header'
import { getPlayListDetail } from '@/api'
import { defaultSheetId } from '@/config'
import { mapMutations, mapActions } from 'vuex'
export default {
  components: {
    MzHeader,
  },
  created() {
    // 获取默认歌单的歌曲
    getPlayListDetail(defaultSheetId).then((playlist) => {
      const list = playlist.tracks.slice(0, 100)
      this.setPlaylist({ list })
    })
    // 绑定当前audio元素
    this.$nextTick(() => {
      this.setAudioEle(this.$refs.mzPlayer)
    })
  },
  methods: {
    ...mapMutations({
      setAudioEle: 'SET_AUDIOELE',
    }),
    ...mapActions(['setPlaylist']),
  },
}
</script>
<style lang="less">
#app {
  position: relative;
  color: @text_color;
}
</style>
