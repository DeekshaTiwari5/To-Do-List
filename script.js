document.addEventListener('DOMContentLoaded', function() {
    const addInput = document.getElementById('add');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('list');
    const filterOptions = document.querySelectorAll('.filter-option');
    const tasksCounter = document.getElementById('tasks-counter');
    const clearAllButton = document.getElementById('clear-all');
    const selectAllButton = document.getElementById('select-all');
  //BUTTON EVENT:ADD
    addButton.addEventListener('click', addTask);
    addInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        addTask();
      }
    });
  //BUTTON TO ADD & REMOVE
    taskList.addEventListener('change', function(event) {
      const checkbox = event.target;
      const taskItem = checkbox.parentNode.parentNode;
  
      if (checkbox.checked) {
        taskItem.classList.add('completed');
      } else {
        taskItem.classList.remove('completed');
      }
  
      updateTasksCounter();
    });
  //DELETE BUTTON
    taskList.addEventListener('click', function(event) {
      const deleteButton = event.target;
  
      if (deleteButton.classList.contains('delete')) {
        const taskItem = deleteButton.parentNode;
        taskItem.remove();
        updateTasksCounter();
      }
    });
  //FILTER TASK:CLEAR BUTTON
    clearAllButton.addEventListener('click', function() {
      const completedTasks = document.querySelectorAll('.completed');
      completedTasks.forEach(function(taskItem) {
        taskItem.remove();
      });
  
      updateTasksCounter();
    });
  
    selectAllButton.addEventListener('click', function() {
      const checkboxes = document.querySelectorAll('.custom-checkbox input');
      const areAllSelected = Array.from(checkboxes).every(function(checkbox) {
        return checkbox.checked;
      });
  
      checkboxes.forEach(function(checkbox) {
        if (areAllSelected) {
          checkbox.checked = false;
          checkbox.parentNode.parentNode.classList.remove('completed');
        } else {
          checkbox.checked = true;
          checkbox.parentNode.parentNode.classList.add('completed');
        }
      });
  
      updateTasksCounter();
    });
  
    filterOptions.forEach(function(option) {
      option.addEventListener('click', function() {
        filterOptions.forEach(function(option) {
          option.classList.remove('active');
        });
        this.classList.add('active');
        filterTasks(this.id);
      });
    });
  //ADD LIST OF TASKS TO-DO
    function addTask() {
      const task = addInput.value.trim();
  
      if (task !== '') {
        const taskItem = createTaskItem(task);
        taskList.appendChild(taskItem);
        addInput.value = '';
        updateTasksCounter();
      }
    }
  //FILTER BUTTONS:ALL,DELETE,COMPLETED,PENDING
    function createTaskItem(task) {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      const checkboxWrapper = document.createElement('div');
      checkboxWrapper.className = 'custom-checkbox';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      const label = document.createElement('label');
      label.textContent = task;
      const deleteButton = document.createElement('span');
      deleteButton.className = 'delete';
      deleteButton.innerHTML = '&times;';
  
      checkboxWrapper.appendChild(checkbox);
      checkboxWrapper.appendChild(label);
      taskItem.appendChild(checkboxWrapper);
      taskItem.appendChild(deleteButton);
  
      return taskItem;
    }
  // TASKS LEFT TO-DO COUNTER
    function updateTasksCounter() {
      const pendingTasks = document.querySelectorAll('.task-item:not(.completed)');
      tasksCounter.textContent = pendingTasks.length;
    }
//   FILTER TASKS :SELECT ALL BUTTON
    function filterTasks(option) {
      const taskItems = document.querySelectorAll('.task-item');
  
      taskItems.forEach(function(taskItem) {
        if (option === 'all') {
          taskItem.style.display = 'flex';
        } else if (option === 'pending') {
          taskItem.style.display = taskItem.classList.contains('completed') ? 'none' : 'flex';
        } else if (option === 'completed') {
          taskItem.style.display = taskItem.classList.contains('completed') ? 'flex' : 'none';
        }
      });
    }
  });
  