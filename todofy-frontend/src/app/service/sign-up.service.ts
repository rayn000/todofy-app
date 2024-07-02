import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUp } from '../models/sign-up';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  registerUser(user: SignUp): Observable<any> {
    return this.http.post<any>('http://localhost:9000/todoapi/register', user);
  }
}
