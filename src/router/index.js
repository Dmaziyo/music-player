import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/music'
  },
  {
    path: '/music',
    component: () => import('@/pages/music'),
    redirect: '/music/playlist',
    children: [
      // 正在播放列表
      {
        path: '/music/playlist',
        component: () => import('@/pages/playList/playList'),
        meta: {
          keepAlive: true
        }
      },
      // 历史播放列表
      {
        path: '/music/historylist',
        component: () => import('@/pages/historyList/historyList'),
        meta: {
          keepAlive: true
        }
      },
      // 搜索模块
      {
        path: '/music/search',
        component: () => import('@/pages/search/search'),
        meta: {
          keepAlive: true
        }
      },
      // 热搜
      {
        path: '/music/toplist',
        component: () => import('@/pages/topList/topList')
      },
      // 单个歌单
      {
        path: '/music/details/:id',
        component: () => import('@/pages/details/details'),
        props: true
      },
      // 评论
      {
        path: '/music/comment/:id',
        component: () => import('@/pages/comment/comment'),
        props: true
      },
      // 用户歌单
      {
        path: '/music/userlist',
        component: () => import('@/pages/userlist/userlist'),
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
