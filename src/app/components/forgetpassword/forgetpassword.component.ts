import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  private readonly _AuthService=inject(AuthService);
  private readonly _Router=inject(Router)
  step:number=1;

  VerifyEmail:FormGroup=new FormGroup(
    {
      email:new FormControl('',[Validators.required,Validators.email])
    }
  );
  VerifyCode:FormGroup=new FormGroup(
    {
      resetCode:new FormControl('',[Validators.required,Validators.pattern(/^[0-9]{6}$/)])
    }
  );
  VerifyPassword:FormGroup=new FormGroup(
    {
      newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)])
    }
  );
  VerfiyEmailSubmit():void{
   this._AuthService.forgetPassword(this.VerifyEmail.value).subscribe({
    next:(Res)=>{
      if(Res.statusMsg=='success'){
        this.step=2;
      }
    },error:(err)=>{
      console.log(err);
    }
   })
  }
  VerfiyCodeSubmit():void{
    this._AuthService.verifyRestCode(this.VerifyCode.value).subscribe({
      next:(Res)=>{
        if(Res.status=='success'){
          this.step=3;
        }
      },error:(err)=>{
        console.log(err);
      }
     })
  }
  ResetPaswordsubmit():void{
    //بخلي الايميل ميتغيرش
    let emailValue=this.VerifyEmail.get('email')?.value;
    this.VerifyPassword.get('email')?.patchValue(emailValue);
   
       this._AuthService.resetPassword(this.VerifyPassword.value).subscribe({
      next:(Res)=>{
       // 1-save token
       localStorage.setItem('userToken',Res.token);
       //2- decode token
       this._AuthService.saveuserdata();
       //3-navigate to home
         this._Router.navigate(['home'])
      },error:(err)=>{
        console.log(err);
      }
     })
  }
}
