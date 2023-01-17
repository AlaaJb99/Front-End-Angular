import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CouponService } from 'src/app/services/coupon/coupon.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.css']
})
export class ChooseCategoryComponent implements OnInit {

  categoriesForm!: FormGroup;
  allCategories!: string[];
  noSelected = false


  constructor(private couponService: CouponService, private formBuilder: FormBuilder, private router: Router) {
    this.categoriesForm = this.formBuilder.group({ selectedCategories: new FormArray([]) });
  }

  ngOnInit() {
    this.allCategories = this.couponService.categories;
    // this.couponService.getAll().forEach(coupon=>{

    // })
  }

  onCheckboxChange(event: any) {

    const selectedCategories = (this.categoriesForm.controls['selectedCategories'] as FormArray);

    if (event.target.checked) {
      selectedCategories.push(new FormControl(event.target.value));
      this.noSelected = false;
    } else {
      const index = selectedCategories.controls
        .findIndex(x => x.value === event.target.value);
      selectedCategories.removeAt(index);
      if (selectedCategories.length == 0) {
        this.noSelected = true;
      }
    }
  }

  onSubmit() {
    if (this.categoriesForm.invalid) {
      return;
    }
    const selectedCategories = (this.categoriesForm.controls['selectedCategories'] as FormArray);
    if (selectedCategories.length == 0) {
      this.noSelected = true;
    } else {
      this.noSelected = false;
      sessionStorage.setItem("choosedcategories", JSON.stringify(selectedCategories.value));
      console.log(selectedCategories);
      this.router.navigate(['/customer/coupons']);
    }
  }
}
