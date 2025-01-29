import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';

import { Iproducts } from '../../core/interfaces/iproducts';
import { Subscription } from 'rxjs/internal/Subscription';
import { CategoriesService } from '../../Services/categories.service';
import { ICategories } from '../../core/interfaces/Icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule, NgModel } from '@angular/forms';
import { CartService } from '../../Services/cart.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule, SearchPipe, SalePipe, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  producrtlist: Iproducts[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayHoverPause:true,
    autoplayTimeout: 2900,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-circle-arrow-left"></i>', '<i class="fa-solid fa-circle-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 5,
      },
    },
    nav: true,
  };

  categoriesList: ICategories[] = [];
  AllProduct!: Subscription;
  text: string = '';
  ngOnInit(): void {
    //categories
    //sloading
    this._CategoriesService.GetAllCategories().subscribe({
      next: (res) => {
        //hide loading
        this.categoriesList = res.data;
        console.log(this.categoriesList);
      },

      error: (err) => {
        console.log(err);
      },
    });
    // Products
    this.AllProduct = this._ProductsService.GetAllProducts().subscribe({
      next: (res) => {
        this.producrtlist = res.data;
        console.log(this.producrtlist);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  AddCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.AllProduct?.unsubscribe();
  }
}
