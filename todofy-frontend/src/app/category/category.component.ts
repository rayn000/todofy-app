import { Component, OnInit } from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { Todo } from '../models/todo';
import { TodoListService } from '../service/todo-list.service';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-category',
  // templateUrl: './category.component.html',
  templateUrl: '../todo-list/todo-list.component.html',
  // styleUrl: './category.component.css'
  styleUrl: '../todo-list/todo-list.component.css'
})
export class CategoryComponent implements OnInit {

  category: string = '';
  todoSectionName: string = 'Category';

  todoList: Todo[] = [];
  incompleteTodos: Todo[] = [];
  completedTodos: Todo[] = [];

  isAddingTodo: boolean = false;
  searchQuery: string = ''; // Add a search query variable

  constructor(
    private todoListService: TodoListService,
    private todoService: TodoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap?.subscribe(data => {
      this.category = data.get('name') ?? '';
      this.fetchTodoList();
      console.log('onInit:', this.category);
    });
  }

  fetchTodoList() {
    this.todoListService.fetchAllTodos().subscribe((data) => {
      const activeTodos = data.filter((todo: Todo) => !todo.archive);
      this.todoList = activeTodos.filter((todo: Todo) => todo.category === this.category);

      this.filterTodo(); // Update to apply search query if present
    });
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe(() => {
      this.fetchTodoList();
    });
  }

  filterTodo() {
    const query = this.searchQuery.toLowerCase();
    if (query) {
      const filteredTodos = this.todoList.filter(todo => 
        todo.todoContent?.toLowerCase().includes(query)
      );
      this.incompleteTodos = filteredTodos.filter(todo => !todo.completed);
      this.completedTodos = filteredTodos.filter(todo => todo.completed);
    } else {
      this.incompleteTodos = this.todoList.filter(todo => !todo.completed);
      this.completedTodos = this.todoList.filter(todo => todo.completed);
    }
  }

  toggleAddTodo() {
    this.isAddingTodo = !this.isAddingTodo;
  }

  closeOverlay(event: MouseEvent) {
    this.isAddingTodo = false;
  }

  closeAddTodo() {
    this.isAddingTodo = false;
    this.fetchTodoList();
  }

  // Method to handle search input and update the search query
  onSearch(query: string) {
    this.searchQuery = query;
    this.filterTodo();
  }
}
