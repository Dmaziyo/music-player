<template>
  <!-- 搜索 -->
  <div class="search">
    <mz-loading v-model="mzLoadShow"></mz-loading>
    <div class="search-head">
      <span
        class="hover"
        v-for="(item,index) in Artists"
        :key="index"
        @click="clickHot(item.first)"
      >{{item.first}}</span>
      <input
        class="search-input"
        v-model.trim="searchValue"
        type="text"
        @keyup.enter="onEnter"
        placeholder="音乐/歌手"
      />
    </div>
    <music-list class="musicList" :list="list" list-type="pullup" @select="selectItem"></music-list>
  </div>
</template>

<script>
import MzLoading from '@/base/mz-loading/mz-loading'
import MusicList from '@/components/music-list/music-list'
import { loadMixin } from '@/utils/mixin'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { searchHot, search, getMusicDetail } from '@/api'
import { formatSongs } from '@/utils/song'
import { toHttps } from '@/utils/util'
import * as types from '@/store/mutation-types'
export default {
  name: 'Search',
  components: {
    MzLoading,
    MusicList,
  },
  mixins: [loadMixin],
  data() {
    return {
      searchValue: '', //搜索的关键词
      Artists: [], //热搜组
      list: [], //音乐list
      page: 0,
    }
  },
  computed: {
    ...mapGetters(['playing', 'currentMusic']),
  },
  created() {
    searchHot().then(({ result }) => {
      this.Artists = result.hots.splice(0, 5)
      this.mzLoadShow = false
    })
  },
  methods: {
    // 点击热搜
    clickHot(name) {
      this.searchValue = name
      this.onEnter()
    },
    // 搜索事件
    onEnter() {
      //trim
      if (this.searchValue.replace(/(^\s+)|(\s+$)/g, '') === '') {
        this.$mzToast('搜索内容不能为空!')
        return
      }
      this.mzLoadShow = true
      search(this.searchValue).then(({ result }) => {
        console.log(result.songs);
        this.list = formatSongs(result.songs)
        this._hideLoad()
      })
    },
    // 添加进播放列表中
    async selectItem(music) {
      try {
        if (music.id === this.currentMusic.id) {
          return
        }
        let image = await this._getMusicDetail(music.id)
        music.image = toHttps(image)
        this.selectAddPlay(music)
      } catch (error) {
        this.$mzToast('添加播放失败')
      }
    },
    // 获取歌曲详细封面
    _getMusicDetail(id) {
      return getMusicDetail(id).then((res) => res.songs[0].al.picUrl)
    },
    ...mapActions(['selectAddPlay']),
    ...mapMutations({
      setPlaying: types.SET_PLAYING,
    }),
  },
}
</script>

<style lang="less" scoped>
.search {
  position: relative;
  width: 100%;
  height: 100%;
  .search-head {
    display: flex;
    height: 40px;
    padding: 10px 15px;
    overflow: hidden;
    font-size: @font_size_medium;
    background-color: @search_bg_color;
    span {
      line-height: 40px;
      margin-right: 15px;
      @media (max-width: 640px) {
        & {
          display: none;
        }
      }
    }
    .search-input {
      flex: 1;
      height: 40px;
      box-sizing: border-box;
      padding: 0 15px;
      border: 1px solid @btn_color;
      outline: none;
      background: transparent;
      color: @text_color_active;
      &::placeholder {
        color: @text_color;
      }
    }
    .musicList {
      width: 100%;
      height: calc(~'100% - 60px');
    }
  }
}
</style>