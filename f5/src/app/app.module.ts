import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NgxEchartsModule } from 'ngx-echarts';
import { LoginGuard } from './login.guard';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { CentreComponentComponent } from './centre-component/centre-component.component';
import { H1ComponentComponent } from './h1-component/h1-component.component';
import { H2ComponentComponent } from './h2-component/h2-component.component';
import { H3ComponentComponent } from './h3-component/h3-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { Login2ComponentComponent } from './login2-component/login2-component.component';
import { ManagementComponentComponent } from './management-component/management-component.component';
import { Management2ComponentComponent } from './management2-component/management2-component.component';
import { ProductComponentComponent } from './product-component/product-component.component';
import { Product2ComponentComponent } from './product2-component/product2-component.component';
import { ProductDetailComponentComponent } from './product-detail-component/product-detail-component.component';
import { ProductDetail2ComponentComponent } from './product-detail2-component/product-detail2-component.component';
import { ProductManagementComponentComponent } from './product-management-component/product-management-component.component';
import { UserManagementComponentComponent } from './user-management-component/user-management-component.component';
import { AliProductManagementComponentComponent } from './ali-product-management-component/ali-product-management-component.component';
import { ExitComponentComponent } from './exit-component/exit-component.component';
import { Wc2Component } from './wc2/wc2.component';
import { BsComponentComponent } from './bs-component/bs-component.component';



const mgtChildrenRoutes: Routes = [
  { path: 'product', component: ProductComponentComponent },
  { path: 'product2', component: Product2ComponentComponent },
  { path: 'product-detail', component: ProductDetailComponentComponent },
  { path: 'product-detail2', component: ProductDetail2ComponentComponent },
  { path: 'product-management', component: ProductManagementComponentComponent },
  { path: 'user-management', component: UserManagementComponentComponent },
  { path: 'ali', component: AliProductManagementComponentComponent },
  { path: 'bs', component: BsComponentComponent },
  { path: 'exit', component: ExitComponentComponent },
  { path: 'wc2', component: Wc2Component },
  { path: '', redirectTo: 'user', pathMatch: 'full' }
];

const routes: Routes = [
  { path: '', redirectTo: 'centre', pathMatch: 'full' },
  { path: 'centre', component: CentreComponentComponent },
  { path: 'h1', component: H1ComponentComponent },
  { path: 'h2', component: H2ComponentComponent },
  { path: 'h3', component: H3ComponentComponent },
  { path: 'home', component: HomeComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'login2', component: Login2ComponentComponent },
  {
    path: 'management',
    component: ManagementComponentComponent,
    children: mgtChildrenRoutes,
    canActivate: [LoginGuard]
  },
  {
    path: 'management2',
    component: Management2ComponentComponent,
    children: mgtChildrenRoutes,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CentreComponentComponent,
    H1ComponentComponent,
    H2ComponentComponent,
    H3ComponentComponent,
    HomeComponentComponent,
    LoginComponentComponent,
    Login2ComponentComponent,
    ManagementComponentComponent,
    Management2ComponentComponent,
    ProductComponentComponent,
    Product2ComponentComponent,
    ProductDetailComponentComponent,
    ProductDetail2ComponentComponent,
    ProductManagementComponentComponent,
    UserManagementComponentComponent,
    AliProductManagementComponentComponent,
    ExitComponentComponent,
    Wc2Component,
    BsComponentComponent,



  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // NgxEchartsModule
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  providers: [LoginGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
