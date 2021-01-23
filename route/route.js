const express = require("express");
const bodyParser = require("body-parser");
const ctrlCenter = require("../control/ctrlCenter");
const ctrlali = require("../control/ctrl-ali");
const device = require("../control/device");
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


router.get("/light", device.getYali);
router.get("/led", device.getled);
router.get("/deng", device.getdeng);
router.put('light/:id/:light111', device.sendlight111);
router.put('/led/:id/:led', device.sendled);
router.put('/deng/:id/:deng', device.senddeng);
//阿里云
router.post('/aliadd', ctrlali.add);
router.delete('/alidelete/:proKey', ctrlali.delete);
router.put('/aliupdate', ctrlali.update);
router.get('/alisearch/:proKey', ctrlali.search);
router.get('/ali', ctrlali.searchall);
router.put("/ws/:id/:value", ctrlCenter.wd);
router.put("/sd/:id/:value", ctrlCenter.sd);
router.get("/sd/:id", ctrlCenter.getsd);
//登录验证
router.post('/dls', ctrlCenter.DLS);
router.post('/dls2', ctrlCenter.DLS2);
//设备查询
router.get('/cpusers', ctrlCenter.USER);
router.get('/cpusers/:id', ctrlCenter.USERID);
//用户查询
router.get('/users', ctrlCenter.dev);
router.get('/users/:userID', ctrlCenter.devid);
//添加
router.post('/cpusers', ctrlCenter.userAdd);
router.post('/users', ctrlCenter.devAdd);
//修改
router.put('/cpusers', ctrlCenter.userUpadte);
router.put('/users', ctrlCenter.devUpdate);
//删除
router.delete('/cpusers/:id', ctrlCenter.userDelete);
router.delete('/users/:userID', ctrlCenter.devDelete);

router.put('/light/:id/:light111', device.sendlight111);
router.put('/led/:id/:led', device.sendled);

module.exports = router;