"use struct";
const express = require('express');
const device = require('../control/mydeivce');
const mysqlModule = require('mysql');
const deasync = require('deasync');
module.exports = {
    ///////////////////////////////设备的增删查改///////////////////////////////////

    sendlight111(req, resp) {
        var light111 = req.params['light111'];
        device.setlight111(light111);
        device.light111.postProps(
            {
                LightStatus: Number(light111)
            }, (res) => {
                console.log(res);
            }
        )
        const obj = {
            success: true,//是否成功
            status: device.getlight111()
        };
        resp.write(JSON.stringify(obj));
        resp.end();
    },


    sendled(req, resp) {
        var led = req.params['led'];
        device.setled(led);
        device.led.postProps(
            {
                LightStatus: Number(led)
            }, (res) => {
                console.log(res);
            }
        )
        const obj1 = {
            success: true,//是否成功
            status: device.getled()
        };
        resp.write(JSON.stringify(obj1));
        resp.end();
    },

    senddeng(req, resp) {
        var deng = req.params['deng'];
        device.setdeng(deng);
        device.deng.postProps(
            {
                LightStatus: Number(deng)
            }, (res) => {
                console.log(res);
            }
        )
        const obj = {
            success: true,//是否成功
            status: device.getdeng()
        };
        resp.write(JSON.stringify(obj));
        resp.end();
    },

    getYali(req, resp) {
        console.log("取数据");
        const value = req.params['value'];
        // mysql记录
        var db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-3"
        })
        db.connect();
        db.query('select * from yali order by time desc limit 10', [value], function (err, result) {
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
                value: value,
                data: result
            };
            resp.send(JSON.stringify(res));
        });
        db.end();
    },

    getled(req, resp) {
        console.log("取数据");
        const value = req.params['value'];
        // mysql记录
        var db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-3"
        })
        db.connect();
        db.query('select * from dc order by time desc limit 10', [value], function (err, result) {
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
                value: value,
                data: result
            };
            resp.send(JSON.stringify(res));
        });
        db.end();
    },

    getdeng(req, resp) {
        console.log("取数据");
        const value = req.params['value'];
        // mysql记录
        var db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "",
            database: "f5-3"
        })
        db.connect();
        db.query('select * from deng order by time desc limit 10', [value], function (err, result) {
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
                value: value,
                data: result
            };
            resp.send(JSON.stringify(res));
        });
        db.end();
    },





}