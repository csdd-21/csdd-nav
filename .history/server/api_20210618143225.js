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
                parent: { $first: '$parent' },
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
    console.log('upload req ---', req.body);
    let targetPath = req.file.path + "." + req.file.originalname.split(".")[1];

    fs.rename(path.join(process.cwd(), "/" + req.file.path), path.join(process.cwd(), targetPath), function (err) {
        if (err) {
            return res.sendResult(null, 400, "上传图片失败");
        }
        res.send({ status: 200, message: "上传图片成功", data: { url: targetPath } })
    })
    console.log('upload req.file ---', req.file, 'upload url ---', targetPath);
});

// 确认提交
let submit = multer({ dest: 'tmp_uploads/' });
app.post("/submit", upload.single('file'), function (req, res, next) {
    // 校验
    console.log('submit req ---', req.body);
    if (!req.body.title || + !req.body.url || !req.body.icon) {
        return res.send({ status: 412, message: "参数不能为空" })
    }
    // 提交图片
    let targetPath = '/favicon/' + req.body.title + '.' + req.body.icon.split('\\')[1].split('.')[1]
    fs.rename(path.join(process.cwd(), "/" + req.body.icon), path.join(process.cwd(), '../src/assets' + targetPath), function (err) {
        if (err) {
            console.log('submit err ---', err);
            return res.send({ status: 400, message: "提交图片失败", error: err })
        }
    })
    // 插入数据库
    models.Websites_CN({
        parent: req.body.parent,
        flag: req.body.flag,
        title: req.body.title,
        sequence: 1,
        url: req.body.url,
        icon: targetPath
    }).save((err, data) => {
        console.log('err --', err, 'data --', data);
        if (err) {
            res.send({ status: 401, message: '提交失败', error: err });
        } else {
            res.send({ status: 200, message: "提交成功", data: data })
        }
    });
});

// 编辑
app.post("/edit", function (req, res) {
    console.log('edit req ---', req.body);

    // console.log('edit 000000000000000-----------',req.body.icon.split('\\')[1].split('.')[1]);
    if (req.body.icon.split('/')){
        console.log('edit 000000000000000-----------',req.body.icon.split('/'));
    }else {
        console.log('edit 1111111111111111111111-----------',req.body.icon.split('/'));
    }

    // if (!req.body.title || + !req.body.url || !req.body.icon) {
    //     return res.send({ status: 412, message: "参数不能为空" })
    // }
    // // 提交图片
    // let targetPath = '/favicon/' + req.body.title + '.' + req.body.icon.split('\\')[1].split('.')[1]
    // fs.rename(path.join(process.cwd(), "/" + req.body.icon), path.join(process.cwd(), '../src/assets' + targetPath), function (err) {
    //     if (err) {
    //         console.log('edit err ---', err);
    //         return res.send({ status: 400, message: "提交图片失败", error: err })
    //     }
    // })

    // let params = {}
    // Object.keys(req.body).forEach((i) => {
    //     params[i] = req.body[i] || "";
    // });
    // params.icon = targetPath
    // models.Websites_CN
    //     .updateOne({
    //         _id: req.body._id
    //     }, params, function (err, data) {
    //         console.log("edit req ---", req.body, 'edit err ---', err, 'edit data ---', data);
    //         if (err) {
    //             res.send({ 'status': 401, 'message': '编辑失败', 'error': err });
    //         } else {
    //             res.send({ 'status': 200, 'message': '编辑成功' });
    //         }
    //     })
})

// 删除
app.post("/delete", function (req, res) {
    models.Websites_CN
        .deleteOne({
            _id: req.body._id
        }).then(data => {
            console.log('delete res ---', data);
            if (data.ok == 0) {
                res.send({ 'status': 401, 'message': '删除失败', 'error': err });
            } else {
                res.send({ 'status': 200, 'message': '删除成功' });
            }
        })
})
module.exports = app;
