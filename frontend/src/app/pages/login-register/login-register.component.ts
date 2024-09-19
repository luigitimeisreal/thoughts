import { Component } from '@angular/core';
import { TextBarComponent } from '../../components/text-bar/text-bar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'login-register',
  standalone: true,
  imports: [TextBarComponent, ReactiveFormsModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})



export class LoginRegisterComponent {

  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/

  errors = [
    {type: "required", message: "Field must not be empty"},
    {type: "maxlength", message: "Field length is too big"},
    {type: "minlength", message: "Field length is too small"},
    {type: "email", message: "Field must be an email"},
  ]

  logInForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  registerForm = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.maxLength(16), Validators.minLength(2)]),
    lastName: new FormControl("", [Validators.required, Validators.maxLength(16), Validators.minLength(2)]),
    username: new FormControl("", [Validators.required, Validators.maxLength(16), Validators.minLength(2)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.pattern(this.StrongPasswordRegx)]),
    passwordConfirmation: new FormControl("", [Validators.required])
  })

  checkLogin() {
    console.log("Trying to log in");
    console.log(this.logInForm.value);
  }

  tryRegistration() {
    console.log("Trying to register");
    console.log(this.registerForm.value);
  }

}
