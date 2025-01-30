
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  //object with interface type
  cartDetails:Icart= {} as Icart
  private readonly _CartService=inject(CartService);
   ngOnInit(): void {
    this._CartService.GetProductsCart().subscribe({
      next:(res)=>
        {  console.log(res.data)
        this.cartDetails=res.data
      },
      error:(err)=>{console.log(err)}
    })
   }
    UpdateCount(id:string , count:number):void{
      if(count>0){
        this._CartService.QuantityForCount(id,count).subscribe({
          next:(res)=>{console.log(res.data)
            this.cartDetails=res.data
        },  
        error:(err)=>{console.log(err)}
      })
      }
      
    }

   
   Remove(id:string):void{
    this._CartService.DeleteItem(id).subscribe({
      next:(res)=>{
         //override هيجيب الداتا الي موجوده بعد الحذف بس
         this.cartDetails=res.data
        this._CartService.CartNumber.set(res.numOfCartItems);
      },
      error:(err)=>{console.log(err)}})}

    
      RemoveAll():void{
          this._CartService.RemoveAll().subscribe({
            next:(res)=>{
             if(res.message=='success'){
              this.cartDetails={}as Icart
              this._CartService.CartNumber.set(0);
              }
                console.log(res);
            },
            error:(err)=>{console.log(err)}})
        }
    
    }
