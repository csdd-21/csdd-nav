const express = require('express');
const models = require('./db');
var multer = require('multer');
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

// 临时上传
let upload = multer({ dest: 'tmp_uploads/' });
app.post("/upload", upload.single('file'), function (req, res, next) {
    let targetPath = req.file.path + "." + req.file.originalname.split(".")[1];

    fs.rename(path.join(process.cwd(), "/" + req.file.path), path.join(process.cwd(), targetPath), function (err) {
        if (err) {
            return res.sendResult(null, 400, "上传图片失败");
        }
        res.send({ status: 200, message: "上传图片成功", data: { url: targetPath } })
    })
    console.log('req.file ---',req.file,'upload url ---',targetPath);
});

// 确认提交
let upload_submit = multer({ dest: 'tmp_uploads/' });
app.post("/submit", upload.single('file'), function (req, res, next) {
    let targetPath = req.file.path + "." + req.file.originalname.split(".")[1];

    fs.rename(path.join(process.cwd(), "/" + req.file.path), path.join(process.cwd(), targetPath), function (err) {
        if (err) {
            return res.sendResult(null, 400, "上传图片失败");
        }
        res.send({ status: 200, message: "上传图片成功", data: { url: targetPath } })
    })
    console.log('req.file ---',req.file,'upload url ---',targetPath);
});

// 确认提交
// function copyFile(srcPath, tarPath, cb) {

//     var rs = fs.createReadStream(srcPath)
//     rs.on('error', function (err) {
//         if (err) {
//             console.log('read error', srcPath)
//         }
//         cb && cb(err)
//     })

//     var ws = fs.createWriteStream(tarPath)
//     ws.on('error', function (err) {
//         if (err) {
//             console.log('write error', tarPath)
//         }
//         cb && cb(err)
//     })

//     ws.on('close', function (ex) {
//         cb && cb(ex)
//     })

//     rs.pipe(ws)
//     console.log("复制文件完成", srcPath)
// }
// app.post('/submit', function (req, res) {
//     console.log('submit req ---- ', req.body,'submit res ----',res);
//     copyFile(req.body.url, 'C://Users//86138//Desktop//csdd-nav//src//assets//test_2//54444.png')
//     // express.static('C://Users//86138//Desktop//csdd-nav//src//assets//test_2//544444.png', req.query.url)
//     res.send()
// })

module.exports = app;
