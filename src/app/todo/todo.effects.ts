import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of,  } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TodoService } from './todo.service';
import { ActionTypes, FailLoad, SuccessLoad } from './todo.actions';
 
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
 
  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}
}