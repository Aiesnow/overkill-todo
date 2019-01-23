import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from '../todo/todo.service';
import { Store, select } from '@ngrx/store';
import { LoadTodos, SetTodoDone, CreateTodo } from '../todo/todo.actions';
import { TodoState } from '../todo/todo.reducer';
import { Todo } from '../todo/todo';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {
  todos$: Observable<Todo[]>;
  
  constructor(private todoService: TodoService, private store: Store<{ todos: TodoState }>, public dialog: MatDialog) {
    this.todos$ = store.pipe(select('todos'));
  }

  ngOnInit() {
    this.store.dispatch(new LoadTodos());
  }

  toggleTodo(todo, done) {
    todo.done = done;
    this.store.dispatch(new SetTodoDone(todo));
  }

  openCreateModal() {
    let dialogRef = this.dialog.open(CreateTodoComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        data.done = false;
        this.store.dispatch(new CreateTodo(data));
      }
    })
  }

}
