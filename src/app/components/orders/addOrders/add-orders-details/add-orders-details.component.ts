import { Component } from '@angular/core';
import { EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { BackendService } from '../../../../services/backend.service';
import { CustomersComponent } from '../../../customers/customers.component';

@Component({
  selector: 'app-add-orders-details',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    CustomersComponent
  ],
  templateUrl: './add-orders-details.component.html',
  styleUrl: './add-orders-details.component.scss'
})
export class AddOrdersDetailsComponent {

  @Input() action: string='';
  @Input() data:any;
  @Input() customer:any;
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter();
  color:string='primary';
  backend=inject(BackendService);
  selectCust:boolean=false;
  btn:string='SELECT FROM LIST';
 

  status = [
    {id:1, status:'Pending'},
    {id:2, status:'Processed'},
    {id:3, status:'Shipped'}
  ];

  ngOnInit(): void {

    this.orderform.controls.customer.disable();

    if (this.data) {
      this.orderform.controls.customer.setValue(this.data.customer.id);
      this.orderform.controls.id.setValue(this.data.id);
      this.orderform.controls.status.setValue(this.data.orderStatus.id);
    }
    if (this.action=="remove") {
      this.orderform.controls.id.disable();
      this.orderform.controls.status.disable();
      this.color='warn';
    }
  }

  private fb = inject(FormBuilder);
  orderform = this.fb.group({
    customer: [null, Validators.required],
    id: [null],
    status: [null, Validators.required],
  });

  submintClick(): void {
      this.onSubmit.emit({
        customerId:this.orderform.controls.customer.value,
        orderStatusId:this.orderform.controls.status.value
      });
  }


  selectClickCustomer(element:any):void {
    this.orderform.controls.customer.setValue(element);
    this.selectCustomer();
  }

  selectCustomer() {
  this.selectCust = !this.selectCust;
    if (this.btn=='SELECT FROM LIST') {
       this.btn='CANCEL';
    }else{
      this.btn='SELECT FORM LIST';
    }
  }

  cancelClick(): void {
    this.onCancel.emit();
  }


}
