//格式化时间
export function addZero(s) {
  return s < 10 ? '0' + s : s
}

export function format(value) {
  let minute = Math.floor(value / 60)
  let second = Math.floor(value % 60)
  return `${addZero(minute)}:${addZero(second)}`
}

// 歌词解析
const timeExp = /\[(\d{2,}):(\d{2})\.(\d{2,3})]/g
export function parseLyric(lyr) {
  const lines = lyr.split('\n');//分割成字符串数组
  const lyric = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const result = timeExp.exec(line);
    if (!result) continue;
    const text = line.replace(timeExp, '').trim()
    if (text) {
      lyric.push({
        time: (result[1] * 60 + result[2] * 1 + (result[3] || 0) * 1e-3),
        text,
      })
    }
  }
  return lyric
}
// 判断是否为string
export function isString(v) {
  return typeof v === 'string'
}


// http链接转换成https
export function toHttps(url) {
  if (!isString(url)) {
    return url
  }
  return url.replace('http://', 'https://');
}