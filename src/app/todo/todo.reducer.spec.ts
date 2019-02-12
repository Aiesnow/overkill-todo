import { initialState, reducer } from './todo.reducer';
import * as TodoActions from './todo.actions';

describe('TodoReducer', () => {
    it('should return the loading default state', () => {
        const expectedState = Object.assign({}, initialState);
        expectedState.loading = true;
        const state = reducer(undefined, new TodoActions.LoadTodos());

        expect(state).toEqual(expectedState);
    });

    it('should return a success state with data', () => {
        const data = [{
            id: 1,
            title: 'Some task',
            done: false,
            description: 'description'
        }];
        const loadingState = Object.assign({}, initialState);
        loadingState.loading = true;
        const state = reducer(loadingState, new TodoActions.SuccessLoad(data));

        expect(state.data).toBe(data);
        expect(state.loading).toBe(false);
    });

    it('should return a failed state with an error', () => {
        const error = new Error('Failed to fetch todos');
        const loadingState = Object.assign({}, initialState);
        loadingState.loading = true;
        const state = reducer(loadingState, new TodoActions.FailLoad(error));

        expect(state.error).toBe(error);
        expect(state.loading).toBe(false);
    });
});
