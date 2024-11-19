import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {


   const _router=inject(Router);
   if(typeof localStorage!=='undefined'){
    if(localStorage.getItem('userToken')!=null){
  return true;
 }
 else{
  //navigate to login --> router 
  _router.navigate(['/login'])
  return false;
 }
   }
   else{
    return false;
   }
 
};
