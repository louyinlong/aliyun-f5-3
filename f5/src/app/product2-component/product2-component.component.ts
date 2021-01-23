import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product2-component',
  templateUrl: './product2-component.component.html',
  styleUrls: ['./product2-component.component.css']
})
export class Product2ComponentComponent implements OnInit {
  chartOption: any;
  updateOption: any;
  public xAxis = [];
  public value = [];

  constructor(private route: Router, private httpclient: HttpClient) {
    this.chartOption = {
      title: {
        text: '湿度'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['value']
      },
      toolbox: {
        feature: {
          savaAsImage: {

          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          bounderGap: false,
          date: []
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'value',
          type: 'line',
          stack: '度',
          // areaStyle:{normal:{}},
          smooth: true,
          data: []
        },
      ],
    };
    this.updateOption = {};
  }

  ngOnInit(): void {
    timer(2000, 2000).subscribe(() => {
      this.httpclient.get('http://127.0.0.1:8080/sd/003').subscribe((value: any) => {
        if (value && value.data && value.data.length) {
          let i = value.data.length - 1;
          for (let item of value.data) {
            const d = new Date(Number(item.time));
            this.xAxis[i] = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
            this.xAxis[i] += ":" + (d.getMinutes() > 9 ? d.getMinutes() : 0 + d.getMinutes());
            this.xAxis[i] += ":" + (d.getSeconds() > 9 ? d.getSeconds() : 0 + d.getSeconds());
            this.value[i] = (item.value);
            i--;
          }
          this.updateOption = {
            xAxis: [
              {
                data: this.xAxis
              }
            ],
            series: [
              {
                data: this.value
              },
            ]
          }
        }
      })
    });
    console.log("end")
  }
}
