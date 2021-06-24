const express = require('express');
const models = require('./db');

const app = express();
app.get('/', function (req, res) {
    res.send('<h1>hello Nodejs</h1>')
})

app.post("/plugins", function (req, res) {
    let promise1 = new Promise((resolve, reject) => {
        models.Plugin
            .find({
                // title: req.body.title,
                // tag: { $in: req.body.tags },
            }).count().then((res) => {
                resolve(res)
            })
    })

    let promise2 = new Promise((resolve, reject) => {
        models.Plugin
            .find({
                // title: req.body.title,
                tag: { $in: "vscode" },
            })
            .skip(Number((req.body.page.skip - 1) * req.body.page.limit))
            .limit(Number(req.body.page.limit))
            .exec()
            .then((res) => {
                resolve(res)
            })
    })

    Promise.all([promise1, promise2]).then((datas) => {
        console.log('datas -------------------', datas);
        console.log('22222222222222222', req.body);
        res.json({ total: datas[0], datas: datas[1] })
    }).catch((err) => {
        console.log('err -------------------', err);

        res.json('error reponse')
    });
})

module.exports = app;
