import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoViewComponent } from './todo-view.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { StoreModule, Store } from '@ngrx/store';
import { reducer } from '../todo/todo.reducer';

describe('TodoViewComponent', () => {
  let component: TodoViewComponent;
  let fixture: ComponentFixture<TodoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoViewComponent ],
      imports: [
        MatProgressSpinnerModule,
        MatCardModule,
        StoreModule.forRoot({ todos: reducer }),
        RouterModule
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
    fixture = TestBed.createComponent(TodoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
