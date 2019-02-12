import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LoadTodos, CreateTodo, UpdateTodo, DeleteTodo } from '../todo/todo.actions';
import { TodoState } from '../todo/todo.reducer';
import { Todo } from '../todo/todo';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(private store: Store<{ todos: TodoState }>, public dialog: MatDialog) {
    this.todos$ = store.pipe(select('todos'));
  }

  ngOnInit() {
    this.store.dispatch(new LoadTodos());
  }

  toggleTodo(todo: Todo, done: boolean) {
    todo.done = done;
    this.store.dispatch(new UpdateTodo(todo));
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(data => this.afterModalClosed(data));
  }

  openEditModal(todo: Todo) {
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      width: '600px',
      data: todo
    });

    dialogRef.afterClosed().subscribe(data => this.afterModalClosed(data));
  }

  afterModalClosed(data: Todo) {
    if (!data) {
      return;
    }
    if ('id' in data) {
      this.store.dispatch(new UpdateTodo(data));
    } else {
      data.done = false;
      this.store.dispatch(new CreateTodo(data));
    }
  }

  deleteTodo(todoId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '600px',
      data: 'Do you really want to delete this todo ?'
    });

    dialogRef.afterClosed().subscribe(success => {
      if (success) {
        this.store.dispatch(new DeleteTodo(todoId));
      }
    });
  }

}
