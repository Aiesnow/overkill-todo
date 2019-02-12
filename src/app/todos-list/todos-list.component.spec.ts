import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosListComponent } from './todos-list.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { TodoService } from '../todo/todo.service';
import { Store, StoreModule } from '@ngrx/store';
import { reducer, TodoState } from '../todo/todo.reducer';
import { SortTodos } from '../pipes/sort-todos.pipe';
import { LoadTodos, UpdateTodo, CreateTodo } from '../todo/todo.actions';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { Todo } from '../todo/todo';
import { MatDialogModule, MatDialog, MatInputModule } from '@angular/material';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { of } from 'rxjs';

describe('TodosListComponent', () => {
  let component: TodosListComponent;
  let fixture: ComponentFixture<TodosListComponent>;
  let store: Store<{ todos: TodoState }>;
  let todoServiceStub: Partial<TodoService>;
  let dialog: MatDialog;

  todoServiceStub = {
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosListComponent, SortTodos, CreateTodoComponent ],
      imports: [
        BrowserAnimationsModule,
        MatListModule,
        MatCardModule,
        MatCheckboxModule,
        StoreModule.forRoot({ todos: reducer }),
        RouterModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule
      ],
      providers: [
        {
          provide: TodoService,
          useValue: todoServiceStub
        },
        Store,
        MatDialog
      ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ CreateTodoComponent ],
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    dialog = TestBed.get(MatDialog);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(TodosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should dispatch LoadTodos', () => {
    const action = new LoadTodos();
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('toggleTodo should dispatch SetTodoDone', () => {
    const todo: Todo = {
      id: 1,
      title: 'todo',
      done: false,
      description: 'description'
    };
    const action = new UpdateTodo(todo);
    component.toggleTodo(todo, true);
    expect(store.dispatch).toHaveBeenCalledWith(action);
    expect(todo.done).toBe(true);
  });

  it('openCreateModal should open the modal', () => {
    const createdTodo = {
      title: 'title',
      description: 'description',
      done: false
    };
    const action = new CreateTodo(createdTodo);
    spyOn(dialog, 'open').and.returnValue({afterClosed: () => of(createdTodo)});
    component.openCreateModal();
    expect(dialog.open).toHaveBeenCalledWith(CreateTodoComponent, {width: '600px'});
    expect(store.dispatch).toHaveBeenCalledWith(action);

  });
});
