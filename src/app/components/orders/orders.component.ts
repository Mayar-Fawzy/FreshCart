import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../Services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
 orders:FormGroup=new FormGroup({
  details:new FormControl(''),
  phone:new FormControl(''),
  city:new FormControl('')
 })
//جبت الديتلز بتاعت الكارت
 ordersSubmit():void{
  console.log(this.orders.value);
  this._OrdersService.CheckOut(this.myId,this.orders.value).subscribe({
    next: (res) => {
      if(res.status=='success'){
        //strip => payment in backend
        window.open(res.session.url,'_self');
      }
      console.log(res)
    },
    error: (err) => console.error(err),
  })
 }
 private readonly _ActivatedRoute=inject(ActivatedRoute);
 private readonly _OrdersService=inject(OrdersService);
  myId:string|null='';
  //هروح اجيب ال id من الurl

 ngOnInit(): void {
   this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
    this.myId=params.get('id');
    console.log(this.myId)
    }
   })
 }
}
