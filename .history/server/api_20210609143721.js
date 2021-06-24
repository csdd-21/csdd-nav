const express = require('express');
const models = require('./db');

const app = express();
app.get('/', function (req, res) {
    res.send('<h1>hello Nodejs</h1>')
})

app.get("/plugins", function (req, res) {
    let promise1 = new Promise((resolve, reject) => {
        models.Plugin
            .find({
                // title: req.query.title,
                // tag: { $in: req.query.tag },
            }).count().then((res) => {
                console.log('res 1 ----------', res);
                resolve(res)
            })
    })

    let promise2 = new Promise((resolve, reject) => {
        models.Plugin
        .find({
            // title: req.query.title,
            // tag: { $in: req.query.tag },
        })
        // .skip(Number((req.query.skip - 1) * req.query.limit))
        // .limit(Number(req.query.limit))
        .exec()
        .then((datas) => {
            console.log('res 2 ----------', datas);
            resolve(datas)

        })
    })

    Promise.all([promise1, promise2]).then((datas) => {
        console.log('datas ------------', datas);
        // res.json({ total: datas[0], datas: datas[1] })
    }).catch((err) => {
        console.log('err ------------', err);
        res.json('error reponse')
    });
    // console.log("req.query---------------------", req)
})

module.exports = app;
