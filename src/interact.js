const interact = (tasks) => {
  let completed;

  for (let i = 1; i <= tasks.size(); i += 1) {
    ({ completed } = tasks.idxTask(i));
    const checkbox = document.querySelector(`.task_unit input[type=checkbox].idx${i}`);
    const text = document.querySelector(`.task_unit input[type=text].idx${i}`);

    if (completed) {
      checkbox.checked = true;
      text.classList.add('done');
    }
  }
};

export default interact;