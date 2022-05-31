export default class Tasks {
  constructor() {
    this.tasks = [];
  }

  add(descr, compl, index) {
    this.tasks = [...this.tasks, { description: descr, completed: compl, index }];
  }

  size() {
    return this.tasks.length;
  }

  idxTask(num) {
    return this.tasks.filter((task) => task.index === num)[0];
  }
}
