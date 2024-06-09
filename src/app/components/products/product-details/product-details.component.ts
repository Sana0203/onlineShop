import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  @Input() action: string='';
  @Input() data:any;
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter();
  color:string='primary';
  backend=inject(BackendService);
  categories:productCategories[]=[];

  ngOnInit(): void {
    if (this.action=='add' || this.action=='edit') {
      this.getCategory();
    }
    if (this.data) {
      this.productform.controls.name.setValue(this.data.name);
      this.productform.controls.description.setValue(this.data.description);
      this.productform.controls.rating.setValue(this.data.rating);
      this.productform.controls.productCategories.setValue(this.data.productCategories.id);
    }
    if (this.action=="remove") {
      this.productform.controls.name.disable();
      this.productform.controls.rating.disable();
      this.productform.controls.description.disable();
      this.productform.controls.productCategories.disable();
      this.color='warn';
    }
  }

  private fb = inject(FormBuilder);
  productform = this.fb.group({
    name: [null, Validators.required],
    description: [null],
    rating: [null],
    productCategories: [null],
  });

  submintClick(): void {
      this.onSubmit.emit({
        name:this.productform.controls.name.value,
        description:this.productform.controls.description.value,
        rating:this.productform.controls.rating.value,
        productCategoriesId:this.productform.controls.productCategories.value
      });
  }
  cancelClick(): void {
    this.onCancel.emit();
  }

  getCategory():void {
    this.backend.post('productCategories/list',{}).subscribe(
      result=>{
        this.categories = result as productCategories[];
    });
  }

}
interface productCategories{
  name:string;
  id:number;
}
