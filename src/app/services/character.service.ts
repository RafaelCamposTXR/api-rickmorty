import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}


  getCharacters(page: number): Observable<any> {
    const url = `${this.apiUrl}?page=${page}`; 
    return this.http.get<any>(url).pipe(
      tap((data) => console.log('Dados da API:', data)), 
      catchError((error) => {
        console.error('Erro ao buscar os personagens:', error); 
        return throwError(error); 
      })
    );
  }

  getAllCharacters(): Observable<any[]> {
    const requests = [];

    for (let page = 1; page <= 42; page++) {
      requests.push(this.getCharacters(page));
    }


    return forkJoin(requests).pipe(
      map(responses => {
        // Concatena todos os resultados em um único array
        return responses.reduce((acc, curr) => acc.concat(curr.results), []);
      })
    );
  }
}
