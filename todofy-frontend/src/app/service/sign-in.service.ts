import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class SignInService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login(user: any): Observable<any> {
    return this.http
      .post<any>('http://localhost:9000/authapi/login', user)
      .pipe(
        map((response) => {
          const token = response.token;
          this.tokenService.setToken(token);
          return response;
        })
      );
  }
}
