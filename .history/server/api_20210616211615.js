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



var upload = multer({ dest: 'tmp_uploads/' });
// var upload_config = require('config').get("upload_config");
// 提供文件上传服务
app.post("/upload",upload.single('file'),function(req,res,next) {
	var fileExtArray = req.file.originalname.split(".");
	var ext = fileExtArray[fileExtArray.length - 1];
	var targetPath = req.file.path + "." + ext;
    console.log('req.file ---',req.file);
    
	fs.rename(path.join(process.cwd(),"/" + req.file.path),'../src/assets/test/000000.png',function(err){
		if(err) {
			return res.sendResult(null,400,"上传文件失败");
		}
		// res.sendResult({"tmp_path":targetPath,"url":upload_config.get("baseURL") + "/" + targetPath},200,"上传成功");
	})
});





// 临时上传
// let upload = multer({ dest: 'tmp_uploads/' });
// app.post("/upload", upload.single('file'), function (req, res, next) {
//     console.log('upload req ----', JSON.parse(JSON.stringify(req.body)));
//     let params = new Date().getMinutes()
//     let ext = req.file.originalname.split(".")[1]
//     let targetPath = path.join(process.cwd(), '../src/assets/test/' + params + '.' + ext)

//     fs.rename(path.join(process.cwd(), "/" + req.file.path), path.join(process.cwd(), "/" + req.file.path), function (err, doc) {
//         if (err) {
//             console.log('file upload failed ---', err);
//             return res.sendResult(null, 400, "上传文件失败");
//         }
//     })
//     res.send({ status: 200, message: "上传图片成功", data: { url: targetPath } })
// });

// 确认提交
// function copyFile(srcPath, tarPath, cb) {

//     var rs = fs.createReadStream(srcPath)
//     rs.on('error', function (err) {
//         if (err) {
//             console.log('read error', srcPath)
//         }
//         cb && cb(err)
//     })

//     var ws = fs.createWriteStream(tarPath)
//     ws.on('error', function (err) {
//         if (err) {
//             console.log('write error', tarPath)
//         }
//         cb && cb(err)
//     })

//     ws.on('close', function (ex) {
//         cb && cb(ex)
//     })

//     rs.pipe(ws)
//     console.log("复制文件完成", srcPath)
// }
// app.post('/submit', function (req, res) {
//     console.log('submit req ---- ', req.body,'submit res ----',res);
//     copyFile(req.body.url, 'C://Users//86138//Desktop//csdd-nav//src//assets//test_2//54444.png')
//     // express.static('C://Users//86138//Desktop//csdd-nav//src//assets//test_2//544444.png', req.query.url)
//     res.send()
// })

module.exports = app;
