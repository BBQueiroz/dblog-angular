
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { profile } from '../_interfaces/Profile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private buildHeadersWithToken() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  getUserDetails():Observable<profile>{
    const login = this.authService.getUserLogin();
    const headers = this.buildHeadersWithToken(); 
    return this.http.get<profile>(`https://dblog-backend.onrender.com/profile/${login}`, { headers });;
  }
}
