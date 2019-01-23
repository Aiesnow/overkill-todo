import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {
  todoForm: any;
  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<CreateTodoComponent>) {
      
    this.todoForm = this.formBuilder.group({
      'title': ['', Validators.required],
      'description': ['', []]
    });
  }

  ngOnInit() {
  }

  createTodo() {
    if (this.todoForm.dirty && this.todoForm.valid) {
      this.dialogRef.close(this.todoForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }

}
