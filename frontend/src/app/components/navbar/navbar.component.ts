import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router:Router) {}

  profileOptionsClicked = false;
  userToken: string | null = localStorage.getItem("userToken");

  signOut() {
    localStorage.removeItem("userToken");
  }

}
