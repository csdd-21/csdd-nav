const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/csdd-proj");
mongoose.connection.on('connected', function () {
  console.log("------ mongodb数据库成功！------");
});

const Menu = mongoose.model('Menu', new mongoose.Schema({
  flag: { type: Number, require: true },
  parent: { type: String, require: true },
  sequence: { type: Number, require: true },
  title: { type: String, require: true },
}))

const Websites_CN = mongoose.model('Websites_CN', new mongoose.Schema({
  parent: { type: String, require: true },
  flag: { type: Number, require: true },
  title: { type: String, require: true },
  sequence: { type: Number, require: true },
  icon: { type: String, require: true },
  description: { type: String, require: false },
  url: { type: String, require: true }
}))

const Websites_EN = mongoose.model('Websites_EN', new mongoose.Schema({
  parent: { type: String, require: true },
  flag: { type: Number, require: true },
  title: { type: String, require: true },
  sequence: { type: Number, require: true },
  icon: { type: String, require: true },
  description: { type: String, require: false },
  url: { type: String, require: true }
}))

const Models = {
  Menu: Menu,
  Websites_CN: Websites_CN,
  Websites_EN: Websites_EN,
};

// 新增数据
// Websites_CN.create({
//   language: 'en',
//   parent: '多语言测试CN-2222',
//   flag: 1,
//   title: 'JavaScript官网',
//   sequence: 9,
//   icon: 'img icon source',
//   description: '描述文字',
//   url: 'https://www.baidu.com'
// }, function (err, doc) {
//   if (!err) {
//     console.log(doc);
//   } else {
//     console.log(err);
//   }
// })

module.exports = Models;
