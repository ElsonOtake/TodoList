import _ from 'lodash';
import { localStorage } from './__mocks__/localStorage.js';

export default class Tasks {
  constructor() {
    this.tasks = [];
  }

  create(descr) {
    this.tasks = [...this.tasks, {
      description: descr,
      completed: false,
      index: this.size() + 1,
    }];
    localStorage.setItem('todoClass', JSON.stringify(this.tasks));
  }

  delete(num) {
    this.tasks = this.tasks.filter((task) => task.index !== num);
    this.resetIndex();
    localStorage.setItem('todoClass', JSON.stringify(this.tasks));
  }

  update(str, num) {
    this.tasks[num - 1].description = str;
    localStorage.setItem('todoClass', JSON.stringify(this.tasks));
  }

  completedChange(bool, num) {
    this.tasks[num - 1].completed = bool;
    localStorage.setItem('todoClass', JSON.stringify(this.tasks));
  }

  removeCompleted() {
    this.tasks = this.tasks.filter((task) => task.completed === false);
    this.resetIndex();
    localStorage.setItem('todoClass', JSON.stringify(this.tasks));
  }

  changePosition(from, before) {
    if (from < before) {
      this.tasks = [...this.tasks.slice(0, from - 1),
        ...this.tasks.slice(from, before),
        ...this.tasks.slice(from - 1, from),
        ...this.tasks.slice(before)];
    } else {
      this.tasks = [...this.tasks.slice(0, before),
        ...this.tasks.slice(from - 1, from),
        ...this.tasks.slice(before, from - 1),
        ...this.tasks.slice(from)];
    }
    this.resetIndex();
    localStorage.setItem('todoClass', JSON.stringify(this.tasks));
  }

  resetIndex() {
    _.forEach(this.tasks, (task, i) => {
      task.index = i + 1;
    });
  }

  size() {
    return this.tasks.length;
  }

  restoreStorage() {
    this.tasks = JSON.parse(localStorage.getItem('todoClass'));
  }
}

const todo = new Tasks();

describe('Test of instance of class Task', () => {
  test('Check the method size of the new instance', () => {
    expect(todo.size()).toBe(0);
  });
  test('Check the method create', () => {
    todo.create('new task');
    expect(todo.size()).toBe(1);
  });
  test('Check the method update', () => {
    todo.update('updated task', 1);
    expect(todo.size()).toBe(1);
    expect(todo.tasks[0].description).toBe('updated task');
  });
  test('Check the method completedChange', () => {
    todo.completedChange(true, 1);
    expect(todo.size()).toBe(1);
    expect(todo.tasks[0].completed).toBeTruthy();
  });
  test('Check the method delete', () => {
    todo.delete(1);
    expect(todo.size()).toBe(0);
  });
  test('Check the method removeCompleted', () => {
    todo.create('first task');
    todo.create('second task');
    todo.create('third task');
    todo.create('fourth task');
    todo.create('fifth task');
    todo.completedChange(true, 1);
    todo.completedChange(true, 2);
    todo.completedChange(true, 5);
    expect(todo.size()).toBe(5);
    expect(todo.tasks[0].completed).toBeTruthy();
    expect(todo.tasks[1].completed).toBeTruthy();
    expect(todo.tasks[2].completed).toBeFalsy();
    expect(todo.tasks[3].completed).toBeFalsy();
    expect(todo.tasks[4].completed).toBeTruthy();
    todo.removeCompleted();
    expect(todo.size()).toBe(2);
    expect(todo.tasks[0].description).toBe('third task');
    expect(todo.tasks[1].description).toBe('fourth task');
    expect(todo.tasks[0].completed).toBeFalsy();
    expect(todo.tasks[1].completed).toBeFalsy();
    expect(todo.tasks[0].index).toBe(1);
    expect(todo.tasks[1].index).toBe(2);
  });
  test('Check the localStorage content', () => {
    const storage = JSON.parse(localStorage.getItem('todoClass'));
    expect(storage.length).toBe(2);
    expect(storage[0].description).toBe('third task');
    expect(storage[1].description).toBe('fourth task');
    expect(storage[0].completed).toBeFalsy();
    expect(storage[1].completed).toBeFalsy();
    expect(storage[0].index).toBe(1);
    expect(storage[1].index).toBe(2);
  });
  test('Check the changePosition method', () => {
    todo.create('task one');
    todo.create('task two');
    todo.create('task five');
    todo.changePosition(3, 0);
    todo.changePosition(3, 4);
    todo.changePosition(3, 1);
    todo.completedChange(true, 2);
    todo.completedChange(true, 4);
    expect(todo.size()).toBe(5);
    expect(todo.tasks[0].description).toBe('task one');
    expect(todo.tasks[1].description).toBe('task two');
    expect(todo.tasks[2].description).toBe('third task');
    expect(todo.tasks[3].description).toBe('fourth task');
    expect(todo.tasks[4].description).toBe('task five');
    expect(todo.tasks[0].completed).toBeFalsy();
    expect(todo.tasks[1].completed).toBeTruthy();
    expect(todo.tasks[2].completed).toBeFalsy();
    expect(todo.tasks[3].completed).toBeTruthy();
    expect(todo.tasks[4].completed).toBeFalsy();
    expect(todo.tasks[0].index).toBe(1);
    expect(todo.tasks[1].index).toBe(2);
    expect(todo.tasks[2].index).toBe(3);
    expect(todo.tasks[3].index).toBe(4);
    expect(todo.tasks[4].index).toBe(5);
  });
});