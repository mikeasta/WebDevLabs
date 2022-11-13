import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { FriendsComponent } from './friends/friends.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { IndexComponent } from './index/index.component';

const appRoutes: Routes = [
    { 
      path: '', 
      component: IndexComponent 
    },
    { 
      path: 'login', 
      component: LoginComponent 
    },
    { 
      path: 'registration', 
      component: RegistrationComponent 
    },
    { 
      path: 'news', 
      component: NewsComponent 
    },
    { 
      path: 'friends', 
      component: FriendsComponent 
    },
    { 
      path: 'create_news', 
      component: CreateNewsComponent 
    },
  ]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}