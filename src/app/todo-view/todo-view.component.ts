import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Todo } from '../todo/todo';
import { TodoState } from '../todo/todo.reducer';
import { LoadTodos } from '../todo/todo.actions';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css']
})
export class TodoViewComponent implements OnInit {
  todos$: Observable<TodoState>;
  todo: Todo;

  constructor(private route: ActivatedRoute, private store:Store<{ todos: TodoState }>) { 
    this.todos$ = store.pipe(select('todos'));
  }

  ngOnInit() {
    this.store.dispatch(new LoadTodos());
    this.todos$.subscribe((state: TodoState) => {
      this.todo = state.data.find(todo => todo.id == this.route.snapshot.params['id']);
    });
  }

}
