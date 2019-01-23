import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTodoComponent } from './create-todo.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule, MatDialogModule, MatDialogRef} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;
  let dialogRef: MatDialogRef<CreateTodoComponent>;
  let formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTodoComponent ],
      imports: [BrowserAnimationsModule, MatFormFieldModule, MatInputModule, MatDialogModule, ReactiveFormsModule],
      providers: [
        { 
          provide: MatDialogRef, 
          useValue: {close: () => true}, 
        },
        {
          provide: FormBuilder,
          useValue: formBuilder
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    dialogRef = TestBed.get(MatDialogRef);
    spyOn(dialogRef, 'close').and.callThrough();
    fixture = TestBed.createComponent(CreateTodoComponent);
    component = fixture.componentInstance;
    component.todoForm = formBuilder.group({
      title: "title", 
      description: "description"
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close without any parameter', () => {
    component.close();
    expect(dialogRef.close).toHaveBeenCalledWith();
  });

  it('should call close form parameters', () => {
    spyOnProperty(component.todoForm, 'dirty', 'get').and.returnValue(true);
    spyOnProperty(component.todoForm, 'valid', 'get').and.returnValue(true);
    component.createTodo();
    expect(dialogRef.close).toHaveBeenCalledWith({title: "title", description: "description"});
  });
});
