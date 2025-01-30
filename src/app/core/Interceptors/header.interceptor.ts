import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
 
//نسخه من الريكويست عدل فيها
if(localStorage.getItem('userToken')!==null){

  if(req.url.includes('cart')|| req.url.includes('wishlist')||req.url.includes('orders'))
  {
     req=  req.clone({
    
    setHeaders:{token:localStorage.getItem('userToken')!,lang:localStorage.getItem('lang')!}
    })
  }
 
}
  return next(req)//res
};
