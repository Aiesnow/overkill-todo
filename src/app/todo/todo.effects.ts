import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of,  } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TodoService } from './todo.service';
import { ActionTypes, FailLoad, SuccessLoad, UpdateTodo, LoadTodos, CreateTodo, DeleteTodo } from './todo.actions';
import { Todo } from './todo';
 
@Injectable()
export class TodoEffects {
 
  @Effect()
  loadTodos$ = this.actions$
    .pipe(
      ofType(ActionTypes.LoadTodos),
      mergeMap(() => this.todoService.getAllTodos()
        .pipe(
          map((todos: Todo[]) => new SuccessLoad(todos)),
          catchError(error => of(new FailLoad(error)))
        )
      )
    );
 
  @Effect()
  updateTodo$ = this.actions$
    .pipe(
      ofType(ActionTypes.UpdateTodo),
      mergeMap((action:UpdateTodo) => this.todoService.updateTodo(action.payload)
        .pipe(
          map(() => {
            // Once the update is done, reload Todos
            return new LoadTodos();
          }),
          catchError(error => of(new FailLoad(error)))
        )
      )
    );
 
  @Effect()
  createTodo$ = this.actions$
    .pipe(
      ofType(ActionTypes.CreateTodo),
      mergeMap((action:CreateTodo) => this.todoService.createTodo(action.payload)
        .pipe(
          map(() => {
            // Once the creation is done, reload Todos
            return new LoadTodos();
          }),
          catchError(error => of(new FailLoad(error)))
        )
      )
    );

  @Effect()
  deleteTodo$ = this.actions$
    .pipe(
      ofType(ActionTypes.DeleteTodo),
      mergeMap((action:DeleteTodo) => this.todoService.deleteTodo(action.payload)
        .pipe(
          map(() => {
            // Once the creation is done, reload Todos
            return new LoadTodos();
          }),
          catchError(error => of(new FailLoad(error)))
        )
      )
    );
 
  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}
}