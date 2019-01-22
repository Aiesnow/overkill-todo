import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from '../todo/todo.service';
import { Store, select } from '@ngrx/store';
import { LoadTodos } from '../todo/todo.actions';
import { TodoState } from '../todo/todo.reducer';
import { Todo } from '../todo/todo';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {
  todos$: Observable<Todo[]>;
  
  constructor(private todoService: TodoService, private store: Store<{ todos: TodoState }>) {
    this.todos$ = store.pipe(select('todos'));
  }

  ngOnInit() {
    this.store.dispatch(new LoadTodos());
  }

}
