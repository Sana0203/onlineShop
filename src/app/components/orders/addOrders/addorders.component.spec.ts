import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddordersComponent } from './addorders.component';

describe('AddordersComponent', () => {
  let component: AddordersComponent;
  let fixture: ComponentFixture<AddordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddordersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
