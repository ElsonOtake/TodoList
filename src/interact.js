import _ from 'lodash';

const interact = (todo) => {
  _.forEach(todo.tasks, (task, i) => {
    if (task.completed) {
      const checkbox = document.querySelector(`.task_unit input[type=checkbox].idx${i + 1}`);
      const text = document.querySelector(`.task_unit input[type=text].idx${i + 1}`);
      checkbox.checked = true;
      text.classList.add('done');
    }
  });
};

export default interact;
