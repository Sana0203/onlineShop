import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { CustomersComponent } from './components/customers/customers.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { AddordersComponent } from './components/orders/addOrders/addorders.component';

export const routes: Routes = [
    {
        path:'', component:NavigationComponent, children:[
            {path:'customers', component:CustomersComponent},
            {path:'orderDetails', component:OrdersComponent },
            {path:'products', component:ProductsComponent},
            {path:'orders', component:AddordersComponent},
            {path:'', redirectTo:'/customers', pathMatch:'prefix'}
        ]
    },{
        path:'**', redirectTo:'', pathMatch:'full'
    },
    {
        path:'', redirectTo:'', pathMatch:'full'
    }
];
