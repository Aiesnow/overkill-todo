import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { TodoService } from './todo.service';
import { TodoEffects } from './todo.effects';
import { hot, cold } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import * as TodoActions from './todo.actions';

describe('PostsEffects', () => {
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
                    useValue: jasmine.createSpyObj('TodoService', ['getAllTodos', 'setTodoDone'])
                },
                provideMockActions(() => actions)
            ]
        })
        effects = TestBed.get(TodoEffects);
        service = TestBed.get(TodoService);
    });

    it('LoadTodos should complete with a SuccessLoad', () => {
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

    it('LoadTodos should complete with a FailLoad', () => {
        let error = new Error("Failed to fetch todos");
        const action = new TodoActions.LoadTodos();
        const completion = new TodoActions.FailLoad(error);
        let functionToMock: any = service.getAllTodos
        functionToMock.and.returnValue(throwError(error));

        actions = hot('--a-', { a: action });
        const expected = cold('--b', { b: completion });
    
        expect(effects.loadTodos$).toBeObservable(expected);
    });

    it('SetTodoDone should complete with a LoadTodos', () => {
        let todo = {
            id: 1,
            title: "todo",
            done: false,
        };
        const action = new TodoActions.SetTodoDone(todo);
        const completion = new TodoActions.LoadTodos();
        let functionToMock: any = service.setTodoDone
        functionToMock.and.returnValue(of(null));

        actions = hot('--a-', { a: action });
        const expected = cold('--b', { b: completion });
    
        expect(effects.setTodoDone$).toBeObservable(expected);
    });

    it('SetTodoDone should complete with a FailLoad', () => {
        let error = new Error("Failed to fetch todos");
        let todo = {
            id: 1,
            title: "todo",
            done: false,
        };
        const action = new TodoActions.SetTodoDone(todo);
        const completion = new TodoActions.FailLoad(error);
        let functionToMock: any = service.setTodoDone
        functionToMock.and.returnValue(throwError(error));

        actions = hot('--a-', { a: action });
        const expected = cold('--b', { b: completion });
    
        expect(effects.setTodoDone$).toBeObservable(expected);
    });
});