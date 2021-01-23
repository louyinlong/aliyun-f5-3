import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Dl2 } from './dl2';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login2-component',
  templateUrl: './login2-component.component.html',
  styleUrls: ['./login2-component.component.css']
})
export class Login2ComponentComponent implements OnInit {
  myForm: FormGroup;
  name: AbstractControl;
  telephone: AbstractControl;
  name$: Observable<Dl2>;
  baseUrl = "http://192.168.43.198:8080";
  currentUser: Dl2;

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private authService: AuthService, private router: Router) {
    this.myForm = this.fb.group(
      {
        'name': ['张翠花', Validators.compose([Validators.required])],
        'telephone': ['19857952195', Validators.compose([Validators.required, Validators.minLength(5)])]
      }
    );
    this.name = this.myForm.controls['name'];
    this.telephone = this.myForm.controls['telephone'];
    this.name$ = this.name.valueChanges;
    this.name.valueChanges.subscribe(val => {
      console.log(val);
    });
  }
  ngOnInit(): void {
  }
  login() {
    this.httpClient.post(this.baseUrl + '/dls2', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          this.authService.login();
          this.router.navigate(['./management2']);
        }
      });
  }
}
