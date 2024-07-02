import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from '../service/todo.service';
import { Todo } from '../models/todo';
import { IdGeneratorService } from '../service/id-generator.service';
import { RouterService } from '../service/router.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  minDate: any;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private todoService: TodoService,
    private idGenerator: IdGeneratorService,
    private router: RouterService,
  ) {
    this.minDate = new Date();
  }

  @Output()
  todoAdded: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  isAdding: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {}

  addTask() {
    const newId = this.idGenerator.todoIdGenerator();

    const dueDateControl = this.dueDate;
    const dueDateValue = dueDateControl ? dueDateControl.value : null;
    const localDueDate = dueDateValue ? new Date(dueDateValue).toLocaleDateString('en-US') : '';

    this.addTaskForm.patchValue({
      todoId: newId,
      todoCreationDate: new Date().toLocaleDateString('en-US'),
      dueDate: localDueDate,
    });

    const todo: Todo = this.addTaskForm.value as Todo;

    this.todoService.addTodo(todo).subscribe({
      next: (response) => {
        console.log('Todo added:', response);
        this._snackBar.open('Task added successfully', 'Close', {
          duration: 2000,
        });
        this.todoAdded.emit();

        this.isAdding.emit(false);
        this.addTaskForm.reset();
        this.router.navigateToSideNav();
      },
      error: (err) => {
        console.error('Error adding todo:', err);
        this._snackBar.open('Failed to add task', 'Close', {
          duration: 2000,
        });
      },
    });
  }

  addTaskForm = this.fb.group({
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
    return this.addTaskForm.get('todoContent');
  }
  get priority() {
    return this.addTaskForm.get('priority');
  }
  get dueDate() {
    return this.addTaskForm.get('dueDate');
  }
  get category() {
    return this.addTaskForm.get('category');
  }
  get archive() {
    return this.addTaskForm.get('archive');
  }
  get completed() {
    return this.addTaskForm.get('completed');
  }

  showArchivePopup = false;
  showPriorityPopup = false;
  priorityIcon: string = '../../assets/icons/flag.svg';
  archiveIcon: string = '../../assets/icons/archive.svg';
  
  closeAddTodo() {
    this.isAdding.emit(false);
    // this.router.navigateToTodoList();
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
    this.addTaskForm.patchValue({ archive });
    this.archiveIcon = archive ? '../../assets/icons/archive-filled.svg' : '../../assets/icons/archive.svg'; // Update icon based on selection
    this.showArchivePopup = false; // Close the popup after selection
  }

  selectPriority(priority: string) {
    this.addTaskForm.patchValue({ priority });
    this.updatePriorityIcon(priority);
    this.showPriorityPopup = false; // Close the popup after selection
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
