import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Coupon } from '../../models/coupon.model';
import { CouponService } from '../../services/coupon/coupon.service';

@Component({
  selector: 'coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent implements OnInit {
  href!: string;
  coupons!: Coupon[];
  purchasedPage = false;
  couponPurchased = false;
  searchInput!: any;// = new FormControl('', Validators.required);
  empty = false;

  constructor(private couponService: CouponService, private customerService: CustomerService, private router: Router) {
    this.href = this.router.url;
  }

  ngOnInit() {
    if (this.href == '/customer/coupons') {
      this.purchasedPage = false;
      if (sessionStorage.getItem("choosedcategories") == null) {
        console.log("in coupon list");
        this.couponService.getRecommendedCoupons().subscribe(data => {
          this.coupons = data;
        }, error => {
          if (error.status == 400) {
            console.error(error.message);
            this.router.navigate(['/customer/chooseCategory']);
          }
        });
      }
      else {
        this.couponService.getCouponsCategories().subscribe(data => this.coupons = data);
      }
    }
    else {
      this.couponService.getPurchasedCoupons().subscribe(data => {
        this.purchasedPage = true;
        this.coupons = data;
      })
    }
  }

  searchCoupon() {
    if (this.searchInput.invalid) {
      return;
    }
    console.log(this.searchInput);
    this.couponService.searchCoupon(this.searchInput).subscribe(data => {
      this.coupons = data;
      if (this.coupons.length == 0) {
        this.empty = true;
      }
      else {
        this.empty = false;
      }
    });
  }


  // deletePurchased(coupon: Coupon) {
  //   this.coupons.forEach((cus, index) => {
  //     if (cus == coupon) this.coupons.splice(index, 1);
  //   });
  //   this.couponService.deletePurchasedCoupon(coupon.id);
  // }

  purchaseCoupon(coupon: Coupon) {
    this.couponService.purchaseCoupon(coupon.id).subscribe(data => {
      this.couponPurchased = false;
      this.router.navigateByUrl('/customer/purchased');
    }, error => {
      if (error.status == 400) {
        console.log("already purchased")
        this.couponPurchased = true;
      }
    });
  }

  viewCoupon(coupon: Coupon) {
    sessionStorage.setItem("couponId", coupon.id?.toString() + "");
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     id: coupon.id,
    //     companyID: coupon.companyID,
    //     title: coupon.title,
    //     description: coupon.description,
    //     category: coupon.category,
    //     startDate: coupon.startDate,
    //     endDate: coupon.endDate,
    //     amount: coupon.amount,
    //     price: coupon.price
    //   }
    // }
    if (this.href == '/customer/coupons') {
      this.router.navigate(['/customer/coupon']);//, navigationExtras);
    } else {
      this.router.navigate(['/customer/details']);//, navigationExtras);
    }
    //this.router.navigate(['/customer/coupon']);
  }


}
