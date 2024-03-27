import { Text } from '@angular/compiler';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrl: './newpost.component.scss'
})
export class NewpostComponent {
  title = '';
  content = "";
  parentRoute : string | undefined = '';
  currentRoute : string | undefined = '';

  constructor(private route: ActivatedRoute,private router: Router, private postService :  PostService,
    public dialogRef: MatDialogRef<NewpostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.parentRoute = this.route.parent?.snapshot.url.join('/');
    this.currentRoute = this.route.snapshot.url.join('/');
  }
  onSubmit(){
    this.postService.newPost(this.title, this.content);
    this.dialogRef.close();
  }


}
