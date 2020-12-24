import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {
  led$ = null;
  constructor(private deviceService: DeviceService) {
  }
  /*界面初始化*/
  ngOnInit(): void {
    this.led$ = this.deviceService.getLED();
  }
  // 开灯
  turnOn() {
    this.deviceService.toggleLED(1).subscribe(
      () => {
        console.log('Turn on LED');
        timer(1500).subscribe(
          () => {
            this.led$ = this.deviceService.getLED();
          }
        );
      }
    );
  }
  // 关灯
  turnOff() {
    this.deviceService.toggleLED(0).subscribe(
      () => {
        console.log('Turn off LED');
        timer(1500).subscribe(
          () => {
            this.led$ = this.deviceService.getLED();
          }
        );
      }
    );
  }





  
}



