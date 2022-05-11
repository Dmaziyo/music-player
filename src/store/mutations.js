import * as types from './mutation-types'
const mutations = {
  // 修改audio元素
  [types.SET_AUDIOELE](state, audioEle) {
    state.audioEle = audioEle
  },
  // 修改Mode
  [types.SET_PLAYMODE](state, mode) {
    state.mode = mode
  },
  // 修改播放状态
  [types.SET_PLAYING](state, playing) {
    state.playing = playing
  },
  // 修改播放list
  [types.SET_PLAYLIST](state, playList) {
    state.playList = playList
  },
  // 修改顺序List
  [types.SET_ORDERLIST](state, orderList) {
    state.orderList = orderList
  },
  // 修改当前音乐索引
  [types.SET_CURRENTINDEX](state, currentIndex) {
    state.currentIndex = currentIndex
  },
  // 修改历史列表
  [types.SET_HISTORYLIST](state, historyList) {
    state.historyList = historyList
  },
  // 修改UID
  [types.SET_UID](state, uid) {
    state.uid = uid
  },
}
export default mutations