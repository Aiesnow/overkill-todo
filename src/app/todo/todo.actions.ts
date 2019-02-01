import { Action } from '@ngrx/store';
import { Todo } from './todo';
 
export enum ActionTypes {
  LoadTodos = '[Todo] Load',
  UpdateTodo = '[Todo] Update',
  DeleteTodo = '[Todo] Delete',
  CreateTodo = '[Todo] Create',
  FailLoad = '[Todo] FailLoad',
  SuccessLoad = '[Todo] SuccessLoad',
}
 
export class LoadTodos implements Action {
  readonly type = ActionTypes.LoadTodos;
}
 
export class UpdateTodo implements Action {
  readonly type = ActionTypes.UpdateTodo;
  constructor(public payload:Todo) { }
}
 
export class DeleteTodo implements Action {
  readonly type = ActionTypes.DeleteTodo;
  constructor(public payload:number) { }
}

export class CreateTodo implements Action {
  readonly type = ActionTypes.CreateTodo;
  constructor(public payload:Todo) { }
}
 
export class FailLoad implements Action {
  readonly type = ActionTypes.FailLoad;
  constructor(public payload:Error) { }
}
 
export class SuccessLoad implements Action {
  readonly type = ActionTypes.SuccessLoad;
  constructor(public payload:Todo[]) { }
}