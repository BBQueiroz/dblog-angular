import { ProfileService } from './../../services/profile.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  
  constructor(private profileService: ProfileService){

  }

  ngOnInit(){
    this.profileService.getUserDetails();
  }
}
