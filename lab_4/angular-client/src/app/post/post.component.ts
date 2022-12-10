import { Component, Input } from '@angular/core';
import { Post } from '../services/data.service';

@Component({
  selector: 'news-section',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent{

  @Input() current_post: Post = new Post;

  constructor() { }
}
