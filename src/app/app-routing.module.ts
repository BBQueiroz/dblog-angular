import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { JorneyComponent } from './pages/jorney/jorney.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './auth/login/login.component';
import { PostsComponent } from './pages/posts/posts.component';
import { NewpostComponent } from './pages/posts/newpost/newpost.component';
import { MaterialtestingComponent } from './pages/materialtesting/materialtesting.component';
import { RegisterComponent } from './auth/register/register.component';
import { blogGuard } from './guards/blog.guard';

const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'jorney', component: JorneyComponent},
  { 
    path: 'auth',
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  },
  {
    path: 'blog',
    component: NavigationComponent,
    canActivate: [blogGuard],
    children: [
      {
        path: 'posts',
        component: PostsComponent,
        
      },
      {path: 'newPost', component: NewpostComponent},
      {path: 'material', component: MaterialtestingComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
