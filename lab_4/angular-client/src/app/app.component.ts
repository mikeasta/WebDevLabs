import { Component } from '@angular/core';

@Component({
  	selector: 'app-root',
  	template: `
  <header id="common_header">
<a routerLink="" id="common_header_index_page_link"> Главная</a>
<a href="https://localhost:5000/profile/squirtleID001" id="common_header_profile_link">Профиль</a>
<a routerLink="/news" id="common_header_news_link">Новости</a>
<a routerLink="/friends" id="common_header_friends_link">Друзья</a>
<a href="https://localhost:5000/control_panel" id="common_header_control_panel_link">Панель управления пользователями</a>
</header>
<router-outlet></router-outlet>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  `,
  	styleUrls: ['./app.component.less']
})
export class AppComponent {}