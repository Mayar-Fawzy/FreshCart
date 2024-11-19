
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/enviroment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private readonly _HttpClient= inject(HttpClient);

register(userdata:any):Observable<any>
{
return  this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,userdata)
}
login(userdata:any):Observable<any>{
  return  this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,userdata)
}
forgetPassword(userdata:any):Observable<any>
{
  return  this._HttpClient.post(`${environment.baseUrl}/api/v1/forgotPasswords`,userdata)
}
////////////////////////


verifyRestCode(userdata: any): Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/verifyResetCode`,userdata);

}

resetPassword(userdata: any): Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/resetPassword`,userdata);

}
userdata:any=null;
saveuserdata():void{
if(localStorage.getItem('userToken')!==null){
  this.userdata=jwtDecode(localStorage.getItem('userToken')!)
}
}

private readonly _Router= inject(Router);

logout():void{
  localStorage.removeItem('userToken');
  this._Router.navigate(['/login']);
}

} 