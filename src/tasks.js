export default class Tasks {
  constructor() {
    this.tasks = [];
  }

  create(descr) {
    this.tasks = [...this.tasks, { 
      description: descr, 
      completed: false, 
      index: this.size() + 1 }];
  }

  delete(num) {
    this.tasks = this.tasks.filter((task) => task.index !== num);
    this.tasks.forEach((task) => {
      if (task.index > num) {
        this.idxMinusOne(task);
      }
    })
  }

  idxMinusOne(task) {
    task.index -= 1;
  }

  size() {
    return this.tasks.length;
  }

  idxTask(num) {
    return this.tasks.filter((task) => task.index === num)[0];
  }
}
