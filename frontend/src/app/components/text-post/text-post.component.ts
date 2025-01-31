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
  likeCounter!: number;

  ngOnInit(): void {
    console.log("Single post data", this.postData);
    if (this.userToken) {
      this.requestService.obtainCurrentUser(this.userToken)
        .subscribe((user: any) => {
          this.postData.likes.forEach((userLike) => {
            if (userLike === user) {
              console.log("Enters innit", this.postData.content);
              this.isLiked = true;
            }
          })
        })
    } else {
      this.isLiked = false;
    }
    this.likeCounter = this.postData.likes.length;
  }

  changeLike() {
    if (!this.isLiked) {
      this.requestService.addLikeToPost(this.userToken!, this.postData._id)
      .subscribe((likeSuccess) => {
        console.log("IS LIKED?", likeSuccess);
        if (likeSuccess) {
          this.isLiked = !this.isLiked;
          this.likeCounter++;
        }
      })
    } else {
      this.requestService.removeLikeOfPost(this.userToken!, this.postData._id)
      .subscribe();
      this.isLiked = false;
      this.likeCounter--;
    }
  }

  
}
