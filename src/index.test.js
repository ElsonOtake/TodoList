import Tasks from './tasks.test.js';
import { localStorage } from './__mocks__/localStorage.js';

const listTasks = require('./list_tasks.test.js');

const todo = new Tasks();

if (localStorage.getItem('todoClass')) {
  todo.restoreStorage();
}
listTasks(todo);

describe('Test of main js file', () => {
  test('Check the localStorage functionality', () => {
    expect(localStorage.getItem('todoClass')).toBeTruthy();
  });
});