import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { PostsComponent } from './pages/posts/posts.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MaterialtestingComponent } from './pages/materialtesting/materialtesting.component';
import { RegisterComponent } from './auth/register/register.component';
import { NewpostComponent } from './pages/posts/newpost/newpost.component';
import { JorneyComponent } from './pages/jorney/jorney.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CreateJourneyComponent } from './pages/jorney/create-journey/create-journey.component';
import { CommentsComponent } from './pages/posts/comments/comments.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    PostsComponent,
    NavigationComponent,
    MaterialtestingComponent,
    RegisterComponent,
    NewpostComponent,
    JorneyComponent,
    CreateJourneyComponent,
    CommentsComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
