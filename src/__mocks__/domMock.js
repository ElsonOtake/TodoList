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
        <span class="idx2 material-icons-outlined more_vert active">more_vert</span></li>
      <li class="idx3 task_line" id="drg3" draggable="true">
        <span class="idx3 task_unit">
          <input class="idx3" type="checkbox">
          <input type="text" class="idx3 description" readonly="">
        </span>
        <span class="idx3 material-icons-outlined delete_outline">delete_outline</span>
        <span class="idx3 material-icons-outlined more_vert active">more_vert</span></li>
      <li class="idx4 task_line" id="drg4" draggable="true">
        <span class="idx4 task_unit">
          <input class="idx4" type="checkbox">
          <input type="text" class="idx4 description" readonly="">
        </span>
        <span class="idx4 material-icons-outlined delete_outline">delete_outline</span>
        <span class="idx4 material-icons-outlined more_vert active">more_vert</span></li>
      <li class="task_line">
        <p>Clear all completed</p>
      </li>
    </ul>
  </body>
  </html>
`);

const { document } = dom.window;

exports.document = document;