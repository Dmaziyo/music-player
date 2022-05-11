import {
  //   clearHistoryList,
  setHistoryList,
  removeHistoryList,
  //   setMode,
  //   setUserId
} from '@/utils/storage'
import * as types from './mutation-types'

function findIndex(list, music) {
  return list.findIndex((item) => {
    return item.id === music.id
  })
}

// 设置播放列表
export const setPlaylist = function ({ commit }, { list }) {
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_ORDERLIST, list)
}

// 设置播放历史:先利用util的setHistory，再进入actions更新
export const setHistory = function ({ commit }, music) {
  commit(types.SET_HISTORYLIST, setHistoryList(music))
}

// 删除播放历史
export const removeHistory = function ({ commit }, musicList) {
  commit(types.SET_HISTORYLIST, removeHistoryList(musicList))
}

// 更新播放列表
export const selectPlay = function ({ commit }, { list, index }) {
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_ORDERLIST, list)
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_PLAYING, true)
}

//添加搜索音乐至播放列表
export const selectAddPlay = function ({ commit, state }, music) {
  let list = [...state.playList]
  let index = findIndex(list, music)
  if (index > -1) {
    commit(types.SET_CURRENTINDEX, index)
  } else {
    list.unshift(music)
    console.log(list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_ORDERLIST, list)
    commit(types.SET_CURRENTINDEX, 0)
  }
  commit(types.SET_PLAYING, true)
}

// 删除播放列表中的歌曲：判断是否前移，
export const removePlayList = function ({ commit, state }, { index, list }) {
  let currentIndex = state.currentIndex
  if (index < currentIndex || list.length === state.currentIndex) {
    currentIndex--
    commit(types.SET_CURRENTINDEX, currentIndex)
  }
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_ORDERLIST, list)
  if (!list.length) {
    commit(types.SET_PLAYING, false)
  } else {
    commit(types.SET_PLAYING, true)
  }
}
