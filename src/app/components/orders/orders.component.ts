import { Component, inject } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { CustomerDetailsComponent } from '../customers/customer-details/customer-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AddordersComponent } from './addOrders/addorders.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CustomerDetailsComponent,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    NgFor,
    OrderDetailsComponent,
    AddordersComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  displayedColumns: string[] = ['customerName', 'productName', 'unitprice','quantity','totalprice','orderStatus', 'action'];
  data:any;

  currentAction:string = 'list';

  backend=inject(BackendService);

  ngOnInit(): void {
    this.currentAction='loading';
    this.getList();
  }

  dataSource: any[] = [];

  getList(): void{
    this.backend.post("orderdetails/list",{}).subscribe(result=>{
      this.dataSource = result as any[];
      this.currentAction='list';
    });
  }

  delete(elemet:any): void{
    this.data = elemet
    this.currentAction='remove';
  }

  edit(elemet:any): void{
    this.data=elemet;
    this.currentAction='edit';
  }

  add(): void{
    this.currentAction='add';
  }

  onAdd(event:any): void {

    if (this.currentAction=='add') {

      this.backend.post("orderdetails/add",event).subscribe(result=>{
        this.currentAction='list';
        this.ngOnInit();
      });

    }else if(this.currentAction=='edit'){

      event.id = this.data.id;
      this.backend.put("orderdetails/update",event).subscribe(result=>{
        this.currentAction='list';
        this.ngOnInit();
      });

    }else if (this.currentAction=='remove') {
      this.backend.delete("orderdetails/remove/"+this.data.id).subscribe(result=>{
        this.currentAction='list';
        this.ngOnInit();
      });
    }
  }

  onCancel():void{
    this.currentAction='list';
  }

}