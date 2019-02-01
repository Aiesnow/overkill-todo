import { ActivatedRoute } from '@angular/router';
import { Component, DoCheck, OnInit } from '@angular/core';
import { LoadTodos } from '../todo/todo.actions';
import { Observable, zip } from 'rxjs';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Todo } from '../todo/todo';
import { TodoState } from '../todo/todo.reducer';
@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css']
})
export class TodoViewComponent implements OnInit, DoCheck {
  todos$: Observable<TodoState>;
  todo: Todo;

  constructor(private route: ActivatedRoute, private store:Store<{ todos: TodoState }>, private router: Router) { 
    this.todos$ = store.pipe(select('todos'));
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadTodos());
  }

  ngDoCheck(): void {
    if(this.todo) {
      return
    }
    zip(this.route.params, this.todos$, (routeParams, state) => ({todoId:routeParams.id, state})).subscribe(result => {
      let state = result.state;
      let todoId = result.todoId;
      this.todo = state.data.find(todo => todo.id == todoId);
      if(!this.todo && !state.loading) {
        //If we finished loading & no todo was found
        this.router.navigate([""]);
      }
    });
  }

}
