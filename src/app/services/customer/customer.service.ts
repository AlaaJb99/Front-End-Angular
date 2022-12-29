import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:5050/api/customers';
  constructor(private http: HttpClient, private router: Router) { }

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
    let body = JSON.stringify(customer);
    // var item = {
    //   "id": customer["id"],
    //   "firstName": customer["firstName"],
    //   "lastName": customer["lastName"],
    //   "email": customer["email"],
    //   "password":customer["password"]
    //  }
    console.log(body)
    return this.http
      .post(this.baseUrl + "/admin", customer,{headers});
  }
}
