import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,RouterLink,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
   private readonly _Auth=inject(AuthService);
   private readonly _Router=inject(Router);
   msgError:string='';
   isloading:boolean=false;
  
   //Validators
   
   registerform:FormGroup =new FormGroup({
     name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])  
   } , this.confirmPassword
   );
   registerSubmit():void{
    if(this.registerform.valid){
      this.isloading=true;
      this._Auth.register(this.registerform.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isloading=true;
          setTimeout(()=>{
            this._Router.navigate(['/login'])
          },1000)
          
        },
        error:(err:HttpErrorResponse)=>{
          this.msgError=err.error.message;
        console.log(err);
          this.isloading=false;
        }
      })
    }
    else{
      
      this.registerform.markAllAsTouched();
      this.registerform.setErrors({mismatch:true})
    }
   }
  //  AbstractControl=>FormGroup Or FormControl
   confirmPassword(g :AbstractControl){
    if(g.get('password')?.value=== g.get('rePassword')?.value){
      return null
    }
    else{
      return {mismatch:true}
    }
   }
}
