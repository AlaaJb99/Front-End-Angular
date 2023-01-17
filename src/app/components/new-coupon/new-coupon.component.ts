import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon.model';
import { CompanyService } from 'src/app/services/company/company.service';
import { CouponService } from 'src/app/services/coupon/coupon.service';

@Component({
  selector: 'app-new-coupon',
  templateUrl: './new-coupon.component.html',
  styleUrls: ['./new-coupon.component.css']
})
export class NewCouponComponent {
  href!: string;
  form = "";
  isEditForm = false
  categories = ["Food", "Furniture", "Clothing", "Electricity", "Electronics"];
  category = ""
  submitted = false;
  couponExists = false;
  couponForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required])
  })

  constructor(private router: Router, private companyService: CompanyService, private couponService: CouponService) {
    this.href = this.router.url;
    this.couponForm.controls.id.disable();
    this.categories = couponService.categories;
    if (this.href == '/company/edit-coupon') {
      var coupon: any;
      this.form = "Edit Coupon";
      coupon = JSON.parse(sessionStorage.getItem("coupon") + "");
      this.isEditForm = true;
      this.couponForm.controls.id.setValue(coupon.id);
      this.couponForm.controls.title.setValue(coupon.title);
      this.couponForm.controls.description.setValue(coupon.description);
      this.category = coupon.category;
      this.couponForm.controls.category.setValue(coupon.category);
      this.couponForm.controls.startDate.setValue(coupon.startDate);
      this.couponForm.controls.endDate.setValue(coupon.endDate);
      this.couponForm.controls.amount.setValue(coupon.amount);
      this.couponForm.controls.price.setValue(coupon.price);
    } else {
      this.form = "Add New Coupon";
      this.isEditForm = false;
    }
  }

  get f() {
    return this.couponForm.controls;
  }

  onSubmit() {
    var coupon = new Coupon;
    this.submitted = true;
    if (this.couponForm.invalid) {
      return;
    }
    console.log(this.couponForm.value);
    coupon.id = 0;
    coupon.companyID = Number((JSON.parse(sessionStorage.getItem("company") + "")).id);
    coupon.title = this.couponForm.controls.title.value;
    coupon.description = this.couponForm.controls.description.value;
    coupon.category = this.couponForm.controls.category.value;
    coupon.startDate = this.couponForm.controls.startDate.value;
    console.log(coupon.startDate);
    coupon.endDate = this.couponForm.controls.endDate.value;
    coupon.amount = Number(this.couponForm.controls.amount.value);
    coupon.price = Number(this.couponForm.controls.price.value);
    if (this.href == '/company/edit-coupon') {
      coupon.id = Number(this.couponForm.controls.id.value);
      console.log(coupon.id);
      console.log(coupon.companyID);
      this.couponService.editCoupon(coupon).subscribe(data => {
        this.couponExists = false;
        sessionStorage.removeItem("coupon");
        this.router.navigate(['/company/coupons']);
      }, error => {
        if (error == 400) {
          console.error(error.message);
          this.couponExists = true;
        }
      });
    }
    else {
      this.couponService.addNewCoupon(coupon).subscribe(data => {
        this.couponExists = false;
        this.router.navigate(['/company/coupons']);
      }, error => {
        if (error == 400) {
          console.error(error.message);
          this.couponExists = true;
        }
      })
    }
  }
}
