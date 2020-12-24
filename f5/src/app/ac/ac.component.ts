import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Device5Service } from '../device5.service';

@Component({
  selector: 'app-ac',
  templateUrl: './ac.component.html',
  styleUrls: ['./ac.component.css']
})
export class ACComponent implements OnInit {
  aaa: number = 0;
  ac$ = null;
  constructor(private device5Service: Device5Service) {
  }

  /*界面初始化*/
  ngOnInit(): void {
    this.ac$ = this.device5Service.getac();
  }
  // 空调打开
  acturnOn() {
    this.aaa = 1;
    this.device5Service.togac(1).subscribe(
      () => {
        console.log('ac 打开');
        timer(1500).subscribe(
          () => {
            this.ac$ = this.device5Service.getac();
          }
        );
      }
    );
  }

  // 空调关闭
  acturnOff() {
    this.aaa = 0;
    this.device5Service.togac(0).subscribe(
      () => {
        console.log('ac 关闭');
        timer(1500).subscribe(
          () => {
            this.ac$ = this.device5Service.getac();
          }
        );
      }
    );
  }

}