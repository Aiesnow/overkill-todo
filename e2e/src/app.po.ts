import { browser, by, element } from 'protractor';

export class AppPage {

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  getCreateButton() {
    return element(by.buttonText('Create'));
  }

  getInputTitle() {
    return element(by.css('app-create-todo input#title'));
  }

  getInputDescription() {
    return element(by.css('app-create-todo textarea#description'));
  }

  getSaveButton() {
    return element(by.buttonText('Save'));
  }

  getTodos() {
    return element.all(by.css('app-todos-list mat-list mat-list-item'));
  }

  hasLoaded() {
    return browser.getCurrentUrl().then((url: string): PromiseLike<boolean> => {
      if (url.indexOf('/todo/') > -1) {
        // Vue pour un todo
        return element(by.id('loading-card')).isPresent().then(result => !result);
      } else {
        // Liste de todos
        return this.getTodos().first().getAttribute('disabled').then(result => !result);
      }
    });
  }

  getCheckboxForTodo(todoElement: any) {
    return todoElement.element(by.tagName('mat-checkbox'));
  }

  getEditButtonForTodo(todoElement: any) {
    return todoElement.element(by.buttonText('Edit'));
  }

  getDeleteButtonForTodo(todoElement: any) {
    return todoElement.element(by.buttonText('Delete'));
  }

  getLinkForTodo(todoElement: any) {
    return todoElement.element(by.tagName('a'));
  }

  getTodoTitle() {
    return element(by.css('app-todo-view mat-card-title'));
  }

  getTodoDescription() {
    return element(by.css('app-todo-view mat-card-content'));
  }

  getTodoBackButton() {
    return element(by.buttonText('Back'));
  }
}
