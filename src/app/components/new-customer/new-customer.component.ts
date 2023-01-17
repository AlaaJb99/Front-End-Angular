import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer/customer.service';

// Patterns
const PAT_NAME = "^[a-zA-Z ]{2,20}$";
const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  href!: string;
  submitted = false;
  userExists = false;
  customerForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    firstName: new FormControl('', [Validators.required, Validators.pattern(PAT_NAME)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(PAT_NAME)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private router: Router, private activeRoute: ActivatedRoute) {
    this.href = this.router.url;

    if (this.href == '/admin/edit-customer') {
      console.log(this.router.url)
      var customer: any;
      customer = JSON.parse(sessionStorage.getItem("customer") + "");
      this.customerForm.controls.id.setValue(customer.id);
      this.customerForm.controls.id.disable();
      this.customerForm.controls.firstName.setValue(customer.firstName);
      this.customerForm.controls.lastName.setValue(customer.lastName);
      this.customerForm.controls.email.setValue(customer.email);
      this.customerForm.controls.password.setValue(customer.password);
    }

  }

  ngOnInit() {

  }

  get f() {
    return this.customerForm.controls;
  }

  onSubmit() {
    var customer = new Customer;
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    console.log(this.customerForm.value);
    customer.id = Number(this.customerForm.controls.id.value);
    customer.firstName = this.customerForm.controls.firstName.value
    customer.lastName = this.customerForm.controls.lastName.value
    customer.email = this.customerForm.controls.email.value
    customer.password = this.customerForm.controls.password.value
    // call the customer service to make a post request
    if (this.href == '/admin/edit-customer') {
      this.customerService.editCustomer(customer).subscribe(data => {
        console.log(data + " Edited");
        this.userExists = false;
        sessionStorage.removeItem("customer");
        this.router.navigate(['/admin/customers']);
      }, error => {
        if (error.status == 400) {
          console.error(error.message);
          this.userExists = true;
        }
      });
    }
    else {
      this.customerService.addNewCustomer(customer).subscribe(data => {
        console.log(data + " Added");
        this.userExists = false;
        this.router.navigate(['/admin/customers']);
      }, error => {
        if (error.status == 400) {
          console.error(error.message);
          this.userExists = true;
        }
      });
    }
  }

  idPress(event: any) {
    const pattern = /[0-9 ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  firstLastPress(event: any) {
    const pattern = /[a-zA-Z]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
