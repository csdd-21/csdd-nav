const express = require('express');
const models = require('./db');


var router = express.Router();
var multer  = require('multer');
var path = require("path");
var fs = require('fs');




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
    // console.log('req ------', req.body);
    let params = {}
    // 初始化
    if (!req.body.title && !req.body.checkTags) {
        console.log('1--------------------------------1');
        params = {}
    }
    // 选择标签
    if (!req.body.title && req.body.checkTags) {
        if (req.body.checkTags.length != 0) {
            console.log('1-------------------------------2');
            params = {
                tag: { $in: req.body.checkTags }
            }
        }
    }
    // 搜索值
    if (req.body.title && req.body.checkTags) {
        if (req.body.checkTags.length != 0) {
            console.log('1-------------------------------3');
            params = {
                title: { $regex: req.body.title },
                tag: { $in: req.body.checkTags }
            }
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



// 提供文件上传服务
var upload = multer({ dest: 'tmp_uploads/' });
var upload_config = require('config').get("upload_config");

app.post("/upload",upload.single('file'),function(req,res,next) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
	var fileExtArray = req.file.originalname.split(".");
	var ext = fileExtArray[fileExtArray.length - 1];
	var targetPath = req.file.path + "." + ext;
	fs.rename(path.join(process.cwd(),"/" + req.file.path),path.join(process.cwd(),targetPath),function(err){
		if(err) {
			return res.sendResult(null,400,"上传文件失败");
		}
		res.sendResult({"tmp_path":targetPath,"url":upload_config.get("baseURL") + "/" + targetPath},200,"上传成功");
	})
});






module.exports = app;
