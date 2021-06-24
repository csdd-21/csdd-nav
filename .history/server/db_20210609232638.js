const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/csdd-proj",{useNewUrlParser:true});
mongoose.connection.on('connected', function () {
  console.log("------ mongodb数据库成功！------");
});

const Plugin = mongoose.model('Plugin', new mongoose.Schema({
  title: { type: String, require: true },
  tag: { type: String, require: true },
  abstracts: { type: String, require: true },
  url: { type: String, require: true },
  imgUrl: { type: String, require: false }
}))

// 新增数据
// Plugin.create({
//   title: 'plugin_test_1',
//   tags: 'vscode_test',
//   abstracts: "aaaaaaa",
//   url:"https:www.baidu.com",
//   imgUrl: ""
// }, function (err, doc) {
//   if (!err) { } else { }
// })

const Models = {
  Plugin
};
module.exports = Models;
