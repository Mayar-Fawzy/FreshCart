import { Routes } from '@angular/router';
import { provideRouter, withComponentInputBinding } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./Layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    canActivate: [() => import('./core/guards/loged.guard').then(m => m.logedGuard)],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
      { path: 'forget', loadComponent: () => import('./components/forgetpassword/forgetpassword.component').then(m => m.ForgetpasswordComponent) }
    ]
  },
  {
    path: '',
    loadComponent: () => import('./Layouts/blank-layout/blank-layout.component').then(m => m.BlankLayoutComponent),
    canActivate: [() => import('./core/guards/auth.guard').then(m => m.authGuard)],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
      { path: 'products', loadComponent: () => import('./components/product/product.component').then(m => m.ProductComponent) },
      { path: 'brands', loadComponent: () => import('./components/brands/brands.component').then(m => m.BrandsComponent) },
      { path: 'categories', loadComponent: () => import('./components/categories/categories.component').then(m => m.CategoriesComponent) },
      { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent) },
      { path: 'details/:id', loadComponent: () => import('./components/details/details.component').then(m => m.DetailsComponent) },
      { path: 'orders/:id', loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent) },
      { path: 'allorders', loadComponent: () => import('./components/allorders/allorders.component').then(m => m.AllordersComponent) }
    ]
  },
  { path: '**', loadComponent: () => import('./components/notfound/notfound.component').then(m => m.NotfoundComponent) }
];
