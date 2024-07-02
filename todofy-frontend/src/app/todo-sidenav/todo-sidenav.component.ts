import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenService } from '../service/token.service';
import { TodoListService } from '../service/todo-list.service';
import { Todo } from '../models/todo';
import { RouterService } from '../service/router.service';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-todo-sidenav',
  templateUrl: './todo-sidenav.component.html',
  styleUrl: './todo-sidenav.component.css',
})
export class TodoSidenavComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private tokenService: TokenService,
    private routerService: RouterService,
    private todoListService: TodoListService,
    private userService: UserService,
    private router: Router
  ) {
    this.fetchTodoListByCategory();
  }
  
  ngOnInit(): void {
    this.routerService.navigateToTodoList();
    this.fetchTodoListByCategory();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.fetchTodoListByCategory();
        console.log("Todo-sidenav router event is working");
        
      }
    });

    this.fetchUser();
  }

  todoList: Todo[] = [];
  categoryList: any[] = [];
  showCategory: boolean = true;

  signOut() {
    this.tokenService.removeToken();
    this.routerService.navigateToHome();
  }

  fetchTodoListByCategory() {
    this.todoListService.fetchAllTodos().subscribe((data) => {
      const activeTodos = data.filter((todo: Todo) => !todo.archive);
      this.todoList = activeTodos
        .map((todo: Todo) => todo.category)
        .filter((category: string) => category);

      this.categoryList = Array.from(new Set(this.todoList));
      console.log(this.categoryList);
    });
  }


  // User profile name
  firstName: string = '';

  fetchUser() {
    this.userService.fetchUser().subscribe((data) => {
      this.firstName = data.firstName;
    });
  }
}
