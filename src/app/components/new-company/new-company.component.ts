import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company/company.service';

// Patterns
const PAT_NAME = "^[a-zA-Z ]{2,20}$";

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css']
})
export class NewCompanyComponent {
  href!: string;
  isEditForm = false
  submitted = false;
  userExists = false;
  companyForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private companyService: CompanyService, private router: Router) {
    this.href = this.router.url;
    this.companyForm.controls.id.disable();
    if (this.href == '/admin/edit-company') {
      //console.log(this.router.url)
      this.isEditForm = true;
      var company: any;
      company = JSON.parse(sessionStorage.getItem("company") + "");
      this.companyForm.controls.id.setValue(company.id);
      //this.companyForm.controls.id.disable();
      this.companyForm.controls.name.setValue(company.name);
      this.companyForm.controls.name.disable();
      this.companyForm.controls.email.setValue(company.email);
      this.companyForm.controls.password.setValue(company.password);
    }
    else {
      this.isEditForm = false;
    }

  }

  get f() {
    return this.companyForm.controls;
  }

  onSubmit() {
    var company = new Company;
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    }
    console.log(this.companyForm.value);
    company.id = 0;
    company.name = this.companyForm.controls.name.value
    company.email = this.companyForm.controls.email.value
    company.password = this.companyForm.controls.password.value
    // call the customer service to make a post request
    if (this.href == '/admin/edit-company') {
      this.companyService.editCompany(company).subscribe(data => {
        console.log(data + " Edited");
        this.userExists = false;
        sessionStorage.removeItem("company");
        this.router.navigate(['/admin/companies']);
      }, error => {
        if (error.status == 400) {
          console.error(error.message);
          this.userExists = true;
        }
      });
    }
    else {
      this.companyService.addNewCompany(company).subscribe(data => {
        console.log(data + " Added");
        this.userExists = false;
        this.router.navigate(['/admin/companies']);
      }, error => {
        if (error.status == 400) {
          console.error(error.message);
          this.userExists = true;
        }
      });
    }
  }

  namePress(event: any) {
    const pattern = /[a-zA-Z]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
