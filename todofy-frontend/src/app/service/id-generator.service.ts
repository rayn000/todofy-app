import { Injectable } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class IdGeneratorService {
  todoList: Todo[] = [];
  num: number = 0;
  counter: number = 0;

  constructor(private todoListService: TodoListService) {
    console.log('Inside IdGeneratorService Constructor');
    this.fetchTodoList();
  }

  fetchTodoList() {
    this.todoListService.fetchAllTodos().subscribe((data: Todo[]) => {
      this.todoList = data;

      const lastTodoId = this.getLastTodoId();
      console.log(lastTodoId);

      if (lastTodoId) {
        this.num = this.extractNumberFromTodoId(lastTodoId);
        console.log('Extracted Number:', this.num);
        this.counter = this.num;
      }
    });
  }

  getLastTodoId(): string | undefined {
    if (this.todoList.length === 0) {
      return undefined;
    }
    const lastTodo = this.todoList[this.todoList.length - 1];
    console.log('Last Todo ID:', lastTodo.todoId);
    return lastTodo.todoId;
  }

  extractNumberFromTodoId(todoId: string | undefined): number {
    if (!todoId) {
      return 0;
    }
    const numberPart = todoId.slice(2);
    return parseInt(numberPart, 10);
  }

  todoIdGenerator() {
    console.log("id gen is working");
    this.counter += 1;
    return `td${this.counter}`;
  }
}
