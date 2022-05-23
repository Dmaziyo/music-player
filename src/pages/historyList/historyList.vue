<template>
  <!-- 历史歌曲List -->
  <div class="historyList">
    <music-list :list="historyList" list-type="duration" @select="selectItem" @del="deleteItem">
      <div slot="listBtn" class="list-btn">
        <span @click="$refs.dialog.show()">清空列表</span>
      </div>
    </music-list>
    <mz-dialog ref="dialog" confirm-btn-text="清空" cancel-btn-text="取消"></mz-dialog>
  </div>
</template>

<script>
import MusicList from '@/components/music-list/music-list'
import MzDialog from '@/base/mz-dialog/mz-dialog'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'HistoryList',
  components: {
    MusicList,
    MzDialog
  },
  computed: {
    ...mapGetters(['historyList', 'playing', 'currentMusic'])
  },
  methods: {
    // 选中歌曲,重新排列顺序
    selectItem(item, index) {
      this.selectPlay({
        list: this.historyList,
        index
      })
    },
    // 删除歌曲
    deleteItem(index) {
      let list = [...this.historyList]
      list.splice(index, 1)
      this.removeHistory(list)
    },
    ...mapActions(['selectPlay', 'removeHistory'])
  }
}
</script>

<style lang="less" scoped>
.historyList {
  width: 100%;
  height: 100%;
  .list-btn {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: @font_size_medium;
      user-select: none;
      &:hover {
        cursor: pointer;
        color: @text_color_active;
      }
    }
  }
}
</style>