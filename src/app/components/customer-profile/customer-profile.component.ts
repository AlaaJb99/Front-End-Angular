import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  customer!:Customer;
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getLoggedInCustomer()
      .subscribe(data => {
        this.customer = data;
      });
  }

}
