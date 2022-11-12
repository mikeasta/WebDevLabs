import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit {

  constructor(private _router: Router) { }

  navigateToCreateNewsPage() {
    this._router.navigate(["/create_news"])
  }

  ngOnInit(): void {
  }

}
