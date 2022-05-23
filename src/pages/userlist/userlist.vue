<template>
  <div class="userList">
    <mz-loading v-model="mzLoadShow"></mz-loading>
    <template class="ulist" v-if="list.length>0">
      <div class="list-item" v-for="(item,index) in list" :key="index">
        <router-link class="userList-item" tag="div" :to="`/music/details/${item.id}`">
          <img class="cover-img" :src="`${item.coverImgUrl}?param=200y200`" :title="item.name" />
          <h3 class="name">{{item.name}}</h3>
        </router-link>
      </div>
    </template>
    <mz-no-result v-else :title="title"></mz-no-result>
  </div>
</template>

<script>
import MzLoading from '@/base/mz-loading/mz-loading'
import { loadMixin } from '@/utils/mixin'
import { getUserPlaylist } from '@/api'
import MzNoResult from '@/base/mz-no-result/mz-no-result'
import { mapGetters } from 'vuex'
export default {
  components: {
    MzLoading,
    MzNoResult
  },
  mixins: [loadMixin],
  created() {
    if (!this.uid) {
      this.$mzToast('您还没有登录，无法查看歌单')
    } else {
      this._getUserPlaylist()
    }
    this._hideLoad()
  },
  data() {
    return {
      title: '您还没有登录，无法查看歌单',
      list: () => []
    }
  },
  computed: {
    ...mapGetters(['uid'])
  },
  methods: {
    // 获取当前用户歌单
    _getUserPlaylist() {
      getUserPlaylist(this.uid).then(res => {
        this.list = res.playlist.slice(1)
        console.log(this.list)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.userList {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  .list-item {
    cursor: pointer;
    display: inline-block;
    float: left;
    text-align: center;
    width: calc(~'100%/7');
    img {
      width: 130px;
      height: 130px;
    }
    .name {
      height: 30px;
      width: 130px;
      margin: 0 auto;
      line-height: 30px;
      font-size: @font_size_small;
      font-weight: normal;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>