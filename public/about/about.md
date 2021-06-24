#### **写在最前**

项目初衷为在前端的学习和工作中，总是会遇到不错的插件、项目demo，当然可以用github自带的收藏功能、或者自己下载到本地保存，尴尬的是，这些文件最后总是难逃一进收藏夹就等着吃灰的命运，所以就有了这个项目最初的开发原因，每次发现不错的demo，像发布文章一样发布到网页上，也供日后方便查找、阅读

#### **快速启动**

```
# csdd-plugin根路径
npm i 
npm run dev
# server文件夹
node index.js
```

#### **前端技术栈**

- vue3
- vue-router
- vuex
- axios
- element-plus
- bootstrap
- markdown-it

#### **后端技术栈**

- node
- express
- mongodb

#### **待实现功能**

[ √ ]  标签查询支持多选

[ √ ]  vue2重构为vue3

[ √ ]  移动端适配

[    ]  发布新文章POST页面开发

[    ]  新发布文章推送NEW页面开发

[    ]  线上服务器部署

#### **目录结构说明**

```
.
├─ package.json                    配置、依赖管理
├─ public
│    ├─ .gitkeep
│    ├─ About.md
│    ├─ about
│    │    └─ about.md
│    ├─ favicon.ico
│    └─ index.html
├─ server
│    ├─ api.js                     服务器请求接口封装
│    ├─ db.js                      mongodb数据库封装
│    └─ index.js                   服务器入口文件
├─ src
│    ├─ App.vue
│    ├─ assets
│    │    ├─ allCss                views、components文件夹下的各个vue单文件对应的less样式
│    │    │    ├─ About.less
│    │    │    ├─ App.less
│    │    │    ├─ FilterCond.less
│    │    │    ├─ Home.less
│    │    │    ├─ NotFound.less
│    │    │    └─ Tags.less
│    │    └─ iconfont
│    │           └─ ...
│    ├─ components                 子组件文件夹
│    │    ├─ FilterCond.vue
│    │    ├─ NotFound.vue
│    │    └─ Tags.vue
│    ├─ main.js
│    ├─ router
│    │    └─ index.js
│    ├─ store
│    │    ├─ actions.js
│    │    ├─ getters.js
│    │    ├─ index.js
│    │    └─ mutations.js
│    └─ views                      页面文件夹
│           ├─ About.vue
│           └─ Home.vue
└─ vue.config.js
```

#### **碎碎念**

原本是想做成点击按钮跳转到介绍页面，后来想想，对于官网而言，再多余的解释都是苍白无力的，毕竟再详细的介绍都比不上看官网来得直接、确切，所以就只保留对其进行简单说明介绍与跳转至官网的按钮，这样也让自己养成阅读官方的好习惯

另外，打个广告，还有一些个人开发的小demo，欢迎阅览、交流~~

