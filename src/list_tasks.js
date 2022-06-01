const listTasks = (tasks) => {
  const addToList = document.querySelector('.add_to_list');
  let description; let completed; let
    index;
  for (let i = tasks.size(); i > 0; i -= 1) {
    ({ description, completed, index } = tasks.idxTask(i));
    const li = document.createElement('li');
    li.className = 'task_line';
    const span1 = document.createElement('span');
    span1.className = 'task_unit';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = `x${index}`;
    input.checked = completed;
    span1.appendChild(input);
    const label = document.createElement('label');
    // label.className = 'active';
    label.htmlFor = `x${index}`;
    label.innerText = description;
    span1.appendChild(label);
    const textarea = document.createElement('textarea');
    textarea.className = 'active';
    textarea.innerHTML = description;
    span1.appendChild(textarea);
    li.appendChild(span1);
    const span2 = document.createElement('span');
    span2.className = 'material-icons-outlined';
    span2.innerText = 'more_vert';
    li.appendChild(span2);
    addToList.insertAdjacentElement('afterend', li);
  }
};

export default listTasks;