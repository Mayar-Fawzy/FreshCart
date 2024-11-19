import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {


  return next(req).pipe(catchError((err)=>{
    console.log('errorr interceptors:', err.error.message);
    //زود الtoast //alert
    return throwError(()=>err)
  }));
};
