<template>
  <div class="playList">
    <music-list
      listType="duration"
      :list="playList"
      @select="selectItem"
      @del="deleteItem"
    >
      <div slot="listBtn" class="list-btn">
        <span @click="showDialog">清空列表</span>
      </div>
    </music-list>
    <mz-dialog
      ref="dialog"
      body-text="是否清空正在播放列表"
      confirm-btn-text="清空"
    ></mz-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import MzDialog from '../../base/mz-dialog/mz-dialog'
import MusicList from '../../components/music-list/music-list'
export default {
  name: 'PlayList',
  components: {
    MzDialog,
    MusicList,
  },
  computed: {
    ...mapGetters(['playing', 'playList', 'currentMusic']),
  },
  methods: {
    selectItem(item, index) {
      // 如果点击的是新歌曲，则更改currentMusic,并且播放
      if (item.id !== this.currentMusic.id) {
        this.setCurrentIndex(index)
        this.setPlaying(true)
      }
    },
    showDialog() {
      this.$refs.dialog.show()
    },
    deleteItem(index) {
      let list = [...this.playList]
      list.splice(index, 1)
      this.removePlayList({ index, list })
    },
    ...mapMutations({
      setPlaying: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENTINDEX',
    }),
    ...mapActions(['removePlayList']),
  },
}
</script>

<style lang="less">
.playList {
  position: relative;
  width: 100%;
  height: 100%;
  .musicList {
    width: 100%;
    height: 100%;
    // 设置按钮
    .list-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      span {
        padding: 5px 20px;
        cursor: pointer;
      }
      &:hover {
        color: @text_color_active;
      }
    }
  }
}
</style>
