import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    NgFor,
    ProductDetailsComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  @Output() selectedItem = new EventEmitter<any>();
  @Input() selectable:boolean = false;
  columns: string[] = ['Name', 'description', 'rating','productCategories'];
  displayedColumns: string[] = ['name', 'description', 'rating','productCategories', 'action'];
  data:any;

  currentAction:string = 'list';

  backend=inject(BackendService);

  ngOnInit(): void {
    this.currentAction='loading';
    this.getList();
  }

  dataSource: product[] = [];

  getList(): void{
    this.backend.post("products/list",{}).subscribe(result=>{
      this.dataSource = result as product[];
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

      this.backend.post("products/add",event).subscribe(result=>{
        this.currentAction='list';
        this.ngOnInit();
      });

    }else if(this.currentAction=='edit'){

      event.id = this.data.id;
      this.backend.put("products/update",event).subscribe(result=>{
        this.currentAction='list';
        this.ngOnInit();
      });

    }else if (this.currentAction=='remove') {
      this.backend.delete("products/remove/"+this.data.id).subscribe(result=>{
        this.currentAction='list';
        this.ngOnInit();
      });
    }
  }

  selected(element: any) {
    if (this.selectable) {
      this.selectedItem.emit(element.id);
    }
  }

  onCancel():void{
    this.currentAction='list';
  }

}
export class productCategories{
  name:string='';
  description:string='';
  id:number=0;
}
export class product{
  name:string='';
  description:string='';
  rating:number=0;
  productCategories:productCategories=new productCategories;
}