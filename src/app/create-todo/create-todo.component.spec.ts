import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTodoComponent } from './create-todo.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;
  let dialogRef: MatDialogRef<CreateTodoComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

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
        },
        { provide: MAT_DIALOG_DATA, useValue: {} }
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
      title: 'title',
      description: 'description'
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

  it('should call close with form parameters', () => {
    spyOnProperty(component.todoForm, 'dirty', 'get').and.returnValue(true);
    spyOnProperty(component.todoForm, 'valid', 'get').and.returnValue(true);
    component.saveTodo();
    expect(dialogRef.close).toHaveBeenCalledWith({title: 'title', description: 'description'});
  });

  it('should not call close (form invalid)', () => {
    spyOnProperty(component.todoForm, 'dirty', 'get').and.returnValue(true);
    spyOnProperty(component.todoForm, 'valid', 'get').and.returnValue(false);
    component.saveTodo();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });
});
