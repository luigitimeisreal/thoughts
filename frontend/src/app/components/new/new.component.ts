import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'new',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent {

  postForm = new FormGroup({
    text: new FormControl("", [Validators.required])
  })

}
