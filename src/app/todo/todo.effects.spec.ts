import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { TodoService } from './todo.service';
import { TodoEffects } from './todo.effects';
import { hot, cold } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import * as TodoActions from './todo.actions';

describe('TodoEffects', () => {
    let effects: TodoEffects;
    let actions: Observable<any>;
    let service: TodoService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            providers: [
                TodoEffects,
                {
                    provide: TodoService,
                    useValue: jasmine.createSpyObj('TodoService', ['getAllTodos', 'updateTodo', 'createTodo', 'deleteTodo'])
                },
                provideMockActions(() => actions)
            ]
        })
        effects = TestBed.get(TodoEffects);
        service = TestBed.get(TodoService);
    });
    describe("LoadTodos", () => {
        it('should complete with a SuccessLoad', () => {
            let expectedTodos = [
                {
                    id:1
                },
                {
                    id:2
                }
            ]
            const action = new TodoActions.LoadTodos();
            const completion = new TodoActions.SuccessLoad(expectedTodos);
            let functionToMock: any = service.getAllTodos
            functionToMock.and.returnValue(of(expectedTodos));
    
            actions = hot('--a-', { a: action });
            const expected = cold('--b', { b: completion });
        
            expect(effects.loadTodos$).toBeObservable(expected);
        });
    
        it('should complete with a FailLoad', () => {
            let error = new Error("Failed to fetch todos");
            const action = new TodoActions.LoadTodos();
            const completion = new TodoActions.FailLoad(error);
            let functionToMock: any = service.getAllTodos
            functionToMock.and.returnValue(throwError(error));
    
            actions = hot('--a-', { a: action });
            const expected = cold('--b', { b: completion });
        
            expect(effects.loadTodos$).toBeObservable(expected);
        });
    });

    describe("UpdateTodo", () => {
        it('should complete with a LoadTodos', () => {
            let todo = {
                id: 1,
                title: "todo",
                done: false,
            };
            const action = new TodoActions.UpdateTodo(todo);
            const completion = new TodoActions.LoadTodos();
            let functionToMock: any = service.updateTodo
            functionToMock.and.returnValue(of(null));
    
            actions = hot('--a-', { a: action });
            const expected = cold('--b', { b: completion });
        
            expect(effects.updateTodo$).toBeObservable(expected);
        });
    
        it('should complete with a FailLoad', () => {
            let error = new Error("Failed to update todo");
            let todo = {
                id: 1,
                title: "todo",
                done: false,
            };
            const action = new TodoActions.UpdateTodo(todo);
            const completion = new TodoActions.FailLoad(error);
            let functionToMock: any = service.updateTodo
            functionToMock.and.returnValue(throwError(error));
    
            actions = hot('--a-', { a: action });
            const expected = cold('--b', { b: completion });
        
            expect(effects.updateTodo$).toBeObservable(expected);
        });
    });

    describe("CreateTodo", () => {
        it('should complete with a LoadTodos', () => {
            let todo = {
                title: "todo",
                description: "description",
                done: false,
            };
            const action = new TodoActions.CreateTodo(todo);
            const completion = new TodoActions.LoadTodos();
            let functionToMock: any = service.createTodo
            functionToMock.and.returnValue(of(null));
    
            actions = hot('--a-', { a: action });
            const expected = cold('--b', { b: completion });
        
            expect(effects.createTodo$).toBeObservable(expected);
        });
    
        it('should complete with a FailLoad', () => {
            let error = new Error("Failed to create todo");
            let todo = {
                title: "todo",
                description: "description",
                done: false,
            };
            const action = new TodoActions.CreateTodo(todo);
            const completion = new TodoActions.FailLoad(error);
            let functionToMock: any = service.createTodo
            functionToMock.and.returnValue(throwError(error));
    
            actions = hot('--a-', { a: action });
            const expected = cold('--b', { b: completion });
        
            expect(effects.createTodo$).toBeObservable(expected);
        });
    });

    describe("DeleteTodo", () => {
        it('should complete with a LoadTodos', () => {
            let todoId = 1;
            const action = new TodoActions.DeleteTodo(todoId);
            const completion = new TodoActions.LoadTodos();
            let functionToMock: any = service.deleteTodo
            functionToMock.and.returnValue(of(null));
    
            actions = hot('--a-', { a: action });
            const expected = cold('--b', { b: completion });
        
            expect(effects.deleteTodo$).toBeObservable(expected);
        });
    
        it('should complete with a FailLoad', () => {
            let error = new Error("Failed to create todo");
            let todoId = 1;
            const action = new TodoActions.DeleteTodo(todoId);
            const completion = new TodoActions.FailLoad(error);
            let functionToMock: any = service.deleteTodo
            functionToMock.and.returnValue(throwError(error));
    
            actions = hot('--a-', { a: action });
            const expected = cold('--b', { b: completion });
        
            expect(effects.deleteTodo$).toBeObservable(expected);
        });
    });

});