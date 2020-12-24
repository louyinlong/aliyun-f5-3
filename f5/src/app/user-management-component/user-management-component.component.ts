import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';


@Component({
  selector: 'app-user-management-component',
  templateUrl: './user-management-component.component.html',
  styleUrls: ['./user-management-component.component.css']
})
export class UserManagementComponentComponent implements OnInit {

  myForm: FormGroup;
  id: AbstractControl;
  userName: AbstractControl;
  password: AbstractControl;
  userRole: AbstractControl;
  users$: Observable<User>;
  baseUrl = 'http://192.168.43.198:8080/';
  currentUser: User;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'id': [''],
      'userName': [''],
      'password': [''],
      'userRole': [''],
    });
    this.id = this.myForm.controls['id'];
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.userRole = this.myForm.controls['userRole'];
  }
  /*界面初始化*/
  ngOnInit(): void {
    this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users');
  }

  select(u: User) {
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }

  search() {
    let params = new HttpParams()
      .set('id', this.id.value)
      .set('userName', this.userName.value)
      .set('password', this.password.value)
      .set('userRole', this.userRole.value)
    if (this.id.value) {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users/' + params);
    } else {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users');
    }
  }

  add() {
    let params = new HttpParams()
      .set('id', this.id.value)
      .set('userName', this.userName.value)
      .set('password', this.password.value)
      .set('userRole', this.userRole.value)
    console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'users', params).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('添加成功!');
          this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users');
        }
      }
    );
  }

  delete() {
    const params = new HttpParams()
      .set('id', this.id.value)
      .set('userName', this.userName.value)

    this.httpClient.delete(this.baseUrl + 'users/' + params).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('删除成功！');
          this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users');
        }
      }
    )
  }

  update() {
    let params = new HttpParams()
      .set('id', this.id.value)
      .set('userName', this.userName.value)
      .set('password', this.password.value)
      .set('userRole', this.userRole.value)
    if (!this.currentUser) {
      alert('必须先选择用户！');
    }
    else {
      this.httpClient.put(this.baseUrl + 'users', params).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功！');
            this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users');
          }
        }
      )
    }
  }

}