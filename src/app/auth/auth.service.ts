import { Router } from '@angular/router';
import { Token } from './../_interfaces/token';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_interfaces/User';
import { jwtDecode } from "jwt-decode";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) { }

  public logout(){
    sessionStorage.removeItem('token');
    this.router.navigate([""]);
  }

  getUserLogin(){
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken);

      return decodedToken.sub;
    }

  } 
  

  getCurrentToken(){
    return sessionStorage.getItem('token');
  }

  authenticate(login: string, password: string) {
    const body = { login, password };
  
    const req = this.http.post<Token>(`${this.apiUrl}/auth/login`, body);
    req.subscribe({
      next: data => sessionStorage.setItem('token', data.token),
      error: err => console.log('Usuário não encontrado', err, body)
    });
    
  }
  register(login: string, password: string, confPassword: string, role : string){
    if (password != confPassword){
      return false;
    }
    const body = { login, password, role};
    const req = this.http.post<User>(`${this.apiUrl}/auth/register`, body);
    req.subscribe({
      next: data => console.log('registrado com sucesso', data.user),
      error: err => console.log('Erro ao registrar usuário:', err, body)
    })
    return true;
  }
  
  isLoggedIn() {
    return this.getCurrentToken() !== null;
  }
  
}