import {InMemoryDbService} from "angular-in-memory-web-api"
import { Todo } from './todo';

export class InMemoryBackend extends InMemoryDbService {
    createDb() {
        let todos: Todo[] = [
            {
                id: 1,
                title: "Clean Database",
                done: true,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget laoreet urna. Duis vel risus commodo, suscipit neque vitae, ultrices metus. Praesent eget turpis imperdiet, volutpat turpis vitae, pretium nunc. Phasellus finibus, lacus sed fringilla convallis, nibh ex scelerisque mauris, non consectetur nisl sem eget lacus. Sed auctor leo sit."
            },
            {
                id: 2,
                title: "Develop new feature",
                done: false,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget laoreet urna. Duis vel risus commodo, suscipit neque vitae, ultrices metus. Praesent eget turpis imperdiet, volutpat turpis vitae, pretium nunc. Phasellus finibus, lacus sed fringilla convallis, nibh ex scelerisque mauris, non consectetur nisl sem eget lacus. Sed auctor leo sit."
            },
            {
                id: 3,
                title: "Unit tests",
                done: false,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget laoreet urna. Duis vel risus commodo, suscipit neque vitae, ultrices metus. Praesent eget turpis imperdiet, volutpat turpis vitae, pretium nunc. Phasellus finibus, lacus sed fringilla convallis, nibh ex scelerisque mauris, non consectetur nisl sem eget lacus. Sed auctor leo sit."
            },
            {
                id: 4,
                title: "Update CI",
                done: true,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget laoreet urna. Duis vel risus commodo, suscipit neque vitae, ultrices metus. Praesent eget turpis imperdiet, volutpat turpis vitae, pretium nunc. Phasellus finibus, lacus sed fringilla convallis, nibh ex scelerisque mauris, non consectetur nisl sem eget lacus. Sed auctor leo sit."
            }
        ]
        return {
            todos: todos
        }
    }

    genId(todos: Todo[]): number {
        return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    }
}