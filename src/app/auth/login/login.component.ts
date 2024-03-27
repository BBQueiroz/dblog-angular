import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    public loginValid = true;
    public username = '';
    public password = '';
  
    constructor(private authService: AuthService, private router: Router) { }
  
    public ngOnInit(): void {
  
    }
  
    public ngOnDestroy(): void {
    }
  
    public onSubmit(): void {
      this.loginValid = true;
  
      this.authService.authenticate(this.username, this.password);
      this.router.navigate(['blog/posts']);

    }
  }
  