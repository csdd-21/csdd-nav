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
    ], function (err, data) {
        console.log('/menu err ---', err, '/menu data ---', data);
        if (err) {
            res.send({ status: 401, message: '查询失败', error: err });
        } else {
            res.send({ status: 200, message: "查询成功", data: data })
        }
    })
})

app.get('/websites', function (req, res) {
    // 局部刷新
    if (req.query.type == 'partGet') {
        models.Website.find({ flag: req.query.flag, parent: req.query.parent, })
            .then((data) => {
                console.log('/websites partGet data ---', data)
                let resData = {
                    _id: req.query.parent,
                    flag: req.query.flag,
                    parent: req.query.parent,
                    children: data
                }
                res.send({ status: 200, message: "查询成功", data: resData })
            })
        return
    }

    // 初始化
    if (req.query.type == 'allGet') {
        models.Website.aggregate([
            // { $sort: { "sequence": 1 } },
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
        ], function (err, data) {
            console.log('/websites allGet err ---', err, '/websites allGet data ---', data);
            if (err) {
                res.send({ status: 401, message: '查询失败', error: err });
            } else {
                res.send({ status: 200, message: "查询成功", data: data })
            }
        })
        return
    }
})

// 临时上传
let upload = multer({ dest: 'tmp_uploads/' });
app.post("/upload", upload.single('file'), function (req, res, next) {
    console.log('/upload req ---', req.body);
    let targetPath = req.file.path + "." + req.file.originalname.split(".")[1];

    fs.rename(path.join(process.cwd(), "/" + req.file.path), path.join(process.cwd(), targetPath), function (err) {
        if (err) {
            return res.sendResult(null, 400, "上传图片失败");
        }
        res.send({ status: 200, message: "上传图片成功", data: { url: targetPath } })
    })
    console.log('/upload req ---', req.file, '/upload url ---', targetPath);
});

// 确认提交
app.post("/submit", upload.single('file'), function (req, res, next) {
    // 校验
    console.log('/submit req ---', req.body);
    if (!req.body.title_cn || + !req.body.url || !req.body.iconPath) {
        return res.send({ status: 412, message: "参数不能为空" })
    }

    // 提交图片
    let targetPath = '/favicon/' + req.body.title_cn.replace(/\s/g, "") + '_' + Date.now() + '.' + req.body.iconPath.split('\\')[1].split('.')[1]
    fs.renameSync(path.join(process.cwd(), "/" + req.body.iconPath), path.join(process.cwd(), targetPath))

    // 插入数据库
    models.Website({
        parent: req.body.parent,
        flag: req.body.flag,
        title_cn: req.body.title_cn,
        title_en: req.body.title_en,
        sequence: 1,
        url: req.body.url,
        iconPath: targetPath
    }).save((err, data) => {
        console.log('/submit err ---', err, '/submit data ---', data);
        if (err) {
            res.send({ status: 401, message: '提交失败', error: err });
        } else {
            res.send({ status: 200, message: "提交成功", data: data })
        }
    });
});

// 编辑
app.post("/edit", function (req, res) {
    console.log('/edit req ---', req.body);
    if (!req.body.title_cn || + !req.body.url || !req.body.iconPath) {
        return res.send({ status: 412, message: "参数不能为空" })
    }
    let params = {}
    Object.keys(req.body).forEach((i) => {
        params[i] = req.body[i] || "";
    });

    // 替换图片
    if (req.body.iconPath.split('\\')[0] == 'tmp_uploads') {
        let targetPath = '/favicon/' + req.body.title_cn.replace(/\s/g, "") + '_' + Date.now() + '.' + req.body.iconPath.split('\\')[1].split('.')[1]
        fs.renameSync(path.join(process.cwd(), "/" + req.body.iconPath), path.join(process.cwd(), targetPath))
        params.iconPath = targetPath
        fs.unlinkSync(path.join(process.cwd(), req.body.old_iconPath))
    }

    // 插入数据库
    models.Website
        .updateOne({
            _id: req.body._id
        }, params, function (err, data) {
            console.log("/edit req ---", req.body, '/edit err ---', err, '/edit data ---', data);
            if (err) {
                res.send({ 'status': 401, 'message': '编辑失败', 'error': err });
            } else {
                res.send({ 'status': 200, 'message': '编辑成功' });
            }
        })
})

// 删除
app.post("/delete", function (req, res) {
    fs.unlinkSync(path.join(process.cwd(), req.body.iconPath))
    console.log('path.join(process.cwd(), req.body.iconPath)', path.join(process.cwd(), req.body.iconPath))
    models.Website
        .deleteOne({
            _id: req.body._id
        }, function (err, data) {
            console.log("/delete req ---", req.body, '/delete err ---', err, '/delete data ---', data);
            if (err) {
                res.send({ 'status': 401, 'message': '删除失败', 'error': err });
            } else {
                res.send({ 'status': 200, 'message': '删除成功' });
            }
        })
})
module.exports = app;