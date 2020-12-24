import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.css']
})
export class LEDComponent implements OnInit {
  led$ = null;
  aaa: number = 0;

  constructor(private deviceService: DeviceService) {
  }

  /*界面初始化*/
  ngOnInit(): void {
    this.led$ = this.deviceService.getLED();

  }
  // 开灯
  turnOn() {
    this.aaa = 1;
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
    this.aaa = 0;
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