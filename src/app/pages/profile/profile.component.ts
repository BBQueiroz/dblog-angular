import { profile } from '../../_interfaces/Profile';
import { ProfileService } from './../../services/profile.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profile: profile = {
    id: '',
    nickname: '',
    birthday: new Date(),
    biography: '',
    email: '',
    };
  constructor(private profileService: ProfileService){

  }

  ngOnInit(){
    this.loadProfile();
  }

  loadProfile(){
    this.profileService.getUserDetails().subscribe(profile => {
      this.profile = profile;
      console.log(profile);
    });
  }



  onSubmit(){
    this.profileService.saveUser(this.profile);
  }
}
