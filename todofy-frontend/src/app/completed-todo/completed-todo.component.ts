import { Component } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoListService } from '../service/todo-list.service';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-completed-todo',
  templateUrl: './completed-todo.component.html',
  // styleUrl: './completed-todo.component.css'
  styleUrl: '../todo-list/todo-list.component.css'
})
export class CompletedTodoComponent {
  completedTodos: Todo[] = [];
  allTodos: Todo[] = []; // Store all todos for filtering

  todoSectionName: string = 'Completed';
  isAddingTodo: boolean = false;
  searchQuery: string = ''; // Add a search query variable

  constructor(
    private todoListService: TodoListService,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.fetchCompletedList();
  }

  fetchCompletedList() {
    this.todoListService.fetchAllTodos().subscribe((data: Todo[]) => {
      const activeTodos = data.filter(todo => !todo.archive);
      this.allTodos = activeTodos; // Store all active todos
      this.filterTodo();
    });
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe(() => {
      this.fetchCompletedList(); // Refresh list after updating
    });
  }

  filterTodo() {
    const query = this.searchQuery.toLowerCase();
    if (query) {
      const filteredTodos = this.allTodos.filter(todo => 
        todo.todoContent?.toLowerCase().includes(query)
      );
      this.completedTodos = filteredTodos.filter(todo => todo.completed);
    } else {
      this.completedTodos = this.allTodos.filter(todo => todo.completed);
    }
  }

  toggleAddTodo() {
    this.isAddingTodo = !this.isAddingTodo;
  }

  closeAddTodo() {
    this.isAddingTodo = false;
    this.fetchCompletedList();
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.filterTodo();
  }
}
