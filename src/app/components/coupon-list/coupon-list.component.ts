import { Component, OnInit } from '@angular/core';
import { Coupon } from '../../models/coupon.model';
import { CouponService } from '../../services/coupon/coupon.service';

@Component({
  selector: 'coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent implements OnInit {
  coupons!: Coupon[];

  constructor(private couponService: CouponService) {
  }

  ngOnInit() {
    this.couponService.getAll().subscribe(data => {
      this.coupons = data;
    });
  }

}
