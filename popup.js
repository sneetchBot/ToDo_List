document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    chrome.storage.local.get('tasks', (data) => {
        if (data.tasks) {
            data.tasks.forEach(task => addTaskToDOM(task));
        }
    });

    addTaskButton.addEventListener('click', () => {
        const task = taskInput.value;
        if (task) {
            addTaskToDOM(task);
            saveTask(task);
            taskInput.value = '';
        }
    });

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.textContent = task;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.onclick = () => {
            li.remove();
            removeTask(task);
        };
        li.appendChild(removeButton);
        taskList.appendChild(li);
    }

    function saveTask(task) {
        chrome.storage.local.get('tasks', (data) => {
            const tasks = data.tasks || [];
            tasks.push(task);
            chrome.storage.local.set({ tasks });
        });
    }

    function removeTask(task) {
        chrome.storage.local.get('tasks', (data) => {
            const tasks = data.tasks || [];
            const newTasks = tasks.filter(t => t !== task);
            chrome.storage.local.set({ tasks: newTasks });
        });
    }
});
