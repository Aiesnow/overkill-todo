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
                done: false,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget laoreet urna. Duis vel risus commodo, suscipit neque vitae, ultrices metus. Praesent eget turpis imperdiet, volutpat turpis vitae, pretium nunc. Phasellus finibus, lacus sed fringilla convallis, nibh ex scelerisque mauris, non consectetur nisl sem eget lacus. Sed auctor leo sit."
            },
            {
                id: 2,
                title: "Develop new feature",
                done: false,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget laoreet urna. Duis vel risus commodo, suscipit neque vitae, ultrices metus. Praesent eget turpis imperdiet, volutpat turpis vitae, pretium nunc. Phasellus finibus, lacus sed fringilla convallis, nibh ex scelerisque mauris, non consectetur nisl sem eget lacus. Sed auctor leo sit."
            },
            {
                id: 4,
                title: "Update CI",
                done: true,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget laoreet urna. Duis vel risus commodo, suscipit neque vitae, ultrices metus. Praesent eget turpis imperdiet, volutpat turpis vitae, pretium nunc. Phasellus finibus, lacus sed fringilla convallis, nibh ex scelerisque mauris, non consectetur nisl sem eget lacus. Sed auctor leo sit."
            },
            {
                id: 1,
                title: "Clean Database",
                done: true,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget laoreet urna. Duis vel risus commodo, suscipit neque vitae, ultrices metus. Praesent eget turpis imperdiet, volutpat turpis vitae, pretium nunc. Phasellus finibus, lacus sed fringilla convallis, nibh ex scelerisque mauris, non consectetur nisl sem eget lacus. Sed auctor leo sit."
            }
        ];
        let sortedTodos = pipe.transform(todos);
        expect(sortedTodos).toEqual(expectedTodos);
    });
});