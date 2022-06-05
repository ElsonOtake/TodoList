import _ from 'lodash';

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

  changePosition(from, after) {
    if (from < after) {
      this.tasks = [...this.tasks.slice(0, from - 1),
        ...this.tasks.slice(from, after),
        ...this.tasks.slice(from - 1, from),
        ...this.tasks.slice(after)];
    } else {
      this.tasks = [...this.tasks.slice(0, after),
        ...this.tasks.slice(from - 1, from),
        ...this.tasks.slice(after, from - 1),
        ...this.tasks.slice(from)];
    }
    this.resetIndex();
    localStorage.setItem('todoClass', JSON.stringify(this.tasks));
  }

  resetIndex() {
    _.forEach(this.tasks, (task, i) => {
      task.index = i + 1;
    })
  }

  size() {
    return this.tasks.length;
  }

  idxTask(num) {
    return this.tasks[num - 1];
  }

  restoreStorage() {
    this.tasks = JSON.parse(localStorage.getItem('todoClass'));
  }
}
