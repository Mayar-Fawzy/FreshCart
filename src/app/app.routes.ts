import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
    {path:'',component:AuthLayoutComponent,canActivate:[logedGuard]
        ,children:[ 
            {path:'',redirectTo:'login',pathMatch:'full'},  
        {path:'login',component:LoginComponent}
        ,
        {path:'register',component:RegisterComponent},
    {path:'forget',component:ForgetpasswordComponent}]
    },
    
    {path:'',component: BlankLayoutComponent,canActivate:[authGuard]
        ,children:[
            {path:'',redirectTo:'home',pathMatch:'full'},  
            {path:'home',component:HomeComponent},
            {path:'products',component:ProductComponent},
          
            {path:'brands', component:BrandsComponent},
            {path:'categories',component:CategoriesComponent},
            {path:'cart',component:CartComponent},
            {path:'details/:id',component:DetailsComponent},  
           
            {path:'orders/:id',component:OrdersComponent}//show to payment
            ,
            {path:'allorders',component:AllordersComponent},//show after Payment
           
        ]
    },
    {path:'**',component:NotfoundComponent}
];
