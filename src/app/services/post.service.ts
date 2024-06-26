import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Posts } from '../_interfaces/Posts';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private buildHeadersWithToken() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  getPosts(): Observable<Posts[]>{
        
        return this.http.get<Posts[]>(`${this.apiUrl}/posts`).pipe(catchError(error => this.handleError(error)));
  }

  getComments(parentId : string): Observable<Posts[]>{
    const headers = this.buildHeadersWithToken();
    console.log('https://dblog-backend.onrender.com/posts/' + parentId + "/comments");
    return this.http.get<Posts[]>(`${this.apiUrl}/posts/${parentId}/comments`, { headers }).pipe(catchError(error => this.handleError(error)));
  
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
    const body = { title, content };
    // const req = this.http.post<Posts>('https://dblog-backend.onrender.com/posts', body, { headers });
    console.log(headers);
    const req = this.http.post<Posts>(`${this.apiUrl}/posts`, body, { headers });
    req.subscribe({
      next: data => console.log('post publicado', data.title),
      error: err => console.log('Erro ao publicar', err, body)
    });
  }

  changeLike(id: string){
    const headers = this.buildHeadersWithToken();
    const req = this.http.post<Posts>(`${this.apiUrl}/posts/${id}/like`, {}, { headers });
    req.subscribe({
      next: data => console.log('Like dado em', data.title),
      error: err => console.log('Erro ao publicar', err)
    });
  }

  
  newComment(content: string, parent: string ){
    const headers = this.buildHeadersWithToken();
    const title = "Comentário em " + parent;
    const body = { title, content, parent };
    console.log(body);
    const req = this.http.post<Posts>(`${this.apiUrl}/posts`, body, { headers });
    //const req = this.http.post<Posts>('http://localhost:8080/posts', body, { headers });
    req.subscribe({
      next: data => console.log('post publicado', data.parent),
      error: err => console.log('Erro ao publicar', err, body)
    });
  }

  deletePost(postId: string){
    const headers = this.buildHeadersWithToken();
    const deleteUrl = `${this.apiUrl}/posts/${postId}`;
    const req = this.http.delete(deleteUrl, { headers });
    req.subscribe({
      next: () => {console.log('deletado'); this.getPosts();},
      error: err => console.log('Erro ao deletar', err)
    });
    
  }
}
