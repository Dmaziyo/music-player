<template>
  <div class="comment">
    <mz-loading :value="false"></mz-loading>
    <dl class="comment-list">
      <dt class="comment-title">精彩评论</dt>
      <dd v-for="item in hotComments" :key="item.commentId" class="comment-item">
        <a :href="`https://music.163.com/#/user/home?id=${item.user.userId}`" target="_blank">
          <img class="comment-item-pic" :src="`${item.user.avatarUrl}?param=50y50`" alt title="头像" />
          <h2 class="comment-item-title">{{item.user.nickname}}</h2>
        </a>
        <p class="comment-item-text">{{item.content}}</p>
        <div v-if="item.beReplied>0" class="comment-item-replied">{{item.beReplied[0].user.nickname}}回复:{{item.beReplied[0].content}}</div>
        <div class="comment-item-opt">
          <span class="comment-opt-date">{{item.time|format}}</span>
          <span v-if="item.likedCount>0" class="comment-opt-likes">
            <mz-icon type="good"></mz-icon>
            {{item.likedCount}}
          </span>
        </div>
      </dd>
      <dt class="comment-title">最新评论</dt>
      <dd v-for="item in comments" :key="item.commentId" class="comment-item">
        <a :href="`https://music.163.com/#/user/home?id=${item.user.userId}`" target="_blank">
          <img class="comment-item-pic" :src="`${item.user.avatarUrl}?param=50y50`" alt title="头像" />
          <h2 class="comment-item-title">{{item.user.nickname}}</h2>
        </a>
        <p>{{item.content}}</p>
        <div v-if="item.beReplied>0" class="comment-item-replied">{{item.beReplied[0].user.nickname}}回复:{{item.beReplied[0].content}}</div>
        <div class="comment-item-opt">
          <span class="comment-opt-date">{{item.time|format}}</span>
          <span v-if="item.liked" class="comment-opt-likes">
            <mz-icon type="good"></mz-icon>
            {{item.likedCount}}
          </span>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import MzLoading from '@/base/mz-loading/mz-loading'
import { loadMixin } from '@/utils/mixin'
import MzIcon from '@/base/mz-icon/mz-icon'
import { getComment } from '@/api'
export default {
  components: {
    MzLoading,
    MzIcon
  },
  mixins: [loadMixin],
  data() {
    return {
      page: 0,
      hotComments: [],
      comments: []
    }
  },
  props: {
    id: String
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      getComment(this.id, this.page).then(res => {
        console.log(res)
        this.hotComments = res.hotComments
        this.comments = res.comments
      })
    },
    listScroll() {},
    pullUp() {}
  },
  filters: {
    format(time) {
      let formatTime
      const date = new Date(time)
      const dateObj = {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes()
      }
      const curTime = new Date()
      const diff = curTime.getTime() - time
      //同一月，并且相差时间不大
      if (curTime.getDate() === dateObj.date && diff < 60000) {
        formatTime = '刚刚'
      } else if (curTime.getDate() === dateObj.date && diff > 6000 && diff < 3600000) {
        formatTime = `${Math.floor(diff / 60000)}分钟前`
      } else {
        formatTime = `${dateObj.year}年${dateObj.month}月${dateObj.date}日`
      }
      return formatTime
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  position: relative;
  width: 100%;
  height: 100%;
  .comment-list {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px 0;
    -webkit-overflow-scrolling: touch;
    .comment-title {
      height: 34px;
      line-height: 34px;
      padding: 10px 0;
      color: @text_color_active;
      border-bottom: 1px solid @comment_head_line_color;
    }
    .comment-item {
      position: relative;
      padding: 15px 0px 15px 55px;
    }
    .comment-item-pic {
      display: block;
      position: absolute;
      left: 0px;
      top: 30px;
      width: 38px;
      height: 38px;
      border-radius: 50%;
    }
    .comment-item-title {
      font-size: @font_size_medium;
      height: 20px;
      font-weight: 400;
      color: @text_color_active;
      .no-wrap();
    }
    .comment-item-text {
      font-size: @font_size_small;
      overflow: hidden;
      line-height: 25px;
      color: @text_color;
    }
    .comment-item-replied {
      padding: 8px 18px;
      margin-top: 10px;
      line-height: 20px;
      border: 1px solid @comment_replied_line_color;
    }
    .comment-item-opt {
      margin-top: 10px;
      line-height: 25px;
      text-align: right;
      font-size: @font_size_small;
      .comment-opt-date {
        float: left;
      }
      .comment-opt-likes {
        display: inline-block;
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
</style>
