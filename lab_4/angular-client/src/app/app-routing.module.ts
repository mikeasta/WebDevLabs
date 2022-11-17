import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { FriendsComponent } from './friends/friends.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './services/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


const appRoutes: Routes = [
    { 
      path: '', 
      component: IndexComponent,
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
      component: NewsComponent,
      canActivate: [AuthGuard]
    },
    { 
      path: 'friends', 
      component: FriendsComponent,
      canActivate: [AuthGuard] 
    },
    { 
      path: 'create_news', 
      component: CreateNewsComponent,
      canActivate: [AuthGuard] 
    },
    { 
      path: 'profile', 
      component: ProfileComponent,
      canActivate: [AuthGuard] 
    },
    { 
      path: 'profile/:user_id', 
      component: ProfileComponent,
      canActivate: [AuthGuard] 
    },
    { 
      path: 'edit_profile', 
      component: EditProfileComponent,
      canActivate: [AuthGuard] 
    },
    {
      path: '404',
      component: NotFoundComponent
    },
    {
      path: '**',
      redirectTo: '/404'
    }
  ]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}