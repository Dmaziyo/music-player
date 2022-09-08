## Music player

---

**声明**：该项目模仿自[Vue-mmPlayer](https://github.com/maomao1996/Vue-mmPlayer)

## 安装与使用

- 前端

``` javascript
// 下载player
git clone https://github.com/Dmaziyo/MaZiYo_Player-originV-mm.git
// 下载依赖
yarn install
// 运行项目
yarn serve 或者 yarn run serve
```

- 后端

### 使用的是网易云Nodejs API

[网易云Node版API](https://binaryify.github.io/NeteaseCloudMusicApi)

```javascript
//下载网易云Node后端api
git clone --depth=1 https://github.com/Binaryify/NeteaseCloudMusicApi
//下载依赖
npm install
//运行
node app.js
```

## 项目目录结构

<details><summary>目录结构</summary><pre>maziyoplayer
├── babel.config.js
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html 															// 项目入口文件
├── src
│   ├── App.vue                                                             //根组件
│   ├── api                                                                 //封装好的api
│   │   └── index.js                                                        
│   ├── assets
│   │   ├── background                                                      //默认背景图片
│   │   │   └── bg_1.jpg                                                    
│   │   ├── img                                                             // 静态图片目录
│   │   │   ├── album_cover_player.png                                       
│   │   │   ├── default.png
│   │   │   ├── player_cover.png
│   │   │   └── wave.gif
│   │   └── logo.png
│   ├── base                                                                //基本组件
│   │   ├── mz-dialog
│   │   │   └── mz-dialog.vue                                               //对话框组件
│   │   ├── mz-icon
│   │   │   └── mz-icon.vue                                                 //图标组件
│   │   ├── mz-loading
│   │   │   └── mz-loading.vue                                              //加载组件
│   │   ├── mz-no-result
│   │   │   └── mz-no-result.vue                                            //提示无数据组件组件
│   │   ├── mz-progress
│   │   │   └── mz-progress.vue                                             //进度条组件
│   │   └── mz-toast
│   │       ├── index.js
│   │       └── mz-toast.vue                                                //消息通知组件
│   ├── components
│   │   ├── lyric
│   │   │   └── lyric.vue                                                   //歌词组件
│   │   ├── music-btn
│   │   │   └── music-btn.vue                                               //路由按钮组件
│   │   ├── music-list
│   │   │   └── music-list.vue                                              //歌曲list组件
│   │   ├── mz-header
│   │   │   └── mz-header.vue                                               //头部组件
│   │   └── volume
│   │       └── volume.vue                                                  //音量组件
│   ├── pages
│   │   ├── comment
│   │   │   └── comment.vue                                                 //评论页面
│   │   ├── details
│   │   │   └── details.vue                                                 //歌单详细页面
│   │   ├── historyList
│   │   │   └── historyList.vue                                             //历史歌曲记录页面
│   │   ├── playList                                                        
│   │   │   └── playList.vue                                                //正在播放列表页面
│   │   ├── search
│   │   │   └── search.vue                                                  //搜索页面
│   │   ├── topList
│   │   │   └── topList.vue                                                 //推荐歌单页面
│   │   └── userlist    
│   │       └── userlist.vue                                                //用户歌单页面
│   │   ├── music.vue                                                       // 整体页面的框架
│   │   ├── mzPlayer.js                                                     //对audio元素的绑定和初始化设置
│   ├── router
│   │   └── index.js                                                        //路由配置
│   ├── store                                                               //Vuex的配置
│   │   ├── actions.js
│   │   ├── getters.js
│   │   ├── index.js
│   │   ├── mutation-types.js
│   │   ├── mutations.js
│   │   └── state.js
│   ├── styles                                                              //公共样式资源
│   │   ├── index.less
│   │   ├── mixin.less
│   │   ├── reset.less
│   │   └── var.less
│   ├── utils                                                               
│   │   ├── axios.js                                                        //封装axios
│   │   ├── mixin.js                                                        //组件混合
│   │   ├── song.js                                                         //将获取的歌曲list格式化
│   │   ├── storage.js                                                      //配置localStorage
│   │   └── util.js                                                         //封装一些工具，例如格式化歌词
│   └── views
│   ├── config.js                                                           //默认属性值配置
│   ├── main.js                                                             //
├── tree.md
├── vue.config.js
└── yarn.lock
</pre></details>

## 功能

---

- 播放器功能
- 歌词滚动
- 排行榜
- 歌单推荐
- 搜索歌曲
- 播放历史
- 查看评论
- 获取用户歌单

页面展示

<details><summary>页面展示</summary><pre>
### 主页面
<img src="https://raw.githubusercontent.com/Dmaziyo/MaZiYo_Player-originV-mm/master/show_images/homepage.jpg"/>
### 推荐歌单
<img src="https://raw.githubusercontent.com/Dmaziyo/MaZiYo_Player-originV-mm/master/show_images/recommend.jpg"/>
### 评论区
<img src="https://raw.githubusercontent.com/Dmaziyo/MaZiYo_Player-originV-mm/master/show_images/comment.jpg"/>
### 历史记录
<img src="https://raw.githubusercontent.com/Dmaziyo/MaZiYo_Player-originV-mm/master/show_images/history.jpg"/>
### 我的歌单
<img src="https://raw.githubusercontent.com/Dmaziyo/MaZiYo_Player-originV-mm/master/show_images/mypage.jpg"/>
</pre></details>





