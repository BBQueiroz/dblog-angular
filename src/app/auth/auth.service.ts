import { Router } from '@angular/router';
import { Token } from './../_interfaces/token';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public logout(){
    sessionStorage.removeItem('token');
    this.router.navigate([""]);
  }

  getCurrentToken(){
    return sessionStorage.getItem('token');
  }

  authenticate(login: string, password: string) {
    const body = { login, password };
  
    const req = this.http.post<Token>('https://dblog-backend.onrender.com/auth/login', body);
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
    const req = this.http.post<User>('https://dblog-backend.onrender.com/auth/register', body);
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