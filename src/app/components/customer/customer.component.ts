import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  isSignedin = false;

	signedinUser: string = '';

	greeting: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private authService: AuthService, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.isSignedin = this.authService.isLoggedIn();
    this.signedinUser = this.authService.getSignedinUser();

    if(!this.authService.isLoggedIn()) {
			this.router.navigateByUrl('login');
		}
    
    if(this.isSignedin) {
      console.log("HII");
			// this.greetingService.getByUserRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/user - You are not authorize'));
			// this.greetingService.getByAdminRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/admin - You are not authorized'));
			// this.greetingService.getByUserOrAdminRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/userOrAdmin - You are not authorized'));
			// this.greetingService.getByAnonymousRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/anonymous - You are not authorized'));
		}
  }


}
