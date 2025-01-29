import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class TostService {

 constructor(private toastr: ToastrService) {}

  showSuccess() {
    this.toastr.success('FreshCart', 'FreshCart');
  }
  ShowError(errorMesage:string,namee:string){
    this.toastr.error(errorMesage,namee, {
      timeOut: 2800,
    });
  }
}

