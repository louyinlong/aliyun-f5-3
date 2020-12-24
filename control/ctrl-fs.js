const iot = require('alibabacloud-iot-device-sdk');

var WindSpeed = 0;
var PowerSwitch = 0;

const device4 = iot.device({
    productKey: "a1dlPrlccmM", //将<productKey>修改为实际产品的ProductKey
    deviceName: "fengshan",//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: "6f000b36d0dba4ef716338c9d2c32107",//将<deviceSecret>修改为实际设备的DeviceSecret
});

//监听connect事件
device4.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device4.subscribe('/a1dlPrlccmM/fengshan/user/get');
    device4.publish('/a1dlPrlccmM/fengshan/user/update', 'hello world!');
});

//监听message事件
device4.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});

// 上报设备属性
// device.postProps({
//     LightStatus: 1,
//     LightVolt: 150
// }, (res) => {
//     console.log(res);
// });

// 监听云端设置属性服务消息，示例代码为一个灯
device4.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'WindSpeed') { //判断是否设置的是LightSwitch属性
            console.log('风扇的状态 ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            WindSpeed = cmd.params.WindSpeed;
            if (WindSpeed == 1) {
                console.log('风扇开低档')
            } else if (WindSpeed == 2) {
                console.log('风扇开高档')
            } else if (WindSpeed == 0) {
                console.log('风扇关闭')
            }


        }


    }

});




module.exports = {
    device4: device4,
    getWindSpeed: function () {
        return WindSpeed;
    },
    getPowerSwitch: function () {
        return PowerSwitch;
    },
    setWindSpeed: function (status) {
        WindSpeed = status;
    },
    setPowerSwitch: function (status) {
        PowerSwitch = status;
    }
};