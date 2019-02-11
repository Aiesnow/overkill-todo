import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryBackend } from "./todo/todo.backend";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './todo/todo.service';
import { StoreModule } from '@ngrx/store';
import { reducer } from './todo/todo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './todo/todo.effects';
import { TodosListComponent } from './todos-list/todos-list.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { SortTodos } from './pipes/sort-todos.pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TodoViewComponent } from './todo-view/todo-view.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosListComponent,
    SortTodos,
    TodoViewComponent,
    CreateTodoComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryBackend),
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ todos: reducer }),
    EffectsModule.forRoot([TodoEffects]),
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  entryComponents: [CreateTodoComponent, ConfirmationDialogComponent],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
