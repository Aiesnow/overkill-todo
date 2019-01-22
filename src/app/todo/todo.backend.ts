import {InMemoryDbService} from "angular-in-memory-web-api"
import { Todo } from './todo';

export class InMemoryBackend extends InMemoryDbService {
    createDb() {
        let todos: Todo[] = [
            {
                id: 1,
                title: "Clean Database",
                done: true
            },
            {
                id: 2,
                title: "Develop new feature",
                done: false
            },
            {
                id: 3,
                title: "Unit tests",
                done: false
            },
            {
                id: 4,
                title: "Update CI",
                done: true
            }
        ]
        return {
            todos: todos
        }
    }
}