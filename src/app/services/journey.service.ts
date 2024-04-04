import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { JourneyNode } from '../_interfaces/JourneyNode';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private buildHeadersWithToken() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  getAllJourneyRoots(): Observable<JourneyNode[]>{   
    return this.http.get<JourneyNode[]>('https://localhost:8080/journey').pipe(catchError(error => this.handleError(error)));;
  }
  
  getAllJourney(id: String): Observable<JourneyNode[]>{
    return this.http.get<JourneyNode[]>('https://localhost:8080/journey/' + id).pipe(catchError(error => this.handleError(error)));
  }

  getOneJourney(rootId: string, id:string):Observable<JourneyNode>{
    return this.http.get<JourneyNode>('http://localhost:8080/' + rootId + "/" + id).pipe(catchError(error => this.handleError(error)));
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

  newJourney(text: string){
    const headers = this.buildHeadersWithToken();
    const body = {text};
    const req = this.http.post<JourneyNode>('https://localhost:8080/journey', body, { headers });
    req.subscribe({
      next: data => console.log('post publicado', data.id),
      error: err => console.log('Erro ao publicar', err, body)
    });
  }

  newJourneyNode(text:string, root: JourneyNode, parent: JourneyNode){
    const headers = this.buildHeadersWithToken();
    const body = {text, root, parent};
    const req = this.http.post<JourneyNode>('https://localhost:8080/journey', body, { headers });
    req.subscribe({
      next: data => console.log('post publicado', data.id),
      error: err => console.log('Erro ao publicar', err, body)
    });
  }

}
