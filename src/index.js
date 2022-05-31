import _ from 'lodash';
import './style.css';

const tasks = [{
  description: 'wash the dishes',
  completed: false,
  index: 0
}, {
  description: 'complete the Todo project',
  completed: false,
  index: 1
}, {
  description: 'walk the dog',
  completed: false,
  index: 2
}, {
  description: 'fix car',
  completed: false,
  index: 3
}, {
  description: 'do the laundry',
  completed: false,
  index: 4
}];

// function component() {
//   const element = document.createElement('div');

//   // Lodash, now imported by this script
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   element.classList.add('hello');

//   return element;
// }

// document.body.appendChild(component());