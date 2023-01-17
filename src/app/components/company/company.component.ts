import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  home = false;
  companyLogged: Company | undefined;
  isLoggedIn = false;
  welcome: string | null | undefined;
  company: any;

  constructor(private authService: AuthService, private companyService: CompanyService,  private router: Router) {
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
    this.company = this.companyService.getLoggedInCompany().subscribe(data => {
      this.companyLogged = JSON.parse(sessionStorage.getItem("company") + "");
      this.welcome = data.name;
    });
    if (this.router.url == "/company") {
      this.home = true;
    }
    else {
      this.home = false;
    }
  }

  logOut() {
    this.authService.logout();
  }


}
