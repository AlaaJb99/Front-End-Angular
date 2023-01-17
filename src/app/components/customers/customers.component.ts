import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer/customer.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers!: Customer[];

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    // var customer;
    // customer = new Customer(2066, "Alaa", "Jba", "alaa", "123");
    //this.customers.push(customer);
    this.customerService.getAllCustomers().subscribe(data => {
      this.customers = data
    });
  }

  deleteCustomer(customer: Customer) {
    this.customers.forEach((cus, index) => {
      if (cus == customer) this.customers.splice(index, 1);
    })
    // call the customer service to delete the 
    this.customerService.deleteCustomer(customer);
  }

  // send a PUT request to the Customer server
  editCustomer(customer: Customer) {
    //navigate to the edit Customer Page
    // we can go to the add form and fill the given customer details in the form inputs
    console.log(customer.id);
    sessionStorage.setItem("customer", JSON.stringify(customer));
    this.router.navigate(['/admin/edit-customer']);
  }

}
