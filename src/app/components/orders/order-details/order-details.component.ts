import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BackendService } from '../../../services/backend.service';
import { CustomersComponent } from '../../customers/customers.component';
import { ProductsComponent } from '../../products/products.component';
import { MatIcon } from '@angular/material/icon';
import { AddordersComponent } from '../addOrders/addorders.component';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    CustomersComponent,
    ProductsComponent,
    AddordersComponent,
    MatIcon
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {


  @Input() action: string='';
  @Input() data:any;
  @Input() product:any;
  @Input() order:any;
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter();
  color:string='primary';
  backend=inject(BackendService);
  panelOpenState = false;
  selectPro: boolean=false;
  selectOrders: boolean=false;
  btnCutomer:string='SELECT FROM LIST';
  btnProduct:string='SELECT FROM LIST';

  ngOnInit(): void {

    this.orderform.controls.productId.disable();
    this.orderform.controls.orderId.disable();

    if (this.data) {
      this.orderform.controls.productId.setValue(this.data.productId);
      this.orderform.controls.orderId.setValue(this.data.orderId);
      this.orderform.controls.unitPrice.setValue(this.data.unitPrice);
      this.orderform.controls.quantity.setValue(this.data.quantity);
    }
    if (this.action=="remove") {
      this.orderform.controls.unitPrice.disable();
      this.orderform.controls.quantity.disable();
      this.color='warn';
    }
  }

  private fb = inject(FormBuilder);
  orderform = this.fb.group({
    productId: [null , Validators.email],
    orderId: [null , Validators.email],
    unitPrice: null,
    quantity: [null]
  });

  submintClick(): void {
      this.onSubmit.emit({
        orderId:this.orderform.controls.orderId.value,
        productId:this.orderform.controls.productId.value,
        unitPrice:this.orderform.controls.unitPrice.value,
        quantity:this.orderform.controls.quantity.value,
      });
  }

  selectClickProduct(element:any):void {
    this.orderform.controls.productId.setValue(element);
    this.selectProduct();
  }

  selectProduct() {
    this.selectPro = !this.selectPro;
    if (this.btnProduct=='SELECT FROM LIST') {
      this.btnProduct='CANCEL';
   }else{
     this.btnProduct='SELECT FROM LIST';
   }
  }

  selectClickOrder(element:any):void {
    this.orderform.controls.orderId.setValue(element);
    this.selectOrder();
  }

  selectOrder():void {
    this.selectOrders = !this.selectOrders;
    if (this.btnCutomer=='SELECT FROM LIST') {
      this.btnCutomer='CANCEL';
   }else{
     this.btnCutomer='SELECT FROM LIST';
   }
  }

  cancelClick(): void{
    this.onCancel.emit();
  }

}
