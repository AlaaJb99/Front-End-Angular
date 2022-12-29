import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-adminstrator',
  templateUrl: './adminstrator.component.html',
  styleUrls: ['./adminstrator.component.css']
})
export class AdminstratorComponent implements OnInit {

  isLoggedIn = false;
  isCustomers = false;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if(!this.isLoggedIn)
    {
      this.authService.logout();
    }
   }
}
