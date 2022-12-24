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
  email!: string;
  password!: string;
  submitted = false;
  errorMessage = '';
  isLoggedin = false;
  isLoginFailed = false;
  
  // form = new FormGroup({  
  //   email : new FormControl('' , Validators.required),  
  //   password : new FormControl('' , Validators.required)  
  // }); 

  constructor(private authService: AuthService, private router: Router) { }  

  ngOnInit() { 
    // if(this.authService.isLoggedIn())
    // {
    //   this.router.
    // }
  }  


  onSubmit() {
    console.log("Try to login " + this.email + " " + this.password);
    this.submitted = true;
    this.authService.login(this.email, this.password).subscribe(
      data => {
        this.isLoggedin = true
        console.log("After Login " + data.roles);
        if(data.roles=="ADMIN"){
          this.router.navigate(['/admin']);
        }
        
      },
      error => {
        console.log(error);
        this.errorMessage = error;
        this.isLoggedin = false;
        this.isLoginFailed = true;
      }
    );
  }
}
