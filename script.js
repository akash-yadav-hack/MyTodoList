// State Management
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// DOM Elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderTodos();
  setupEventListeners();
});

function setupEventListeners() {
  addBtn.addEventListener('click', addTodo);
  
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      renderTodos();
    });
  });

  clearCompletedBtn.addEventListener('click', clearCompleted);
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();
  todoInput.value = '';
}

function toggleTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
}

// function clearCompleted() {
//   todos = todos.filter(todo => !todo.completed);
//   saveTodos();
//   renderTodos();
// }

function getFilteredTodos() {
  if (currentFilter === 'active') {
    return todos.filter(todo => !todo.completed);
  }
  if (currentFilter === 'completed') {
    return todos.filter(todo => todo.completed);
  }
  return todos;
}

function renderTodos() {
  const filteredTodos = getFilteredTodos();
  todoList.innerHTML = '';

  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    
    li.innerHTML = `
      <div class="todo-content">
        <input 
          type="checkbox" 
          ${todo.completed ? 'checked' : ''} 
          onchange="toggleTodo(${todo.id})"
        >
        <span class="todo-text">${escapeHtml(todo.text)}</span>
      </div>
      <button class="delete-btn" onclick="deleteTodo(${todo.id})">&times;</button>
    `;

    todoList.appendChild(li);
  });

  updateStats();
}

function updateStats() {
  const activeCount = todos.filter(todo => !todo.completed).length;
  itemsLeft.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;
}

// Basic XSS Protection
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}