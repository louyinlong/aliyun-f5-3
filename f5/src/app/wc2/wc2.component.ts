import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DeviceService } from '../device.service'

@Component({
  selector: 'app-wc2',
  templateUrl: './wc2.component.html',
  styleUrls: ['./wc2.component.css']
})
export class Wc2Component implements OnInit {
  yali$ = null;
  aaa: number = 0;
  bbb: number = 0;
  ccc: number = 0;

  chartOption: any;
  updateOption: any;
  public xAxis = [];
  public value = [];

  constructor(private route: Router, private httpclient: HttpClient, private deviceService: DeviceService) {
    this.chartOption = {
      title: {
        text: '温湿度'
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
      this.httpclient.get('http://192.168.43.198:8080/light').subscribe((value: any) => {
        console.log(value.data[0].value)
        if (value.data[0].value == 1) {
          //console.log(value[0].value)
          this.aaa = 1
          // this.aaa$.num = "ON";
          // console.log(this.aaa)
        } else {
          this.aaa = 0
          // this.aaa$.num = "OFF";
          // console.log(this.aaa)
        }
      })
    });

    timer(2000, 2000).subscribe(() => {
      this.httpclient.get('http://192.168.43.198:8080/led').subscribe((value: any) => {
        console.log(value.data[0].value)
        if (value.data[0].value == 1) {
          //console.log(value[0].value)
          this.bbb = 1
          // this.aaa$.num = "ON";
          // console.log(this.aaa)
        } else {
          this.bbb = 0
          // this.aaa$.num = "OFF";
          // console.log(this.aaa)
        }
      })
    });

    timer(2000, 2000).subscribe(() => {
      this.httpclient.get('http://192.168.43.198:8080/deng').subscribe((value: any) => {
        console.log(value.data[0].value)
        if (value.data[0].value == 1) {
          //console.log(value[0].value)
          this.ccc = 1
          // this.aaa$.num = "ON";
          // console.log(this.aaa)
        } else {
          this.ccc = 0
          // this.aaa$.num = "OFF";
          // console.log(this.aaa)
        }
      })
    });


    timer(2000, 2000).subscribe(() => {
      this.httpclient.get('http://192.168.43.198:8080/sd/003').subscribe((value: any) => {
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

