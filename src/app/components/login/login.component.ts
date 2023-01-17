import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // email!: string;
  // password!: string;
  form: any = {};
  isLoggedin = false;
  isLoginFailed = false;
  errorMessage = '';
  submitted = false;
  
  

  constructor(private authService: AuthService, private router: Router) { }
  

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate([this.getLoggedInRole()]);
    }
  }


  onSubmit() {
    this.submitted = true;
    this.authService.login(this.form.email, this.form.password).subscribe(
      data => {
        this.isLoggedin = true
        //console.log("After Login " + data.roles);
        this.router.navigate([this.getLoggedInRole()]);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoggedin = false;
        this.isLoginFailed = true;
      }
    );
  }

  getLoggedInRole() {
    const role = sessionStorage.getItem("roles");
    switch (role) {
      case "ADMIN": {
        return '/admin';
      }
      case "COMPANY": {
        return '/company';
      }
      case "CUSTOMER": {
        return '/customer';
      }
      default: {
        return '';
      }
    }
  }
}
