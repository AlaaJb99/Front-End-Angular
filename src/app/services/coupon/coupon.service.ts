import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coupon } from '../../models/coupon.model';
const baseUrl = 'http://localhost:5050/api/coupons';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(baseUrl);
  }

  get(id: any): Observable<Coupon> {
    return this.http.get(`${baseUrl}/${id}`);
  }

}
