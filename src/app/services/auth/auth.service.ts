import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl = 'http://localhost:5050/auth/';
  loggedUserEmail: any;
  loggedUserPassword: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    console.log('In AuthService -  login');
    return this.http
      .post<any>(this.baseUrl + "login", { email, password }, { headers })
      .pipe(catchError(this.handleError),
        map(userData => {
          console.log(userData.roles);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("password", password);
          let tokenStr = "Bearer " + userData.token;
          console.log("Token---  " + tokenStr);
          sessionStorage.setItem("token", tokenStr);
          sessionStorage.setItem("roles", userData.roles);
          //sessionStorage.setItem("roles", JSON.stringify(userData.roles));
          this.loggedUserEmail = email;
          this.loggedUserPassword = password;
          return userData;
        }));
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    //console.clear();
    this.router.navigate(['/login']);
  }

  getEmail() {
    return sessionStorage.getItem("email") + "";
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('token') !== null;
    //   const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    // return expiry * 1000 > Date.now();
  }



  private handleError(httpError: HttpErrorResponse) {
    let message: string = '';

    if (httpError.error instanceof ProgressEvent) {
      console.log('in progrss event')
      message = "Network error";
    }
    else {
      message = httpError.error.message;
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${httpError.status}, ` +
        `body was: ${httpError.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(message);
  }

  getSignedinUser() {
    return sessionStorage.getItem('email') as string;
  }

  getToken() {
    let token = sessionStorage.getItem('token') as string;
    return token;
  }
}
