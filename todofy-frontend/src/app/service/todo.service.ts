import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  private createHeaders(): HttpHeaders {
    const token = this.tokenService.getToken(); // Fetch the token dynamically
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  addTodo(todo: Todo): Observable<Todo> {
    const headers = this.createHeaders();    
    return this.http.post<Todo>('http://localhost:9000/todoapi/user/add-todo', todo, { headers });
  }

  fetchTodo(todoId: Todo): Observable<Todo> {
    const headers = this.createHeaders();    
    return this.http.get<Todo>(`http://localhost:9000/todoapi/user/fetch-todo/${todoId}`, { headers });
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const headers = this.createHeaders();    
    return this.http.put<Todo>(`http://localhost:9000/todoapi/user/update-todo`, todo, { headers });
  }

  deleteTodo(todoId: Todo): Observable<Todo> {
    const headers = this.createHeaders();    
    return this.http.delete<Todo>(`http://localhost:9000/todoapi/user/delete-todo/${todoId}`, { headers });
  }
}
