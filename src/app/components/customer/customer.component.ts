import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Coupon } from 'src/app/models/coupon.model';
import { Customer } from 'src/app/models/customer.model';
import { CouponService } from 'src/app/services/coupon/coupon.service';
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
  categories: string[] = [];
  categoriesForm!: FormGroup;
  coupons!: Coupon[];

  constructor(private authService: AuthService, private customerService: CustomerService, private router: Router, private route: ActivatedRoute, private couponService: CouponService, private formBuilder: FormBuilder) {
    this.href = this.router.url;
    this.categoriesForm = this.formBuilder.group({ selectedCategories: new FormArray([]) });
  }

  ngOnInit(): void {
    this.categories = this.couponService.categories;
    console.log("in customer home");
    if (!this.authService.isLoggedIn()) {
      this.authService.logout();
    } else {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.customerService.getLoggedInCustomer().subscribe(data => {
        console.log("get logged in customer");
        this.cu = data;
        this.welcom = sessionStorage.getItem("firstName") + " " + sessionStorage.getItem("lastName");
        if (this.href == '/customer') {
          this.router.navigate(['/customer/coupons']);
        }
      });
      this.welcom = sessionStorage.getItem("firstName") + " " + sessionStorage.getItem("lastName");
    }

  }

  onInputChange(event: any) {
    const selectedCategories = (this.categoriesForm.controls['selectedCategories'] as FormArray);

    if (event.target.checked) {
      selectedCategories.push(new FormControl(event.target.value));
    } else {
      const index = selectedCategories.controls
        .findIndex(x => x.value === event.target.value);
      selectedCategories.removeAt(index);
    }
    sessionStorage.setItem("choosedcategories", JSON.stringify(selectedCategories.value));
    this.couponService.getCouponsCategories().subscribe(data => {
      this.coupons = data;
      this.couponService.setResponse(this.coupons);
    });

  }

  logOut() {
    this.authService.logout();
  }
}
