import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class Device5Service {
  SERVER_URL = 'http://192.168.43.198:8080/device5';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }
  // 该函数用于开关空调
  togac(status: number) {
    const obj = {
      status: status
    };
    return this.httpClient.put(this.SERVER_URL, obj, this.httpOptions);
  }
  // 该函数用于获取灯的状态
  getac() {
    return this.httpClient.get(this.SERVER_URL);
  }

  


  
}
