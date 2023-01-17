import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-adminstrator',
  templateUrl: './adminstrator.component.html',
  styleUrls: ['./adminstrator.component.css']
})
export class AdminstratorComponent implements OnInit {
  home = false;
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.home = false;
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (!this.isLoggedIn) {
      this.authService.logout();
    }
    if (this.router.url == "/admin") {
      this.home = true;
    }
    else {
      this.home = false;
    }
  }



  logOut() {
    this.isLoggedIn = false;
    this.authService.logout();
  }
}
