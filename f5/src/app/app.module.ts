import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
// import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ManagementComponentComponent } from './management-component/management-component.component';
import { ProductComponentComponent } from './product-component/product-component.component';
import { ProductDetailComponentComponent } from './product-detail-component/product-detail-component.component';
import { ProductManagementComponentComponent } from './product-management-component/product-management-component.component';
import { UserManagementComponentComponent } from './user-management-component/user-management-component.component';
import { ExitComponentComponent } from './exit-component/exit-component.component';

import { LoginGuard } from './login.guard';
import { AuthService } from './auth.service';

import { LEDComponent } from './led/led.component';
import { FSComponent } from './fs/fs.component';
import { ACComponent } from './ac/ac.component';



const mgtChildrenRoutes: Routes = [
  { path: 'product', component: ProductComponentComponent },
  { path: 'product-detail', component: ProductDetailComponentComponent },
  { path: 'product-management', component: ProductManagementComponentComponent },
  { path: 'user-management', component: UserManagementComponentComponent },
  { path: 'exit', component: ExitComponentComponent },
  { path: 'led', component: LEDComponent },
  { path: 'fs', component: FSComponent },
  { path: 'ac', component: ACComponent },
  { path: '', redirectTo: 'user', pathMatch: 'full' }
];

const routes: Routes = [
  { path: 'home', component: HomeComponentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponentComponent },
  {
    path: 'management',
    component: ManagementComponentComponent,
    children: mgtChildrenRoutes,
    canActivate: [LoginGuard]

  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    LoginComponentComponent,
    ManagementComponentComponent,
    ProductComponentComponent,
    ProductDetailComponentComponent,
    ProductManagementComponentComponent,
    UserManagementComponentComponent,
    ExitComponentComponent,
    LEDComponent,
    FSComponent,
    ACComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // NgxEchartsModule
  ],
  providers: [LoginGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
