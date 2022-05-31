const listTasks = (tasks) => {
  const ul = document.querySelector('ul');

  const li1 = document.createElement('li');
  const span1 = document.createElement('span');
  span1.innerText = "Today's To Do";
  li1.appendChild(span1);
  const span2 = document.createElement('span');
  span2.className = 'material-icons-outlined';
  span2.innerText = 'cached';
  li1.appendChild(span2);
  ul.appendChild(li1);

  const li2 = document.createElement('li');
  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Add to your list...';
  li2.appendChild(textarea);
  const span3 = document.createElement('span');
  span3.className = 'material-icons-outlined';
  span3.innerText = 'keyboard_return';
  li2.appendChild(span3);
  ul.appendChild(li2);

  var description, completed, index;
  for (let i = 1; i <= tasks.size(); i += 1) {
    ({ description, completed, index } = tasks.idxTask(i));
    const li3 = document.createElement('li');
    const span4 = document.createElement('span');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'x' + index;
    input.checked = completed;
    span4.appendChild(input);
    const label = document.createElement('label');
    label.htmlFor = 'x' + index;
    label.innerText = description;
    span4.appendChild(label);
    li3.appendChild(span4);
    const span5 = document.createElement('span');
    span5.className = 'material-icons-outlined';
    span5.innerText = 'more_vert';
    li3.appendChild(span5);
    ul.appendChild(li3);
  }

  const li4 = document.createElement('li');
  const span6 = document.createElement('span');
  span6.innerText = 'Clear all completed';
  li4.appendChild(span6);
  ul.appendChild(li4);
};

export default listTasks;
