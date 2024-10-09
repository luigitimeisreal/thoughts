import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { HomeComponent } from "./pages/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginRegisterComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'thoughts';
}
