
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private authService: AuthService) { }

  getUserDetails(){
    this.authService.getUserDetails();
  }
}
