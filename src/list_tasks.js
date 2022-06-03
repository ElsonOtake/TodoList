import interact from './interact.js';

const listTasks = (tasks) => {
  const ul = document.querySelector('ul');

  let description;
  let index;

  while (document.querySelector('.task_line')) {
    ul.removeChild(document.querySelector('.task_line'));
  }

  const li0 = document.createElement('li');
  li0.className = 'task_line add_to_list';
  const input0 = document.createElement('input');
  input0.type = 'text';
  input0.placeholder = 'Add to your list...';
  li0.appendChild(input0);
  input0.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && input0.value.trim() !== '') {
      tasks.create(input0.value.trim());
      listTasks(tasks);
      interact(tasks);
    }
  });
  const span0 = document.createElement('span');
  span0.className = 'material-icons-outlined';
  span0.innerText = 'keyboard_return';
  li0.appendChild(span0);
  span0.addEventListener('click', () => {
    if (input0.value.trim() !== '') {
      tasks.create(input0.value.trim());
      listTasks(tasks);
      interact(tasks);
    }
  });
  ul.appendChild(li0);

  for (let i = 1; i <= tasks.size(); i += 1) {
    ({ description, index } = tasks.idxTask(i));
    const li1 = document.createElement('li');
    li1.className = 'task_line';
    const span1 = document.createElement('span');
    span1.className = 'task_unit';
    const input1 = document.createElement('input');
    input1.className = `idx${index}`;
    input1.type = 'checkbox';
    span1.appendChild(input1);
    input1.addEventListener('change', (e) => {
      if (e.target.nextSibling.classList.contains('done')) {
        e.target.nextSibling.classList.remove('done');
        tasks.completedChange(false, parseInt(e.target.classList[0].substr(3), 10));
      } else {
        e.target.nextSibling.classList.add('done');
        tasks.completedChange(true, parseInt(e.target.classList[0].substr(3), 10));
      }
    });

    const input2 = document.createElement('input');
    input2.type = 'text';
    input2.className = `idx${index} description`;
    input2.value = description;
    input2.readOnly = true;
    span1.appendChild(input2);
    input2.addEventListener('click', (e) => {
      if (e.target.readOnly) {
        const moreVert = document.querySelectorAll('.more_vert');
        const moreIcon = document.querySelector(`.more_vert.idx${e.target.classList[0].substr(3)}`);
        Array.from(moreVert).forEach((icon) => icon.classList.add('active'));
        moreIcon.classList.remove('active');
        const deleteOutline = document.querySelectorAll('.delete_outline');
        const deleteIcon = document.querySelector(`.delete_outline.idx${e.target.classList[0].substr(3)}`);
        Array.from(deleteOutline).forEach((icon) => icon.classList.remove('active'));
        deleteIcon.classList.add('active');
        const descriptionText = document.querySelectorAll('.description');
        Array.from(descriptionText).forEach((text) => text.readOnly = true);
        e.target.readOnly = false;
      }
    });
    input2.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && e.target.value.trim() !== '') {
        tasks.update(e.target.value.trim(), parseInt(e.target.classList[0].substr(3), 10));
        e.target.readOnly = true;
      } if (e.key === 'Enter' && e.target.value.trim() === '') {
        listTasks(tasks);
        interact(todo);
      }
    });
    li1.appendChild(span1);

    const span2 = document.createElement('span');
    span2.className = `idx${index} material-icons-outlined delete_outline`;
    span2.innerText = 'delete_outline';
    li1.appendChild(span2);
    span2.addEventListener('click', (e) => {
      if (e.target.previousSibling.lastChild.value.trim() === '') {
        tasks.delete(parseInt(e.target.classList[0].substr(3), 10));
        listTasks(tasks);
        interact(tasks);
      }
    });
    const span3 = document.createElement('span');
    span3.className = `idx${index} material-icons-outlined more_vert active`;
    span3.innerText = 'more_vert';
    li1.appendChild(span3);
    ul.appendChild(li1);
  }

  const li2 = document.createElement('li');
  li2.classList = 'task_line';
  const span4 = document.createElement('span');
  span4.innerText = 'Clear all completed';
  li2.appendChild(span4);
  span4.addEventListener('click', () => {
    tasks.removeCompleted();
    listTasks(tasks);
  });
  ul.appendChild(li2);
};

export default listTasks;