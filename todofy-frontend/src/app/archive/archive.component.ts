import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../service/todo-list.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  // styleUrl: './archive.component.css'
  styleUrl: '../todo-list/todo-list.component.css'
})
export class ArchiveComponent implements OnInit {

  archiveList: Todo[] = [];
  todoSectionName: string = 'Archive';

  constructor (private todoListService: TodoListService) {}

  ngOnInit(): void {
    this.fetchArchivedTodoList();
  }

  fetchArchivedTodoList() {
    this.todoListService.fetchAllTodos().subscribe((data) => {
      this.archiveList = data.filter((todo: Todo) => todo.archive === true);
      if (this.archiveList === null) {
        console.log('Archive is empty');
      }
    });
  }
}
