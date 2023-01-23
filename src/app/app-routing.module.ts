import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminstratorComponent } from './components/adminstrator/adminstrator.component';
import { ChooseCategoryComponent } from './components/choose-category/choose-category.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyCouponsComponent } from './components/company-coupons/company-coupons.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { CompanyComponent } from './components/company/company.component';
import { CouponListComponent } from './components/coupon-list/coupon-list.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomersComponent } from './components/customers/customers.component';
import { LoginComponent } from './components/login/login.component';
import { NewCompanyComponent } from './components/new-company/new-company.component';
import { NewCouponComponent } from './components/new-coupon/new-coupon.component';
import { NewCustomerComponent } from './components/new-customer/new-customer.component';
import { Customer } from './models/customer.model';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customer', component: CustomerComponent },
  {
    path: 'admin',
    component: AdminstratorComponent,
    children: [
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'newcustomer',
        component: NewCustomerComponent,
      },
      {
        path: 'edit-customer',
        component: NewCustomerComponent,
        data: Customer
      },
      {
        path: 'companies',
        component: CompaniesComponent,
      },
      {
        path: 'newcompany',
        component: NewCompanyComponent,
      },
      {
        path: 'edit-company',
        component: NewCompanyComponent,
        data: Customer
      }
    ]
  },
  {
    path: 'company',
    component: CompanyComponent,
    children: [
      {
        path: 'coupons',
        component: CompanyCouponsComponent,
      },
      {
        path: 'addcoupon',
        component: NewCouponComponent
      },
      {
        path: 'edit-coupon',
        component: NewCouponComponent
      },
      {
        path: 'profile',
        component: CompanyProfileComponent
      }
    ]
  },
  {
    path: 'customer',
    component: CustomerComponent,
    children: [
      {
        path: 'coupons',
        component: CouponListComponent
      },
      {
        path: 'purchased',
        component: CouponListComponent
      },
      {
        path: 'coupon',
        component: CouponComponent
      },
      {
        path: 'details',
        component: CouponComponent
      },
      {
        path: 'chooseCategory',
        component: ChooseCategoryComponent
      },
      {
        path: 'profile',
        component: CustomerProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
