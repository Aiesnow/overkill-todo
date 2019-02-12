import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodoViewComponent } from './todo-view/todo-view.component';

const routes: Routes = [
  { path: '', component: TodosListComponent },
  { path: 'todo/:id', component: TodoViewComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
