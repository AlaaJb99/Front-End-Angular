import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  company: Company = new Company;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getLoggedInCompany()
      .subscribe(data => {
        this.company = data;
      });
  }

}
