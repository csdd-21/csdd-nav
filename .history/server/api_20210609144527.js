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
            }).count().then((res,err) => {
                console.log('11111 ----',res ,"11--",err);
                
                resolve(res)  
            })
    })

    let promise2 = new Promise((resolve, reject) => {
        models.Plugin
        .find({
            // title: req.query.title,
            tag: { $in: req.data.tag },
        })
        // .skip(Number((req.query.skip - 1) * req.query.limit))
        // .limit(Number(req.query.limit))
        .exec()
        .then((res,err) => {
            console.log('2222 ----',res ,"222--",err);
            resolve(res)
        }).catch(err=>{
            console.log('3333 ----',err);
        })
    })

    Promise.all([promise1, promise2]).then((datas) => {
        console.log('datas ------------', datas);
        // res.json({ total: datas[0], datas: datas[1] })
    }).catch((err) => {
        console.log('err 555555555------------', err);
        res.json('error reponse')
    });
    // console.log("req.query---------------------", req)
})

module.exports = app;