import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company/company.service';
import { CouponService } from 'src/app/services/coupon/coupon.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  href!: string;
  coupon: any;
  purchased = false;
  companyName!: string;
  couponTitle!: string;
  couponDetails!: string;
  couponStartDate!: string;
  couponEndDate!: string;
  category!: string;
  price: string = "";

  constructor(private couponService: CouponService, private router: Router, private companyService: CompanyService) {
    this.href = this.router.url;
  }

  ngOnInit(): void {


    if (this.href == '/customer/details') {
      this.purchased = true;
    } else {
      this.purchased = false;
    }
    // this.coupon = this.router.getCurrentNavigation()?.extras.state;

    this.couponService.getCoupon(Number(sessionStorage.getItem("couponId"))).subscribe(coupon => {
      this.coupon = coupon;
      console.log(coupon);
      this.couponTitle = this.coupon.title;
      this.couponDetails = this.coupon.description;
      this.couponStartDate = this.coupon.startDate;
      this.couponEndDate = this.coupon.endDate;
      this.category = this.coupon.category;
      this.price = this.coupon.price + "$";
      this.companyService.getCompanyNameWithId(this.coupon.companyID).subscribe(data => {
        console.log(data);
        this.companyName = data + "";
      });
      this.couponService.isPurchased(this.coupon.id).subscribe(data => {
        this.purchased = false;
      }, error => {
          this.purchased = true;
      })
    });



  }

  purchaseCoupon() {
    this.couponService.purchaseCoupon(this.coupon.id).subscribe(data => {
      this.purchased = false;
      this.router.navigate(['/customer/purchased']);
    }, error => {
      if (error == 400) {
        this.purchased = true;
      }
    });
  }
}
