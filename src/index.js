import listTasks from './list_tasks.js';
import './style.css';
import Tasks from './tasks.js';

const todo = new Tasks();

todo.create('wash the dishes');
todo.create('complete the Todo project');
todo.create('walk the dog');
todo.create('fix car');
todo.create('do the laundry');

listTasks(todo);
