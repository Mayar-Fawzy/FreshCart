import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { Iproducts } from '../../core/interfaces/iproducts';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

      private  readonly  _ActivatedRoute=inject(ActivatedRoute);
      private readonly _ProductsService=inject(ProductsService);
      detailsProduct :Iproducts|null=null;
      ngOnInit(): void {
      this. _ActivatedRoute.paramMap.subscribe({
        next:(p)=>{
          let idProduct =  p.get('id');
          //call Api
          this._ProductsService.GetspecificProduct(idProduct).subscribe({  
            next:(res)=>{
              this.detailsProduct=res.data;
              console.log(this.detailsProduct );
            },
            error:(err)=>{
              console.log(err)
            }
        })
      }
        
      })
      }

    }