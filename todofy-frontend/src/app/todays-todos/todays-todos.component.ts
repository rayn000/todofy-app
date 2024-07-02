import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoListService } from '../service/todo-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todays-todos',
  // templateUrl: './todays-todos.component.html',
  templateUrl: '../todo-list/todo-list.component.html',
  // styleUrl: './todays-todos.component.css',
  styleUrl: '../todo-list/todo-list.component.css',
})
export class TodaysTodosComponent implements OnInit {

  todaysTodoList: Todo[] = [];

  incompleteTodos: Todo[] = [];
  completedTodos: Todo[] = [];

  todoSectionName: string = 'Today';
  isAddingTodo: boolean = false;
  searchQuery: string = ''; // Search query variable

  constructor(
    private todoListService: TodoListService,
    private _snackBar: MatSnackBar,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.fetchTodaysTodoList();
  }

  fetchTodaysTodoList() {
    this.todoListService.fetchAllTodos().subscribe((data: Todo[]) => {
      const today = new Date();
      const todayString = today.toLocaleDateString('en-US');
      const activeTodos = data.filter(todo => !todo.archive);

      this.todaysTodoList = activeTodos.filter((todo: Todo) => {
        if (todo.dueDate) {
          const todoDueDateString = new Date(todo.dueDate).toLocaleDateString('en-US');
          return todoDueDateString === todayString;
        }
        return false;
      });

      if (this.todaysTodoList.length === 0) {
        this._snackBar.open('No tasks due today', 'Close', {
          duration: 2000,
        });
      }

      this.filterTodo(); // Apply filtering for search query
    });
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe(() => {
      this.fetchTodaysTodoList(); // Refresh the list after updating
    });
  }

  filterTodo() {
    const query = this.searchQuery.toLowerCase();
    const filteredTodos = this.todaysTodoList.filter(todo => 
      todo.todoContent?.toLowerCase().includes(query)
    );
    this.incompleteTodos = filteredTodos.filter(todo => !todo.completed);
    this.completedTodos = filteredTodos.filter(todo => todo.completed);
  }

  toggleAddTodo() {
    this.isAddingTodo = !this.isAddingTodo;
  }

  closeAddTodo() {
    this.isAddingTodo = false;
    this.fetchTodaysTodoList();
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.filterTodo();
  }
}