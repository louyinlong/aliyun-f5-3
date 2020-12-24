const iot = require('alibabacloud-iot-device-sdk');

const device2 = iot.device({
  productKey: "a1FHlRK4PcK", //将<productKey>修改为实际产品的ProductKey
  deviceName: "temp",//将<deviceName>修改为实际设备的DeviceName
  deviceSecret: "c7956c410d4d5ab495b146a09b4c40e5",//将<deviceSecret>修改为实际设备的DeviceSecret
});


//监听connect事件
device2.on('connect', () => {
  //将<productKey> <deviceName>修改为实际值
  device2.subscribe('/a1FHlRK4PcK/temp/user/get');
  device2.publish('/a1FHlRK4PcK/temp/user/update', 'hello world!');
});

//监听message事件
device2.on('message', (topic, payload) => {
  console.log(topic, payload.toString());
});

module.exports = {
  device2: device2,
};