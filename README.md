# TRTC Demo

用 vite 起的 Vue3 项目，引入了 TUIRoom 组件，简单尝试了下腾讯的视频会议组件；

## script

```bash
# 安装依赖
npm install

# 如果报 peerDependencies 错误，是由于高版本的 npm 依赖检查，可用下面的命令安装依赖
npm install --legacy-peer-deps

# 开发环境
npm run dev
```

## tips

- 开发环境初次运行时，因 TUIRoom 按需引入 element-plus 组件，路由页面第一次加载时反应较慢，等待 element-plus 按需加载完成即可正常使用；
- 首页表单中，填入自己 TRTC 应用的 sdkAppId 和 SecretKey，本地跑一下，试试组件 API 可以这么整，生产环境不能这么弄，另外保护好自己的密钥；
- userId 随便填，填完后，点击「创建房间」按钮，创建成功后，会跳转到 room 页；有时会失败，组件的 API 还没摸熟，一些异常也没处理，可以尝试多刷新下页面；
- 创建房间后，可以生成邀请链接，可以开个无痕窗口，访问这个链接，填入一个不同的userId，点击「进入房间」，该房间中就同时有两人了；
