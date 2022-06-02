const interact = (tasks) => {
  let description;
  let completed;
  let index;



  for (let i = 1; i <= tasks.size(); i += 1) {
    ({ description, completed, index } = tasks.idxTask(i));
    const checkbox = document.querySelector(`.task_unit input[type=checkbox].idx${i}`);
    const text = document.querySelector(`.task_unit input[type=text].idx${i}`);

    if (completed) {
      checkbox.checked = true;
      text.classList.add('done');
    }

    checkbox.addEventListener('change', (e) => {
      e.target.nextSibling.classList.toggle('done');
      tasks.completedToggle(parseInt(e.target.classList[0].substr(3), 10));
    });
    
  }
}

export default interact;