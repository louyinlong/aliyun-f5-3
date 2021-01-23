
const device2 = require('./ctrl-t');
const device3 = require('./ctrl-s');

const mysqlModule = require('mysql');
const deasync = require('deasync');

module.exports = {
   
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
        // console.log("插入");
        const id = req.params['id'];
        const value = req.params['value'];

        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-3"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        db.query('insert into sd(id,value,time) values(?,?,?)', [id, value, Date.now()], function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '添加成功'
                }
                // console.log('----------------------');
                // console.log(result);
                // console.log('----------------------');
                // console.log(data);
            }
        });
        db.end();

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
    getsd(req, resp) {
        console.log("取数据");
        const id = req.params['id'];
        // mysql记录
        var db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-3"
        })
        db.connect();
        db.query('select * from sd where id = ? order by time desc limit 10', [id], function (err, result) {
            console.log(err);
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '查询成功'
                }
                console.log('----------------------');
                console.log(result);
                console.log('----------------------');
                console.log(data);
            }
            const res = {
                id: id,
                data: result
            };
            resp.send(JSON.stringify(res));
        });
        db.end();
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
            database: "f5-3"
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
    DLS2(req, resp) {    //req表示请求，resp表示应答
        let name = req.body.name;
        let telephone = req.body.telephone;
        console.log(name, telephone);
        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-3"
        });
        //2.打开数据库   
        db.connect();
        console.log('aaa');
        //3.数据库操作
        db.query("SELECT * FROM management WHERE name = ? AND telephone = ? ", [name, telephone], function (err, data) {
            console.log(data);
            for (let aa of data) {
                if (aa.name === req.body.name && aa.telephone === req.body.telephone) {
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
            db.query("SELECT * FROM management", function (err, data) {
                if (err) console.log("err")
                for (let aa of data) {
                    l.push({
                        'id': aa.id,
                        'name': aa.name,
                        'sex': aa.sex,
                        'age': aa.age,
                        'telephone': aa.telephone,
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
            database: "f5-3"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        l = selectl();
        let sz = [];
        for (let aa of l) {
            sz.push({
                'id': aa.id,
                'name': aa.name,
                'sex': aa.sex,
                'age': aa.age,
                'telephone': aa.telephone,
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
        var result = querystring.parse(req.params.id, '&');
        console.log(result);
        let id = result.id;
        let name = result.name;
        let sex = result.sex;
        let age = result.age;
        let telephone = result.telephone;
        console.log(id, name, sex, age, telephone);

        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-3"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        function selectid() {
            var sync1 = true;
            l.splice(0, l.length);
            db.query("SELECT * FROM management WHERE id=?", [id, name, sex, age, telephone], function (err, data) {
                if (data.length > 0) {
                    for (let aa of data) {
                        l.push({
                            'id': aa.id,
                            'name': aa.name,
                            'sex': aa.sex,
                            'age': aa.age,
                            'telephone': aa.telephone,
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
                'name': aa.name,
                'sex': aa.sex,
                'age': aa.age,
                'telephone': aa.telephone,
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
                        'userID': aa.userID,
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
            database: "f5-3"
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
                'userID': aa.userID,
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
        var result = querystring.parse(req.params.userID, '&');
        console.log(result);
        let userID = result.userID;
        let userName = result.userName;
        let password = result.password;
        let userRole = result.userRole;
        console.log(userID, userName, password, userRole);

        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-3"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        function selectid() {
            var sync1 = true;
            l.splice(0, l.length);
            db.query("SELECT * FROM user WHERE userID=?", [userID, userName, password, userRole], function (err, data) {
                if (data.length > 0) {
                    for (let aa of data) {
                        l.push({
                            'userID': aa.userID,
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
                'userID': aa.userID,
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
        let id = req.body.id;
        let name = req.body.name;
        let sex = req.body.sex;
        let age = req.body.age;
        let telephone = req.body.telephone;
        console.log(id, name, sex, age, telephone);

        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-3"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作   
        db.query("INSERT INTO management(id,name,sex,age,telephone) VALUES(?,?,?,?,?)", [id, name, sex, age, telephone], function (err, data) {

        });
        resp.send({ succ: true });
        db.end();
    },
    //添加用户
    devAdd(req, resp) {
        let userID = req.body.userID;
        let userName = req.body.userName;
        let password = req.body.password;
        let userRole = req.body.userRole;
        console.log(userID, userName, password, userRole);

        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-3"
        });
        //2.打开数据库   
        db.connect();
        //3.数据库操作   
        db.query("INSERT INTO user(userID, userName, password, userRole) VALUES(?,?,?,?)", [userID, userName, password, userRole], function (err, data) {

        });
        resp.send({ succ: true });
        db.end();

    },
    //修改设备
    userUpadte(req, resp) {    //req表示请求，resp表示应答
        let id = req.body.id;
        let name = req.body.name;
        let sex = req.body.sex;
        let age = req.body.age;
        let telephone = req.body.telephone;
        console.log(id, name, sex, age, telephone);
        console.log('修改');
        //mysql操作
        //1.创建数据库链接
        function select() {
            var sync1 = true;
            db.query("UPDATE management SET telephone = ? WHERE name = ? AND sex = ? AND age = ?", [telephone, name, sex, age], function (err, data) {
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
            database: "f5-3"
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
        let userID = req.body.userID;
        let userName = req.body.userName;
        let password = req.body.password;
        let userRole = req.body.userRole;
        console.log(userID, userName, password, userRole);
        //mysql操作
        //1.创建数据库链接
        function select() {
            var sync1 = true;
            db.query("UPDATE user SET password = ? WHERE userID = ? AND userName = ? AND userRole = ?", [password, userID, userName, userRole], function (err, data) {
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
            database: "f5-3"
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
        var result = querystring.parse(req.params.id, '&');
        console.log(result)
        let id = result.id;
        console.log(id);
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-3"
        });
        db.connect()
        db.query("delete from management where id = ?", [id], function (err, data) {
        });
        console.log("删除成功")
        resp.send({ succ: true });

        db.end()
    },
    //删除用户
    devDelete(req, resp) {    //req表示请求，resp表示应答
        var querystring = require('querystring');
        var result = querystring.parse(req.params.userID, '&');
        console.log(result)
        let userID = result.userID;
        console.log(userID);
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-3"
        });
        db.connect()
        db.query("delete from user where userID = ? ", [userID], function (err, data) {
        });
        console.log("删除成功")
        resp.send({ succ: true });
        db.end()
    }
}


