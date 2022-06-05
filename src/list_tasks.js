import _ from 'lodash';
import interact from './interact.js';

const listTasks = (todo) => {
  const ulToDo = document.querySelector('ul');

  while (document.querySelector('.task_line')) {
    ulToDo.removeChild(document.querySelector('.task_line'));
  }

  const liAddToList = document.createElement('li');
  liAddToList.className = 'task_line add_to_list';
  const inputAddToList = document.createElement('input');
  inputAddToList.type = 'text';
  inputAddToList.placeholder = 'Add to your list...';
  liAddToList.appendChild(inputAddToList);
  inputAddToList.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && inputAddToList.value.trim() !== '') {
      todo.create(inputAddToList.value.trim());
      listTasks(todo);
      interact(todo);
    }
  });
  const spanKeyboardReturn = document.createElement('span');
  spanKeyboardReturn.className = 'material-icons-outlined';
  spanKeyboardReturn.innerText = 'keyboard_return';
  liAddToList.appendChild(spanKeyboardReturn);
  spanKeyboardReturn.addEventListener('click', () => {
    if (inputAddToList.value.trim() !== '') {
      todo.create(inputAddToList.value.trim());
      listTasks(todo);
      interact(todo);
    }
  });
  ulToDo.appendChild(liAddToList);

  _.forEach(todo.tasks, (task) => {
    const liTaskLine = document.createElement('li');
    liTaskLine.className = `idx${task.index} task_line`;
    liTaskLine.id = `drg${task.index}`;
    liTaskLine.draggable = true;
    const spanTaskDescr = document.createElement('span');
    spanTaskDescr.className = `idx${task.index} task_unit`;
    const inputCheckBox = document.createElement('input');
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

    const inputDescription = document.createElement('input');
    inputDescription.type = 'text';
    inputDescription.className = `idx${task.index} description`;
    inputDescription.value = task.description;
    inputDescription.readOnly = true;
    spanTaskDescr.appendChild(inputDescription);
    inputDescription.addEventListener('click', (e) => {
      if (e.target.readOnly && !e.target.previousSibling.checked) {
        const moreVert = document.querySelectorAll('.more_vert');
        const moreIcon = document.querySelector(`.more_vert.idx${e.target.classList[0].substr(3)}`);
        Array.from(moreVert).forEach((icon) => icon.classList.add('active'));
        moreIcon.classList.remove('active');
        const deleteOutline = document.querySelectorAll('.delete_outline');
        const deleteIcon = document.querySelector(`.delete_outline.idx${e.target.classList[0].substr(3)}`);
        Array.from(deleteOutline).forEach((icon) => icon.classList.remove('active'));
        deleteIcon.classList.add('active');
        const descriptionText = document.querySelectorAll('.description');
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
        interact(todo);
      }
    });
    liTaskLine.appendChild(spanTaskDescr);

    const spanTrashCan = document.createElement('span');
    spanTrashCan.className = `idx${task.index} material-icons-outlined delete_outline`;
    spanTrashCan.innerText = 'delete_outline';
    liTaskLine.appendChild(spanTrashCan);
    spanTrashCan.addEventListener('click', (e) => {
      todo.delete(parseInt(e.target.classList[0].substr(3), 10));
      listTasks(todo);
      interact(todo);
    });
    const spanMoreVert = document.createElement('span');
    spanMoreVert.className = `idx${task.index} material-icons-outlined more_vert active`;
    spanMoreVert.innerText = 'more_vert';
    liTaskLine.appendChild(spanMoreVert);
    ulToDo.appendChild(liTaskLine);

    liTaskLine.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('application/x-moz-node', e.target.classList[0]);
    });

    liTaskLine.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    liTaskLine.addEventListener('drop', (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData('application/x-moz-node');
      e.target.insertAdjacentElement('beforebegin', document.querySelector(`.${data}.task_line`));
      todo.changePosition(parseInt(data.substring(3), 10),
        parseInt(e.target.classList[0].substr(3), 10));
      listTasks(todo);
      interact(todo);
    });

    liTaskLine.addEventListener('dragenter', (e) => {
      document.querySelector(`.${e.target.classList[0]}.task_line`).classList.add('insert');
    });

    liTaskLine.addEventListener('dragleave', (e) => {
      document.querySelector(`.${e.target.classList[0]}.task_line`).classList.remove('insert');
    });
  });

  const liClearAll = document.createElement('li');
  liClearAll.classList = 'task_line';
  const pClearAll = document.createElement('p');
  pClearAll.innerText = 'Clear all completed';
  liClearAll.appendChild(pClearAll);
  pClearAll.addEventListener('click', () => {
    todo.removeCompleted();
    listTasks(todo);
  });
  ulToDo.appendChild(liClearAll);
};

export default listTasks;