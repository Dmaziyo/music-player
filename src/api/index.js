import axios from '@/utils/axios'
import { formatTopSongs } from '@/utils/song'
import { defaultLimit } from '@/config'
/** Api接口
 * getToplistDetail     // 歌单排行榜
 * getPersonalized      // 推荐歌单列表
 * getPlayListDetail    // 歌单详细
 * getMusicDetail       // 获取歌曲详细:可以获得单曲 ,也可以获得多首曲子
 * getLyric             //获歌词
 * searchHot            //热搜词条
 * search               //搜索
 * getComment           //获取评论
 * getUserPlaylist      //获取登录用户歌单
 */

// 歌单排行榜
export function getToplistDetail() {
  return axios.get('/toplist/detail')
}

// 推荐歌单
export function getPersonalized() {
  return axios.get('/personalized')
}

// 歌单详细
export function getPlayListDetail(id) {
  return new Promise((resolve, reject) => {
    axios
      .get('/playlist/detail', {
        params: { id }
      })
      .then(({ playlist }) => playlist || {})
      .then(playlist => {
        const { trackIds, tracks } = playlist

        if (!Array.isArray(trackIds)) {
          reject(new Error('获取歌单详细失败'))
          return
        }
        // 说明用户已经登录，获取到了完整歌单,tracksIds是全部
        if (tracks.length === trackIds.length) {
          playlist.tracks = formatTopSongs(playlist.tracks)
          resolve(playlist)
          return
        }
        // 说明用户未登录，则只给500首歌
        const ids = trackIds
          .slice(0, 500)
          .map(v => v.id)
          .toString()
        getMusicDetail(ids).then(({ songs }) => {
          playlist.tracks = formatTopSongs(songs)
          resolve(playlist)
        })
      })
  })
}

// 获取歌曲详细:可以获得单曲，也可以获得多首曲子
export function getMusicDetail(ids) {
  return axios.get('/song/detail', {
    params: {
      ids
    }
  })
}
// 获取歌词
export function getLyric(id) {
  return axios.get('/lyric', {
    params: {
      id
    }
  })
}

// 获取热搜词条
export function searchHot() {
  return axios.get('/search/hot')
}

// 获取评论
export function getComment(id, page, limit = defaultLimit) {
  return axios.get('/comment/music', {
    params: {
      offset: page * limit,
      limit,
      id
    }
  })
}

// 搜索歌曲
/**
 *
 * @param {*} keywords:关键词
 * @param {*} page:页数
 * @param {*} limit:返回数量
 * @returns
 */
export function search(keywords, page = 0, limit = defaultLimit) {
  return axios.get('/search', {
    params: {
      offset: page * limit,
      limit,
      keywords
    }
  })
}

// 获取登录用户歌单&头像信息
export function getUserPlaylist(uid) {
  return axios.get('/user/playlist', {
    params: {
      uid
    }
  })
}
