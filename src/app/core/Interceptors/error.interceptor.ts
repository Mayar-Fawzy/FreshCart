import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { TostService } from '../../Services/tost.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const _TostService =inject(TostService)
  return next(req).pipe(catchError((err)=>{
    console.log('errorr interceptors:', err.error.message);
    _TostService.ShowError(err.error.message ,'Fresh Cart')
    return throwError(()=>err)
  }));
};
