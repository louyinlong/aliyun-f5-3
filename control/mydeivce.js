const iot = require('alibabacloud-iot-device-sdk');

//压力灯
const light111 = iot.device({
    productKey: 'a1t18JUPNjP', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'light111', //将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'abebd8f3b2b0b528219b527b1d05c9c8', //将<deviceSecret>修改为实际设备的DeviceSecret
})

light111.on('connect', () => {
    light111.subscribe('/a1t18JUPNjP/light111/user/get');
    light111.publish('/a1t18JUPNjP/light111/user/update', 'hello world!');
})

light111.on('message', (topic, payload) => {
    // console.log(topic, payload.toString());
});
//倒车灯

const led = iot.device({
    productKey: 'a1FRdLzM5i8', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'dcLED', //将<deviceName>修改为实际设备的DeviceName
    deviceSecret: '411416d8b509a2bfac4f2065989e4b9e', //将<deviceSecret>修改为实际设备的DeviceSecret
})

led.on('connect', () => {
    led.subscribe('/a1FRdLzM5i8/dcLED/user/get');
    led.publish('/a1FRdLzM5i8/dcLED/user/update', 'hello world!');
})

led.on('message', (topic, payload) => {
    // console.log(topic, payload.toString());
});

//距离灯
const deng = iot.device({
    productKey: 'a1FRdLzM5i8', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'LED713', //将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'feea0d4e08ad05e4b0c5702a9a71313e', //将<deviceSecret>修改为实际设备的DeviceSecret
})

deng.on('connect', () => {
    deng.subscribe('/a1FRdLzM5i8/LED713/user/get');
    deng.publish('/a1FRdLzM5i8/LED713/user/update', 'hello world!');
})

deng.on('message', (topic, payload) => {
    // console.log(topic, payload.toString());
});

var light1 = 1;
light111.postProps({
    LightStatus: light1,
}, (res) => {
    console.log(res);
})
var led1 = 1;
led.postProps({
    LightStatus: led1,
}, (res) => {
    console.log(res);
})

var deng1 = 1;
led.postProps({
    LightStatus: deng1,
}, (res) => {
    console.log(res);
})


module.exports = {

    getlight111: function () {
        return light1;
    },
    getled: function () {
        return led1;
    },
    getdeng: function () {
        return deng1;
    },
    setlight111: function (state) {
        light1 = state;
    },
    setled: function (state) {
        led1 = state;
    },
    setdeng: function (state) {
        deng1 = state;
    },
    light111: light111,
    led: led,
    deng: deng,



}
