import { CanDeactivateFn } from '@angular/router';
import { UpdateTodoComponent } from '../update-todo/update-todo.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';

export const canLeaveGuard: CanDeactivateFn<UpdateTodoComponent | UpdateProfileComponent> = (component: UpdateTodoComponent | UpdateProfileComponent, currentRoute, currentState, nextState) => {
  return component.canDeactivateComponent ? component.canDeactivateComponent() : true;
};
