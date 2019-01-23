import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoViewComponent } from './todo-view.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { of } from 'rxjs';
import { StoreModule, Store } from '@ngrx/store';
import { reducer, TodoState } from '../todo/todo.reducer';
import { LoadTodos } from '../todo/todo.actions';
import { RouterTestingModule } from '@angular/router/testing';

describe('TodoViewComponent', () => {
  let component: TodoViewComponent;
  let fixture: ComponentFixture<TodoViewComponent>;
  let store: Store<{ todos: TodoState }>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoViewComponent ],
      imports: [
        MatProgressSpinnerModule,
        MatCardModule,
        StoreModule.forRoot({ todos: reducer }),
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 123})
          }
        },
        Store
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(TodoViewComponent);
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
});
