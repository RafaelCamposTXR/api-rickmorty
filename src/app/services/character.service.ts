import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap((data) => console.log('Dados da API:', data)), 
      catchError((error) => {
        console.error('Erro ao buscar os personagens:', error); 
        return throwError(error); 
      })
    );
  }
}
