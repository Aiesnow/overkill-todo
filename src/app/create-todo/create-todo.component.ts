import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Todo } from '../todo/todo';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {
  todoForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo) {
    if (!data) {
      this.data = {
        title: '',
        description: '',
      };
    }
    this.todoForm = this.formBuilder.group({
      'title': [this.data.title, Validators.required],
      'description': [this.data.description, []]
    });
  }

  ngOnInit() {
  }

  saveTodo() {
    if (this.todoForm.dirty && this.todoForm.valid) {
      this.data.title = this.todoForm.value.title;
      this.data.description = this.todoForm.value.description;
      this.dialogRef.close(this.data);
    }
  }

  close() {
    this.dialogRef.close();
  }

}
