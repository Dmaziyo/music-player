<template>
  <div class="details">
    <mz-loading v-show="mzLoadShow"></mz-loading>
    <music-list :list="list" @select="selectItem"></music-list>
  </div>
</template>

<script>
import MzLoading from '@/base/mz-loading/mz-loading'
import MusicList from '@/components/music-list/music-list'
import { getPlayListDetail } from '@/api'
import { loadMixin } from '@/utils/mixin'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import * as types from '@/store/mutation-types'
export default {
  components: {
    MzLoading,
    MusicList,
  },
  props: {
    id: String,
  },
  data() {
    return {
      list: [],
    }
  },
  created() {
    getPlayListDetail(this.id)
      .then((playlist) => {
        this.list = playlist.tracks
        this._hideLoad()
      })
      .catch(() => {
        this._hideLoad()
      })
  },
  computed: {
    ...mapGetters(['playing', 'currentMusic']),
  },
  mixins: [loadMixin],
  methods: {
    selectItem(item, index) {
      if (this.currentMusic.id && item.id === this.currentMusic.id) {
        return
      }
      this.setCurrentIndex(index)
      this.setPlaying(true)
      this.selectPlay({
        index,
        list: this.list,
      })
    },
    ...mapMutations({
      setCurrentIndex: types.SET_CURRENTINDEX,
      setPlayList: types.SET_PLAYLIST,
      setPlaying: types.SET_PLAYING,
    }),
    ...mapActions(['selectPlay', 'removePlayList']),
  },
}
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
}
</style>
