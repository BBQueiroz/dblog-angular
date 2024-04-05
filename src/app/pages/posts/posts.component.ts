import { Component, OnInit } from '@angular/core';
import { Posts } from '../../_interfaces/Posts';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewpostComponent } from './newpost/newpost.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../_interfaces/User';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  posts: Posts[] = [];
  showComments = false;

  constructor(public dialog: MatDialog, private postService : PostService, private authService :AuthService, private router: Router){}

  ngOnInit(): void {
    
    this.loadPosts();

    


  }

  navigateToChild(): void {
    let dialogRef = this.dialog.open(NewpostComponent, {
      height: '400px',
      width: '600px',
    });
    this.posts = [];
    this.loadPosts();
  }
  toggleComments(){
    this.showComments = !this.showComments;
  }

  changeLike(id: string){
    this.postService.changeLike(id);
  }
  loadPosts(){

    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      posts.forEach(post => {
        console.log(post.title, post.likes_list);

    })
    });

  }
  isPostOwned():boolean{
    return this.authService.isLoggedIn();
  }


  deletePost(id: string){
    this.postService.deletePost(id);
    const index = this.posts.findIndex(post => post.id === id);
    if( index !== -1){
      this.posts.splice(index, 1);
    }
  }
}
