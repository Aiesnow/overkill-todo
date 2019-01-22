import { SortTodos } from './sort-todos.pipe';
import {InMemoryBackend} from '../todo/todo.backend';
import { Todo } from '../todo/todo';

describe('Pipe: SortTodos', () => {
    let pipe: SortTodos;
    let todos: Todo[];

    beforeEach(() => {
        pipe = new SortTodos();
        todos = new InMemoryBackend().createDb().todos;
    });

    it('sort done todos at the end, with descending ID', () => {
        let expectedTodos = [
            {
                id: 3,
                title: "Unit tests",
                done: false
            },
            {
                id: 2,
                title: "Develop new feature",
                done: false
            },
            {
                id: 4,
                title: "Update CI",
                done: true
            },
            {
                id: 1,
                title: "Clean Database",
                done: true
            }
        ];
        let sortedTodos = pipe.transform(todos);
        expect(sortedTodos).toEqual(expectedTodos);
    });
});