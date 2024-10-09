import { Component } from '@angular/core';
import { TextPostData } from '../../interfaces/text-post-data';

@Component({
  selector: 'text-post',
  standalone: true,
  imports: [],
  templateUrl: './text-post.component.html',
  styleUrl: './text-post.component.css'
})
export class TextPostComponent {

  postData!: TextPostData;

  

}
