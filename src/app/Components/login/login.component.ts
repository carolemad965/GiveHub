import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _AuthService:AuthService , private _Router:Router)  {}
  isLoading:boolean =false;
  msgError:string="";
  logInForm :FormGroup =new FormGroup({
    email:new FormControl ('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^\w{6,20}$/)])
  });

handleForm():void
{
  if(this.logInForm.valid)
    {
      this.isLoading=true;
      this._AuthService.setLogIn(this.logInForm.value).subscribe({
        next:(response)=>{
          this.isLoading=false
          if(response.message=='success')
            {
              localStorage.setItem('eToken',response.token);
              this._AuthService.decodeUserData();
              this._Router.navigate(['/home']);
            }
        },
        error:(err:HttpErrorResponse)=>{
          this.isLoading=false;
          this.msgError=err.error.message;
        }
      })
    }
    else
    {
      this.logInForm.markAllAsTouched();
    }
}

}
