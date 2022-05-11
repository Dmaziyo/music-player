import { playMode } from '@/config'
import { getHistoryList, getMode, getUserId } from '@/utils/storage'
// 定义数据
const state = {
  audioEle: null, //audio元素
  mode: Number(getMode()) || playMode.listLoop,//默认为循环播放
  playing: false,//播放状态
  playList: [],//播放列表
  orderList: [],//播放顺序列表
  currentIndex: -1,//默认当前音乐索引为-1
  historyList: getHistoryList() || [],//历史记录
  uid: getUserId() || null//用户UID
}
export default state