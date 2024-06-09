import { Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { BackendService } from '../../services/backend.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CustomerDetailsComponent,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    NgFor,
    MatProgressSpinnerModule
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {

  @Output() selectedItem = new EventEmitter<any>();
  @Input() selectable:boolean = false;
  displayedColumns: string[] = ['name', 'phone', 'email', 'gender','address', 'action'];
  data:any;
  currentAction:string = 'list';

  backend=inject(BackendService);

  ngOnInit(): void {
    this.currentAction='loading';
    this.getList();
  }

  dataSource: any[] = [];

  getList(): void{
    this.backend.post("customers/list",{}).subscribe(result=>{
      this.dataSource=result as any[];
      this.currentAction='list';
    });
  }

  delete(element:any): void{
    this.data = element
    this.currentAction='remove';
  }

  edit(element:any): void{
    this.data=element;
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

      this.backend.post("customers/add",event).subscribe(result=>{
        this.currentAction='list';
        this.ngOnInit();
      });

    }else if(this.currentAction=='edit'){

      event.id = this.data.id;
      this.backend.put("customers/update",event).subscribe(result=>{
        this.currentAction='list';
        this.ngOnInit();
      });

    }else if (this.currentAction=='remove') {
      this.backend.delete("customers/remove/"+this.data.id).subscribe(result=>{
        this.currentAction='list';
        this.ngOnInit();
      });
    }
  }

  onCancel():void{
    this.currentAction='list';
  }

}