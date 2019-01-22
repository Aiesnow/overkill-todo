import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosListComponent } from './todos-list.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { TodoService } from '../todo/todo.service';
import { Store, StoreModule } from '@ngrx/store';
import { reducer, TodoState } from '../todo/todo.reducer';
import { SortTodos } from '../pipes/sort-todos.pipe';
import { LoadTodos, SetTodoDone } from '../todo/todo.actions';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { Todo } from '../todo/todo';

describe('TodosListComponent', () => {
  let component: TodosListComponent;
  let fixture: ComponentFixture<TodosListComponent>;
  let store: Store<{ todos: TodoState }>;
  let todoServiceStub: Partial<TodoService>;

  todoServiceStub = {
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosListComponent, SortTodos ],
      imports: [
        MatListModule, 
        MatCardModule,
        MatCheckboxModule,
        StoreModule.forRoot({ todos: reducer }),
        RouterModule
      ],
      providers:    [ {provide: TodoService, useValue: todoServiceStub }, Store ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
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
    let todo: Todo = {
      id:1,
      title: "todo",
      done: false,
      description: "description"
    }
    const action = new SetTodoDone(todo);
    component.toggleTodo(todo, true);
    expect(store.dispatch).toHaveBeenCalledWith(action);
    expect(todo.done).toBe(true);
  });
});
