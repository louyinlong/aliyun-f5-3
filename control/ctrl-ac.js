const iot = require('alibabacloud-iot-device-sdk');

var PowerSwitch = 0;

const device5 = iot.device({
    productKey: "a1rOx03dJqV", //将<productKey>修改为实际产品的ProductKey
    deviceName: "kongtiao",//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: "8b96d71b0356504e00f599a5b53c732b",//将<deviceSecret>修改为实际设备的DeviceSecret
});

//监听connect事件
device5.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device5.subscribe('/a1rOx03dJqV/kongtiao/user/get');
    device5.publish('/a1rOx03dJqV/kongtiao/user/update', 'hello world!');
});

//监听message事件
device5.on('message', (topic, payload) => {
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
device5.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'PowerSwitch') { //判断是否设置的是LightSwitch属性
            console.log('空调的状态 ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            PowerSwitch = cmd.params.PowerSwitch;
            if (PowerSwitch == 0) {
                console.log('空调从云端关闭')
            }
            else {
                console.log('空调从云端打开')
            }
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            PowerSwitch = Number(cmd.params.PowerSwitch);
            device5.postProps({ 'PowerSwitch': PowerSwitch });
        }
    }
})




module.exports = {
    device5: device5,
    getPowerSwitch: function () {
        return PowerSwitch;
    },
    setPowerSwitch: function (status) {
        PowerSwitch = status;
    }
};