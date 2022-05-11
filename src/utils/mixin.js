import { mapActions, mapGetters, mapMutations } from "vuex";
import * as types from '@/store/mutation-types'
// 复用加载
export const loadMixin = {
  data() {
    return {
      mzLoadShow: true//加载状态
    }
  },
  methods: {
    _hideLoad() {
      let timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.mzLoadShow = false
      }, 200)
    }
  }
}
// 歌曲列表
export const listMixin = {
  computed: {
    ...mapGetters(['playing', 'currentMusic'])
  },
  methods: {
    selectItem(item, index) {
      if (item.id === this.currentMusic.id && this.playing) {
        this.set_playing(false)
      }
      else {
        this.selectPlay({
          list: this.list,
          index
        })
      }
    },
    ...mapMutations({
      set_playing: types.SET_PLAYING,
    }),
    ...mapActions(['selectPlay'])
  }
}