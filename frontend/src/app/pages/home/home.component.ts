import { Component, OnInit } from '@angular/core';
import { TextPostComponent } from '../../components/text-post/text-post.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NewComponent } from '../../components/new/new.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'
import { RequestService } from '../../services/request.service';
import { ReplyComponent } from '../../components/reply/reply.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TextPostComponent, NavbarComponent, NewComponent, InfiniteScrollDirective, ReplyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private requestService:RequestService) {}

  currentPosts: any = [];
  currentPostNumber: number = 0;

  ngOnInit(): void {
    this.requestService.obtain10Posts(0)
      .subscribe((postsData) => {
        this.currentPosts = postsData;
        console.log("Posts data received: ", this.currentPosts);
    })
  }
  

  onScroll() {
    this.currentPostNumber += 10;
    this.requestService.obtain10Posts(this.currentPostNumber)
      .subscribe((postsData: any) => {
        this.currentPosts = this.currentPosts.concat(postsData);
        console.log("Posts infinite scroll data received: ", this.currentPosts);
    })
  }

  onNewPost() {
    this.requestService.obtain10Posts(0)
      .subscribe((postsData) => {
        this.currentPosts = postsData;
        console.log("Posts data received: ", this.currentPosts);
    })
  }

}
