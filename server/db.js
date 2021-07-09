const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/csdd-proj");
mongoose.connection.on('connected', function () {
  console.log("--- mongodb数据库成功 ---");
});

const Menu = mongoose.model('Menu', new mongoose.Schema({
  flag: { type: Number, require: true },
  parent: { type: String, require: true },
  sequence: { type: Number, require: true },
  title: { type: String, require: true },
}))

const Website = mongoose.model('Website', new mongoose.Schema({
  parent: { type: String, require: true },
  flag: { type: Number, require: true },
  title_cn: { type: String, require: true },
  title_en: { type: String, require: false },
  sequence: { type: Number, require: true },
  iconPath: { type: String, require: true },
  url: { type: String, require: true }
}))

const Models = {
  Menu,
  Website,
};

module.exports = Models;
