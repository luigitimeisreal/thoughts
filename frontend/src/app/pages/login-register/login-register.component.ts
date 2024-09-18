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
  logInForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  // TODO: Add validators
  registerForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
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
