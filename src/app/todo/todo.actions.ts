import { Action } from '@ngrx/store';
 
export enum ActionTypes {
  LoadTodos = '[Todo] Load',
  SetTodoDone = '[Todo] SetDone',
  CreateTodo = '[Todo] Create',
  FailLoad = '[Todo] FailLoad',
  SuccessLoad = '[Todo] SuccessLoad',
}
 
export class LoadTodos implements Action {
  readonly type = ActionTypes.LoadTodos;
}
 
export class SetTodoDone implements Action {
  readonly type = ActionTypes.SetTodoDone;
  constructor(public payload:any) { }
}

export class CreateTodo implements Action {
  readonly type = ActionTypes.CreateTodo;
  constructor(public payload:any) { }
}
 
export class FailLoad implements Action {
  readonly type = ActionTypes.FailLoad;
  constructor(public payload:any) { }
}
 
export class SuccessLoad implements Action {
  readonly type = ActionTypes.SuccessLoad;
  constructor(public payload:any) { }
}