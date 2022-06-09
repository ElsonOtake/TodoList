import _ from 'lodash';
import { document } from './__mocks__/domMock.js';
import Tasks from './tasks.test.js';

const todo = new Tasks();
todo.create('wash the dishes');
todo.create('fix car');
todo.create('do the haircut');
todo.create('walk the dog');
todo.completedChange(true, 2);
todo.completedChange(true, 4);

const interact = (todo) => {
  _.forEach(todo.tasks, (task, i) => {
    if (task.completed) {
      const checkbox = document.querySelector(`.task_unit input[type=checkbox].idx${i + 1}`);
      const text = document.querySelector(`.task_unit input[type=text].idx${i + 1}`);
      checkbox.checked = true;
      text.classList.add('done');
    }
  });
};

describe('Testing the function that change the checkbox status to checked if completed', () => {
  test('Test the DOM to change status of checkboxes', () => {
    interact(todo);
    expect(document.querySelector('.task_unit input[type=checkbox].idx1').checked).toBeFalsy();
    expect(document.querySelector('.task_unit input[type=checkbox].idx2').checked).toBeTruthy();
    expect(document.querySelector('.task_unit input[type=checkbox].idx3').checked).toBeFalsy();
    expect(document.querySelector('.task_unit input[type=checkbox].idx4').checked).toBeTruthy();
    expect(document.querySelector('.task_unit input[type=text].idx1').classList.contains('done')).toBeFalsy();
    expect(document.querySelector('.task_unit input[type=text].idx2').classList.contains('done')).toBeTruthy();
    expect(document.querySelector('.task_unit input[type=text].idx3').classList.contains('done')).toBeFalsy();
    expect(document.querySelector('.task_unit input[type=text].idx4').classList.contains('done')).toBeTruthy();
  });
});

export default interact;