import { Component, Input, OnInit } from '@angular/core';
import { TextPostData } from '../../interfaces/text-post-data';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'text-post',
  standalone: true,
  imports: [],
  templateUrl: './text-post.component.html',
  styleUrl: './text-post.component.css'
})
export class TextPostComponent implements OnInit {

  constructor(private requestService:RequestService) {}

  @Input()
  postData!: TextPostData;

  isLiked = false;
  userToken: string | null = localStorage.getItem("userToken");

  ngOnInit(): void {
    console.log("Single post data", this.postData);
    if (this.userToken) {
      this.requestService.obtainCurrentUser(this.userToken)
        .subscribe((user: any) => {
          this.postData.likes.forEach((userLike) => {
            if (userLike === user) {
              this.isLiked = true;
            }
          })
        })
    } else {
      this.isLiked = false;
    }
  }

  changeLike() {
    
    // this.isLiked = !this.isLiked;
  }

  
}
