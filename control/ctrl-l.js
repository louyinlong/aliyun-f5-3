const iot = require('alibabacloud-iot-device-sdk');

var lightStatus = 0;

const device = iot.device({
    productKey: "a1FRdLzM5i8", //将<productKey>修改为实际产品的ProductKey
    deviceName: "LED713",//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: "feea0d4e08ad05e4b0c5702a9a71313e",//将<deviceSecret>修改为实际设备的DeviceSecret
});

//监听connect事件
device.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device.subscribe('/a1FRdLzM5i8/LED713/user/get');
    device.publish('/a1FRdLzM5i8/LED713/user/update', 'hello world!');
});

//监听message事件
device.on('message', (topic, payload) => {
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
device.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'LightStatus') { //判断是否设置的是LightSwitch属性
            console.log('灯的状态 ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            LightStatus = cmd.params.LightStatus;
            if (LightStatus == 0) {
                console.log('灯从云端关闭')
            }
            else {
                console.log('灯从云端打开')
            }
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            lightStatus = Number(cmd.params.LightStatus);
            device.postProps({ 'LightStatus': LightStatus });
        }
    }
})




module.exports = {
    device: device,
    getLightStatus: function () {
        return lightStatus;
    },
    setLightStatus: function (status) {
        lightStatus = status;
    }
};