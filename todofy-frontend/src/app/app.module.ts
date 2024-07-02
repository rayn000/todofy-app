import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { QuillModule } from 'ngx-quill'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TodoSidenavComponent } from './todo-sidenav/todo-sidenav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

// import { MomentDateAdapter } from '@angular/material-moment-adapter';
// import { MY_FORMATS } from './models/my-date-format';

// import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { SignInService } from './service/sign-in.service';
import { SignUpService } from './service/sign-up.service';
import { TodoListService } from './service/todo-list.service';
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { ArchiveComponent } from './archive/archive.component';
import { TodaysTodosComponent } from './todays-todos/todays-todos.component';
import { UpcomingTodosComponent } from './upcoming-todos/upcoming-todos.component';
import { CategoryComponent } from './category/category.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AcountDeletionDialogComponent } from './acount-deletion-dialog/acount-deletion-dialog.component';
import { SearchTodoComponent } from './search-todo/search-todo.component';
import { CompletedTodoComponent } from './completed-todo/completed-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SignUpComponent,
    SignInComponent,
    TodoSidenavComponent,
    TodoListComponent,
    PageNotFoundComponent,
    AddTodoComponent,
    UpdateTodoComponent,
    ArchiveComponent,
    TodaysTodosComponent,
    UpcomingTodosComponent,
    CategoryComponent,
    UpdateProfileComponent,
    AcountDeletionDialogComponent,
    SearchTodoComponent,
    CompletedTodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatRippleModule,
    MatToolbarModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
    MatChipsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    QuillModule.forRoot(),
  ],
  providers: [
    provideAnimationsAsync(),
    SignUpService,
    SignInService,
    TodoListService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
