import interact from './interact.js';
import listTasks from './list_tasks.js';
import './style.css';
import Tasks from './tasks.js';

const todo = new Tasks();

if (localStorage.getItem('todoClass')) {
  todo.restoreStorage();
}

listTasks(todo);

interact(todo);
