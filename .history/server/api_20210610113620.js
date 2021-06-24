const express = require('express');
const models = require('./db');

const app = express();
app.get('/', function (req, res) {
    res.send('<h1>hello Nodejs</h1>')
})

app.post("/tags", function (req, res) {
    models.Plugin.aggregate([
        {
            $group: {
                _id: "$tag"
            }
        }
    ], function (err, datas) {
        res.json({ tags: datas })
    })
})

app.post("/plugins", function (req, res) {
console.log('req ------',req.body);

    let params = {}
    // 所有条件都为空，即初始化的时候
    if (!req.body.title && !req.body.checkTags) {
        console.log('1------1');
        params = {}
    }
    console.log('req.body.checkTag',req.body.checkTag);
    
    // title为空，checkTags有值----选择标签
    if (!req.body.title && req.body.checkTag) {
        console.log('1-------2');
        params = {
            tag: { $in: req.body.checkTags }
        }
        if (req.body.checkTags.length != 0) {
           
        }

    }
    // title不为空，checkTags有值  ------输入值搜索
    if (req.body.title && req.body.checkTags) {
        console.log('1-------3');
        params = {
            title: req.body.title,
            tag: { $in: req.body.checkTags },
        }
        if (req.body.checkTags.length != 0) {
           
        }
    }








    let promise1 = new Promise((resolve, reject) => {
        models.Plugin
            .countDocuments(params).then((res) => {
                resolve(res)
            })
    })
    let promise2 = new Promise((resolve, reject) => {
        models.Plugin
            .find(params)
            .skip(Number((req.body.page.skip - 1) * req.body.page.limit))
            .limit(Number(req.body.page.limit))
            .exec()
            .then((res) => {
                resolve(res)
            })
    })
    Promise.all([promise1, promise2]).then((datas) => {
        console.log('res -----', { total: datas[0], datas: datas[1] });
        res.json({ total: datas[0], datas: datas[1] })
    }).catch((err) => { console.log('err') })

})

module.exports = app;
