import { Component, Input, OnInit } from '@angular/core';
import { TextPostData } from '../../interfaces/text-post-data';

@Component({
  selector: 'text-post',
  standalone: true,
  imports: [],
  templateUrl: './text-post.component.html',
  styleUrl: './text-post.component.css'
})
export class TextPostComponent implements OnInit {

  @Input()
  postData!: TextPostData;

  ngOnInit(): void {
    console.log("Single post data", this.postData);    
  }

  
}
