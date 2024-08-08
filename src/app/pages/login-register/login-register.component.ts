import { Component } from '@angular/core';
import { TextBarComponent } from '../../components/text-bar/text-bar.component';

@Component({
  selector: 'login-register',
  standalone: true,
  imports: [TextBarComponent],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent {

}
