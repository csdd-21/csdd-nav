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
                // title: req.query.title,
                // tag: { $in: req.query.tags },
            }).count().then((res) => {  
                resolve(res)  
            })
    })

    let promise2 = new Promise((resolve, reject) => {
        models.Plugin
        .find({
            // title: req.query.title,
            tag: { $in: "vscode" },
        })
        .skip(Number((req.query.page.skip - 1) * req.query.page.limit))
        .limit(Number(req.query.page.limit))
        .exec()
        .then((res) => {
            resolve(res)
        })
    })

    Promise.all([promise1, promise2]).then((datas) => {
        console.log('datas -------------------', datas);
        console.log('111111111111111111',req.body);
        res.json({ total: datas[0], datas: datas[1]})
    }).catch((err) => {
        console.log('err -------------------', err);
        
        res.json('error reponse')
    });
    // console.log("req.query---------------------", req.query)
    
})

module.exports = app;
