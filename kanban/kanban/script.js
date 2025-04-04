const columns = document.querySelectorAll('.column');
const toggleBtn = document.createElement('button');
toggleBtn.textContent = '🌙';
toggleBtn.className = 'toggle-dark';
toggleBtn.onclick = () => {
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
};
document.body.insertBefore(toggleBtn, document.body.firstChild);

function addTask(btn) {
  const column = btn.closest('.column');
  const input = column.querySelector('input');
  const taskText = input.value.trim();
  if (!taskText) return;

  const task = createTask(taskText);
  column.querySelector('.tasks').appendChild(task);
  input.value = '';
  saveBoard();
}

function createTask(text) {
  const div = document.createElement('div');
  div.className = 'task';

  const span = document.createElement('span');
  span.textContent = text;
  span.addEventListener('dblclick', () => enableEditing(span));

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '✕';
  removeBtn.className = 'remove-btn';
  removeBtn.onclick = () => {
    const confirmDelete = confirm('Deseja realmente excluir esta tarefa?');
    if (confirmDelete) {
      div.remove();
      saveBoard();
    }
  };

  div.appendChild(span);
  div.appendChild(removeBtn);
  div.draggable = true;
  div.addEventListener('dragstart', dragStart);
  return div;
}

function enableEditing(spanElement) {
  const currentText = spanElement.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentText;
  input.className = 'edit-input';
  const taskDiv = spanElement.parentElement;

  spanElement.replaceWith(input);
  input.focus();

  input.addEventListener('blur', () => saveEdit(input, taskDiv));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') input.blur();
  });
}

function saveEdit(input, taskDiv) {
  const newText = input.value.trim();
  const updatedTask = createTask(newText || 'Tarefa');
  taskDiv.replaceWith(updatedTask);
  saveBoard();
}

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.querySelector('span').textContent);
  e.dataTransfer.setData('source', e.target.parentElement.closest('.column').dataset.status);
}

columns.forEach(col => {
  col.addEventListener('dragover', e => {
    e.preventDefault();
    col.classList.add('drag-over');
  });

  col.addEventListener('dragleave', () => col.classList.remove('drag-over'));

  col.addEventListener('drop', e => {
    e.preventDefault();
    col.classList.remove('drag-over');

    const text = e.dataTransfer.getData('text/plain');
    const task = createTask(text);

    const sourceStatus = e.dataTransfer.getData('source');
    const sourceCol = document.querySelector(`.column[data-status="${sourceStatus}"] .tasks`);
    [...sourceCol.children].forEach(c => {
      if (c.querySelector('span')?.textContent === text) c.remove();
    });

    col.querySelector('.tasks').appendChild(task);
    saveBoard();
  });
});

function saveBoard() {
  const data = {};
  columns.forEach(col => {
    const status = col.dataset.status;
    const tasks = [...col.querySelectorAll('.task span')].map(t => t.textContent);
    data[status] = tasks;
  });
  localStorage.setItem('kanban', JSON.stringify(data));
}

function loadBoard() {
  const data = JSON.parse(localStorage.getItem('kanban') || '{}');
  columns.forEach(col => {
    const status = col.dataset.status;
    const tasks = data[status] || [];
    const taskContainer = col.querySelector('.tasks');
    taskContainer.innerHTML = '';
    tasks.forEach(t => taskContainer.appendChild(createTask(t)));
  });
}

loadBoard();
