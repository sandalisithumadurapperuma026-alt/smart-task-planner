// Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// Load tasks from LocalStorage or empty array
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
let currentFilter = 'all';

// Render Tasks
function renderTasks() {
    taskList.innerHTML = '';

    // Filter tasks
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true; // 'all'
    });

    // Display items
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;

        // Toggle completed on text click
        li.querySelector('span').addEventListener('click', () => toggleTask(index));

        taskList.appendChild(li);
    });

    // Update Counter
    const activeTasks = tasks.filter(t => !t.completed).length;
    taskCount.textContent = `${activeTasks} task${activeTasks === 1 ? '' : 's'} left`;

    // Save to LocalStorage
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// Add Task
addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text === '') return alert('Please enter a task!');

    tasks.push({ text: text, completed: false });
    taskInput.value = '';
    renderTasks();
});

// Toggle Task Done/Undone
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Filter Clicks
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.getAttribute('data-filter');
        renderTasks();
    });
});

// Clear Completed Tasks
clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(t => !t.completed);
    renderTasks();
});

// Initial Load
renderTasks();