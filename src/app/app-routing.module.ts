import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminstratorComponent } from './components/adminstrator/adminstrator.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomersComponent } from './components/customers/customers.component';
import { LoginComponent } from './components/login/login.component';
import { NewCustomerComponent } from './components/new-customer/new-customer.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'customer', component: CustomerComponent },
  {path: 'home', component: CustomerComponent },
  {
    path: 'admin', 
    component: AdminstratorComponent,
    children:[
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path:'newcustomer',
        component: NewCustomerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
