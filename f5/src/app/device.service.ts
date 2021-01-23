import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// const mysqlModule = require('mysql');

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  SERVER_URL = 'http://127.0.0.1:8080/light';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }
  // // 该函数用于开关灯
  // toggleLED(status: number) {
  //   const obj = {
  //     status: status
  //   };
  //   return this.httpClient.put(this.SERVER_URL, obj, this.httpOptions);
  // }
  该函数用于获取灯的状态
  getYali() {
    return this.httpClient.get(this.SERVER_URL);
  }
  
}
