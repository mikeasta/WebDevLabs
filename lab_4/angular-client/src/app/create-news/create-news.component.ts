import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DataService,  Post} from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  	selector: 'app-create-news',
  	templateUrl: './create-news.component.html',
  	styleUrls: ['./create-news.component.less']
})
export class CreateNewsComponent implements OnInit {
	@ViewChild('createPostText') post_textarea: ElementRef;

  	constructor(
    	private router: Router,
		private data: DataService
  	) { }

  	ngOnInit(): void {}

  	ngAfterViewInit() {}

	create_post () {
		let post  = new Post;
		post.text    =  this.post_textarea.nativeElement.value;
		post.user_id = this.data.get_current_user_id();
		this.data.new_post(post);
		this.router.navigate(["/news"])
	}

	return_to_news () {
		this.router.navigate(["/news"])
	}
}
