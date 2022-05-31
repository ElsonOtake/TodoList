import listTasks from './list_tasks.js';
import './style.css';
import Tasks from './tasks.js';

const todo = new Tasks();

todo.add('wash the dishes', false, 1);
todo.add('complete the Todo project', false, 2);
todo.add('walk the dog', true, 3);
todo.add('fix car', false, 4);
todo.add('do the laundry', true, 5);

listTasks(todo);
