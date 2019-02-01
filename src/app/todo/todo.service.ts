import { Todo } from './todo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TodoService {
    url = "/api/todos";
    constructor(private httpClient: HttpClient) {
    }

    getAllTodos(): Observable<Todo[]> {
        return this.httpClient.get<Todo[]>(this.url);
    }

    updateTodo(todo: Todo): Observable<any> {
        return this.httpClient.put(this.url + "/" + todo.id, {
            ...todo
        });
    }

    createTodo(todo: Todo): Observable<any> {
        return this.httpClient.post(this.url, {
            ...todo
        });
    }

    deleteTodo(todoId: number): Observable<any> {
        return this.httpClient.delete(this.url + "/" + todoId);
    }
}