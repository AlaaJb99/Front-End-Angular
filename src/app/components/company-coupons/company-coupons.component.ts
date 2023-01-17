import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { Coupon } from 'src/app/models/coupon.model';
import { CompanyService } from 'src/app/services/company/company.service';
import { CouponService } from 'src/app/services/coupon/coupon.service';

@Component({
  selector: 'app-company-coupons',
  templateUrl: './company-coupons.component.html',
  styleUrls: ['./company-coupons.component.css']
})
export class CompanyCouponsComponent implements OnInit {
  coupons!: Coupon[];
  private company: Company = new Company;
  constructor(private router: Router, private companyService: CompanyService, private couponService: CouponService) { }

  ngOnInit(): void {
    this.company = JSON.parse(sessionStorage.getItem("company") + "");
    this.couponService.getCompanyCoupons(Number(this.company.id)).subscribe(coupondata => {
      this.coupons = coupondata;
    })
  }

  deleteCoupon(coupon: Coupon) {
    this.coupons.forEach((co, index) => {
      if (co == coupon) this.coupons.splice(index, 1);
    })
    // call the customer service to delete the 
    this.couponService.deleteCoupon(coupon);
  }

  editCoupon(coupon: Coupon) {
    sessionStorage.setItem("coupon", JSON.stringify(coupon));
    this.router.navigate(['/company/edit-coupon']);
  }

}
