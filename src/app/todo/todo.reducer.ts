import { Todo } from './todo';
import * as TodoActions from './todo.actions';

export interface TodoState {
    data: Todo[];
    loading: boolean;
    error: Error | string;
}

export const initialState: TodoState = {
    data: [],
    loading: false,
    error: ''
};


export function reducer(
    state = initialState,
    action: TodoActions.LoadTodos | TodoActions.FailLoad | TodoActions.SuccessLoad |
      TodoActions.UpdateTodo | TodoActions.CreateTodo | TodoActions.DeleteTodo
  ): TodoState {
    switch (action.type) {
      case TodoActions.ActionTypes.CreateTodo:
      case TodoActions.ActionTypes.UpdateTodo:
      case TodoActions.ActionTypes.DeleteTodo:
      case TodoActions.ActionTypes.LoadTodos: {
        return {
          ...state,
          loading: true
        };
      }
      case TodoActions.ActionTypes.FailLoad: {
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      }
      case TodoActions.ActionTypes.SuccessLoad: {
        return {
          ...state,
          loading: false,
          data: action.payload
        };
      }
    }

    return state;
  }
