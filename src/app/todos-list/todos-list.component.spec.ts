import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosListComponent } from './todos-list.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { TodoService } from '../todo/todo.service';
import { Store, StoreModule } from '@ngrx/store';
import { reducer, TodoState } from '../todo/todo.reducer';
import { SortTodos } from '../pipes/sort-todos.pipe';
import { LoadTodos } from '../todo/todo.actions';

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
        StoreModule.forRoot({ todos: reducer })
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
  })
});
