import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const  token=localStorage.getItem('userToken');
//نسخه من الريكويست عدل فيها
if(token!=null){

  if(req.url.includes('cart')|| req.url.includes('wishlist')||req.url.includes('orders'))
  {
     req=  req.clone({
    
    setHeaders:{token}
    })
  }
 
}
  return next(req)//res
};
