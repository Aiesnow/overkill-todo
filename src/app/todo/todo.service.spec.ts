import { TodoService } from "./todo.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

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
   
    it('getAllTodos should resolve with content', (done: DoneFn) => {

      service.getAllTodos().subscribe(res => {
          expect(res).toEqual([{id:1, title: "Test task", done:false}])
          done();
      });

      let request = httpMock.expectOne('/api/todos');
      request.flush([{id:1, title: "Test task", done:false}]);

    });
   
    it('getAllTodos should reject with an error', (done: DoneFn) => {

      service.getAllTodos().subscribe(res => {
      }, err => {
        expect(err.message).toContain("Internal server error")
        expect(err.status).toBe(500)
        done();
      });


      let request = httpMock.expectOne('/api/todos');
      request.error(new ErrorEvent('ERROR_LOADING_TODOS'), {
        status: 500,
        statusText: "Internal server error"
      });
    });

    it('setTodoDone should resolve', (done: DoneFn) => {
      let todo = {
        id:2,
        title: "todo",
        done: false
      };
      service.setTodoDone(todo).subscribe(res => {
          done();
      });

      let request = httpMock.expectOne('/api/todos/2');
      request.flush(null);

    });
   
    it('setTodoDone should reject with an error', (done: DoneFn) => {
      let todo = {
        id:1,
        title: "todo",
        done: false
      };
      service.setTodoDone(todo).subscribe(res => {
      }, err => {
        expect(err.message).toContain("Internal server error")
        expect(err.status).toBe(500)
        done();
      });


      let request = httpMock.expectOne('/api/todos/1');
      request.error(new ErrorEvent('ERROR_LOADING_TODOS'), {
        status: 500,
        statusText: "Internal server error"
      });
    });
  });