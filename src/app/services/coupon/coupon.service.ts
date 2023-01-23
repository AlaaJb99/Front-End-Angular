import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Coupon } from '../../models/coupon.model';
import { Router } from '@angular/router';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private baseUrl = 'http://localhost:5050/api/coupons';
  categories = ["Food", "Furniture", "Clothing", "Electricity", "Electronics", "Cosmetics", "Resturant", "Education", "Health"];
  favoriteCategories!: string[];
  companyCoupons!: Coupon[];
  customerRecommendedCoupons!: Coupon[];
  responseSubject!: BehaviorSubject<any>;

  constructor(private http: HttpClient, private router: Router) { 
    this.responseSubject = new BehaviorSubject(null);
  }

  get response$(){
    return this.responseSubject.asObservable();
  }

  setResponse(response: any): void {
      this.responseSubject.next(response);
  }

  getAll(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.baseUrl);
  }

  searchCoupon(search: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("search", search);
    return this.http.get<any>(this.baseUrl + "/customer/search", { params: queryParams })
      .pipe(
        map((data: Coupon[]) => { return data; }));
  }

  getCoupon(couponId: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("couponId", couponId);
    return this.http.get(this.baseUrl + "/customer", { params: queryParams })
      .pipe(map((data: Coupon) => {
        return data;
      }));
  }


  getCompanyCoupons(id: number): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get(this.baseUrl + "/company", { params: queryParams });
  }

  editCoupon(coupon: Coupon) {
    return this.http.put(this.baseUrl + "/company", coupon, { headers });
  }

  addNewCoupon(coupon: Coupon) {
    return this.http
      .post(this.baseUrl + "/company", coupon, { headers });
  }

  //send delete requestv to the Customer Service server
  deleteCoupon(coupon: Coupon) {
    const options = {
      headers: headers,
      body: coupon
    };
    console.log("send DELETE http request")
    return this.http.delete<any>(this.baseUrl + "/company/coupon", options).subscribe();
  }

  getRecommendedCoupons() {
    let queryParams = new HttpParams();
    console.log(sessionStorage.getItem("id"));
    queryParams = queryParams.append("customerId", Number(sessionStorage.getItem("id")));
    return this.http.get<any>(this.baseUrl + "/recommended", { params: queryParams }).pipe(map((recommendedCoupons: Coupon[]) => {
      return recommendedCoupons;
    }));
  }

  getCouponsCategories() {
    let queryParams = new HttpParams();
    this.favoriteCategories = JSON.parse(sessionStorage.getItem("choosedcategories") || '{}');
    console.log(this.favoriteCategories);
    queryParams = queryParams.append("categories", this.favoriteCategories.join(', '));
    return this.http.get<any>(this.baseUrl + "/categories", { params: queryParams }).pipe(map(data => {
      console.log(data);
      return data;
    }));
  }

  purchaseCoupon(couponId: any) {
    let purchaseCpoupon = {
      customerId: Number(sessionStorage.getItem("id")),
      couponId: couponId
    }
    return this.http.post(this.baseUrl + "/customer/purchase", purchaseCpoupon, { headers });
  }

  isPurchased(couponId: any){
    let purchaseCpoupon = {
      customerId: Number(sessionStorage.getItem("id")),
      couponId: couponId
    }
    return this.http.post(this.baseUrl + "/customer/ispurchase", purchaseCpoupon, { headers });
  }

  getPurchasedCoupons() {
    let queryParams = new HttpParams();
    let id = Number(sessionStorage.getItem("id"));
    queryParams = queryParams.append("customerId", id);
    return this.http.get<any>(this.baseUrl + "/customer/purchase", { params: queryParams }).pipe(map(data => {
      return data.coupon;
    }));
  }
}
