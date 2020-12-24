const device = require('./ctrl-l');
const device2 = require('./ctrl-t');
const device3 = require('./ctrl-s');
const device4 = require('./ctrl-fs');
const device5 = require('./ctrl-ac')
const mysqlModule = require('mysql');
const deasync = require('deasync');

module.exports = {
    //LED
    device(req, resp) {
        const status = device.getLightStatus();
        console.log(status);
        resp.end(JSON.stringify(status));
    },
    update(req, resp) {

        const result = {
            succ: true,
            msg: '', data: {

            }
        };

        result.data = { status: req.body.status };
        device.setLightStatus(req.body.status);


        resp.end(JSON.stringify(result));

    },
    led(req, resp) {
        const id = req.params['id'];
        const status = req.params['status'];

        // 上报设备属性
        device.device.postProps({
            LightStatus: Number(status)
        }, (res) => {
            console.log(res);
        });

        // 打印id和状态 
        console.log(id);
        console.log(status);

        // 创建应答对象 
        const obj = {
            id: id,
            success: true,
            // 是否成功 
            status: true,
            status: device.getLightStatus()
            // 将云服务器的设备状态放入status字段里 
        };
        // 发送给PT 
        resp.write(JSON.stringify(obj));
        // 结束应答 
        resp.end();
    },
    //温湿度
    wd(req, resp) {
        const id = req.params['id'];
        const value = req.params['value'];
        // 上报设备属性
        device2.device2.postProps({
            CurrentTemperature: Number(value),
        }, (res) => {
            console.log(res);
        });
        // 打印id和状态 
        console.log(id);
        console.log(value);
        // 创建应答对象 
        const obj = {
            id: id,
            success: true,
            // 是否成功 
            value: value
            // 将云服务器的设备状态放入status字段里 
        };
        // 发送给PT 
        resp.write(JSON.stringify(obj));
        // 结束应答 
        resp.end();
    },
    sd(req, resp) {
        const id = req.params['id'];
        const value = req.params['value'];

        // 上报设备属性
        device3.device3.postProps({
            CurrentHumidity: Number(value),
        }, (res) => {
            console.log(res);
        });

        // 打印id和状态 
        console.log(id);
        console.log(value);

        // 创建应答对象 
        const obj = {
            id: id,
            success: true,
            // 是否成功 
            value: value
            // 将云服务器的设备状态放入status字段里 
        };
        // 发送给PT 
        resp.write(JSON.stringify(obj));
        // 结束应答 
        resp.end();
    },
    //风扇
    device4(req, resp) {
        const status = device4.getWindSpeed();
        console.log(status);
        resp.end(JSON.stringify(status));
    },
    fsupdate(req, resp) {

        const result = {
            succ: true,
            msg: '', data: {

            }
        };

        result.data = { status: req.body.status }
        device4.setWindSpeed(req.body.status);
        device4.setPowerSwitch(req.body.status);

        resp.end(JSON.stringify(result));

    },
    fs(req, resp) {
        const id = req.params['id'];
        var status = req.params['status'];
        // 上报设备属性
        device4.device4.postProps({
            WindSpeed: Number(status)
        }, (res) => {
            console.log(res);
        });
        // 打印id和状态 
        console.log(id);
        console.log(status);
        // 创建应答对象 
        const obj = {
            id: id,
            success: true,
            // 是否成功 
            status: device4.getWindSpeed(),
            // 将云服务器的设备状态放入status字段里 
        };
        // 发送给PT 
        resp.write(JSON.stringify(obj));
        // 结束应答 
        resp.end();
    },
    //空调
    device5(req, resp) {
        const status = device5.getPowerSwitch();
        console.log(status);
        resp.end(JSON.stringify(status));
    },
    acupdate(req, resp) {

        const result = {
            succ: true,
            msg: '', data: {

            }
        };

        result.data = { status: req.body.status };
        device5.setPowerSwitch(req.body.status);

        resp.end(JSON.stringify(result));

    },
    ac(req, resp) {
        const id = req.params['id'];
        const status = req.params['status'];

        // 上报设备属性
        device5.device5.postProps({
            PowerSwitch: Number(status)
        }, (res) => {
            console.log(res);
        });
        // 打印id和状态 
        console.log(id);
        console.log(status);
        // 创建应答对象 
        const obj = {
            id: id,
            success: true,
            // 是否成功 
            status: true,
            status: device5.getPowerSwitch()
            // 将云服务器的设备状态放入status字段里 
        };
        // 发送给PT 
        resp.write(JSON.stringify(obj));
        // 结束应答 
        resp.end();
    },

    //验证用户名密码
    DLS(req, resp) {    //req表示请求，resp表示应答
        let userName = req.body.userName;
        let password = req.body.password;
        console.log(userName, password);

        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-2"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        db.query("SELECT * FROM user WHERE userName = ? AND password = ? ", [userName, password], function (err, data) {
            console.log(data);
            for (let aa of data) {
                if (aa.userName === req.body.userName && aa.password === req.body.password) {
                    resp.send({ succ: true });
                    resp.end();
                } else {
                    resp.send("查询失败");
                    resp.end();
                }
            }
        });
        db.end();
    },
    //查询所有设备
    USER(req, resp) {
        var aa = [];
        var l = [];

        function selectl() {
            var sync1 = true;
            l.splice(0, l.length);
            db.query("SELECT * FROM product", function (err, data) {
                if (err) console.log("err")
                for (let aa of data) {
                    l.push({
                        'cpid': aa.cpid,
                        'cpName': aa.cpName,
                        'cpprice': aa.cpprice
                    });
                    sync1 = false;
                };
            });
            while (sync1) { deasync.sleep(400); }
            return l;
        }//获取亮度表数据
        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-2"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        l = selectl();
        let sz = [];
        for (let aa of l) {
            sz.push({
                'cpid': aa.cpid,
                'cpName': aa.cpName,
                'cpprice': aa.cpprice
            });
        }
        console.log(sz);
        resp.send(sz);
        // connect.end();
        resp.end();
        db.end();
    },
    //查询单个设备
    USERID(req, resp) {
        var aa = [];
        var l = [];
        var querystring = require('querystring');
        var result = querystring.parse(req.params.cpid, '&');
        console.log(result);
        let cpid = result.cpid;
        let cpName = result.cpName;
        let cpprice = result.cpprice;
        console.log(cpid, cpName, cpprice);

        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-2"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        function selectid() {
            var sync1 = true;
            l.splice(0, l.length);
            db.query("SELECT * FROM product WHERE cpid=?", [cpid, cpName, cpprice], function (err, data) {
                if (data.length > 0) {
                    for (let aa of data) {
                        l.push({
                            'cpid': aa.cpid,
                            'cpName': aa.cpName,
                            'cpprice': aa.cpprice
                        });
                        sync1 = false;
                    }
                } else {
                    resp.send("查询失败");
                    resp.end();
                }
            });
            while (sync1) { deasync.sleep(10); }
            return l;
        }
        l = selectid();
        let sz = [];
        for (let aa of l) {
            sz.push({
                'cpid': aa.cpid,
                'cpName': aa.cpName,
                'cpprice': aa.cpprice
            });
        }
        resp.send(sz);
        // connect.end();
        db.end();
        resp.end();

    },
    //查询所有用户
    dev(req, resp) {
        var aa = [];
        var l = [];

        function selectl() {
            var sync1 = true;
            l.splice(0, l.length);
            db.query("SELECT * FROM user", function (err, data) {
                if (err) console.log(err)
                console.log(data);
                for (let aa of data) {
                    // console.log(aa);
                    l.push({
                        'id': aa.id,
                        'userName': aa.userName,
                        'password': aa.password,
                        'userRole': aa.userRole
                    });
                    sync1 = false;
                };
                console.log(l);
            });
            while (sync1) { deasync.sleep(10); }
            return l;
        }//获取亮度表数据
        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-2"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        l = selectl();
        let sz = [];
        // console.log(l);
        for (let aa of l) {
            // console.log('aaa');

            sz.push({
                'id': aa.id,
                'userName': aa.userName,
                'password': aa.password,
                'userRole': aa.userRole
            });
        }
        console.log(sz);
        resp.send(sz);
        // connect.end();
        resp.end();
        db.end();
    },
    //查询单个用户
    devid(req, resp) {
        var aa = [];
        var l = [];
        var querystring = require('querystring');
        var result = querystring.parse(req.params.id, '&');
        console.log(result)
        let id = result.id;
        let userName = result.userName;
        let password = result.password;
        let userRole = result.userRole;
        console.log(id, userName, password, userRole);

        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-2"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        function selectid() {
            var sync1 = true;
            l.splice(0, l.length);
            db.query("SELECT * FROM user WHERE id=?", [id, userName, password, userRole], function (err, data) {
                if (data.length > 0) {
                    for (let aa of data) {
                        l.push({
                            'id': aa.id,
                            'userName': aa.userName,
                            'password': aa.password,
                            'userRole': aa.userRole,
                        });
                        sync1 = false;
                    }
                } else {
                    resp.send("查询失败");
                    resp.end();
                }
            });
            while (sync1) { deasync.sleep(10); }
            return l;
        }
        l = selectid();
        let sz = [];
        for (let aa of l) {
            sz.push({
                'id': aa.id,
                'userName': aa.userName,
                'password': aa.password,
                'userRole': aa.userRole,
            });
        }
        resp.send(sz);
        db.end();
        resp.end();
    },
    //添加设备
    userAdd(req, resp) {    //req表示请求，resp表示应答
        let cpid = req.body.cpid;
        let cpName = req.body.cpName;
        let cpprice = req.body.cpprice;
        console.log(cpid, cpName, cpprice);

        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-2"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作   
        db.query("INSERT INTO product(cpid,cpName,cpprice) VALUES(?,?,?)", [cpid, cpName, cpprice], function (err, data) {

        });
        resp.send({ succ: true });
        db.end();
    },
    //添加用户
    devAdd(req, resp) {
        let id = req.body.id;
        let userName = req.body.userName;
        let password = req.body.password;
        let userRole = req.body.userRole;
        console.log(id, userName, password, userRole);

        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-2"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作   
        db.query("INSERT INTO user(id, userName, password, userRole) VALUES(?,?,?,?)", [id, userName, password, userRole], function (err, data) {

        });
        resp.send({ succ: true });
        db.end();

    },
    //修改设备
    userUpadte(req, resp) {    //req表示请求，resp表示应答
        let cpid = req.body.cpid;
        let cpName = req.body.cpName;
        let cpprice = req.body.cpprice;
        console.log(cpid, cpName, cpprice);
        console.log('修改');
        //mysql操作
        //1.创建数据库链接
        function select() {
            var sync1 = true;
            db.query("UPDATE product SET cpprice = ? WHERE cpName = ? AND cpid = ?", [cpprice, cpName, cpid], function (err, data) {
                console.log('------------------------------');
                console.log('修改后的数据');
                console.log(data);
                console.log('------------------------------');
                sync1 = false;
            });
            while (sync1) { deasync.sleep(10); }
            return;
        }
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-2"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        select();
        console.log('修改完成');
        resp.send({ succ: true });
        db.end();
        resp.end();
    },
    //修改用户
    devUpdate(req, resp) {    //req表示请求，resp表示应答
        let id = req.body.id;
        let userName = req.body.userName;
        let password = req.body.password;
        let userRole = req.body.userRole;
        console.log(id, userName, password, userRole);
        //mysql操作
        //1.创建数据库链接
        function select() {
            var sync1 = true;
            db.query("UPDATE user SET password = ? WHERE id = ? AND userName = ? AND userRole = ?", [password, id, userName, userRole], function (err, data) {
                sync1 = false;
            });
            while (sync1) { deasync.sleep(10); }
            return;
        }
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-2"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        select();
        console.log('修改完成');
        resp.send({ succ: true });
        db.end();
        resp.end();
    },
    //删除设备
    userDelete(req, resp) {    //req表示请求，resp表示应答
        var querystring = require('querystring');
        var result = querystring.parse(req.params.cpid, '&');
        console.log(result)
        let cpid = result.cpid;
        console.log(cpid);
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-2"
        });
        db.connect()
        db.query("delete from product where cpid = ?", [cpid], function (err, data) {



        });
        console.log("删除成功")
        resp.send({ succ: true });

        db.end()
    },
    //删除用户
    devDelete(req, resp) {    //req表示请求，resp表示应答
        var querystring = require('querystring');
        var result = querystring.parse(req.params.id, '&');
        console.log(result)
        let id = result.id;
        console.log(id);
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-2"
        });
        db.connect()
        db.query("delete from user where id = ? ", [id], function (err, data) {
        });
        console.log("删除成功")
        resp.send({ succ: true });
        db.end()
    }
}


