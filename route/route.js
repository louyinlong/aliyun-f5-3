const express = require("express");
const bodyParser = require("body-parser");
const ctrlCenter = require("../control/ctrlCenter");
const router = express.Router();
router.use(bodyParser.json());//将数据转换成json
router.use(bodyParser.urlencoded({ extended: false })); //配置post的body模块

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});

//控制LED
router.get("/device", ctrlCenter.device);
router.put("/device", ctrlCenter.update);
//控制风扇
router.get("/fs", ctrlCenter.fs);
router.put("/fs", ctrlCenter.fsupdate);
//控制空调
router.get("/device5", ctrlCenter.device5);
router.put("/device5", ctrlCenter.acupdate);
//阿里云
router.put("/led/:id/:status", ctrlCenter.led);
router.put("/ws/:id/:value", ctrlCenter.wd);
router.put("/sd/:id/:value", ctrlCenter.sd);
router.put("/fs/:id/:status", ctrlCenter.fs);
router.put("/ac/:id/:status", ctrlCenter.ac);
//登录验证
router.post('/dls', ctrlCenter.DLS);
//设备查询
router.get('/cpusers', ctrlCenter.USER);
router.get('/cpusers/:cpid', ctrlCenter.USERID);
//用户查询
router.get('/users', ctrlCenter.dev);
router.get('/users/:id', ctrlCenter.devid);
//添加
router.post('/cpusers', ctrlCenter.userAdd);
router.post('/users', ctrlCenter.devAdd);
//修改
router.put('/cpusers', ctrlCenter.userUpadte);
router.put('/users', ctrlCenter.devUpdate);
//删除
router.delete('/cpusers/:cpid', ctrlCenter.userDelete);
router.delete('/users/:id', ctrlCenter.devDelete);

module.exports = router;