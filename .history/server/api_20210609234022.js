const express = require('express');
const models = require('./db');

const app = express();
app.get('/', function (req, res) {
    res.send('<h1>hello Nodejs</h1>')
})

app.post("/plugins", function (req, res) {
    let promise1 = new Promise((resolve, reject) => {
        models.Plugin.aggregate([
            {
                $group: {
                    _id: "$title"
                }
            }
        ], function (err, res) {
            resolve(res)
        })
    })

    let promise2 = new Promise((resolve, reject) => {
        models.Plugin
            .countDocuments({
                // title: req.body.title,
                tag: { $in: req.body.checkTags },
            }).then((res) => {
                resolve(res)
            })
    })

    let promise3 = new Promise((resolve, reject) => {
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

    Promise.all([promise1, promise2, promise3]).then((datas) => {
        console.log('datas -------------------', datas);
        console.log('22222222222222222', req.body);
        res.json({ tags: datas[0], total: datas[1], datas: datas[2] })
    }).catch((err) => {
        console.log('22222222222222222', req.body);
        console.log('err -------------------', err);

        res.json('error reponse')
    });
})

module.exports = app;
