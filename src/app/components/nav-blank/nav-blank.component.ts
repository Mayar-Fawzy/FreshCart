import { Component, computed, inject, Signal } from '@angular/core';
import {  RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {
   readonly _Auth= inject(AuthService);
   private readonly _CartService=inject(CartService);
   NavCartCount:Signal<number>=computed(()=>this._CartService.CartNumber())

   ngOnInit(): void {
  
    this._CartService.GetProductsCart().subscribe({
     next:(res)=>{
       this._CartService.CartNumber.set(res.numOfCartItems);}
    })
   }
 
}

