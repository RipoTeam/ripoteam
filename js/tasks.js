let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    updateTasksDisplay();
});

function loadUsers() {
    const assigneeSelect = document.getElementById('taskAssignee');
    assigneeSelect.innerHTML = users.map(user => `
        <option value="${user.id}">${user.username}</option>
    `).join('');
}

function populateUserSelect(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = users.map(user => `
        <option value="${user.id}">${user.username}</option>
    `).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    const createTaskBtn = document.getElementById('createTaskBtn');
    if (createTaskBtn) {
        createTaskBtn.addEventListener('click', createTask);
    }
    updateTasksDisplay();
    populateUserSelect('taskAssignee');
});

function createTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTask = {
        id: Date.now(),
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        assignee: document.getElementById('taskAssignee').value,
        status: 'pending',
        created: new Date().toISOString()
    };
    
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Close modal and refresh
    const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
    modal.hide();
    loadTasks();
}function updateTasksDisplay() {
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = tasks.map(task => `
        <tr>
            <td>${task.title}</td>
            <td>${getUserName(task.assignee)}</td>
            <td><span class="badge bg-${task.status === 'completed' ? 'success' : 'warning'}">${task.status}</span></td>
            <td>
                <button class="btn btn-sm btn-success" onclick="completeTask(${task.id})">
                    <i class="fas fa-check"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function getUserName(userId) {
    const user = users.find(u => u.id === userId);
    return user ? user.username : 'Unknown User';
}
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    loadTasks();
    showNotification('Task deleted');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-info alert-dismissible fade show position-fixed top-0 end-0 m-3';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Drag and Drop functionality
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("taskId", ev.target.id);
}

function drop(ev, status) {
    ev.preventDefault();
    const taskId = ev.dataTransfer.getData("taskId").split('-')[1];
    const taskIndex = tasks.findIndex(t => t.id === parseInt(taskId));
    if (taskIndex !== -1) {
        tasks[taskIndex].status = status;
        loadTasks();
    }
}
