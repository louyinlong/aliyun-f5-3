import { Component, OnInit } from '@angular/core';
declare var AMap: any;    // 一定要声明AMap，要不然报错找不到AMap
@Component({
  selector: 'app-product-detail-component',
  templateUrl: './product-detail-component.component.html',
  styleUrls: ['./product-detail-component.component.css']
})
export class ProductDetailComponentComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.getMap();
  }
  getMap() {
    var map = new AMap.Map('container', {
      resizeEnable: true,
      center: [116.397428, 39.90923],//地图中心点
      zoom: 13 //地图显示的缩放级别
    });
    //构造路线导航类
    var driving = new AMap.Driving({
      map: map,
      panel: "panel",
    });
    // 根据起终点经纬度规划驾车导航路线
    driving.search(new AMap.LngLat(120.152659, 30.175629), new AMap.LngLat(120.157555, 30.170381), function (status, result) {
      // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
      if (status === 'complete') {
        // log.success('绘制驾车路线完成')
      } else {
        // log.error('获取驾车数据失败：' + result)
      }
    });
    AMap.plugin('AMap.Geolocation', function () {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：5s
        showMarker: false,
        buttonPosition: 'RB',    //定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
      });
      map.addControl(geolocation);
      geolocation.getCurrentPosition(function (status, result) {
        if (status == 'complete') {
          onComplete(result)
        } else {
          onError(result)
        }
      });
      // data是具体的定位信息
      function onComplete(data) {
        var marker = new AMap.Marker({
          position: data.position,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        });
        map.add(marker);
      }
      // 定位出错
      function onError(data) { }
    })
  }
}