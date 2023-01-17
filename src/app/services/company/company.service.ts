import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Company } from 'src/app/models/company.model';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  loggedInCompany: Company = new Company;
  private baseUrl = 'http://localhost:5050/api/companies';
  constructor(private http: HttpClient, private router: Router) { }

  getAllCompanies(): Observable<any> {
    //console.log("Get all Companies");
    return this.http.get(this.baseUrl + "/admin");
  }

  //send delete requestv to the Customer Service server
  deleteCompany(company: Company) {
    const options = {
      headers: headers,
      body: company
    };
    console.log("send DELETE http request")
    return this.http.delete<any>(this.baseUrl + "/admin", options).subscribe();
  }

  addNewCompany(company: Company) {
    return this.http
      .post(this.baseUrl + "/admin", company, { headers });
  }

  editCompany(company: Company) {
    return this.http.put(this.baseUrl + "/admin", company, { headers });
  }

  getLoggedInCompany() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("email", sessionStorage.getItem("email")+"");
    queryParams = queryParams.append("password", sessionStorage.getItem("password")+"");
    return this.http.get<any>(this.baseUrl + "/company", { params: queryParams }).pipe(map((data:Company)=>{
      sessionStorage.setItem("company", JSON.stringify(data));
      return data;
    }));
  
  }

  getCompanyNameWithId(companyId: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("companyId", companyId);
    return this.http.get<any>(this.baseUrl + "/customer", { params: queryParams })
      .pipe(map((data: Company) => { return data.name; }));
  }
}
