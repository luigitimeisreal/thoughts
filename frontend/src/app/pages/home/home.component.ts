import { Component } from '@angular/core';
import { TextPostComponent } from '../../components/text-post/text-post.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NewComponent } from '../../components/new/new.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TextPostComponent, NavbarComponent, NewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
