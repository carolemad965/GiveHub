import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  msgError: string = '';
  isLoading: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    confirmEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,20}$/)]),
    rePassword: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,20}$/)])
  },{validators:[this.confirmPassword,this.confirmEmail]} as FormControlOptions );


  confirmPassword(group: FormGroup): void {
    let password = group.get('password');
    let rePassword = group.get('rePassword');
    if(rePassword?.value == ' ')
      {
        rePassword?.setErrors({required:true});
      }
    else if(password?.value != rePassword?.value){
      rePassword?.setErrors({mismatch:true});
    }
  }


  confirmEmail(group: FormGroup): void {
    let email = group.get('email');
    let confirmEmail = group.get('confirmEmail');
    if(confirmEmail?.value == ' ')
      {
        confirmEmail?.setErrors({required:true});
      }
    else if(email?.value != confirmEmail?.value){
      confirmEmail?.setErrors({mismatch:true});
    }
  }

  handleForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.message == 'success')
            this._Router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.msgError = err.error.message;
        }
      });
    }
    else {
      this.registerForm.markAllAsTouched();
    }
  }
}
