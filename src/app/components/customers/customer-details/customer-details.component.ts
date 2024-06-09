import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BackendService } from '../../../services/backend.service';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent implements OnInit{

  @Input() action: string='';
  @Input() data:any;
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter();
  color:string='primary';
  backend=inject(BackendService);
  

  ngOnInit(): void {
    if (this.data) {
      this.customerform.controls.name.setValue(this.data.name);
      this.customerform.controls.email.setValue(this.data.email);
      this.customerform.controls.gender.setValue(this.data.gender);
      this.customerform.controls.phone.setValue(this.data.phone);
      this.customerform.controls.date_of_birth.setValue(this.data.dateOfBirth);
      this.customerform.controls.city.setValue(this.data.city);
      this.customerform.controls.street.setValue(this.data.street);
      this.customerform.controls.province.setValue(this.data.province);
      this.customerform.controls.postal_code.setValue(this.data.postalCode);
    }
    if (this.action=="remove") {
      this.customerform.controls.name.disable();
      this.customerform.controls.email.disable();
      this.customerform.controls.phone.disable();
      this.customerform.controls.gender.disable();
      this.customerform.controls.date_of_birth.disable();
      this.customerform.controls.city.disable();
      this.customerform.controls.province.disable();
      this.customerform.controls.postal_code.disable();
      this.customerform.controls.street.disable();
      this.color='warn';
    }
  }

  private fb = inject(FormBuilder);
  customerform = this.fb.group({
    name: [null, Validators.required],
    email: [null , Validators.email],
    gender: null,
    phone: [null],
    date_of_birth: [null],
    city: null,
    street: null,
    province: null,
    postal_code: [null, Validators.compose([Validators.minLength(6), Validators.maxLength(6)])
    ]
  });

  submintClick(): void {
      this.onSubmit.emit({
        name:this.customerform.controls.name.value,
        email:this.customerform.controls.email.value,
        phone:this.customerform.controls.phone.value,
        gender:this.customerform.controls.gender.value,
        dateOfBirth:this.customerform.controls.date_of_birth.value,
        city:this.customerform.controls.city.value,
        province:this.customerform.controls.province.value,
        street:this.customerform.controls.street.value,
        postalCode:this.customerform.controls.postal_code.value,
      });
  }
  cancelClick(): void{
    this.onCancel.emit();
  }
}
