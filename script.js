const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 1. Load tasks from localStorage on startup
document.addEventListener('DOMContentLoaded', getTasks);

// 2. Event Listener for adding a task
addBtn.addEventListener('click', () => {
    if (input.value === '') return;
    
    createTodoElement(input.value);
    saveLocalTasks(input.value);
    input.value = '';
});

// 3. Create the UI element for a task
function createTodoElement(text) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">Delete</button>
    `;
    
    // Delete functionality
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        removeLocalTask(text);
    });

    todoList.appendChild(li);
}

// --- LOCAL STORAGE FUNCTIONS ---

function saveLocalTasks(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => createTodoElement(task));
}

function removeLocalTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const filteredTasks = tasks.filter(t => t !== taskText);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}
