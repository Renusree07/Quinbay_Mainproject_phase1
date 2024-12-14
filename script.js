
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const completedCounter = document.getElementById('completed-counter');
const totalCounter = document.getElementById('total-counter');
const progressBar = document.getElementById('progress-bar');


let tasks = [];


function updateCountersAndBar() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  completedCounter.textContent = completedTasks;
  totalCounter.textContent = totalTasks;

  
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  progressBar.style.width = `${progress}%`;
  progressBar.textContent = `${Math.round(progress)}% Completed`;
}


function addTask() {
  const todoText = todoInput.value.trim();
  if (!todoText) {
    alert('Please enter a valid task.');
    return;
  }

 
  const task = { text: todoText, completed: false };
  tasks.push(task);
  todoInput.value = ''; 
  renderTasks();
}


function renderTasks() {
  todoList.innerHTML = ''; 

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.classList.add('completed');
    }
    taskItem.appendChild(taskText);

    
    const completeBtn = document.createElement('button');
    completeBtn.textContent = '✔';
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', () => {
      task.completed = !task.completed; 
      renderTasks();
    });
    taskItem.appendChild(completeBtn);

    
    const editBtn = document.createElement('button');
    editBtn.textContent = '✎';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => {
      const newText = prompt('Edit your task:', task.text);
      if (newText !== null) {
        task.text = newText.trim();
        renderTasks();
      }
    });
    taskItem.appendChild(editBtn);

    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1); 
      renderTasks();
    });
    taskItem.appendChild(deleteBtn);

    todoList.appendChild(taskItem);
  });

  updateCountersAndBar();
}


addBtn.addEventListener('click', addTask);
