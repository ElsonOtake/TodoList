const listTasks = (tasks) => {
  const ul = document.querySelector('ul');

  let description; 
  let completed; 
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

    if (e.key === 'Enter' && input0.value !== '') {
        tasks.create(input0.value);
        listTasks(tasks);
    }
    
  })
  const span0 = document.createElement('span');
  span0.className = 'material-icons-outlined';
  span0.innerText = 'keyboard_return';
  li0.appendChild(span0);
  span0.addEventListener('click', (e) => {
    if (input0.value !== '') {
      tasks.create(input0.value);
      listTasks(tasks);
  }
  })
  ul.appendChild(li0);

  for (let i = 1; i <= tasks.size(); i += 1) {
    ({ description, completed, index } = tasks.idxTask(i));
    const li1 = document.createElement('li');
    li1.className = 'task_line';
    const span1 = document.createElement('span');
    span1.className = 'task_unit';
    const input1 = document.createElement('input');
    input1.className = 'idx' + index;
    input1.type = 'checkbox';
    span1.appendChild(input1);
    input1.addEventListener('change', (e) => { 
      e.target.nextSibling.classList.toggle('done');
      tasks.completedToggle(parseInt(e.target.classList[0].substr(3)));
    });
    const input2 = document.createElement('input');
    input2.type = 'text';
    input2.className = 'idx' + index + ' description';
    input2.value = description;
    input2.readOnly = true;
    span1.appendChild(input2);
    input2.addEventListener('click', (e) => {
      if (e.target.readOnly) {
        e.target.readOnly = false;
        const moreVert = document.querySelectorAll('.more_vert');
        Array.from(moreVert).forEach(icon => icon.classList.add('active'));
        const deleteOutline = document.querySelectorAll('.delete_outline');
        Array.from(deleteOutline).forEach(icon => icon.classList.remove('active'));
        span2.classList.add('active');
        span3.classList.remove('active');
      }
    });
    input2.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        tasks.update(e.target.value, parseInt(e.target.classList[0].substr(3)));
        listTasks(tasks);
      }
    })
    li1.appendChild(span1);

    const span2 = document.createElement('span');
    span2.className = 'idx' + index + ' material-icons-outlined delete_outline';
    span2.innerText = 'delete_outline';
    li1.appendChild(span2);
    span2.addEventListener('click', (e) => {
      if (e.target.previousSibling.lastChild.value === '') {
        tasks.delete(parseInt(e.target.classList[0].substr(3)));
        listTasks(tasks);
      }
    })
    const span3 = document.createElement('span');
    span3.className = 'idx' + index + ' material-icons-outlined more_vert active';
    span3.innerText = 'more_vert';
    li1.appendChild(span3);
    ul.appendChild(li1);
  }

  const li2 = document.createElement('li');
  li2.classList = 'task_line';
  const span4 = document.createElement('span');
  span4.innerText = 'Clear all completed';
  li2.appendChild(span4);
  ul.appendChild(li2);

};

export default listTasks;