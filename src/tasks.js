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
    for (let i = num; i <= this.size(); i += 1) {
      this.idxMinusOne(i);
    }
    localStorage.setItem('todoClass', JSON.stringify(this.tasks));
  }

  update(str, num) {
    this.tasks[num - 1].description = str;
    localStorage.setItem('todoClass', JSON.stringify(this.tasks));
  }

  completedToggle(num) {
    this.tasks[num - 1].completed = !this.tasks[num - 1].completed;
    localStorage.setItem('todoClass', JSON.stringify(this.tasks));
  }

  idxMinusOne(num) {
    this.tasks[num - 1].index -= 1;
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
