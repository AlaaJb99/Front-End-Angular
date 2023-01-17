import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { AuthService } from '../../services/auth/auth.service';
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {
  href!: string;
  isLoggedIn = false;
  welcom = "";
  cu: Customer | undefined;

  constructor(private authService: AuthService, private customerService: CustomerService, private router: Router, private route: ActivatedRoute) {
    this.href = this.router.url;
   }

  ngOnInit(): void {
    console.log("in customer home");
    if (!this.authService.isLoggedIn()) {
      this.authService.logout();
    } else {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.customerService.getLoggedInCustomer().subscribe(data => {
        console.log("get logged in customer");
        this.cu = data;
        this.welcom = sessionStorage.getItem("firstName")+" "+sessionStorage.getItem("lastName");
        if (this.href == '/customer'){
          this.router.navigate(['/customer/coupons']);
        }
      });
      this.welcom = sessionStorage.getItem("firstName")+" "+sessionStorage.getItem("lastName");
    }

  }

  logOut() {
    this.authService.logout();
  }
}
