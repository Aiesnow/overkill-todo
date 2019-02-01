import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { Condition } from 'selenium-webdriver';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    browser.get("");
    expect(page.getTitleText()).toEqual('Welcome to overkill-todo!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });

  it('should load the todos', () => {
    browser.wait(page.getTodos().count(), 8000);
    expect(page.getTodos().count()).toBe(4);
  });

  it('should toggle the last todo', () => {
    browser.wait(page.getTodos().count(), 8000);
    let lastTodo = page.getTodos().last();
    let lastTodoText = lastTodo.getText();
    page.getCheckboxForTodo(lastTodo).click();
    browser.driver.sleep(200);
    browser.wait(page.hasLoaded(), 8000);
    //Le dernier todo à du être déplacé en troisième position dans la liste
    expect(page.getTodos().get(2).getText()).toEqual(lastTodoText);
  });

  it('should create a todo at the first position', () => {
    // Ouverture du modal
    page.getCreateButton().click();
    browser.driver.sleep(200);
    //Remplissage formulaire
    page.getInputTitle().sendKeys("Test todo");
    browser.driver.sleep(200);
    page.getInputDescription().sendKeys("Test description");
    browser.driver.sleep(200);
    //Validation formulaire
    page.getSaveButton().click();
    browser.driver.sleep(200);
    browser.wait(page.hasLoaded(), 8000);

    let todos = page.getTodos()
    expect(todos.count()).toBe(5);
    expect(todos.first().getText()).toContain("Test todo");

  });

  it('should edit a todo at the first position', () => {
    let firstTodo = page.getTodos().first();
    // Ouverture du modal
    page.getEditButtonForTodo(firstTodo).click();
    browser.driver.sleep(200);
    //Remplissage formulaire
    page.getInputTitle().sendKeys("Test todo");
    browser.driver.sleep(200);
    page.getInputDescription().sendKeys("Test description");
    browser.driver.sleep(200);
    //Validation formulaire
    page.getSaveButton().click();
    browser.driver.sleep(200);
    browser.wait(page.hasLoaded(), 8000);

    let todos = page.getTodos()
    expect(todos.count()).toBe(5);
    expect(todos.first().getText()).toContain("Test todoTest todo");

  });

  it('should navigate to /todo/5', () => {
    let firstTodo = page.getTodos().first();
    // Ouverture de la vue todo
    page.getLinkForTodo(firstTodo).click();
    browser.driver.sleep(200);
    browser.wait(page.hasLoaded(), 8000);

    expect(browser.getCurrentUrl()).toContain("/todo/5");
    expect(page.getTodoDescription().getText()).toContain("Test descriptionTest description");
    expect(page.getTodoTitle().getText()).toContain("Test todoTest todo");
    page.getTodoBackButton().click();
    expect(browser.getCurrentUrl()).not.toContain("/todo/5");

  });

  it('should delete a todo at the first position', () => {
    let firstTodo = page.getTodos().first();
    // Delete todo
    page.getDeleteButtonForTodo(firstTodo).click();
    browser.driver.sleep(200);
    browser.wait(page.hasLoaded(), 8000);

    let todos = page.getTodos()
    expect(todos.count()).toBe(4);

  });
});
