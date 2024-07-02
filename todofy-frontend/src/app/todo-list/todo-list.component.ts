import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../service/todo-list.service';
import { Todo } from '../models/todo';
import { TodoService } from '../service/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  incompleteTodos: Todo[] = [];
  completedTodos: Todo[] = [];
  allTodos: Todo[] = []; // Store all todos for filtering

  todoSectionName: string = 'All';
  isAddingTodo: boolean = false;
  searchQuery: string = ''; // Add a search query variable

  constructor(
    private todoListService: TodoListService,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.fetchTodoList();
  }

  fetchTodoList() {
    this.todoListService.fetchAllTodos().subscribe((data: Todo[]) => {
      const activeTodos = data.filter(todo => !todo.archive);
      this.allTodos = activeTodos; // Store all active todos
      this.filterTodo();
    });
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe(() => {
      this.fetchTodoList(); // Refresh list after updating
    });
  }

  filterTodo() {
    const query = this.searchQuery.toLowerCase();
    if (query) {
      const filteredTodos = this.allTodos.filter(todo => 
        todo.todoContent?.toLowerCase().includes(query)
      );
      this.incompleteTodos = filteredTodos.filter(todo => !todo.completed);
      this.completedTodos = filteredTodos.filter(todo => todo.completed);
    } else {
      this.incompleteTodos = this.allTodos.filter(todo => !todo.completed);
      this.completedTodos = this.allTodos.filter(todo => todo.completed);
    }
  }

  toggleAddTodo() {
    this.isAddingTodo = !this.isAddingTodo;
  }

  closeAddTodo() {
    this.isAddingTodo = false;
    this.fetchTodoList();
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.filterTodo();
  }
}