const input = document.querySelector('.form-control');
const button = document.querySelector('#button-addon2');
const list = document.querySelector('.list-group');
const body = document.querySelector('.container');
const destroy = document.querySelector('#destroy');

function emptyWarning() {
  const div = document.createElement('div');

  div.classList.add('alert');
  div.classList.add('alert-warning');

  div.classList.add('animated');
  div.classList.add('shake');

  const text = document.createTextNode('Oops! You supposed to type something ');

  div.appendChild(text);

  div.innerText += String.fromCodePoint('0x1F62E');

  body.insertBefore(div, list);

  return div;
}

function successWarning() {
  const div = document.createElement('div');

  div.classList.add('alert');
  div.classList.add('alert-success');

  div.classList.add('animated');
  div.classList.add('tada');

  const text = document.createTextNode('Great! Task added successfully ');

  div.appendChild(text);

  div.innerText += String.fromCodePoint('0x1F600');

  body.insertBefore(div, list);

  return div;
}

function deletedWarning() {
  const div = document.createElement('div');

  div.classList.add('alert');
  div.classList.add('alert-danger');

  div.classList.add('animated');
  div.classList.add('bounceIn');

  const text = document.createTextNode('Okay! Task removed from the list ');

  div.appendChild(text);

  div.innerText += String.fromCodePoint('0x1F60F');

  body.insertBefore(div, list);

  return div;
}

function checkTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  return todos;
}

function storeTodo() {
  const todos = checkTodos();

  todos.push(input.value);

  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodo() {
  const li = document.createElement('li');
  const button = document.createElement('button');
  let span = document.createElement('span');

  li.classList.add('list-group-item');
  li.classList.add('d-flex');
  li.classList.add('justify-content-between');
  li.classList.add('align-items-center');

  li.classList.add('animated');
  li.classList.add('bounceInLeft');

  button.classList.add('close');
  span.classList.add('delete-todo');

  const text = document.createTextNode(input.value);

  span.innerHTML = '&times;';

  li.appendChild(text);
  button.appendChild(span);
  li.appendChild(button);
  list.appendChild(li);
}

function addTodo() {
  if (input.value === '') {
    const div = emptyWarning();

    setTimeout(() => {
      div.remove();
    }, 3500);
  } else {
    const div = successWarning();

    storeTodo();
    renderTodo();

    setTimeout(() => {
      div.remove();
    }, 3500);

    input.value = '';
  }
}

function deleteTodo(e) {
  const todos = checkTodos();

  if (e.target.classList.contains('delete-todo')) {
    let del = e.target.parentElement.parentElement.textContent;
    let delTodo = del.substring(0, del.length - 1);

    todos.forEach((todo, index) => {
      if (todo === delTodo) {
        todos.splice(index, 1);
      }
    });

    localStorage.setItem('todos', JSON.stringify(todos));

    const div = deletedWarning();

    setTimeout(() => {
      div.remove();
    }, 3500);

    // Delete from the page
    del = e.target.parentElement.parentElement;
    del.remove();
  }
}

function destroyList() {
  localStorage.removeItem('todos');
  location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
  const todos = checkTodos();

  todos.forEach(todo => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    let span = document.createElement('span');

    li.classList.add('list-group-item');
    li.classList.add('d-flex');
    li.classList.add('justify-content-between');
    li.classList.add('align-items-center');

    button.classList.add('close');
    span.classList.add('delete-todo');

    const text = document.createTextNode(todo);

    span.innerHTML = '&times;';

    li.appendChild(text);
    button.appendChild(span);
    li.appendChild(button);
    list.appendChild(li);
  });

  body.classList.add('animated');
  body.classList.add('bounceInUp');
});

destroy.addEventListener('click', destroyList);
button.addEventListener('click', addTodo);
list.addEventListener('click', deleteTodo);
