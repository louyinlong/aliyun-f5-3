const iot = require('alibabacloud-iot-device-sdk');

const device3 = iot.device({
  productKey: "a1hNxXNEM59", //将<productKey>修改为实际产品的ProductKey
  deviceName: "shidu",//将<deviceName>修改为实际设备的DeviceName
  deviceSecret: "18a1b0b7afecd3e7f4148cb9a7c388a3",//将<deviceSecret>修改为实际设备的DeviceSecret
});



//监听connect事件
device3.on('connect', () => {
  //将<productKey> <deviceName>修改为实际值
  device3.subscribe('/a1hNxXNEM59/shidu/user/get');
  device3.publish('/a1hNxXNEM59/shidu/user/update', 'hello world!');
});

//监听message事件
device3.on('message', (topic, payload) => {
  console.log(topic, payload.toString());
});

module.exports = {
  device3: device3,
};