import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../models/todo';
import { TodoService } from '../service/todo.service';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../service/router.service';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrl: './update-todo.component.css'
})
export class UpdateTodoComponent implements OnInit {
  canDeactivate: boolean = false;
  minDate: any;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private todoService: TodoService,
    private activatedRoute: ActivatedRoute,
    private router: RouterService
  ) {
    this.minDate = new Date();
  }

  @Output()
  todoUpdated: EventEmitter<string> = new EventEmitter<string>();

  id: any;
  fetchedTodo: Todo = {};

  ngOnInit(): void {
    this.activatedRoute.paramMap?.subscribe(data => {
      this.id = data.get('id') ?? 0;      
      console.log('onInit:', this.id);
      if (this.id !== 0) {
        this.getTodo(this.id);
      }
    });
  }

  getTodo(todoId: any) {
    this.todoService.fetchTodo(todoId).subscribe(data => {
      this.fetchedTodo = data;

      const dueDateControl = this.fetchedTodo.dueDate;
      console.log(dueDateControl);
      const dueDateValue = dueDateControl ? dueDateControl.valueOf() : null;
      const matDueDate = dueDateValue ? new Date(dueDateValue).toISOString() : '';

      // Pre-fill the form with the fetched data
      this.updateTaskForm.patchValue({
        todoId: this.fetchedTodo.todoId,
        todoContent: this.fetchedTodo.todoContent,
        todoCreationDate: this.fetchedTodo.todoCreationDate,
        priority: this.fetchedTodo.priority,
        dueDate: matDueDate,
        category: this.fetchedTodo.category,
        archive: this.fetchedTodo.archive,
        completed: this.fetchedTodo.completed
      });
      // Update the priority and archive icons
      if (this.fetchedTodo.priority !== undefined) {
        this.updatePriorityIcon(this.fetchedTodo.priority);
      }
      this.archiveIcon = this.fetchedTodo.archive ? '../../assets/icons/archive-filled.svg' : '../../assets/icons/archive.svg';
    });
  }

  updateTask() {
    const todo: Todo = this.updateTaskForm.value as Todo;
    todo.todoId = this.id;

    console.log('Updating task:', todo.todoId);

    this.todoService.updateTodo(todo).subscribe({
      next: (response) => {
        console.log('Task updated:', response);
        this._snackBar.open('Task updated successfully', 'Close', {
          duration: 2000,
        });
        this.todoUpdated.emit();

        this.canDeactivate = true;
        this.router.navigateToTodoList();
      },
      error: (err) => {
        console.error('Error updating task:', err);
        this._snackBar.open('Failed to update task', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  deleteTodo() {
    const confirmDelete = confirm('Are you sure you want to delete task?');
    
    if(confirmDelete === true) {
      this.todoService.deleteTodo(this.id).subscribe({
        next: () => {
          this._snackBar.open('Task deleted successfully', 'Close', {
            duration: 2000,
          });
          this.router.navigateToTodoList();
        },
        error: (err) => {
          console.error('Error deleting task:', err);
          this._snackBar.open('Failed to delete task', 'Close', {
            duration: 2000,
          });
        }
      });
    }
  }

  canDeactivateComponent() {
    console.log('canDeactivate outside if statement');
    if (this.updateTaskForm.dirty && !this.canDeactivate) {
      console.log('canDeactivate inside if statement');
      
      return confirm('You have unsaved changes. Are you sure you want to leave?');
    }
    return true;
  }

  updateTaskForm = this.fb.group({
    todoId: [''],
    todoContent: ['', Validators.required],
    todoCreationDate: [''],
    priority: [''],
    dueDate: [''],
    category: [''],
    archive: [false],
    completed: [false],
  });

  get todoContent() {
    return this.updateTaskForm.get('todoContent');
  }
  get priority() {
    return this.updateTaskForm.get('priority');
  }
  get dueDate() {
    return this.updateTaskForm.get('dueDate');
  }
  get category() {
    return this.updateTaskForm.get('category');
  }
  get archive() {
    return this.updateTaskForm.get('archive');
  }
  get completed() {
    return this.updateTaskForm.get('completed');
  }



  // //////////////////////////////////////////////
  showArchivePopup = false;
  showPriorityPopup = false;
  priorityIcon: string = '../../assets/icons/flag.svg';
  archiveIcon: string = '../../assets/icons/archive.svg';
  
  closeAddTodo() {
    this.router.navigateToSideNav();
  }

  toggleArchivePopup() {
    this.showArchivePopup = !this.showArchivePopup;
    if (this.showArchivePopup) {
      this.showPriorityPopup = false;
    }
  }

  togglePriorityPopup() {
    this.showPriorityPopup = !this.showPriorityPopup;
    if (this.showPriorityPopup) {
      this.showArchivePopup = false;
    }
  }

  selectArchive(archive: boolean) {
    this.updateTaskForm.patchValue({ archive });
    this.archiveIcon = archive ? '../../assets/icons/archive-filled.svg' : '../../assets/icons/archive.svg';
    this.showArchivePopup = false;
  }

  selectPriority(priority: string) {
    this.updateTaskForm.patchValue({ priority });
    this.updatePriorityIcon(priority);
    this.showPriorityPopup = false;
  }

  updatePriorityIcon(priority: string) {
    switch (priority) {
      case 'low':
        this.priorityIcon = '../../assets/icons/flag-blue.svg';
        break;
      case 'medium':
        this.priorityIcon = '../../assets/icons/flag-yellow.svg';
        break;
      case 'high':
        this.priorityIcon = '../../assets/icons/flag-red.svg';
        break;
      default:
        this.priorityIcon = '../../assets/icons/flag.svg';
    }
  }
}
