import { TodoService } from './todo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from './todo';

describe('TodoService', () => {
    let service: TodoService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
            TodoService
        ]
      });
      service = TestBed.get(TodoService);
      httpMock = TestBed.get(HttpTestingController);
    });

    describe('getAllTodos', () => {

      it('should resolve with content', (done: DoneFn) => {
        const todos: Todo[] = [
          {
            id: 1,
            title: 'Test task',
            done: false,
            description: 'description'
          }
        ];
        service.getAllTodos().subscribe(res => {
            expect(res).toBe(todos);
            done();
        });

        const request = httpMock.expectOne('/api/todos');
        request.flush(todos);

      });

      it('should reject with an error', (done: DoneFn) => {

        service.getAllTodos().subscribe(res => {
        }, err => {
          expect(err.message).toContain('Internal server error');
          expect(err.status).toBe(500);
          done();
        });


        const request = httpMock.expectOne('/api/todos');
        request.error(new ErrorEvent('ERROR_LOADING_TODOS'), {
          status: 500,
          statusText: 'Internal server error'
        });
      });

    });

    describe('updateTodo', () => {
      it('should resolve', (done: DoneFn) => {
        const todo: Todo = {
          id: 2,
          title: 'todo',
          done: false,
          description: 'description'
        };
        service.updateTodo(todo).subscribe(res => {
            done();
        });

        const request = httpMock.expectOne('/api/todos/2');
        request.flush(null);

      });

      it('should reject with an error', (done: DoneFn) => {
        const todo: Todo = {
          id: 1,
          title: 'todo',
          done: false,
          description: 'description'
        };
        service.updateTodo(todo).subscribe(res => {
        }, err => {
          expect(err.message).toContain('Internal server error');
          expect(err.status).toBe(500);
          done();
        });


        const request = httpMock.expectOne('/api/todos/1');
        request.error(new ErrorEvent('ERROR_LOADING_TODOS'), {
          status: 500,
          statusText: 'Internal server error'
        });
      });
    });

    describe('createTodo', () => {
      it('should resolve', (done: DoneFn) => {
        const todo = {
          title: 'todo',
          done: false,
          description: 'description'
        };
        service.createTodo(todo).subscribe(res => {
          done();
        });


        const request = httpMock.expectOne('/api/todos');
        request.flush(null);
      });

      it('should reject with an error', (done: DoneFn) => {
        const todo = {
          title: 'todo',
          done: false,
          description: 'description'
        };
        service.createTodo(todo).subscribe(res => {
        }, err => {
          expect(err.message).toContain('Internal server error');
          expect(err.status).toBe(500);
          done();
        });


        const request = httpMock.expectOne('/api/todos');
        request.error(new ErrorEvent('ERROR_CREATING_TODO'), {
          status: 500,
          statusText: 'Internal server error'
        });
      });
    });

    describe('deleteTodo', () => {
      it('should resolve', (done: DoneFn) => {
        service.deleteTodo(658).subscribe(res => {
          done();
        });


        const request = httpMock.expectOne('/api/todos/658');
        request.flush(null);
      });

      it('should reject with an error', (done: DoneFn) => {
        service.deleteTodo(658).subscribe(res => {
        }, err => {
          expect(err.message).toContain('Internal server error');
          expect(err.status).toBe(500);
          done();
        });


        const request = httpMock.expectOne('/api/todos/658');
        request.error(new ErrorEvent('ERROR_CREATING_TODO'), {
          status: 500,
          statusText: 'Internal server error'
        });
      });
    });

  });
