import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies!: Company[];

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.companyService.getAllCompanies().subscribe(data => {
      this.companies = data;
    });
  }

  deleteCompany(company: Company) {
    this.companies.forEach((cus, index) => {
      if (cus == company) this.companies.splice(index, 1);
    })
    // call the customer service to delete the 
    this.companyService.deleteCompany(company);
  }

  // send a PUT request to the Customer server
  editCompany(company: Company) {
    //navigate to the edit Customer Page
    // we can go to the add form and fill the given customer details in the form inputs
    sessionStorage.setItem("company", JSON.stringify(company));
    this.router.navigate(['/admin/edit-company']);
  }

}
