import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
@Component({
  selector: 'app-product-detail-component',
  templateUrl: './product-detail-component.component.html',
  styleUrls: ['./product-detail-component.component.css']
})
export class ProductDetailComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initEchart();
  }

  initEchart() {
    const ec = echarts as any;
    const lineChart = ec.init(document.getElementById('lineChart'));
    const chartOption = {

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
      }]
    }
    lineChart.setOption(chartOption);
  }
}
