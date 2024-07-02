import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../models/todo';
import { TodoListService } from '../service/todo-list.service';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-upcoming-todos',
  templateUrl: './upcoming-todos.component.html',
  // templateUrl: '../todo-list/todo-list.component.html',
  // styleUrl: './upcoming-todos.component.css',
  styleUrl: '../todo-list/todo-list.component.css',
})
export class UpcomingTodosComponent {
  upcomingTodoList: Todo[] = [];

  incompleteTodos: Todo[] = [];
  completedTodos: Todo[] = [];
  todoSectionName: string = 'Upcoming';

  constructor(
    private todoListService: TodoListService,
    private todoService: TodoService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchUpcomingTodoList();
  }

  fetchUpcomingTodoList() {
    this.todoListService.fetchAllTodos().subscribe((data) => {
      const today = new Date();
      let endDate = new Date();
      endDate.setDate(today.getDate() + 7); // Calculate the date 7 days from today

      // Filter tasks due in the next 7 days
      this.upcomingTodoList = data.filter((todo: Todo) => {
        if (todo.dueDate) {
          const dueDate = new Date(todo.dueDate);
          // Return tasks with due dates from today to the next 7 days
          return dueDate >= today && dueDate <= endDate;
        }
        return false;
      });

      if (this.upcomingTodoList.length === 0) {
        console.log('No tasks due in the next 7 days');
        this._snackBar.open('No tasks due in the next 7 days', 'Close', {
          duration: 2000,
        });
      }

      const activeTodos = this.upcomingTodoList.filter(todo => !todo.archive);
      this.filterTodo(activeTodos);
    });
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe(data => {
      this.fetchUpcomingTodoList();
    });
    this.filterTodo([todo]);
  }

  filterTodo(todos: Todo[]) {
    console.log('inside filterTodo: ',todos);
    this.incompleteTodos = todos.filter((todo: Todo) => !todo.completed);
    this.completedTodos = todos.filter((todo: Todo) => todo.completed);    
  }

  isAddingTodo: boolean = false;

  toggleAddTodo() {
    this.isAddingTodo = !this.isAddingTodo;
  }

  closeAddTodo() {
    this.isAddingTodo = false;
    this.fetchUpcomingTodoList();
  }
}
