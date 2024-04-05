
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

  saveUser(profile: profile){
    const headers = this.buildHeadersWithToken();
    const body = { profile };
    const login = this.authService.getUserLogin();
    // const req = this.http.post<Posts>('https://dblog-backend.onrender.com/posts', body, { headers });
    console.log(headers);
    const req = this.http.post<profile>(`https://dblog-backend.onrender.com/profile/${login}`, body, { headers });
    req.subscribe({
      next: data => console.log('Usuario atualizado', data),
      error: err => console.log('Erro ao atualizar usuário', err, body)
    });
  }
}
