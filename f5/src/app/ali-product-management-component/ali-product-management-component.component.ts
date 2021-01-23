import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ali } from './ali';
@Component({
  selector: 'app-ali-product-management-component',
  templateUrl: './ali-product-management-component.component.html',
  styleUrls: ['./ali-product-management-component.component.css']
})
export class AliProductManagementComponentComponent implements OnInit {

  myForm: FormGroup;
  ProductName: AbstractControl;
  ProductStatus: AbstractControl;
  ProductSecret: AbstractControl;
  ProductKey: AbstractControl;
  alis$: Observable<ali>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentali: ali;
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'ProductName': [''],
      'ProductStatus': [''],
      'ProductSecret': [''],
      'ProductKey': [''],
    });
    this.ProductName = this.myForm.controls['ProductName'];
    this.ProductStatus = this.myForm.controls['ProductStatus'];
    this.ProductSecret = this.myForm.controls['ProductSecret'];
    this.ProductKey = this.myForm.controls['ProductKey'];
  }

  /*界面初始化*/
  ngOnInit(): void {
    this.alis$ = <Observable<ali>>this.httpClient.get(this.baseUrl + 'ali');
  }
  select(a: ali) {
    this.currentali = a;
    this.myForm.controls['ProductName'].setValue(this.currentali.ProductName);
    this.myForm.controls['ProductKey'].setValue(this.currentali.ProductKey);
  }

  search() {
    let params = new HttpParams()
      .set('ProductName', this.ProductName.value)
      .set('ProductStatus', this.ProductStatus.value)
      .set('ProductSecret', this.ProductSecret.value)
      .set('ProductKey', this.ProductKey.value)
    if (this.ProductKey.value) {
      this.alis$ = <Observable<ali>>this.httpClient.get(this.baseUrl + 'alisearch/' + this.ProductKey.value);
    } else {
      this.alis$ = <Observable<ali>>this.httpClient.get(this.baseUrl + 'ali');
    }
  }

  add() {
    let params = new HttpParams()
      .set('ProductName', this.ProductName.value)

    console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'aliadd', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('添加成功!');
          this.alis$ = <Observable<ali>>this.httpClient.get(this.baseUrl + 'ali');
        }
      }
    );
  }

  delete() {
    const params = new HttpParams()
      .set('ProductName', this.ProductName.value)
      .set('ProductStatus', this.ProductStatus.value)
      .set('ProductSecret', this.ProductSecret.value)
      .set('ProductKey', this.ProductKey.value)

    this.httpClient.delete(this.baseUrl + 'alidelete/' + this.ProductKey.value).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('删除成功！');
          this.alis$ = <Observable<ali>>this.httpClient.get(this.baseUrl + 'ali');
        }
      }
    )
  }

  update() {
    let params = new HttpParams()
      .set('ProductName', this.ProductName.value)
      .set('ProductStatus', this.ProductStatus.value)
      .set('ProductSecret', this.ProductSecret.value)
      .set('ProductKey', this.ProductKey.value)
    if (!this.currentali) {
      alert('必须先选择用户！');
    }
    else {
      this.httpClient.put(this.baseUrl + 'aliupdate', this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功！');
            this.alis$ = <Observable<ali>>this.httpClient.get(this.baseUrl + 'ali');
          }
        }
      )
    }
  }

}
