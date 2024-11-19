import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _Auth=inject(AuthService);
   private readonly _Router=inject(Router);
   msgError:string='';
   isloading:boolean=false;
  
   //Validators
   
   loginform:FormGroup =new FormGroup({
    
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)])
   
   });
   loginSubmit():void{
    if(this.loginform.valid){
      this.isloading=true;
      this._Auth.login(this.loginform.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isloading=true;
          // 1-save token
          localStorage.setItem('userToken',res.token);
          //2- decode token
          this._Auth.saveuserdata();
          //3-navigate to home
            this._Router.navigate(['home'])
        
          
        },
        error:(err:HttpErrorResponse)=>{
          this.msgError=err.error.message;
       console.log(this.msgError);
          this.isloading=false;
        }
      })
    }
    else{
      
      this.loginform.markAllAsTouched();
      this.loginform.setErrors({mismatch:true})
    }
   }
   
}
