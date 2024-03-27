import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public loginValid = true;
  public username = '';
  public password = '';
  public repeatPassword = '';
  public role = 'ADMIN';
  
  constructor(private authService: AuthService, private router: Router) { }

  public ngOnInit(): void {
  
  }

  public ngOnDestroy(): void {
  }

  public onSubmit(): void {
    this.loginValid = true;

    var response = this.authService.register(this.username, this.password, this.repeatPassword, this.role);
    console.log(response);
    //this.router.navigate(['posts']);
  }
}
