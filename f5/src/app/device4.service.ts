import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class Device4Service {
  SERVER_URL = 'http://192.168.43.198:8080/fs';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }
  
  // 该函数用于开关风扇
  togfs(status2: number) {
    const obj = {
      status2: status2
    };
    return this.httpClient.put(this.SERVER_URL, obj, this.httpOptions);
  }
  // 该函数用于风扇挡位
  togfsdw(status: number) {
    const obj2 = {
      status: status
    };
    return this.httpClient.put(this.SERVER_URL, obj2, this.httpOptions);
  }
  // 该函数用于获取风扇的状态
  getfs() {
    return this.httpClient.get(this.SERVER_URL);
  }


  
}
