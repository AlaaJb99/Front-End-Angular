import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCouponsComponent } from './company-coupons.component';

describe('CompanyCouponsComponent', () => {
  let component: CompanyCouponsComponent;
  let fixture: ComponentFixture<CompanyCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyCouponsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
