import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Device4Service } from '../device4.service';

@Component({
  selector: 'app-fs',
  templateUrl: './fs.component.html',
  styleUrls: ['./fs.component.css']
})
export class FSComponent implements OnInit {
  fs$ = null;
  aaa: number = 0;
  constructor(private device4Service: Device4Service) {
  }

  /*界面初始化*/
  ngOnInit(): void {

    this.fs$ = this.device4Service.getfs();

  }
  // 关风扇
  fsturnOff() {
    this.aaa = 0;
    this.device4Service.togfs(0).subscribe(
      () => {
        console.log('Turn off fs');
        timer(1500).subscribe(
          () => {
            this.fs$ = this.device4Service.getfs();
          }
        );
      }
    );
  }

  //风扇低档
  fsdi() {
    this.aaa = 1;
    this.device4Service.togfsdw(1).subscribe(
      () => {
        console.log('fs 低档');
        timer(1500).subscribe(
          () => {
            this.fs$ = this.device4Service.getfs();
          }
        );
      }
    );
  }
  // 风扇高档
  fsgao() {
    this.aaa = 2;
    this.device4Service.togfsdw(2).subscribe(
      () => {
        console.log('fs 高档');
        timer(1500).subscribe(
          () => {
            this.fs$ = this.device4Service.getfs();
          }
        );
      }
    );
  }

}