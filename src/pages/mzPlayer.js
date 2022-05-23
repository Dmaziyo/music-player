// import { playMode } from "@/config";

// 重试次数
// let retry = 1

// 初始化音乐
const mzPlayerMusic = {
  initAudio(that) {
    const ele = that.audioEle //音频元素？
    // 在音频下载缓存时执行
    ele.onprogress = () => {
      try {
        // console.log(ele.buffered);
        if (ele.buffered.length > 0) {
          const duration = that.currentMusic.duration
          let buffered = 0
          //ele.buffered返回的是一个区间对象，可能有多个区间
          buffered = ele.buffered.end(0) >= duration ? duration : ele.buffered.end(0)
          that.currentProgress = buffered / duration //更改缓存进度条
        }
      } catch (e) {
        console.log(e)
      }
    }
    // 在视频或者音乐开始播放时触发
    ele.onplay = () => {
      let timer
      clearTimeout(timer) //为了操作一下timer
      timer = setTimeout(() => {
        that.musicReady = true
      }, 100)
    }
    //获取当前播放时间,在播放的时候自动更新时间
    ele.ontimeupdate = () => {
      that.currentTime = ele.currentTime
    }
    // 如果音乐能够正常播放,无需版权的，加入至历史记录
    ele.oncanplay = () => {
      if (that.historyList.length === 0 || that.currentMusic.id !== that.historyList[0].id) {
        that.setHistory(that.currentMusic)
      }
    }
  }
}
export default mzPlayerMusic
