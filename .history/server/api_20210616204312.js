const express = require('express');
const models = require('./db');
var multer  = require('multer');
var path = require("path");
var fs = require('fs');

const app = express();
app.get('/', function (req, res) {
    res.send('<h1>hello Nodejs</h1>')
})

app.get('/menu', function (req, res) {
    models.Menu.aggregate([
        { $sort: { "sequence": 1 } },
        {
            $group: {
                _id: "$parent",
                flag: { $first: '$flag' },
                children: {
                    $push: '$$ROOT'
                }
            }
        },
        { $sort: { "flag": 1 } },
    ], function (err, doc) {
        res.json(doc);
    })
})

app.get('/data/cn', function (req, res) {
    models.Websites_CN.aggregate([
        { $sort: { "sequence": 1 } },
        {
            $group: {
                _id: "$parent",
                flag: { $first: '$flag' },
                children: {
                    $push: '$$ROOT'
                }
            }
        },
        { $sort: { "flag": 1 } },
    ], function (err, doc) {
        res.json(doc);
    })
})

app.get('/data/en', function (req, res) {
    models.Websites_EN.aggregate([
        { $sort: { "sequence": 1 } },
        {
            $group: {
                _id: "$parent",
                flag: { $first: '$flag' },
                children: {
                    $push: '$$ROOT'
                }
            }
        },
        { $sort: { "flag": 1 } },
    ], function (err, doc) {
        res.json(doc);
    })
})

let upload = multer({ dest: 'tmp_uploads/' });
app.post("/upload", upload.single('file'), function (req, res, next) {
    console.log('upload req ----',JSON.parse(JSON.stringify(req.body)));
    let params = new Date().getMinutes()
    let ext = req.file.originalname.split(".")[1]
    let targetPath = path.join(process.cwd(), '../src/assets/test/' + params + '.' + ext)

    fs.rename(path.join(process.cwd(), "/" + req.file.path), targetPath, function (err, doc) {
        if (err) {
            console.log('file upload failed ---', err);
            return res.sendResult(null, 400, "上传文件失败");
        }
    })
    res.send({ status: 200, message: "上传图片成功", data: { url: targetPath } })
});

module.exports = app;
