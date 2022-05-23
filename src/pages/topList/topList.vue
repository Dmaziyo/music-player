<template>
  <!-- 热搜榜 -->
  <div class="topList">
    <mz-loading v-model="mzLoadShow"></mz-loading>
    <template v-if="!mzLoadShow">
      <div class="topList-head">云音乐特色榜</div>
      <!-- 热搜榜 -->
      <div class="topList-content">
        <div v-for="(item, index) in list" class="list-item" :key="index">
          <router-link :to="`/music/details/${item.id}`" tag="div" class="topList-item">
            <div class="topList-img">
              <img
                v-lazy="`${item.coverImgUrl}?param=300y300`"
                class="cover-img"
                :title="item.description"
              />
            </div>
            <h3 class="name">{{ item.name }}</h3>
          </router-link>
        </div>
      </div>
      <div class="topList-head">热门歌单</div>
      <div class="topList-content">
        <div v-for="(item, index) in hotList" class="list-item" :key="index">
          <router-link :to="`/music/details/${item.id}`" tag="div" class="topList-item">
            <div class="topList-img">
              <img class="cover-img" v-lazy="`${item.picUrl}?param=300y300`" />
            </div>
            <h3 class="name">{{ item.name }}</h3>
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import MzLoading from '@/base/mz-loading/mz-loading'
import { getToplistDetail, getPersonalized } from '@/api'
import { loadMixin } from '@/utils/mixin.js'
export default {
  name: 'TopList',
  components: {
    MzLoading
  },
  mixins: [loadMixin],
  data() {
    return {
      list: [], //特色歌单
      hotList: [] //热门歌单
    }
  },
  created() {
    // 并行获取两个数据
    Promise.all([getToplistDetail(), getPersonalized()])
      .then(([topList, hotList]) => {
        this.list = topList.list.filter(item => item.ToplistType)
        this.hotList = hotList.result
        this._hideLoad()
      })
      .catch(() => {
        this._hideLoad()
      })
  }
}
</script>

<style lang="less" scoped>
.topList {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  &-head {
    width: 100%;
    height: 34px;
    line-height: 34px;
    padding: 20px 0px;
    font-size: @font_size_large;
    color: @text_color_active;
  }
  //清除浮动
  .topList-content {
    overflow: hidden;
  }
  .list-item {
    float: left;
    width: calc(~'100% / 7');
    .topList-item {
      width: 80%;
      text-align: center;
      cursor: pointer;
      margin: 0 auto 20px;
      &:hover {
        color: @text_color_active;
      }
      .cover-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .name {
        height: 30px;
        line-height: 30px;
        font-size: @font_size_medium;
        .no-wrap();
      }
    }
    @media (max-width: 1450px) {
      width: calc(~'100%/6');
    }
    @media (max-width: 1300px) {
      width: calc(~'100%/5');
    }
    @media (max-width: 1150px) {
      width: calc(~'100%/4');
    }
    @media (max-width: 1015px) {
      width: calc(~'100%/3');
    }
    @media (max-width: 960px) {
      width: calc(~'100%/5');
    }
    @media (max-width: 920px) {
      width: calc(~'100%/4');
    }
  }
  .list-item.list-time i {
    display: none;
  }
}
</style>
