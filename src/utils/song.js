import { toHttps } from "./util";
export class Song {
  constructor({ id, name, singer, album, image, duration, url }) {
    this.id = id;
    this.name = name;
    this.singer = singer;
    this.album = album;
    this.image = image;
    this.duration = duration;
    this.url = url
  }
}
// 过滤歌手名
function filterSinger(singers) {
  let arr = []
  singers.forEach(item => {
    arr.push(item.name)
  })
  return arr.join('/');
}


// 歌曲数据格式化,处理歌手为ar的
export function createTopList(music) {
  // 解构创建
  return new Song({
    id: music.id,
    name: music.name,
    // &&返回第一个false
    singer: music.ar.length > 0 && filterSinger(music.ar),
    album: music.al.name,
    image: toHttps(music.al.picUrl) || null,
    duration: music.dt / 1000,
    url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
  })
}




export const formatTopSongs = function formatTopList(list) {
  let Songs = []
  // 遍历数组
  list.forEach(item => {
    const musicData = item;
    if (musicData.id) {
      Songs.push(createTopList(musicData))
    }
  })
  return Songs
}

// 格式化专辑版本
export function createPlayList(music) {
  // 解构创建
  return new Song({
    id: music.id,
    name: music.name,
    // &&返回第一个false
    singer: music.artists.length > 0 && filterSinger(music.artists),
    album: music.album.name,
    image: toHttps(music.artists.picUrl) || null,
    duration: music.duration / 1000,
    url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
  })
}




export const formatSongs = function formatPlayList(list) {
  let Songs = []
  // 遍历数组
  list.forEach(item => {
    const musicData = item;
    if (musicData.id) {
      Songs.push(createPlayList(musicData))
    }
  })
  return Songs
}