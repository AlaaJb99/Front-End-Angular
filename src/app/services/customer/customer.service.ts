import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { AuthService } from '../auth/auth.service';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:5050/api/customers';
  logedInCustomer?: Customer;


  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  getAllCustomers(): Observable<any> {
    console.log("Get all Customers");
    return this.http.get(this.baseUrl + "/admin");
  }

  //send delete requestv to the Customer Service server
  deleteCustomer(customer: Customer) {
    const options = {
      headers: headers,
      body: customer
    };
    console.log("send DELETE http request")
    return this.http.delete<any>(this.baseUrl + "/admin", options).subscribe();
  }

  addNewCustomer(customer: Customer) {
    return this.http
      .post(this.baseUrl + "/admin", customer, { headers });
  }

  editCustomer(customer: Customer) {
    return this.http.put(this.baseUrl + "/admin", customer, { headers });
  }

  getLoggedInCustomer() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("email", sessionStorage.getItem("email")+"");
    return this.http.get<any>(this.baseUrl + "/customer", { params: queryParams }).
      pipe(map((data: Customer) => {
        sessionStorage.setItem("customer", JSON.stringify(data));
        sessionStorage.setItem("id", data.id?.toString() + "");
        sessionStorage.setItem("firstName", data.firstName + "");
        sessionStorage.setItem("lastName", data.lastName + "");
        //this.logedInCustomer = data;
        return data;
      })
      );
  }
}
