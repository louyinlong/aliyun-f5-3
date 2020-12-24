import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cp } from './cp';

@Component({
  selector: 'app-product-management-component',
  templateUrl: './product-management-component.component.html',
  styleUrls: ['./product-management-component.component.css']
})
export class ProductManagementComponentComponent implements OnInit {
  myForm: FormGroup;
  cpName: AbstractControl;
  cpid: AbstractControl;
  cpprice: AbstractControl;
  cpusers$: Observable<Cp>;
  baseUrl = 'http://192.168.43.198:8080/';
  currentcpusers: Cp;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'cpid': [''],
      'cpName': [''],
      'cpprice': [''],
    });
    this.cpid = this.myForm.controls['cpid'];
    this.cpName = this.myForm.controls['cpName'];
    this.cpprice = this.myForm.controls['cpprice'];
  }
  /*界面初始化*/
  ngOnInit(): void {
    this.cpusers$ = <Observable<Cp>>this.httpClient.get(this.baseUrl + 'cpusers');
  }

  select(u: Cp) {
    this.currentcpusers = u;
    this.myForm.setValue(this.currentcpusers);
    this.search();
  }

  search() {
    let params = new HttpParams()
      .set('cpid', this.cpid.value)
      .set('cpName', this.cpName.value)
      .set('cpprice', this.cpprice.value)
    if (this.cpid.value) {
      this.cpusers$ = <Observable<Cp>>this.httpClient.get(this.baseUrl + 'cpusers/' + params);
    } else {
      this.cpusers$ = <Observable<Cp>>this.httpClient.get(this.baseUrl + 'cpusers');
    }
  }

  add() {
    let params = new HttpParams()
      .set('cpid', this.cpid.value)
      .set('cpName', this.cpName.value)
      .set('cpprice', this.cpprice.value)

    this.httpClient.post(this.baseUrl + 'cpusers', params).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('添加成功');
          this.cpusers$ = <Observable<Cp>>this.httpClient.get(this.baseUrl + 'cpusers');
        }
      }
    )
  }

  delete() {
    let params = new HttpParams()
      .set('cpid', this.cpid.value)
      .set('cpName', this.cpName.value)
      .set('cpprice', this.cpprice.value)

    if (!this.currentcpusers) {
      alert('必须先选择用户！');
    }
    else {
      this.httpClient.delete(this.baseUrl + 'cpusers/' + params).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('删除成功！');
            this.cpusers$ = <Observable<Cp>>this.httpClient.get(this.baseUrl + 'cpusers');
          }
        }
      )
    }
  }

  update() {
    let params = new HttpParams()
      .set('cpid', this.cpid.value)
      .set('cpName', this.cpName.value)
      .set('cpprice', this.cpprice.value)
    if (!this.currentcpusers) {
      alert('必须先选择用户！');
    }
    else {
      this.httpClient.put(this.baseUrl + 'cpusers', params).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功！');
            this.cpusers$ = <Observable<Cp>>this.httpClient.get(this.baseUrl + 'cpusers');
          }
        }
      )
    }
  }

}
