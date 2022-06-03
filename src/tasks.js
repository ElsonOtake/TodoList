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

  resetIndex() {
    for (let i = 1; i <= this.size(); i += 1) {
      this.tasks[i - 1].index = i;
    }
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
