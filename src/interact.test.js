import _ from 'lodash';
import { fetchData } from './__mocks__/list_tasks.js';

jest.mock('./list_tasks.js');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const dom = new JSDOM(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Todo list</title>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
  </head>
  <body>

      <ul>
          <li>
              <span>Today's To Do</span>
              <span class="material-icons-outlined">cached</span>
          </li>
          <li class="task_line add_to_list">
            <input type="text" placeholder="Add to your list...">
            <span class="material-icons-outlined">keyboard_return</span>
          </li>
          <li class="idx1 task_line" id="drg1" draggable="true">
            <span class="idx1 task_unit">
              <input class="idx1" type="checkbox">
              <input type="text" class="idx1 description" readonly="">
            </span>
            <span class="idx1 material-icons-outlined delete_outline">delete_outline</span>
            <span class="idx1 material-icons-outlined more_vert active">more_vert</span>
          </li>
          <li class="idx2 task_line" id="drg2" draggable="true">
            <span class="idx2 task_unit">
              <input class="idx2" type="checkbox">
              <input type="text" class="idx2 description" readonly="">
            </span>
            <span class="idx2 material-icons-outlined delete_outline">delete_outline</span>
            <span class="idx2 material-icons-outlined more_vert active">more_vert</span></li>
          <li class="idx3 task_line" id="drg3" draggable="true">
            <span class="idx3 task_unit">
              <input class="idx3" type="checkbox">
              <input type="text" class="idx3 description" readonly="">
            </span>
            <span class="idx3 material-icons-outlined delete_outline">delete_outline</span>
            <span class="idx3 material-icons-outlined more_vert active">more_vert</span></li>
          <li class="idx4 task_line" id="drg4" draggable="true">
            <span class="idx4 task_unit">
              <input class="idx4" type="checkbox">
              <input type="text" class="idx4 description" readonly="">
            </span>
            <span class="idx4 material-icons-outlined delete_outline">delete_outline</span>
            <span class="idx4 material-icons-outlined more_vert active">more_vert</span></li>
          <li class="task_line">
            <p>Clear all completed</p>
          </li>
      </ul>
      
  </body>
  </html>
`);

const todo = {
  tasks: [
    { description: 'wash the dishes', completed: false, index: 1 },
    { description: 'fix car', completed: true, index: 2 },
    { description: 'do a haircut', completed: false, index: 3 },
    { description: 'walk the dog', completed: true, index: 4 }],
};

const interact = (todo) => {
  _.forEach(todo.tasks, (task, i) => {
    if (task.completed) {
      const checkbox = dom.window.document.querySelector(`.task_unit input[type=checkbox].idx${i + 1}`);
      const text = dom.window.document.querySelector(`.task_unit input[type=text].idx${i + 1}`);
      checkbox.checked = true;
      text.classList.add('done');
    }
  });
};

describe('Testing the function that change the checkbox status to checked if completed', () => {
  test('Test the DOM to change status of checkboxes', () => {
    interact(todo);
    expect(dom.window.document.querySelector('.task_unit input[type=checkbox].idx1').checked).toBeFalsy();
    expect(dom.window.document.querySelector('.task_unit input[type=checkbox].idx2').checked).toBeTruthy();
    expect(dom.window.document.querySelector('.task_unit input[type=checkbox].idx3').checked).toBeFalsy();
    expect(dom.window.document.querySelector('.task_unit input[type=checkbox].idx4').checked).toBeTruthy();
    expect(dom.window.document.querySelector('.task_unit input[type=text].idx1').classList.contains('done')).toBeFalsy();
    expect(dom.window.document.querySelector('.task_unit input[type=text].idx2').classList.contains('done')).toBeTruthy();
    expect(dom.window.document.querySelector('.task_unit input[type=text].idx3').classList.contains('done')).toBeFalsy();
    expect(dom.window.document.querySelector('.task_unit input[type=text].idx4').classList.contains('done')).toBeTruthy();
  });
});

describe('Test the mocks folder', () => {
  test('Check return of fetchData', () => {
    expect(fetchData()).toBe('delectus aut autem');
  });
});

export default interact;