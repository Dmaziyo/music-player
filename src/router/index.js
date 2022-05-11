import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/music',
  },
  {
    path: '/music',
    component: () => import('@/pages/music'),
    redirect: '/music/playlist',
    children: [
      {
        path: '/music/playlist',
        component: () => import('@/pages/playList/playList'),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: '/music/historylist',
        component: () => import('@/pages/historyList/historyList'),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: '/music/search',
        component: () => import('@/pages/search/search'),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: '/music/toplist',
        component: () => import('@/pages/topList/topList'),
      },
      {
        path: '/music/details/:id',
        component: () => import('@/pages/details/details'),
        props: true,
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
