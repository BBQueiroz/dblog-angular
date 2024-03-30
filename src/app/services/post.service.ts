import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Posts } from '../_interfaces/Posts';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private http: HttpClient, private authService: AuthService) { }

  private buildHeadersWithToken() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  getPosts(): Observable<Posts[]>{
        
    return this.http.get<Posts[]>('https://dblog-backend.onrender.com/posts').pipe(catchError(error => this.handleError(error)));;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 403) {
      return throwError(() => new Error("Token invalido ou expirado. Tente novamente."));
    }

    if (error.status == 404) {
      return throwError(() => new Error("Nenhuma playlist encontrada para o nome informado."));
    }
    
    return throwError(() => error);
  }

  newPost(title: string, content: string){
    const headers = this.buildHeadersWithToken();
    const body = { title, content};
    const req = this.http.post<Posts>('https://dblog-backend.onrender.com/posts', body, { headers });
    req.subscribe({
      next: data => console.log('post publicado', data.title),
      error: err => console.log('Erro ao publicar', err, body)
    });
  }

  deletePost(postId: string){
    const headers = this.buildHeadersWithToken();
    const deleteUrl = `https://dblog-backend.onrender.com/posts/${postId}`; // URL da API para excluir o post
    const req = this.http.delete(deleteUrl, { headers });
    req.subscribe({
      next: () => {console.log('deletado'); this.getPosts();},
      error: err => console.log('Erro ao deletar', err)
    });
    
  }
}
