import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrdersDetailsComponent } from './add-orders-details.component';

describe('AddOrdersDetailsComponent', () => {
  let component: AddOrdersDetailsComponent;
  let fixture: ComponentFixture<AddOrdersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrdersDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrdersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
