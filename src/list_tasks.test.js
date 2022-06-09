import _ from 'lodash';
import interact from './interact.test.js';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const dom = new JSDOM(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Todo list</title>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
  </head>
  <body>

      <ul>
          <li>
              <span>Today's To Do</span>
              <span class="material-icons-outlined">cached</span>
          </li>
          <li class="task_line add_to_list">
            <input type="text" placeholder="Add to your list...">
            <span class="material-icons-outlined">keyboard_return</span>
          </li>
          <li class="idx1 task_line" id="drg1" draggable="true">
            <span class="idx1 task_unit">
              <input class="idx1" type="checkbox">
              <input type="text" class="idx1 description" readonly="">
            </span>
            <span class="idx1 material-icons-outlined delete_outline">delete_outline</span>
            <span class="idx1 material-icons-outlined more_vert active">more_vert</span>
          </li>
          <li class="idx2 task_line" id="drg2" draggable="true">
            <span class="idx2 task_unit">
              <input class="idx2" type="checkbox">
              <input type="text" class="idx2 description" readonly="">
            </span>
            <span class="idx2 material-icons-outlined delete_outline">delete_outline</span>
            <span class="idx2 material-icons-outlined more_vert active">more_vert</span>
          </li>
          <li class="idx3 task_line" id="drg3" draggable="true">
            <span class="idx3 task_unit">
              <input class="idx3" type="checkbox">
              <input type="text" class="idx3 description" readonly="">
            </span>
            <span class="idx3 material-icons-outlined delete_outline">delete_outline</span>
            <span class="idx3 material-icons-outlined more_vert active">more_vert</span>
          </li>
          <li class="task_line">
            <p>Clear all completed</p>
          </li>
      </ul>
      
  </body>
  </html>
`);

const todo = {
  tasks: [
    { description: 'wash the dishes', completed: false, index: 1 },
    { description: 'fix car', completed: true, index: 2 },
    { description: 'do a haircut', completed: false, index: 3 },
    { description: 'walk the dog', completed: true, index: 4 }],
  size: () => 4,
  changePosition: (a, b) => a || b,
  create: (descr) => descr,
  completedChange: (bool, num) => bool || num,
  update: (descr, num) => descr || num,
  delete: (num) => num,
  removeCompleted: () => null,
};

const dragPosition = (todo) => {
  const liDraggable = dom.window.document.querySelectorAll('li[id^="drg"]');
  const idxDragging = parseInt(dom.window.document.querySelector('.dragging').classList[0].substring(3), 10);
  Array.from(liDraggable).forEach((list, idx) => {
    if (list.classList.contains('dragging')) {
      if (idx < idxDragging) {
        todo.changePosition(idxDragging, idx);
      } else {
        todo.changePosition(idxDragging, idx + 1);
      }
    }
  });
};

const listTasks = (todo) => {
  const ulToDo = dom.window.document.querySelector('ul');

  while (dom.window.document.querySelector('.task_line')) {
    ulToDo.removeChild(dom.window.document.querySelector('.task_line'));
  }

  const liAddToList = dom.window.document.createElement('li');
  liAddToList.className = 'task_line add_to_list';
  const inputAddToList = dom.window.document.createElement('input');
  inputAddToList.type = 'text';
  inputAddToList.placeholder = 'Add to your list...';
  liAddToList.appendChild(inputAddToList);
  inputAddToList.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && inputAddToList.value.trim() !== '') {
      todo.create(inputAddToList.value.trim());
      listTasks(todo);
    }
  });
  const spanKeyboardReturn = dom.window.document.createElement('span');
  spanKeyboardReturn.className = 'material-icons-outlined';
  spanKeyboardReturn.innerText = 'keyboard_return';
  liAddToList.appendChild(spanKeyboardReturn);
  spanKeyboardReturn.addEventListener('click', () => {
    if (inputAddToList.value.trim() !== '') {
      todo.create(inputAddToList.value.trim());
      listTasks(todo);
    }
  });
  ulToDo.appendChild(liAddToList);

  _.forEach(todo.tasks, (task) => {
    const liTaskLine = dom.window.document.createElement('li');
    liTaskLine.className = `idx${task.index} task_line`;
    liTaskLine.id = `drg${task.index}`;
    liTaskLine.draggable = true;
    const spanTaskDescr = dom.window.document.createElement('span');
    spanTaskDescr.className = `idx${task.index} task_unit`;
    const inputCheckBox = dom.window.document.createElement('input');
    inputCheckBox.className = `idx${task.index}`;
    inputCheckBox.type = 'checkbox';
    spanTaskDescr.appendChild(inputCheckBox);
    inputCheckBox.addEventListener('change', (e) => {
      if (e.target.nextSibling.classList.contains('done')) {
        e.target.nextSibling.classList.remove('done');
        todo.completedChange(false, parseInt(e.target.classList[0].substr(3), 10));
      } else {
        e.target.nextSibling.classList.add('done');
        todo.completedChange(true, parseInt(e.target.classList[0].substr(3), 10));
      }
    });

    const inputDescription = dom.window.document.createElement('input');
    inputDescription.type = 'text';
    inputDescription.className = `idx${task.index} description`;
    inputDescription.value = task.description;
    inputDescription.readOnly = true;
    spanTaskDescr.appendChild(inputDescription);
    inputDescription.addEventListener('click', (e) => {
      if (e.target.readOnly && !e.target.previousSibling.checked) {
        const moreVert = dom.window.document.querySelectorAll('.more_vert');
        const moreIcon = dom.window.document.querySelector(`.more_vert.idx${e.target.classList[0].substr(3)}`);
        Array.from(moreVert).forEach((icon) => icon.classList.add('active'));
        moreIcon.classList.remove('active');
        const deleteOutline = dom.window.document.querySelectorAll('.delete_outline');
        const deleteIcon = dom.window.document.querySelector(`.delete_outline.idx${e.target.classList[0].substr(3)}`);
        Array.from(deleteOutline).forEach((icon) => icon.classList.remove('active'));
        deleteIcon.classList.add('active');
        const descriptionText = dom.window.document.querySelectorAll('.description');
        Array.from(descriptionText).forEach((text) => { text.readOnly = true; });
        e.target.readOnly = false;
      }
    });
    inputDescription.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        todo.update(e.target.value.trim(), parseInt(e.target.classList[0].substr(3), 10));
        e.target.value = e.target.value.trim();
        e.target.readOnly = true;
        e.target.parentElement.nextSibling.classList.remove('active');
        e.target.parentElement.nextSibling.nextSibling.classList.add('active');
      }
    });
    inputDescription.addEventListener('input', (e) => {
      if (e.target.value.trim() === '') {
        listTasks(todo);
      }
    });
    liTaskLine.appendChild(spanTaskDescr);

    const spanTrashCan = dom.window.document.createElement('span');
    spanTrashCan.className = `idx${task.index} material-icons-outlined delete_outline`;
    spanTrashCan.innerText = 'delete_outline';
    liTaskLine.appendChild(spanTrashCan);
    spanTrashCan.addEventListener('click', (e) => {
      todo.delete(parseInt(e.target.classList[0].substr(3), 10));
      listTasks(todo);
    });
    const spanMoreVert = dom.window.document.createElement('span');
    spanMoreVert.className = `idx${task.index} material-icons-outlined more_vert active`;
    spanMoreVert.innerText = 'more_vert';
    liTaskLine.appendChild(spanMoreVert);
    ulToDo.appendChild(liTaskLine);

    liTaskLine.addEventListener('dragstart', (e) => {
      e.target.classList.add('dragging');
    });

    liTaskLine.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
    });

    liTaskLine.addEventListener('dragover', (e) => {
      e.preventDefault();
      const beforeElement = dom.window.document.querySelector(`#drg${parseInt(e.target.classList[0].substr(3), 10)}`);
      beforeElement.parentElement.insertBefore(dom.window.document.querySelector('.dragging'), beforeElement);
    });

    liTaskLine.addEventListener('drop', (e) => {
      e.preventDefault();
      dragPosition(todo);
      listTasks(todo);
    });
  });

  const liClearAll = dom.window.document.createElement('li');
  liClearAll.classList = 'task_line';
  liClearAll.id = `drg${todo.size() + 1}`;
  const pClearAll = dom.window.document.createElement('p');
  pClearAll.innerText = 'Clear all completed';
  liClearAll.appendChild(pClearAll);
  pClearAll.addEventListener('click', () => {
    todo.removeCompleted();
    listTasks(todo);
  });
  ulToDo.appendChild(liClearAll);

  liClearAll.addEventListener('dragover', (e) => {
    e.preventDefault();
    const beforeElement = dom.window.document.getElementById(e.target.id);
    beforeElement.parentElement.insertBefore(dom.window.document.querySelector('.dragging'), beforeElement);
  });

  liClearAll.addEventListener('drop', (e) => {
    e.preventDefault();
    dragPosition(todo);
    listTasks(todo);
  });

  interact(todo);
};

describe('Test of listTask function', () => {
  test('Execution of listTask', () => {
    listTasks(todo);
    expect(dom.window.document.querySelector('#drg5').draggable).toBeFalsy();
    expect(dom.window.document.querySelector('#drg4').draggable).toBeTruthy();
    expect(dom.window.document.querySelector('.task_unit input[type=checkbox].idx1').checked).toBeFalsy();
    expect(todo.tasks[0].description).toBe('wash the dishes');
    expect(todo.tasks[1].completed).not.toBeFalsy();
    expect(todo.tasks[3].index).toBe(4);
    expect(todo.size()).toBe(4);
    expect(todo.create('descr')).toBeNull();
  });
});