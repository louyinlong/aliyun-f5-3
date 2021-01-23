import { Component, OnInit } from '@angular/core';
declare var AMap: any;    // 一定要声明AMap，要不然报错找不到AMap
@Component({
  selector: 'app-product-detail2-component',
  templateUrl: './product-detail2-component.component.html',
  styleUrls: ['./product-detail2-component.component.css']
})
export class ProductDetail2ComponentComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.getMap();
  }
  getMap() {
    var map = new AMap.Map('container', {
      resizeEnable: true
    })
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