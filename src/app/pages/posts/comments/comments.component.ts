import { Component, Input } from '@angular/core';
import { Posts } from '../../../_interfaces/Posts';
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  @Input() parent!: Posts;
  posts: Posts[] = [];
  content: string = "";


  constructor(private postService : PostService, private authService :AuthService, private router: Router){}

  ngOnInit(): void {
    
    this.loadComments(this.parent.id);
  }


  loadComments(parentId: string){

    this.postService.getComments(parentId).subscribe(posts => {
      this.posts = posts;
    })
  }

  onSubmit(){
    this.postService.newComment(this.content, this.parent.id);
    this.posts = [];
    this.loadComments(this.parent.id);
  }

}
