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
    function getDatas() {
        let promise1 = new Promise((resolve, reject) => {
            models.Plugin
                .countDocuments({
                    // title: req.body.title,
                    tag: { $in: req.body.checkTags },
                }).then((res) => {
                    resolve(res)
                })
        })

        let promise2 = new Promise((resolve, reject) => {
            models.Plugin
                .find({
                    // title: req.body.title,
                    tag: { $in: req.body.checkTags },
                })
                .skip(Number((req.body.page.skip - 1) * req.body.page.limit))
                .limit(Number(req.body.page.limit))
                .exec()
                .then((res) => {
                    resolve(res)
                })
        })

        Promise.all([promise1, promise2]).then((datas) => {
            return { total: datas[0], datas: datas[1] }
        }).catch((err) => {
            return err
        });
    }
    // 所有条件都为空，即初始化的时候
    if (!req.body.title && req.body.checkTags.length == 0) {
        let params = {}
        console.log('1------1');
        
    }
    // title为空，checkTags有值
    if (!req.body.title && req.body.checkTags.length != 0) {
        let params = {
            tag: { $in: req.body.checkTags }
        }
        console.log('1------2');
    }
    // title不为空，checkTags
    if (req.body.title && req.body.checkTags.length != 0) {
        let params = {
            title: req.body.title,
            tag: { $in: req.body.checkTags },
        }
        console.log('1------3');
    }

})

module.exports = app;
