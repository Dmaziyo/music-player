<template>
  <!-- 正在播放列表 -->
  <div class="musicList">
    <template v-if="list.length > 0">
      <!-- header部分 -->
      <div class="list-item list-header">
        <span class="list-name">歌曲</span>
        <span class="list-artist">歌手</span>
        <span v-if="isDuration" class="list-time">时长</span>
        <span v-else class="list-album">专辑</span>
      </div>
      <!-- 内容部分 -->
      <div class="list-content">
        <div
          class="list-item"
          v-for="(item, index) in list"
          :key="index"
          :class="{ on: playing && currentMusic.id === item.id }"
          @dblclick="selectItem(item, index, $event)"
        >
          <span class="list-num" v-text="index + 1"></span>
          <div class="list-name">
            <span>{{ item.name }}</span>
            <div class="list-menu">
              <!-- 阻止事件冒泡 -->
              <mz-icon
                class="hover"
                @click.stop="selectItem(item, index)"
                type="play-mini"
                :size="40"
              ></mz-icon>
            </div>
          </div>
          <span class="list-artist">{{ item.singer }}</span>
          <span v-if="isDuration" class="list-time">
            {{ item.duration | format }}
            <mz-icon
              class="hover list-menu-icon-del"
              type="delete-mini"
              :size="40"
              @click="deleteItem(index)"
            ></mz-icon>
          </span>
          <!-- album没有删除按钮 -->
          <span v-else class="list-album">{{ item.album }}</span>
        </div>
        <!-- 插槽 -->
        <slot name="listBtn"></slot>
      </div>
    </template>
    <mz-no-result v-else title="抱歉，好像出了点问题,没有歌曲"></mz-no-result>
  </div>
</template>

<script>
import MzNoResult from '../../base/mz-no-result/mz-no-result'
import { format } from '@/utils/util'
import MzIcon from '../../base/mz-icon/mz-icon'
import { mapGetters, mapMutations } from 'vuex'
// const LIST_TYPE_ALBUM = 'album'
const LIST_TYPE_ALBUM = 'album'
const LIST_TYPE_DURATION = 'duration'
export default {
  name: 'MusicList',
  props: {
    // 歌单数据
    list: {
      type: Array,
      default: () => [],
    },
    /*
    列表类型
    * album:专辑栏目
    * duration:时长
    * pullup:上拉加载
    */
    listType: {
      type: String,
      default: LIST_TYPE_ALBUM,
    },
  },
  components: {
    MzNoResult,
    MzIcon,
  },
  filters: {
    format,
  },
  data() {
    return {}
  },
  computed: {
    isDuration() {
      return this.listType === LIST_TYPE_DURATION
    },
    ...mapGetters(['playing', 'currentMusic']),
  },
  methods: {
    // 每个item都要进行一次对比
    getPlayIconType({ id: itemId }) {
      const { playing, currentMusic: id } = this
      return playing && id === itemId ? 'pause-mini' : 'play-mini'
    },
    selectItem(item, index, e) {
      if (e && /list-menu-icon-del/.test(e.target.className)) {
        return
      }
      if (this.currentMusic.id && item.id === this.currentMusic.id) {
        this.setPlaying(!this.playing)
      }

      this.$emit('select', item, index) //返回给父组件响应播放或暂停
    },
    deleteItem(index) {
      this.$emit('del', index)
    },
    ...mapMutations({
      setPlaying: 'SET_PLAYING',
    }),
  },
}
</script>

<style lang="less" scoped>
.musicList{
  height: 100%;
  .list-header {
  border-bottom: 1px solid @list_item_line_color;
  color: @text_color_active;
  .list-name {
    padding-left: 40px;
    user-select: none;
  }
}
.list-content {
  width: 100%;
  height: calc(~'100% - 60px');
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.list-item {
  display: flex;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid @list_item_line_color;
  overflow: hidden;
  font-size: @font_size_medium;
  align-items: center;
  // 把索引屏蔽，播放gif
  &.on {
    color: #fff;
    .list-num {
      font-size: 0;
      width: 30px;
      height: 30px;
      background: url(../../assets/img/wave.gif) no-repeat center;
    }
  }
  &:hover {
    .list-menu {
      display: block;
    }
  }
  // item在hover状态
  &:not([class*='list-header']):hover {
    .list-menu {
      display: block;
    }
    .list-time {
      font-size: 0;
      .list-menu-icon-del {
        display: block;
      }
    }
  }
  // list序号
  .list-num {
    display: block;
    width: 30px;
    margin-right: 10px;
    text-align: center;
  }
  // 歌名
  .list-name {
    position: relative;
    flex: 1;
    box-sizing: border-box;
    & > span {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .list-menu {
      display: none;
      position: absolute;
      font-size: 0;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .list-album,
  .list-artist {
    display: block;
    width: 300px;
    .no-wrap();
    @media (max-width: 1440px) {
      width: 200px;
    }
    @media (max-width: 1200px) {
      width: 150px;
    }
    @media (max-width: 450px) {
      width: 100px;
    }
  }
  .list-time {
    display: block;
    width: 60px;
    position: relative;
    .list-menu-icon-del {
      display: none;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
    @media (max-width: 545px) {
      width: 50px;
    }
    @media (max-width: 450px) {
      display: none;
    }
  }
}
}

</style>
