import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInService } from './sign-in.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private http: HttpClient, private signInService: SignInService, private tokenService: TokenService) { }

  private createHeaders(): HttpHeaders {
    const token = this.tokenService.getToken(); // Fetch the token dynamically
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  fetchAllTodos(): Observable<any> {
    const headers = this.createHeaders();    
    return this.http.get<any>('http://localhost:9000/todoapi/user/fetch-todos', { headers });
  }
}
