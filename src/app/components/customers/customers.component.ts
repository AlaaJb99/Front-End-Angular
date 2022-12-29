import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer/customer.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers!: Customer[];//={ id: 2066, firstName: "Alaa", lastName:"Jba", email:"aaa", password:"123"};

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    // var customer;
    // customer = new Customer(2066, "Alaa", "Jba", "alaa", "123");
    //this.customers.push(customer);
    this.customerService.getAllCustomers().subscribe(data => {
      this.customers = data
    });
  }

  //getAllCustomers() {  }

  
  deleteCustomer(customer: Customer){
    this.customers.forEach((cus, index)=>{
      if(cus==customer) this.customers.splice(index,1);
    })
    // call the customer service to delete the 
    this.customerService.deleteCustomer(customer);
  }

  // send a PUT request to the Customer server
  editCustomer(customer: Customer){
    //navigate to the edit Customer Page
    // we can go to the add form and fill the given customer details in the form inputs
  }

  //new Customere component
  addCustomer(customer: Customer){
    this.customerService.addNewCustomer(customer);
  }
}
