import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodoSidenavComponent } from './todo-sidenav/todo-sidenav.component';
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { CategoryComponent } from './category/category.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ArchiveComponent } from './archive/archive.component';
import { TodaysTodosComponent } from './todays-todos/todays-todos.component';
import { UpcomingTodosComponent } from './upcoming-todos/upcoming-todos.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { authGuard } from './guards/auth.guard';
import { canLeaveGuard } from './guards/can-leave.guard';
import { CompletedTodoComponent } from './completed-todo/completed-todo.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'sign-in', component: SignInComponent },
  { path: 'app',
    component: TodoSidenavComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'all-tasks', pathMatch: 'full' },
      { path: 'all-tasks', component: TodoListComponent },
      { path: 'task/:id', component: UpdateTodoComponent, canDeactivate: [canLeaveGuard] },
      { path: 'archive', component: ArchiveComponent },
      { path: 'today', component: TodaysTodosComponent },
      { path: 'upcoming', component: UpcomingTodosComponent },
      { path: 'completed', component: CompletedTodoComponent },
      { path: 'category/:name', component: CategoryComponent },
      { path: 'profile', component: UpdateProfileComponent, canDeactivate: [canLeaveGuard] },
      { path: '**', redirectTo: 'all-tasks', pathMatch: 'full' },
    ]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
