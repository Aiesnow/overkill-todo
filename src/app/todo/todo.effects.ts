import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of,  } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TodoService } from './todo.service';
import { ActionTypes, FailLoad, SuccessLoad, SetTodoDone, LoadTodos } from './todo.actions';
import { Action } from '@ngrx/store';
 
@Injectable()
export class TodoEffects {
 
  @Effect()
  loadTodos$ = this.actions$
    .pipe(
      ofType(ActionTypes.LoadTodos),
      mergeMap(() => this.todoService.getAllTodos()
        .pipe(
          map(todos => new SuccessLoad(todos)),
          catchError(error => of(new FailLoad(error)))
        ))
      );
 
  @Effect()
  setTodoDone$ = this.actions$
    .pipe(
      ofType(ActionTypes.SetTodoDone),
      mergeMap((action:SetTodoDone) => this.todoService.setTodoDone(action.payload)
        .pipe(
          map(() => {
            // Once the update is done, reload Todos
            return new LoadTodos();
          }),
          catchError(error => of(new FailLoad(error)))
        ))
      );
 
  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}
}