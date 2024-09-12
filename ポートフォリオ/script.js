let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

document.getElementById('add-task').addEventListener('click', function() {
  const taskText = document.getElementById('new-task').value;
  const taskCategory = document.getElementById('category').value;
  const taskDueDate = document.getElementById('due-date').value;
  
  if (taskText.trim() !== "") {
    const task = {
      text: taskText,
      category: taskCategory,
      dueDate: taskDueDate,
      completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    
    document.getElementById('new-task').value = '';
    document.getElementById('due-date').value = '';
  }
});

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "仕事" && task.category === "仕事") return true;
    if (filter === "プライベート" && task.category === "プライベート") return true;
    return false;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.toggle('completed', task.completed);
    
    li.innerHTML = `${task.text} <span>(${task.category})</span> <span>${task.dueDate}</span>`;

    const completeButton = document.createElement('button');
    completeButton.textContent = task.completed ? '未完了' : '完了';
    completeButton.addEventListener('click', function() {
      task.completed = !task.completed;
      saveTasks();
      renderTasks(filter);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.addEventListener('click', function() {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks(filter);
    });

    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

document.getElementById('filter-all').addEventListener('click', function() {
  renderTasks("all");
});

document.getElementById('filter-work').addEventListener('click', function() {
  renderTasks("仕事");
});

document.getElementById('filter-private').addEventListener('click', function() {
  renderTasks("プライベート");
});

// ページロード時にタスクを表示
renderTasks();
