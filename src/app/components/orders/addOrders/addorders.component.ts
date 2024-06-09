import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CustomerDetailsComponent } from '../../customers/customer-details/customer-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { BackendService } from '../../../services/backend.service';
import { AddOrdersDetailsComponent } from './add-orders-details/add-orders-details.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-addorders',
  standalone: true,
  imports: [
    CustomerDetailsComponent,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    NgFor,
    AddOrdersDetailsComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './addorders.component.html',
  styleUrl: './addorders.component.scss'
})
export class AddordersComponent {

  @Output() selectedItem = new EventEmitter<any>();
  @Input() selectable:boolean = false;
  displayedColumns: string[] = ['id','customerName', 'orderStatus', 'action'];
  data:any;
  currentAction:string = 'list';

  backend=inject(BackendService);

  ngOnInit(): void {
    this.currentAction='loading';
    this.getList();
  }

  dataSource: any[] = [];

  getList(): void{
    this.backend.post("orders/list",{}).subscribe(result=>{
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


  selected(element:any):void{
    if (this.selectable) {
      this.selectedItem.emit(element.id);
    }
  }
  
  onAdd(event:any): void {

    if (this.currentAction=='add') {

      this.backend.post("orders/add",event).subscribe(result=>{
        this.currentAction='list';
        this.ngOnInit();
      });

    }else if(this.currentAction=='edit'){

      event.id = this.data.id;
      this.backend.put("orders/update",event).subscribe(result=>{
        this.currentAction='list';
        this.ngOnInit();
      });

    }else if (this.currentAction=='remove') {
      this.backend.delete("orders/remove/"+this.data.id).subscribe(result=>{
        this.currentAction='list';
        this.ngOnInit();
      });
    }
  }

  onCancel():void{
    this.currentAction='list';
  }

}