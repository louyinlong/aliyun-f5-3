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
  id: AbstractControl;
  name: AbstractControl;
  sex: AbstractControl;
  age: AbstractControl;
  telephone: AbstractControl;
  cpusers$: Observable<Cp>;
  baseUrl = 'http://192.168.43.198:8080/';
  currentcpusers: Cp;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'id': [''],
      'name': [''],
      'sex': [''],
      'age': [''],
      'telephone': [''],
    });
    this.id = this.myForm.controls['id'];
    this.name = this.myForm.controls['name'];
    this.sex = this.myForm.controls['sex'];
    this.age = this.myForm.controls['age'];
    this.telephone = this.myForm.controls['telephone'];
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
      .set('id', this.id.value)
      .set('name', this.name.value)
      .set('sex', this.sex.value)
      .set('age', this.age.value)
      .set('telephone', this.telephone.value)
    if (this.id.value) {
      this.cpusers$ = <Observable<Cp>>this.httpClient.get(this.baseUrl + 'cpusers/' + params);
    } else {
      this.cpusers$ = <Observable<Cp>>this.httpClient.get(this.baseUrl + 'cpusers');
    }
  }

  add() {
    let params = new HttpParams()
      .set('id', this.id.value)
      .set('name', this.name.value)
      .set('sex', this.sex.value)
      .set('age', this.age.value)
      .set('telephone', this.telephone.value)

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
      .set('id', this.id.value)
      .set('name', this.name.value)
      .set('sex', this.sex.value)
      .set('age', this.age.value)
      .set('telephone', this.telephone.value)

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
      .set('id', this.id.value)
      .set('name', this.name.value)
      .set('sex', this.sex.value)
      .set('age', this.age.value)
      .set('telephone', this.telephone.value)
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
