# csdd-nav

**A collection of common and useful websites for Front-end Engineer 前端工程师常用网站集合**

## 写在最前

作为一名合格的前端工程师，除了不断提升自己代码水平，如何通过开源工具来提高效率也是一个相当重要的技能，随着不断的工作和学习，收藏的网址、工具也越来越多，浏览器的收藏夹也快爆满以及不好检索了，这就有了这个项目最初的雏形，做一个前端工作、学习时常用的网站导航合集

预览点这：[http://39.108.224.26:1002/](http://39.108.224.26:1002/)，如果服务器挂了，可以看下面的功能演示gif图（所有gif图片文件在README.assets文件夹里），项目还在持续更新中，本README.md文档只是最初版本，中途并不会每次更新，所以一切以[http://39.108.224.26:1002/](http://39.108.224.26:1002/)的实际效果为准

## 快速启动

```
# csdd-nav 根路径
npm i 
npm run serve
# server 文件夹 （记得先启用mongodb）
npm i 
nodemon index.js
```

## 前端技术栈

- vue3
- vue-router
- vuex
- axios
- element-plus
- bootstrap
- less

## 后端技术栈

- node
- express
- mongodb

## 目录结构说明

```
.
├─ README.assets                   项目演示图片资源
│    ├─ 1.gif
│    ├─ 2.gif
│    ├─ 3.gif
│    └─ 4.gif
├─ README.md
├─ package.json                    配置、依赖管理
├─ server
│    ├─ api.js                     服务器请求接口封装
│    ├─ db.js                      mongodb数据库封装
│    ├─ index.js                   服务器入口文件
│    ├─ tmp_uploads                上传图片临时存储文件夹
│    ├─ menus.csv                  （可导入mongodb使用）
│    └─ websites_cns.csv           （可导入mongodb使用）
├─ src
│    ├─ App.vue
│    ├─ assets
│    │    ├─ allCss                views、components文件夹下的各个vue单文件对应的less样式
│    │    │    ├─ Add.less
│    │    │    ├─ App.less
│    │    │    ├─ Home.less
│    │    │    ├─ More.less
│    │    │    ├─ Theme.less
│    │    │    └─ Websites.less
│    │    ├─ favicon
│    │    │    └─ ...              上传图片成功且提交后，文件会保存在该文件夹
│    │    └─ iconfont
│    │           └─ ...
│    ├─ components                 子组件文件夹
│    │    ├─ Add.vue
│    │    ├─ More.vue
│    │    └─ Theme.vue
│    ├─ main.js
│    ├─ router
│    │    └─ index.js
│    ├─ store
│    │    └─ index.js
│    └─ views                      页面文件夹
│           ├─ Githubs.vue
│           ├─ Home.vue
│           ├─ Studies.vue
│           ├─ Test.vue
│           ├─ Tests.vue
│           └─ Websites.vue
└─ vue.config.js                   跨域、打包等配置
```

## 功能演示

- #### 页面展示、更换主题

![1](README.assets/1.gif)

- #### 新增

![2](README.assets/2.gif)

- #### 修改

![3](README.assets/3.gif)

- #### 删除

![4](README.assets/4.gif)

## 后续功能

开发过程中就想着要不做得功能更全面一点，一个综合性网站，针对于前端工程师的，常用网站导航合集、开发常用的插件/工具/软件推荐、前端学习路径、前端面试题合集..目前只开发了前面两个页面，后面暂时没有灵感~，下面是后续会跟进的功能：

- [ ] “网站导航合集”拖拽排序

- [ ] 开发“前端学习路径”页面
- [ ] 开发“前端面试合集”页面
