import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Dl } from './dl';
import { HttpClient, HttpParams } from '@angular/common/http';

// function userNameValidator(control: FormControl): { [s: string]: boolean } {
//   if (!control.value.match(/^a/)) {
//     return { invalidUser: true };
//   }
// }

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})

export class LoginComponentComponent implements OnInit {
  myForm: FormGroup;
  userName: AbstractControl;
  password: AbstractControl;
  // name$: Observable<string>;
  name$: Observable<Dl>;
  baseUrl = "http://192.168.43.198:8080";
  currentUser: Dl;
  // dls$: Observable<Dl>;

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private authService: AuthService, private router: Router) {
    this.myForm = this.fb.group(
      {
        'userName': ['丹丹姐', Validators.compose([Validators.required])],
        'password': ['123456', Validators.compose([Validators.required, Validators.minLength(5)])]
      }
    );
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      console.log(val);
    });
  }
  ngOnInit(): void {
  }
  login() {
    this.httpClient.post(this.baseUrl + '/dls', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          this.authService.login();
          this.router.navigate(['./management']);
        }
      });
  }
}
