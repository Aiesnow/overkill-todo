import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../todo/todo';

@Pipe({name: 'sortTodos'})
export class SortTodos implements PipeTransform {
  transform(value: Todo[]): Todo[] {
    // Returns a new sorted array of todos
    return value.slice().sort((a, b) => {
      if(a.done && !b.done) {
        return 1;
      }
      else if (b.done && !a.done) {
        return -1;
      }
      else {
        return b.id-a.id;
      }
    });
  }
}