import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpClient } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AuthInterceptor } from './_helpers/http.interceptor';
import { CouponListComponent } from './components/coupon-list/coupon-list.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { AdminstratorComponent } from './components/adminstrator/adminstrator.component';
import { CustomersComponent } from './components/customers/customers.component';
import { NewCustomerComponent } from './components/new-customer/new-customer.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { NewCompanyComponent } from './components/new-company/new-company.component';
import { CompanyComponent } from './components/company/company.component';
import { NewCouponComponent } from './components/new-coupon/new-coupon.component';
import { CompanyCouponsComponent } from './components/company-coupons/company-coupons.component';
import { ChooseCategoryComponent } from './components/choose-category/choose-category.component';
import { CustomerService } from './services/customer/customer.service';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerComponent,
    CouponListComponent,
    CouponComponent,
    AdminstratorComponent, CustomersComponent, NewCustomerComponent, CompaniesComponent, NewCompanyComponent, CompanyComponent, NewCouponComponent, CompanyCouponsComponent, ChooseCategoryComponent, CustomerProfileComponent, CompanyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
