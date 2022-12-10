import { Component, Input } from '@angular/core';
import { DataService, Post } from '../services/data.service';
import { DatePreprocessor } from '../services/date.service';

@Component({
  	selector: 'news-section',
  	templateUrl: './post.component.html',
  	styleUrls: ['./post.component.less']
})
export class PostComponent{

  	@Input() current_post: Post = new Post;
	user_id : string = "";
	date_prep: DatePreprocessor = new DatePreprocessor();

  	constructor(
		private data: DataService
	) { 
		this.user_id = this.data.get_current_user_id()
	}

  	remove_post () {
    	this.data.remove_post(this.current_post.id);
  	}
}
