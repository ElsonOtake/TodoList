const listTasks = (tasks) => {
  const ul = document.querySelector('ul');

  let description; 
  let completed; 
  let index;

  for (let i = 1; i <= tasks.size(); i += 1) {
    ({ description, completed, index } = tasks.idxTask(i));
    const li1 = document.createElement('li');
    li1.className = 'task_line';
    const span1 = document.createElement('span');
    span1.className = 'task_unit';
    const input1 = document.createElement('input');
    input1.type = 'checkbox';
    span1.appendChild(input1);
    input1.addEventListener('change', (e) => e.target.nextSibling.classList.toggle('done'));
    const input2 = document.createElement('input');
    input2.type = 'text';
    input2.className = 'description';
    input2.value = description;
    input2.readOnly = true;
    span1.appendChild(input2);
    input2.addEventListener('click', (e) => {
      if (e.target.readOnly) {
        e.target.readOnly = false;
      } else {
        tasks.update(e.target.value, index);
      }
    });
    li1.appendChild(span1);

    const span2 = document.createElement('span');
    span2.className = 'material-icons-outlined';
    span2.innerText = 'delete_outline';
    li1.appendChild(span2);
    span2.addEventListener('click', (e) => {
      if (e.target.previousSibling.lastChild.value === '') {
        tasks.delete(index);
      }
    })
    // const span3 = document.createElement('span');
    // span3.className = 'material-icons-outlined';
    // span3.innerText = 'more_vert';
    // li1.appendChild(span3);
    ul.appendChild(li1);
  }

  const li2 = document.createElement('li');
  const span4 = document.createElement('span');
  span4.innerText = 'Clear all completed';
  li2.appendChild(span4);
  ul.appendChild(li2);

};

export default listTasks;