import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminstratorComponent } from './components/adminstrator/adminstrator.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'customer', component: CustomerComponent },
  {path: 'home', component: CustomerComponent },
  {path: 'admin', component: AdminstratorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
