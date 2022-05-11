
// 关于浏览器本地数据操作
import { defaultVolume } from "@/config";
const _storage = window.localStorage
// 自己改写localStorage
const storage = {
  get(key, data = []) {
    if (_storage) {
      // 因为存放的时候是stringify
      return _storage.getItem(key) ? (Array.isArray(data) ? JSON.parse(_storage.getItem(key)) : _storage.getItem(key)) : data
    }
  },
  set(key, val) {
    if (_storage) {
      _storage.setItem(key, val);
    }
  },
  clear(key) {
    if (_storage) {
      _storage.removeItem(key)
    }
  }
}

// 播放历史
const HISTORYLIST_KEY = '__mzPlayer_historyList__'//key值
const HISTORYListMAX = 200//长度
// 获取播放历史
export function getHistoryList() {
  return storage.get(HISTORYLIST_KEY);
}

// 更新播放历史
export function setHistoryList(music) {
  let list = storage.get(HISTORYLIST_KEY)
  // 找到当前播放的歌曲位置
  const index = list.findIndex(item => { return item.id === music.id })
  if (index === 0) {
    // 直接在返回的list中添加即可
    return list
  }
  // 如果已存在，就移除歌曲
  if (index > 0) {
    list.splice(index, 1);
  }
  // 添加到开头
  let newLen = list.unshift(music);
  if (HISTORYListMAX && newLen > HISTORYListMAX) {
    // 清除后面的歌曲
    list.pop();
  }
  storage.set(HISTORYLIST_KEY, JSON.stringify(list));
  return list
}

// 删除一条播放历史记录
export function removeHistoryList(musicList) {
  // 传的是新的musicList
  storage.set(HISTORYLIST_KEY, JSON.stringify(musicList));
  return musicList
}

// 清空播放历史
export function clearHistoryList() {
  storage.clear(HISTORYLIST_KEY);
}

/*
  播放模式
  MODE_KEY:key值
*/
const MODE_KEY = '__mzPlayer_mode__';
// 获取播放模式
export function getMode() {
  // 传null是切换get模式
  return storage.get(MODE_KEY, null);
}
// 修改播放模式
export function setMode(mode) {
  storage.set(MODE_KEY, mode);
  return mode;
}

/*
  网易云用户ID
  USERID_KEY:key
*/
const USERID_KEY = '__mzPlayer_userID__';
// 获取用户ID
export function getUserId() {
  return Number(storage.get(USERID_KEY, null));
}
// 修改用户UID
export function setUserId(uid) {
  storage.set(USERID_KEY, uid);
}

/*
  *音量
  * VOLUME_KEY:key值
*/
const VOLUME_KEY = '__mzPlayer_volume__';
// 获取音量
export function getVolume() {
  const volume = storage.get(VOLUME_KEY, defaultVolume)
  return Number(volume)
}
// 修改音量
export function setVolume(volume) {
  storage.set(VOLUME_KEY, volume);
  return volume
}

