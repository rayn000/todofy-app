import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private createHeaders(): HttpHeaders {
    const token = this.tokenService.getToken(); // Fetch the token dynamically
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  fetchUser(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get<any>('http://localhost:9000/todoapi/user/fetch-user', { headers });
  }

  updateUser(user: User): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put<any>('http://localhost:9000/todoapi/user/update', user, { headers });
  }

  deleteUser(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete<any>('http://localhost:9000/todoapi/user/delete', { headers });
  }
  
}
