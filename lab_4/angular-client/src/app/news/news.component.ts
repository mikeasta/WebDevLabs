import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Post } from '../services/data.service';

@Component({
  	selector: 'app-news',
  	templateUrl: './news.component.html',
  	styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit {

	posts: Post[] = [];

  	constructor(
		private router: Router,
		private data: DataService
	) { }

  	navigateToCreateNewsPage() {
    	this.router.navigate(["/create_news"])
  	}

  	ngOnInit(): void {
		this.data.posts.subscribe(posts => {
			this.posts = posts;
		})

		this.fetch_posts();
  	}

	private async fetch_posts() {
		this.data.get_posts();
	}
}
