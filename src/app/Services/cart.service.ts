import { environment } from './../environments/enviroment';
import { HttpClient } from '@angular/common/http';

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _HttpClient=inject(HttpClient)
  constructor() { }
  //زرار الكارد
  addProductToCart(id:string):Observable<any>{
     return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        // body
        "productId":id
      },
     
     )
      }
   GetProductsCart():Observable<any>{
     return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,
     
     )
   }
   //Delete
   DeleteItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,)
   }
   RemoveAll():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,
      
     )
   }
   QuantityForCount(id:string , MaxCount:number):Observable<any>
   {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        // body
        "count":MaxCount
      },
      
     )
   }
}
