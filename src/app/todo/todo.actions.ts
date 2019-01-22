import { Action } from '@ngrx/store';
 
export enum ActionTypes {
  LoadTodos = '[Todo] Load',
  FailLoad = '[Todo] FailLoad',
  SuccessLoad = '[Todo] SuccessLoad',
}
 
export class LoadTodos implements Action {
  readonly type = ActionTypes.LoadTodos;
}
 
export class FailLoad implements Action {
  readonly type = ActionTypes.FailLoad;
  constructor(public payload:any) { }
}
 
export class SuccessLoad implements Action {
  readonly type = ActionTypes.SuccessLoad;
  constructor(public payload:any) { }
}