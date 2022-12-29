import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.authService.isLoggedIn() && this.authService.getToken()) {
            //console.log('With Token --- ' + sessionStorage.getItem('token'));
            const request = req.clone({
                headers: new HttpHeaders({
                    'Authorization': this.authService.getToken()
                })
            });
            return next.handle(request).pipe(catchError(err => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    console.log("logout");
                    this.authService.logout();
                }
                else if(err.status === 403){
                     this.authService.logout();
                }
                return throwError(err);
            }));
        }
        return next.handle(req);
    }
}