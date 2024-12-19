import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'new',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent {

  constructor(private requestService:RequestService) {}

  userToken: string | null = localStorage.getItem("userToken");

  postForm = new FormGroup({
    text: new FormControl("", [Validators.required])
  })

  publishPost() {
    if(this.postForm.valid) {
      let postData = {
        text: this.postForm.value.text,
        userToken: this.userToken,
      }
      this.requestService.publishTextPost(postData).subscribe((data) => {
        console.log("Enters subscribe");
      })
    }
  }

}
