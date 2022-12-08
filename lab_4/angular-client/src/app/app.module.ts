import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { FriendsComponent } from './friends/friends.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewsComponent } from './create-news/create-news.component';
import { IndexComponent } from './index/index.component';

import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FriendComponent } from './friend/friend.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    NewsComponent,
    FriendsComponent,
    CreateNewsComponent,
    IndexComponent,
    NotFoundComponent,
    ProfileComponent,
    EditProfileComponent,
    FriendComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
